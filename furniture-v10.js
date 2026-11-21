/* AYLA 1.0 — Furniture quality pass only.
 * Detailed procedural period furniture, same footprints and furniture placement.
 * No changes to gameplay, NPCs, architecture, language or camera.
 * Standalone wrapper: install after vintage-v9.js and before game.js.
 */
(function () {
  'use strict';
  const previous=window.AYLAVintageV9;
  if(!previous||typeof previous.install!=='function')return;
  const originalInstall=previous.install;
  previous.install=function(B,scene){
    const result=originalInstall(B,scene);
    const furniture=[];
    const palette={};
    function color(hex){return B.Color3.FromHexString(hex)}
    function pbr(name,hex,rough=.6,metal=0){
      const m=new B.PBRMaterial('f10-'+name,scene);
      m.albedoColor=color(hex);m.roughness=rough;m.metallic=metal;
      return m;
    }
    function woodTexture(name,base,light,dark,seed){
      const tex=new B.DynamicTexture('f10-wood-'+name,{width:512,height:512},scene,true);
      const ctx=tex.getContext();
      let r=seed;const random=()=>{r=(r*1664525+1013904223)>>>0;return r/4294967296};
      ctx.fillStyle=base;ctx.fillRect(0,0,512,512);
      for(let i=0;i<340;i++){
        const y=random()*512,slope=(random()-.5)*15;
        ctx.strokeStyle=i%3===0?light:dark;
        ctx.globalAlpha=.045+random()*.12;
        ctx.lineWidth=.4+random()*2.0;
        ctx.beginPath();ctx.moveTo(-10,y);
        for(let x=0;x<=530;x+=18){
          const yy=y+Math.sin(x*.013+i*.27)*(1.2+random()*2)+slope*x/512;
          ctx.lineTo(x,yy);
        }
        ctx.stroke();
      }
      ctx.globalAlpha=.10;
      for(let i=0;i<25;i++){
        let cx=random()*512,cy=random()*512,rx=3+random()*10,ry=18+random()*42;
        ctx.strokeStyle=i%2?dark:light;ctx.lineWidth=.9;
        ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,(random()-.5)*.2,0,Math.PI*2);ctx.stroke();
      }
      ctx.globalAlpha=1;tex.update();
      tex.uScale=2.0;tex.vScale=1.25;
      const m=pbr(name,'#ffffff',.57);
      m.albedoTexture=tex;return m;
    }
    const walnut=woodTexture('aged-walnut','#654b3c','#c3a27b','#20120d',41);
    const walnutDark=woodTexture('dark-oak','#3a2924','#ab8773','#130b09',84);
    const walnutLight=woodTexture('edge-grain','#8b6650','#e3b98b','#322018',53);
    const leather=pbr('oiled-olive-leather','#475348',.83);
    const leatherSeam=pbr('leather-piping','#283a32',.79);
    const velvet=pbr('worn-fabric','#5b5545',.94);
    const antiqueBrass=pbr('antique-brass','#a78a5a',.37,.83);
    const brassShadow=pbr('aged-brass-shadow','#63513a',.55,.7);
    const iron=pbr('dark-cast-iron','#303737',.64,.72);
    const cloth=pbr('felt-desk-pad','#475246',.92);
    const paper=pbr('aged-paper','#d0c3a6',.9);
    const bookCovers=['#5b3e31','#425a54','#6c523e','#344747','#6a4440','#746a4a','#344b3f'].map((v,i)=>pbr('bookbinding-'+i,v,.88));
    function meshBox(name,w,h,d,x,y,z,mat,parent){
      const a=B.MeshBuilder.CreateBox('f10-'+name,{width:w,height:h,depth:d},scene);
      a.position.set(x,y,z);a.material=mat;if(parent)a.parent=parent;
      a.isPickable=false;furniture.push(a);return a;
    }
    function cylinder(name,diam,height,x,y,z,mat,parent,topDiameter){
      const opts={diameter:diam,height,tessellation:16};
      if(topDiameter!==undefined){opts.diameterTop=topDiameter;opts.diameterBottom=diam;delete opts.diameter}
      const a=B.MeshBuilder.CreateCylinder('f10-'+name,opts,scene);
      a.position.set(x,y,z);a.material=mat;if(parent)a.parent=parent;a.isPickable=false;furniture.push(a);return a;
    }
    function orb(name,diam,x,y,z,scale,mat,parent){
      const a=B.MeshBuilder.CreateSphere('f10-'+name,{diameter:diam,segments:18},scene);
      a.position.set(x,y,z);a.scaling.set(scale[0],scale[1],scale[2]);
      a.material=mat;if(parent)a.parent=parent;a.isPickable=false;furniture.push(a);return a;
    }
    function torus(name,diam,tube,x,y,z,material,parent){
      const a=B.MeshBuilder.CreateTorus('f10-'+name,{diameter:diam,thickness:tube,tessellation:22},scene);
      a.position.set(x,y,z);a.material=material;if(parent)a.parent=parent;a.isPickable=false;furniture.push(a);return a;
    }
    // Hide *only* legacy furniture meshes, leaving screens, documents and
    // workstations exactly where they already exist.
    const oldMeshes=new Set(['deskTop','deskLeg','chairBase','chairPole','seat','backrest','caster',
      'cabinet','cabinetDrawer','cabinetHandle','v9-desk-leather','v9-desk-edge','v9-desk-front',
      'v9-lamp-stand','v9-lamp-column','v9-lamp-shade']);
    scene.meshes.forEach(a=>{if(oldMeshes.has(a.name))a.setEnabled(false)});
    scene.transformNodes.filter(n=>n.name.indexOf('v9-bookshelf-')===0)
      .forEach(n=>n.setEnabled(false));
    function handle(root,x,y,z){
      meshBox('brass-handle-plaque',.32,.105,.027,x,y,z,brassShadow,root);
      const ring=torus('drawer-ring',.17,.025,x,y,z+.029,antiqueBrass,root);
      ring.scaling.y=.79;
      cylinder('handle-pin',.042,.055,x,y,z+.025,antiqueBrass,root).rotation.x=Math.PI/2;
    }
    function turnedLeg(root,x,z){
      cylinder('turned-leg-upper',.15,.48,x,.72,z,walnutDark,root,.17);
      cylinder('turned-leg-bead',.21,.095,x,.51,z,walnutLight,root);
      cylinder('turned-leg-lower',.13,.33,x,.30,z,walnutDark,root,.17);
      cylinder('turned-leg-collar',.175,.075,x,.14,z,antiqueBrass,root);
      cylinder('turned-foot',.155,.09,x,.075,z,walnutDark,root);
    }
    function desk(x,z,w,d,index){
      const root=new B.TransformNode('f10-solid-walnut-desk-'+index,scene);
      root.position.set(x,0,z);
      // Original desk surface was y=1.10. Keep objects resting on top.
      meshBox('desktop-core',w-.035,.10,d-.035,0,1.028,0,walnut,root);
      meshBox('desktop-top-veneer',w+.065,.026,d+.065,0,1.089,0,walnutLight,root);
      meshBox('beveled-top-upper',w+.025,.023,d+.025,0,1.069,0,walnutDark,root);
      for(const sx of [-1,1]){
        meshBox('routed-edge-side',.028,.055,d+.056,sx*w*.505,1.038,0,walnutLight,root);
      }
      for(const sz of [-1,1]){
        meshBox('routed-edge-front',w+.06,.055,.027,0,1.038,sz*d*.505,walnutLight,root);
      }
      const footX=w/2-.17,footZ=d/2-.15;
      for(const sx of [-1,1])for(const sz of [-1,1])turnedLeg(root,sx*footX,sz*footZ);
      // A knee opening remains in the middle, with drawers either side.
      const sideW=Math.min(.76,(w-1.25)/2);
      for(const sx of [-1,1]){
        const px=sx*(w/2-sideW/2-.11);
        meshBox('desk-drawer-carcass',sideW,.42,d-.19,px,.78,0,walnutDark,root);
        for(let row=0;row<2;row++){
          const yy=.91-row*.19;
          meshBox('walnut-drawer-face',sideW-.08,.17,.04,px,yy,d/2-.075,walnut,root);
          meshBox('drawer-top-inlay',sideW-.17,.009,.045,px,yy+.064,d/2-.048,walnutLight,root);
          handle(root,px,yy,d/2-.045);
        }
      }
      meshBox('back-apron',w-.22,.24,.065,0,.846,-d/2+.12,walnutDark,root);
      meshBox('front-knee-apron',w-2*sideW-.18,.13,.065,0,.915,d/2-.11,walnut,root);
      const pad=meshBox('green-blotter',w*.42,.009,d*.57,0,1.109,.02,cloth,root);
      pad.isPickable=false;
      for(let sy of [-1,1])meshBox('desk-blotter-edge',w*.41,.012,.02,0,1.118,sy*d*.285,leatherSeam,root);
      return root;
    }
    const desks=[
      [4.7,-3.3,3.5,1.7,'osint'],
      [-.4,-6.4,3.8,1.9,'case-dossier'],
      [5.4,4.0,3.4,1.8,'evidence'],
      [-6,5.6,3.5,1.7,'archive']
    ];
    desks.forEach(d=>desk(...d));
    function swivelChair(x,z,rotation,index){
      const root=new B.TransformNode('f10-leather-chair-'+index,scene);
      root.position.set(x,0,z);root.rotation.y=rotation;
      // Same seat center and back direction as the existing interactive chair.
      for(let i=0;i<5;i++){
        const a=2*Math.PI*i/5;
        let spoke=meshBox('cast-iron-swivel-foot',.47,.045,.095,Math.cos(a)*.19,.12,Math.sin(a)*.19,iron,root);
        spoke.rotation.y=-a;
        orb('caster',.17,Math.cos(a)*.38,.09,Math.sin(a)*.38,[1,.7,.7],iron,root);
      }
      cylinder('swivel-pedestal',.13,.56,0,.48,0,iron,root);
      cylinder('seat-mount',.37,.08,0,.76,0,antiqueBrass,root);
      meshBox('seat-pan',.69,.115,.61,0,.84,0,walnutDark,root);
      orb('rounded-leather-cushion',.72,0,.92,-.015,[1,.20,.81],leather,root);
      for(const side of [-1,1]){
        meshBox('chair-side-rail',.06,.08,.55,side*.35,.92,.01,walnut,root);
        meshBox('carved-arm-post',.075,.41,.074,side*.37,1.06,.13,walnutLight,root);
        meshBox('armrest',.115,.065,.60,side*.37,1.26,.10,walnut,root);
        meshBox('leather-arm-padding',.13,.024,.45,side*.37,1.305,.07,leather,root);
        cylinder('back-side-spindle',.055,.83,side*.30,1.46,.285,walnutLight,root);
      }
      meshBox('backrest-shell',.67,.70,.12,0,1.50,.30,walnutDark,root);
      orb('curved-leather-back',.68,0,1.50,.22,[.98,1.13,.23],leather,root);
      meshBox('headrest-rail',.76,.10,.16,0,1.84,.29,walnutLight,root);
      for(let i=-2;i<=2;i++){
        orb('upholstery-stud',.026,i*.12,1.18,.26,[1,1,.5],antiqueBrass,root);
      }
      return root;
    }
    [[4.65,-1.7,0,'terminal-1'],[5.8,-1.6,0,'terminal-2'],[-.4,-4.65,Math.PI,'dossier'],[5.4,2.4,Math.PI,'evidence']].forEach(v=>swivelChair(...v));
    // Four bookcases are upgraded in place: fluted pilasters, cornices,
    // deeper shelves and fewer, more readable books.
    function shelf(x,z,index){
      const root=new B.TransformNode('f10-cabinetmaker-bookcase-'+index,scene);
      root.position.set(x,0,z);
      const w=2.65,h=4.32;
      meshBox('solid-back',w-.08,4.06,.13,0,2.13,.27,walnutDark,root);
      for(const sx of [-1,1]){
        meshBox('carved-upright',.16,4.05,.67,sx*1.28,2.11,0,walnut,root);
        for(let q=0;q<3;q++)meshBox('vertical-fluting',.017,3.95,.045,sx*(1.24-q*.045),2.1,-.32,walnutLight,root);
      }
      meshBox('kick-plinth',w+.12,.20,.74,0,.12,0,walnutDark,root);
      meshBox('plinth-moulding',w+.20,.055,.77,0,.22,0,walnutLight,root);
      for(let layer=0;layer<5;layer++){
        let y=.51+layer*.72;
        meshBox('shelf-solid',w-.17,.085,.62,0,y,0,walnut,root);
        meshBox('shelf-lip',w-.17,.045,.040,0,y+.001,-.32,walnutLight,root);
        let offset=-1.13, k=0;
        while(offset<1.05){
          let bw=.105+(((k*37+index*13)%7)*.008),bh=.38+(((k*5+layer*7+index)%8)*.023);
          const mid=offset+bw/2;
          const material=bookCovers[(k+index*3+layer)%bookCovers.length];
          meshBox('hardbound-volume',bw,bh,.37,mid,y+.05+bh/2,-.035,material,root);
          if(k%3===0){
            meshBox('gold-foil-label',bw*.67,.018,.008,mid,y+.09+bh*.46,-.228,antiqueBrass,root);
            meshBox('book-gilt-band',bw*.67,.011,.009,mid,y+.09+bh*.32,-.228,brassShadow,root);
          }
          offset+=bw+.025;k++;
        }
      }
      for(let c=0;c<3;c++){
        meshBox('tiered-crown',w+.18+c*.12,.075,.72+c*.035,0,4.15+c*.07,0,c%2?walnutLight:walnut,root);
      }
      return root;
    }
    [[-9.95,6.9,1],[-9.95,3.85,2],[9.95,6.9,3],[9.95,3.85,4]]
      .forEach(a=>shelf(...a));
    // Replace the boxy filing cabinet while keeping its location and size.
    function filingCabinet(){
      const root=new B.TransformNode('f10-oak-filing-cabinet',scene);
      root.position.set(-9.55,0,2.0);
      meshBox('cabinet-carcass',2.2,1.66,.77,0,.89,0,walnutDark,root);
      for(const sx of [-1,1]){
        meshBox('cabinet-end-panel',.115,1.62,.81,sx*1.045,.89,0,walnut,root);
        meshBox('inset-panel',.026,1.34,.58,sx*1.110,.91,0,walnutLight,root);
      }
      meshBox('cabinet-solid-top',2.39,.105,.92,0,1.755,0,walnutLight,root);
      meshBox('cabinet-top-trim',2.27,.055,.84,0,1.683,0,walnutDark,root);
      for(let j=0;j<3;j++){
        const y=.45+j*.47;
        meshBox('cabinet-drawer',1.91,.37,.07,0,y,-.402,walnut,root);
        meshBox('drawer-inlay',1.72,.25,.026,0,y,-.451,walnutDark,root);
        meshBox('drawer-rim',1.78,.012,.018,0,y+.155,-.46,walnutLight,root);
        handle(root,0,y,-.477);
      }
      for(const sx of [-1,1]){
        meshBox('cabinet-foot',.18,.17,.72,sx*.98,.105,0,walnutDark,root);
      }
    }
    filingCabinet();
    // Upgrade the bankers' lamps without disturbing the existing lights.
    function lamp(x,z,index){
      const root=new B.TransformNode('f10-bankers-lamp-'+index,scene);
      root.position.set(x,0,z);
      orb('heavy-brass-base',.25,0,1.19,0,[1,.24,.78],antiqueBrass,root);
      cylinder('recessed-foot',.16,.10,0,1.27,0,brassShadow,root);
      cylinder('polished-stem',.057,.47,0,1.53,0,antiqueBrass,root);
      let hood=orb('opal-green-glass-shade',.66,0,1.83,0,[1,.26,.48],leather,root);
      meshBox('lampshade-fine-rim',.65,.027,.35,0,1.75,0,antiqueBrass,root);
      cylinder('shade-cap',.066,.07,0,1.95,0,antiqueBrass,root);
    }
    [[5.92,-3.05,1],[-1.65,-6.24,2],[-5.15,5.25,3]].forEach(v=>lamp(...v));
    // Existing collision footprints and interaction coordinates are unchanged;
    // the cabinet's solid volume is the only extra blocked footprint.
    result.obstacles.push({x:-9.55,z:2.0,w:2.33,d:.88,tag:'f10-filing-cabinet'});
    return result;
  };
})();
