/* AYLA 2.2 — Active Clara & Theo: realistic walking, frequent multilingual dialogue.
   Safe spawn locations / rendezvous are aligned with the current 3D collision map.
   Conversations remain non-interactive and pause during investigations. */
(function(){'use strict';
function create(B,scene,nav,ayla,winston,canAct,language){
  const between=(a,b)=>a+Math.random()*(b-a);
  const catalog=window.AYLAClaraTheoDialogue?.packs||[];
  const root=document.getElementById('app');
  const bubble=document.createElement('div');
  bubble.id='npcDialogue';bubble.className='npc-dialogue hidden';
  bubble.setAttribute('aria-live','off');
  const label=document.createElement('strong'),message=document.createElement('span');
  bubble.append(label,message);
  root.appendChild(bubble);

  const defs=[
    {
      id:'Theo',male:true,home:{x:-6.9,z:-1.1},
      asset:'ryan_smart.glb',role:'male',scale:1.02,
      roam:[
        {x:-3.8,z:-.75},{x:-3.7,z:2.45},
        {x:-2.65,z:-2.2},{x:-6.1,z:1.7}
      ]
    },
    {
      id:'Clara',male:false,home:{x:6.25,z:-1.1},
      asset:'emma_casual.glb',role:'female',scale:1.02,
      roam:[
        {x:2.8,z:2.25},{x:6.35,z:1.2},
        {x:2.45,z:-1.0},{x:7.4,z:2.4},
        {x:1.45,z:3.8}
      ]
    }
  ];
  const rendezvous=[
    {Theo:{x:-2.0,z:3.25},Clara:{x:-.5,z:3.25}},
    {Theo:{x:.95,z:-.55},Clara:{x:2.4,z:-.55}},
    {Theo:{x:.8,z:2.2},Clara:{x:2.25,z:2.2}}
  ];
  let actors=[],started=false,mode='work',elapsed=0;
  let topic=null,previousTopic='',conversationCount=0,lastMeeting=-1;
  let lineIndex=-1,lineClock=0,lastLanguage='',currentMeeting=null;
  let firstTalk=false,workUntil=between(9,13),moveAttempts=0;
  let paused=false,topicSpeaker='';

  function others(actor){
    return [ayla,winston,...actors.map(c=>c.actor)]
      .filter(a=>a&&a!==actor)
      .map(a=>({x:a.root.position.x,z:a.root.position.z,r:.35}));
  }
  function clearTravel(c){
    c.route=[];c.routeIndex=0;c.lastDistance=Infinity;c.stuck=0;c.goalKey='';
  }
  function createActors(){
    if(started)return;
    started=true;
    for(const d of defs){
      const actor=window.AYLACharacterFactory.create(B,scene,{
        name:d.id,x:d.home.x,z:d.home.z,asset:d.asset,
        scale:d.scale,role:d.role,isWinston:d.male
      });
      actor.root.rotation.y=d.male?-1.15:0;
      const c={...d,actor,roamGoal:null,rest:0,roamIndex:-1,
        route:[],routeIndex:0,lastDistance:Infinity,stuck:0,goalKey:''};
      actors.push(c);
    }
    // Clara crosses the open floor shortly after the scene is entered.
    for(const c of actors){
      c.roamGoal=c.roam[c.id==='Clara'?0:0];
      c.roamIndex=0;
      c.rest=0;
    }
  }
  function face(actor,target,dt){
    const dx=target.x-actor.root.position.x,dz=target.z-actor.root.position.z;
    if(Math.hypot(dx,dz)<.01)return;
    const yaw=Math.atan2(-dx,-dz);
    const dif=Math.atan2(Math.sin(yaw-actor.root.rotation.y),Math.cos(yaw-actor.root.rotation.y));
    actor.root.rotation.y+=dif*Math.min(1,dt*5);
  }
  function track(c,target){
    const key=target.x.toFixed(2)+':'+target.z.toFixed(2);
    if(c.route.length&&c.goalKey===key)return;
    const path=nav.path(c.actor.root.position,target,null);
    c.route=path?.length?path:[target];
    c.routeIndex=0;c.stuck=0;c.goalKey=key;
  }
  function travel(c,target,dt,now){
    if(!target)return false;
    const pos=c.actor.root.position;
    const remaining=Math.hypot(pos.x-target.x,pos.z-target.z);
    if(remaining<.23){
      c.actor.animate(dt,false,false,now);
      return true;
    }
    track(c,target);
    const wp=c.route[c.routeIndex]||target;
    const result=nav.moveNPC(c.actor,wp,dt,others(c.actor));
    c.actor.animate(dt,!!result.moving,false,now);
    if(Math.hypot(pos.x-wp.x,pos.z-wp.z)<.24){
      c.routeIndex++;
      if(c.routeIndex>=c.route.length)clearTravel(c);
    }
    if(result.moving)c.stuck=0;
    else c.stuck+=dt;
    if(c.stuck>1.4){
      // Re-plan if another investigator temporarily blocks the corridor.
      clearTravel(c);
    }
    return Math.hypot(pos.x-target.x,pos.z-target.z)<.26;
  }
  function chooseRoam(c){
    const suitable=c.roam.filter((p,i)=>i!==c.roamIndex&&
      Math.hypot(p.x-c.actor.root.position.x,p.z-c.actor.root.position.z)>1.8);
    const next=suitable.length?suitable[Math.floor(Math.random()*suitable.length)]:c.home;
    c.roamIndex=c.roam.indexOf(next);
    c.roamGoal=next;
    clearTravel(c);
  }
  function doWork(dt,now){
    for(const c of actors){
      c.actor.setDialogue?.(false);
      c.actor.setTalking?.(false);
      if(c.rest>0){
        c.rest-=dt;
        c.actor.animate(dt,false,false,now);
        face(c.actor,{x:0,z:0},dt);
      }else{
        if(!c.roamGoal)chooseRoam(c);
        if(travel(c,c.roamGoal,dt,now)){
          c.roamGoal=null;
          c.rest=between(1.0,3.3);
          clearTravel(c);
        }
      }
    }
  }
  function selectTopic(){
    if(!catalog.length)return null;
    const filtered=catalog.filter(x=>x.id!==previousTopic);
    // Long dialogues often, but not exclusively.
    const wantLong=conversationCount%3!==0||Math.random()<.37;
    const group=filtered.filter(x=>!!x.long===wantLong);
    const pool=group.length?group:(filtered.length?filtered:catalog);
    const next=pool[Math.floor(Math.random()*pool.length)];
    previousTopic=next.id;conversationCount++;
    return next;
  }
  function pickMeeting(){
    const options=rendezvous.map((_,i)=>i).filter(i=>i!==lastMeeting);
    const index=options[Math.floor(Math.random()*options.length)];
    lastMeeting=index;
    currentMeeting=rendezvous[index];
    moveAttempts=0;
  }
  function switchMode(next){
    mode=next;elapsed=0;
    for(const c of actors)clearTravel(c);
  }
  function beginMeet(){
    topic=selectTopic();
    if(!topic){workUntil=between(6,10);elapsed=0;return;}
    pickMeeting();
    bubble.classList.add('hidden');
    switchMode('meet');
  }
  function lines(){
    if(!topic)return [];
    const lang=language();
    return topic[lang]||topic.en||topic.pt||[];
  }
  function showLine(i){
    const script=lines(),entry=script[i];
    if(!entry){bubble.classList.add('hidden');return;}
    topicSpeaker=entry[0];
    label.textContent=topicSpeaker;
    message.textContent=entry[1];
    lastLanguage=language();
    bubble.classList.remove('hidden');
  }
  function lineDuration(i){
    const line=lines()[i]?.[1]||'';
    return Math.max(3.0,Math.min(6.4,1.65+line.length/23));
  }
  function beginTalk(){
    if(!topic)return;
    switchMode('talk');
    firstTalk=true;lineIndex=0;lineClock=0;
    showLine(0);
  }
  function doMeet(dt,now){
    let ready=true;
    for(const c of actors){
      const target=currentMeeting[c.id];
      if(!travel(c,target,dt,now))ready=false;
    }
    const separation=Math.hypot(
      actors[0].actor.root.position.x-actors[1].actor.root.position.x,
      actors[0].actor.root.position.z-actors[1].actor.root.position.z
    );
    // Both investigators can converse without exactly occupying the ideal marker.
    if((ready||elapsed>13&&separation<2.45) && separation<3.1){beginTalk();return;}
    if(elapsed>18){
      if(moveAttempts<1){
        moveAttempts++;
        currentMeeting=rendezvous[(lastMeeting+1)%rendezvous.length];
        lastMeeting=(lastMeeting+1)%rendezvous.length;
        elapsed=0;
        for(const c of actors)clearTravel(c);
      }else{
        // Do not remain stuck in silent meeting mode indefinitely.
        if(separation<3.5)beginTalk();
        else{topic=null;switchMode('work');workUntil=between(4,7);}
      }
    }
  }
  function doTalk(dt,now){
    for(const c of actors){
      const counterpart=actors.find(x=>x!==c).actor;
      face(c.actor,counterpart.root.position,dt);
      const speaking=c.id===topicSpeaker;
      c.actor.setTalking?.(speaking);
      c.actor.setDialogue?.(speaking);
      c.actor.animate(dt,false,false,now);
      // Existing talking animation controls arm and head gestures safely.
    }
    if(lastLanguage!==language()||bubble.classList.contains('hidden'))showLine(lineIndex);
    lineClock+=dt;
    if(lineClock>=lineDuration(lineIndex)){
      lineClock=0;lineIndex++;
      if(lineIndex>=lines().length){
        bubble.classList.add('hidden');
        for(const c of actors){c.actor.setTalking?.(false);c.actor.setDialogue?.(false);}
        switchMode('work');
        for(const c of actors){c.roamGoal=null;c.rest=between(0.6,1.7);}
        workUntil=between(8,15);
      }else showLine(lineIndex);
    }
  }
  function update(dt,now){
    if(!started){if(!canAct())return;createActors();}
    dt=Math.max(0,Math.min(dt,.05));
    if(!canAct()){
      bubble.classList.add('hidden');
      paused=true;
      for(const c of actors){c.actor.setTalking?.(false);c.actor.setDialogue?.(false);c.actor.animate(dt,false,false,now);}
      return;
    }
    if(paused){
      paused=false;
      if(mode==='talk')showLine(lineIndex);
    }
    elapsed+=dt;
    if(mode==='work'){
      doWork(dt,now);
      if(elapsed>=workUntil)beginMeet();
    }else if(mode==='meet')doMeet(dt,now);
    else if(mode==='talk')doTalk(dt,now);
  }
  return {
    update,actors,others,ready:()=>started,
    getDialogueStatus:()=>({
      topic:topic?.id||null,mode,lineIndex,conversationCount,firstTalk,
      characters:actors.map(c=>({name:c.id,x:c.actor.root.position.x,z:c.actor.root.position.z}))
    })
  };
}
window.AYLACrowdV9={create};
})();
