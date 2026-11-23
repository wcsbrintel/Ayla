const puppeteer=require('puppeteer-core');
(async()=>{
 let browser=null;
 try{
  const path=process.env.CHROME_PATH||process.env.CHROME_BIN||'/usr/bin/google-chrome';
  console.log('CHROME_BINARY',path);
  browser=await puppeteer.launch({headless:true,executablePath:path,args:['--no-sandbox','--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-web-security']});
  const page=await browser.newPage();
  const assetResponses=[];
  page.setDefaultTimeout(65000);
  page.on('console',m=>console.log('BROWSER',m.type(),m.text().slice(0,2000)));
  page.on('pageerror',e=>console.log('PAGEERROR',e.stack));
  page.on('requestfailed',r=>console.log('REQUEST_FAILED',r.url(),r.failure()?.errorText));
  page.on('response',r=>{if(r.url().includes('.glb'))assetResponses.push({url:r.url(),status:r.status()});if(/glb|babylon\.js/.test(r.url())&&r.status()>=400)console.log('BAD_ASSET',r.status(),r.url())});
  await page.goto('http://127.0.0.1:8765/tests/animation-browser.html',{waitUntil:'domcontentloaded',timeout:18000});
  console.log('PAGE_ENTERED');
  try{await page.waitForFunction('window.__aylaDiag?.result!=null',{timeout:65000});}
  catch(e){
    const details=await page.evaluate(()=>({state:document.getElementById('status')?.innerText,babylon:!!window.BABYLON,diag:!!window.__aylaDiag,rigged:window.__aylaDiag?.actor?.isRiggedReady?.(),clips:window.__aylaDiag?.actor?.animationClips?.()}));
    console.log('BROWSER_TIMEOUT_STATE',JSON.stringify(details));
    throw e;
  }
  const out=await page.evaluate(()=>window.__aylaDiag.result);
  console.log('BROWSER_RIG_REPORT',JSON.stringify(out));
  console.log('MODEL_ASSET_RESPONSES',JSON.stringify(assetResponses));
  if(!assetResponses.some(x=>x.status===200 && x.url==='http://127.0.0.1:8765/assets/characters/priya_casual.glb'))throw Error('Original Ayla avatar was not loaded from same-origin assets');
  if(!out.rigged||out.limbsChanged===0)throw Error('Rigged model has no visible animation in browser');
 }catch(e){console.error('BROWSER_TEST_FAILED',e.stack);process.exitCode=1;}
 finally{if(browser){try{await browser.close()}catch(e){console.log('BROWSER_CLOSE_ERROR',e.message)}}}
})();