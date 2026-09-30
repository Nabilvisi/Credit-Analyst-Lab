# Deployment

The portfolio source is published in `Nabilvisi/Credit-Analyst-Lab` on `main`.

GitHub Pages workflow: `.github/workflows/pages.yml`. It validates the five financial model checks, packages `public/` and deploys through GitHub's official Pages actions. No external deployment tokens are stored in source.

## One-time account setting

1. Open https://github.com/Nabilvisi/Credit-Analyst-Lab/settings/pages.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open https://github.com/Nabilvisi/Credit-Analyst-Lab/actions/workflows/pages.yml and use **Run workflow**, or rerun the failed deployment.
4. Wait for a successful **Deploy** step. Its environment URL is the authoritative live link.

Expected public address after successful deployment: https://nabilvisi.github.io/Credit-Analyst-Lab/. This address is not a confirmed live deployment until the workflow succeeds.

## Verified initial attempt

Run https://github.com/Nabilvisi/Credit-Analyst-Lab/actions/runs/36711352041 passed all five model checks. It was blocked during Pages setup because the site had not been enabled and GitHub returned `Resource not accessible by integration` for automatic creation. The connected tool cannot change the repository's Pages setting. Enablement is an account action, not a code fix.

Both PDFs and all source/data files are already available in the repository. Local Chromium validation passed at 375, 390, 768 and 1440 px; see validation.md.

An alternate Sites hosting attempt could not push through the execution environment's network proxy. Its unused private configuration remains local and is excluded from public source.
