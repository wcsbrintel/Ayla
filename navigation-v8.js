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
   function moveNPC(actor,target,dt,other){
     let dx=target.x-actor.root.position.x,dz=target.z-actor.root.position.z;
     const len=Math.hypot(dx,dz);if(len<.14)return {arrived:true,moving:false};
     dx/=len;dz/=len;
     const a=move(actor.root.position,dx*Math.min(len,dt*1.05),dz*Math.min(len,dt*1.05),.37,other,null);
     let moving=a.distance>.007;
     actor.root.position.x=a.x;actor.root.position.z=a.z;
     if(moving){
       const yaw=Math.atan2(-dx,-dz),old=actor.root.rotation.y;
       actor.root.rotation.y=old+angleDiff(yaw,old)*damp(6,dt);
     }
     return {arrived:len<.14,moving};
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
     if(!endNode)return [end];
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
   let seatPlan=null;
   function startSeat(actor){seatPlan={points:path(actor.root.position,{x:4.65,z:-1.70},'seat-osint'),index:0,elapsed:0,done:false};return seatPlan;}
   function walkToSeat(actor,dt,other){
     if(!seatPlan)return true;
     seatPlan.elapsed+=dt;
     if(seatPlan.elapsed>22)return false;
     const p=seatPlan.points[seatPlan.index];if(!p)return true;
     let dx=p.x-actor.root.position.x,dz=p.z-actor.root.position.z,len=Math.hypot(dx,dz);
     if(len<.10){seatPlan.index++;return seatPlan.index>=seatPlan.points.length;}
     const speed=1.75,step=Math.min(len,dt*speed),next=move(actor.root.position,dx/len*step,dz/len*step,.30,other,'seat-osint');
     actor.root.position.x=next.x;actor.root.position.z=next.z;
     const yaw=Math.atan2(-dx,-dz),old=actor.root.rotation.y;
     actor.root.rotation.y=old+angleDiff(yaw,old)*damp(8,dt);
     if(seatPlan.index===seatPlan.points.length-1 && len<.12){seatPlan.index++;return true;}
     return false;
   }
   function seatOrientation(actor,dt,targetRot){actor.root.rotation.y+=angleDiff(targetRot,actor.root.rotation.y)*damp(8,dt);return Math.abs(angleDiff(targetRot,actor.root.rotation.y))<.045;}
   return {colliders,blocked,move,walk,moveNPC,path,startSeat,walkToSeat,seatOrientation,releaseSeat(tag){releasedSeat=tag||'seat-osint';},stop(){state.vx=state.vz=0;},reset(){seatPlan=null;releasedSeat=null;state.vx=state.vz=0;}};
 }
 window.AYLANavigationV8={create};
})();