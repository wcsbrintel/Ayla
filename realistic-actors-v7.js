/* AYLA 0.7 — realistic rigged character loader.
 * Characters: Microsoft Rocketbox Avatar Library (MIT), as distributed by
 * https://github.com/memoriesrohit/avatar-studio (Rohit Biradar, MIT).
 * The models use separate outfit, skin and head meshes with baked mocap clips.
 * Legacy procedural geometry is kept hidden as an offline fallback only.
 */
(function () {
  'use strict';
  const previous = window.AYLACharacterFactory;
  if (!previous || typeof previous.create !== 'function') return;
  const library = 'https://cdn.jsdelivr.net/gh/memoriesrohit/avatar-studio@2fd9ec82fbe1613d40ae38aadcca3f410725f740/models/';
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
    legacyMeshes.forEach(m => m.setEnabled(false));
    let ready=false,failed=false,active=null, current='Idle',seated=false,interaction='idle',talking=false;
    const stages = new Map();
    const name = cfg.isWinston ? 'Winston' : 'Ayla';
    actor.visualVersion = '0.7';
    actor.characterType = 'rigged-textured';
    actor.isRiggedReady = ()=>ready;
    actor.setInteraction = function (id) { interaction=id||'idle'; origInteraction?.(id); };
    actor.setCinematic = function (id) { interaction=id||'idle'; };
    actor.setSeated = function (value) { seated=!!value; origSeat?.(value); };
    actor.setDialogue = function (value) { talking=!!value; origDialogue?.(value); };
    actor.setTalking = function (value) { talking=!!value; origTalking?.(value); };
    actor.animate = function (dt,moving,sprint,now) {
      if(!ready) {if(failed) origAnimate(dt,moving,sprint,now);return;}
      let next='Idle';
      if(moving) next=sprint?'Walk':'Walk';
      else if(talking) next=cfg.isWinston?'Talk':'Confident';
      else if(seated) next='Think';
      else if(interaction==='terminal'||interaction==='report') next='Think';
      else if(interaction==='map'||interaction==='board') next='Think';
      else if(interaction==='winston')next='Talk';
      if(next!==current) play(next);
      if(active && moving) active.speedRatio=sprint?1.65:1.0;
      if(active && !moving) active.speedRatio=1;
      // Animation groups own the rig; no extra procedural transforms on the
      // skinned model (which previously produced detached limbs).
    };
    function play(next){
      const group=stages.get(next)||stages.get('Idle')||stages.values().next().value;
      if(!group) return;
      if(active===group){current=next;return;}
      if(active)active.stop();
      group.reset();group.start(true,1,group.from,group.to,false);
      active=group;current=next;
    }
    function markFallback(err){
      failed=true;
      legacyMeshes.forEach(m=>m.setEnabled(true));
      console.warn('[AYLA] External avatar unavailable; retaining procedural backup:',err);
    }
    async function load(){
      if(!B.SceneLoader || !B.SceneLoader.ImportMeshAsync){markFallback('glTF loader unavailable');return;}
      const asset = cfg.isWinston?'leo_smart.glb':'priya_casual.glb';
      try {
        const importResult=await B.SceneLoader.ImportMeshAsync('',library,asset,scene);
        // Babylon loads the glTF hierarchy below a top-level __root__ mesh.
        // Attach the imported hierarchy, not individual mesh children, so skin
        // weights, bones and morph-target animations retain their relationships.
        const wrap=new B.TransformNode(name+'-photoreal-container',scene);
        wrap.parent=actor.root;
        wrap.scaling.setAll(cfg.isWinston?1.12:1.18);
        wrap.rotation.y=Math.PI;
        const nodes=[...importResult.meshes,...(importResult.transformNodes||[])];
        const roots=nodes.filter(n=>!n.parent);
        roots.forEach(n=>{if(n!==wrap)n.parent=wrap;});
        // These files contain several complete wardrobe options. Only show
        // the model's original clothes, otherwise overlapping outfits render
        // as spiky body parts.
        const hiddenParents=nodes.filter(n=>outfits.has(n.name) && !showOriginal.has(n.name));
        hiddenParents.forEach(n=>n.setEnabled(false));
        importResult.meshes.forEach(m=>{
          if(m.isPickable!==undefined)m.isPickable=false;
          if(m.material){
            m.material.backFaceCulling=true;
            // Keep skin and clothing textures intact: no flat green re-tint.
          }
        });
        for(const group of importResult.animationGroups||[]){
          group.stop();
          const label=String(group.name||'').replace(/^.*\|/,'').trim();
          stages.set(label,group);
        }
        if(!stages.has('Idle'))throw new Error('Idle animation missing');
        play('Idle');
        ready=true; actor.riggedAsset=asset;
        document.dispatchEvent(new CustomEvent('ayla-character-ready',{detail:{name,asset}}));
      } catch(e) {markFallback(e);}
    }
    actor.ready = load();
    return actor;
  }
  window.AYLACharacterFactory={...previous,create,version:'0.7',kind:'MIT-rigged-avatar'};
})();