# Credit Workbench 2.1 acceptance record

This release implements the connected analyst workflow described in the three workspace recommendations, using the latest 2.1 specification for overlapping requirements. It is a personal, browser-local decision support application. Sample borrowers and equipment finance inputs are illustrative.

| Workflow | Implementation | Validation |
|---|---|---|
| Borrower and portfolio review | Corporate/SME, consumer and issuer views, filters, record editing, watchlist, ratio calculations, currency separation | Original 10 model tests |
| Deal structure | Requested, proposed cap and downside matrix; custom sensitivity; annuity/equal principal; interest-only grace inside tenor; seasonal repayments | Amortization, conservation and independent PV tests; browser recalculation |
| Operating cash flow | Equipment operating hours, tariff, fuel/pass-through, operator, overhead, maintenance, withholding and explicit credit timing | Independent cash bridge example; negative cash preservation |
| Global repayment and liquidity | Existing facilities, principal roll-forward, shocked interest, confirmed KMK availability, DSO drag and DSRA | Existing facility, DSCR and KMK tests |
| Reverse stress and sizing | Piecewise algebraic break-even utilization and covenant-constrained indicative cap | Forward calculation residual tests; over-capacity cases remain visible |
| Collateral | Appraised value, reducing-balance depreciation, forced-sale recovery, realization cost and delay, recovery gaps, monthly schedule export | Independent recovery and depreciation examples |
| Bank reconciliation | Monthly CSV, explicit exclusions, period checks, bounce/low balance/circular flags | Model tests and browser CSV replacement preview |
| Historical spreading | Annual and YTD income/balance/CFO inputs, Excel/CSV import, balance check, signed normalization, affiliate deduction, common-size, configurable audit sensitivities | Spread tests and browser Excel round trip; incomplete CSV rejected without replacing data |
| Governance | Borrower SLIK/RKAB inputs, lender versus all-bank group exposure, compliance ceiling, guarantee/cross-default and contract evidence, weighted qualitative overlay | Group scope and qualitative weight tests; visible breach browser check |
| Calculation audit | Click populated CFADS, debt service, DSCR, break-even, NWC, ICR and CFO/EBIT results | Browser formula dialog plus model calculations |
| Committee memo | Editable rationale, recommendation, conditions, exceptions and review date; populated term sheet, historical summary, scenario matrix and risks | Autosave browser check; generated DOCX ZIP and document XML inspected |
| Backup and recovery | Local storage and IndexedDB, structured JSON export/restore, schema validation and compatible 2.0 migration | Restore preview browser check; migration tests retain original values and reject incomplete legacy exposure |

Validation: 38 automated tests passed. Browser checks passed for scenario recalculation, rejected invalid inputs, annuity/grace, formula audit, common-size, bank exceptions, group breach, memo autosave, Excel/CSV import and JSON restore. DOCX generation was validated by inspecting its ZIP signature and `word/document.xml` for borrower, term sheet, scenario and conditions sections. The initial browser automation download transport canceled a Blob download; document generation was subsequently verified directly. A browser-local change history is diagnostic and editable, not an immutable audit trail.

Model choices correct ambiguous or inconsistent example formulas: deficits remain negative; proposed group exposure uses the proposed amount; unconfirmed KMK never increases usable liquidity; DSO uses gross invoices and a 360-day convention; withholding credit realization is explicit; reverse stress is solved against the actual forward cash model rather than the inconsistent sample break-even arithmetic. Seasonal annuity schedules disclose a final balancing payment. Missing statement figures remain unavailable. Incomplete legacy workspaces require explicit completion rather than demo-value substitution.

Tax source for analyst confirmation: https://pajak.go.id/id/pemotongan-pajak-penghasilan-pasal-23 . Lender legal exposure definitions require institution-specific compliance review; the user-entered ceiling is a screening input, not a legal certification. Auditor sensitivities are configurable assumptions, not regulatory requirements. Qualitative grades and loss estimates are uncalibrated. Imported bank period labels and revenue coverage require analyst verification.

Boundaries: no server login or team permissions, immutable audit service, automated bureau access, OCR of PDFs, calibrated PD/rating models, automated lending decisions or production loan servicing. JSON backups are structured and unencrypted. Confidential borrower data remains in the user's browser and downloaded files. Print/Save PDF uses the browser print dialog; DOCX is generated locally from pinned, vendored libraries. Public macro context uses an explicitly dated World Bank snapshot and optional user-triggered refresh.
