SHELL := /bin/bash

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
