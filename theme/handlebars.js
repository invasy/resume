import Handlebars from 'handlebars';
import { marked } from 'marked';

// Custom marked renderer: make all links open in a new tab
const renderer = new marked.Renderer();
const originalLinkRenderer = renderer.link.bind(renderer);
renderer.link = function ({ href, title, text }) {
  const html = originalLinkRenderer({ href, title, text });
  return html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ');
};
marked.use(
  { renderer },
  {
    breaks: false,
    gfm: true,
  },
);

// ── Handlebars Helpers ───────────────────────────────────────────────
const formatDate = (date) => {
  if (!date) return 'Present';
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const formatDateRange = (date1, date2) => `${formatDate(date1)}&ndash;${formatDate(date2)}`;

Handlebars.registerHelper('formatDate', formatDate);
Handlebars.registerHelper('formatDateRange', formatDateRange);

Handlebars.registerHelper('join', (arr, sep) => {
  if (!Array.isArray(arr)) return '';
  return arr.join(typeof sep === 'string' ? sep : ', ');
});

Handlebars.registerHelper('md', (text, options) => {
  if (!text || typeof text !== 'string') return '';
  const parsed = options.hash.block ? marked.parse(text).trim() : marked.parseInline(text);
  return new Handlebars.SafeString(parsed);
});

// ── CSS (inlined) ────────────────────────────────────────────────────
const css = `\
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root {
  /* Typography - ATS-friendly fonts */
  --resume-font-sans: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --resume-font-serif: Cambria, Georgia, "Times New Roman", serif;
  --resume-font-mono: "Courier New", Courier, monospace;

  /* Font Sizes - Optimal readability */
  --resume-size-name: 36px;        /* Large, prominent name */
  --resume-size-heading: 16px;     /* Section titles */
  --resume-size-subheading: 14px;  /* Job titles, degrees */
  --resume-size-body: 11px;        /* Body text, descriptions */
  --resume-size-small: 10px;       /* Dates, locations, metadata */

  /* Font Weights */
  --resume-weight-normal: 400;
  --resume-weight-medium: 500;
  --resume-weight-semibold: 600;
  --resume-weight-bold: 700;

  /* Line Heights */
  --resume-line-height-tight: 1.2;
  --resume-line-height-normal: 1.5;
  --resume-line-height-relaxed: 1.75;

  /* Colors */
  --resume-color-primary: #1a1a1a;
  --resume-color-secondary: #4a4a4a;
  --resume-color-accent: #2563eb;
  --resume-color-background: #ffffff;
  --resume-color-border: #e5e7eb;

  /* Spacing - Consistent rhythm */
  --resume-space-section: 24px;   /* Between major sections */
  --resume-space-item: 16px;      /* Between list items */
  --resume-space-tight: 8px;      /* Within items */
  --resume-space-margin: 48px;    /* Page margins */

  /* Layout - Optimal line length */
  --resume-max-width: 660px;      /* ~80 chars at body size */
  --resume-column-gap: 24px;

  /* Border Radius */
  --resume-radius-sm: 4px;
  --resume-radius-md: 8px;
  --resume-radius-lg: 12px;

  /* Shadows - Subtle depth */
  --resume-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --resume-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Print Styles - ATS-Friendly PDF Export */
@media print {
  :root {
    /* Optimize for print */
    --resume-space-section: 18px;
    --resume-space-item: 12px;
  }

  @page {
    size: A4;
    margin: 1.27cm;
  }

  /* Prevent awkward breaks */
  .resume-section {
    page-break-inside: avoid;
  }

  .resume-item {
    break-inside: avoid;
  }

  /* Widows and orphans control */
  p, li {
    widows: 3;
    orphans: 3;
  }

  /* Hyphenation for long words */
  .resume-description {
    hyphens: auto;
  }

  /* Hide interactive elements */
  .no-print {
    display: none !important;
  }
}

/* RTL Support */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .resume-item {
  padding-left: 0;
  padding-right: var(--resume-space-tight);
}

html {
  font-size: var(--resume-size-body);
  line-height: var(--resume-line-height-normal);
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--resume-font-sans);
  color: var(--resume-color-primary);
  background: var(--resume-color-background);
  max-width: var(--resume-max-width);
  margin: 0 auto;
  padding: var(--spacing);
}

a {
  color: var(--resume-color-accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h1 {
  font-size: var(--resume-size-name);
  font-weight: var(--resume-weight-bold);
  line-height: var(--resume-line-height-tight);
}

h2 {
  font-size: var(--resume-size-heading);
  font-weight: var(--resume-weight-semibold);
  text-transform: uppercase;
  color: var(--resume-color-secondary);
  border-bottom: 2px solid var(--resume-color-border);
  padding-bottom: .35rem;
  margin-bottom: 1rem;
  margin-top: 1.8rem;
}
h3{font-size:1rem;font-weight:600;margin-bottom:.15rem}
h4{font-size:.9rem;font-weight:400;color:var(--color-muted);margin-bottom:.15rem}
/* Header / Basics */
.header{text-align:center;margin-bottom:1.5rem}
.header h1{margin-bottom:.25rem}
.header .label{font-size:1.1rem;color:var(--color-muted);margin-bottom:.5rem}
.header .summary{max-width:600px;margin:0.5rem auto 0;font-size:.95rem;color:var(--color-muted)}
.contact{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem .9rem;font-size:.85rem;margin-top:.5rem}
.contact a,.contact span{white-space:nowrap}
.profiles{display:flex;flex-wrap:wrap;justify-content:center;gap:.3rem .8rem;font-size:.85rem;margin-top:.25rem}
/* Entries */
.entry{margin-bottom:1.2rem}
.entry-header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0 1rem}
.entry-header .dates{font-size:.85rem;color:var(--color-muted);white-space:nowrap}
.entry-meta{font-size:.9rem;color:var(--color-muted)}
.entry ul{margin:.35rem 0 0 1.2rem;font-size:.92rem}
.entry li{margin-bottom:.2rem}
.entry li::marker{color:var(--color-accent)}
/* Skills */
.skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.8rem}
.skill-group h3{font-size:.9rem;margin-bottom:.2rem}
.skill-group .keywords{display:flex;flex-wrap:wrap;gap:.3rem}
.skill-group .keyword{
  font-size:.8rem;padding:.15rem .5rem;border-radius:3px;
  background:var(--color-section-bg);border:1px solid var(--color-border);
}
/* Languages */
.languages-list{display:flex;flex-wrap:wrap;gap:.5rem 1.5rem}
.language-item{font-size:.92rem}
.language-item .fluency{color:var(--color-muted);font-size:.85rem}
/* Interests */
.interests-list{display:flex;flex-wrap:wrap;gap:.5rem 1.5rem}
.interest-item{font-size:.92rem}
.interest-item .keywords-inline{color:var(--color-muted);font-size:.85rem}
/* Responsive */
@media(max-width:600px){
  .entry-header{flex-direction:column}
  .skills-grid{grid-template-columns:1fr}
}`;

// ── Handlebars Template ──────────────────────────────────────────────
const template = Handlebars.compile(`\
<!DOCTYPE html>
<html lang="{{basics.language}}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{{basics.name}}{{#if basics.label}} // {{basics.label}}{{/if}}</title>
  <meta name="description" content="{{basics.summary}}">
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <style>{{{css}}}</style>
</head>
<body>
  {{!-- ═══ BASICS ═══ --}}
  {{#if basics}}
  <header class="header">
    <h1>{{basics.name}}</h1>
    {{#if basics.label}}<p class="label">{{md basics.label}}</p>{{/if}}

    <div class="contact">
      {{#if basics.email}}<a href="mailto:{{basics.email}}">{{basics.email}}</a>{{/if}}
      {{#if basics.phone}}<span>{{basics.phone}}</span>{{/if}}
      {{#if basics.url}}<a href="{{basics.url}}" target="_blank" rel="noopener">{{basics.url}}</a>{{/if}}
      {{#if basics.location}}
        <span>
          {{#if basics.location.city}}{{basics.location.city}}{{/if}}{{#if basics.location.region}}, {{basics.location.region}}{{/if}}{{#if basics.location.countryCode}} · {{basics.location.countryCode}}{{/if}}
        </span>
      {{/if}}
    </div>

    {{#if basics.profiles}}
    <div class="profiles">
      {{#each basics.profiles}}
        <a href="{{this.url}}" target="_blank" rel="noopener">{{this.network}}{{#if this.username}}: {{this.username}}{{/if}}</a>
      {{/each}}
    </div>
    {{/if}}

    {{#if basics.summary}}<p class="summary">{{basics.summary}}</p>{{/if}}
  </header>
  {{/if}}

  {{!-- ═══ WORK EXPERIENCE ═══ --}}
  {{#if work}}
  <section>
    <h2>Work Experience</h2>
    {{#each work}}
    <div class="entry">
      <div class="entry-header">
        <h3>{{md this.position}}{{#if this.name}} · <a href="{{this.url}}" target="_blank" rel="noopener">{{this.name}}</a>{{/if}}</h3>
        <span class="dates">{{formatDate this.startDate}} — {{formatDate this.endDate}}</span>
      </div>
      {{#if this.location}}<div class="entry-meta">{{md this.location}}</div>{{/if}}
      {{#if this.summary}}<p class="entry-meta" style="margin-top:.25rem">{{md this.summary block=true}}</p>{{/if}}
      {{#if this.highlights}}
      <ul>
        {{#each this.highlights}}<li>{{md this}}</li>{{/each}}
      </ul>
      {{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{!-- ═══ EDUCATION ═══ --}}
  {{#if education}}
  <section>
    <h2>Education</h2>
    {{#each education}}
    <div class="entry">
      <div class="entry-header">
        <h3>{{this.studyType}}{{#if this.area}} in {{this.area}}{{/if}}{{#if this.institution}} · <a href="{{this.url}}" target="_blank" rel="noopener">{{this.institution}}</a>{{/if}}</h3>
        <span class="dates">{{formatDate this.startDate}} — {{formatDate this.endDate}}</span>
      </div>
      {{#if this.score}}<div class="entry-meta">GPA: {{this.score}}</div>{{/if}}
      {{#if this.courses}}
      <ul>
        {{#each this.courses}}<li>{{this}}</li>{{/each}}
      </ul>
      {{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{!-- ═══ SKILLS ═══ --}}
  {{#if skills}}
  <section>
    <h2>Skills</h2>
    <div class="skills-grid">
      {{#each skills}}
      <div class="skill-group">
        <h3>{{md this.name}}{{#if this.level}} <span style="font-weight:400;color:var(--color-muted);font-size:.8rem">· {{this.level}}</span>{{/if}}</h3>
        {{#if this.keywords}}
        <div class="keywords">
          {{#each this.keywords}}<span class="keyword">{{md this}}</span>{{/each}}
        </div>
        {{/if}}
      </div>
      {{/each}}
    </div>
  </section>
  {{/if}}

  {{!-- ═══ LANGUAGES ═══ --}}
  {{#if languages}}
  <section>
    <h2>Languages</h2>
    <div class="languages-list">
      {{#each languages}}
      <div class="language-item">
        <strong>{{md this.language}}</strong>
        {{#if this.fluency}}<span class="fluency">({{md this.fluency}})</span>{{/if}}
      </div>
      {{/each}}
    </div>
  </section>
  {{/if}}

  {{!-- ═══ INTERESTS ═══ --}}
  {{#if interests}}
  <section>
    <h2>Hobbies &amp; Interests</h2>
    <div class="interests-list">
      {{#each interests}}
      <div class="interest-item">
        <strong>{{this.name}}</strong>
        {{#if this.keywords}}<span class="keywords-inline"> — {{join this.keywords}}</span>{{/if}}
      </div>
      {{/each}}
    </div>
  </section>
  {{/if}}

</body>
</html>`);

// ── Render Function ──────────────────────────────────────────────────
export function render(resume) {
  return template({ ...resume, css });
}
