# TEST Mobile — Interactive Preview

A responsive, browser-based preview of the TEST lending-marketplace mobile app.

## What this is

- A front-end prototype built with HTML, CSS and vanilla JavaScript.
- Fictional sample institutions, offers, applications and account data.
- Local-only interactions. No real authentication, transactions, financial decisions or API calls.
- Designed to visually track the standalone Flutter app while allowing interface experiments independently.

## Run locally

Open `index.html` in a browser, or serve this directory with any static web server.

## GitHub Pages

This repository includes a GitHub Actions workflow for deployment. In the repository settings, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. Pushes to `main` will then publish the preview.

## Project structure

- `index.html` — application entry point.
- `styles.css` — Royal Blue and Amber design system.
- `app.js` — screens, navigation and demo interactions.
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment.

All sample information is illustrative and must not be treated as a real financial offer.
