import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import crypto from 'node:crypto';
for(const file of fs.readdirSync('dist').filter(f=>/\.(js|mjs)$/.test(f))){const r=spawnSync(process.execPath,['--check','dist/'+file],{stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);}
console.log('All application modules pass syntax checks.');
const manifest=JSON.parse(fs.readFileSync('dist/vendor/vendor-manifest.json','utf8'));for(const [file,record] of Object.entries(manifest)){const actual=crypto.createHash('sha256').update(fs.readFileSync('dist/vendor/'+file)).digest('hex');if(actual!==record.sha256)throw Error('Vendor checksum mismatch: '+file);}console.log('Pinned vendor checksums verified.');
