/* AYLA mission library and durable local progress — v2.
   Mission 2 is a fictional training exercise; codes, places and people are invented.
   Browser storage is per device/browser, not an identity or cloud synchronization. */
(function(){
 'use strict';
 const KEY='ayla-missions-v2',LEGACY='ayla-alpha-v01';
 const ids=['AY-001','AY-002','AY-003','AY-004','AY-005'];
 const empty=()=>({mentorMet:false,mapSeen:false,boardSeen:false,done:false,sources:[],completed:false,m5Town:'',m5Plot:'',m5Solved:false});
 function sanitizeState(s){
   const d=empty();if(!s||typeof s!=='object')return d;
   d.mentorMet=!!s.mentorMet;d.mapSeen=!!s.mapSeen;d.boardSeen=!!s.boardSeen;
   d.done=!!s.done;d.completed=!!s.completed||d.done;
   d.sources=Array.isArray(s.sources)?[...new Set(s.sources.filter(v=>Number.isInteger(v)&&v>=0&&v<4))]:[];
   d.m5Town=typeof s.m5Town==='string'?s.m5Town.slice(0,90):'';
   d.m5Plot=typeof s.m5Plot==='string'?s.m5Plot.slice(0,35):'';
   d.m5Solved=!!s.m5Solved;
   return d;
 }
 const defaults=()=>({version:2,active:'AY-001',introSeen:false,newsSeen:false,debriefPending:false,level2:false,missions:{'AY-001':empty(),'AY-002':empty(),'AY-003':empty(),'AY-004':empty(),'AY-005':empty()}});
 let store=defaults();
 try{
   const saved=JSON.parse(localStorage.getItem(KEY)||'null');
   if(saved&&saved.version===2&&saved.missions){
     store.missions['AY-001']=sanitizeState(saved.missions['AY-001']);
     store.missions['AY-002']=sanitizeState(saved.missions['AY-002']);
     store.missions['AY-003']=sanitizeState(saved.missions['AY-003']);
     store.missions['AY-004']=sanitizeState(saved.missions['AY-004']);
     store.missions['AY-005']=sanitizeState(saved.missions['AY-005']);
     store.active=ids.includes(saved.active)?saved.active:'AY-001';
     store.introSeen=!!saved.introSeen;
     store.newsSeen=!!saved.newsSeen;store.debriefPending=!!saved.debriefPending;store.level2=!!saved.level2;
   }else{
     const legacy=JSON.parse(localStorage.getItem(LEGACY)||'null');
     if(legacy){
       store.missions['AY-001']=sanitizeState(legacy);
       store.introSeen=!!(legacy.done||legacy.mentorMet||legacy.mapSeen||legacy.boardSeen||(legacy.sources||[]).length);
     }
   }
 }catch(e){console.warn('[AYLA] Saved mission data could not be read',e);}
 const title={
   pt:{header:'MISSÕES DE INVESTIGAÇÃO',intro:'Seu progresso é salvo neste navegador. Você pode retomar uma investigação sem repetir as anteriores.',available:'DISPONÍVEL',inProgress:'EM ANDAMENTO',finished:'CONCLUÍDA',locked:'BLOQUEADA',start:'INICIAR',resume:'RETOMAR',review:'REVISITAR',replay:'REJOGAR',missions:'MISSÕES',next:'PRÓXIMA MISSÃO',select:'ESCOLHER MISSÃO',back:'VOLTAR',backup:'COPIAR CÓDIGO DE PROGRESSO',restore:'IMPORTAR PROGRESSO',importPrompt:'Cole o código de progresso copiado de outro navegador:',importSuccess:'Progresso recuperado neste navegador.',importFailure:'Código inválido. Nenhum progresso foi alterado.',backupSuccess:'Código copiado. Guarde-o para restaurar seu progresso em outro dispositivo.',backupFallback:'Copie este código e guarde-o para restaurar o progresso:',unlock:'Conclua a Missão 1 para desbloquear.',local:'Salvo neste dispositivo. Use o código para transferir o progresso.',m1:'O Manifesto Inconsistente',m1Description:'Compare fontes contraditórias e separe fatos de hipóteses sobre uma apreensão de aves.',m2:'O Código Duplicado',m2Description:'Investigue uma numeração de anilha repetida sem confundir indícios de fraude com prova de crime.',m3:'A Oferta Internacional',m3Description:'Investigue ofertas de animais em redes sociais, um telefone recorrente e tentativas de aliciar um informante para transportar ovos em aeroporto.',m4:'As Seis Travessias',m4Description:'Investigue a ligação de um estaleiro de Santa Catarina ao processamento de barbatanas e o histórico de seis viagens de um contêiner à Ásia em 2025.',m5:'A Fazenda Oculta',m5Description:'Use SOCMINT para comparar fotografias da fazenda e identificar a cidade e o lote em um mapa criado para o jogo.',unlock5:'Alcance o Nível 2 conversando com Winston após a Missão 4.',needFinish5:'Conclua a Missão 4 e a conversa de promoção com Winston.',unlock4:'Conclua a Missão 3 para desbloquear.',needFinish4:'Conclua a terceira missão para avançar.',unlock3:'Conclua a Missão 2 para desbloquear.',needFinish3:'Conclua a segunda missão para avançar.',practice:'MISSÃO DE INVESTIGAÇÃO',tryAgain:'RECOMEÇAR MISSÃO',needFinish:'Conclua a primeira missão para desbloquear a próxima.'},
   en:{header:'INVESTIGATION MISSIONS',intro:'Your progress is saved in this browser. Return without replaying completed investigations.',available:'AVAILABLE',inProgress:'IN PROGRESS',finished:'COMPLETED',locked:'LOCKED',start:'START',resume:'RESUME',review:'REVISIT',replay:'REPLAY',missions:'MISSIONS',next:'NEXT MISSION',select:'CHOOSE MISSION',back:'BACK',backup:'COPY PROGRESS CODE',restore:'IMPORT PROGRESS',importPrompt:'Paste a progress code from another browser:',importSuccess:'Progress restored on this browser.',importFailure:'Invalid code. Your progress was not changed.',backupSuccess:'Code copied. Save it to restore progress on another device.',backupFallback:'Copy and save this code to restore progress:',unlock:'Finish Mission 1 to unlock.',local:'Stored on this device. Use a code to transfer progress.',m1:'The Inconsistent Manifest',m1Description:'Compare conflicting sources and separate facts from hypotheses about a bird seizure.',m2:'The Duplicated Code',m2Description:'Investigate a repeated identification-ring number without confusing suspicion with proof.',m3:'The International Offer',m3Description:'Investigate wildlife listings on social media, a recurring phone contact and an attempt to recruit an informant to carry eggs at an airport.',m4:'The Six Crossings',m4Description:'Investigate a Santa Catarina shipyard linked to shark fins and a container that made six Asia voyages in 2025.',m5:'The Hidden Farm',m5Description:'Compare farm photos through advanced SOCMINT and locate a town and plot on an invented case map.',unlock5:'Reach Level 2 after Winston’s post-Mission 4 debrief.',needFinish5:'Complete Mission 4 and receive your Level 2 promotion from Winston.',unlock4:'Complete Mission 3 to unlock.',needFinish4:'Complete the third mission to continue.',unlock3:'Complete Mission 2 to unlock.',needFinish3:'Complete the second mission to continue.',practice:'INVESTIGATION MISSION',tryAgain:'RESTART MISSION',needFinish:'Complete Mission 1 to unlock the next mission.'},
   es:{header:'MISIONES DE INVESTIGACIÓN',intro:'Tu progreso se guarda en este navegador. Regresa sin repetir investigaciones terminadas.',available:'DISPONIBLE',inProgress:'EN CURSO',finished:'COMPLETADA',locked:'BLOQUEADA',start:'INICIAR',resume:'RETOMAR',review:'REVISITAR',replay:'REPETIR',missions:'MISIONES',next:'SIGUIENTE MISIÓN',select:'ELEGIR MISIÓN',back:'VOLVER',backup:'COPIAR CÓDIGO DE PROGRESO',restore:'IMPORTAR PROGRESO',importPrompt:'Pega un código de progreso de otro navegador:',importSuccess:'Progreso restaurado en este navegador.',importFailure:'Código inválido. No se modificó tu progreso.',backupSuccess:'Código copiado. Guárdalo para restaurar el progreso en otro dispositivo.',backupFallback:'Copia este código para restaurar tu progreso:',unlock:'Termina la Misión 1 para desbloquear.',local:'Guardado en este dispositivo. Usa el código para transferir el progreso.',m1:'El Manifiesto Inconsistente',m1Description:'Compara fuentes contradictorias y separa hechos de hipótesis en una incautación de aves.',m2:'El Código Duplicado',m2Description:'Investiga un número de anilla repetido sin confundir indicios con pruebas de delito.',m3:'La Oferta Internacional',m3Description:'Investiga ofertas de fauna en redes sociales, un contacto telefónico repetido y la captación de un informante para transportar huevos en aeropuerto.',m4:'Las Seis Travesías',m4Description:'Investiga un astillero de Santa Catarina vinculado a aletas de tiburón y seis viajes de un contenedor a Asia en 2025.',m5:'La Finca Oculta',m5Description:'Compara fotografías con SOCMINT avanzado y ubica ciudad y parcela en el mapa del juego.',unlock5:'Alcanza el Nivel 2 después de la Misión 4 y la conversación con Winston.',needFinish5:'Completa la Misión 4 y recibe el ascenso de Winston.',unlock4:'Completa la Misión 3 para desbloquear.',needFinish4:'Completa la tercera misión para continuar.',unlock3:'Completa la Misión 2 para desbloquear.',needFinish3:'Completa la segunda misión para continuar.',practice:'MISIÓN DE INVESTIGACIÓN',tryAgain:'REINICIAR MISIÓN',needFinish:'Completa la primera misión para desbloquear la siguiente.'}
 };
 const second={
 pt:{
   missionTitle:'O Código Duplicado',missionSubtitle:'Uma anilha, dois registros. Descubra o que a inconsistência permite concluir.',
   mapTitle:'LOCALIZAÇÃO E ORIGEM NÃO CONFIRMADA',routeWarning:'Não há rota de tráfico demonstrada. Somente o local da fiscalização foi documentado.',
   reportTitle:'DOSSIÊ AY-002 · ANÁLISE DE ANILHA',reportIntro:'Examine os documentos, distinga inconsistência de fraude comprovada e indique providências verificáveis.',
   terminalFoot:'Confirme o código observado, compare a base de dados e registre as lacunas.',
   boardTitle:'CONFRONTO DOCUMENTAL',boardFoot:'A repetição de um código pode indicar erro, duplicação ou fraude. Nenhuma hipótese é automaticamente comprovada.',
   objectiveWinston:'Converse com Winston sobre a anilha.',objectiveTerminal:'Revise as quatro fontes do caso AX-2047.',objectiveMap:'Verifique o local conhecido e os destinos não comprovados.',objectiveBoard:'Compare o código da anilha com o cadastro.',objectiveReport:'Elabore o dossiê técnico sobre a inconsistência.',
   mentorLines:['Ayla, um fiscal fotografou a anilha AX-2047 em uma ave. Um segundo registro associa o mesmo código a outra espécie. Isso merece atenção, mas não prova, por si só, adulteração.','Revise o auto, o cadastro, a postagem e a nota técnica. Identifique o que precisa ser confirmado com o órgão emissor antes de atribuir origem, rota ou responsabilidade.'],
   legendConfirmed:'DOCUMENTADO',legendConfirmedText:'Fiscalização no Posto Serra Clara: fotografia legível da anilha AX-2047 em uma ave.',
   legendSuspected:'SEM COMPROVAÇÃO',legendSuspectedText:'A referência online a Porto Norte não comprova deslocamento, venda, destino nem relação com a ave fiscalizada.',
   evidenceConfirmed:'Registro da fiscalização',evidenceObserved:'Fotografia identifica o código AX-2047 na ave examinada. O local da inspeção está documentado.',
   evidenceOpen:'Cadastro divergente',evidenceLead:'Extrato de cadastro atribui AX-2047 a outra espécie; é necessário conferir autenticidade, histórico e possível erro de registro.',
   evidenceRoute:'Limites da inferência',evidenceRouteText:'Uma postagem menciona Porto Norte, mas não traz prova de remessa nem vínculo com a fiscalização.',
   evidenceGap:'Verificações prioritárias',evidenceGapText:'Solicitar confirmação ao emissor, preservar fotos e documentação, examinar a anilha e registrar a cadeia de custódia.',
   question1:'1. O que a comparação dos documentos permite afirmar?',answers1:['As duas aves percorreram a mesma rota.','O código AX-2047 aparece vinculado a informações divergentes.','Uma rede criminosa já foi identificada.'],
   question2:'2. Qual conclusão geográfica é sustentada?',answers2:['Somente o local da fiscalização foi documentado; a origem e o destino não estão comprovados.','A ave foi necessariamente enviada a Porto Norte.','A divergência cadastral confirma transporte internacional.'],
   question3:'3. Qual é o encaminhamento técnico adequado?',answers3:['Descartar os documentos conflitantes.','Divulgar publicamente um suspeito sem verificação.','Preservar as evidências e solicitar verificação oficial do código e do histórico da anilha.'],
   locked:'Antes de concluir, converse com Winston, examine as quatro fontes, revise a localização e compare os documentos.',
   successToast:'Inconsistência documentada com rigor; verificação oficial recomendada.',
   finalHeading:'Uma anilha não encerra uma investigação.',
   finalBody:'Você identificou uma divergência documental, preservou o local observado e deixou destinos e responsabilidades como hipóteses. O dossiê recomenda verificar o código com o emissor e preservar os vestígios, sem afirmar fraude como fato.',
   sources:[
    {id:'IR-112',cat:'[O] AUTO DE FISCALIZAÇÃO',title:'Fotografia da anilha AX-2047',date:'16 NOV · DOSSIÊ AY-002',body:'Na fiscalização do Posto Serra Clara, uma ave tinha anilha legível AX-2047. Uma fotografia do anel e o local da inspeção constam do auto. A origem legal e o destino não foram confirmados.',note:'OBSERVADO [O]: código fotografado e local da fiscalização. Não prova origem, adulteração ou responsável.'},
    {id:'RG-112',cat:'[T] EXTRATO CADASTRAL',title:'Código associado a outra espécie',date:'REGISTRO ANTERIOR · SIMULAÇÃO',body:'Um extrato cadastral consultado durante o exercício associa o código AX-2047 a outra espécie de ave. A divergência precisa ser conferida com a autoridade emissora e com o histórico das alterações.',note:'DOCUMENTAL [T]: mesmo código em informações divergentes. Ainda podem existir erros de digitação, transcrição ou associação.'},
    {id:'OS-112',cat:'[N] PISTA DE FONTE ABERTA',title:'Anúncio com referência a Porto Norte',date:'PUBLICAÇÃO SEM DATA VERIFICADA',body:'Um perfil público sem autoria verificada anuncia aves com documentação e menciona Porto Norte. O anúncio não exibe a anilha AX-2047 nem comprova qualquer relação com a fiscalização.',note:'PISTA [N]: não atribuir venda, pessoa, transporte, trajeto ou destino sem evidência independente.'},
    {id:'AN-112',cat:'[T] NOTA TÉCNICA',title:'Conferência e cadeia de custódia',date:'ANÁLISE INTERNA · AY-002',body:'A comparação aponta uma inconsistência relevante no identificador. Recomenda-se preservar o auto e as imagens, solicitar consulta ao emissor, inspecionar a integridade do anel e documentar cada etapa antes de concluir pela existência de fraude.',note:'LACUNAS: emissão, titularidade, espécie, integridade física e trajetória da anilha aguardam confirmação.'}
   ]
 },
 en:{
   missionTitle:'The Duplicated Code',missionSubtitle:'One identification ring, conflicting records. Establish what the evidence really supports.',
   mapTitle:'KNOWN LOCATION · UNVERIFIED ORIGIN',routeWarning:'No trafficking route has been established; only the inspection point is documented.',
   reportTitle:'AY-002 DOSSIER · RING ASSESSMENT',reportIntro:'Review the records, distinguish a discrepancy from proven fraud, and recommend verifiable checks.',
   terminalFoot:'Verify the observed ring code, compare the registry and document gaps.',
   boardTitle:'DOCUMENTARY COMPARISON',boardFoot:'A repeated code could be an error, a duplicate or fraud. None is automatically established.',
   objectiveWinston:'Ask Winston about the ring.',objectiveTerminal:'Review the four AX-2047 sources.',objectiveMap:'Review the known site and unverified destinations.',objectiveBoard:'Compare the ring code and registry information.',objectiveReport:'Write a technical assessment of the discrepancy.',
   mentorLines:['Ayla, an officer photographed ring AX-2047 on a bird. A separate record assigns that code to a different species. That needs investigation, but it does not prove tampering.','Compare the inspection report, registry entry, public post and technical note. Establish what the issuing authority must verify before we claim origin, route or responsibility.'],
   legendConfirmed:'DOCUMENTED',legendConfirmedText:'Inspection at Serra Clara checkpoint: a legible photograph shows ring AX-2047 on a bird.',
   legendSuspected:'UNVERIFIED',legendSuspectedText:'The online reference to Porto Norte does not verify shipment, sale, destination or any connection with the inspected animal.',
   evidenceConfirmed:'Inspection record',evidenceObserved:'A photograph documents AX-2047 on the inspected bird. The inspection location is recorded.',
   evidenceOpen:'Conflicting registry',evidenceLead:'A registry extract assigns AX-2047 to a different species; authenticity, history and data-entry errors need review.',
   evidenceRoute:'Limits of geographic inference',evidenceRouteText:'An unverified online post mentions Porto Norte, with no evidence of transport or connection to the inspection.',
   evidenceGap:'Priority verification steps',evidenceGapText:'Request issuer verification, preserve photos and paperwork, inspect the ring and maintain chain of custody.',
   question1:'1. What does comparing the records establish?',answers1:['The two birds travelled the same route.','Code AX-2047 appears with conflicting identifying details.','A criminal network has already been identified.'],
   question2:'2. Which geographic statement is supported?',answers2:['Only the inspection site is documented; origin and destination are unverified.','The bird was necessarily shipped to Porto Norte.','The registry discrepancy proves international transport.'],
   question3:'3. Which next step is technically appropriate?',answers3:['Discard the contradictory records.','Publicly name an unverified suspect.','Preserve the evidence and request official verification of the code and ring history.'],
   locked:'Before submitting, talk to Winston, review all four records, inspect the mapped location and compare the documents.',
   successToast:'The inconsistency was documented responsibly; official verification requested.',
   finalHeading:'A ring number is not the end of an investigation.',
   finalBody:'You documented a discrepancy, distinguished an observed location from alleged destinations, and recommended official issuer checks and evidence preservation. No one was accused, and fraud was not asserted as proven.',
   sources:[
    {id:'IR-112',cat:'[O] INSPECTION REPORT',title:'Photograph of ring AX-2047',date:'16 NOV · CASE FILE AY-002',body:'At Serra Clara checkpoint, one inspected bird wore a clearly photographed ring AX-2047. The inspection report documents the ring and location. Legal origin and destination were not established.',note:'OBSERVED [O]: photographed code and inspection site. No proof of origin, tampering or responsibility.'},
    {id:'RG-112',cat:'[T] REGISTRY EXTRACT',title:'Code assigned to another species',date:'EARLIER ENTRY · SIMULATION',body:'A registry extract consulted for this exercise links code AX-2047 to a different bird species. The issuing authority must verify the record and its modification history.',note:'DOCUMENTARY [T]: conflicting information linked to one code. A recording or transcription error remains possible.'},
    {id:'OS-112',cat:'[N] OPEN-SOURCE LEAD',title:'Online mention of Porto Norte',date:'PUBLICATION DATE UNVERIFIED',body:'An online account of unknown authorship advertises documented birds and mentions Porto Norte. It does not display AX-2047 or establish any link to the checkpoint.',note:'LEAD [N]: no verified sale, person, transport route or destination.'},
    {id:'AN-112',cat:'[T] TECHNICAL ASSESSMENT',title:'Verification and evidence handling',date:'INTERNAL NOTE · AY-002',body:'The code discrepancy requires follow-up. Preserve photographs and records, consult the ring issuer, inspect physical integrity, and record a chain of custody before any finding of fraud.',note:'GAPS: issuer, holder, species, ring integrity and movement history remain unverified.'}
   ]
 },
 es:{
   missionTitle:'El Código Duplicado',missionSubtitle:'Una anilla y registros contradictorios. Determina qué respaldan las pruebas.',
   mapTitle:'UBICACIÓN CONOCIDA · ORIGEN SIN VERIFICAR',routeWarning:'No se ha comprobado ninguna ruta de tráfico; solo consta el lugar de inspección.',
   reportTitle:'EXPEDIENTE AY-002 · ANÁLISIS DE ANILLA',reportIntro:'Examina los documentos, diferencia una contradicción del fraude probado y recomienda comprobaciones.',
   terminalFoot:'Comprueba el código observado, compara el registro y documenta vacíos.',
   boardTitle:'COMPARACIÓN DOCUMENTAL',boardFoot:'Un código repetido puede ser un error, un duplicado o fraude. Ninguna hipótesis está demostrada por sí sola.',
   objectiveWinston:'Habla con Winston sobre la anilla.',objectiveTerminal:'Revisa las cuatro fuentes de AX-2047.',objectiveMap:'Comprueba el lugar observado y los destinos no confirmados.',objectiveBoard:'Compara el código y los datos registrales.',objectiveReport:'Prepara el informe técnico de la contradicción.',
   mentorLines:['Ayla, un inspector fotografió la anilla AX-2047 de un ave. Otro registro asocia ese código con una especie diferente. Es importante, pero no demuestra una alteración.','Compara el acta, el registro, la publicación y el análisis técnico. Averigua qué debe verificar la autoridad emisora antes de afirmar origen, ruta o responsabilidad.'],
   legendConfirmed:'DOCUMENTADO',legendConfirmedText:'Inspección en Serra Clara: una fotografía legible muestra la anilla AX-2047.',
   legendSuspected:'SIN COMPROBAR',legendSuspectedText:'La referencia en línea a Porto Norte no demuestra envío, venta, destino ni vínculo con el animal inspeccionado.',
   evidenceConfirmed:'Registro de inspección',evidenceObserved:'Una fotografía documenta AX-2047 en el ave inspeccionada. Consta el lugar de inspección.',
   evidenceOpen:'Registro contradictorio',evidenceLead:'Un extracto asocia AX-2047 a otra especie; hay que revisar autenticidad, historial y posibles errores.',
   evidenceRoute:'Límites geográficos',evidenceRouteText:'Una publicación no verificada menciona Porto Norte, sin pruebas de transporte ni conexión.',
   evidenceGap:'Verificaciones prioritarias',evidenceGapText:'Solicitar comprobación a la autoridad emisora, conservar imágenes, revisar la anilla y preservar la cadena de custodia.',
   question1:'1. ¿Qué demuestra la comparación documental?',answers1:['Las dos aves recorrieron la misma ruta.','El código AX-2047 aparece con datos de identificación contradictorios.','Se ha identificado una red criminal.'],
   question2:'2. ¿Qué afirmación geográfica está respaldada?',answers2:['Solo está documentado el lugar de inspección; origen y destino no están verificados.','El ave fue enviada necesariamente a Porto Norte.','La contradicción demuestra transporte internacional.'],
   question3:'3. ¿Qué procedimiento es adecuado?',answers3:['Descartar los documentos contradictorios.','Acusar públicamente sin verificación.','Conservar las pruebas y solicitar verificación oficial del código y del historial de la anilla.'],
   locked:'Antes de terminar, habla con Winston, revisa las cuatro fuentes, examina la ubicación y compara los documentos.',
   successToast:'Contradicción documentada con rigor; se recomienda verificación oficial.',
   finalHeading:'Un número de anilla no concluye una investigación.',
   finalBody:'Documentaste una contradicción, separaste lugares comprobados de destinos alegados y recomendaste comprobación oficial y conservación de pruebas. No se afirmó fraude como hecho ni se acusó a nadie.',
   sources:[
    {id:'IR-112',cat:'[O] ACTA DE INSPECCIÓN',title:'Fotografía de anilla AX-2047',date:'16 NOV · EXPEDIENTE AY-002',body:'En la inspección de Serra Clara, un ave llevaba la anilla AX-2047, legible en una fotografía. El acta registra el código y el lugar. El origen y el destino no están comprobados.',note:'OBSERVADO [O]: código fotografiado y lugar de inspección. No prueba origen, alteración ni autoría.'},
    {id:'RG-112',cat:'[T] EXTRACTO REGISTRAL',title:'Código asociado a otra especie',date:'REGISTRO ANTERIOR · AY-002',body:'Un extracto consultado durante la investigación asigna AX-2047 a otra especie. La autoridad emisora debe confirmar el registro y su historial de modificaciones.',note:'DOCUMENTAL [T]: datos contradictorios vinculados al mismo código. Podría ser un error de transcripción.'},
    {id:'OS-112',cat:'[N] PISTA DE FUENTE ABIERTA',title:'Mención de Porto Norte',date:'FECHA DE PUBLICACIÓN SIN VERIFICAR',body:'Un perfil anónimo anuncia aves documentadas y menciona Porto Norte. No muestra AX-2047 ni vínculo verificable con la inspección.',note:'PISTA [N]: no hay venta, persona, transporte o destino confirmados.'},
    {id:'AN-112',cat:'[T] ANÁLISIS TÉCNICO',title:'Verificación y custodia',date:'NOTA INTERNA · AY-002',body:'La contradicción exige comprobación. Conservar imágenes y registros, consultar al emisor, examinar la integridad de la anilla y documentar la cadena de custodia antes de concluir que hubo fraude.',note:'VACÍOS: emisión, titular, especie, integridad y recorrido de la anilla sin verificar.'}
   ]
 }
 };
 function persist(){try{localStorage.setItem(KEY,JSON.stringify(store));return true}catch(e){return false}}
 function load(id){return sanitizeState(store.missions[ids.includes(id)?id:'AY-001'])}
 function save(id,patch){if(!ids.includes(id))return false;store.missions[id]=sanitizeState({...store.missions[id],...patch});return persist()}
 function completed(id){return !!load(id).completed}
 function unlocked(id){return id==='AY-001'||(id==='AY-002'&&completed('AY-001'))||(id==='AY-003'&&completed('AY-002'))||(id==='AY-004'&&completed('AY-003'))||(id==='AY-005'&&store.level2&&completed('AY-004'))}
 function choose(id){if(!unlocked(id))return false;store.active=id;return persist()}
 function reset(id){if(!ids.includes(id))return false;const wasCompleted=completed(id);store.missions[id]={...empty(),completed:wasCompleted};return persist()}
 function resetAll(){
   // Deliberately discard all completed missions, the promotion and the follow-up.
   // Do not reset language preferences or restricted Observatory authentication.
   store=defaults();
   try{localStorage.removeItem(LEGACY)}catch(e){}
   return persist();
 }
 function markIntro(){store.introSeen=true;persist()}
 function markNews(){if(!completed('AY-004'))return false;store.newsSeen=true;store.debriefPending=!store.level2;return persist()}
 function promote(){if(!completed('AY-004')||!store.newsSeen)return false;store.level2=true;store.debriefPending=false;return persist()}
 function aftermath(){return {unlocked:completed('AY-004'),newsSeen:store.newsSeen,pending:store.debriefPending,level2:store.level2,level:store.level2?2:1}}

 function encode(){
   const json=JSON.stringify({version:2,missions:store.missions,active:store.active,introSeen:store.introSeen,newsSeen:store.newsSeen,debriefPending:store.debriefPending,level2:store.level2});
   return btoa(unescape(encodeURIComponent(json)));
 }
 function decode(code){
   try{
     const parsed=JSON.parse(decodeURIComponent(escape(atob(String(code||'').trim()))));
     if(parsed.version!==2||!parsed.missions||typeof parsed.missions!=='object')return false;
     const m1=sanitizeState(parsed.missions['AY-001']),m2=sanitizeState(parsed.missions['AY-002']),m3=sanitizeState(parsed.missions['AY-003']),m4=sanitizeState(parsed.missions['AY-004']),m5=sanitizeState(parsed.missions['AY-005']);
     // Merge achievements, never wipe the recipient's completed missions.
     for(const [id,incoming] of [['AY-001',m1],['AY-002',m2],['AY-003',m3],['AY-004',m4],['AY-005',m5]]){
       const old=load(id),isOldMore=old.done||(!incoming.done&&old.sources.length>incoming.sources.length);
       store.missions[id]=isOldMore?{...old,completed:old.completed||incoming.completed}:{...incoming,completed:old.completed||incoming.completed};
     }
     if(unlocked(parsed.active))store.active=parsed.active;
     store.introSeen=store.introSeen||!!parsed.introSeen;
     if(completed('AY-004')){store.newsSeen=store.newsSeen||!!parsed.newsSeen;store.level2=store.level2||!!parsed.level2;store.debriefPending=!store.level2&&(store.debriefPending||!!parsed.debriefPending);}
     return persist();
   }catch(e){return false}
 }
 window.AYLAMissionsV2={ids,load,save,reset,choose,completed,unlocked,
   current:()=>store.active,introSeen:()=>store.introSeen,markIntro,resetAll,aftermath,markNews,promote,
   copyCode:encode,importCode:decode,text:(lang,key)=>(title[lang]||title.en)[key],
   override:(id,lang,key)=>id==='AY-005'?window.AYLAMissionFive?.locales?.[lang]?.[key]:id==='AY-004'?window.AYLAMissionFour?.locales?.[lang]?.[key]:id==='AY-003'?window.AYLAMissionThree?.locales?.[lang]?.[key]:id==='AY-002'?(second[lang]||second.en)[key]:undefined,
   correct:(id)=>id==='AY-005'?(window.AYLAMissionFive?.answer||[1,0,2]):id==='AY-004'?(window.AYLAMissionFour?.answer||[0,1,2]):id==='AY-003'?(window.AYLAMissionThree?.answer||[1,0,2]):id==='AY-002'?[1,0,2]:[0,1,2]
 };
})();
