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
  let seatTarget=0,seatBlend=0,elapsed=0;
  const damp=(dt,rate)=>1-Math.exp(-Math.min(dt,.065)*rate);
  // Native seat clips are detected in the loader; no procedural bone bending.
  actor.setSeated=function(next){
   const supported=!!actor.supportsSeatedAnimation?.();
   // Do not claim to sit when the model has no authored seated animation.
   seatTarget=next&&supported?1:0;
   baseSetSeat?.(false);
   if(seatTarget)baseCinematic?.('idle');
  };
  actor.isSeated=()=>seatBlend>.92 && !!actor.supportsSeatedAnimation?.();
  actor.animate=function(dt,moving,running,now){
   elapsed+=Math.min(dt,.06);
   seatBlend+=(seatTarget-seatBlend)*damp(dt,5.2);
   if(Math.abs(seatTarget-seatBlend)<.002)seatBlend=seatTarget;
   // When seated we hold the idle motion track and animate the work pose in
   // an onBeforeRender observer; this avoids a standing Think clip clipping chairs.
   if(seatBlend>.02 && actor.isRiggedReady?.() && !actor.supportsSeatedAnimation?.()){seatBlend=0;}
   baseAnimate(dt,moving && seatBlend<.05,running,now);
  };
  // Never rotate animated Rocketbox bones manually. Their authored skeletons
  // do not share the same local joint axes; applying generic hip/knee quaternions
  // creates huge triangular skinning artifacts across the room.
  // Only a verified native seated animation may be used for rigged characters.
  actor.stopSeatedObserver=()=>{};
  actor.seatingVersion='0.8';
  return actor;
 }
 window.AYLACharacterFactory={...prior,create,version:'0.8'};
})();