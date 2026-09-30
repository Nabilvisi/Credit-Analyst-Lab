"""Optional browser checks: python3 tests/browser_check.py (requires Playwright)."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import json
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto('http://127.0.0.1:8000',wait_until='networkidle')
    assert page.locator('#dscr').inner_text()=='1.39×'
    page.locator('[data-preset=downside]').click()
    assert page.locator('#dscr').inner_text()=='0.96×'
    page.locator('#principal').select_option('16')
    assert page.locator('#dscr').inner_text()=='1.26×'
    assert page.locator('#year1').inner_text()=='1.00×'
    current_url=page.url
    page.reload(wait_until='networkidle')
    assert page.locator('#dscr').inner_text()=='1.26×', 'URL state roundtrip'
    with page.expect_download() as dl:page.locator('#export').click()
    assert dl.value.suggested_filename=='current-scenario-amortization.csv'
    page.locator('#reset').click()
    assert page.locator('#dscr').inner_text()=='1.39×'
    assert page.locator('#oil-chart svg').count()==1
    assert page.locator('#gdp-chart svg').count()==1
    assert not errors,errors
    page.screenshot(path='/tmp/credit-lab-desktop.png',full_page=True)
    checks=[]
    for width in [375,390,768,1440]:
        page.set_viewport_size({'width':width,'height':900})
        page.reload(wait_until='networkidle')
        overflow=page.evaluate('document.documentElement.scrollWidth > window.innerWidth')
        assert not overflow,f'Overflow at {width}'
        checks.append({'width':width,'overflow':overflow})
        if width==390:page.screenshot(path='/tmp/credit-lab-mobile.png',full_page=True)
    for name in ['credit-memo.pdf','interview-guide.pdf','market.json','analysis.json','amortization.csv','scenarios.csv']:
        assert page.request.get('http://127.0.0.1:8000/'+name).status==200
    print(json.dumps({'console_errors':errors,'responsive':checks,'scenario_restore':True,'download':True,'assets':True}))
    browser.close()
