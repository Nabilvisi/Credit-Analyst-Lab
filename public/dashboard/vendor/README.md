# Pinned browser dependencies

Runtime modules are local and loaded when their features are used. Dependencies do not receive uploaded borrower files. Optional AI requests are dispatched separately with explicit provider consent.

- SheetJS CE 0.20.3: Apache-2.0; SheetJS-LICENSE.txt; https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs
- docx 9.6.1: MIT; docx-LICENSE.txt; bundled dependency, https://docx.js.org/
- PDF.js 5.6.205: Apache-2.0; pdfjs-LICENSE.txt; npm pdfjs-dist
- Orama 3.1.18: BSD-2-Clause; orama-LICENSE.txt; npm @orama/orama
- Chart.js 4.5.1: MIT; chartjs-LICENSE.txt; npm chart.js
- PapaParse 5.5.3: MIT; papaparse-LICENSE.txt; npm papaparse
- Chart.js color dependency 0.3.4: MIT; color-LICENSE.txt; npm @kurkle/color

Modules are minified with esbuild 0.28.2. Production uses no remote runtime imports. SHA-256 hashes in vendor-manifest.json are checked by npm run check and deployment CI.

To rebuild risk/PDF modules: install the pinned build-tools/pnpm-lock.yaml dependencies, run node build-vendor.mjs from build-tools, then run node scripts/update-vendor-manifest.mjs from the application directory. Original SheetJS/docx modules are independently pinned and retained. Preserve all licenses when regenerating.