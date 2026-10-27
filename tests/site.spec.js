import { test, expect } from '@playwright/test';

test('homepage loads without browser errors and serves real report and film artifacts', async ({ page, request }) => {
  const errors=[]; page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Europas Finanzwelt.');
  await expect(page.locator('canvas.globe-canvas')).toBeVisible();
  for(const name of ['bericht','storyboard']){
    const response=await request.get(`/documents/euro-finance-core-${name}.pdf`);
    expect(response.ok()).toBeTruthy();
    expect((await response.body()).subarray(0,5).toString()).toBe('%PDF-');
  }
  const video=await request.get('/media/euro-finance-core.mp4');
  expect(video.ok()).toBeTruthy();expect(video.headers()['content-type']).toContain('video/mp4');
  expect((await video.body()).length).toBeGreaterThan(1000000);
  expect(errors).toEqual([]);
});

test('architecture selection changes the description and supports arrow keys',async({page})=>{
 await page.goto('/');
 await page.getByRole('tab',{name:/Payment Layer/}).click();
 await expect(page.locator('#layer-panel')).toContainText('Zahlungswege. Intelligent verbunden.');
 await page.keyboard.press('ArrowDown');
 await expect(page.getByRole('tab',{name:/Data Layer/})).toHaveAttribute('aria-selected','true');
 await expect(page.locator('#layer-panel')).toContainText('Aus Daten werden verlässliche Verbindungen.');
 await page.keyboard.press('End');
 await expect(page.locator('#layer-panel')).toContainText('Resilienz auf jeder Ebene.');
});

test('financing scenario recalculates the amounts and resets to the source model',async({page})=>{
 await page.goto('/');
 const slider=page.getByLabel('Finanzierungsszenario');
 await slider.fill('900');
 await expect(page.locator('.donut-center strong')).toContainText('900');
 await expect(page.locator('.funding-row').first()).toContainText('315');
 const amounts=await page.locator('.funding-amount>b').allTextContents();
 expect(amounts.map(x=>Number(x.replace('Mio. €','').trim().replace(',','.'))).reduce((a,b)=>a+b,0)).toBe(900);
 await page.getByRole('button',{name:'Finanzierungsmodell auf 600 Millionen zurücksetzen'}).click();
 await expect(slider).toHaveValue('600');
 await expect(page.locator('.funding-row').first()).toContainText('210');
});

test('card flips and exports a real vCard without invented contacts',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'Visitenkarte',exact:true}).click();
 await page.getByRole('button',{name:'Karte Rückseite anzeigen'}).click();
 await expect(page.locator('.concept-card')).toHaveClass(/flipped/);
 const pending=page.waitForEvent('download');
 await page.getByRole('button',{name:'Organisationskontakt speichern'}).click();
 const download=await pending;
 expect(download.suggestedFilename()).toBe('Euro-Finance-Core.vcf');
 const stream=await download.createReadStream();let text='';for await(const chunk of stream)text+=chunk.toString();
 expect(text).toContain('BEGIN:VCARD');expect(text).toContain('ORG:Euro Finance Core');expect(text).not.toContain('EMAIL:');
});

test('roadmap, risk accordion and FMI mapping expose the selected information',async({page})=>{
 await page.goto('/');
 await page.locator('#phase-tab-2').click();
 await expect(page.locator('#phase-panel')).toContainText('Grenzen überbrücken.');
 await page.getByRole('button',{name:/04 Cybersecurity & Datenschutz/}).click();
 await expect(page.locator('#risk-3')).toContainText('High-/Critical-Befunde');
 await page.locator('.mapping summary').click();
 await expect(page.getByRole('table')).toBeVisible();
 await expect(page.getByRole('table')).toContainText('Zentrale Gegenparteien');
});

test('local PDF and image viewers open and close without uploading',async({page})=>{
 await page.goto('/');
 await page.getByLabel('DP Masterbook als lokale PDF auswählen').setInputFiles('public/documents/euro-finance-core-bericht.pdf');
 await expect(page.locator('.pdf-viewer object')).toHaveAttribute('data',/^blob:/);
 await page.getByRole('button',{name:'PDF schließen',exact:true}).click();
 await expect(page.locator('.pdf-viewer')).toHaveCount(0);
 await page.getByLabel('Bilder oder Masterbook-Video lokal auswählen').setInputFiles('public/media/poster.jpg');
 await expect(page.locator('.local-media-grid img')).toBeVisible();
 await page.getByRole('button',{name:'poster.jpg groß öffnen'}).click();
 await expect(page.getByRole('dialog',{name:'Lokale Medienvorschau'})).toBeVisible();
 await page.keyboard.press('Escape');
 await expect(page.getByRole('dialog',{name:'Lokale Medienvorschau'})).not.toBeVisible();
 await page.getByRole('button',{name:'poster.jpg entfernen'}).click();
 await expect(page.locator('.local-media-grid')).toHaveCount(0);
});

test('presentation provides 32 translated narratives, slide controls and focus return',async({page})=>{
 await page.goto('/');
 const trigger=page.getByRole('button',{name:'Vision erleben'});
 await trigger.click();
 const dialog=page.getByRole('dialog',{name:'Euro Finance Core · Interaktive Konzeptpräsentation'});
 await expect(dialog).toBeVisible();
 await expect(dialog.locator('select option')).toHaveCount(32);
 await dialog.locator('select').selectOption('fr');
 await expect(dialog.locator('.efc-deck-caption')).toHaveAttribute('lang','fr');
 const first=await dialog.locator('.efc-deck-caption').innerText();
 await page.getByRole('button',{name:'Nächste Folie'}).click();
 await expect(dialog.locator('.efc-deck-caption')).not.toHaveText(first);
 await dialog.locator('select').selectOption('ar');
 await expect(dialog.locator('.efc-deck-caption')).toHaveAttribute('dir','rtl');
 await page.getByRole('button',{name:'Präsentation schließen'}).focus();
 await page.keyboard.press('Shift+Tab');
 expect(await page.evaluate(()=>document.activeElement.closest('.efc-presentation')!==null)).toBe(true);
 await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);
 await expect(trigger).toBeFocused();
});

test('concept film decodes and advances playback',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:/Konzeptfilm ansehen/}).click();
 const video=page.locator('.movie-dialog video');
 await expect(video).toBeVisible();
 await expect.poll(()=>video.evaluate(v=>v.readyState)).toBeGreaterThanOrEqual(2);
 expect(await video.evaluate(v=>v.duration)).toBeCloseTo(40,0);
 await video.evaluate(v=>{v.muted=true;return v.play();});
 await expect.poll(()=>video.evaluate(v=>v.currentTime)).toBeGreaterThan(.1);
 await page.getByRole('button',{name:'Film schließen',exact:true}).click();
 await expect(video).toHaveCount(0);
});

test('mobile navigation works without horizontal overflow',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('button',{name:'Menü öffnen'}).click();
 await page.getByRole('navigation',{name:'Hauptnavigation'}).getByRole('link',{name:'Finanzierung'}).click();
 await expect(page).toHaveURL(/#finance$/);
 await expect(page.getByRole('button',{name:'Menü öffnen'})).toHaveAttribute('aria-expanded','false');
 await page.getByRole('button',{name:'Vision erleben'}).click();
 expect(await page.evaluate(()=>document.querySelector('.efc-presentation').scrollWidth<=innerWidth)).toBe(true);
 await page.keyboard.press('Escape');
});

test('reduced motion disables atmosphere; controls enable effects and preserve preference',async({page})=>{
 await page.goto('/');
 expect(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
 await expect(page.locator('.theatre')).toHaveCount(0);
 await expect(page.locator('.atmosphere')).not.toHaveClass(/is-enabled/);
 await page.getByRole('button',{name:'Effekte einstellen'}).click();
 await page.getByLabel('Animationen & Plasma').check();
 await expect(page.locator('.atmosphere')).toHaveClass(/is-enabled/);
 await page.getByLabel('Lichtwischer · 1,3 Sekunden').uncheck();
 await expect(page.locator('.light-wiper')).toHaveCount(0);
 await page.getByLabel('Animationen & Plasma').uncheck();
 await page.reload();
 await expect(page.locator('.atmosphere')).not.toHaveClass(/is-enabled/);
});

test('theatre intro opens once and the wiper uses a 1.3 second cycle',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/');
 await expect(page.getByRole('button',{name:'Intro überspringen'})).toBeVisible();
 await page.getByRole('button',{name:'Intro überspringen'}).click();
 await expect(page.locator('.theatre')).toHaveCount(0);
 expect(await page.locator('.light-wiper').evaluate(e=>getComputedStyle(e).animationDuration)).toBe('1.3s');
 await page.reload();
 await expect(page.locator('.theatre')).toHaveCount(0);
 await expect(page.locator('.planet')).toHaveCount(8);
});
