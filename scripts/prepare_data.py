"""Offline, deterministic public-data normalization; no third-party dependencies."""
import csv, json, hashlib
from pathlib import Path
from collections import defaultdict
ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'data/sources.json').read_text())
for s in manifest:
    assert hashlib.sha256((ROOT/'data/raw'/s['file']).read_bytes()).hexdigest()==s['sha256'], 'Raw source checksum changed'
prices=defaultdict(list)
with (ROOT/'data/raw/brent-daily.csv').open() as f:
    for r in csv.DictReader(f):
        if '2015-01-01'<=r['Date']<='2025-12-31':
            prices[r['Date'][:4]].append(float(r['Price']))
brent=[dict(year=int(y),price=round(sum(v)/len(v),2),observations=len(v)) for y,v in sorted(prices.items())]
with (ROOT/'data/raw/gdp.csv').open() as f:
    gdp=[dict(year=int(r['Year']),value=float(r['Value'])/1e9) for r in csv.DictReader(f) if r['Country Code']=='IDN' and int(r['Year'])>=2015]
data={'cutoff':'2025-12-31','retrieved':'2026-09-30','brent':brent,'gdp':gdp,'sources':manifest,'notes':['Brent is a fuel-cost risk proxy, not Indonesia diesel pricing or coal pricing. Annual arithmetic mean of daily reported observations; missing dates are not imputed.','GDP is nominal current USD, not real GDP growth. Latest available Indonesia observation in this mirror is 2023.','Public observations after 2025 are excluded intentionally. No claim that these snapshots are the latest market conditions.']}
for dest in ['data/processed/market.json','public/market.json']:(ROOT/dest).write_text(json.dumps(data,indent=2)+'\n')
