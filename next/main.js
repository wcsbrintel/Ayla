/* AYLA Visual Lab — isolated proof of concept.
   Engine: Babylon.js. Character GLBs: Microsoft Rocketbox Avatar Library,
   distributed by the MIT-licensed Avatar Studio project.
   A lightweight local avatar stands in if the network model is unavailable.
*/
(function(){
'use strict';
const $=id=>document.getElementById(id), B=window.BABYLON;
const I18N={
 pt:{coverTitle:"Toda evidência tem uma história.",coverDesc:"Uma nova base visual para AYLA: personagens articulados, iluminação cinematográfica, um escritório histórico e investigação em terceira pessoa.",startText:"Entrar na central",coverNotice:"Protótipo visual independente · A versão original continua disponível",missionLabel:"CENTRAL DE INTELIGÊNCIA",missionTitle:"A primeira investigação",objective:"Explore a sala. Converse com Winston e depois examine o terminal OSINT.",objMentor:"Conversar com Winston",objTerminal:"Examinar o terminal",moveLabel:"mover",dragLabel:"arrastar para girar",runLabel:"correr",winston:"Conversar com Winston",terminal:"Investigar no terminal OSINT",drawerNote:"A metodologia começa com a origem da evidência.",ackText:"Continuar",mentorBody:"Ayla, uma pista não é uma conclusão. Consulte as fontes abertas, identifique a origem de cada afirmação e registre o que podemos realmente verificar.",terminalBody:"Arquivo AY-001. O relatório de inspeção registra 18 aves. Uma publicação aberta cita um número diferente, mas não apresenta fonte independente. Sua primeira tarefa é separar informação observada de hipótese.",done:"Fontes analisadas. As informações verificadas devem permanecer separadas das hipóteses.",welcome:"Explore o ambiente com WASD. Pressione E perto de Winston ou do terminal.",load:"Carregando os modelos 3D...",fallback:"Modelo online indisponível. Personagem substituto ativado.",soundOn:"Som ambiente ligado",soundOff:"Som ambiente desligado",completed:"Primeira investigação concluída."},
 en:{coverTitle:"Every piece of evidence has a story.",coverDesc:"A new visual foundation for AYLA: animated characters, cinematic lighting, a historical office and third-person investigation.",startText:"Enter headquarters",coverNotice:"Independent visual prototype · The original game remains available",missionLabel:"INTELLIGENCE HEADQUARTERS",missionTitle:"The first investigation",objective:"Explore the room. Speak with Winston, then examine the OSINT terminal.",objMentor:"Speak with Winston",objTerminal:"Examine the OSINT terminal",moveLabel:"move",dragLabel:"drag to orbit",runLabel:"run",winston:"Talk to Winston",terminal:"Investigate the OSINT terminal",drawerNote:"Good intelligence begins with source provenance.",ackText:"Continue",mentorBody:"Ayla, a lead is not a conclusion. Review open sources, identify where each claim originated, and record only what we can verify.",terminalBody:"File AY-001. An inspection record documents 18 birds. A public post mentions a different quantity without independent corroboration. Your first task is to distinguish observed facts from hypotheses.",done:"Sources reviewed. Verified facts must remain separate from investigative hypotheses.",welcome:"Explore with WASD. Press E near Winston or the terminal.",load:"Loading 3D characters...",fallback:"Online model unavailable. Backup character enabled.",soundOn:"Ambient sound on",soundOff:"Ambient sound off",completed:"First investigation completed."},
 es:{coverTitle:"Cada evidencia tiene una historia.",coverDesc:"Una nueva base visual para AYLA: personajes animados, iluminación cinematográfica, una oficina histórica e investigación en tercera persona.",startText:"Entrar al centro",coverNotice:"Prototipo visual independiente · El juego original permanece disponible",missionLabel:"CENTRO DE INTELIGENCIA",missionTitle:"La primera investigación",objective:"Explora la sala. Habla con Winston y luego examina la terminal OSINT.",objMentor:"Hablar con Winston",objTerminal:"Examinar la terminal OSINT",moveLabel:"mover",dragLabel:"arrastrar para girar",runLabel:"correr",winston:"Hablar con Winston",terminal:"Investigar en la terminal OSINT",drawerNote:"La metodología comienza con el origen de la evidencia.",ackText:"Continuar",mentorBody:"Ayla, una pista no es una conclusión. Revisa fuentes abiertas, identifica el origen de cada afirmación y registra solo lo que podamos verificar.",terminalBody:"Archivo AY-001. Un acta de inspección documenta 18 aves. Una publicación pública menciona otra cantidad sin corroboración independiente. Tu primera tarea es distinguir hechos observados de hipótesis.",done:"Fuentes revisadas. Los hechos verificados deben permanecer separados de las hipótesis.",welcome:"Explora con WASD. Pulsa E cerca de Winston o la terminal.",load:"Cargando personajes 3D...",fallback:"Modelo en línea no disponible. Se activó el personaje alternativo.",soundOn:"Sonido ambiental activado",soundOff:"Sonido ambiental desactivado",completed:"Primera investigación completada."}
};
let lang='pt',scene,engine,camera,ayla,winston,npcA,npcB,active=false,modal=null,lastNear=null,notifyTimer=0,clock=0;
const state={mentor:false,terminal:false},keys=Object.create(null),tap=Object.create(null);
try{let l=localStorage.getItem('ayla-visual-lab-language');if(I18N[l])lang=l}catch(_){}
function t(){return I18N[lang]}
function copyText(){for(const id of ["coverTitle","coverDesc","startText","coverNotice","missionLabel","missionTitle","objective","moveLabel","dragLabel","runLabel","drawerNote","ackText"]){$(id).textContent=t()[id]}updateMission();updatePrompt();document.documentElement.lang=lang;document.querySelectorAll(".lang").forEach(el=>el.classList.toggle("active",el.dataset.lang===lang))}
function updateMission(){$('objMentor').textContent=(state.mentor?'✓ ':'○ ')+t().objMentor;$('objTerminal').textContent=(state.terminal?'✓ ':'○ ')+t().objTerminal;$('objMentor').classList.toggle('done',state.mentor);$('objTerminal').classList.toggle('done',state.terminal);$('progressBar').style.width=((Number(state.mentor)+Number(state.terminal))/2*100)+'%'}
function status(text,ms=2800){clearTimeout(notifyTimer);$('status').textContent=text;$('status').classList.remove('hidden');notifyTimer=setTimeout(()=>$('status').classList.add('hidden'),ms)}
document.querySelectorAll(".lang").forEach(el=>el.onclick=()=>{lang=el.dataset.lang;try{localStorage.setItem('ayla-visual-lab-language',lang)}catch(_){}copyText();});
if(!B){$('fatalText').textContent='Babylon.js could not load. Check your internet connection.';$('fatal').classList.remove('hidden');return}
try{engine=new B.Engine($('stage'),true,{antialias:true,stencil:true},true);scene=new B.Scene(engine)}catch(e){$('fatalText').textContent=String(e);$('fatal').classList.remove('hidden');return}
scene.clearColor=new B.Color4(.045,.057,.062,1);
scene.imageProcessingConfiguration.toneMappingEnabled=true;
scene.imageProcessingConfiguration.toneMappingType=B.ImageProcessingConfiguration.TONEMAPPING_ACES;
scene.imageProcessingConfiguration.exposure=.95;
scene.imageProcessingConfiguration.contrast=1.08;
const m={};
function mat(name,color,rough=.8,metal=0){
 let x=new B.PBRMaterial(name,scene);x.albedoColor=B.Color3.FromHexString(color);x.roughness=rough;x.metallic=metal;return x;
}
m.plaster=mat('ivory worn plaster','#b1a594');m.stone=mat('historic stone','#878579');m.walnut=mat('polished walnut','#604638',.52);m.walnutDark=mat('dark oak','#332823',.68);m.wood=mat('oak floor','#694d3a',.83);
m.leather=mat('chair leather','#39473d',.68);m.brass=mat('aged brass','#ac9364',.43,.65);m.slate=mat('charcoal slate','#1f3438',.8);m.fabric=mat('forest green fabric','#3b554e',.95);m.paper=mat('archive paper','#cbbda0',.94);m.metal=mat('gunmetal','#59666a',.36,.55);m.glass=mat('window glass','#9fc8c1',.19);m.lamp=mat('warm porcelain','#e9cfa4',.56);m.earth=mat('globe ocean','#21383d',.8);m.gold=mat('brass detail','#a89162',.5,.4);
const dummyLit=mat('warm electric lamp','#e5d0aa',.5);dummyLit.emissiveColor=B.Color3.FromHexString('#3f3525');
const colors=['#68533e','#574a3c','#565743','#46504a','#61453f','#897658','#445e58'].map((c,i)=>mat('book leather '+i,c,.88));
function box(name,w,h,d,x,y,z,material,parent){let o=B.MeshBuilder.CreateBox(name,{width:w,height:h,depth:d},scene);o.position.set(x,y,z);o.material=material;if(parent)o.parent=parent;return o}
function cyl(name,diam,h,x,y,z,material,parent){let o=B.MeshBuilder.CreateCylinder(name,{diameter:diam,height:h,tessellation:16},scene);o.position.set(x,y,z);o.material=material;if(parent)o.parent=parent;return o}
function sphere(name,diam,x,y,z,material,parent){let o=B.MeshBuilder.CreateSphere(name,{diameter:diam,segments:16},scene);o.position.set(x,y,z);o.material=material;if(parent)o.parent=parent;return o}
function poster(name,x,y,z,angle,title,lines){
 const plane=B.MeshBuilder.CreatePlane('archive-'+name,{width:2.1,height:2.6},scene);
 plane.position.set(x,y,z);plane.rotation.y=angle;
 const tx=new B.DynamicTexture('archive-canvas-'+name,{width:640,height:800},scene,true),q=tx.getContext();
 q.fillStyle='#dac7a6';q.fillRect(0,0,640,800);q.strokeStyle='#4a3c32';q.lineWidth=23;q.strokeRect(13,13,614,774);
 q.fillStyle='#51463a';q.font='bold 25px Georgia';q.fillText('AYLA / INTELLIGENCE ARCHIVE',48,70);q.fillStyle='#887c66';q.fillRect(45,98,550,472);
 q.fillStyle='#b3a388';q.beginPath();q.moveTo(120,460);q.bezierCurveTo(180,360,300,340,360,275);q.bezierCurveTo(420,330,410,455,520,514);q.lineTo(120,530);q.fill();
 q.strokeStyle='#60493d';q.lineWidth=7;q.strokeRect(80,150,480,360);
 q.fillStyle='#423629';q.font='bold 37px Georgia';q.fillText(title,48,641);
 q.font='22px Georgia';for(let i=0;i<lines.length;i++)q.fillText(lines[i],48,695+i*34);tx.update();
 const material=new B.StandardMaterial('archival texture '+name,scene);material.diffuseTexture=tx;material.disableLighting=true;material.backFaceCulling=true;plane.material=material;
 return plane;
}
const collisions=[];
function obstacle(x,z,w,d,name){collisions.push({x,z,w,d,name})}
const W=17.6,D=14.0;
box('old oak floor',W,.24,D,0,-.15,0,m.wood);
for(let z=-D/2+.42;z<D/2;z+=.85){let k=box('oak plank',W,.018,.80,0,-.025,z,m.wood);k.receiveShadows=true}
for(let x=-W/2+.5;x<W/2;x+=4.25){box('parquet trim',.018,.015,D,x,-.008,0,m.walnutDark)}
box('rear plaster wall',W,5.9,.28,0,2.76,7.0,m.plaster);
box('left plaster wall',.28,5.9,D,-8.8,2.76,0,m.plaster);
box('right plaster wall',.28,5.9,D,8.8,2.76,0,m.plaster);
box('front return wall',W,5.9,.25,0,2.76,-7.0,m.plaster);
box('wainscot back',W,1.3,.08,0,.65,6.82,m.walnutDark);
box('wainscot left',.08,1.3,D,-8.62,.65,0,m.walnutDark);
box('wainscot right',.08,1.3,D,8.62,.65,0,m.walnutDark);
for(let z=-6;z<=6;z+=4){box('oak wall pillar',.32,5.9,.38,-8.53,2.8,z,m.walnutDark);box('oak wall pillar',.32,5.9,.38,8.53,2.8,z,m.walnutDark)}
for(let x=-7.4;x<=7.4;x+=3.7){box('ceiling timber',.22,.28,D,x,5.72,0,m.walnutDark)}
for(let z=-5;z<=5;z+=3.4){box('cross timber',W,.26,.21,0,5.67,z,m.walnutDark)}
for(let x of [-5.5,0,5.5]){
 let lamp=new B.PointLight('chandelier warm '+x,new B.Vector3(x,4.2,0),scene);lamp.intensity=9;lamp.range=9;lamp.diffuse=B.Color3.FromHexString('#ffe0b4');
 cyl('chandelier support',.055,.7,x,4.9,0,m.brass);
 sphere('chandelier shade',.53,x,4.35,0,dummyLit);
}
const hemi=new B.HemisphericLight('ambient',new B.Vector3(.2,1,-.2),scene);hemi.intensity=.6;hemi.diffuse=B.Color3.FromHexString('#dfe4dc');hemi.groundColor=B.Color3.FromHexString('#606367');
const sky=new B.DirectionalLight('cool afternoon window',new B.Vector3(-.3,-1,.4),scene);sky.position=new B.Vector3(-6,8,-6);sky.intensity=1.45;sky.diffuse=B.Color3.FromHexString('#d1e5ee');
function desk(x,z,w,d){const root=new B.TransformNode('walnut desk',scene);root.position.set(x,0,z);
 box('desk top',w,.12,d,0,1.06,0,m.walnut,root);
 for(let sx of [-1,1])for(let sz of [-1,1])box('carved table leg',.15,1,.15,sx*(w/2-.18),.48,sz*(d/2-.18),m.walnutDark,root);
 box('desk fascia',w-.12,.22,.09,0,.84,-d/2+.07,m.walnutDark,root);
 obstacle(x,z,w+.30,d+.3,'desk');return root}
function chair(x,z,a=0){const root=new B.TransformNode('green leather task chair',scene);root.position.set(x,0,z);root.rotation.y=a;
 cyl('cast iron post',.13,.85,0,.43,0,m.metal,root);cyl('chair seat',.65,.15,0,.92,0,m.leather,root);
 box('leather chair back',.68,.84,.13,0,1.34,.29,m.leather,root);
 for(let t=0;t<5;t++){let angle=2*Math.PI*t/5;box('chair wheel arm',.45,.055,.065,Math.cos(angle)*.25,.12,Math.sin(angle)*.25,m.metal,root)}
 obstacle(x,z,.72,.76,'chair');return root}
function bookcase(x,z,w=2.25){let h=3.5;box('bookcase back',w,h,.44,x,1.88,z,m.walnutDark);for(let sx of [-1,1])box('bookcase edge',.13,h,.62,x+sx*(w/2-.06),1.88,z,m.walnut);
 for(let y=.42;y<=3.3;y+=.62){box('bookshelf',w-.12,.08,.63,x,y,z,m.walnut);let width=w-0.32;for(let k=0;k<18;k++){const xx=x-width/2+k*width/18+.03,yy=y+.26;box('archival spine',width/20,.43+Math.sin(k*8)*.08,.31,xx,yy,z-.16,colors[(k+Math.floor(x*3)+100)%colors.length])}}
 obstacle(x,z,w+.15,.85,'bookshelf')}
bookcase(-7.6,5.4,1.65);bookcase(-5.45,5.4,2.15);bookcase(5.8,5.4,2.15);bookcase(7.72,5.4,1.75);
bookcase(-7.6,-4.75,1.8);bookcase(7.6,-4.75,1.75);
desk(-3.5,-2.4,3.0,1.3);chair(-3.3,-1.35,Math.PI);
desk(3.45,-2.4,3.0,1.3);chair(3.4,-1.35,Math.PI);
desk(0,4.3,3.5,1.3);chair(0,3.35,Math.PI);
function laptop(x,z,a=0){let root=new B.TransformNode('research workstation',scene);root.position.set(x,1.13,z);root.rotation.y=a;
 box('keyboard panel',1.0,.045,.51,0,.06,-.25,m.metal,root);
 let display=box('LCD case',1.08,.69,.07,0,.52,.18,m.slate,root);
 let glass=box('LCD',1.00,.6,.012,0,.52,.133,mat('computer blue screen','#193e45',.45),root);
 let screenmat=glass.material;screenmat.emissiveColor=B.Color3.FromHexString('#174047');
 for(let k=0;k<6;k++)box('UI schematic',.47+k%2*.1,.011,.01,-.18,.74-k*.08,.122,m.brass,root);
}
laptop(-3.5,-2.4);laptop(3.45,-2.4);laptop(0,4.3);
for(const [x,z] of [[-4.52,-2.15],[2.4,-2.2],[1.1,4.1]]){
 box('folio stack',.47,.08,.65,x,1.17,z,m.paper);box('ink notebook',.5,.04,.68,x,1.26,z,m.walnutDark)
}
function carpet(){let p=B.MeshBuilder.CreateGround('central wool carpet',{width:5.1,height:3.8},scene);p.position.set(0,.014,.5);
 let tx=new B.DynamicTexture('wool rug tapestry',{width:1024,height:768},scene,true),q=tx.getContext();
 q.fillStyle='#273b35';q.fillRect(0,0,1024,768);
 q.strokeStyle='#b5a16f';q.lineWidth=28;q.strokeRect(25,25,974,718);
 q.lineWidth=7;q.strokeRect(56,56,912,656);
 q.fillStyle='#a4a284';q.font='bold 170px Georgia';q.textAlign='center';q.fillText('◇',512,355);
 q.fillStyle='#d6c59b';q.font='bold 46px Georgia';q.fillText('A Y L A',512,440);
 q.font='25px Georgia';q.fillText('CONSERVATION INTELLIGENCE',512,505);
 tx.update();
 let mm=new B.StandardMaterial('woven wool',scene);mm.diffuseTexture=tx;mm.backFaceCulling=false;mm.specularColor=B.Color3.Black();p.material=mm;
}
carpet();
poster('wildlife-note',-8.50,3.1,-1,Math.PI/2,'FIELD NOTES',['WILDLIFE  /  CONSERVATION','SPECIES REFERENCE']);
poster('route-note',-8.50,3.1,2.4,Math.PI/2,'ROUTE ANALYSIS',['GEOSPATIAL EVIDENCE','CONFIRMED / UNCONFIRMED']);
poster('archive-note',8.51,3.1,.5,-Math.PI/2,'CASE ARCHIVE',['SOURCE VERIFICATION','INTELLIGENCE / 01']);
function wallScreen(){const frame=box('geoint large frame',4.0,2.7,.17,0,3.14,6.82,m.walnutDark);
 let panel=box('OSINT wall panel',3.79,2.52,.02,0,3.14,6.71,m.slate);
 const tex=new B.DynamicTexture('geospatial network',{width:1024,height:640},scene,true);
 const q=tex.getContext();q.fillStyle='#0b242c';q.fillRect(0,0,1024,640);
 q.strokeStyle='#416762';q.lineWidth=1;for(let i=0;i<=16;i++){q.beginPath();q.moveTo(i*64,0);q.lineTo(i*64,640);q.stroke()}for(let j=0;j<=10;j++){q.beginPath();q.moveTo(0,j*64);q.lineTo(1024,j*64);q.stroke()}
 q.fillStyle='#cee4ae';q.textAlign='left';q.font='bold 39px monospace';q.fillText('GLOBAL INTELLIGENCE GRID',48,73);q.font='24px monospace';q.fillText('AY-001  /  ROUTE ASSESSMENT',50,114);
 const pts=[[212,346],[368,270],[555,418],[722,247],[850,382]];
 q.lineWidth=4;q.strokeStyle='#88d5b0';q.setLineDash([12,9]);q.beginPath();pts.forEach((p,i)=>i?q.lineTo(...p):q.moveTo(...p));q.stroke();q.setLineDash([]);
 pts.forEach((p,i)=>{q.fillStyle=i===0?'#d6f1a5':'#68cdb7';q.beginPath();q.arc(p[0],p[1],11,0,7);q.fill()});
 q.fillStyle='#8baaa2';q.font='20px monospace';q.fillText('MAP PROJECTION / EVIDENCE LIMITS',54,593);tex.update();
 const p=B.MeshBuilder.CreatePlane('monitor face',{width:3.76,height:2.47},scene);p.position.set(0,3.14,6.68);p.rotation.y=Math.PI;const material=new B.StandardMaterial('illuminated GIS display',scene);material.diffuseTexture=tex;material.disableLighting=true;material.backFaceCulling=false;p.material=material;
}
wallScreen();
for(let x of [-7.8,7.8])for(let z of [-6,6])obstacle(x,z,.7,.7,'architectural support');
const moveSphereMat=mat('fallback clothing','#59695d'),skinMat=mat('fallback skin','#977663'),hairMat=mat('fallback hair','#35302c');
function fallback(name,x,z,male){const root=new B.TransformNode(name+' movement root',scene);root.position.set(x,0,z);
 const container=new B.TransformNode(name+' placeholder',scene);container.parent=root;
 cyl(name+' torso',.55,.91,0,1.36,0,male?m.walnutDark:moveSphereMat,container);
 sphere(name+' head',.43,0,2.03,0,skinMat,container);
 sphere(name+' hair',.46,0,2.17,.045,male?mat('silver hair','#656665'):hairMat,container);
 const legs=[];for(let sign of [-1,1]){const leg=cyl(name+' leg',.23,.90,sign*.15,.49,0,m.slate,container);legs.push(leg);cyl(name+' arm',.19,.82,sign*.38,1.37,0,male?m.walnutDark:moveSphereMat,container)}
 return {name,root,body:container,legs,rig:null,clips:new Map(),current:null,walking:false,phase:0,ready:false}
}
const actors=[],ANIMS=['Idle','Walk','Run','Talk','Think','Confident'];
const avatars='https://cdn.jsdelivr.net/gh/memoriesrohit/avatar-studio@2fd9ec82fbe1613d40ae38aadcca3f410725f740/models/';
function actor(name,x,z,male){const a=fallback(name,x,z,male);actors.push(a);return a}
ayla=actor('Ayla',0,-.6,false);
winston=actor('Winston',-4.4,1.1,true);
npcA=actor('Analyst',5.1,.6,true);
npcB=actor('Researcher',3.2,3.2,false);
function action(a,name){
 if(!a.ready)return;
 let target=a.clips.get(name)||a.clips.get('Idle');if(!target||a.current===target)return;
 if(a.current)a.current.stop();
 target.reset();target.start(true,1,target.from,target.to,false);a.current=target;
}
async function loadAvatar(a,file,scale){
 if(!B.SceneLoader?.ImportMeshAsync)return;
 try{
 let res=await B.SceneLoader.ImportMeshAsync('',avatars,file,scene);
 let group=new B.TransformNode(a.name+' rig carrier',scene);group.parent=a.root;group.scaling.setAll(scale);group.rotation.y=Math.PI;
 const nodes=[...res.meshes,...res.transformNodes];nodes.filter(n=>!n.parent).forEach(n=>n.parent=group);
 // Original wardrobe is the intended set. Hide alternate formal, tee and jacket combinations.
 const skip=['Outfit_formal','Skin_formal','Top_shirt','Skin_shirt','Top_tee','Skin_tee','Trousers','Shoes'];
 nodes.forEach(n=>{if(skip.some(v=>n.name===v||n.name.startsWith(v+'_')))n.setEnabled(false)});
 res.animationGroups.forEach(g=>{g.stop();a.clips.set(g.name.replace(/^.*\|/,'').trim(),g)});
 for(let g of res.animationGroups)for(let ta of g.targetedAnimations){
   if(!/root|hips|armature/i.test(ta.target?.name||'')||!(/position/.test(ta.animation?.targetProperty||'')))continue;
   let keys=ta.animation.getKeys(),zero=keys[0]?.value;
   if(!zero||!('x'in zero))continue;
   for(let k of keys){if(k.value?.clone){k.value=k.value.clone();k.value.x=zero.x;k.value.z=zero.z}}
 }
 a.body.setEnabled(false);a.ready=true;a.rig=group;action(a,'Idle');
 }catch(e){console.warn('Character load fallback',a.name,e);status(t().fallback)}
}
Promise.allSettled([
 loadAvatar(ayla,'priya_casual.glb',1),
 loadAvatar(winston,'leo_smart.glb',1.04),
 loadAvatar(npcA,'carlos_casual.glb',.98),
 loadAvatar(npcB,'maria_casual.glb',.99)
]);
function blocker(x,z,r,ignore){
 if(Math.abs(x)>W/2-.52-r||Math.abs(z)>D/2-.52-r)return true;
 for(let o of collisions){let px=Math.max(o.x-o.w/2,Math.min(x,o.x+o.w/2)),pz=Math.max(o.z-o.d/2,Math.min(z,o.z+o.d/2));if(Math.hypot(x-px,z-pz)<r)return true}
 for(let a of actors){if(a===ignore)continue;if(Math.hypot(x-a.root.position.x,z-a.root.position.z)<r+.37)return true}return false;
}
function approach(a,dx,dz,dt){const x=a.root.position.x+dx,y=a.root.position.z+dz;if(!blocker(x,a.root.position.z,.27,a))a.root.position.x=x;if(!blocker(a.root.position.x,y,.27,a))a.root.position.z=y}
function angleTo(a,x,z,dt){const target=Math.atan2(-(x-a.root.position.x),-(z-a.root.position.z));const diff=Math.atan2(Math.sin(target-a.root.rotation.y),Math.cos(target-a.root.rotation.y));a.root.rotation.y+=diff*Math.min(1,dt*6)}
function animate(a,moving,dt,run=false){if(a.ready)action(a,moving?(run?'Run':'Walk'):a===winston&&modal==='mentor'?'Talk':'Idle');else{a.phase+=dt*(moving?10:1);a.legs.forEach((l,i)=>l.rotation.x+=(moving?Math.sin(a.phase+i*Math.PI)*.32:0-l.rotation.x)*.15)}}
let cm=new B.ArcRotateCamera('camera',-Math.PI/2,1.18,8.6,new B.Vector3(0,1.4,-.6),scene);camera=cm;camera.attachControl($('stage'),true);camera.lowerRadiusLimit=4.1;camera.upperRadiusLimit=12;camera.lowerBetaLimit=.53;camera.upperBetaLimit=1.48;camera.wheelPrecision=30;camera.panningSensibility=0;camera.angularSensibilityX=2150;camera.angularSensibilityY=2000;camera.inputs.removeByType('ArcRotateCameraKeyboardMoveInput');
const npcPatrol=new Map([[npcA,{points:[[5.1,.6],[5.2,2.1],[6.3,2.65],[5.2,.7]],i:1,pause:2.2}],[npcB,{points:[[3.2,3.2],[4.9,3.4],[5.55,1.9],[3.2,3.2]],i:1,pause:3.2}],[winston,{points:[[-4.4,1.1],[-5.9,1.2],[-5.4,-.6],[-4.4,1.1]],i:1,pause:2.5}]]);
const targets=[{id:'mentor',a:winston,x:-4.4,z:1.1},{id:'terminal',x:3.45,z:-2.4}];
function updatePrompt(){if(!active||modal){$('prompt').classList.add('hidden');return}let close=lastNear;if(!close){$('prompt').classList.add('hidden');return}$('promptText').textContent=t()[close.id==='mentor'?'winston':'terminal'];$('prompt').classList.remove('hidden')}
function interact(){if(!active||modal||!lastNear)return;modal=lastNear.id;
 $('drawerKicker').textContent=modal==='mentor'?'BRIEFING / WINSTON':'OSINT / SOURCE REVIEW';
 $('drawerTitle').textContent=modal==='mentor'?'Winston':'OSINT TERMINAL';
 $('drawerBody').textContent=t()[modal==='mentor'?'mentorBody':'terminalBody'];
 $('drawerNote').textContent=t().drawerNote;
 $('dialog').classList.remove('hidden');$('prompt').classList.add('hidden');
 if(modal==='mentor'){state.mentor=true;angleTo(ayla,winston.root.position.x,winston.root.position.z,1);angleTo(winston,ayla.root.position.x,ayla.root.position.z,1);}
 if(modal==='terminal')state.terminal=true;
 updateMission();
}
function close(){modal=null;$('dialog').classList.add('hidden');updatePrompt();if(state.mentor&&state.terminal)status(t().completed)}
$('closeDrawer').onclick=close;$('ackBtn').onclick=close;
$('resetCamera').onclick=()=>{camera.alpha=-Math.PI/2;camera.beta=1.18;camera.radius=8.6};
$('startBtn').onclick=()=>{active=true;$('cover').classList.add('hidden');$('mission').classList.remove('hidden');$('help').classList.remove('hidden');if(matchMedia('(pointer:coarse)').matches)$('touchControls').classList.remove('hidden');status(t().welcome,4600)};
for(let b of document.querySelectorAll('[data-key]')){let k=b.dataset.key;b.onpointerdown=e=>{tap[k]=true;b.setPointerCapture(e.pointerId);e.preventDefault()};b.onpointerup=b.onpointercancel=()=>tap[k]=false}
$('touchInteract').onclick=interact;
window.addEventListener('keydown',e=>{let k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowleft','arrowright','arrowdown','e','shift'].includes(k)){if(active)e.preventDefault();keys[k]=true}if(k==='e'&&!e.repeat)interact();if(k==='escape'&&modal)close()});
window.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});
window.addEventListener('blur',()=>{for(let k in keys)keys[k]=false});
let sound=null;
$('audioBtn').onclick=()=>{if(sound){sound.osc.stop();sound.ctx.close();sound=null;$('audioBtn').setAttribute('aria-pressed','false');status(t().soundOff);return}try{let ctx=new(window.AudioContext||window.webkitAudioContext)(),osc=ctx.createOscillator(),gain=ctx.createGain(),filter=ctx.createBiquadFilter();osc.type='sine';osc.frequency.value=65;filter.type='lowpass';filter.frequency.value=150;gain.gain.value=.011;osc.connect(filter).connect(gain).connect(ctx.destination);osc.start();sound={ctx,osc};$('audioBtn').setAttribute('aria-pressed','true');status(t().soundOn)}catch(e){console.warn(e)}};
engine.runRenderLoop(()=>{
 const dt=Math.min(.055,engine.getDeltaTime()/1000);clock+=dt;
 let x=(keys.d||keys.arrowright||tap.d?1:0)-(keys.a||keys.arrowleft||tap.a?1:0),z=(keys.w||keys.arrowup||tap.w?1:0)-(keys.s||keys.arrowdown||tap.s?1:0);
 let moving=!!(x||z)&&active&&!modal,run=!!keys.shift;
 if(moving){let forward=new B.Vector3(camera.target.x-camera.position.x,0,camera.target.z-camera.position.z);forward.normalize();let right=new B.Vector3(forward.z,0,-forward.x),v=forward.scale(z).add(right.scale(x)).normalize();approach(ayla,v.x*dt*(run?3.0:1.65),v.z*dt*(run?3.0:1.65),dt);angleTo(ayla,ayla.root.position.x+v.x,ayla.root.position.z+v.z,dt)}
 animate(ayla,moving,dt,run);
 for(let [a,data] of npcPatrol){let stop=a===winston&&modal==='mentor';if(!active||stop||data.pause>0){data.pause=Math.max(0,data.pause-dt);animate(a,false,dt);continue}
 let [px,pz]=data.points[data.i],dx=px-a.root.position.x,dz=pz-a.root.position.z,dist=Math.hypot(dx,dz);
 if(dist<.2){data.i=(data.i+1)%data.points.length;data.pause=1+Math.random()*1.5;animate(a,false,dt)}else{let vx=dx/dist,vz=dz/dist;let oldx=a.root.position.x,oldz=a.root.position.z;approach(a,vx*dt*.78,vz*dt*.78,dt);const made=Math.hypot(a.root.position.x-oldx,a.root.position.z-oldz)>.003;angleTo(a,px,pz,dt);animate(a,made,dt);if(!made)data.pause=.65}
 }
 if(modal==='mentor'){angleTo(ayla,winston.root.position.x,winston.root.position.z,dt);angleTo(winston,ayla.root.position.x,ayla.root.position.z,dt)}
 let dest=new B.Vector3(ayla.root.position.x,1.45,ayla.root.position.z);camera.setTarget(B.Vector3.Lerp(camera.target,dest,Math.min(1,dt*5)));
 if(active&&!modal){let best=null,dist=2.1;for(let tar of targets){let px=tar.a?tar.a.root.position.x:tar.x,pz=tar.a?tar.a.root.position.z:tar.z,d=Math.hypot(ayla.root.position.x-px,ayla.root.position.z-pz);if(d<dist){best=tar;dist=d}}if(best!==lastNear){lastNear=best;updatePrompt()}}
 scene.render();
});
window.addEventListener('resize',()=>engine.resize());copyText();
})();