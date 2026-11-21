/* AYLA 0.8 — environment dressing, investigator room and continuously rotating 3D globe.
   Uses only procedural geometry, locally stored assets and an original poster layout.
   Anonymous silhouettes on the lead board are NOT identifications of real people. */
(function(){
 'use strict';
 function install(B,scene,config){
  const meshes=[];
  const neutral=(name,hex,emissive)=>{
   const m=new B.PBRMaterial('v8-'+name,scene);
   m.albedoColor=B.Color3.FromHexString(hex);m.metallic=.05;m.roughness=.83;
   if(emissive)m.emissiveColor=B.Color3.FromHexString(emissive);
   return m;
  };
  const slate=neutral('slate','#29383c'), basalt=neutral('basalt','#12232a'), walnut=neutral('wood','#544e46');
  const brass=neutral('brass','#8f8a6b'), nylon=neutral('nylon','#676454'), dark=neutral('dark','#18262a');
  const lit=neutral('light','#b5cbb8','#263e3c');
  const accent=neutral('accent','#a3c18c','#12281c');
  function bx(name,w,h,d,x,y,z,mat,parent){let m=B.MeshBuilder.CreateBox('v8-'+name,{width:w,height:h,depth:d},scene);m.position.set(x,y,z);m.material=mat;if(parent)m.parent=parent;meshes.push(m);return m;}
  function sphere(name,diam,x,y,z,mat,parent){let m=B.MeshBuilder.CreateSphere('v8-'+name,{diameter:diam,segments:16},scene);m.position.set(x,y,z);m.material=mat;if(parent)m.parent=parent;meshes.push(m);return m;}
  function tube(name,pts,r,mat,parent){let m=B.MeshBuilder.CreateTube('v8-'+name,{path:pts.map(p=>new B.Vector3(...p)),radius:r,tessellation:8},scene);m.material=mat;if(parent)m.parent=parent;meshes.push(m);return m;}
  // Enclose the previously open edges. This removes the infinite black void.
  bx('south-wall',23.8,5.65,.22,0,2.70,-9.65,basalt);
  bx('east-wall',.22,5.65,11.9,11.83,2.70,-3.75,basalt);
  // Matte floor and understated grout, instead of emissive neon floor graphics.
  const floor=scene.getMeshByName('floor');
  if(floor)floor.material=slate;
  scene.meshes.filter(m=>m.name==='floorLine' || m.name==='floorGrid' || m.name==='floorGuide').forEach(m=>{m.material=neutral('floor-groove','#3a4c4d');});
  // Warm timber accents and muted wall sconces bring some natural material to the room.
  for(let i=0;i<4;i++){
    bx('slat',.10,4.3,.05,-10.5+i*.41,2.6,-9.51,walnut);
    bx('sconce',.33,.12,.15,-10.3+i*2.0,4.75,-9.35,lit);
  }
  for(let z of [-7.1,-4.0,-.9,2.2,5.3]){
    bx('west-wall-accent',.10,3.7,.10,-11.65,2.65,z,walnut);
  }
  // Original uploaded Observatory mark, vector-traced without the image's background artifacts.
  const rugTexture=new B.Texture('assets/observatory-rug.svg',scene,false,false);
  rugTexture.hasAlpha=false;
  const rugmat=new B.StandardMaterial('v8-observatory-rug',scene);
  rugmat.diffuseTexture=rugTexture;rugmat.specularColor=new B.Color3(.015,.025,.02);
  rugmat.backFaceCulling=false;
  const rug=B.MeshBuilder.CreateGround('v8-observatory-rug',{width:4.5,height:2.9,subdivisions:1},scene);
  rug.position.set(-1.05,-.045,1.65);rug.material=rugmat;
  bx('rug-underlay',4.56,.015,2.96,-1.05,-.056,1.65,neutral('rug-edge','#292f25'));
  // Ayla's field pack rests on the floor beside the OSINT desk, not on her back.
  const packRoot=new B.TransformNode('Ayla-field-pack-grounded',scene);
  packRoot.position.set(7.5,0,-1.28);packRoot.rotation.y=-.20;
  const packBody=bx('backpack-shell',.60,.86,.34,0,.48,0,nylon,packRoot);packBody.rotation.z=.06;
  bx('backpack-pocket',.51,.35,.10,0,.34,-.22,walnut,packRoot);
  bx('backpack-top',.62,.15,.39,0,.93,.02,nylon,packRoot);
  bx('backpack-zipper',.49,.022,.012,0,.58,-.29,brass,packRoot);
  bx('backpack-buckle',.09,.12,.036,0,.39,-.295,brass,packRoot);
  for(const s of [-1,1]){
    tube('pack-strap',[[s*.19,.85,.18],[s*.31,.65,.26],[s*.32,.29,.26],[s*.24,.18,.14]],.038,walnut,packRoot);
    bx('pack-pocket-side',.09,.33,.25,s*.33,.39,-.04,nylon,packRoot);
  }
  bx('bottle-on-pack',.18,.31,.20,.36,.40,.13,slate,packRoot);
  // Wall posters: wildlife identification and anonymized investigative leads.
  function posterTexture(name,type,index){
    let t=new B.DynamicTexture('v8-poster-'+name,{width:768,height:1024},scene,true);
    const c=t.getContext(),W=768,H=1024;
    c.fillStyle='#101f24';c.fillRect(0,0,W,H);
    let grd=c.createLinearGradient(0,0,W,H);
    grd.addColorStop(0,type==='wildlife'?'#2f5047':'#3c4347');grd.addColorStop(.65,'#142b31');grd.addColorStop(1,'#071820');
    c.fillStyle=grd;c.fillRect(30,30,W-60,800);
    const centerX=384,centerY=410;
    if(type==='wildlife'){
      c.fillStyle='rgba(169,211,175,.10)';
      for(let r=240;r>50;r-=40){c.beginPath();c.arc(centerX,centerY,r,0,Math.PI*2);c.strokeStyle='rgba(168,218,198,.08)';c.lineWidth=2;c.stroke();}
      c.save();c.translate(centerX,centerY);
      c.fillStyle='#8fae9c';c.strokeStyle='#afcbbb';c.lineWidth=5;
      if(index===0){ // macaw: curved head, beak, crest and chest
        c.beginPath();c.moveTo(-95,170);c.bezierCurveTo(-170,-10,-85,-186,38,-156);c.bezierCurveTo(150,-145,137,-30,65,60);c.bezierCurveTo(44,130,10,190,-95,170);c.fill();
        c.fillStyle='#20383d';c.beginPath();c.moveTo(70,-85);c.bezierCurveTo(210,-45,198,34,75,80);c.bezierCurveTo(101,-3,59,-30,70,-85);c.fill();
        c.fillStyle='#e2e4ce';c.beginPath();c.arc(57,-94,11,0,Math.PI*2);c.fill();
        c.strokeStyle='#a1bdb3';c.beginPath();c.moveTo(20,-165);c.lineTo(25,-230);c.moveTo(35,-170);c.lineTo(72,-217);c.stroke();
      }else{ // jaguar: ears, broad feline head and whiskers
        c.beginPath();c.moveTo(-162,-78);c.lineTo(-168,-187);c.lineTo(-68,-156);c.bezierCurveTo(0,-189,69,-164,85,-157);c.lineTo(162,-186);c.lineTo(162,-63);c.bezierCurveTo(215,65,95,169,0,187);c.bezierCurveTo(-117,169,-199,55,-162,-78);c.fill();
        c.fillStyle='#1c3434';for(const s of [-1,1]){c.beginPath();c.ellipse(s*75,-21,23,15,s*.15,0,6.3);c.fill();}c.beginPath();c.moveTo(-27,68);c.lineTo(27,68);c.lineTo(0,102);c.fill();
        c.strokeStyle='#e1e7dd';c.lineWidth=4;for(const side of [-1,1])for(let n=0;n<3;n++){c.beginPath();c.moveTo(0,110);c.lineTo(side*(135+n*12),80+n*25);c.stroke();}
      }
      c.restore();
    }else{
      c.fillStyle='rgba(197,214,212,.23)';c.beginPath();c.arc(centerX,278,115,0,Math.PI*2);c.fill();
      c.beginPath();c.moveTo(152,673);c.lineTo(165,568);c.bezierCurveTo(195,434,300,434,384,438);c.bezierCurveTo(485,433,593,454,612,571);c.lineTo(635,673);c.closePath();c.fill();
      c.strokeStyle='#c1cfc5';c.lineWidth=3;c.setLineDash([14,12]);c.strokeRect(142,133,484,590);c.setLineDash([]);
      c.fillStyle='#c2d1ca';c.font='bold 27px Arial';c.fillText('PROFILE / '+(index+1),63,87);
      c.fillStyle='#e4cc90';c.font='bold 23px Arial';c.fillText('LEAD UNDER REVIEW',63,775);
    }
    c.fillStyle='#d7e8d8';c.font='bold 40px Arial';c.fillText(type==='wildlife'?(index===0?'MACAW / ARARA':'JAGUAR / ONÇA'):'INVESTIGATIVE LEAD',58,892);
    c.fillStyle='#91aeaa';c.font='23px Arial';c.fillText(type==='wildlife'?'SPECIES IDENTIFICATION / FIELD REFERENCE':'IDENTITY NOT VERIFIED  •  TRAINING PROFILE',60,941);
    c.fillStyle='#b6e0a0';c.fillRect(35,976,698,4);
    t.update();return t;
  }
  const postItems=[['macaw','wildlife',0,-7.1],['leadA','lead',0,-3.5],['jaguar','wildlife',1,.1],['leadB','lead',1,3.7]];
  postItems.forEach(([n,type,j,z])=>{
    const back=bx('poster-frame-'+n,.10,2.88,2.23,-11.60,2.69,z,walnut);
    const p=B.MeshBuilder.CreatePlane('v8-poster-'+n,{width:2.05,height:2.65},scene);
    p.position.set(-11.52,2.69,z);p.rotation.y=-Math.PI/2;
    const m=new B.StandardMaterial('poster-'+n,scene);m.diffuseTexture=posterTexture(n,type,j);m.emissiveColor=new B.Color3(.12,.16,.13);m.backFaceCulling=false;
    p.material=m;
  });
  // Rotating globe uses coastline geometry derived from publicly available global coastline data.
  const screenRoot=new B.TransformNode('rotating-globe-monitor',scene);
  screenRoot.position.set(-1.55,2.94,-9.23);
  bx('globe-recess',5.75,4.75,.12,0,0,-.26,basalt,screenRoot);
  bx('globe-header',5.65,.53,.07,0,2.03,-.18,dark,screenRoot);
  const headerTex=new B.DynamicTexture('globe-header-tex',{width:1024,height:128},scene,true);
  const ctx=headerTex.getContext();ctx.fillStyle='#06181e';ctx.fillRect(0,0,1024,128);ctx.fillStyle='#c6dfa3';ctx.font='bold 39px Arial';ctx.fillText('GLOBAL WILDLIFE INTELLIGENCE',32,72);ctx.fillStyle='#759eae';ctx.font='23px monospace';ctx.fillText('3D / LIVE MONITORING',670,72);headerTex.update();
  const headerPanel=B.MeshBuilder.CreatePlane('v8-global-header',{width:5.58,height:.48},scene);headerPanel.position.set(0,2.03,-.21);headerPanel.material=new B.StandardMaterial('globeHeaderMat',scene);headerPanel.material.diffuseTexture=headerTex;headerPanel.material.emissiveColor=new B.Color3(.18,.21,.21);headerPanel.material.backFaceCulling=false;headerPanel.parent=screenRoot;
  const earthRoot=new B.TransformNode('v8-earth-root',scene);earthRoot.parent=screenRoot;
  earthRoot.position.set(0,-.03,.12);earthRoot.rotation.x=.30;
  const sea=neutral('earth-sea','#232e36');sea.metallic=.04;sea.roughness=.92;
  const earth=B.MeshBuilder.CreateSphere('v8-Earth',{diameter:3.30,segments:48},scene);earth.parent=earthRoot;earth.material=sea;
  const R=1.658;
  function latlon(lon,lat,r=R){let a=lon*Math.PI/180,b=lat*Math.PI/180;return new B.Vector3(Math.cos(b)*Math.sin(a)*r,Math.sin(b)*r,Math.cos(b)*Math.cos(a)*r);}
  const coast=window.AYLACoastlineV8||[];const lines=[];
  for(let segment of coast){let points=[];for(let j=0;j<segment.length-1;j+=2)points.push(latlon(segment[j],segment[j+1]));if(points.length>=2)lines.push(points);}
  const coastlines=B.MeshBuilder.CreateLineSystem('v8-Earth-coastlines',{lines},scene);coastlines.color=B.Color3.FromHexString('#9bacb5');coastlines.alpha=.70;coastlines.parent=earthRoot;
  const parallels=[];
  for(let lat=-60;lat<=60;lat+=30){let points=[];for(let lon=-180;lon<=180;lon+=4)points.push(latlon(lon,lat,R+.005));parallels.push(points);}
  for(let lon=-180;lon<180;lon+=45){let points=[];for(let lat=-86;lat<=86;lat+=4)points.push(latlon(lon,lat,R+.005));parallels.push(points);}
  const grid=B.MeshBuilder.CreateLineSystem('v8-Earth-grid',{lines:parallels},scene);grid.color=B.Color3.FromHexString('#344c57');grid.alpha=.42;grid.parent=earthRoot;
  const routePoints=[[-60,-3],[-46,-23],[18,-34],[73,20],[101,13],[120,15],[28,-1],[-78,-5]];
  const pointMat=neutral('event-blue','#8accca','#2c8d96');
  routePoints.forEach(([lon,lat],i)=>{let p=latlon(lon,lat,R+.025);let m=B.MeshBuilder.CreateSphere('v8-case-pin-'+i,{diameter:.069,segments:10},scene);m.position=p;m.material=pointMat;m.parent=earthRoot;});
  function route(a,b){const pts=[];let ap=latlon(...a,1),bp=latlon(...b,1);for(let i=0;i<=42;i++){const t=i/42;const v=B.Vector3.Slerp?B.Vector3.Slerp(ap,bp,t):ap.scale(1-t).add(bp.scale(t)).normalize();let radius=R+.032+.23*Math.sin(t*Math.PI);pts.push(v.normalize().scale(radius));}const m=B.MeshBuilder.CreateLines('v8-trafficking-route',{points:pts},scene);m.color=B.Color3.FromHexString('#67a7b5');m.alpha=.74;m.parent=earthRoot;}
  [[0,3],[1,4],[5,6],[7,2]].forEach(([i,j])=>route(routePoints[i],routePoints[j]));
  const outline=neutral('globe-outline','#678c80');
  for(let sx of [-1,1]) bx('globe-side-trim',.055,4.75,.10,sx*2.85,0,-.15,outline,screenRoot);
  bx('globe-foot',5.73,.07,.10,0,-2.35,-.14,outline,screenRoot);
  // Non-collidable wall displays and decals remain outside the player volume.
  const obstacles=[{x:7.5,z:-1.28,w:.80,d:.62,tag:'backpack'}];
  return {rug,backpack:packRoot,posters:postItems.length,globe:earthRoot,obstacles,
    tick(dt){earthRoot.rotation.y+=Math.min(.07,dt)*.12;}
  };
 }
 window.AYLARoomV8={install};
})();