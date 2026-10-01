import {build} from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
await build({entryPoints:['vendor-entry.js'],outfile:'../dist/vendor/risk-libraries.mjs',bundle:true,minify:true,format:'esm',platform:'browser',target:'es2022',legalComments:'eof'});
const bundled=path.dirname(createRequire(import.meta.url).resolve('pdfjs-dist/package.json'));
for(const name of ['pdf.mjs','pdf.worker.mjs'])await build({entryPoints:[bundled+'/build/'+name],outfile:'../dist/vendor/'+name,minify:true,format:'esm',legalComments:'eof'});
fs.copyFileSync(bundled+'/LICENSE','../dist/vendor/pdfjs-LICENSE.txt');
for(const [pkg,file] of [['@orama/orama','orama-LICENSE.txt'],['chart.js','chartjs-LICENSE.txt'],['papaparse','papaparse-LICENSE.txt']]){const paths=['LICENSE','LICENSE.md','license.txt'];const p=paths.map(n=>'node_modules/'+pkg+'/'+n).find(p=>fs.existsSync(p));if(!p)throw Error('Missing license '+pkg);fs.copyFileSync(p,'../dist/vendor/'+file);}
const colorRoot='node_modules/.pnpm/@kurkle+color@0.3.4/node_modules/@kurkle/color';
const colorLicense=['LICENSE','LICENSE.md','license.txt'].map(n=>colorRoot+'/'+n).find(p=>fs.existsSync(p));if(!colorLicense)throw Error('Missing bundled color license');fs.copyFileSync(colorLicense,'../dist/vendor/color-LICENSE.txt');
