/* AYLA 0.9 — opt-in procedural office ambience. No recordings, no paid APIs. */
(function(){'use strict';
let ctx,master,noiseBuf,interval=null,playing=false,volume=.26,murmurs=[],timer=0;
const label={pt:['Som ambiente','LIG.','DESL.','Volume'],en:['Ambient sound','ON','OFF','Volume'],es:['Sonido ambiental','ACT.','DES.','Volumen']};
function local(){const code=(document.documentElement.lang||'en').slice(0,2);return label[code]||label.en;}
function updateButton(){let text=local();button.textContent='♫ '+(playing?text[1]:text[2]);button.title=text[0];button.setAttribute('aria-label',text[0]);slider.setAttribute('aria-label',text[3]);}
const button=document.createElement('button');button.id='ambienceButton';button.className='icon-button ambience-button';button.setAttribute('aria-label','Toggle ambient sound');button.title='Ambient sound';button.textContent='♫ OFF';
const slider=document.createElement('input');slider.id='ambienceVolume';slider.type='range';slider.min='0';slider.max='100';slider.value='26';slider.setAttribute('aria-label','Volume');slider.title='Sound volume';slider.className='ambience-volume';
const row=document.querySelector('#topbar .header-actions');if(row){row.prepend(slider);row.prepend(button);}
function init(){if(ctx)return;const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;ctx=new Audio();master=ctx.createGain();master.gain.value=volume;master.connect(ctx.destination);
 const N=Math.floor(ctx.sampleRate*1.1);noiseBuf=ctx.createBuffer(1,N,ctx.sampleRate);const q=noiseBuf.getChannelData(0);for(let i=0;i<N;i++)q[i]=(Math.random()*2-1)*.53;
 // The speech bed is intentionally unintelligible, filtered low and quiet.
 for(let i=0;i<3;i++){const o=ctx.createOscillator(),filter=ctx.createBiquadFilter(),g=ctx.createGain(),lfo=ctx.createOscillator(),mod=ctx.createGain();o.type=i===1?'triangle':'sawtooth';o.frequency.value=105+i*38;filter.type='lowpass';filter.frequency.value=330+i*90;g.gain.value=.0035;lfo.frequency.value=.39+i*.21;mod.gain.value=.0019;lfo.connect(mod);mod.connect(g.gain);o.connect(filter);filter.connect(g);g.connect(master);o.start();lfo.start();murmurs.push({o,lfo,g});}
}
function click(){if(!playing||!ctx)return;let t=ctx.currentTime;const src=ctx.createBufferSource();src.buffer=noiseBuf;const filter=ctx.createBiquadFilter();filter.type='highpass';filter.frequency.value=950;const amp=ctx.createGain();amp.gain.setValueAtTime(0,t);amp.gain.linearRampToValueAtTime(.021+Math.random()*.016,t+.001);amp.gain.exponentialRampToValueAtTime(.00015,t+.035+Math.random()*.025);src.connect(filter);filter.connect(amp);amp.connect(master);src.start(t,Math.random()*.95,.075);src.stop(t+.08);}
function distantVoice(){
 if(!playing||!ctx)return;
 const t=ctx.currentTime,dur=.22+Math.random()*.5;
 const source=ctx.createBufferSource();source.buffer=noiseBuf;source.loop=true;
 const band=ctx.createBiquadFilter();band.type='bandpass';band.frequency.value=270+Math.random()*410;band.Q.value=.32;
 const low=ctx.createBiquadFilter();low.type='lowpass';low.frequency.value=650;
 const gain=ctx.createGain();gain.gain.setValueAtTime(.0001,t);
 gain.gain.linearRampToValueAtTime(.005+Math.random()*.002,t+.045);
 gain.gain.exponentialRampToValueAtTime(.0001,t+dur);
 source.connect(band);band.connect(low);low.connect(gain);gain.connect(master);
 source.start(t,Math.random()*.4);source.stop(t+dur+.04);
}
function tick(){if(!playing)return;const count=Math.random()<.38?2:1;for(let i=0;i<count;i++)click();if(Math.random()<.36)distantVoice();}
function start(){init();if(!ctx){button.textContent='♫ N/A';return;}ctx.resume();playing=true;updateButton();button.setAttribute('aria-pressed','true');if(interval)clearInterval(interval);interval=setInterval(tick,185);}
function stop(){playing=false;updateButton();button.setAttribute('aria-pressed','false');if(interval)clearInterval(interval);interval=null;if(ctx)ctx.suspend();}
button.onclick=()=>playing?stop():start();button.setAttribute('aria-pressed','false');slider.oninput=()=>{volume=Number(slider.value)/100;if(master)master.gain.setTargetAtTime(volume,ctx.currentTime,.05);};
new MutationObserver(updateButton).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});updateButton();
window.AYLAAudioV9={start,stop,enabled:()=>playing};
})();