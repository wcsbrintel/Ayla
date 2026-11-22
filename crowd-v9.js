/* AYLA 2.1 · Clara and Theo's rotating, multilingual intelligence-room dialogue.
   Original scenes, based on the public sources listed in clara-theo-dialogues.js.
   NPC subtitles only; never interfere with mission dialogue or player's controls. */
(function(){'use strict';
function create(B,scene,nav,ayla,winston,canAct,language){
  let actors=[],elapsed=0,mode='work',started=false;
  let current=null,lineIndex=-1,lineClock=0,returnCooldown=0;
  let priorTopic='',sceneCount=0,lastLanguage='';
  const random=(a,b)=>a+Math.random()*(b-a);
  let idleUntil=random(16,37);
  const catalog=window.AYLAClaraTheoDialogue?.packs||[];
  const stage=document.getElementById('app');
  const subtitle=document.createElement('div');
  subtitle.id='npcDialogue';
  subtitle.className='npc-dialogue hidden';
  subtitle.setAttribute('aria-live','off');
  const who=document.createElement('strong'),line=document.createElement('span');
  subtitle.append(who,line);
  stage.appendChild(subtitle);
  const crowd=[
   {id:'Theo',male:true,x:-6.9,z:-1.1,asset:'ryan_smart.glb',scale:1.02,role:'male',goal:{x:-1.93,z:1.12},home:{x:-7.0,z:-1.1}},
   {id:'Clara',male:false,x:6.9,z:-1.05,asset:'emma_casual.glb',scale:1.02,role:'female',goal:{x:-.68,z:1.12},home:{x:6.9,z:-1.05}}
  ];
  function getOthers(actor){
    return [ayla,winston,...actors.map(x=>x.actor)]
      .filter(x=>x&&x!==actor)
      .map(x=>({x:x.root.position.x,z:x.root.position.z,r:.35}));
  }
  function nextPath(c,target){
    const path=nav.path(c.actor.root.position,target,null);
    c.route=path?.length?path:[target];
    c.index=0;c.stuck=0;
  }
  function start(){
    if(started)return;
    started=true;
    actors.push(...crowd.map(c=>{
      const actor=window.AYLACharacterFactory.create(B,scene,{
        name:c.id,x:c.x,z:c.z,asset:c.asset,scale:c.scale,role:c.role,isWinston:c.male
      });
      actor.root.rotation.y=c.male?-1.15:0;
      c.actor=actor;c.route=[];c.index=0;c.stuck=0;
      return c;
    }));
  }
  function rotateTo(actor,target,dt){
    const dx=target.x-actor.root.position.x,dz=target.z-actor.root.position.z;
    const yaw=Math.atan2(-dx,-dz);
    const difference=Math.atan2(Math.sin(yaw-actor.root.rotation.y),Math.cos(yaw-actor.root.rotation.y));
    actor.root.rotation.y+=difference*Math.min(1,dt*5);
  }
  function moveAlong(c,goal,dt){
    if(!c.route?.length)nextPath(c,goal);
    const waypoint=c.route[c.index]||goal;
    const moved=nav.moveNPC(c.actor,waypoint,dt,getOthers(c.actor));
    const distance=Math.hypot(c.actor.root.position.x-waypoint.x,c.actor.root.position.z-waypoint.z);
    if(distance<.23){
      c.index++;
      if(c.index>=c.route.length)return {arrived:true,moving:false};
    }
    c.stuck=moved.moving?0:c.stuck+dt;
    if(c.stuck>2.1){nextPath(c,goal);c.stuck=0;}
    return {arrived:false,moving:!!moved.moving};
  }
  function chooseTopic(){
    if(!catalog.length)return null;
    const available=catalog.filter(p=>p.id!==priorTopic);
    const longConversation=(sceneCount%3===1||Math.random()<.35);
    const preferred=available.filter(p=>!!p.long===longConversation);
    const pool=preferred.length?preferred:(available.length?available:catalog);
    const topic=pool[Math.floor(Math.random()*pool.length)];
    priorTopic=topic.id;sceneCount++;
    return topic;
  }
  function getLines(){
    if(!current)return [];
    const selected=language();
    return current[selected]||current.en||current.pt||[];
  }
  function showLine(index){
    const lines=getLines();
    if(index<0||index>=lines.length){subtitle.classList.add('hidden');return;}
    const entry=lines[index];
    who.textContent=entry[0];
    line.textContent=entry[1];
    subtitle.classList.remove('hidden');
    lastLanguage=language();
  }
  function duration(index){
    const text=(getLines()[index]||[])[1]||'';
    // Allow longer analytical exchanges time to be read; 4–8 seconds per turn.
    return Math.min(8.5,Math.max(3.8,2.6+text.length/22));
  }
  function switchMode(next){
    mode=next;elapsed=0;
    actors.forEach(c=>{c.route=[];c.index=0;});
  }
  function finishConversation(){
    subtitle.classList.add('hidden');
    actors.forEach(c=>c.actor.setDialogue?.(false));
    current=null;lineIndex=-1;lineClock=0;
    switchMode('return');
  }
  function update(dt,now){
    if(!started){if(canAct())start();else return;}
    dt=Math.min(Math.max(dt,0),.05);
    if(!canAct()){
      subtitle.classList.add('hidden');
      actors.forEach(c=>c.actor.animate(dt,false,false,now));
      return; // Pause timing and dialogue while any mission panel is open.
    }
    elapsed+=dt;
    if(mode==='work'){
      actors.forEach(c=>c.actor.animate(dt,false,false,now));
      if(elapsed>=idleUntil){
        current=chooseTopic();
        if(current){switchMode('meet');}
        else{elapsed=0;idleUntil=random(24,50);}
      }
    }else if(mode==='meet'){
      let arrived=true;
      for(const c of actors){
        const movement=moveAlong(c,c.goal,dt);
        c.actor.animate(dt,movement.moving,false,now);
        if(!movement.arrived)arrived=false;
      }
      // Avoid long-distance dialogues if navigation fails.
      if(arrived||(elapsed>24&&actors.every(c=>Math.hypot(c.actor.root.position.x-c.goal.x,c.actor.root.position.z-c.goal.z)<1.8))){
        switchMode('talk');lineIndex=0;lineClock=0;
        showLine(0);actors.forEach(c=>c.actor.setDialogue?.(true));
      }else if(elapsed>36){
        subtitle.classList.add('hidden');
        current=null;switchMode('return');
      }
    }else if(mode==='talk'){
      for(let i=0;i<actors.length;i++){
        const c=actors[i];
        rotateTo(c.actor,actors[1-i].actor.root.position,dt);
        c.actor.animate(dt,false,false,now);
      }
      if(lastLanguage!==language())showLine(lineIndex);
      if(subtitle.classList.contains('hidden'))showLine(lineIndex);
      lineClock+=dt;
      if(lineClock>=duration(lineIndex)){
        lineClock=0;lineIndex++;
        if(lineIndex>=getLines().length)finishConversation();
        else showLine(lineIndex);
      }
    }else if(mode==='return'){
      let arrived=true;
      for(const c of actors){
        const movement=moveAlong(c,c.home,dt);
        c.actor.animate(dt,movement.moving,false,now);
        if(!movement.arrived)arrived=false;
      }
      if(arrived||elapsed>36){
        switchMode('work');
        // Alternating normal pauses and longer breaks makes talk feel occasional.
        idleUntil=random(22,55)+(sceneCount%3===0?random(20,46):0);
      }
    }
  }
  return {
    update,actors,others:getOthers,ready:()=>started,
    getDialogueStatus:()=>({topic:current?.id||null,mode,lineIndex,sceneCount})
  };
}
window.AYLACrowdV9={create};
})();
