/* AYLA 0.8 — foot-plane capsule collision, acceleration, smooth yaw and pathfinding.
   Independent of Babylon's rendering for deterministic movement tests. */
(function(){
 'use strict';
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 const damp=(k,dt)=>1-Math.exp(-k*Math.min(.07,dt));
 const angleDiff=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
 const bounds={xmin:-10.9,xmax:10.9,zmin:-8.55,zmax:8.45};
 function create(extra){
   const colliders=[
     {x:4.7,z:-3.3,w:3.55,d:1.75,tag:'desk-osint'},
     {x:-.4,z:-6.4,w:3.85,d:1.95,tag:'desk-report'},
     {x:5.4,z:4.0,w:3.45,d:1.85,tag:'desk-files'},
     {x:-6.0,z:5.6,w:3.55,d:1.75,tag:'desk-board'},
     {x:4.65,z:-1.70,w:.68,d:.61,tag:'seat-osint'},
     {x:5.80,z:-1.60,w:.68,d:.61,tag:'seat-osint-2'},
     {x:-.4,z:-4.65,w:.68,d:.61,tag:'seat-report'},
     {x:5.4,z:2.4,w:.68,d:.61,tag:'seat-files'},
     {x:-9.55,z:2.0,w:2.3,d:.88,tag:'cabinet'},
     {x:10.7,z:-6.7,w:1.15,d:1.02,tag:'rack-1'},
     {x:10.7,z:-5.3,w:1.15,d:1.02,tag:'rack-2'},
     {x:10.7,z:-3.9,w:1.15,d:1.02,tag:'rack-3'},
     {x:-9.9,z:-7.4,w:.58,d:.58,tag:'plant-1'},
     {x:-.8,z:-7.4,w:.58,d:.58,tag:'plant-2'},
     {x:8.3,z:-7.4,w:.58,d:.58,tag:'plant-3'},
     ...(extra||[])
   ];
   function circleBox(x,z,r,c){const xx=clamp(x,c.x-c.w*.5,c.x+c.w*.5),zz=clamp(z,c.z-c.d*.5,c.z+c.d*.5);return (x-xx)**2+(z-zz)**2<(r+.016)**2;}
   function blocked(x,z,r,other,exclude){
     if(x-r<bounds.xmin||x+r>bounds.xmax||z-r<bounds.zmin||z+r>bounds.zmax)return true;
     for(const person of (Array.isArray(other)?other:(other?[other]:[]))){if(Math.hypot(x-person.x,z-person.z)<r+person.r+.10)return true;}
     return colliders.some(c=>c.tag!==exclude&&circleBox(x,z,r,c));
   }
   function move(pos,dx,dz,r,other,exclude){
     const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.17));let x=pos.x,z=pos.z;
     for(let i=0;i<count;i++){
       const sx=dx/count,sz=dz/count;
       if(!blocked(x+sx,z+sz,r,other,exclude)){x+=sx;z+=sz;continue;}
       if(!blocked(x+sx,z,r,other,exclude))x+=sx;
       if(!blocked(x,z+sz,r,other,exclude))z+=sz;
     }
     return {x,z,distance:Math.hypot(x-pos.x,z-pos.z)};
   }
   const state={vx:0,vz:0};
   let releasedSeat=null;
   function walk(actor,camera,hx,hz,enabled,running,dt,other){
     const wants=enabled&&!!(hx||hz);
     let dx=0,dz=0;
     if(wants){
       // The reference camera is a Babylon ArcRotateCamera. Movement is on the XZ plane.
       let fx=camera.target.x-camera.position.x,fz=camera.target.z-camera.position.z;
       let len=Math.hypot(fx,fz);if(len<.001){fx=0;fz=1;len=1;}
       fx/=len;fz/=len;
       const rx=fz,rz=-fx; // right = up cross forward
       dx=fx*hz+rx*hx;dz=fz*hz+rz*hx;len=Math.hypot(dx,dz);
       if(len>1){dx/=len;dz/=len;}
     }
     const rate=damp(wants?8.0:13.5,dt),speed=running?3.65:2.35;
     state.vx+=(dx*speed-state.vx)*rate;
     state.vz+=(dz*speed-state.vz)*rate;
     if(!wants&&Math.hypot(state.vx,state.vz)<.035){state.vx=0;state.vz=0;}
     if(releasedSeat){
       const seat=colliders.find(c=>c.tag===releasedSeat);
       if(!seat||!circleBox(actor.root.position.x,actor.root.position.z,.34,seat))releasedSeat=null;
     }
     const next=move(actor.root.position,state.vx*dt,state.vz*dt,.34,other,releasedSeat);
     const moved=next.distance>Math.min(.006,.07*dt);
     if(!moved&&wants){state.vx*=.35;state.vz*=.35;}
     actor.root.position.x=next.x;actor.root.position.z=next.z;
     if(Math.hypot(state.vx,state.vz)>.12 && moved){
       const target=Math.atan2(-state.vx,-state.vz),angle=actor.root.rotation.y;
       actor.root.rotation.y=angle+angleDiff(target,angle)*damp(10.0,dt);
     }
     return {moving:moved&&Math.hypot(state.vx,state.vz)>.06,running:running&&moved,speed:Math.hypot(state.vx,state.vz)};
   }
   // Each NPC can leave the chair it originally occupies. Once it is clear,
   // that exception expires; passing beside a chair can never grant permission
   // to walk through it. Return-to-seat access is limited to the final step.
   const npcDepartureSeat=new WeakMap();
   function moveNPC(actor,target,dt,other){
     const at=actor.root.position;
     let dx=target.x-at.x,dz=target.z-at.z;
     const len=Math.hypot(dx,dz);
     if(len<.14)return {arrived:true,moving:false};
     dx/=len;dz/=len;
     if(!npcDepartureSeat.has(actor)){
       const starting=colliders.find(c=>String(c.tag||'').startsWith('seat-')
         && circleBox(at.x,at.z,.37,c));
       npcDepartureSeat.set(actor,starting?.tag||null);
     }
     let exempt=npcDepartureSeat.get(actor);
     if(exempt){
       const seat=colliders.find(c=>c.tag===exempt);
       if(!seat||!circleBox(at.x,at.z,.37,seat)){
         exempt=null;npcDepartureSeat.set(actor,null);
       }
     }
     // A sitting character may approach its *own seat* only within the last
     // 0.9 m. Other desks, shelves, cabinets and all other chairs stay solid.
     if(!exempt&&len<.9){
       const destination=colliders.find(c=>String(c.tag||'').startsWith('seat-')
         && circleBox(target.x,target.z,.06,c));
       if(destination)exempt=destination.tag;
     }
     const a=move(at,dx*Math.min(len,dt*1.05),dz*Math.min(len,dt*1.05),
       .39,other,exempt);
     const moving=a.distance>.006;
     at.x=a.x;at.z=a.z;
     if(moving){
       const yaw=Math.atan2(-dx,-dz),old=actor.root.rotation.y;
       actor.root.rotation.y=old+angleDiff(yaw,old)*damp(6,dt);
     }
     return {arrived:Math.hypot(target.x-at.x,target.z-at.z)<.14,moving};
   }
   // Coarse A* only for scripted movement to an existing workstation.
   function path(start,end,exclude){
     const step=.45,xmin=bounds.xmin+.5,zmin=bounds.zmin+.5,nx=47,nz=36;
     const ix=x=>clamp(Math.round((x-xmin)/step),0,nx-1), iz=z=>clamp(Math.round((z-zmin)/step),0,nz-1);
     const key=(a,b)=>a+'|'+b,xy=(i,j)=>({x:xmin+i*step,z:zmin+j*step});
     let si=ix(start.x),sj=iz(start.z),ei=ix(end.x),ej=iz(end.z);
     const open=[{i:si,j:sj,g:0,f:Math.hypot(ei-si,ej-sj)}],visited=new Map(),closed=new Set();
     let endNode=null,iterations=0;
     while(open.length&&iterations++<5000){
       open.sort((a,b)=>a.f-b.f);
       const n=open.shift(),id=key(n.i,n.j);if(closed.has(id))continue;closed.add(id);
       if(n.i===ei&&n.j===ej){endNode=n;break;}
       for(let di=-1;di<=1;di++)for(let dj=-1;dj<=1;dj++){
         if(!di&&!dj)continue;
         const ni=n.i+di,nj=n.j+dj;if(ni<0||nj<0||ni>=nx||nj>=nz)continue;
         const p=xy(ni,nj);if(blocked(p.x,p.z,.31,null,exclude))continue;
         if(di&&dj){let a=xy(ni,n.j),b=xy(n.i,nj);if(blocked(a.x,a.z,.31,null,exclude)||blocked(b.x,b.z,.31,null,exclude))continue;}
         const k=key(ni,nj),g=n.g+Math.hypot(di,dj);
         if(visited.has(k)&&visited.get(k)<=g)continue;
         visited.set(k,g);open.push({i:ni,j:nj,g,f:g+Math.hypot(ei-ni,ej-nj),p:n});
       }
     }
     // An unreachable goal is a failure, never permission to walk through a wall.
     if(!endNode)return [];
     const arr=[];let n=endNode;while(n&&!(n.i===si&&n.j===sj)){arr.push(xy(n.i,n.j));n=n.p;}arr.reverse();arr.push(end);
     // Remove intermediate grid points when an unobstructed straight line is possible.
     const smooth=[];let cursor=start,k=0;
     while(k<arr.length){let j=k;for(let next=arr.length-1;next>k;next--){
       const goal=arr[next],len=Math.hypot(goal.x-cursor.x,goal.z-cursor.z);
       let clear=true;for(let t=0;t<=len;t+=.20){const a=t/Math.max(.001,len);if(blocked(cursor.x+(goal.x-cursor.x)*a,cursor.z+(goal.z-cursor.z)*a,.31,null,exclude)){clear=false;break;}}
       if(clear){j=next;break;}
     }smooth.push(arr[j]);cursor=arr[j];k=j+1;}
     return smooth;
   }
   // Safe, deliberate chair approach. The regular navigation mesh treats every
   // chair as solid. Only the final 0.9m into the selected chair may ignore
   // that one chair's collider; desks and all other furniture stay solid.
   let seatPlan=null;
   function startSeat(actor){
     const center={x:4.65,z:-1.70},seatTag='seat-osint';
     const approaches=[
       {x:4.65,z:-.78},   // rear of chair (away from workstation)
       {x:3.76,z:-1.70}, // side access if rear approach is blocked
       {x:3.77,z:-1.05}
     ];
     let best=null;
     for(const a of approaches){
       if(blocked(a.x,a.z,.34,null,null))continue;
       const steps=path(actor.root.position,a,null);
       if(!steps.length)continue;
       // The last short motion toward the chair cannot intersect a desk.
       const distance=Math.hypot(center.x-a.x,center.z-a.z);
       if(distance>1.03)continue;
       let clear=true;
       for(let i=1;i<=Math.ceil(distance/.08);i++){
         const f=i/Math.ceil(distance/.08),x=a.x+(center.x-a.x)*f,z=a.z+(center.z-a.z)*f;
         if(blocked(x,z,.30,null,seatTag)){clear=false;break;}
       }
       if(!clear)continue;
       const cost=steps.reduce((v,p,i)=>v+Math.hypot(p.x-(i?steps[i-1].x:actor.root.position.x),p.z-(i?steps[i-1].z:actor.root.position.z)),0);
       if(!best||cost<best.cost)best={steps,approach:a,cost};
     }
     seatPlan=best?{points:best.steps,index:0,phase:'approach',elapsed:0,stuck:0,seat:center,seatTag}:null;
     return {ok:!!seatPlan,reason:seatPlan?'':'no-clear-route'};
   }
   function walkToSeat(actor,dt,other){
     if(!seatPlan)return {arrived:false,failed:true,reason:'no-plan',moving:false};
     const p=seatPlan;dt=Math.min(.07,Math.max(0,dt));p.elapsed+=dt;
     if(p.elapsed>15){seatPlan=null;return {arrived:false,failed:true,reason:'timeout',moving:false};}
     let target=p.phase==='approach'?p.points[p.index]:p.seat;
     if(!target){
       seatPlan=null;return {arrived:false,failed:true,reason:'missing-target',moving:false};
     }
     const x=target.x-actor.root.position.x,z=target.z-actor.root.position.z;
     const dist=Math.hypot(x,z);
     if(dist<.075){
       if(p.phase==='approach'){
         p.index++;
         if(p.index>=p.points.length)p.phase='settle';
         return {arrived:false,failed:false,moving:false};
       }
       seatPlan=null;return {arrived:true,failed:false,moving:false};
     }
     const step=Math.min(dist,dt*(p.phase==='settle'?.95:1.75));
     const ignore=p.phase==='settle'?p.seatTag:null;
     // No arbitrary position assignment: all movement is checked against
     // desk footprints, other furniture, and current NPC positions.
     const v=move(actor.root.position,x/dist*step,z/dist*step,.30,other,ignore);
     actor.root.position.x=v.x;actor.root.position.z=v.z;
     if(v.distance<.002){p.stuck+=dt;}else p.stuck=0;
     if(p.stuck>2.0){seatPlan=null;return {arrived:false,failed:true,reason:'blocked',moving:false};}
     if(v.distance>.002){
       const yaw=Math.atan2(-x,-z),old=actor.root.rotation.y;
       actor.root.rotation.y=old+angleDiff(yaw,old)*damp(8,dt);
     }
     return {arrived:false,failed:false,moving:v.distance>.002};
   }
   function cancelSeat(){seatPlan=null;state.vx=state.vz=0;}
   function seatOrientation(actor,dt,targetRot){actor.root.rotation.y+=angleDiff(targetRot,actor.root.rotation.y)*damp(8,dt);return Math.abs(angleDiff(targetRot,actor.root.rotation.y))<.045;}
   return {colliders,blocked,move,walk,moveNPC,path,startSeat,walkToSeat,cancelSeat,seatOrientation,releaseSeat(tag){releasedSeat=tag||'seat-osint';},stop(){state.vx=state.vz=0;},reset(){seatPlan=null;releasedSeat=null;state.vx=state.vz=0;}};
 }
 window.AYLANavigationV8={create};
})();