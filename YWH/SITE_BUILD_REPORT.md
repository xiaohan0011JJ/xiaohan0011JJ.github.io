# Build and Verification Report

Generated on **2026-11-09**.

## Passed

- **PASS** — `python scripts/validate_site.py`: 20 unique HTML IDs; 22 HTML links; three asset paths; two verified publication records; valid JSON-LD; valid anchor targets; local resources present.
- **PASS** — `node --check main.js`: JavaScript syntax check.
- **PASS** — `python -m compileall -q scripts`: validation script bytecode compilation.
- **PASS** — GitHub Pages folder includes root `index.html`, styles and scripts, and `.nojekyll`.

## Not run / constraints

- **NOT RUN** — Full desktop/mobile browser screenshot and interaction checks: this execution environment blocked Chromium navigation to both localhost and file URLs (`ERR_BLOCKED_BY_ADMINISTRATOR`). The shipped sources remain available for local testing on the user's computer. Do not describe this as a browser test pass.
- **NOT DONE** — Public deployment: requires repository selection / GitHub account authorization.
- **NOT DONE** — Email, ORCID, Google Scholar and portrait: exact profile information not supplied, so these were not guessed.

See `README.md` for local preview and GitHub Pages instructions, and `CODEX_PROMPT.md` for Codex with mandatory build/QA steps.
