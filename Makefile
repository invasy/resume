SHELL := /bin/bash
RESUME   := docs/resume.json

.PHONY: all validate-json validate-yaml
all: docs/index.html docs/resume.pdf

docs/index.html docs/resume.md docs/resume.tex: docs/resume.yaml
	@npm run render && mv -v docs/resume.html docs/index.html

docs/resume.pdf: docs/cv.yaml
	@rendercv render "$<" \
		--dont-generate-html \
		--dont-generate-markdown \
		--dont-generate-png \
		--typst-path=resume.typ \
		--pdf-path=resume.pdf

validate-json:
	@npm run validate:json

validate-yaml:
	@npm run validate:yaml

#----------------------------------------------------------------------

.PHONY: help install clean validate lint build render-html render-pdf \
        convert-rendercv render-latex preview all

help: ## Show this help
    @grep -E '^[a-zA-Z_-]+:.*##' $(MAKEFILE_LIST) | \
      awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-20s\033[0m %s", $$1, $$2}'

install: ## Install dependencies
    npm ci

clean: ## Remove build artifacts
    rm -rf $(PUBLIC) rendercv_output cv.yaml
    @echo "✔ Cleaned"

# ─── Validation & Linting ────────────────────────────────────────────

validate: ## Validate resume.json against JSON Resume schema
    $(NODE_BIN)/resumed validate $(RESUME)
    @echo "✔ Schema valid"

lint: validate ## Lint resume.json (validate + JSON syntax check)
    node -e "JSON.parse(require('fs').readFileSync('$(RESUME)','utf8')); console.log('✔ JSON syntax OK')"

# ─── Build & Render ──────────────────────────────────────────────────

render-html: lint ## Render resume to HTML
    @mkdir -p $(PUBLIC)
    $(NODE_BIN)/resumed render $(RESUME) --theme . --output $(PUBLIC)/index.html
    @cp -f manifest.webmanifest $(PUBLIC)/ 2>/dev/null || true
    @cp -f favicon.ico $(PUBLIC)/ 2>/dev/null || true
    @echo "✔ HTML rendered → $(PUBLIC)/index.html"

render-pdf: render-html ## Render resume to PDF (requires Puppeteer)
    node build.mjs --pdf
    @echo "✔ PDF rendered → $(PUBLIC)/resume.pdf"

build: render-html ## Build (alias for render-html)

# ─── RenderCV ─────────────────────────────────────────────────────────

convert-rendercv: ## Convert resume.json → cv.yaml (RenderCV format)
    npx @jsonresume/jsonresume-to-rendercv $(RESUME)
    @echo "✔ Converted → cv.yaml"

render-latex: convert-rendercv ## Render cv.yaml to LaTeX via RenderCV
    rendercv render cv.yaml
    @echo "✔ LaTeX rendered → rendercv_output/"

# ─── Preview ──────────────────────────────────────────────────────────

preview: build ## Serve the built resume locally
    npx serve $(PUBLIC)

# ─── All ──────────────────────────────────────────────────────────────

all: clean lint build render-pdf ## Full pipeline: clean → lint → build → PDF
    @echo "✔ All done"
