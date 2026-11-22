/* PEC MAN — original wildlife-intelligence maze arcade for AYLA.
 * Independent from the canonical mission save and restricted Observatory.
 */
(function(){
  'use strict';
  const root=document.getElementById('app');
  if(!root || window.AYLAPecMan)return;
  const W=25,H=19,CELL=30,STORE='ayla-pec-man-record-v1';
  const dirs={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
  const labels={
    pt:{subtitle:'ARCADE DE INTELIGÊNCIA',play:'JOGAR PEC MAN',start:'PEC MAN — INICIAR',resume:'CONTINUAR',restart:'REINICIAR',pause:'PAUSAR',exit:'VOLTAR À CENTRAL',score:'PONTUAÇÃO',record:'RECORDE PEC MAN',lives:'VIDAS',level:'FASE',remaining:'PISTAS',ready:'COLETE AS PISTAS',readyBody:'Percorra o labirinto, recolha todas as pistas e evite os perseguidores. As pistas especiais permitem neutralizá-los por alguns segundos.',paused:'JOGO PAUSADO',pausedBody:'Continue quando estiver pronto.',over:'FIM DE JOGO',overBody:'Sua pontuação foi registrada neste dispositivo.',clear:'FASE CONCLUÍDA',clearBody:'Todas as pistas coletadas. Próxima fase!',controls:'SETAS OU WASD PARA MOVER · P PARA PAUSAR · ESC PARA SAIR',tip:'Pistas especiais concedem proteção temporária. Cada fase vale um bônus de 500 pontos.',bonus:'DOSSIÊ COLETADO +250',power:'PROTEÇÃO ATIVA',newRecord:'NOVO RECORDE'},
    en:{subtitle:'INTELLIGENCE ARCADE',play:'PLAY PEC MAN',start:'PEC MAN — START',resume:'RESUME',restart:'RESTART',pause:'PAUSE',exit:'BACK TO OPERATIONS CENTER',score:'SCORE',record:'PEC MAN HIGH SCORE',lives:'LIVES',level:'LEVEL',remaining:'CLUES',ready:'COLLECT THE CLUES',readyBody:'Navigate the maze, collect every clue and avoid the pursuers. Special clues let you neutralize them for a few seconds.',paused:'GAME PAUSED',pausedBody:'Resume when ready.',over:'GAME OVER',overBody:'Your score has been saved on this device.',clear:'LEVEL COMPLETE',clearBody:'All clues collected. Next level!',controls:'ARROWS OR WASD TO MOVE · P TO PAUSE · ESC TO EXIT',tip:'Special clues grant temporary protection. Each cleared level earns a 500-point bonus.',bonus:'DOSSIER COLLECTED +250',power:'PROTECTION ACTIVE',newRecord:'NEW HIGH SCORE'},
    es:{subtitle:'ARCADE DE INTELIGENCIA',play:'JUGAR PEC MAN',start:'PEC MAN — INICIAR',resume:'CONTINUAR',restart:'REINICIAR',pause:'PAUSAR',exit:'VOLVER AL CENTRO',score:'PUNTUACIÓN',record:'RÉCORD PEC MAN',lives:'VIDAS',level:'NIVEL',remaining:'PISTAS',ready:'RECOGE LAS PISTAS',readyBody:'Recorre el laberinto, reúne todas las pistas y evita a los perseguidores. Las pistas especiales permiten neutralizarlos durante unos segundos.',paused:'JUEGO EN PAUSA',pausedBody:'Continúa cuando estés listo.',over:'FIN DEL JUEGO',overBody:'Tu puntuación se guardó en este dispositivo.',clear:'NIVEL COMPLETADO',clearBody:'Todas las pistas recogidas. ¡Siguiente nivel!',controls:'FLECHAS O WASD PARA MOVER · P PARA PAUSAR · ESC PARA SALIR',tip:'Las pistas especiales conceden protección temporal. Cada nivel superado da 500 puntos extra.',bonus:'EXPEDIENTE RECOGIDO +250',power:'PROTECCIÓN ACTIVA',newRecord:'NUEVO RÉCORD'}
  };
  const section=document.createElement('section');
  section.id='pecManScreen';
  section.className='pecman-screen hidden';
  section.setAttribute('role','dialog');
  section.setAttribute('aria-modal','true');
  section.setAttribute('aria-labelledby','pecManTitle');
  section.innerHTML='<div class="pecman-shell">'+
    '<header class="pecman-header"><div class="pecman-brand"><span class="pecman-symbol" aria-hidden="true">◈</span><div><small id="pecManSubtitle"></small><h2 id="pecManTitle">PEC <span>MAN</span></h2></div></div><button type="button" class="pecman-exit" id="pecManExit"></button></header>'+
    '<div class="pecman-stats"><div><small id="pecManScoreLabel"></small><strong id="pecManScore">0</strong></div><div><small id="pecManRecordLabel"></small><strong id="pecManRecord">0</strong></div><div><small id="pecManLevelLabel"></small><strong id="pecManLevel">1</strong></div><div><small id="pecManLivesLabel"></small><strong id="pecManLives">♥ ♥ ♥</strong></div><div><small id="pecManRemainingLabel"></small><strong id="pecManRemaining">0</strong></div></div>'+
    '<div class="pecman-body"><div class="pecman-stage"><canvas id="pecManCanvas" width="750" height="570" aria-label="PEC MAN maze" role="img"></canvas><div class="pecman-curtain" id="pecManCurtain"><div class="pecman-curtain-card"><span class="pecman-mini">AYLA / PEC MAN</span><h3 id="pecManCurtainTitle"></h3><p id="pecManCurtainBody"></p><button type="button" class="primary-button" id="pecManStart"></button></div></div></div>'+
    '<aside class="pecman-sidebar"><div class="pecman-power" id="pecManPower" hidden><span id="pecManPowerLabel"></span><div class="pecman-power-track"><i id="pecManPowerFill"></i></div></div><p id="pecManTip"></p><div class="pecman-touch"><button data-pm-dir="up" aria-label="Up">▲</button><div><button data-pm-dir="left" aria-label="Left">◀</button><button data-pm-dir="down" aria-label="Down">▼</button><button data-pm-dir="right" aria-label="Right">▶</button></div></div><div class="pecman-actions"><button id="pecManPause" type="button"></button><button id="pecManRestart" type="button"></button></div><small id="pecManControls"></small></aside></div>'+
    '<div id="pecManLive" class="pecman-live" role="status" aria-live="polite"></div></div>';
  root.appendChild(section);
  const $=id=>document.getElementById(id);
  const canvas=$('pecManCanvas'),ctx=canvas.getContext('2d');
  let locale='pt',closeCallback=null,open=false,mode='ready',lastFrame=0,frameId=0;
  let maze=[],dots=[],player={x:1,y:1,dir:'right',wish:'right'},ghosts=[],score=0,best=0,lives=3,level=1,remaining=0;
  let activePower=0,invulnerable=0,bonus=null,bonusShown=false,playerAcc=0,ghostAcc=0,noticeUntil=0,noticeText='';
  const millis=()=>performance.now();
  const msg=()=>labels[locale]||labels.pt;
  try{best=Math.max(0,Math.floor(Number(localStorage.getItem(STORE)||0))||0);}catch(e){}
  function seeded(seed){let n=seed>>>0;return ()=>{n=(1664525*n+1013904223)>>>0;return n/4294967296;};}
  function createMaze(seed){
    const grid=Array.from({length:H},()=>Array(W).fill(1));
    const rng=seeded(82133+seed*1777), stack=[[1,1]];
    grid[1][1]=0;
    while(stack.length){
      const cur=stack[stack.length-1],choices=[];
      for(const d of Object.values(dirs)){
        const nx=cur[0]+d.x*2,ny=cur[1]+d.y*2;
        if(nx>0&&ny>0&&nx<W-1&&ny<H-1&&grid[ny][nx])choices.push([nx,ny,d.x,d.y]);
      }
      if(!choices.length){stack.pop();continue;}
      const c=choices[Math.floor(rng()*choices.length)];
      grid[cur[1]+c[3]][cur[0]+c[2]]=0;grid[c[1]][c[0]]=0;stack.push([c[0],c[1]]);
    }
    // Cross connections make the maze tactical rather than one long corridor.
    for(let y=2;y<H-2;y++)for(let x=2;x<W-2;x++){
      if(!grid[y][x])continue;
      const horizontal=!grid[y][x-1]&&!grid[y][x+1];
      const vertical=!grid[y-1][x]&&!grid[y+1][x];
      if((horizontal||vertical)&&rng()<.34)grid[y][x]=0;
    }
    return grid;
  }
  function walkable(x,y){return y>=0&&y<H&&x>=0&&x<W&&maze[y][x]===0;}
  function nearestOpen(cx,cy){
    if(walkable(cx,cy))return {x:cx,y:cy};
    for(let d=1;d<W+H;d++)for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){
      if(Math.abs(x-cx)+Math.abs(y-cy)===d&&walkable(x,y))return {x,y};
    }
    return {x:1,y:1};
  }
  const ghostColors=['#f27966','#cf8fea','#ffbf6d'];
  const ghostCorners=[{x:W-2,y:H-2},{x:W-2,y:1},{x:1,y:H-2}];
  function newLevel(){
    maze=createMaze(level);
    dots=maze.map(row=>row.map(cell=>cell?0:1));
    player={x:1,y:1,dir:'right',wish:'right'};
    const corners=[[1,1],[W-2,1],[1,H-2],[W-2,H-2]];
    corners.forEach(([x,y])=>{const p=nearestOpen(x,y);dots[p.y][p.x]=2;});
    ghosts=ghostCorners.map((c,i)=>{const p=nearestOpen(c.x,c.y);return {x:p.x,y:p.y,home:{x:p.x,y:p.y},color:ghostColors[i],dir:'left',inactiveUntil:0};});
    dots[1][1]=0;
    for(const g of ghosts)dots[g.y][g.x]=0;
    remaining=dots.reduce((n,row)=>n+row.filter(v=>v>0).length,0);
    bonus=nearestOpen((W/2)|0,(H/2)|0);bonusShown=false;
    playerAcc=0;ghostAcc=0;activePower=0;invulnerable=millis()+2200;
    refreshHud();
  }
  function newGame(){
    score=0;lives=3;level=1;mode='ready';newLevel();render();
    setCurtain('ready');
  }
  function addScore(amount){
    score+=amount;
    if(score>best){best=score;try{localStorage.setItem(STORE,String(best));}catch(e){}}
  }
  function refreshHud(){
    $('pecManScore').textContent=score.toLocaleString(locale==='pt'?'pt-BR':locale==='es'?'es-ES':'en-US');
    $('pecManRecord').textContent=best.toLocaleString(locale==='pt'?'pt-BR':locale==='es'?'es-ES':'en-US');
    $('pecManLevel').textContent=level;
    $('pecManLives').textContent=Array.from({length:lives},()=> '♥').join(' ')||'—';
    $('pecManRemaining').textContent=remaining;
    const powerLeft=Math.max(0,activePower-millis());
    $('pecManPower').hidden=powerLeft===0;
    $('pecManPowerFill').style.width=(100*Math.min(1,powerLeft/7500)).toFixed(1)+'%';
    $('pecManPause').disabled=mode==='ready'||mode==='gameover'||mode==='clear';
    $('pecManPause').textContent=mode==='paused'?msg().resume:msg().pause;
  }
  function setCurtain(kind){
    const t=msg();
    $('pecManCurtain').classList.toggle('hidden',kind==='playing');
    if(kind==='playing')return;
    const heads={ready:t.ready,paused:t.paused,gameover:t.over,clear:t.clear};
    const bodies={ready:t.readyBody,paused:t.pausedBody,gameover:t.overBody,clear:t.clearBody};
    $('pecManCurtainTitle').textContent=heads[kind]||t.ready;
    $('pecManCurtainBody').textContent=bodies[kind]||t.readyBody;
    $('pecManStart').textContent=kind==='gameover'?t.restart:kind==='ready'?t.start:t.resume;
  }
  function notice(s){noticeText=s;noticeUntil=millis()+1600;$('pecManLive').textContent=s;}
  function start(){
    if(mode==='gameover')newGame();
    if(mode==='clear'){level++;newLevel();}
    mode='playing';lastFrame=millis();playerAcc=0;ghostAcc=0;
    setCurtain('playing');refreshHud();
    $('pecManStart').blur();
  }
  function pause(){if(mode==='playing'){mode='paused';setCurtain('paused');}else if(mode==='paused')start();refreshHud();}
  function setDirection(direction){if(dirs[direction])player.wish=direction;}
  function nextStep(x,y,dir){return {x:x+dirs[dir].x,y:y+dirs[dir].y};}
  function movePlayer(){
    let p=nextStep(player.x,player.y,player.wish);
    if(walkable(p.x,p.y))player.dir=player.wish;
    else p=nextStep(player.x,player.y,player.dir);
    if(walkable(p.x,p.y)){player.x=p.x;player.y=p.y;}
    const item=dots[player.y][player.x];
    if(item){
      dots[player.y][player.x]=0;remaining--;
      addScore(item===2?50:10);
      if(item===2){activePower=millis()+7500;notice(msg().power);}
      if(!bonusShown && score>=500)bonusShown=true;
      if(remaining===0){addScore(500);mode='clear';setCurtain('clear');notice(msg().clear);}
    }
    if(bonusShown&&bonus&&player.x===bonus.x&&player.y===bonus.y){
      addScore(250);bonus=null;notice(msg().bonus);
    }
  }
  function bfsDirection(entity,target){
    const queue=[{x:entity.x,y:entity.y,first:null}],seen=new Set([entity.y*W+entity.x]);
    for(let k=0;k<queue.length;k++){
      const p=queue[k];
      if(p.x===target.x&&p.y===target.y)return p.first||entity.dir;
      for(const d of ['up','left','down','right']){
        const n=nextStep(p.x,p.y,d),index=n.y*W+n.x;
        if(!walkable(n.x,n.y)||seen.has(index))continue;
        seen.add(index);queue.push({x:n.x,y:n.y,first:p.first||d});
      }
    }
    return entity.dir;
  }
  function moveGhost(g,i,now){
    if(now<g.inactiveUntil)return;
    const choices=Object.keys(dirs).filter(d=>{const p=nextStep(g.x,g.y,d);return walkable(p.x,p.y);});
    if(!choices.length)return;
    const vulnerable=now<activePower;
    const target=vulnerable?g.home:(i===0?player:i===1?{x:player.x,y:g.y}:{x:g.x,y:player.y});
    let picked=bfsDirection(g,target);
    if(vulnerable || (i===2&&Math.random()<.22)){
      // Keep pursuers moving, with occasional evasive or exploratory turns.
      const ordered=choices.slice().sort((a,b)=>{
        const pa=nextStep(g.x,g.y,a),pb=nextStep(g.x,g.y,b);
        const da=Math.abs(pa.x-player.x)+Math.abs(pa.y-player.y);
        const db=Math.abs(pb.x-player.x)+Math.abs(pb.y-player.y);
        return vulnerable?db-da:da-db;
      });
      picked=vulnerable?ordered[0]:ordered[Math.floor(Math.random()*Math.min(2,ordered.length))];
    }
    if(!choices.includes(picked))picked=choices[0];
    const p=nextStep(g.x,g.y,picked);
    g.x=p.x;g.y=p.y;g.dir=picked;
  }
  function checkCollision(now){
    if(now<invulnerable)return;
    for(let i=0;i<ghosts.length;i++){
      const g=ghosts[i];
      if(now<g.inactiveUntil||g.x!==player.x||g.y!==player.y)continue;
      if(now<activePower){
        addScore(200);g.x=g.home.x;g.y=g.home.y;g.inactiveUntil=now+1800;notice('+200');
      }else{
        lives--;invulnerable=now+2700;player.x=1;player.y=1;player.dir='right';player.wish='right';
        ghosts.forEach((enemy,index)=>{enemy.x=enemy.home.x;enemy.y=enemy.home.y;enemy.inactiveUntil=now+750+index*250;});
        activePower=0;
        if(lives===0){mode='gameover';setCurtain('gameover');}
      }
      refreshHud();return;
    }
  }
  function tick(dt,now){
    if(mode!=='playing')return;
    playerAcc+=dt;ghostAcc+=dt;
    const pStep=Math.max(82,118-level*3),gStep=Math.max(108,173-level*7);
    if(playerAcc>=pStep){playerAcc%=pStep;movePlayer();checkCollision(now);}
    if(mode!=='playing')return;
    if(ghostAcc>=gStep){
      ghostAcc%=gStep;
      ghosts.forEach((g,i)=>{moveGhost(g,i,now);checkCollision(now);});
    }
  }
  function roundRect(x,y,w,h,r,color){
    ctx.fillStyle=color;
    ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();
  }
  function draw(){
    if(!ctx)return;
    const now=millis();
    ctx.fillStyle='#071715';ctx.fillRect(0,0,W*CELL,H*CELL);
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){
      const px=x*CELL,py=y*CELL;
      if(maze[y][x]){
        roundRect(px+2,py+2,CELL-4,CELL-4,6,'#16403b');
        roundRect(px+5,py+5,CELL-10,CELL-10,3,'#1e6558');
        continue;
      }
      ctx.fillStyle=((x+y)%2)?'#071c19':'#081f1b';ctx.fillRect(px,py,CELL,CELL);
      const dot=dots[y][x];
      if(dot){
        const pulse=dot===2?1+Math.sin(now/170)*.15:1;
        ctx.beginPath();ctx.arc(px+CELL/2,py+CELL/2,(dot===2?7:2.9)*pulse,0,Math.PI*2);
        ctx.fillStyle=dot===2?'#e7d484':'#88df9d';ctx.fill();
        if(dot===2){ctx.strokeStyle='#e7d48488';ctx.lineWidth=2;ctx.strokeRect(px+8,py+8,14,14);}
      }
    }
    if(bonusShown&&bonus){
      const bx=(bonus.x+.5)*CELL,by=(bonus.y+.5)*CELL;
      ctx.save();ctx.translate(bx,by);ctx.rotate(now/1200);ctx.fillStyle='#f6cf81';ctx.fillRect(-8,-8,16,16);ctx.strokeStyle='#0d392d';ctx.lineWidth=2;ctx.strokeRect(-5,-5,10,10);ctx.restore();
    }
    for(let i=0;i<ghosts.length;i++){
      const g=ghosts[i],cx=(g.x+.5)*CELL,cy=(g.y+.5)*CELL;
      if(now<g.inactiveUntil)continue;
      ctx.save();ctx.translate(cx,cy);
      const frightened=now<activePower;
      ctx.fillStyle=frightened?'#79a7f5':g.color;
      ctx.beginPath();ctx.moveTo(0,-12);ctx.quadraticCurveTo(13,-9,12,3);ctx.lineTo(12,11);ctx.lineTo(5,7);ctx.lineTo(0,12);ctx.lineTo(-5,7);ctx.lineTo(-12,11);ctx.lineTo(-12,3);ctx.quadraticCurveTo(-13,-9,0,-12);ctx.fill();
      ctx.fillStyle='#f3fbff';ctx.beginPath();ctx.ellipse(-4,-2,3.7,5,0,0,Math.PI*2);ctx.ellipse(5,-2,3.7,5,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#112525';ctx.beginPath();ctx.arc(-3,-1,1.8,0,Math.PI*2);ctx.arc(6,-1,1.8,0,Math.PI*2);ctx.fill();ctx.restore();
    }
    const cx=(player.x+.5)*CELL,cy=(player.y+.5)*CELL;
    if(now>=invulnerable||Math.floor(now/120)%2===0){
      const angle={right:0,down:Math.PI/2,left:Math.PI,up:-Math.PI/2}[player.dir]||0;
      ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);
      ctx.fillStyle='#c6ef6f';ctx.beginPath();const mouth=.15+.23*Math.abs(Math.sin(now/100));ctx.moveTo(0,0);ctx.arc(0,0,12,mouth,Math.PI*2-mouth,false);ctx.closePath();ctx.fill();
      ctx.fillStyle='#14391d';ctx.beginPath();ctx.arc(1,-7,2,0,Math.PI*2);ctx.fill();ctx.restore();
    }
    if(noticeUntil>now){ctx.fillStyle='#d3fba9';ctx.font='bold 14px monospace';ctx.textAlign='center';ctx.fillText(noticeText,W*CELL/2,23);}
  }
  function render(){if(maze.length)draw();}
  function frame(now){
    if(!open){frameId=0;return;}
    const delta=lastFrame?Math.min(now-lastFrame,65):16;lastFrame=now;
    tick(delta,now);render();refreshHud();
    frameId=requestAnimationFrame(frame);
  }
  function openGame(language,onClose){
    if(open)return;
    locale=labels[language]?language:'pt';
    closeCallback=onClose;
    open=true;section.classList.remove('hidden');
    if(!maze.length)newGame();
    else if(mode==='playing'){mode='paused';setCurtain('paused');}
    setLanguage(locale);lastFrame=0;
    if(!frameId)frameId=requestAnimationFrame(frame);
    $('pecManExit').focus();
  }
  function closeGame(){
    open=false;
    section.classList.add('hidden');
    if(mode==='playing'){mode='paused';setCurtain('paused');}
    if(frameId){cancelAnimationFrame(frameId);frameId=0;}
    lastFrame=0;
  }
  function setLanguage(l){
    if(labels[l])locale=l;
    const t=msg();
    const fields={pecManSubtitle:t.subtitle,pecManExit:t.exit,pecManScoreLabel:t.score,pecManRecordLabel:t.record,pecManLevelLabel:t.level,pecManLivesLabel:t.lives,pecManRemainingLabel:t.remaining,pecManTip:t.tip,pecManControls:t.controls,pecManPowerLabel:t.power};
    Object.keys(fields).forEach(id=>{$(id).textContent=fields[id];});
    $('pecManRestart').textContent=t.restart;
    setCurtain(mode);refreshHud();
  }
  $('pecManExit').addEventListener('click',()=>{if(closeCallback)closeCallback();else closeGame();});
  $('pecManStart').addEventListener('click',start);
  $('pecManPause').addEventListener('click',pause);
  $('pecManRestart').addEventListener('click',()=>newGame());
  document.querySelectorAll('[data-pm-dir]').forEach(button=>button.addEventListener('pointerdown',e=>{e.preventDefault();setDirection(button.dataset.pmDir);}));
  window.addEventListener('keydown',function(e){
    if(!open)return;
    const k=e.key.toLowerCase(),map={arrowup:'up',w:'up',arrowdown:'down',s:'down',arrowleft:'left',a:'left',arrowright:'right',d:'right'};
    if(map[k] || ['p',' ','enter','escape'].includes(k)){
      e.preventDefault();e.stopImmediatePropagation();
      if(map[k])setDirection(map[k]);
      else if(k==='escape'){$('pecManExit').click();}
      else if(k==='p')pause();
      else if(mode!=='playing')start();
    }
  },true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&open&&mode==='playing')pause();});
  window.addEventListener('blur',()=>{if(open&&mode==='playing')pause();});
  window.AYLAPecMan={open:openGame,close:closeGame,setLanguage,isOpen:()=>open};
})();
