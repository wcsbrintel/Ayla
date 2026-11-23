/* AYLA 0.7.2 — original realistic characters restored as the default.
 * Models: Microsoft Rocketbox Avatar Library (MIT), via memoriesrohit/avatar-studio.
 * Local simplified meshes are NEVER displayed automatically; they are optional
 * for users who explicitly select compatibility mode. Multiple model sources
 * are attempted before reporting an original-model loading error.
 */
(function () {
  'use strict';
  const previous = window.AYLACharacterFactory;
  if (!previous || typeof previous.create !== 'function') return;
  const rev='2fd9ec82fbe1613d40ae38aadcca3f410725f740';
  const libraries=[
    'https://cdn.jsdelivr.net/gh/memoriesrohit/avatar-studio@'+rev+'/models/',
    'https://raw.githubusercontent.com/memoriesrohit/avatar-studio/'+rev+'/models/'
  ];
  // Ignore the old automatic-fallback preference from the Windows fix.
  // Original realistic avatars now win unless the player explicitly opts out.
  const compatibilityKey='ayla-character-display-v2';
  let forceLocal=false;
  try{forceLocal=window.localStorage.getItem(compatibilityKey)==='local';}catch(e){}
  window.AYLACharacterCompatibility={
    isEnabled:()=>forceLocal,
    setEnabled:(enabled)=>{
      forceLocal=!!enabled;
      try{window.localStorage.setItem(compatibilityKey,forceLocal?'local':'original');}catch(e){}
      window.location.reload();
    }
  };
  function disposeImport(result){
    try{for(const group of result?.animationGroups||[])group.stop();}
    catch(e){}
    for(const node of [...(result?.meshes||[]),...(result?.transformNodes||[])].reverse()){
      try{if(node&&!node.isDisposed?.())node.dispose(false,true);}catch(e){}
    }
  }
  async function tryImport(B,scene,rootUrl,asset){
    let expired=false,timer;
    const importTask=B.SceneLoader.ImportMeshAsync('',rootUrl,asset,scene);
    importTask.then(result=>{if(expired)disposeImport(result);},()=>{});
    try{
      return await Promise.race([
        importTask,
        new Promise((_,reject)=>{timer=setTimeout(()=>{expired=true;reject(new Error('Timed out loading '+asset));},18000);})
      ]);
    } finally {clearTimeout(timer);}
  }
  const outfits = new Set(['Outfit_original','Skin_original','Outfit_formal','Skin_formal',
    'Top_shirt','Skin_shirt','Top_tee','Skin_tee','Trousers','Shoes']);
  const showOriginal = new Set(['Outfit_original','Skin_original']);
  function create(B, scene, cfg) {
    const actor = previous.create(B,scene,cfg);
    const origAnimate = actor.animate;
    const origSeat = actor.setSeated;
    const origInteraction = actor.setInteraction;
    const origDialogue = actor.setDialogue;
    const origTalking = actor.setTalking;
    const legacyMeshes = actor.root.getChildMeshes(false);
    // The previous realistic characters are the product design. Never replace
    // them with simplified geometry unless the user has explicitly requested it.
    if(!forceLocal)legacyMeshes.forEach(m=>m.setEnabled(false));
    let ready=false,failed=false,active=null, previousAction=null,fadeTime=0,current='Idle',seated=false,interaction='idle',talking=false;
    const stages = new Map();
    const name = cfg.name || (cfg.isWinston ? 'Winston' : 'Ayla');
    actor.visualVersion = '0.7';
    actor.characterType = 'rigged-textured';
    actor.isRiggedReady = ()=>ready;
    actor.supportsSeatedAnimation = ()=>ready&&[...stages.keys()].some(k=>/^sit(?:ting|ted)?(?:[ _-]|$)/i.test(k));
    actor.setInteraction = function (id) { interaction=id||'idle'; origInteraction?.(id); };
    actor.setCinematic = function (id) { interaction=id||'idle'; };
    actor.setSeated = function (value) { seated=!!value; origSeat?.(value); };
    actor.setDialogue = function (value) { talking=!!value; origDialogue?.(value); };
    actor.setTalking = function (value) { talking=!!value; origTalking?.(value); };
    actor.animate = function (dt,moving,sprint,now) {
      if(!ready) {if(forceLocal)origAnimate(dt,moving,sprint,now);return;}
      let next='Idle';
      if(moving) next=sprint?'Walk':'Walk';
      else if(talking) next=cfg.isWinston?'Talk':'Confident';
      else if(seated&&actor.supportsSeatedAnimation()) next=[...stages.keys()].find(k=>/^sit(?:ting|ted)?(?:[ _-]|$)/i.test(k));
      else if(seated) next='Idle';
      else if(interaction==='terminal'||interaction==='report') next='Think';
      else if(interaction==='map'||interaction==='board') next='Think';
      else if(interaction==='winston')next='Talk';
      if(next!==current) play(next);
      if(active)active.speedRatio=moving?(sprint?1.18:0.93):1;
      // Blend across actions instead of stopping/resets that cause jumps.
      if(previousAction){
        fadeTime=Math.min(.38,fadeTime+Math.min(dt,.06));
        const t=fadeTime/.38;
        if(active?.setWeightForAllAnimatables)active.setWeightForAllAnimatables(t);
        if(previousAction?.setWeightForAllAnimatables)previousAction.setWeightForAllAnimatables(1-t);
        if(t>=1){previousAction.stop();previousAction=null;}
      }
      // Animation groups own the rig; no extra procedural transforms on the
      // skinned model (which previously produced detached limbs).
    };
    function play(next){
      const group=stages.get(next)||stages.get('Idle')||stages.values().next().value;
      if(!group) return;
      if(active===group){current=next;return;}
      if(previousAction){previousAction.stop();previousAction=null;}
      previousAction=active;
      fadeTime=0;
      group.reset();group.start(true,1,group.from,group.to,false);
      if(previousAction&&group.setWeightForAllAnimatables){
        group.setWeightForAllAnimatables(0);
        previousAction.setWeightForAllAnimatables(1);
      }
      active=group;current=next;
    }
    function markFallback(err){
      if(failed)return;
      failed=true;
      ready=false;
      actor.characterType=forceLocal?'user-selected-local':'original-unavailable';
      if(forceLocal)legacyMeshes.forEach(m=>m.setEnabled(true));
      else legacyMeshes.forEach(m=>m.setEnabled(false));
      console.warn('[AYLA] Original realistic avatar could not load:',name,err);
      document.dispatchEvent(new CustomEvent('ayla-character-failed',{detail:{name,error:String(err)}}));
    }
    async function load(){
      if(forceLocal){markFallback('Local compatibility mode selected');return;}
      if(!B.SceneLoader || !B.SceneLoader.ImportMeshAsync){markFallback('glTF loader unavailable');return;}
      const asset = cfg.asset || (cfg.isWinston?'leo_smart.glb':'priya_casual.glb');
      let lastError=null;
      for(const library of libraries){
      let imported=null, wrap=null;
      try {
        const importResult=await tryImport(B,scene,library,asset);
        imported=importResult;
        // Babylon loads the glTF hierarchy below a top-level __root__ mesh.
        // Attach the imported hierarchy, not individual mesh children, so skin
        // weights, bones and morph-target animations retain their relationships.
        wrap=new B.TransformNode(name+'-photoreal-container',scene);
        wrap.parent=actor.root;
        wrap.scaling.setAll(cfg.scale || (cfg.isWinston?1.04:1.00));
        wrap.rotation.y=Math.PI;
        const nodes=[...importResult.meshes,...(importResult.transformNodes||[])];
        const roots=nodes.filter(n=>!n.parent);
        roots.forEach(n=>{if(n!==wrap)n.parent=wrap;});
        // These files contain several complete wardrobe options. Only show
        // the model's original clothes, otherwise overlapping outfits render
        // as spiky body parts.
        function wardrobeLabel(node){
          const raw=String(node.name||'');
          const normalized=raw.replace(/_\d+$/,'');
          if(outfits.has(normalized))return normalized;
          const parent=String(node.parent?.name||'').replace(/_\d+$/,'');
          if(outfits.has(parent))return parent;
          return null;
        }
        const hiddenParents=nodes.filter(n=>{
          const label=wardrobeLabel(n);
          return label && !showOriginal.has(label);
        });
        hiddenParents.forEach(n=>n.setEnabled(false));
        importResult.meshes.forEach(m=>{
          if(m.isPickable!==undefined)m.isPickable=false;
          if(m.material){
            // Preserve glTF alpha-tested eyelashes/hair materials.
            // Body and clothes retain their original photographic albedo.
            const kind=(m.name+' '+(m.parent?.name||'')).toLowerCase();
            if(name==='Winston' && /hair|brow/.test(kind) && m.material.albedoColor){
              m.material.albedoColor=B.Color3.FromHexString('#a1a3a0');
            }
            // Muted expedition attire: retain fabric albedo/normal textures and
            // tint *clothing only*, never skin or eyes.
            if(m.material.albedoColor && /outfit|top_shirt|top_tee|trouser|jacket|shirt/i.test(kind) && !/skin/i.test(kind)){
              const tint = name==='Ayla' ? '#a0a990' : name==='Winston' ? '#a8a99a' : /female/i.test(cfg.role||'') ? '#bdafa0' : '#a2a9ac';
              m.material.albedoColor=m.material.albedoColor.multiply(B.Color3.FromHexString(tint));
            }
          }
        });
        // Root-motion in donated avatar clips moves the mesh independently
        // of the game's collision capsule, producing start-of-walk "jumps".
        // Normalize root/hips horizontal translation to the clip's first key.
        for(const group of importResult.animationGroups||[]){
          for(const t of group.targetedAnimations||[]){
            const targetName=String(t.target?.name||'');
            const track=t.animation;
            if(!/root|hips|armature/i.test(targetName) || !/position/i.test(track?.targetProperty||''))continue;
            const keys=track.getKeys?.();
            if(!keys?.length || !keys[0].value || !('x' in keys[0].value))continue;
            const anchor=keys[0].value;
            for(const key of keys){
              if(key.value && 'x' in key.value){
                key.value=key.value.clone();key.value.x=anchor.x;key.value.z=anchor.z;
              }
            }
          }
        }
        for(const group of importResult.animationGroups||[]){
          group.stop();
          const label=String(group.name||'').replace(/^.*\|/,'').trim();
          stages.set(label,group);
        }
        if(!stages.has('Idle'))throw new Error('Idle animation missing');
        play('Idle');
        // A successful HTTP request does not guarantee a drawable WebGL avatar.
        // Check that at least one textured mesh survived wardrobe filtering
        // and compiled its Babylon material before hiding the local model.
        const drawable=importResult.meshes.filter(m=>
          typeof m.getTotalVertices==='function' && m.getTotalVertices()>0 &&
          m.isVisible!==false && m.visibility!==0 &&
          (typeof m.isEnabled!=='function'||m.isEnabled(true))
        );
        if(!drawable.length)throw new Error('No visible meshes in imported character');
        await new Promise((resolve,reject)=>{
          const started=Date.now();
          function inspect(){
            if(scene.isDisposed?.()){reject(new Error('Scene disposed during character load'));return;}
            const prepared=drawable.some(m=>{
              try{return typeof m.isReady!=='function'||m.isReady(true);}
              catch(e){return false;}
            });
            if(prepared){resolve();return;}
            if(Date.now()-started>12000){reject(new Error('Character shaders not ready'));return;}
            requestAnimationFrame(inspect);
          }
          requestAnimationFrame(inspect);
        });
        // The rig and its shaders are ready; make the visibility swap atomically.
        ready=true;
        actor.riggedAsset=asset;
        actor.characterType='rigged-textured';
        legacyMeshes.forEach(m=>m.setEnabled(false));
        document.dispatchEvent(new CustomEvent('ayla-character-ready',{detail:{name,asset,source:library}}));
        return;
      } catch(e) {
        lastError=e;
        try{
          if(wrap)wrap.dispose(false,true);
          disposeImport(imported);
        }catch(cleanupError){console.warn('[AYLA] Character cleanup:',cleanupError);}
        console.warn('[AYLA] Model source failed:',library,name,e);
      }
      }
      markFallback(lastError||new Error('Original avatar unavailable'));
    }
    actor.ready = load();
    return actor;
  }
  window.AYLACharacterFactory={...previous,create,version:'0.7.2',kind:'MIT-rigged-original-default'};
})();