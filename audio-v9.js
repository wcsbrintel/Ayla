/* AYLA 5.3 — Quiet piano soundtrack licensed CC0.
   Primary: "Mystical Piano", Indieteur (CC0 1.0)
   https://opengameart.org/content/mystical-piano
   Source author recommends cutting the loop at 1m35s (95 seconds).
   Fallback: original gentle melodic piano-like composition synthesized in browser.
   No previous Space Graveyard / sci-fi soundscape is used. */
(function () {
  'use strict';
  const TRACK = 'https://opengameart.org/sites/default/files/Mystical%20Piano.mp3';
  const LOOP_END_SECONDS = 95;
  const ENABLED_KEY = 'ayla-music-enabled';
  const VOLUME_KEY = 'ayla-music-volume';
  const defaultVolume = 12;
  const language = {
    pt: {name:'Música ambiente: Piano discreto (CC0)', on:'LIG.',off:'DESL.',volume:'Volume da música'},
    en: {name:'Ambient music: Quiet piano (CC0)', on:'ON',off:'OFF',volume:'Music volume'},
    es: {name:'Música ambiental: Piano suave (CC0)', on:'ACT.',off:'DES.',volume:'Volumen de la música'}
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
  music.loop=false;
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

  // Gentle locally authored melodic piano substitute for network outages.
  // Short envelopes and sparse voicing replace the previous synth-pad ambience.
  const progression=[
    [146.83,174.61,220.00,293.66],
    [130.81,164.81,196.00,261.63],
    [116.54,146.83,174.61,233.08],
    [130.81,174.61,196.00,261.63]
  ];
  let ctx=null,output=null,clock=null,nextChord=0,bar=0;
  function piano(freq,t,length,amp){
    const osc=ctx.createOscillator(),harmonic=ctx.createOscillator(),gain=ctx.createGain(),treble=ctx.createGain();
    const filter=ctx.createBiquadFilter();
    osc.type='sine';osc.frequency.value=freq;
    harmonic.type='sine';harmonic.frequency.value=freq*2.003;
    filter.type='lowpass';filter.frequency.value=1600;
    treble.gain.value=.075;
    gain.gain.setValueAtTime(.00001,t);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0001,amp),t+.025);
    gain.gain.exponentialRampToValueAtTime(Math.max(.00001,amp*.17),t+Math.max(.35,length*.7));
    gain.gain.exponentialRampToValueAtTime(.00001,t+length);
    osc.connect(filter);harmonic.connect(treble);treble.connect(filter);
    filter.connect(gain);gain.connect(output);
    osc.start(t);harmonic.start(t);
    osc.stop(t+length+.04);harmonic.stop(t+length+.04);
  }
  function schedule(){
    if(!ctx||!output)return;
    const now=ctx.currentTime;
    while(nextChord<now+2){
      const chord=progression[bar%progression.length];
      piano(chord[0]/2,nextChord,7.8,.055);
      piano(chord[0],nextChord+.1,5.9,.025);
      piano(chord[2],nextChord+2.1,4.7,.026);
      piano(chord[1],nextChord+4.1,3.7,.020);
      piano(chord[3],nextChord+6.3,1.5,.016);
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
      output.gain.value=volume/100*.72;
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
    if(ctx&&output)output.gain.setTargetAtTime(volume/100*.72,ctx.currentTime,.09);
    persist();paint();
  }
  music.addEventListener('timeupdate',()=>{
    if(mode==='remote'&&music.currentTime>=LOOP_END_SECONDS){
      music.currentTime=0; // CC0 composer's recommended seamless loop point.
    }
  });
  music.addEventListener('ended',()=>{
    if(wanted&&playing&&mode==='remote'){
      music.currentTime=0;
      music.play().catch(()=>startFallback());
    }
  });
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
    title:'Mystical Piano — Indieteur (CC0 1.0)'
  };
})();
