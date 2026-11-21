/* AYLA 0.6 — free procedural character cinematics
 * Extends the Babylon.js characters with seating, sustained work gestures and
 * talk/listen motion. All assets and logic are local to this repository.
 */
(function () {
  'use strict';
  const previous = window.AYLACharacterFactory;
  if (!previous || typeof previous.create !== 'function') return;
  function create(B, scene, options) {
    const actor = previous.create(B, scene, options);
    const animateBase = actor.animate;
    let seatGoal = 0, seat = 0;
    let mode = 'idle', modeBlend = 0;
    let dialog = false, gestureTime = 0;
    const lerp = (a,b,t)=>a+(b-a)*t;
    const smooth=(dt,rate)=>1-Math.exp(-Math.min(dt,.06)*rate);
    actor.setSeated = (next) => { seatGoal = next ? 1 : 0; };
    actor.isSeated = () => seat > .8;
    actor.setCinematic = (next) => { mode = next || 'idle'; };
    actor.setDialogue = (next) => { dialog = !!next; if (actor.setTalking) actor.setTalking(dialog); };
    actor.animate = function (dt, moving, running, now) {
      const dtSafe = Math.min(dt,.06);
      const walking = !!moving && seatGoal < .01;
      animateBase(dtSafe, walking, running, now);
      seat = lerp(seat,seatGoal,smooth(dtSafe,5.1));
      modeBlend = lerp(modeBlend,mode==='idle'?0:1,smooth(dtSafe,5.5));
      gestureTime += dtSafe;
      if (actor.legs && actor.knees) {
        // Hip flexion, lower-leg counter rotation and natural asymmetric knees.
        actor.legs.forEach((leg,i) => {
          const flex = (1.31 + .015*i)*seat;
          leg.rotation.x=lerp(leg.rotation.x, flex, seat*.93);
          actor.knees[i].rotation.x=lerp(actor.knees[i].rotation.x,-1.33*seat,seat*.93);
          leg.rotation.z=lerp(leg.rotation.z,(i?-.05:.05)*seat,smooth(dtSafe,5));
        });
      }
      if (actor.arms) {
        const signal=Math.sin(gestureTime*4.9)*.055;
        let targets=[0,0];
        if(mode==='terminal') targets=[1.11+signal,1.00-signal];
        else if(mode==='report') targets=[.8,.88+signal*.4];
        else if(mode==='board') targets=[.26,.94+signal*.3];
        else if(mode==='map') targets=[.21,1.02+signal*.2];
        else if(mode==='winston') targets=[.06,.26+Math.sin(gestureTime*2)*.025];
        if(seat>.02)targets=[1.1+signal,1.00-signal];
        actor.arms.forEach((arm,i) => {
          const weight=Math.max(seat,modeBlend*.67);
          arm.rotation.x=lerp(arm.rotation.x,targets[i],weight*smooth(dtSafe,10));
        });
      }
      if(actor.headPivot) {
        const head=actor.headPivot;
        if (seat>.01) {
          head.rotation.x=lerp(head.rotation.x,.13*seat,smooth(dtSafe,3.3));
          head.rotation.y=lerp(head.rotation.y,Math.sin(gestureTime*.4)*.028,smooth(dtSafe,2.9));
        }
        if (dialog && !walking && seat < .01) {
          head.rotation.x=lerp(head.rotation.x,Math.sin(gestureTime*2.5)*.033,smooth(dtSafe,4));
          head.rotation.y=lerp(head.rotation.y,.12+Math.sin(gestureTime*.8)*.04,smooth(dtSafe,3));
        }
      }
    };
    actor.cinematicVersion='0.6';
    return actor;
  }
  window.AYLACharacterFactory={...previous,create,version:'0.6'};
})();