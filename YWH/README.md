# Weihan Yuan (袁伟涵) — Academic Homepage

A responsive, English-language personal academic website that can be published for **free on GitHub Pages**, without Node.js dependencies or a backend.

## 1. Files

```
weihan-yuan-academic-site/
├── index.html                # Page content, papers, education, links, structured data
├── styles.css                # Responsive academic design + light/dark themes
├── main.js                   # Mobile navigation, theme switch, BibTeX copy
├── assets/favicon.svg       # Simple WY initials; NOT a real portrait
├── scripts/validate_site.py  # Dependency-free HTML + link + metadata checks
├── CODEX_PROMPT.md           # Copy-and-paste Codex instructions
├── REFERENCES.md             # Evidence and bibliographic records
└── .nojekyll                 # GitHub Pages without Jekyll processing
```

## 2. View locally (Windows / macOS / Linux)

The fastest option: double-click `index.html`. Some clipboard APIs require localhost, so for full testing run a local HTTP server:

```bash
cd weihan-yuan-academic-site
python -m http.server 8000
```

Visit **http://localhost:8000** in a browser. Stop the server with `Ctrl+C`.

## 3. Publish to GitHub Pages

1. Sign into GitHub and create a **public** repository named **`YOUR-USERNAME.github.io`** (replace `YOUR-USERNAME` with your actual GitHub username). For a profile site, the spelling of the repository name matters.
2. Upload **the contents of this folder**, including `index.html`, `styles.css`, `main.js`, `.nojekyll`, and `assets/`, to the root of the repository. In GitHub: **Add file → Upload files → Commit changes**. GitHub's web uploader may hide dotfiles on some systems; `.nojekyll` can also be created with **Add file → Create new file**.
3. Open **Settings → Pages → Build and deployment**. Select **Source: Deploy from a branch**, **Branch: `main`**, **Folder: `/ (root)`**; click **Save**.
4. Once GitHub Pages shows a successful deployment, open **https://YOUR-USERNAME.github.io/**.
5. Add the final, working homepage URL to **OpenReview → Profile → Edit Profile → Personal Links** if this link is appropriate for your conference profile.

A standard public GitHub Pages site is publicly discoverable; **never** commit private manuscripts, internal research logs, unapproved photos, private email addresses, or reviewer information.

Official GitHub instructions:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 4. What to customize before publishing

- `index.html` → **About Me**: Confirm current degree stage and precise institutional affiliation.
- `index.html` → **Research Interests**: These are broad topic descriptions, not publication claims. Revise to match the owner's preferences.
- `index.html` → **Publications**: Both entries have been verified and already include links. Add new papers only after verifying publisher metadata and publication status.
- `index.html` → **Contact**: Add an email, ORCID ID, GitHub account or Scholar profile **only after the owner has provided/confirmed the correct public link**. No contact addresses have been guessed.
- `index.html` → `<script type="application/ld+json">`: Update person metadata and add the real published page URL (if desired). Never use false social/ORCID links.
- `assets/`: Replace the initials graphic with a **consented and owned** professional headshot only if desired; currently the page uses a neutral monogram.
- `styles.css`: Theme colors and layout.

**For double-blind submissions:** This is an independent public researcher homepage, not a conference submission announcement. Do not post, link, or reveal anonymous, unpublished submissions (including CVPR submissions) on the page unless rules and timing explicitly allow it. Do not falsely label research as accepted.

## 5. Quality checks (must pass after modifications)

```bash
python scripts/validate_site.py
node --check main.js
python -m compileall -q scripts
```

Then start `python -m http.server 8000` and manually verify at both desktop and mobile widths:
- Page loads with **no browser console errors**.
- All main navigation links scroll to the correct section.
- Light/dark button works; dark mode stays after refreshing.
- Mobile navigation opens and closes correctly.
- Both publication DOI links lead to their actual papers.
- BibTeX copy buttons work in a secure browser context or show a selectable fallback.
- Text is readable; there is no horizontal overflow.

## 6. Source verification and limits

See [REFERENCES.md](REFERENCES.md). The public sources match a 2023 Hebei University journal paper, a 2025 UCAS/IIE/CAS conference paper, and institutional education records. Other same-name search hits (including unrelated optics and engineering papers) were excluded to prevent misattribution. **This is not a claim of an exhaustive bibliography.**

Site content verified against public metadata on **2026-11-09**. Please confirm personal and current degree details with the researcher before publishing as an official personal page.
