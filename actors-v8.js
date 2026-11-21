/* AYLA 0.8 — seated work pose for textured humanoids, smoother action continuity.
 * Uses the existing free Rocketbox skeleton (no new model or external account).
 * Applies angles only after bones load; gracefully retains standing fallback if not found. */
(function(){
 'use strict';
 const prior=window.AYLACharacterFactory;
 if(!prior || typeof prior.create!=='function')return;
 function create(B,scene,opts){
  const actor=prior.create(B,scene,opts);
  const baseAnimate=actor.animate, baseSetSeat=actor.setSeated, baseCinematic=actor.setCinematic;
  let seatTarget=0,seatBlend=0,bones=null,elapsed=0;
  const damp=(dt,rate)=>1-Math.exp(-Math.min(dt,.065)*rate);
  const boneMatchers={
   thighL:/left(up.?leg|thigh)/i,thighR:/right(up.?leg|thigh)/i,
   shinL:/left(leg|calf)(?!.*up)/i,shinR:/right(leg|calf)(?!.*up)/i,
   armL:/leftarm/i,armR:/rightarm/i,foreL:/leftforearm/i,foreR:/rightforearm/i,
   spine:/spine/i
  };
  const poseAngles={thighL:-1.30,thighR:-1.27,shinL:1.36,shinR:1.40,
    armL:.70,armR:.74,foreL:-.32,foreR:-.33,spine:.08};
  function collect(){
   const visual=scene.getTransformNodeByName?.((opts.name||'Ayla')+'-photoreal-container');
   if(!visual)return;
   const nodes=visual.getDescendants?.(false)?.filter(n=>n.rotationQuaternion)||[];
   const result={};
   for(const [key,matcher] of Object.entries(boneMatchers)){
     const n=nodes.find(o=>matcher.test(o.name)&&!(key.startsWith('shin') && /up.?leg/i.test(o.name)));
     if(n)result[key]={node:n,base:n.rotationQuaternion.clone()};
   }
   if(result.thighL&&result.thighR&&result.shinL&&result.shinR){bones=result;actor.seatRigAvailable=true;}
   else {actor.seatRigAvailable=false;console.warn('[AYLA] Sitting rig incomplete',Object.keys(result));}
  }
  Promise.resolve(actor.ready).then(()=>{if(actor.isRiggedReady?.())collect();}).catch(()=>{});
  actor.setSeated=function(next){
   seatTarget=next?1:0;
   // The old procedural rig can still provide the appropriate pose if the
   // textured glTF fails, but it must not deform the hidden backup in front.
   if(!actor.isRiggedReady?.())baseSetSeat?.(next);
   else baseSetSeat?.(false);
   if(next)baseCinematic?.('idle');
  };
  actor.isSeated=()=>seatBlend>.92;
  actor.animate=function(dt,moving,running,now){
   elapsed+=Math.min(dt,.06);
   seatBlend+=(seatTarget-seatBlend)*damp(dt,5.2);
   if(Math.abs(seatTarget-seatBlend)<.002)seatBlend=seatTarget;
   // When seated we hold the idle motion track and animate the work pose in
   // an onBeforeRender observer; this avoids a standing Think clip clipping chairs.
   if(seatBlend>.02 && actor.isRiggedReady?.()){baseCinematic?.('idle');}
   baseAnimate(dt,moving && seatBlend<.05,running,now);
  };
  const obs=scene.onBeforeRenderObservable.add(()=>{
   if(!bones||seatBlend<.005)return;
   for(const [key,entry] of Object.entries(bones)){
     const node=entry.node,axis=B.Axis.X,theta=poseAngles[key]*seatBlend;
     if(!node.rotationQuaternion)continue;
     // Use the model's rest pose as a stable reference; keyframed animation
     // continues to provide facial expression and blink motion.
     const offset=B.Quaternion.RotationAxis(axis,theta);
     const target=entry.base.multiply(offset);
     node.rotationQuaternion=B.Quaternion.Slerp(node.rotationQuaternion,target,seatBlend);
   }
  });
  actor.stopSeatedObserver=()=>scene.onBeforeRenderObservable.remove(obs);
  actor.seatingVersion='0.8';
  return actor;
 }
 window.AYLACharacterFactory={...prior,create,version:'0.8'};
})();