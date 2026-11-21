/* AYLA 0.3 | Procedural 3D characters. Original geometry, free to distribute.
   Detailed native Babylon.js meshes; no paid model or external model API. */
(function () {
  'use strict';
  function createCharacter(B, scene, cfg) {
    const isW = !!cfg.isWinston;
    const name = cfg.name || (isW ? 'Winston' : 'Ayla');
    const root = new B.TransformNode(name + '-rig', scene);
    root.position.set(cfg.x || 0, 0, cfg.z || 0);
    const mats = Object.create(null);
    function material(n, color, rough) {
      const key = n + color;
      if (mats[key]) return mats[key];
      const m = new B.PBRMaterial(name + ':' + n, scene);
      m.albedoColor = B.Color3.FromHexString(color);
      m.metallic = 0;
      m.roughness = rough == null ? .88 : rough;
      mats[key] = m;
      return m;
    }
    const C = isW ? {
      skin:'#aa7962', skinShadow:'#90634f', lip:'#865e51', eye:'#e3e0d2', iris:'#655849',
      hair:'#6e6c68', hairDeep:'#3c3d3c', beard:'#898783',
      coat:'#303d44', coatLight:'#42535a', coatDark:'#1f3038',
      shirt:'#898472', shirtShade:'#76705e', pants:'#292d33', pantsLight:'#383c41',
      pack:'#555144', straps:'#676257', boots:'#36312b', bootSole:'#1b1e1d', trim:'#83765e'
    } : {
      skin:'#bb8168', skinShadow:'#995e4e', lip:'#925f56', eye:'#f3e8db', iris:'#6f5140',
      hair:'#29211f', hairDeep:'#151516', beard:'#322a28',
      coat:'#27403e', coatLight:'#35524a', coatDark:'#1b3233',
      shirt:'#6c7568', shirtShade:'#495c50', pants:'#292c2f', pantsLight:'#3a3c3d',
      pack:'#646352', straps:'#686b5c', boots:'#39342c', bootSole:'#1d2222', trim:'#6e6653'
    };
    const skin=material('skin',C.skin),skinShadow=material('skinShadow',C.skinShadow);
    const hair=material('hair',C.hair),deepHair=material('deepHair',C.hairDeep),beard=material('beard',C.beard);
    const coat=material('coat',C.coat),coatLight=material('coatLight',C.coatLight),coatDark=material('coatDark',C.coatDark);
    const shirt=material('shirt',C.shirt),shirtShade=material('shirtShade',C.shirtShade);
    const pants=material('pants',C.pants),pantsLight=material('pantsLight',C.pantsLight);
    const pack=material('pack',C.pack),straps=material('straps',C.straps);
    const boots=material('boots',C.boots),sole=material('sole',C.bootSole);
    const trim=material('trim',C.trim),stitch=material('stitch','#8d9381');
    const black=material('black','#151a1b'),white=material('white',C.eye),iris=material('iris',C.iris,.26);
    const lip=material('lips',C.lip,.77),metal=material('metal','#8b9995',.32);
    const idGreen=material('idGreen','#abc18b',.5),skinGlint=material('skinGlint','#d9a78b',.8);
    function ball(n, x,y,z, sx,sy,sz, mat,parent, segments) {
      const o=B.MeshBuilder.CreateSphere(name+'-'+n,{segments:segments||18,diameter:1},scene);
      o.position.set(x,y,z);o.scaling.set(sx,sy,sz);o.material=mat;o.parent=parent||root;return o;
    }
    function box(n, x,y,z, sx,sy,sz,mat,parent){
      const o=B.MeshBuilder.CreateBox(name+'-'+n,{width:sx,height:sy,depth:sz},scene);
      o.position.set(x,y,z);o.material=mat;o.parent=parent||root;return o;
    }
    function cyl(n, x,y,z, h, top, bottom, mat,parent, sides){
      const o=B.MeshBuilder.CreateCylinder(name+'-'+n,{height:h,diameterTop:top,diameterBottom:bottom,tessellation:sides||14},scene);
      o.position.set(x,y,z);o.material=mat;o.parent=parent||root;return o;
    }
    function rotated(o,x,y,z){o.rotation.set(x||0,y||0,z||0);return o;}
    function pathTube(n,pts,r,mat,parent){
      const mesh=B.MeshBuilder.CreateTube(name+'-'+n,{path:pts.map(p=>new B.Vector3(...p)),radius:r,tessellation:6,cap:B.Mesh.CAP_ALL},scene);
      mesh.material=mat;mesh.parent=parent||root;return mesh;
    }
    function surface(n,rings,mat,parent){
      const verts=[],normals=[],uvs=[],idx=[];
      const steps=22;
      for(let k=0;k<rings.length;k++){
        const r=rings[k];
        for(let i=0;i<steps;i++){
          const a=2*Math.PI*i/steps;
          verts.push(Math.cos(a)*r[1]+(r[4]||0),r[0],Math.sin(a)*r[2]+(r[3]||0));
          uvs.push(i/(steps-1),k/(rings.length-1));
        }
      }
      for(let k=0;k<rings.length-1;k++)for(let i=0;i<steps;i++){
        const ni=(i+1)%steps, a=k*steps+i,b=k*steps+ni,c=(k+1)*steps+i,d=(k+1)*steps+ni;
        idx.push(a,c,b,b,c,d);
      }
      B.VertexData.ComputeNormals(verts,idx,normals);
      const data=new B.VertexData();data.positions=verts;data.normals=normals;data.indices=idx;data.uvs=uvs;
      const mesh=new B.Mesh(name+'-'+n,scene);data.applyToMesh(mesh);mesh.material=mat;mesh.parent=parent||root;mesh.isPickable=false;
      return mesh;
    }
    // Torso follows natural tapered jacket contour; an inner shirt remains visible at the front.
    surface('jacketBody',[
      [.94,.235,.16,-.005],[1.15,.30,.205,0],[1.42,.32,.215,0],[1.68,.39,.23,0],
      [1.79,.47,.235,0],[1.92,.355,.185,0],[2.01,.195,.148,0]
    ],coat);
    surface('undershirt',[[1.36,.24,.167,-.067],[1.60,.29,.185,-.068],[1.78,.31,.175,-.071],[1.95,.18,.132,-.07],[2.06,.125,.11,-.07]],shirt);
    // Functional lapels, front seam, pockets, zipper and epaulettes.
    for(const side of [-1,1]){
      rotated(box('jacketLapel',side*.135,1.85,-.235,.118,.32,.036,coatLight),0,0,side*.31);
      box('chestPocket',side*.24,1.58,-.228,.19,.17,.038,coatDark);
      box('pocketFlap',side*.24,1.675,-.245,.205,.045,.048,coatLight);
      box('lowerPocket',side*.185,1.16,-.220,.23,.185,.052,coatDark);
      box('lowerPocketFlap',side*.185,1.26,-.257,.24,.043,.036,coatLight);
      for(let b=0;b<2;b++) ball('button',side*.236,1.63+b*.075,-.263,.014,.014,.006,metal);
      rotated(box('epaulette',side*.41,1.91,0,.25,.045,.10,coatDark),0,0,-side*.26);
    }
    box('frontZipper',0,1.50,-.259,.014,.62,.012,metal);
    cyl('collarNeck',0,2.035,-.008,.18,.28,.28,shirtShade);
    for(let side of [-1,1])rotated(box('shirtCollar',side*.12,2.01,-.14,.145,.15,.035,shirt),0,side*.22,side*.31);
    // Padded small backpack with multilayer pockets and shoulder straps.
    ball('backpack',0,1.42,.315,.355,.55,.18,pack);
    ball('backpackCap',0,1.78,.39,.31,.17,.12,straps);
    box('backpackPocket',0,1.27,.492,.43,.28,.085,straps);
    box('backpackPocketBand',0,1.36,.537,.43,.03,.035,trim);
    box('backpackClosure',0,1.75,.497,.055,.14,.02,metal);
    for(const side of [-1,1]){
      pathTube('shoulderStrap',[[side*.27,1.89,-.19],[side*.37,1.79,-.13],[side*.36,1.40,.08],[side*.25,1.28,.28]],.05,straps);
      box('waistStrap',side*.295,1.18,.24,.045,.06,.34,trim);
    }
    // Hips + cargo trousers separate from coat.
    surface('hips',[[.79,.27,.20],[.95,.30,.21],[1.07,.276,.19]],pants);
    box('beltFront',0,1.02,-.215,.49,.065,.025,sole);
    box('beltBuckle',0,1.02,-.237,.07,.075,.026,metal);
    const leftRight=[-1,1],armPivots=[],legPivots=[];
    for(const side of leftRight){
      // Shoulder joint rig: each arm pivots independently for animation.
      const armPivot=new B.TransformNode(name+'-shoulder-'+side,scene);armPivot.position.set(side*.46,1.86,0);armPivot.parent=root;
      ball('shoulder',0,-.015,0,.175,.167,.185,coat,armPivot);
      cyl('upperSleeve',0,-.247,.004,.41,.30,.245,coat,armPivot);
      ball('elbow',0,-.47,.008,.13,.126,.127,coatLight,armPivot);
      cyl('foreSleeve',0,-.663,-.008,.35,.245,.21,coat,armPivot);
      cyl('sleeveCuff',0,-.838,-.008,.09,.215,.225,coatDark,armPivot);
      ball('hand',0,-.98,-.016,.103,.155,.083,skin,armPivot);
      for(let f=0;f<3;f++)ball('fingers',(-.054+f*.05),-1.089,-.057,.025,.083,.032,skin,armPivot,12);
      if(side===1){cyl('watchStrap',0,-.890,-.012,.071,.223,.223,black,armPivot);box('watchFace',0,-.886,-.111,.085,.07,.023,metal,armPivot)}
      armPivots.push(armPivot);
      const legPivot=new B.TransformNode(name+'-hip-'+side,scene);legPivot.position.set(side*.163,.91,0);legPivot.parent=root;
      cyl('thigh',0,-.255,0,.50,.365,.315,pants,legPivot);
      ball('knee',0,-.505,.012,.153,.15,.16,pantsLight,legPivot);
      cyl('shin',0,-.73,.008,.435,.285,.225,pants,legPivot);
      cyl('hem',0,-.93,0,.12,.236,.264,pantsLight,legPivot);
      box('cargoPocket',side*.025,-.35,-.162,.25,.20,.065,pantsLight,legPivot);
      box('cargoFlap',side*.025,-.235,-.17,.27,.055,.075,pants,legPivot);
      for(let p=0;p<3;p++)box('trouserCrease',side*.05,-.61-p*.12,-.122,.055,.025,.012,pantsLight,legPivot);
      // Boot faces forward (-Z).
      ball('bootAnkle',0,-1.02,.015,.14,.19,.15,boots,legPivot);
      box('bootSole',0,-1.126,-.079,.32,.102,.45,sole,legPivot);
      box('bootUpper',0,-1.054,-.094,.29,.14,.38,boots,legPivot);
      box('bootToe',0,-1.10,-.285,.30,.12,.21,boots,legPivot);
      for(let l=0;l<3;l++)pathTube('bootLace',[[ -.08,-.99-l*.04,-.251],[0,-.99-l*.04,-.242],[.08,-.99-l*.04,-.251]],.006,trim,legPivot);
      legPivots.push(legPivot);
    }
    // Visible ID credentials, clipped to an over-shirt cord.
    pathTube('lanyard',[[ -.055,2.02,-.118],[-.085,1.85,-.24],[0,1.63,-.276],[.085,1.85,-.24],[.055,2.02,-.118]],.012,idGreen);
    box('credential',0,1.50,-.292,.145,.205,.012,metal);
    box('credentialFace',0,1.505,-.302,.129,.174,.012,white);
    ball('photoOnBadge',-.031,1.54,-.315,.03,.037,.006,skin);
    for(let i=0;i<3;i++)box('badgeText',.026,1.54-i*.034,-.318,.045-i*.006,.008,.005,coat);
    // Anatomical head volumes and realistic layered hair. Face points toward -Z.
    ball('head',0,2.29,-.015,.232,.294,.222,skin,root,30);
    ball('jaw',0,2.18,-.09,.194,.16,.18,skin,root,24);
    ball('cheekL',-.168,2.265,-.128,.073,.085,.081,skin,root,20);
    ball('cheekR', .168,2.265,-.128,.073,.085,.081,skin,root,20);
    for(const side of leftRight){
      ball('ear',side*.232,2.27,-.012,.055,.087,.038,skin,root,18);
      ball('earInset',side*.248,2.274,-.038,.022,.04,.015,skinShadow,root,14);
      ball('eyeSocket',side*.095,2.321,-.201,.081,.041,.027,skinShadow,root,18);
      ball('eyeWhite',side*.094,2.328,-.220,.063,.029,.017,white,root,20);
      ball('iris',side*.091,2.328,-.236,.023,.023,.009,iris,root,22);
      ball('pupil',side*.091,2.328,-.244,.011,.014,.004,black,root,18);
      ball('eyeGlint',side*.097,2.335,-.248,.006,.007,.003,white,root,14);
      rotated(ball('eyebrow',side*.095,2.391,-.208,.078,isW?.019:.013,.012,hair,root,18),0,0,-side*.16);
      pathTube('upperEyeLine',[[side*.035,2.346,-.229],[side*.095,2.359,-.233],[side*.15,2.34,-.223]],.007,deepHair);
    }
    ball('noseBridge',0,2.277,-.226,.043,.102,.04,skin,root,20);
    ball('noseTip',0,2.235,-.256,.071,.041,.049,skinGlint,root,20);
    ball('nostrilL',-.047,2.213,-.292,.018,.009,.006,skinShadow,root,12);
    ball('nostrilR',.047,2.213,-.292,.018,.009,.006,skinShadow,root,12);
    ball('upperLip',0,2.162,-.25,.088,.021,.025,lip,root,20);
    ball('lowerLip',0,2.135,-.235,.081,.017,.022,lip,root,20);
    ball('chin',0,2.096,-.153,.12,.055,.085,skin,root,18);
    // Hairline and densely packed locks rather than a single helmet-shaped cap.
    ball('hairCrown',0,2.506,.046,.242,.151,.227,deepHair,root,24);
    ball('hairForehead',0,2.433,-.115,.220,.101,.155,hair,root,24);
    for(let i=0;i<24;i++){
      const a=Math.PI*2*i/24;
      const x=Math.cos(a)*.213,z=Math.sin(a)*.194+.014;
      const start=[x,2.53,z],mid=[x*1.11,2.478,z*1.15],end=[x*1.09,2.40-(i%4)*.015,z*1.20];
      if(z<-.09&&i%2)end[1]=2.38;
      pathTube('hairLock',[start,mid,end],.015+(i%4)*.001,i%3?hair:deepHair);
    }
    if(isW){
      // Winston: salt-and-pepper short hair and close beard.
      for(let i=0;i<17;i++){
        const a=Math.PI*(i/16);
        const x=Math.cos(a)*.178;
        ball('greyTemple',x,2.422,-.19,.028,.074,.028,i%3?hair:material('silver','#a6a5a0'),root,12);
      }
      const beardMaterial=material('saltPepper','#88827c');
      for(let i=0;i<18;i++){
        const a=Math.PI*(i/17);
        const x=Math.cos(a)*.157,y=2.143-.065*Math.sin(a),z=-.205+.075*Math.sin(a);
        ball('beardDetail',x,y,z,.031,.044,.019,i%3?beard:beardMaterial,root,10);
      }
      for(let side of leftRight){
        rotated(ball('moustache',side*.048,2.182,-.278,.055,.017,.020,beard,root,16),0,0,side*.11);
        for(let k=0;k<4;k++)ball('sideburn',side*.209,2.25+k*.04,-.07,.032,.032,.024,iHair(k),root,12);
      }
    }else{
      // Ayla: loose strands framing face and a tied ponytail visible from behind.
      ball('hairTie',0,2.383,.241,.091,.093,.09,deepHair);
      ball('ponytailUpper',0,2.300,.285,.126,.197,.117,hair);
      ball('ponytailLower',.04,2.137,.326,.104,.197,.114,hair);
      for(let j=0;j<13;j++){
        const x=(j-6)*.018;
        pathTube('ponytailStrand',[[x,2.397,.302],[x*1.3+.035,2.265,.36],[x*1.2+.058,2.051,.36]],.007,j%3?hair:deepHair);
      }
      for(const side of leftRight){
        pathTube('looseTempleHair',[[side*.165,2.472,-.12],[side*.225,2.39,-.16],[side*.237,2.275,-.17]],.011,deepHair);
        pathTube('looseLock',[[side*.15,2.53,-.14],[side*.19,2.45,-.19],[side*.205,2.32,-.19]],.009,hair);
      }
    }
    function iHair(k){return k%3?beard:hair;}
    // Contrasting boot/shirt shade and micro details remain distinct under office lighting.
    const head=root.getChildMeshes(false).find(m=>m.name===name+'-head');
    const arms=armPivots, legs=legPivots;
    let phase=0;
    function animate(dt, moving, sprint, now){
      const speed=(sprint?10:7.1);phase+=Math.min(dt,.06)*speed*(moving?1:.22);
      const swing=moving?(sprint?.49:.33):.025;
      for(let i=0;i<arms.length;i++){
        const target=Math.sin(phase+i*Math.PI)*swing*.75;
        arms[i].rotation.x+=(target-arms[i].rotation.x)*.17;
        arms[i].rotation.z+=( (i===0?-.06:.06)-arms[i].rotation.z)*.08;
      }
      for(let i=0;i<legs.length;i++){
        const target=Math.sin(phase+i*Math.PI+Math.PI)*swing;
        legs[i].rotation.x+=(target-legs[i].rotation.x)*.18;
      }
      const idle=(now||0)*.001;
      root.scaling.y=1+(moving?.0015:.004)*Math.sin(idle*1.8);
    }
    return {root,limbs:arms.concat(legs),arms,legs,head,animate,procedural:true};
  }
  window.AYLACharacterFactory={create:createCharacter,version:'0.3',kind:'native-babylon-geometry'};
})();