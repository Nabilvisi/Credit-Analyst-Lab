# Credit Analyst Lab

An independent, end-to-end equipment-finance credit portfolio prepared for the Komatsu Astra Finance Credit Analyst interview. It demonstrates senior-level analytical structure without claiming prior credit employment, actual underwriting approval or KAF affiliation.

## The credit decision

A fictional contractor requests Rp21bn for five units costing Rp30bn. Base DSCR is **1.39×**, but downside falls to **0.96×**. Evaluate a **Rp16bn facility cap**: base coverage **1.83×**, downside **1.26×**. First-year downside after slower collections is only **1.00×**, requiring independently verified working capital and cash reserves. Severe stress still fails. Recommendation: **conditional restructure, subject to diligence; defer/decline if conditions cannot be met**.

## Deliverables

- Responsive portfolio and interactive scenario lab: utilization, tariff, fuel, interest, DSO, facility size, recovery and assumed PD; shareable URL state.
- Project cash bridge, reverse stress, sensitivity matrix, 48-month amortization, collateral recovery and illustrative expected loss.
- [Credit committee PDF](public/credit-memo.pdf) and [English/Bahasa interview guide](public/interview-guide.pdf).
- [Methodology](docs/methodology.md), auditable [source manifest](data/sources.json), raw public data, processed results and CSV exports.
- Deterministic model checks and browser verification.

## Reproduce

Requires Node 22+ and Python 3.12+. Frontend has **zero third-party browser dependencies**. Report generation uses ReportLab.

```sh
python3 -m pip install -r requirements.txt
npm run build
npm test
npm run serve
```

Visit `http://localhost:8000`. Build runs offline from retained data: checksum validation → market aggregation → financial model → PDFs → static `dist/`. To serve production output: `python3 -m http.server 8000 --directory dist`.

`public/model.js` is shared by browser and Node. `scripts/prepare_data.py` owns normalization, `scripts/analyze.mjs` owns computed exports, `scripts/report.py` generates PDFs. Frontend DOM/SVG encodes values directly, with exact-value tables, keyboard controls, mobile layout, reduced-motion handling and downloadable fallbacks. No remote scripts or fonts are required.

## Evidence

- [EIA Brent](https://www.eia.gov/dnav/pet/hist/RBRTED.htm) via [DataHub oil-prices](https://github.com/datasets/oil-prices): annual means 2015–2025; USD/barrel. Fuel-risk context, not coal or actual Indonesian diesel pricing.
- [World Bank Indonesia GDP](https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=ID) via [DataHub GDP](https://github.com/datasets/gdp): nominal current USD; available through 2023 in the retrieved mirror, not real growth.

Retrieved 30 September 2026; market analytical cutoff 31 December 2025. Raw inputs retain blob IDs and SHA-256 checksums. Mirrors use PDDL; upstream EIA public data and World Bank CC BY 4.0 attribution retained. Authored code/documentation: MIT; dataset terms remain separate.

## Limitations

The borrower, operating inputs, corporate screening history, proposed terms, PD, recovery and covenant thresholds are synthetic. The project is assumed segregated with no existing debt. Group-wide debt service, actual statements, credit history, industry refresh, legal security, contracts and field survey must be obtained before any live decision. No calibrated rating, IFRS 9 estimate, actual lease pricing or KAF policy is claimed.

## Present in five minutes

1. Introduce the financing request and primary repayment source.
2. Walk from equipment utilization to CFADS and DSCR.
3. Select **Downside** at Rp21bn to show why base-only approval fails.
4. Switch to **Rp16bn**; explain why DSO still requires liquidity protection.
5. Finish with conditions precedent, project survey and early warnings.
