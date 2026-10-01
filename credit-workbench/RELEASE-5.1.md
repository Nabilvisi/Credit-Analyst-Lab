# Credit Workbench 5.1 acceptance record

Requirements: the fourth workspace update and fifth update (version 5.1). The fifth update governs overlaps; the fourth update's document retrieval and provider dispatcher detail is retained. All five sprints are connected to the existing corporate, consumer and issuer tools.

| Specification | Implementation | Evidence |
|---|---|---|
| Sections 1–3: client architecture | Static SPA, pure model, local storage/IndexedDB, local dependencies and native workers | Syntax checks, browser routes/worker, deployed-file comparison |
| Section 4: contracts | Version 5.1 declarations and runtime schema, legal/simulation/document state, preserved migration | `workspace-contracts.d.ts`, schema and 2.0/2.1 migration tests |
| Section 5: underwriting | Annuity/equal principal, grace inside tenor, withholding credit timing, existing debt roll-forward, confirmed KMK, DSRA, lender exposure and reverse stress | Original underwriting tests; reactive browser gates |
| Section 6: collateral | Delivery discount, inception snapshot, depreciation, recovery cost/delay, shaded deficit, peak/window, full-curve equity cure and CSV | Inception and cure residual tests; browser chart/monthly evidence |
| Section 7: simulation | Seeded 5,000-trial worker, triangular/normal/lognormal draws, 25-bin histogram, quantiles, frequencies, lifetime cash/coverage, cancellation and staleness | Reproducibility, deterministic equivalence, sample conservation, negative cash/all-equity tests; browser worker/Chart.js |
| Section 8: legal | AHU/authority, applicable RUPS, fiduciary security, ownership, insurance/cash control, CP/CS stages, analyst/reference, due dates, readiness hold | CP/CS and evidence tests; browser hold/readiness recording |
| Sections 9–10: copilot | Fresh calculated context, local analysis, PDF.js extraction, Orama full-text retrieval, page citations, drawer, quick chips and memo transfer | Browser PDF worker/retrieval, inert document text, context/staleness checks |
| Section 10: BYOK | Gemini/OpenAI/Claude, user model ID, explicit consent, session-only key, timeout/cancel/errors | Three-provider mocked transport; browser consent check; storage excludes keys |
| Section 11: defenses | Prior valid state retained, missing ratios, negative deficits, legal gate, conserved histogram, stale evidence exclusion, encrypted backups | 54 automated tests; browser encrypted export/restore |
| Section 12: five sprints | Core, ingestion/spreading, collateral/legal, simulation and copilot in one institutional case and committee proposal | End-to-end browser suite, source modules and memo export inspection |
| Section 13: reactive loop | Utilization/DSO sliders, repayment switch, autosave/reload, Blob JSON backup | `tests/browser-5.1.js` and separate reload check |

## Corrections to example formulas and claims

Deficits remain negative; zero debt produces unavailable coverage rather than 0 or 999. Lender and all-bank exposure stay distinct; proposed exposure uses the proposed facility. Only confirmed KMK supports liquidity. The original exact reverse stress and withholding-credit timing controls are retained.

Additional equity is solved against every outstanding-principal observation. Subtracting only the peak currency deficit can leave later gaps because a lower starting loan changes the entire amortization curve. Modeled coverage does not guarantee realized recovery.

Simulation uses current repayment, grace, seasonality, existing debt, reserves, withholding credits and covenant inputs instead of the sample's hard-coded equal-principal/three-month/1.25 assumptions. All histogram samples are retained, including negative and extreme tails. A reproducible seed and exact input snapshot reveal stale runs. P5 DSCR is a ratio percentile, not monetary VaR. Frequency below 1× indicates conditional repayment-capacity shortfall, not calibrated borrower default probability or legal default.

Legal checklist completion records configured evidence, not enforceability or a universal legal prohibition. CS remains distinct from CP, and an empty mandatory checklist cannot claim readiness. The readiness control records a memo note; it never approves a loan or transfers funds. Templates require counsel review of amendments, applicability and institution policy.

Orama uses the specified full-text retrieval flow; there are no embeddings or implied vector accuracy. PDF extraction attributes pages and does not perform OCR. External AI contradicts an unconditional zero-cloud claim: local analysis works without it, while explicitly authorized BYOK requests send a disclosed snapshot, question and retrieved excerpts. Provider usage may cost money.

## Assumptions and verification limits

Simulation draws independent marginal shocks that persist over the loan life. It does not estimate correlation, macro regimes, default transitions, recovery probability or new borrowing. Lifetime cash assumes continuous billing through the loan tenor, including renewal beyond any current contract expiry; contract mismatch remains a separate visible diligence issue. DSO creates an inception working-capital drag. KMK availability supports liquidity, not CFADS.

One browser acceptance run measured approximately 12.1 ms for synchronous slider dispatch/render and 38.5 ms for 5,000 worker trials. Measurements exclude worker startup/chart rendering and do not guarantee <16 ms interaction or <200 ms simulation on every device or case.

Provider adapters were validated with mocked transport without paid live calls. Account/model access and browser CORS support are user-dependent. This remains a personal workspace with no shared login, server database, immutable audit service, calibrated rating model or production loan servicing.

Final deployed-site acceptance: all 22 workflow checks passed on GitHub Pages, including PDF extraction, the actual Monte Carlo worker and chart, encrypted restore, and consent enforcement with mocked provider transport. All 54 automated tests, application syntax checks and pinned vendor checksums passed. At a 390 × 844 viewport, named mobile navigation opened legal diligence and the page had no horizontal overflow. The browser test waits for asynchronous chart initialization before asserting readiness.

## Privacy and portability

Autosave remains unencrypted in localStorage/IndexedDB. Encrypted downloaded backups use AES-256-GCM, PBKDF2-SHA256 with 250,000 iterations, and random salt/nonce. Wrong passwords and altered ciphertext fail before replacement. Passwords, provider keys and chat history are session-only and excluded from exports. No password recovery service exists. Extracted document text is backed up; original PDF files are not retained.

Pinned versions, licenses and checksums are in `dist/vendor/`. The portable dependency build/lockfile are in `build-tools/`; production hosting requires no package installation.

Sources: [fiduciary registration regulation](https://jdih.mahkamahagung.go.id/legal-product/pp-nomor-21-tahun-2015/download/dokumen), [company-law source](https://www.ditjenpas.go.id/uu-no-40-tahun-2007-perseroan-terbatas), [PDF.js](https://mozilla.github.io/pdf.js/getting_started/), [Orama search](https://docs.orama.com/docs/orama-js/search), [Gemini authentication](https://ai.google.dev/gemini-api/docs/generate-content/api-key), and [Anthropic browser support](https://github.com/anthropics/anthropic-sdk-typescript).
