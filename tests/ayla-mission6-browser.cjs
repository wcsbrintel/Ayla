/* Browser smoke test of the installed AYLA 6 / PEC MAN release. */
const puppeteer=require('puppeteer-core');
(async()=>{
 let browser;
 try{
  browser=await puppeteer.launch({
   headless:true,
   executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',
   args:['--no-sandbox','--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']
  });
  const page=await browser.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.stack||e.message));
  page.on('console',m=>{if(m.type()==='error')console.log('PAGE_CONSOLE',m.text().slice(0,600))});
  page.on('requestfailed',r=>{if(/mission6|pec-man|game.js|missions-v2/.test(r.url()))errors.push('ASSET '+r.url()+' '+r.failure()?.errorText)});
  await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded',timeout:35000});
  await page.waitForFunction(()=>window.AYLAMissionSix&&window.AYLAMissionsV2&&window.AYLAPecMan&&document.querySelector('#missionPlay6'),{timeout:65000});
  await page.waitForFunction(()=>!document.getElementById('startScreen').classList.contains('hidden'),{timeout:45000});
  const result=await page.evaluate(async()=>{
   const missions=window.AYLAMissionsV2;
   const six=window.AYLAMissionSix;
   const pec=window.AYLAPecMan;
   if(missions.unlocked('AY-006'))throw Error('Sixth mission should be locked at initial launch');
   if(document.getElementById('aftermathArchive').classList.contains('hidden')===false){
      // The level-up widget is rendered only when archive is opened.
   }
   for(const id of ['AY-001','AY-002','AY-003','AY-004'])missions.save(id,{done:true});
   if(!missions.aftermath().unlocked)throw Error('Level 2 eligibility missing after mission 4');
   missions.markNews();
   if(!missions.promote())throw Error('Promotion could not be saved');
   missions.save('AY-005',{done:true});
   if(!missions.unlocked('AY-006'))throw Error('AY-006 did not unlock after AY-005');
   document.getElementById('startButton').click();
   document.getElementById('skipIntro').click();
   if(document.getElementById('missionPlay6').disabled)throw Error('AY-006 mission archive button remains disabled');
   document.getElementById('missionPlay6').click();
   if(missions.current()!=='AY-006')throw Error('AY-006 was not activated');
   const old=missions.load('AY-006');
   if(old.m6StoryCaptured)throw Error('Story already captured');
   missions.save('AY-006',{m6StoryCaptured:true});
   if(!missions.load('AY-006').m6StoryCaptured)throw Error('Story capture not saved');
   if(!six.storyAttachment('pt').includes('m6-report-attachment'))throw Error('Dossier lacks story attachment');
   if(!six.renderEvidence(3,'pt',missions.load('AY-006')).includes('disabled'))throw Error('Captured story did not lock action');
   if(six.copy('pt').sources.length!==4||six.copy('en').sources.length!==4||six.copy('es').sources.length!==4)throw Error('Incomplete localization');
   if(pec.ghostStepMs(1)!==208||pec.ghostStepMs(2)!==199||pec.ghostStepMs(5)>=pec.ghostStepMs(1))throw Error('Ghost difficulty progression incorrect');
   pec.open('pt',()=>pec.close());
   document.getElementById('pecManStart').click();
   if(!document.getElementById('pecManCurtain').classList.contains('hidden'))throw Error('PEC MAN did not start');
   const score=document.getElementById('pecManScore').textContent;
   document.getElementById('pecManExit').click();
   if(pec.isOpen())throw Error('PEC MAN did not return to Central');
   for(const url of ['assets/mission6-art.svg','assets/pecman-arcade.svg']){
    const r=await fetch(url);if(!r.ok)throw Error('Missing art: '+url);
   }
   return {mission:missions.current(),levels:missions.aftermath().level,storyCaptured:true,level1GhostStep:pec.ghostStepMs(1),level5GhostStep:pec.ghostStepMs(5),arcadeExited:true,score,artAssets:true};
  });
  if(errors.length){console.log('BROWSER_ERRORS',errors.slice(0,12));throw Error('Uncaught browser errors: '+errors.length);}
  console.log('AYLA_MISSION6_AND_PECMAN_SMOKE_PASS',JSON.stringify(result));
 }catch(e){console.error('AYLA_SMOKE_FAILURE',e.stack||e);process.exitCode=1;}
 finally{if(browser)await browser.close();}
})();
