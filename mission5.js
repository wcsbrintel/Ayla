/* AYLA AY-005: Advanced SOCMINT and visual intelligence, an invented farm and
   fictional cartographic grid. NEVER publish a real private-property coordinate,
   use this to identify a real person, or equate a social post with proof of a crime.
   External tools open separately and cannot return results to this game. */
(function(){
'use strict';
const locales={
pt:{
 missionTitle:'A Fazenda Oculta',missionSubtitle:'SOCMINT avançado: duas publicações, pistas visuais e uma fazenda a localizar no mapa da investigação.',
 mapTitle:'GEOINT · COMPARAÇÃO DE CENÁRIO',routeWarning:'A localização exata pertence apenas ao mapa do jogo. Fotos públicas não demonstram sozinhas titularidade, crime ou endereço real.',
 reportTitle:'DOSSIÊ AY-005 · LOCALIZAÇÃO DA FAZENDA',reportIntro:'Correlacione duas imagens, teste hipóteses cartográficas e indique a localização sustentada pelas pistas.',
 terminalFoot:'Preserve as imagens originais. Resultados automáticos de reconhecimento visual são pistas, não confirmação independente.',
 boardTitle:'SOCMINT · CORRELAÇÃO VISUAL',boardFoot:'Atribuição de conta, localização e posse dos animais são conclusões diferentes. Registre as limitações de cada fonte.',
 objectiveWinston:'Receba de Winston as instruções avançadas de SOCMINT.',objectiveTerminal:'Compare as quatro fontes no terminal: publicações, feições e cadastro.',
 objectiveMap:'Localize a cidade e o lote no mapa investigativo do jogo.',objectiveBoard:'Revise a correlação e os limites das evidências.',
 objectiveReport:'Conclua o dossiê após confirmar o ponto no cenário.',
 mentorLines:[
 'Ayla, chegou a hora de aplicar SOCMINT avançado. Uma conta oferece aves e publica fotos feitas numa propriedade rural. Não há geolocalização confiável nos posts. Compare detalhes visuais repetidos, não apenas as legendas.',
 'No terminal você verá uma porteira, uma caixa-d’água vermelha, um galpão azul e uma ponte amarela, além de um pequeno cadastro cartográfico do jogo. Use as ferramentas externas como referência, mas faça a comparação no mapa interno. Precisamos localizar a instalação do cenário sem acusar o dono de uma propriedade real.'
 ],
 legendConfirmed:'COINCIDÊNCIAS VISUAIS',legendConfirmedText:'Ponte amarela, caixa-d’água vermelha, galpão azul e curso d’água aparecem nas duas imagens.',
 legendSuspected:'INFERÊNCIAS A VALIDAR',legendSuspectedText:'O perfil pode não representar o proprietário; imagens e estruturas podem ter sido reproduzidas ou alteradas.',
 evidenceConfirmed:'Duas imagens com cenário coincidente',evidenceObserved:'As publicações exibem a mesma combinação incomum de ponte amarela, reservatório vermelho e galpão azul.',
 evidenceOpen:'Metadados e proveniência',evidenceLead:'Postagens e legenda não incluem GPS verificável. São necessários originais e datas para conclusões temporais.',
 evidenceRoute:'Mapa do cenário',evidenceRouteText:'No cadastro inventado, apenas um lote combina os três marcos e o córrego. Não corresponde a coordenadas do mundo real.',
 evidenceGap:'Limites e encaminhamento',evidenceGapText:'Documentar o cruzamento, não divulgar localização privada fora do jogo e solicitar diligências oficiais antes de afirmar ilícito.',
 question1:'1. Qual combinação sustenta uma correspondência visual forte?',
 answers1:['Uma única legenda que menciona a cidade.','A combinação de ponte amarela, reservatório vermelho, galpão azul e córrego em imagens distintas.','A suposição de que todo galpão azul contém aves.'],
 question2:'2. Qual localização corresponde às evidências no mapa do jogo?',
 answers2:['Vale das Garças, quadrante C4, lote 07.','Campo Verde, quadrante A2, lote 11.','Serra Azul, quadrante B3, lote 02.'],
 question3:'3. Qual conclusão respeita a evidência?',
 answers3:['Publicar o endereço privado e organizar uma visita sem autorização.','Atribuir o imóvel ao dono da conta como fato incontroverso.','Registrar a correspondência no cenário e encaminhar a hipótese às autoridades competentes para validação.'],
 locked:'Antes do dossiê, fale com Winston, revise quatro fontes, resolva cidade e lote no mapa e consulte o quadro.',
 successToast:'Localização fictícia correlacionada e dossiê de SOCMINT concluído.',
 finalHeading:'Uma paisagem pode ser uma pista, não uma acusação.',
 finalBody:'Ayla relacionou duas publicações, identificou os marcos visuais e selecionou Vale das Garças / quadrante C4 / lote 07 no mapa inventado. Sua análise registra o nível de confiança, as lacunas e a necessidade de confirmação oficial.',
 sources:[
  {id:'SM-501',cat:'[O] POSTAGEM DE REDE SOCIAL',title:'A entrada da propriedade',date:'PUBLICAÇÃO A · ARQUIVADA',body:'Uma publicação mostra uma porteira de madeira, caminho de terra, ponte amarela sobre um córrego, caixa-d’água vermelha e galpão de teto azul. A legenda sugere disponibilidade de aves. Não há coordenadas na imagem.',note:'OBSERVADO: elementos visuais e oferta textual. O local e a titularidade ainda não foram autenticados.'},
  {id:'SM-502',cat:'[O] SEGUNDA IMAGEM',title:'O viveiro e os mesmos marcos',date:'PUBLICAÇÃO B · ARQUIVADA',body:'Outra imagem da conta apresenta aves em um recinto. Ao fundo aparecem a mesma caixa-d’água vermelha, a ponte amarela e o galpão azul. O ângulo diferente permite comparar a disposição dos elementos.',note:'CORRELAÇÃO: a repetição de marcos é consistente com a mesma instalação, mas não comprova quem a administra.'},
  {id:'VI-503',cat:'[T] ANÁLISE VISUAL',title:'Cotejo das feições',date:'LABORATÓRIO SOCMINT · AY-005',body:'Compare forma, posição relativa e contexto: ponte amarela cruzando um córrego, reservatório vermelho sobre quatro apoios e galpão azul em plano posterior. Diferencie coincidência visual de localização confirmada.',note:'MÉTODO: confirme ao menos três elementos e descarte localidades alternativas no mapa fictício.'},
  {id:'CA-504',cat:'[T] CADASTRO CARTOGRÁFICO DO JOGO',title:'Três localidades candidatas',date:'CAMADAS INTERNAS · NÃO GEOGRÁFICAS',body:'Campo Verde / A2 / 11: galpão azul e estrada, sem ponte. Serra Azul / B3 / 02: torre vermelha e cerca, sem córrego. Vale das Garças / C4 / 07: galpão azul, caixa-d’água vermelha e ponte amarela cruzando o córrego.',note:'REFERÊNCIA: localidades e quadrantes inventados para a missão; nenhuma coordenada corresponde a uma propriedade real.'}
 ]
},
en:{
 missionTitle:'The Hidden Farm',missionSubtitle:'Advanced SOCMINT: two social posts, visual landmarks and a farm to identify on the investigative game map.',
 mapTitle:'GEOINT · SCENE COMPARISON',routeWarning:'The exact location exists only on the game map. Public photos alone do not establish ownership, an offense or a real address.',
 reportTitle:'DOSSIER AY-005 · FARM LOCATION',reportIntro:'Correlate two images, test map hypotheses and submit the location supported by visual evidence.',
 terminalFoot:'Preserve image originals. Automated visual matches are leads rather than independent proof.',
 boardTitle:'SOCMINT · VISUAL CORRELATION',boardFoot:'Account attribution, place identification and possession of wildlife are distinct claims.',
 objectiveWinston:'Receive Winston’s advanced SOCMINT briefing.',objectiveTerminal:'Review four sources: two posts, visual features and map register.',
 objectiveMap:'Select a town and plot on the fictional case map.',objectiveBoard:'Review visual comparisons and evidentiary limits.',objectiveReport:'Complete the dossier after identifying the game location.',
 mentorLines:[
 'Ayla, it is time for advanced SOCMINT. An account is offering birds and posting photographs of a rural property. None of the posts has reliable location metadata. Compare repeated physical features rather than trusting captions.',
 'Your terminal holds a wooden gate, a red water tower, a blue barn and a yellow footbridge, plus an invented map register. External tools are optional references; the actual location puzzle is solved inside this game. Do not imply a real property owner committed a crime.'
 ],
 legendConfirmed:'MATCHING LANDMARKS',legendConfirmedText:'Both pictures show a yellow bridge, red water tower, blue shed and stream.',
 legendSuspected:'STILL TO BE VERIFIED',legendSuspectedText:'The account holder might not own or manage the property; visual media may be reused or altered.',
 evidenceConfirmed:'Two posts with matching landmarks',evidenceObserved:'Both views show the unusual combination of yellow bridge, red tower and blue barn.',
 evidenceOpen:'Provenance and metadata',evidenceLead:'Posts provide no reliable GPS. Original files, posting dates and context would require independent checks.',
 evidenceRoute:'Fictional investigation map',evidenceRouteText:'Only one invented plot contains all three landmarks and the stream. There are no real-world coordinates.',
 evidenceGap:'Limits and referral',evidenceGapText:'Document the comparison, do not publish a private address, and refer any real-world inference for lawful verification.',
 question1:'1. Which combination is strong visual corroboration?',
 answers1:['One caption naming a town.','A yellow bridge, red tower, blue barn and stream appearing across independent views.','Assuming every blue barn contains wildlife.'],
 question2:'2. Which game-map plot fits the evidence?',
 answers2:['Vale das Garças, sector C4, plot 07.','Campo Verde, sector A2, plot 11.','Serra Azul, sector B3, plot 02.'],
 question3:'3. What is an appropriate finding?',
 answers3:['Publish a private address and visit without authorization.','Treat the account holder as the proven landowner.','Record the fictional match and refer any real inference for competent official verification.'],
 locked:'Talk with Winston, review four sources, solve the map location and examine the evidence board.',
 successToast:'Fictional location matched and SOCMINT dossier completed.',
 finalHeading:'A landscape is a clue, not an accusation.',
 finalBody:'Ayla compared two posts and identified Vale das Garças / C4 / 07 on the invented case map. The dossier preserves uncertainty about ownership, criminality and any real-world location.',
 sources:[
  {id:'SM-501',cat:'[O] SOCIAL POST',title:'Farm entrance photograph',date:'POST A · ARCHIVED',body:'A social post shows a wooden gate, dirt track, yellow bridge, creek, red water tower and blue-roofed barn. Its caption offers birds for contact, without a verified location.',note:'OBSERVED: scenery and listing text. Ownership, place and identity remain unconfirmed.'},
  {id:'SM-502',cat:'[O] SECOND POST',title:'Aviary with the same landmarks',date:'POST B · ARCHIVED',body:'Another view contains birds inside an aviary. A red water tower, yellow bridge and blue-roofed barn appear in the distance. Their relative arrangement can be compared with the entrance photo.',note:'CORRELATION: matching features are consistent with one setting, not proof of who operates it.'},
  {id:'VI-503',cat:'[T] VISUAL COMPARISON',title:'Cross-checking physical features',date:'SOCMINT LAB · AY-005',body:'Assess repeated shapes and relative positions: the bridge crosses a creek, the tower stands on supports, and the blue barn is behind the lawn. Compare more than one landmark and reject alternate map candidates.',note:'METHOD: triangulate visual clues; absence of reliable metadata limits certainty.'},
  {id:'CA-504',cat:'[T] FICTIONAL MAP REGISTER',title:'Three candidate plots',date:'GAME-ONLY MAP LAYER',body:'Campo Verde / A2 / 11 has a blue shed but no bridge. Serra Azul / B3 / 02 has a red tower but no creek. Vale das Garças / C4 / 07 has all three landmarks and a creek crossed by a yellow bridge.',note:'All place names, plots and grid references are invented game features, never real coordinates.'}
 ]
},
es:{
 missionTitle:'La Finca Oculta',missionSubtitle:'SOCMINT avanzado: dos publicaciones, pistas visuales y una finca en el mapa de investigación del juego.',
 mapTitle:'GEOINT · COMPARACIÓN VISUAL',routeWarning:'La ubicación exacta existe solo en el mapa del juego. Las fotos no demuestran titularidad, delito ni dirección real.',
 reportTitle:'EXPEDIENTE AY-005 · LOCALIZACIÓN DE LA FINCA',reportIntro:'Relaciona dos imágenes y comprueba las hipótesis cartográficas del juego.',
 terminalFoot:'Conserva las imágenes originales. Las coincidencias visuales automatizadas son pistas, no verificación independiente.',
 boardTitle:'SOCMINT · CORRELACIÓN VISUAL',boardFoot:'Identificar una cuenta, ubicar un lugar y atribuir posesión de fauna son afirmaciones distintas.',
 objectiveWinston:'Recibe las instrucciones SOCMINT de Winston.',objectiveTerminal:'Analiza cuatro fuentes: dos fotos, rasgos visuales y registro.',
 objectiveMap:'Selecciona ciudad y parcela en el mapa ficticio.',objectiveBoard:'Revisa las coincidencias y límites probatorios.',objectiveReport:'Entrega el expediente tras ubicar la parcela del juego.',
 mentorLines:[
 'Ayla, usarás SOCMINT avanzado. Una cuenta ofrece aves y publica fotos de una propiedad rural. Las publicaciones no contienen metadatos geográficos fiables. Compara rasgos físicos repetidos, no solo los pies de foto.',
 'Busca el puente amarillo, depósito rojo, galpón azul y arroyo. Examina tres parcelas en el mapa inventado. Las herramientas externas son referencias: la solución existe únicamente en este juego, nunca en una propiedad real.'
 ],
 legendConfirmed:'RASGOS COINCIDENTES',legendConfirmedText:'Las dos imágenes incluyen un puente amarillo, torre roja, galpón azul y arroyo.',
 legendSuspected:'HIPÓTESIS POR COMPROBAR',legendSuspectedText:'La persona de la cuenta puede no ser propietaria del lugar; las imágenes pueden estar reutilizadas.',
 evidenceConfirmed:'Dos fotos con el mismo paisaje',evidenceObserved:'Ambas vistas presentan el puente amarillo, torre roja y galpón azul.',
 evidenceOpen:'Origen y metadatos',evidenceLead:'Las publicaciones carecen de GPS fiable. Fechas y archivos originales precisan comprobación.',
 evidenceRoute:'Mapa ficticio',evidenceRouteText:'Solo una parcela inventada contiene los tres elementos y el arroyo. No hay coordenadas reales.',
 evidenceGap:'Límites y derivación',evidenceGapText:'Documentar la comparación sin difundir direcciones privadas y recurrir a comprobación oficial autorizada.',
 question1:'1. ¿Qué evidencia permite una relación visual sólida?',
 answers1:['Solo un pie de foto con una ciudad.','Puente amarillo, torre roja, galpón azul y arroyo vistos desde dos ángulos.','Suponer que todos los galpones azules contienen aves.'],
 question2:'2. ¿Qué parcela ficticia coincide?',
 answers2:['Vale das Garças, cuadrante C4, parcela 07.','Campo Verde, cuadrante A2, parcela 11.','Serra Azul, cuadrante B3, parcela 02.'],
 question3:'3. ¿Cuál es una conclusión adecuada?',
 answers3:['Publicar una dirección privada y visitar el lugar sin autorización.','Afirmar que el titular de la cuenta es el dueño probado de la finca.','Registrar la coincidencia en el juego y remitir cualquier hipótesis real a verificación oficial.'],
 locked:'Habla con Winston, revisa cuatro fuentes, resuelve el mapa y compara las pruebas.',
 successToast:'Ubicación inventada identificada y expediente SOCMINT completado.',
 finalHeading:'Un paisaje es una pista, no una acusación.',
 finalBody:'Ayla identificó Vale das Garças / C4 / 07 en el mapa inventado mediante comparación visual. El expediente conserva las dudas sobre titularidad, delito y cualquier lugar real.',
 sources:[
  {id:'SM-501',cat:'[O] PUBLICACIÓN SOCIAL',title:'Entrada de la finca',date:'PUBLICACIÓN A · ARCHIVADA',body:'Una publicación muestra puerta de madera, camino de tierra, puente amarillo, arroyo, torre roja y galpón azul. El texto ofrece aves, sin ubicación verificada.',note:'OBSERVADO: rasgos del paisaje y oferta. No se comprobó identidad, propiedad ni localización.'},
  {id:'SM-502',cat:'[O] SEGUNDA PUBLICACIÓN',title:'Aviario con los mismos rasgos',date:'PUBLICACIÓN B · ARCHIVADA',body:'Otra imagen presenta aves en una jaula y, al fondo, la torre roja, el puente amarillo y el galpón azul. Sus posiciones relativas permiten comparar perspectivas.',note:'RELACIÓN: los elementos coinciden con una misma instalación, sin confirmar quién la administra.'},
  {id:'VI-503',cat:'[T] COMPARACIÓN VISUAL',title:'Rasgos físicos comunes',date:'LABORATORIO SOCMINT · AY-005',body:'Compara forma y posición de puente, depósito elevado, techo azul y arroyo. Rechaza candidatos alternativos y no dependas de una sola referencia.',note:'MÉTODO: contrastar varias fuentes; sin GPS fiable no existe una localización real comprobada.'},
  {id:'CA-504',cat:'[T] REGISTRO CARTOGRÁFICO DEL JUEGO',title:'Tres parcelas candidatas',date:'CAPA FICTICIA',body:'Campo Verde / A2 / 11: galpón azul sin puente. Serra Azul / B3 / 02: torre roja sin arroyo. Vale das Garças / C4 / 07: galpón, torre, arroyo y puente amarillo.',note:'Nombres y cuadrantes inventados, sin correspondencia a coordenadas reales.'}
 ]
}
};
const tools=[
 {id:'lens',title:'Google Lens',url:'https://lens.google.com/',desc:{pt:'Pesquisa reversa de imagens; exige ação manual e não terá resultado para fotos inventadas.',en:'Reverse image search. Requires manual use; invented photos have no real match.',es:'Búsqueda inversa manual; imágenes inventadas sin coincidencia real.'}},
 {id:'earth',title:'Google Earth',url:'https://earth.google.com/web/',desc:{pt:'Referência para formas do terreno e comparação de elementos, sem geolocalizar este cenário.',en:'Reference for terrain and landmarks; cannot geolocate this invented scenario.',es:'Referencia de terreno y elementos, sin ubicar este escenario inventado.'}},
 {id:'osm',title:'OpenStreetMap',url:'https://www.openstreetmap.org/',desc:{pt:'Consulta cartográfica aberta; o mapa da missão é próprio do jogo.',en:'Open map reference; the mission grid is an in-game invention.',es:'Mapa abierto de referencia; la cuadrícula es del juego.'}}
];
const interfaceCopy={
 pt:{lab:'LABORATÓRIO SOCMINT',saved:'Imagens arquivadas · dados de treinamento',external:'FERRAMENTAS EXTERNAS',externalNote:'As ferramentas abrem em outra aba. Não analisam automaticamente os dados do jogo.',compare:'COMPARAR IMAGENS',result:'REGISTRO DE FEIÇÕES',bridge:'Ponte amarela',tower:'Caixa-d’água vermelha',shed:'Galpão azul',creek:'Córrego',selectTitle:'SELECIONE UMA CIDADE',selectSite:'ESCOLHA O LOTE',confirm:'VALIDAR HIPÓTESE',success:'Localização no cenário validada: Vale das Garças, C4, lote 07.',failure:'A hipótese não reúne as quatro feições. Reveja as imagens e o cadastro.',missing:'Selecione cidade e lote antes de validar.',mapHeading:'MAPA DE INVESTIGAÇÃO · CENÁRIO INTERNO',mapCaption:'Localidades e coordenadas inventadas para o jogo. Não há propriedade identificável fora do cenário.',townPlaceholder:'Escolha a cidade',sitePlaceholder:'Escolha o lote',images:'POSTS COMPARADOS'},
 en:{lab:'SOCMINT WORKBENCH',saved:'Archived training images',external:'EXTERNAL TOOLS',externalNote:'Tools open in another tab and do not automatically analyze game content.',compare:'COMPARE IMAGES',result:'LANDMARK REGISTER',bridge:'Yellow bridge',tower:'Red water tower',shed:'Blue barn',creek:'Stream',selectTitle:'SELECT A TOWN',selectSite:'SELECT A PLOT',confirm:'VALIDATE HYPOTHESIS',success:'Game location validated: Vale das Garças, C4, plot 07.',failure:'This candidate does not match all four features. Check the photos and register.',missing:'Choose a town and plot first.',mapHeading:'INVESTIGATION MAP · GAME ONLY',mapCaption:'Invented towns and grid locations. No real property address can be derived.',townPlaceholder:'Choose town',sitePlaceholder:'Choose plot',images:'COMPARED POSTS'},
 es:{lab:'LABORATORIO SOCMINT',saved:'Imágenes de entrenamiento archivadas',external:'HERRAMIENTAS EXTERNAS',externalNote:'Se abren en otra pestaña. No analizan automáticamente el juego.',compare:'COMPARAR IMÁGENES',result:'REGISTRO DE RASGOS',bridge:'Puente amarillo',tower:'Torre roja',shed:'Galpón azul',creek:'Arroyo',selectTitle:'SELECCIONA CIUDAD',selectSite:'ELIGE PARCELA',confirm:'VALIDAR HIPÓTESIS',success:'Ubicación ficticia validada: Vale das Garças, C4, parcela 07.',failure:'La parcela no reúne los cuatro rasgos; vuelve a revisar las imágenes.',missing:'Elige ciudad y parcela.',mapHeading:'MAPA DE INVESTIGACIÓN · JUEGO',mapCaption:'Ciudades y cuadrantes inventados. No se deriva ninguna dirección real.',townPlaceholder:'Elige ciudad',sitePlaceholder:'Elige parcela',images:'PUBLICACIONES COMPARADAS'}
};
const candidates=[{town:'Campo Verde',plot:'A2 / 11',features:[0,1]},{town:'Serra Azul',plot:'B3 / 02',features:[1,2]},{town:'Vale das Garças',plot:'C4 / 07',features:[0,1,2,3]}];
function e(x){return String(x).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function image(n){return '<figure class="m5-image"><div class="m5-image-header">SOCIAL POST / SM-50'+n+'</div><img src="assets/mission5-social-'+n+'.webp" loading="eager" alt="Farm image '+n+'"><figcaption>@aviario_verde · '+(n===1?'POST A':'POST B')+' / AY-005</figcaption></figure>';}
function toolbox(lang){
const c=interfaceCopy[lang]||interfaceCopy.en;
return '<section class="m5-toolbox"><strong>'+e(c.external)+'</strong><p>'+e(c.externalNote)+'</p><div class="m5-tools">'+tools.map(t=>'<a href="'+t.url+'" target="_blank" rel="noopener noreferrer">'+e(t.title)+' ↗</a>').join('')+'</div><small>'+tools.map(t=>e(t.title)+': '+e(t.desc[lang]||t.desc.en)).join(' · ')+'</small></section>';
}
function renderEvidence(i,lang){
 const c=interfaceCopy[lang]||interfaceCopy.en;
 if(i<=1)return image(i+1)+toolbox(lang);
 if(i===2)return '<div class="m5-comparison"><h3>'+e(c.lab)+'</h3><div class="m5-photo-pair">'+image(1)+image(2)+'</div><h4>'+e(c.result)+'</h4><div class="m5-feature-grid">'+[c.bridge,c.tower,c.shed,c.creek].map(x=>'<span>✓ '+e(x)+'</span>').join('')+'</div>'+toolbox(lang)+'</div>';
 return '<div class="m5-register"><h3>'+e(c.mapHeading)+'</h3>'+candidates.map(p=>'<div><b>'+e(p.town)+'</b><strong>'+e(p.plot)+'</strong><span>'+p.features.length+'/4 '+e(c.result)+'</span></div>').join('')+'<p>'+e(c.mapCaption)+'</p></div>';
}
function renderMap(lang, state){
 const c=interfaceCopy[lang]||interfaceCopy.en,selectedTown=state?.m5Town||'',selectedPlot=state?.m5Plot||'',solved=!!state?.m5Solved;
 const opts=candidates.map(p=>'<option value="'+e(p.town)+'" '+(selectedTown===p.town?'selected':'')+'>'+e(p.town)+'</option>').join('');
 const plots=candidates.map(p=>'<option value="'+e(p.plot)+'" '+(selectedPlot===p.plot?'selected':'')+'>'+e(p.plot)+'</option>').join('');
 return '<section class="m5-geo-workbench"><h3>'+e(c.mapHeading)+'</h3><p>'+e(c.mapCaption)+'</p><div class="m5-map-photos">'+image(1)+image(2)+'</div><div class="m5-map-features">'+[c.bridge,c.tower,c.shed,c.creek].map(x=>'<span>✓ '+e(x)+'</span>').join('')+'</div>'+toolbox(lang)+'<div class="m5-map-select"><label>'+e(c.selectTitle)+'<select id="m5-town"><option value="">'+e(c.townPlaceholder)+'</option>'+opts+'</select></label><label>'+e(c.selectSite)+'<select id="m5-plot"><option value="">'+e(c.sitePlaceholder)+'</option>'+plots+'</select></label><button class="primary-button" id="m5-check" type="button">'+e(c.confirm)+'</button></div><div id="m5-result" role="status">'+(solved?e(c.success):'')+'</div></section>';
}
window.AYLAMissionFive={locales,answer:[1,0,2],tools,candidates,renderEvidence,renderMap,copy:lang=>interfaceCopy[lang]||interfaceCopy.en,valid:(t,p)=>t==='Vale das Garças'&&p==='C4 / 07'};
})();
