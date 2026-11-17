# Dima Williams — Portfolio

A static, responsive Astro portfolio for Dima Williams, AWS Solutions Architect and Data / ML Engineer at Cloud Heights Solutions Ltd. The site is built entirely at build time; there is no backend or runtime data service.

## Local development

Requirements: Node.js 22.23.4+ and npm.

```sh
npm ci
npm run dev
```

Astro prints the local preview address. Build and test the static site with:

```sh
npm run build
npm test
npm run preview
```

The static site is written to `dist/` and can be hosted on GitHub Pages, S3, or any static web host.

## Add a PoC

1. Create a Markdown file in `src/content/pocs/`, for example `src/content/pocs/my-project.md`.
2. Add a corresponding image in `public/images/` (SVG, WebP, PNG, or JPG) and set `image` to its public path, such as `/images/my-project.svg`.
3. Add the frontmatter fields shown below. `category` must be one of the four listed slugs. Use real repository and demo URLs before publishing; placeholder links are used by the starter examples.
4. Write the body using the three section headings `## Problem`, `## Architecture`, and `## Results`.
5. Run `npm run build` locally, then commit and push. The category listing and detail page are generated automatically from the Markdown file.

```yaml
---
title: My Project
category: solutions-architecture
summary: A short description of the problem and what the proof of concept explores.
awsServices:
  - Amazon S3
  - AWS Lambda
repoUrl: https://github.com/your-username/my-project
demoUrl: https://example.com/my-project-demo
image: /images/my-project.svg
date: 2026-11-17
---

## Problem
Describe the problem.

## Architecture
Describe the design and AWS services.

## Results
Describe measured or expected outcomes and note any limitations.
```

Supported categories:

- `solutions-architecture` — Solutions Architecture
- `data-engineering` — Data Engineering
- `ml-engineering` — ML Engineering
- `ai-genai` — AI / GenAI

The included four sample PoCs are clearly labeled placeholders. Replace their content, links, and images with verified project details before sharing the site publicly.

## Contact links

The homepage contact links point to Dima’s email, LinkedIn, GitHub, and Cloud Heights Solutions website.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on pushes to `main` (and on a manual workflow run with **GitHub Pages** selected). In repository settings, enable GitHub Pages with **GitHub Actions** as the source.

To deploy to S3 instead, manually run the workflow and choose **S3**. Configure these repository secrets first:

- `AWS_ROLE_ARN` — role assumed via GitHub Actions OIDC; grant it permission to sync the deployment bucket.
- `AWS_REGION` — target AWS region.
- `S3_BUCKET` — bucket name for the static site.
- `CLOUDFRONT_DISTRIBUTION_ID` — optional; set to invalidate `/*` after upload.

The default Astro configuration targets `https://dimawill.github.io/portfolio/` (`site: https://dimawill.github.io`, `base: /portfolio`). The workflow sets the repository base path automatically. To switch to `portfolio.cloudheightsolutions.com`, configure the domain in repository Pages settings and add `public/CNAME` containing `portfolio.cloudheightsolutions.com`. The deploy workflow detects `public/CNAME`, uses that domain as `SITE_URL`, and switches the base path to `/`. For local builds or other hosts, the Astro config can also be overridden with `SITE_URL` and `PUBLIC_BASE_PATH`.
