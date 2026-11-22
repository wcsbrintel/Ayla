/* AYLA 5.2 — Creative Commons Zero ambient music.
   Primary: "Space Graveyard", TinyWorlds (CC0 1.0)
   https://opengameart.org/content/space-graveyard-ambient-track
   https://opengameart.org/sites/default/files/space_graveyard_4.mp3
   Original sound-effects/noise generator replaced entirely.
   If the external file is unavailable, play an original soft chord-based
   ambient composition synthesized locally (no third-party samples). */
(function () {
  'use strict';
  const TRACK = 'https://opengameart.org/sites/default/files/space_graveyard_4.mp3';
  const ENABLED_KEY = 'ayla-music-enabled';
  const VOLUME_KEY = 'ayla-music-volume';
  const defaultVolume = 16;
  const language = {
    pt: {name:'Música ambiente: Space Graveyard (CC0)', on:'LIG.',off:'DESL.',volume:'Volume da música'},
    en: {name:'Ambient music: Space Graveyard (CC0)', on:'ON',off:'OFF',volume:'Music volume'},
    es: {name:'Música ambiental: Space Graveyard (CC0)', on:'ACT.',off:'DES.',volume:'Volumen de la música'}
  };
  let wanted = true, volume = defaultVolume, playing = false, mode = 'none';
  try {
    const v=localStorage.getItem(ENABLED_KEY);
    if(v==='false')wanted=false;
    const n=Number(localStorage.getItem(VOLUME_KEY));
    if(Number.isFinite(n)&&n>=0&&n<=100&&localStorage.getItem(VOLUME_KEY)!==null)volume=n;
  }catch(e){}
  const music=new Audio();
  music.src=TRACK;
  music.loop=true;
  music.preload='none';
  music.volume=volume/100;
  music.setAttribute('aria-hidden','true');

  const button=document.createElement('button');
  button.type='button';
  button.id='ambienceButton';
  button.className='icon-button ambience-button';
  button.setAttribute('aria-pressed','false');
  const slider=document.createElement('input');
  slider.id='ambienceVolume';
  slider.className='ambience-volume';
  slider.type='range';
  slider.min='0';slider.max='100';slider.step='1';slider.value=String(volume);
  const row=document.querySelector('#topbar .header-actions');
  if(row){row.prepend(slider);row.prepend(button);}

  function locale(){
    const lang=(document.documentElement.lang||'en').slice(0,2);
    return language[lang]||language.en;
  }
  function paint(){
    const lang=locale();
    button.textContent='♫ '+(playing?lang.on:lang.off);
    button.title=lang.name;
    button.setAttribute('aria-label',lang.name);
    button.setAttribute('aria-pressed',String(playing));
    slider.title=lang.volume;
    slider.setAttribute('aria-label',lang.volume);
  }
  function persist(){
    try{localStorage.setItem(ENABLED_KEY,String(wanted));localStorage.setItem(VOLUME_KEY,String(volume));}catch(e){}
  }

  // Local original ambient soundtrack as offline/CORS/network fallback:
  // gentle chord progression and bell motifs, never synthetic chatter/clicking.
  const progression=[
    [130.81,155.56,196.00,293.66],
    [103.83,130.81,155.56,196.00],
    [155.56,196.00,233.08,311.13],
    [116.54,146.83,174.61,261.63]
  ];
  let ctx=null,output=null,clock=null,nextChord=0,bar=0;
  function tone(freq,t,dur,amp,kind){
    const o=ctx.createOscillator();
    const g=ctx.createGain();
    const filter=ctx.createBiquadFilter();
    o.type=kind||'sine';
    o.frequency.value=freq;
    filter.type='lowpass';filter.frequency.value=1150;
    g.gain.setValueAtTime(.00001,t);
    g.gain.exponentialRampToValueAtTime(Math.max(.0001,amp),t+.55);
    g.gain.setValueAtTime(Math.max(.0001,amp),t+dur-.8);
    g.gain.exponentialRampToValueAtTime(.00001,t+dur);
    o.connect(filter);filter.connect(g);g.connect(output);
    o.start(t);o.stop(t+dur+.03);
  }
  function bell(freq,t){
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.type='sine';o.frequency.value=freq*2;
    g.gain.setValueAtTime(.00001,t);
    g.gain.exponentialRampToValueAtTime(.024,t+.06);
    g.gain.exponentialRampToValueAtTime(.00001,t+2.9);
    o.connect(g);g.connect(output);
    o.start(t);o.stop(t+3.0);
  }
  function schedule(){
    if(!ctx||!output)return;
    const now=ctx.currentTime;
    while(nextChord<now+2){
      const chord=progression[bar%progression.length];
      chord.forEach((hz,i)=>tone(hz,nextChord,8.6,i===0?.045:.025,i%2===0?'triangle':'sine'));
      if(bar%2===0){bell(chord[2],nextChord+2.5);bell(chord[3],nextChord+5.7);}
      else{bell(chord[1],nextChord+3.2);}
      nextChord+=8;
      bar++;
    }
  }
  function stopFallback(){
    if(clock!==null){clearInterval(clock);clock=null;}
    if(ctx){const toClose=ctx;ctx=null;output=null;toClose.close().catch(()=>{});}
  }
  function startFallback(){
    if(!wanted||!playing||mode==='fallback')return;
    music.pause();
    stopFallback();
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    if(!AudioContext){playing=false;mode='none';paint();return;}
    try{
      ctx=new AudioContext();
      output=ctx.createGain();
      output.gain.value=volume/100*.85;
      output.connect(ctx.destination);
      mode='fallback';
      nextChord=ctx.currentTime+.08;bar=0;
      ctx.resume().catch(()=>{});
      schedule();
      clock=setInterval(schedule,850);
      paint();
    }catch(e){stopFallback();mode='none';playing=false;paint();}
  }

  function start(){
    if(!wanted||playing)return;
    playing=true;mode='remote';
    music.volume=volume/100;
    music.play().then(()=>{if(mode==='remote')paint();})
      .catch(error=>{
        if(!wanted||!playing||mode!=='remote')return;
        // Autoplay blocking must wait for another intentional user interaction.
        if(error&&error.name==='NotAllowedError'){playing=false;mode='none';paint();return;}
        startFallback();
      });
    paint();
  }
  function stop(){
    wanted=false;
    playing=false;
    mode='none';
    music.pause();
    stopFallback();
    persist();
    paint();
  }
  function toggle(){
    if(playing){stop();return;}
    wanted=true;persist();start();
  }
  function setVolume(value){
    volume=Math.max(0,Math.min(100,Number(value)||0));
    music.volume=volume/100;
    if(ctx&&output)output.gain.setTargetAtTime(volume/100*.85,ctx.currentTime,.09);
    persist();paint();
  }
  music.addEventListener('error',()=>{if(wanted&&playing&&mode==='remote')startFallback();});
  button.addEventListener('click',toggle);
  slider.addEventListener('input',()=>setVolume(slider.value));
  new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  // Begin on an actual user gesture; browsers do not permit unsolicited autoplay.
  document.addEventListener('click',event=>{
    const target=event.target;
    if(!target||!target.closest||!wanted||playing)return;
    if(target.closest('#startButton,#resumeButton,#nextIntro,#skipIntro,[id^="missionPlay"],#aftermathContinue,#promotionRoom,#promotionArchive,#replayIntroduction'))start();
  },true);
  window.addEventListener('pagehide',()=>{music.pause();stopFallback();playing=false;mode='none';});
  paint();
  window.AYLAAudioV9={
    start:()=>{wanted=true;persist();start();},
    stop,enabled:()=>playing,setVolume,
    source:()=>mode==='fallback'?'original-ambient-fallback':TRACK,
    title:'Space Graveyard — TinyWorlds (CC0 1.0)'
  };
})();
