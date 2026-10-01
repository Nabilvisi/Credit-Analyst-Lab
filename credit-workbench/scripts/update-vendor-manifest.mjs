import fs from 'node:fs';import crypto from 'node:crypto';
const versions={'docx.mjs':'docx 9.6.1','xlsx.mjs':'SheetJS 0.20.3','pdf.mjs':'PDF.js 5.6.205','pdf.worker.mjs':'PDF.js 5.6.205','risk-libraries.mjs':'Orama 3.1.18; Chart.js 4.5.1; PapaParse 5.5.3; @kurkle/color 0.3.4'};
const manifest=Object.fromEntries(Object.entries(versions).map(([file,version])=>[file,{version,sha256:crypto.createHash('sha256').update(fs.readFileSync('dist/vendor/'+file)).digest('hex')}]));fs.writeFileSync('dist/vendor/vendor-manifest.json',JSON.stringify(manifest,null,2)+'\n');
