/* AYLA 0.9 — two additional civilian analysts, with patrols and synchronized dialog. */
(function(){'use strict';
function create(B,scene,nav,ayla,winston,canAct,language){
 let actors=[],t=0,dialogueTime=0,mode='work',phase='idle',subtitle=null,held=0,started=false;
 const dialog={
  pt:[['Clara','O registro do transporte não corresponde à apreensão.'],['Theo','Vou cruzar as fontes antes de atualizar o mapa.'],['Clara','Ótimo. Mantenha as hipóteses separadas dos fatos.']],
  en:[['Clara','The transport record does not match the seizure.'],['Theo','I will cross-check the sources before updating the map.'],['Clara','Good. Keep leads separate from confirmed facts.']],
  es:[['Clara','El registro de transporte no coincide con la incautación.'],['Theo','Voy a contrastar las fuentes antes de actualizar el mapa.'],['Clara','Bien. Mantén las hipótesis separadas de los hechos.']]
 };
 const stage=document.getElementById('app');subtitle=document.createElement('div');subtitle.id='npcDialogue';subtitle.className='npc-dialogue hidden';subtitle.setAttribute('aria-live','off');stage.appendChild(subtitle);
 const crowd=[
  {id:'Theo',male:true,x:-6.9,z:-1.1,asset:'ryan_smart.glb',scale:1.02,role:'male',goal:{x:-1.93,z:1.12},home:{x:-7.0,z:-1.1},wait:0},
  {id:'Clara',male:false,x:6.9,z:-1.05,asset:'emma_casual.glb',scale:1.02,role:'female',goal:{x:-.68,z:1.12},home:{x:6.9,z:-1.05},wait:0}
 ];
 function getOthers(actor){return [ayla,winston,...actors.map(x=>x.actor)].filter(a=>a&&a!==actor).map(a=>({x:a.root.position.x,z:a.root.position.z,r:.35}));}
 function nextPath(c,target){
  // Never globally ignore a chair while planning a route; that formerly let
  // the A* planner guide characters straight through desks and furniture.
  const seat=nav.colliders.find(v=>String(v.tag||'').startsWith('seat-')
    && Math.abs(v.x-target.x)<v.w*.5+.08
    && Math.abs(v.z-target.z)<v.d*.5+.08);
  let endpoint=target,finalStep=null;
  if(seat){
    // Plan to a point just outside the occupied chair, then approach that
    // specific seat in the last step. Every other chair remains an obstacle.
    const radius=Math.max(seat.w,seat.d)*.5+.57;
    const choices=[
      {x:seat.x,z:seat.z+radius},{x:seat.x+radius,z:seat.z},
      {x:seat.x-radius,z:seat.z},{x:seat.x,z:seat.z-radius}
    ].filter(p=>!nav.blocked(p.x,p.z,.39,null,null));
    if(choices.length){
      choices.sort((a,b)=>Math.hypot(a.x-c.actor.root.position.x,a.z-c.actor.root.position.z)
        -Math.hypot(b.x-c.actor.root.position.x,b.z-c.actor.root.position.z));
      endpoint=choices[0];finalStep=target;
    }
  }
  const p=nav.path(c.actor.root.position,endpoint,null);
  c.route=p?.length?p:[endpoint];
  if(finalStep)c.route.push(finalStep);
  c.index=0;c.stuck=0;c.prevX=c.actor.root.position.x;c.prevZ=c.actor.root.position.z;
 }
 function start(){if(started)return;started=true;actors.push(...crowd.map(c=>{
   const actor=window.AYLACharacterFactory.create(B,scene,{name:c.id,x:c.x,z:c.z,asset:c.asset,scale:c.scale,role:c.role,isWinston:c.male});
   actor.root.rotation.y=c.male?-1.15:0;
   c.actor=actor;c.route=[];c.index=0;
   // No pose is forced into a rig that lacks an authored sit clip.
   c.sitting=false;
   return c;
 }));
 }
 function rotateTo(actor,target,dt){
   const dx=target.x-actor.root.position.x,dz=target.z-actor.root.position.z;
   const yaw=Math.atan2(-dx,-dz),d=Math.atan2(Math.sin(yaw-actor.root.rotation.y),Math.cos(yaw-actor.root.rotation.y));
   actor.root.rotation.y+=d*Math.min(1,dt*5);
 }
 function moveAlong(c,goal,dt){
   if(!c.route?.length)nextPath(c,goal);
   const waypoint=c.route[c.index]||goal;
   const other=getOthers(c.actor);
   const m=nav.moveNPC(c.actor,waypoint,dt,other);
   const dist=Math.hypot(c.actor.root.position.x-waypoint.x,c.actor.root.position.z-waypoint.z);
   if(dist<.23){c.index++;if(c.index>=c.route.length)return {arrived:true,moving:false};}
   if(m.moving)c.stuck=0;else c.stuck+=dt;
   if(c.stuck>1.6){nextPath(c,goal);c.stuck=0;}
   return {arrived:false,moving:m.moving};
 }
 function displayDialogue(idx){const lang=language();const lines=dialog[lang]||dialog.en;let [who,line]=lines[Math.min(idx,lines.length-1)];subtitle.innerHTML='<strong>'+who+'</strong><span>'+line+'</span>';subtitle.classList.remove('hidden');}
 function setMode(next){mode=next;t=0;actors.forEach(c=>{c.route=[];c.index=0;});}
 function update(dt,now){
  if(!started){if(canAct())start();else return;}
  dt=Math.min(dt,.05);t+=dt;
  if(mode==='work'){
    actors.forEach(c=>{c.actor.animate(dt,false,false,now);if(c.sitting)c.actor.setSeated?.(true);});
    if(t>7.5){actors.forEach(c=>{c.actor.setSeated?.(false);c.sitting=false;});setMode('meet');}
  }else if(mode==='meet'){
    let allArrived=true;
    for(const c of actors){const m=moveAlong(c,c.goal,dt);c.actor.animate(dt,m.moving,false,now);if(!m.arrived)allArrived=false;}
    if(allArrived){setMode('talk');subtitle.classList.remove('hidden');displayDialogue(0);actors.forEach(c=>c.actor.setDialogue?.(true));}
    if(t>28){setMode('talk');actors.forEach(c=>c.actor.setDialogue?.(true));}
  }else if(mode==='talk'){
    actors.forEach((c,i)=>{rotateTo(c.actor,actors[1-i].actor.root.position,dt);c.actor.animate(dt,false,false,now);});
    const i=Math.min(2,Math.floor(t/2.8));displayDialogue(i);
    if(t>8.5){subtitle.classList.add('hidden');actors.forEach(c=>c.actor.setDialogue?.(false));setMode('return');}
  }else if(mode==='return'){
    let all=true;
    for(const c of actors){const m=moveAlong(c,c.home,dt);c.actor.animate(dt,m.moving,false,now);if(!m.arrived)all=false;}
    if(all||t>35){actors.forEach(c=>{c.actor.setSeated?.(false);c.sitting=false;});setMode('work');}
  }
 }
 return {update,actors,others:getOthers,ready:()=>started};
}
window.AYLACrowdV9={create};
})();