# Credit Workbench

A browser-based analyst workspace covering corporate / SME lending, consumer loans, and issuer credit. This is a standalone addition to Credit Analyst Lab.

## Run

Node.js 22 or newer. No package installation or build step is required.

```sh
npm test
npm run check
npm start
```

Open http://127.0.0.1:4173. Deploy the `dist/` directory on a static host. Sites configuration is in `.openai/hosting.json`.

## Analyst workflow

1. Start with 30 illustrative credit records, or import CSV / JSON in Data workspace.
2. Filter by segment, currency, sector, or risk status. Select a record.
3. Review and edit financial inputs, source dates, and missing data.
4. Assess DSCR, debt / EBITDA, interest coverage, liquidity, DTI, LTV, or indicative bond value as applicable.
5. Adjust screening thresholds and investigate the watchlist.
6. Run base, downside, or severe scenarios; customize income, revenue, margin, rate, and PD assumptions.
7. Save an analyst memo with rationale, risks, conditions, and next review. Export HTML or print to PDF.
8. Export a JSON backup to retain the portfolio, policy, and drafts across browsers.

## Data contract

Required: `id,name,type,sector,currency,exposure,as_of`. Type is `corporate`, `consumer`, or `issuer`. Currency is an uppercase three-letter code. Monetary values use whole currency units. Dates use YYYY-MM-DD. Financial values cover an annual period; consumer income and payments are monthly. PD, LGD, coupon and yield are decimals (0.02 = 2%). Blank optional fields are unavailable, not zero.

Import accepts up to 10,000 records / 5 MB, with unique IDs and one current observation per credit. Validation completes before replacement. Currencies remain separate; no currency conversion or mixed-currency totals. Spreadsheet formula prefixes are escaped on CSV export.

## Methodology and boundaries

DSCR is CFADS / annual debt service. Net debt subtracts cash. Ratios require a positive denominator. Portfolio ratios are exposure-weighted over available observations. Indicative expected loss uses outstanding exposure × supplied 12-month PD × supplied LGD and reports exposure coverage. It is not a calibrated model or an IFRS 9 / CECL provision.

Corporate stress changes revenue and EBITDA margin, scales CFADS with EBITDA, and assumes all debt immediately reprices. Consumer stress holds payments constant. Bond pricing discounts annual coupons and principal; it omits accrued interest, options and default adjustment. Screening limits are analyst-configurable assumptions, not automatically contractual covenants. Memos remain drafts requiring independent review.

This version supports a personal browser workspace. It does not provide team access controls, a server database, immutable audit history, live bureau integration, statement spreading from PDFs, or automated credit approval. Browser local storage is not encrypted by this application; use approved data handling practices for confidential records. The app makes no network requests containing uploaded records.

## Public data

`dist/macro.json` contains an Indonesia World Bank WDI snapshot retrieved 2026-09-30. Observation years are shown separately. Indicators: NY.GDP.MKTP.KD.ZG (real GDP growth), FP.CPI.TOTL.ZG (consumer inflation), FR.INR.LEND (lending interest rate). Sources link to the World Bank; dataset terms remain with the data provider. A user-triggered refresh requests the public API with a timeout and preserves the snapshot if unavailable.

- API documentation: https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures
- Dataset terms: https://www.worldbank.org/en/about/legal/terms-of-use-for-datasets

All borrower names, financial inputs, loss assumptions and statuses in the demo are illustrative. An optional feature-detected WebMCP tool exposes the current visible portfolio summary as read-only data.
