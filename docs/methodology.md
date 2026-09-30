# Credit model methodology

This is an independent learning case for Indonesian equipment financing. The borrower and all credit inputs are synthetic. Public data informs fuel-risk and macro context only; no regression or calibrated risk rating is claimed.

## Units and formulas

Money: IDR billion, except hourly tariffs/costs in IDR million. Time: monthly. Annual nominal interest / 12 is the monthly reducing-balance rate.

- Billed hours = 5 units × 250 available hours × utilization.
- Revenue = billed hours × tariff / 1,000.
- EBITDA = revenue − billed-hour fuel and other variable costs − fixed overhead.
- Cash-tax proxy = max(0, EBITDA − depreciation) × 22%. No interest deduction is assumed. It is a conservative unlevered proxy, not a tax opinion.
- CFADS = EBITDA − cash tax − maintenance capex reserve.
- Payment = principal × monthly rate / [1 − (1 + monthly rate)^−tenor]. At zero interest: principal / tenor.
- Steady-state DSCR = CFADS / monthly payment.
- Incremental receivables = monthly revenue × max(0, scenario DSO − baseline 45) / 30.
- First-year coverage = (12 × CFADS − incremental receivables) / (12 × payment).
- Liquidity headroom = assumed unrestricted cash (Rp6.5bn) − three-payment reserve − incremental receivables. Customer equity is assumed to come from **additional** fresh funds. All cash availability requires validation.
- Origination gross recovery = Rp30bn asset package × assumed forced-sale percentage.
- Net recovery = gross recovery − 10% realization costs.
- LGD = max(0, initial principal − net recovery) / initial principal.
- One-year illustrative EL = judgmental PD × LGD × origination EAD. No recovery delay or discounting; not IFRS 9.

Collections shock is recognized once in month 1 of the illustrative cash-after-debt schedule and once in first-year coverage, not deducted every month. This is a simplified incremental funding shock: baseline working capital is assumed already funded. Liquidity headroom indicates total assumed support capacity, not the same thing as cash generation or DSCR.

## Scenarios and decision

Requested: Rp21bn, 48 months, 13% base nominal rate. Proposed for diligence: Rp16bn, same tenor. Base: 75% utilization, Rp1.85m tariff/hour, Rp0.36m fuel/hour, 45 DSO. Downside: 65%, tariff −5%, fuel +15%, 16% interest, 75 DSO. Severe: 50%, tariff −10%, fuel +25%, 18% interest, 105 DSO.

Interest shocks reflect repricing/refinancing, not contractual changes to a fixed-rate loan. If the actual facility is fixed, hold its rate constant. Model inputs do not assert dealer equipment prices, KAF product pricing or policy thresholds.

Debt sizing at a 1.10× downside floor yields about Rp18.38bn. A judgmental cap of Rp16bn gives about 1.26× downside steady-state coverage. First-year downside coverage is only about 1.00× after the DSO shock. This motivates separately funded working capital and a reserve, not unconditional approval. Severe coverage remains below 1.0×.

Reverse stress uses bisection to find utilization where base-case requested DSCR = 1.25×; boundary ~68.2%. The sensitivity matrix varies utilization and tariff while holding other requested-facility inputs constant.

## Borrower screening assumptions

2023/2024/2025 revenue: 90/105/120; EBITDA: 18/25/32; OCF: 12/16/20; gross debt: 28/30/32; unrestricted cash: 4/5/6.5 (all Rpbn). These are separate illustrative corporate screening inputs, not an integrated three-statement forecast. Corporate debt is excluded from project DSCR because the modeled project has no existing debt; actual group debt service must be added before underwriting. OCF/EBITDA in 2025 = 62.5% is a prompt for cash-conversion investigation, not evidence of fraud or approval readiness.

## Public data

EIA Brent via `datasets/oil-prices`: daily observations, calendar-year arithmetic means 2015–2025. No missing-date imputation. Brent is a fuel-cost risk proxy, not coal pricing or local diesel pricing.

World Bank GDP via `datasets/gdp`: Indonesia, NY.GDP.MKTP.CD, 2015–2023, nominal current USD divided by 1bn. This is not real GDP growth. Latest mirror Indonesia data ends in 2023. No extrapolation. Both sources retrieved 2026-09-30; price data after 2025 intentionally excluded. Raw source blob SHAs and byte checksums retained in `data/sources.json`.

## Limits

No actual borrower accounts, authorized credit-bureau history, coal series, diesel invoices, appraisals, legal advice or corporate debt schedule. Constant monthly operations omit seasonality, ramp-up and timing of individual downtime events. No VAT, fees, exact lease accounting or balloon. Covenants and PD are illustrative, not KAF policy. A reserve supports liquidity; it does not cure a permanently unviable project.
