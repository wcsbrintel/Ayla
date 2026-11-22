/* AYLA 1.3 — project the original Observatory GLOBE into the existing wall monitor.
 * DOM iframe keeps the Observatory's own MapLibre/Globe engine, documented
 * routes, real case popups and original filters. Never duplicates private data.
 * Projection is a four-corner homography, not a fullscreen fake screenshot.
 */
(function(){
 'use strict';
 const $=id=>document.getElementById(id);
 const host=$('aylaWallScreen'),frame=$('aylaWallGlobe');
 if(!host||!frame)return;
 const width=1200,height=900;
 const locale={pt:'pt',en:'en',es:'es'};
 const labels={
  pt:{focus:'Explorar telão',exit:'Voltar à central',access:'Dados do Observatório',title:'GLOBE DARK · OBSERVATÓRIO',filter:'Filtros'},
  en:{focus:'Explore display',exit:'Back to headquarters',access:'Observatory data',title:'DARK GLOBE · OBSERVATORY',filter:'Filters'},
  es:{focus:'Explorar pantalla',exit:'Volver a la central',access:'Datos del Observatorio',title:'GLOBE DARK · OBSERVATORIO',filter:'Filtros'}
 };
 let engine=null,scene=null,camera=null,B=null,allowed=false,focused=false,ready=false,lang='en',loaded=false;
 const point=(x,y,z)=>new B.Vector3(x,y,z);
 const center=()=>point(-1.55,2.93,-9.045);
 // Babylon's projection views this wall with horizontal X reversed.
 // Map iframe top-left to the world-right corner and top-right to world-left.
 // Preserve Y: the latest screenshot confirms labels are upright vertically,
 // but mirrored horizontally. This corrects text, controls and geography.
 const corners=()=>[
  point(1.17,4.70,-9.045),point(-4.27,4.70,-9.045),
  point(-4.27,.88,-9.045),point(1.17,.88,-9.045)
 ];
 function solve(matrix,values){
  const a=matrix.map((row,i)=>[...row,values[i]]);
  for(let k=0;k<8;k++){
   let p=k;for(let i=k+1;i<8;i++)if(Math.abs(a[i][k])>Math.abs(a[p][k]))p=i;
   if(Math.abs(a[p][k])<1e-12)return null;
   [a[p],a[k]]=[a[k],a[p]];
   let d=a[k][k];for(let j=k;j<=8;j++)a[k][j]/=d;
   for(let i=0;i<8;i++)if(i!==k){let factor=a[i][k];for(let j=k;j<=8;j++)a[i][j]-=factor*a[k][j];}
  }
  return a.map(row=>row[8]);
 }
 function homography(p){
  const src=[[0,0],[width,0],[width,height],[0,height]],m=[],v=[];
  for(let i=0;i<4;i++){
   const [x,y]=src[i],[u,w]=p[i];
   m.push([x,y,1,0,0,0,-u*x,-u*y]);v.push(u);
   m.push([0,0,0,x,y,1,-w*x,-w*y]);v.push(w);
  }
  const a=solve(m,v);if(!a)return null;
  const [A,C,E,Bb,D,F,G,H]=a;
  return 'matrix3d('+[A,Bb,0,G,C,D,0,H,0,0,1,0,E,F,0,1].map(v=>Number(v.toPrecision(12))).join(',')+')';
 }
 function update(){
  if(!engine||!camera||!scene||!B||!allowed){host.style.display='none';return}
  const n=point(0,0,1),vector=camera.position.subtract(center());
  if(B.Vector3.Dot(n,vector)<.5||camera.position.z < -9.0){host.style.display='none';return}
  const canvas=$('renderCanvas'),rect=canvas.getBoundingClientRect();
  if(rect.width<1||rect.height<1)return;
  const view=camera.viewport.toGlobal(engine.getRenderWidth(),engine.getRenderHeight());
  const projection=scene.getTransformMatrix(),identity=B.Matrix.Identity();
  const rendered=corners().map(p=>B.Vector3.Project(p,identity,projection,view));
  if(rendered.some(p=>p.z<0||p.z>1)){host.style.display='none';return}
  const coords=rendered.map(p=>[p.x*rect.width/engine.getRenderWidth(),p.y*rect.height/engine.getRenderHeight()]);
  const transform=homography(coords);
  if(!transform){host.style.display='none';return}
  host.style.display='block';
  host.style.transform=transform;
  const side=coords.reduce((sum,p,i)=>{const q=coords[(i+1)%4];return sum+Math.hypot(p[0]-q[0],p[1]-q[1]);},0)/4;
  // At a distance, the monitor is a visible display, not an invisible input
  // layer covering the 3D movement controls. Focus explicitly to interact.
  host.classList.toggle('is-focused',focused);
  host.style.visibility=side<12?'hidden':'visible';
  host.style.pointerEvents=focused?'auto':'none';
  if(focused)host.style.zIndex='18';else host.style.zIndex='4';
 }
 function send(message){if(ready&&frame.contentWindow)frame.contentWindow.postMessage({type:'ayla:observatory-config',...message},location.origin)}
 function begin(){
  if(loaded)return;loaded=true;
  frame.src='https://wcsbrintel.github.io/iwt_globalobservatory/?ayla-wall=1&lang='+encodeURIComponent(lang);
 }
 function focus(){
  if(!allowed)return false;
  focused=true;begin();update();
  $('aylaWallExit')?.classList.remove('hidden');
  send({lang,dark:true});return true;
 }
 function unfocus(){
  focused=false;update();
  $('aylaWallExit')?.classList.add('hidden');
 }
 function setAuthorized(value){
  allowed=!!value;
  if(allowed){begin();document.documentElement.classList.add('ayla-wall-authorized');}
  else{unfocus();ready=false;loaded=false;frame.removeAttribute('src');document.documentElement.classList.remove('ayla-wall-authorized');}
  update();
 }
 function setLanguage(l){
  lang=locale[l]||'en';const t=labels[lang];
  $('aylaWallExit').textContent=t.exit;
  $('aylaWallButton').textContent=t.focus;
  $('aylaWallButton').setAttribute('aria-label',t.focus);
  send({lang,dark:true});
 }
 function handleMessage(event){
  if(event.origin!==location.origin||event.source!==frame.contentWindow)return;
  if(event.data?.type==='ayla:observatory-ready'&&allowed){
   ready=true;send({lang,dark:true,resetSevenDays:true});
  }
 }
 window.addEventListener('message',handleMessage);
 $('aylaWallExit')?.addEventListener('click',()=>window.dispatchEvent(new Event('ayla:wall-close')));
 $('aylaWallButton')?.addEventListener('click',()=>window.dispatchEvent(new Event('ayla:wall-open')));
 window.AYLAWall={
  init(b,sc,cam,eng){B=b;scene=sc;camera=cam;engine=eng;update();},
  setAuthorized,setLanguage,focus,unfocus,update,
  isFocused:()=>focused,isAuthorized:()=>allowed
 };
 setLanguage('en');
})();
