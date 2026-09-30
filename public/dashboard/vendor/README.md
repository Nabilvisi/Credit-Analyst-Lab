# Vendored browser dependencies

These local modules are loaded only when Excel or Word import/export is used. Borrower files are never sent to their publishers.

- SheetJS Community Edition 0.20.3: downloaded from the authoritative https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs. Apache-2.0; full license in SheetJS-LICENSE.txt. Documentation: https://docs.sheetjs.com/docs/getting-started/installation/standalone/.
- docx 9.6.1: copied from the bundled Codex dependency runtime, dist/index.mjs. MIT; license in docx-LICENSE.txt. Documentation: https://docx.js.org/.

Do not substitute unpinned remote runtime imports. See vendor-manifest.json for SHA-256 verification hashes.

Modules are minified with esbuild 0.28.2; pinned versions and complete license notices are retained.
