/* AYLA 0.5: free native Babylon.js character enhancement.
 * Wraps the v0.4 rig: textile microtextures, natural facial detail and contextual gestures.
 * No external assets, subscriptions, paid generators or analytics.
 */
(function () {
  'use strict';
  const prior = window.AYLACharacterFactory;
  if (!prior || typeof prior.create !== 'function') return;

  function enhance(B, scene, cfg) {
    const actor = prior.create(B, scene, cfg);
    const winston = !!cfg.isWinston;
    const name = cfg.name || (winston ? 'Winston' : 'Ayla');
    const root = actor.root;
    const head = actor.headPivot;
    const meshes = root.getChildMeshes(false);
    const matCache = {};
    const textureTargets = /:(?:skin|coat|coatLight|coatDark|shirt|shirtShade|pants|pantsLight|pack|straps|boots|sole)$/;

    function microtexture(material, category) {
      if (!B.DynamicTexture || !material || material.albedoTexture) return;
      // Neutral light texture: PBR albedoColor remains the actual material color.
      const size = category === 'skin' ? 128 : 192;
      const texture = new B.DynamicTexture(name + '-' + category + '-weave', {width:size,height:size}, scene, false);
      const ctx = texture.getContext();
      if (!ctx || typeof ctx.createImageData !== 'function') return;
      const data = ctx.createImageData(size, size);
      const seed = name.length * 131 + category.length * 47;
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          // Repeatable fine grain without Math.random or downloads.
          const noise = Math.sin((x * 127.1 + y * 311.7 + seed) * .318)*43758.5453;
          const grain = noise - Math.floor(noise);
          const weave = category === 'skin' ? 0 : ((x % 5 === 0 ? 3 : 0) + (y % 7 === 0 ? 2 : 0));
          const dirt = category === 'boots' ? 10 : 0;
          const base = Math.max(207, Math.min(255, 244 + (grain - .5) * (category === 'skin' ? 9 : 19) - weave - dirt));
          const p = (y * size + x) * 4;
          data.data[p] = base;
          data.data[p+1] = Math.max(0, base - (category === 'skin' ? 2 : 1));
          data.data[p+2] = Math.max(0, base - (category === 'boots' ? 8 : 0));
          data.data[p+3] = 255;
        }
      }
      ctx.putImageData(data,0,0);
      texture.update(false);
      material.albedoTexture = texture;
      material.roughness = category === 'boots' ? .89 : (category === 'skin' ? .72 : .95);
      material.metallic = 0;
    }
    // Material reuse: only one generated map per PBR material per character.
    for (const mesh of meshes) {
      const mat = mesh.material;
      if (!mat || typeof mat.name !== 'string' || !textureTargets.test(mat.name)) continue;
      if (matCache[mat.name]) continue;
      matCache[mat.name] = true;
      const cat = mat.name.split(':')[1];
      microtexture(mat, cat);
    }

    function material(short,color,roughness) {
      const m = new B.PBRMaterial(name+'-v5-'+short,scene);
      m.albedoColor = B.Color3.FromHexString(color);
      m.roughness = roughness == null ? .8 : roughness;
      m.metallic = .02;
      return m;
    }
    const skin = material('highlight',winston?'#b98c75':'#c78d76',.77);
    const shadow = material('contour',winston?'#876957':'#9a6254',.94);
    const hair = material('hair',winston?'#888782':'#201c1c',.91);
    const lighterHair = material('hair-hi',winston?'#aaa8a0':'#3e302c',.9);
    const seam = material('thread',winston?'#64716e':'#658275',.96);
    const brass = material('metal','#848c7f',.42);
    const fabric = material('webbing',winston?'#4b5851':'#4a5b51',.98);
    const eyelid = material('lid',winston?'#aa7962':'#bb8168',.79);

    function ball(label, parent, pos, scale, mat, detail) {
      const mesh=B.MeshBuilder.CreateSphere(name+'-v5-'+label,{diameter:1,segments:detail||12},scene);
      mesh.parent=parent;
      mesh.position.set(pos[0],pos[1],pos[2]);
      mesh.scaling.set(scale[0],scale[1],scale[2]);
      mesh.material=mat;
      mesh.isPickable=false;
      return mesh;
    }
    function box(label,parent,pos,size,mat) {
      const mesh=B.MeshBuilder.CreateBox(name+'-v5-'+label,{width:size[0],height:size[1],depth:size[2]},scene);
      mesh.parent=parent;
      mesh.position.set(pos[0],pos[1],pos[2]);mesh.material=mat;mesh.isPickable=false;
      return mesh;
    }
    function line(label,parent,points,radius,mat){
      const mesh=B.MeshBuilder.CreateTube(name+'-v5-'+label,{path:points.map(p=>new B.Vector3(p[0],p[1],p[2])),radius:radius,tessellation:6,cap:B.Mesh.CAP_ALL},scene);
      mesh.parent=parent;mesh.material=mat;mesh.isPickable=false;return mesh;
    }
    // The head rig origin is at y=2.055, so offsets below are head-local.
    if (head) {
      for (const side of [-1,1]) {
        const x=side*.094;
        // Soft upper and lower eyelid contours: less toy-like than exposed eye spheres.
        line('upper-lid-'+side,head,[[x-side*.062,.283,-.213],[x,.303,-.239],[x+side*.060,.280,-.215]],.009,eyelid);
        line('lower-lid-'+side,head,[[x-side*.060,.262,-.219],[x,.253,-.235],[x+side*.060,.262,-.217]],.005,shadow);
        ball('under-eye-'+side,head,[x,.213,-.187],[.078,.010,.012],skin,12);
        // Additional hair strands (thin and asymmetrical) break the plastic helmet silhouette.
        for(let i=0;i<5;i++) {
          const bx=side*(.148+i*.015);
          line('hairline-'+side+'-'+i,head,[[bx,.47,-.09],[bx+side*.026,.41,-.172],[bx+side*.010,.35-i*.006,-.198]],.0055,i%2?hair:lighterHair);
        }
      }
      line('nose-profile',head,[[0,.333,-.225],[0,.248,-.268],[0,.182,-.296]],.011,skin);
      // Side-specific tiny skin marks and asymmetry keep the face natural at close camera range.
      ball('beauty-mark',head,winston?[-.124,.108,-.205]:[.144,.137,-.214],[.008,.005,.003],shadow,10);
      if (winston) {
        for (const side of [-1,1]) {
          for(let i=0;i<4;i++){
            line('beard-strand-'+side+'-'+i,head,[[side*(.042+i*.031),.132,-.243],[side*(.044+i*.030),.090,-.225]],.003,i%2?hair:lighterHair);
          }
          for(let i=0;i<2;i++){
            line('crow-feet-'+side+'-'+i,head,[[side*.174,.294-i*.024,-.198],[side*.206,.31-i*.028,-.179]],.003,shadow);
          }
        }
      } else {
        for (const side of [-1,1]) {
          line('temple-flyaway-'+side,head,[[side*.214,.406,-.115],[side*.238,.298,-.157],[side*.235,.183,-.162]],.0045,hair);
        }
      }
    }

    // Garment construction: piping, seams, equipment clips and worn-in fieldwear details.
    line('outer-zipper',root,[[0,1.83,-.273],[.012,1.58,-.275],[.008,1.34,-.250]],.009,brass);
    for (const side of [-1,1]) {
      line('jacket-side-seam-'+side,root,[[side*.36,1.74,-.082],[side*.30,1.44,-.175],[side*.25,1.10,-.194]],.006,seam);
      for(let i=0;i<3;i++){
        box('pocket-stitch-'+side+'-'+i,root,[side*.226,1.615-i*.025,-.266],[.12,.004,.008],seam);
      }
      box('bag-chest-strap-'+side,root,[side*.302,1.35,.175],[.075,.045,.34],fabric);
      ball('strap-clip-'+side,root,[side*.295,1.37,.33],[.05,.055,.03],brass,10);
    }
    // Localized dust scuffs on boots, not a full dirt overlay.
    for(let side of [-1,1]){
      const leg=actor.legs && actor.legs[side===-1?0:1];
      const knee=actor.knees && actor.knees[side===-1?0:1];
      if (!leg || !knee) continue;
      for(let j=0;j<3;j++){
        ball('boot-scrape-'+side+'-'+j,knee,[(j-1)*.077,-.57,-.272],[.025,.011,.003],seam,8);
      }
    }

    // Dialogue and object interaction states share the existing animated armature.
    const baseAnimate=actor.animate;
    let interaction='idle';
    let expression='neutral';
    let motion=0;
    const mix=(a,b,dt,k)=>a+(b-a)*(1-Math.exp(-Math.min(dt,.06)*k));
    actor.setInteraction=function(next){
      interaction=next||'idle';
      expression=next==='winston'?'listening':next==='terminal'?'focused':'neutral';
    };
    actor.animate=function(dt,moving,sprint,time){
      baseAnimate(dt,moving,sprint,time);
      const t=(time||0)*.001;
      const active=!moving && interaction!=='idle';
      motion=mix(motion,active?1:0,dt,4.8);
      let left=0,right=0;
      switch(interaction){
        case 'terminal': left=.99; right=1.09; break;
        case 'report': left=.58; right=.91; break;
        case 'map': left=.13; right=.89; break;
        case 'board': left=.34; right=.77; break;
        case 'winston': left=.10; right=.29; break;
      }
      if (actor.arms && actor.arms.length>=2){
        actor.arms[0].rotation.x=mix(actor.arms[0].rotation.x,left*motion+Math.sin(t*2.8)*.02*motion,dt,7);
        actor.arms[1].rotation.x=mix(actor.arms[1].rotation.x,right*motion+Math.sin(t*3.5)*.025*motion,dt,7);
        if (interaction==='map'||interaction==='board'){
          actor.arms[1].rotation.z=mix(actor.arms[1].rotation.z,-.28*motion,dt,6);
        }
      }
      if (head){
        let pitch=0,yaw=0;
        if(interaction==='terminal'){pitch=.12;yaw=-.05;}
        if(interaction==='map'||interaction==='board'){pitch=-.08;yaw=.07;}
        if(interaction==='report'){pitch=.15;yaw=0;}
        if(interaction==='winston'){pitch=-.035;yaw=.12;}
        head.rotation.x=mix(head.rotation.x,head.rotation.x*(1-motion)+pitch*motion,dt,5);
        head.rotation.y=mix(head.rotation.y,head.rotation.y*(1-motion)+yaw*motion,dt,5);
      }
    };
    actor.expression=()=>expression;
    actor.fidelity='0.5';
    return actor;
  }
  window.AYLACharacterFactory={create:enhance,version:'0.5',kind:'free-native-babylon-textured-actors'};
})();