/* AYLA 0.9 — Old-world field intelligence study. All props are local geometry. */
(function(){'use strict';
const BNAME='AYLAVintageV9';
function install(B,scene){
 const objects=[],obstacles=[];
 function mat(name,color,metal=0,rough=.83){let m=new B.PBRMaterial('v9-'+name,scene);m.albedoColor=B.Color3.FromHexString(color);m.metallic=metal;m.roughness=rough;return m;}
 const bookPalette=['#4b3830','#6b4a38','#364944','#61523c','#6b3d35','#55574c'].map((hex,i)=>mat('archival-book-'+i,hex));
 const plaster=mat('warm-plaster','#8e8573'),stone=mat('aged-stone','#746d60'),stone2=mat('limestone','#b7a78c'),walnut=mat('walnut','#3a2823'),wood=mat('dark-oak','#554039'),wood2=mat('oak-highlight','#826850'),brass=mat('aged-brass','#a99567',.65,.45),bronze=mat('bronze','#615d4a',.65,.35),dark=mat('charcoal','#292d2a'),glass=mat('glass','#b2c2b3',.16,.28),copper=mat('old-copper','#8b6550',.75,.45),cloth=mat('linen','#d0bf9e'),paper=mat('aged-paper','#d6c39d');
 function box(n,w,h,d,x,y,z,m,parent){const o=B.MeshBuilder.CreateBox('v9-'+n,{width:w,height:h,depth:d},scene);o.position.set(x,y,z);o.material=m;if(parent)o.parent=parent;objects.push(o);return o;}
 function cylinder(n,diam,h,x,y,z,m,parent){let o=B.MeshBuilder.CreateCylinder('v9-'+n,{diameter:diam,height:h,tessellation:12},scene);o.position.set(x,y,z);o.material=m;if(parent)o.parent=parent;objects.push(o);return o;}
 function sphere(n,diam,x,y,z,m,parent){let o=B.MeshBuilder.CreateSphere('v9-'+n,{diameter:diam,segments:16},scene);o.position.set(x,y,z);o.material=m;if(parent)o.parent=parent;objects.push(o);return o;}
 // Turn the high-tech room into a carefully maintained historical research house.
 scene.meshes.filter(m=>/^(northWall|westWall|eastWall|wallAccent|window|wallPillar|pillar|floorLine|floorGuide|floorGrid|ceilingLight|lightPanel|ceilingRib|ceilingCrossbeam|suspendedStrip|luminaire)$/.test(m.name)).forEach(m=>m.setEnabled(false));
 scene.meshes.filter(m=>m.name==='v8-south-wall'||m.name==='v8-east-wall').forEach(m=>m.setEnabled(false));
 box('north-plaster',23.7,5.55,.17,0,2.68,9.55,plaster);box('south-plaster',23.7,5.55,.17,0,2.68,-9.53,plaster);
 box('west-plaster',.17,5.55,18.8,-11.78,2.68,0,plaster);box('east-plaster',.17,5.55,18.8,11.78,2.68,0,plaster);
 for(let x=-10.8;x<=10.8;x+=3.6){box('ceiling-beam',.34,.36,19,x,5.22,0,walnut);box('north-pier',.30,5.25,.28,x,2.6,9.31,stone);box('south-pier',.30,5.25,.28,x,2.6,-9.30,stone);}
 for(let z=-8;z<=8;z+=2.8){box('crossbeam',23.3,.21,.32,0,5.16,z,wood);box('west-pier',.25,4.1,.29,-11.54,2.15,z,stone);box('east-pier',.25,4.1,.29,11.54,2.15,z,stone);}
 for(const x of [-11.45,11.45])for(const z of [-6,-2,2,6]){box('wainscot',.08,1.28,2.4,x,.72,z,walnut);box('wainscot-cap',.13,.09,2.6,x,1.42,z,wood2);}
 for(const z of [-9.28,9.28])for(const x of [-9,-5,-1,3,7]){box('lower-panel',3.6,1.23,.08,x,.70,z,walnut);box('mid-rail',3.65,.10,.14,x,1.42,z,wood2);}
 // Walnut floor with individual seams, scuffs and restrained specular response.
 const floor=scene.getMeshByName('floor');if(floor){floor.material=wood;floor.position.y=-.24;}
 for(let z=-8.9;z<=8.9;z+=.83){const a=box('floor-board',23.48,.048,.80,0,-.079,z,Math.floor(z*2)%2?wood:wood2);a.material=mat('grain'+z,Math.floor(z*3)%3===0?'#514035':'#59483b',0,.93);}
 for(let x=-10.8;x<=10.8;x+=4.1)box('board-seam',.013,.009,17.9,x,-.054,0,walnut);
 // Deep bookshelves as fitted furniture, pushed against the walls.
 function bookshelf(x,z,alongZ,seed){const root=new B.TransformNode('v9-bookshelf-'+seed,scene);root.position.set(x,0,z);root.rotation.y=alongZ?Math.PI/2:0;
  box('shelf-base',2.65,.14,.56,0,.13,0,walnut,root);box('shelf-back',2.65,4.10,.12,0,2.13,.29,walnut,root);
  for(const sx of [-1.29,1.29])box('shelf-pillar',.13,4.1,.57,sx,2.14,0,wood,root);
  let c=seed*91+4;const rand=()=>{c=(c*16807)%2147483647;return c/2147483647};
  for(let layer=0;layer<5;layer++){let y=.41+layer*.77;box('shelf-layer',2.65,.12,.6,0,y,0,wood2,root);
   let px=-1.17;while(px<1.07){let w=.10+rand()*.06,h=.38+rand()*.18;let tint=bookPalette[Math.floor(rand()*bookPalette.length)];box('book',w,h,.35,px+w*.5,y+.07+h*.5,-.025,tint,root);if(rand()>.5)box('book-spine',.008,h-.10,.27,px+w*.5,y+.09+h*.5,-.21,brass,root);px+=w+.015;}
  }
  box('top-cornice',2.85,.19,.71,0,4.33,0,wood2,root);return root;
 }
 bookshelf(-9.95,6.9,false,1);bookshelf(-9.95,3.85,false,2);bookshelf(9.95,6.9,false,3);bookshelf(9.95,3.85,false,4);
 for(const x of [-9.95,9.95])for(const z of [3.85,6.9])obstacles.push({x,z,w:2.8,d:.75,tag:'v9-library-'+x+'-'+z});
 // Classical desk finish and period objects on existing working desks.
 for(const [x,z,w,d] of [[4.7,-3.3,3.5,1.7],[-8.0,-8.05,3.8,1.9],[5.4,4,3.4,1.8],[-6,5.6,3.5,1.7]]){
  box('desk-leather',w-.23,.012,d-.19,x,1.115,z,mat('leather-'+x,'#39463a',0,.83));
  for(const side of [-1,1])box('desk-edge',.08,.09,d,x+side*w*.48,1.052,z,brass);
  box('desk-front',w-.05,.23,.08,x,.77,z+d*.49,wood);
 }
 function lamp(x,z){let root=new B.TransformNode('v9-bankers-lamp',scene);root.position.set(x,0,z);
  cylinder('lamp-stand',.22,.08,0,1.21,0,brass,root);cylinder('lamp-column',.055,.55,0,1.53,0,brass,root);
  let shade=box('lamp-shade',.62,.17,.28,0,1.83,0,mat('enamel','#557266',.12,.48),root);shade.rotation.x=-.12;
  let glow=new B.PointLight('v9-lamp-warm',new B.Vector3(x,1.74,z),scene);glow.diffuse=B.Color3.FromHexString('#ffdbab');glow.intensity=.35;glow.range=3.2;
 }
 lamp(5.92,-3.05);lamp(-9.25,-7.89);lamp(-5.15,5.25);
 // Vintage desk research objects: telephone, notebooks, microscope, brass globe, camera.
 for(const [x,z] of [[-8.7,-7.75],[5.75,4.3]]){box('document-stack',.48,.12,.70,x,1.22,z,paper);box('folio',.61,.025,.80,x,1.30,z,wood2);}
 const phone=new B.TransformNode('v9-rotary-phone',scene);phone.position.set(-9.25,1.1,-8.53);
 box('phone-base',.40,.17,.31,0,.08,0,dark,phone);cylinder('dial',.19,.015,0,.18,-.015,brass,phone);
 let hand=box('phone-handset',.46,.095,.14,0,.26,0,dark,phone);hand.rotation.z=.07;
 const field=new B.TransformNode('v9-field-optics',scene);field.position.set(5.3,1.19,4.3);
 for(const x of [-.12,.12])cylinder('binocular-tube',.16,.36,x,.10,0,dark,field).rotation.x=Math.PI/2;
 box('binocular-bridge',.30,.11,.16,0,.10,-.02,brass,field);
 // A brass analog clock sits above one bookcase.
 const face=new B.DynamicTexture('v9-clockface',{width:512,height:512},scene,true);const c=face.getContext();c.fillStyle='#d5c4a2';c.beginPath();c.arc(256,256,240,0,Math.PI*2);c.fill();c.strokeStyle='#4f4234';c.lineWidth=12;c.stroke();for(let i=0;i<12;i++){let a=i*Math.PI/6;c.beginPath();c.moveTo(256+Math.sin(a)*198,256-Math.cos(a)*198);c.lineTo(256+Math.sin(a)*217,256-Math.cos(a)*217);c.lineWidth=6;c.stroke();}c.lineWidth=9;c.beginPath();c.moveTo(256,256);c.lineTo(256,125);c.moveTo(256,256);c.lineTo(360,272);c.stroke();face.update();
 const clock=B.MeshBuilder.CreatePlane('v9-antique-clock',{width:.9,height:.9},scene);clock.position.set(6.1,4.15,9.37);clock.material=new B.StandardMaterial('v9-clockmaterial',scene);clock.material.diffuseTexture=face;clock.material.backFaceCulling=false;
 // Warm wall-mounted lights (non-neon, not over-exposed).
 for(const x of [-8,-2,4,9]){let l=new B.PointLight('v9-candle-wall-light',new B.Vector3(x,3.5,8.65),scene);l.diffuse=B.Color3.FromHexString('#f1c99a');l.intensity=.48;l.range=5.5;box('sconce-base',.26,.36,.12,x,3.62,9.20,brass);sphere('opal-lamp',.24,x,3.65,9.11,cloth);}
 // Four photographic dossier frames on the west wall.
 // Prefer direct image textures on double-sided planes, in front of any frame geometry.
 // A drawn fallback is always present until the file has loaded.
 scene.meshes.filter(m=>/^v8-poster-|^v8-poster-frame-/.test(m.name))
   .forEach(m=>m.setEnabled(false));
 const gallery=[
   {title:'ARA MACAO',z:-7.2,file:'ara-macao.webp'},
   {title:'PANTHERA ONCA',z:-3.55,file:'panthera-onca.webp'},
   {title:'PODOCNEMIS EXPANSA',z:0,file:'podocnemis-expansa.webp'},
   {title:'PERSON OF INTEREST',z:3.56,file:'person-of-interest.webp'}
 ];
 function fallbackPoster(info,i){
   const fallback=new B.DynamicTexture('ayla-gallery-fallback-'+i,{width:512,height:704},scene,false);
   const ctx=fallback.getContext();
   ctx.fillStyle='#d6c5a1';ctx.fillRect(0,0,512,704);
   ctx.fillStyle='#28322a';ctx.fillRect(20,20,472,664);
   ctx.strokeStyle='#af9162';ctx.lineWidth=8;ctx.strokeRect(31,31,450,642);
   ctx.textAlign='center';ctx.fillStyle='#e9dec3';
   ctx.font='bold 22px Georgia';ctx.fillText('AYLA / INTELLIGENCE ARCHIVE',256,85);
   ctx.font='bold 31px Georgia';ctx.fillText(info.title,256,344);
   ctx.font='18px Georgia';ctx.fillText('FIELD REFERENCE / DOSSIER',256,390);
   fallback.hasAlpha=false;fallback.update(false);
   return fallback;
 }
 gallery.forEach((info,i)=>{
   const z=info.z;
   box('frame-'+i,.15,2.92,2.27,-11.53,2.72,z,wood);
   box('frame-gold-'+i,.024,2.75,2.13,-11.42,2.72,z,brass);
   const plane=B.MeshBuilder.CreatePlane('v9-archive-poster-'+i,{
     width:2.05,height:2.67,sideOrientation:B.Mesh.DOUBLESIDE
   },scene);
   // West wall faces the room at +X. Place the image ahead of the solid backing.
   plane.position.set(-11.245,2.72,z);
   plane.rotation.y=Math.PI/2;
   plane.isPickable=false;
   plane.alwaysSelectAsActiveMesh=true;
   plane.renderingGroupId=2;
   const m=new B.StandardMaterial('ayla-gallery-image-'+i,scene);
   m.backFaceCulling=false;
   m.twoSidedLighting=true;
   m.disableLighting=true;
   m.diffuseColor=new B.Color3(1,1,1);
   m.emissiveColor=new B.Color3(.85,.85,.85);
   m.specularColor=new B.Color3(0,0,0);
   const backup=fallbackPoster(info,i);
   m.diffuseTexture=backup;
   m.emissiveTexture=backup;
   plane.material=m;
   const url='assets/posters/'+info.file+'?v=1.5.3';
   const tex=new B.Texture(url,scene,false,true,B.Texture.TRILINEAR_SAMPLINGMODE,
     ()=>{
       if(plane.isDisposed())return;
       tex.wrapU=B.Texture.CLAMP_ADDRESSMODE;
       tex.wrapV=B.Texture.CLAMP_ADDRESSMODE;
       // Mirror U on west-facing panels to correct the reversed text in the rendered room.
       tex.uScale=-1;tex.uOffset=1;
       tex.vScale=1;tex.vOffset=0;
       tex.hasAlpha=false;
       m.diffuseTexture=tex;
       m.emissiveTexture=tex;
       m.markAsDirty(B.Material.TextureDirtyFlag);
       backup.dispose();
       console.info('[AYLA] Gallery image ready:',info.file);
     },
     (message,error)=>{
       console.warn('[AYLA] Gallery image load failed:',info.file,message||error);
     }
   );
 });
 // Fix logo reflection seen in the previous version.
 const rug=scene.getMeshByName('v8-observatory-rug');if(rug?.material?.diffuseTexture){rug.material.diffuseTexture.uScale=-1;rug.material.diffuseTexture.uOffset=1;}
 // Subtle antique workroom ventilation/hum: lighting only, no flashing effects.
 return {objects,obstacles};
}
window[BNAME]={install};
})();