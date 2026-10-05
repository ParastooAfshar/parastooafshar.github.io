# parastooafshar.github.io

Minimal academic website and public research log built with Jekyll and GitHub Pages.

## 1. Publish on GitHub Pages

1. Create or use the repository `parastooafshar.github.io`.
2. Put these files in the repository root.
3. Push to the `main` branch.
4. In GitHub: **Settings → Pages → Build and deployment → Source → Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. The site will be available at `https://parastooafshar.github.io` after GitHub finishes the deployment.

## 2. Add your real links

Edit `_config.yml`:

```yml
github_url: "https://github.com/parastooafshar"
linkedin_url: "https://www.linkedin.com/in/your-profile/"
email: "you@example.com"
cv_url: "/cv.pdf"
```

Leave any value empty (`""`) to hide that link from the site. If you enable `cv_url`, add `cv.pdf` to the repository root.

## 3. Add a research note

Create a Markdown file inside `_notes/`, for example:

```text
_notes/2026-10-llm-code-review.md
```

Use:

```yaml
---
layout: note
title: "LLMs for Code Review"
date: 2026-10-05
description: "Notes from recent work on LLM-assisted code review."
tags: [LLM, Software Engineering, Paper]
lang: en
dir: ltr
---
```

Then write the note in Markdown below the front matter.

For a Persian note, use:

```yaml
lang: fa
dir: rtl
```

## 4. Draft without publishing

Add this to a note's front matter:

```yaml
published: false
```

The file stays in the repository but is not included in the generated site.

## 5. Light / dark mode

The site follows the visitor's system theme by default. The theme button stores a manual choice in the browser.
