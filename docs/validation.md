# Validation record

Validated 30 September 2026.

- Five financial model checks pass: principal reconciliation, zero-rate payments and invalid inputs, operating vs collection stress separation, resized downside floor, reverse-stress boundary and loss bounds.
- Chromium checks pass at 375, 390, 768 and 1440 px without page overflow.
- Base, downside and resized results match computed analysis.
- Scenario URL restores after reload; reset restores defaults.
- Current amortization CSV download works.
- Both market charts load; PDFs, data and CSV assets return HTTP 200 locally.
- No browser JavaScript errors observed.

Browser check is optional and uses installed `/usr/bin/chromium` plus Python Playwright. Financial tests and build are deterministic; web frontend has no external browser dependencies.
