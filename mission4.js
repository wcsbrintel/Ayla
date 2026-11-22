/* AYLA 4 — Shark fin trafficking investigation.
   Narrative exercise data derived from the scenario supplied for the game; not a public
   claim about an identified real shipyard, company or container. No such identifiers used.
   Six voyages in 2025 establish the container's history, NOT its cargo history. */
(function(){'use strict';
const locales={
 pt:{
  missionTitle:'As Seis Travessias',missionSubtitle:'Barbatanas em um estaleiro de Santa Catarina. Um contêiner com seis viagens à Ásia exige verificação urgente.',
  mapTitle:'SANTA CATARINA → ÁSIA · HISTÓRICO DO CONTÊINER',
  routeWarning:'Seis viagens do contêiner à Ásia em 2025 e uma passagem por Hong Kong constam do histórico. Não há prova de que barbatanas integraram essas cargas, nem de que Hong Kong seja destino final.',
  reportTitle:'DOSSIÊ AY-004 · BARBATANAS DE TUBARÃO',
  reportIntro:'Defina o que já está documentado, diferencie a hipótese sobre a carga e recomende a verificação urgente das instalações pelas autoridades competentes.',
  terminalFoot:'Conserve os dados de identificação e movimentação do contêiner. O histórico logístico não comprova, isoladamente, seu conteúdo.',
  boardTitle:'ESTALEIRO, CONTÊINER E INFERÊNCIAS',
  boardFoot:'A urgência operacional não substitui a confirmação dos fatos nem os procedimentos legais de fiscalização e preservação de evidências.',
  objectiveWinston:'Receba de Winston a informação sobre o estaleiro.',
  objectiveTerminal:'Examine os quatro documentos: instalação, contêiner, Hong Kong e diligência.',
  objectiveMap:'Compare as seis viagens de 2025 e a passagem por Hong Kong.',
  objectiveBoard:'Separe evidências sobre a instalação das hipóteses de carga e destino.',
  objectiveReport:'Recomende uma checagem urgente, legal e proporcional das instalações.',
  mentorLines:[
    'Ayla, recebemos informações de que barbatanas de tubarão chegam a um estaleiro em Santa Catarina, onde passam por processamento e armazenamento antes de possível transporte internacional. A janela de verificação pode ser curta.',
    'Uma consulta retrospectiva identificou um contêiner ligado ao local: seis viagens à Ásia em 2025, incluindo passagem por Hong Kong. Isso demonstra o histórico logístico do equipamento, não o conteúdo das viagens. Precisamos de um dossiê que fundamente uma verificação urgente do local, proteja as evidências e não antecipe conclusões.'
  ],
  legendConfirmed:'HISTÓRICO DOCUMENTADO',
  legendConfirmedText:'O contêiner identificado realizou seis viagens em 2025 com circulação na Ásia e registro de passagem por Hong Kong.',
  legendSuspected:'HIPÓTESES A VERIFICAR',
  legendSuspectedText:'Processamento e armazenamento no estaleiro; conteúdo das cargas; licitude e espécies das barbatanas; Hong Kong como destino final.',
  evidenceConfirmed:'Movimentações do contêiner',
  evidenceObserved:'O identificador consultado está associado a seis viagens para a Ásia em 2025, com passagem por Hong Kong. O histórico não descreve as cargas.',
  evidenceOpen:'Informação sobre o estaleiro',
  evidenceLead:'Há indicação de recepção, processamento e armazenamento de barbatanas em uma instalação de Santa Catarina; atividades, responsáveis e estoques requerem confirmação.',
  evidenceRoute:'Destino provável: Hong Kong',
  evidenceRouteText:'Hong Kong é citado como provável destino, mas a passagem do contêiner não comprova entrega de barbatanas ou destino final da mercadoria.',
  evidenceGap:'Verificação urgente e preservação',
  evidenceGapText:'Encaminhar à autoridade competente a necessidade de inspeção legal e tempestiva, com verificação documental, identificação de espécies e conservação de vestígios.',
  question1:'1. O que a checagem retrospectiva do contêiner comprova?',
  answers1:['Seis viagens à Ásia em 2025 e passagem por Hong Kong, mas não o conteúdo transportado.','Que seis remessas de barbatanas chegaram a Hong Kong.','Que o estaleiro é proprietário de todas as cargas.'],
  question2:'2. Como tratar Hong Kong na avaliação?',
  answers2:['Como destino final já confirmado para as barbatanas.','Como destino provável citado; a passagem portuária do contêiner não comprova entrega da carga.','Como informação irrelevante que deve ser excluída do dossiê.'],
  question3:'3. Qual resposta é mais adequada diante da urgência?',
  answers3:['Aguardar indefinidamente para evitar qualquer fiscalização.','Divulgar os nomes dos responsáveis antes de verificar as informações.','Encaminhar imediatamente pedido fundamentado de verificação legal das instalações, com preservação de documentos, vestígios e amostras pelas autoridades.'],
  locked:'Converse com Winston, examine as quatro fontes, revise o histórico geográfico e confronte os indícios antes do dossiê.',
  successToast:'Dossiê encaminhado para verificação urgente e preservação de evidências.',
  finalHeading:'Seis viagens comprovam circulação. Não comprovam a carga.',
  finalBody:'Ayla reuniu a informação sobre o estaleiro e o histórico de seis viagens do contêiner à Ásia em 2025, com passagem por Hong Kong. Diante do risco de remoção de mercadorias e documentos, recomendou verificação urgente das instalações por autoridades competentes, sem apresentar o destino ou o transporte de barbatanas como confirmados.',
  sources:[
   {id:'SC-401',cat:'[N] INFORMAÇÃO DE CAMPO',title:'Estaleiro associado ao processamento',date:'SANTA CATARINA · ALERTA PRIORITÁRIO',body:'Informação recebida indica que barbatanas de tubarão seriam levadas a um estaleiro em Santa Catarina, processadas e mantidas na instalação antes do envio à Ásia. A situação atual das mercadorias, a titularidade, as espécies e a regularidade documental precisam ser verificadas.',note:'LEAD [N]: informação sobre local e atividade. Solicitar verificação independente e preservar a fonte.'},
   {id:'LG-402',cat:'[O] HISTÓRICO LOGÍSTICO',title:'Contêiner: seis viagens à Ásia em 2025',date:'2025 · CONSULTA RETROSPECTIVA',body:'A checagem de um identificador de contêiner associado ao estaleiro retorna seis viagens para a Ásia ao longo de 2025. O histórico inclui passagem por Hong Kong. O registro estabelece movimentações do contêiner, sem identificar carga de barbatanas em qualquer viagem.',note:'OBSERVADO [O]: seis viagens em 2025 e passagem por Hong Kong. NEM carga, NEM espécie, NEM destinatário foram demonstrados.'},
   {id:'HK-403',cat:'[N] DESTINO EM INVESTIGAÇÃO',title:'Hong Kong citado como destino provável',date:'HIPÓTESE DE DESTINO · SEM ENTREGA CONFIRMADA',body:'Hong Kong foi citado como destino provável das barbatanas. Embora o contêiner tenha passado por Hong Kong, isso não comprova que transportava barbatanas, que a mercadoria foi desembarcada ali ou que havia um comprador identificado.',note:'PISTA [N]: verificar conhecimentos de embarque, manifestos, consignatários e dados alfandegários por canais autorizados.'},
   {id:'OP-404',cat:'[T] AVALIAÇÃO OPERACIONAL',title:'Urgência em verificar as instalações',date:'PRIORIDADE ELEVADA · DOSSIÊ AY-004',body:'A possibilidade de retirada ou alteração de mercadorias e registros torna necessária comunicação imediata às autoridades competentes para avaliar uma verificação legal e tempestiva do estaleiro. Devem ser priorizados documentos de entrada e saída, identificação de espécies, situação de armazenamento, licenças aplicáveis e cadeia de custódia.',note:'AÇÃO: solicitar inspeção fundamentada e preservação de evidências, sem agir por conta própria nem divulgar identidades ou instruções de evasão.'}
  ]
 },
 en:{
  missionTitle:'The Six Crossings',missionSubtitle:'Shark fins at a shipyard in Santa Catarina. A container with six Asia voyages calls for urgent verification.',
  mapTitle:'SANTA CATARINA → ASIA · CONTAINER HISTORY',
  routeWarning:'The container has six recorded Asia voyages in 2025, including a Hong Kong port call. The records do not prove shark fins were carried, nor that Hong Kong was the final destination.',
  reportTitle:'DOSSIER AY-004 · SHARK FINS',
  reportIntro:'Identify what is documented, separate cargo hypotheses, and recommend urgent lawful verification of the facilities.',
  terminalFoot:'Preserve container identifiers and movement records. Logistics history alone does not establish cargo contents.',
  boardTitle:'SHIPYARD, CONTAINER AND INFERENCE',
  boardFoot:'Operational urgency does not replace evidence verification or lawful inspection and preservation procedures.',
  objectiveWinston:'Receive Winston’s shipyard briefing.',
  objectiveTerminal:'Review four records: facility, container, Hong Kong and urgent action.',
  objectiveMap:'Review six Asia voyages and the Hong Kong passage in 2025.',
  objectiveBoard:'Separate facility leads from cargo and destination hypotheses.',
  objectiveReport:'Recommend timely, proportionate and lawful facility checks.',
  mentorLines:[
   'Ayla, a lead suggests shark fins are taken to a shipyard in Santa Catarina, processed and stored before possible shipment to Asia. The opportunity to verify the facilities may be short.',
   'A retrospective check of a container linked to the site found six Asia voyages in 2025, including a call at Hong Kong. This establishes the equipment’s movement history—not what it carried. We need an evidence-based dossier supporting urgent lawful inspection without overstating the findings.'
  ],
  legendConfirmed:'DOCUMENTED CONTAINER MOVEMENTS',
  legendConfirmedText:'One identified container made six Asia voyages in 2025; the historical record includes a call at Hong Kong.',
  legendSuspected:'REQUIRES VERIFICATION',
  legendSuspectedText:'Processing and storage at the shipyard; cargo contents; shark species and documentation; Hong Kong as final destination.',
  evidenceConfirmed:'Container movements',
  evidenceObserved:'The checked identifier shows six Asia voyages in 2025, including Hong Kong. The records do not describe the cargo.',
  evidenceOpen:'Shipyard intelligence lead',
  evidenceLead:'Information points to receipt, processing and storage of fins at a Santa Catarina facility; activities, operators and stock require confirmation.',
  evidenceRoute:'Probable destination: Hong Kong',
  evidenceRouteText:'Hong Kong is named as a probable destination. A container port call does not prove delivery of fins or their final destination.',
  evidenceGap:'Urgent verification and preservation',
  evidenceGapText:'Refer an urgent lawful inspection request to competent authorities, covering records, species identification and preservation of potential evidence.',
  question1:'1. What does the retrospective container search establish?',
  answers1:['Six Asia voyages during 2025 and a Hong Kong call, but not the cargo carried.','Six consignments of shark fins were delivered to Hong Kong.','The shipyard owned every shipment.'],
  question2:'2. How should Hong Kong be described?',
  answers2:['A confirmed final destination for the fins.','A reported probable destination; the container’s call does not prove cargo delivery.','Irrelevant and therefore excluded from the dossier.'],
  question3:'3. What is the appropriate response to the urgency?',
  answers3:['Delay any review indefinitely.','Publish facility operators’ identities before verification.','Promptly refer a documented request for lawful facility checks and preservation of records, samples and evidence by authorities.'],
  locked:'Talk to Winston, review all four records, examine the geographic history and compare the evidence before submitting.',
  successToast:'Urgent verification and evidence-preservation recommendation submitted.',
  finalHeading:'Six trips prove movement. They do not prove cargo.',
  finalBody:'Ayla assembled the shipyard intelligence and the container’s six Asia voyages in 2025, including a Hong Kong call. Given the possibility that goods and records may be moved, she recommended urgent, lawful facility verification by competent authorities without asserting that the container carried fins.',
  sources:[
   {id:'SC-401',cat:'[N] FIELD INTELLIGENCE LEAD',title:'Shipyard linked to fin processing',date:'SANTA CATARINA · HIGH-PRIORITY LEAD',body:'Incoming information suggests shark fins are brought to a Santa Catarina shipyard, processed and held there before possible shipment to Asia. Current stock, ownership, species and relevant permits remain to be verified.',note:'LEAD [N]: facility and activity information. Seek independent verification and protect the source.'},
   {id:'LG-402',cat:'[O] LOGISTICS HISTORY',title:'Container: six Asia voyages in 2025',date:'2025 · RETROSPECTIVE QUERY',body:'A container identifier associated with the shipyard shows six Asia voyages in 2025, including a Hong Kong port call. Movement is established, but no record provided identifies shark fins as cargo.',note:'OBSERVED [O]: six 2025 voyages and a Hong Kong call. Cargo, species and consignee are NOT established.'},
   {id:'HK-403',cat:'[N] DESTINATION LEAD',title:'Hong Kong mentioned as probable destination',date:'DESTINATION HYPOTHESIS · NO DELIVERY CONFIRMED',body:'Hong Kong was mentioned as a probable destination for shark fins. Even though the container called at Hong Kong, the available information does not establish fins aboard, discharge there, or a specific buyer.',note:'LEAD [N]: verify shipping documents, bills of lading and customs records through authorized channels.'},
   {id:'OP-404',cat:'[T] OPERATIONAL ASSESSMENT',title:'Urgent check of the facilities',date:'HIGH PRIORITY · DOSSIER AY-004',body:'The potential removal or alteration of goods and records warrants immediate referral to relevant authorities for timely lawful examination of the facilities. Priority checks include incoming/outgoing records, species identification, stored goods, applicable permits and chain of custody.',note:'ACTION: request evidence-based inspection and preservation by authorized officers; do not independently intervene or expose individuals.'}
  ]
 },
 es:{
  missionTitle:'Las Seis Travesías',missionSubtitle:'Aletas de tiburón en un astillero de Santa Catarina. Un contenedor con seis viajes a Asia exige verificación urgente.',
  mapTitle:'SANTA CATARINA → ASIA · HISTORIAL DEL CONTENEDOR',
  routeWarning:'El contenedor realizó seis viajes a Asia en 2025 y pasó por Hong Kong. Los registros no demuestran que llevara aletas ni que Hong Kong fuera el destino final.',
  reportTitle:'EXPEDIENTE AY-004 · ALETAS DE TIBURÓN',
  reportIntro:'Identifica lo documentado, separa las hipótesis sobre la carga y recomienda una verificación urgente y legal de las instalaciones.',
  terminalFoot:'Conserva identificadores y movimientos del contenedor. El historial logístico no demuestra por sí solo el contenido.',
  boardTitle:'ASTILLERO, CONTENEDOR Y CONCLUSIONES',
  boardFoot:'La urgencia no sustituye la verificación ni los procedimientos legales de inspección y custodia de pruebas.',
  objectiveWinston:'Escucha a Winston sobre el astillero.',
  objectiveTerminal:'Revisa cuatro registros: instalación, contenedor, Hong Kong y actuación.',
  objectiveMap:'Examina los seis viajes a Asia y el paso por Hong Kong en 2025.',
  objectiveBoard:'Separa información del astillero de hipótesis sobre carga y destino.',
  objectiveReport:'Recomienda comprobaciones urgentes, legales y proporcionadas.',
  mentorLines:[
   'Ayla, recibimos información según la cual unas aletas de tiburón llegan a un astillero de Santa Catarina, se procesan y almacenan antes de un posible envío a Asia. La oportunidad de verificar las instalaciones puede ser breve.',
   'La consulta retrospectiva de un contenedor vinculado al lugar identificó seis viajes a Asia en 2025, con escala en Hong Kong. Esto prueba el historial del equipo, no su contenido. Necesitamos un expediente para justificar la inspección urgente sin anticipar conclusiones.'
  ],
  legendConfirmed:'MOVIMIENTOS DOCUMENTADOS',
  legendConfirmedText:'Un contenedor identificado hizo seis viajes a Asia durante 2025 y registra paso por Hong Kong.',
  legendSuspected:'HIPÓTESIS POR COMPROBAR',
  legendSuspectedText:'Procesamiento y almacenamiento en el astillero; contenido de las cargas; especies y permisos; destino final en Hong Kong.',
  evidenceConfirmed:'Movimientos del contenedor',
  evidenceObserved:'El identificador muestra seis viajes a Asia en 2025 con paso por Hong Kong, sin documentar qué transportó.',
  evidenceOpen:'Información sobre el astillero',
  evidenceLead:'Se indica recepción, procesamiento y almacenamiento de aletas en Santa Catarina; actividades, responsables y existencias requieren comprobación.',
  evidenceRoute:'Destino probable: Hong Kong',
  evidenceRouteText:'Hong Kong se menciona como destino probable, pero la escala no prueba entrega de aletas ni destino final.',
  evidenceGap:'Verificación y preservación urgentes',
  evidenceGapText:'Remitir a las autoridades una solicitud de inspección legal y oportuna de instalaciones y documentos, con identificación de especies y cadena de custodia.',
  question1:'1. ¿Qué demuestra la consulta retrospectiva del contenedor?',
  answers1:['Seis viajes a Asia en 2025 y paso por Hong Kong, pero no el contenido de la carga.','Seis cargamentos de aletas entregados en Hong Kong.','Que el astillero era dueño de todas las cargas.'],
  question2:'2. ¿Cómo se debe tratar Hong Kong?',
  answers2:['Como destino final confirmado de las aletas.','Como destino probable mencionado; la escala del contenedor no prueba entrega de mercancía.','Como información irrelevante para el expediente.'],
  question3:'3. ¿Qué actuación corresponde a la urgencia?',
  answers3:['Aplazar indefinidamente cualquier verificación.','Difundir identidades antes de comprobar las pruebas.','Solicitar de inmediato la inspección legal de las instalaciones y la preservación de registros, muestras y evidencias por las autoridades.'],
  locked:'Habla con Winston, revisa las cuatro fuentes, examina el historial geográfico y contrasta las pruebas.',
  successToast:'Solicitud de verificación urgente y conservación de evidencias incorporada al expediente.',
  finalHeading:'Seis viajes prueban movimiento, no el contenido.',
  finalBody:'Ayla reunió la información del astillero y los seis viajes del contenedor a Asia durante 2025, con paso por Hong Kong. Ante el posible movimiento de mercancías y registros, recomendó una verificación legal urgente por las autoridades, sin presentar como probado el transporte de aletas.',
  sources:[
   {id:'SC-401',cat:'[N] INFORMACIÓN DE CAMPO',title:'Astillero vinculado al procesamiento',date:'SANTA CATARINA · AVISO PRIORITARIO',body:'La información recibida indica que aletas de tiburón llegarían a un astillero de Santa Catarina para su procesamiento y almacenamiento antes de un posible envío a Asia. Existencias, propietarios, especies y documentación deben comprobarse.',note:'PISTA [N]: instalaciones y actividades por verificar independientemente. Proteger la fuente.'},
   {id:'LG-402',cat:'[O] HISTORIAL LOGÍSTICO',title:'Contenedor: seis viajes a Asia en 2025',date:'2025 · CONSULTA RETROSPECTIVA',body:'El identificador de un contenedor asociado al astillero registra seis viajes a Asia durante 2025 y paso por Hong Kong. El historial documenta desplazamientos, pero no identifica aletas como carga.',note:'OBSERVADO [O]: seis viajes y paso por Hong Kong. No se han comprobado carga, especies ni destinatario.'},
   {id:'HK-403',cat:'[N] POSIBLE DESTINO',title:'Hong Kong mencionado como destino probable',date:'HIPÓTESIS DE DESTINO · ENTREGA SIN CONFIRMAR',body:'Hong Kong fue citado como destino probable de las aletas. La escala del contenedor no confirma que transportara aletas, que se descargaran allí ni que existiera un comprador identificado.',note:'PISTA [N]: verificar manifiestos, conocimientos de embarque y registros aduaneros por vías autorizadas.'},
   {id:'OP-404',cat:'[T] EVALUACIÓN OPERATIVA',title:'Urgencia en verificar instalaciones',date:'PRIORIDAD ALTA · AY-004',body:'La posible retirada o alteración de mercancías y documentos requiere comunicar de inmediato la situación a las autoridades para valorar una inspección oportuna y legal. Revisar registros, especies, existencias, permisos y cadena de custodia.',note:'ACTUACIÓN: solicitud fundamentada de comprobación y conservación por funcionarios autorizados, sin intervención independiente.'}
  ]
 }
};
const voyages=Object.freeze([1,2,3,4,5,6].map(n=>({sequence:n,year:2025,region:'ASIA'})));
const escapeHtml=(str)=>String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderEvidence(index,lang){
 const l=['pt','en','es'].includes(lang)?lang:'en';
 const tx={
  pt:{facility:'ESTALEIRO · SANTA CATARINA',lead:'Recepção / processamento / armazenamento de barbatanas: informação ainda sujeita a verificação no local.',history:'HISTÓRICO DE CONTÊINER · 2025',year:'VIAGEM',asia:'ÁSIA',ports:'A consulta indica seis viagens em 2025 e inclui passagem por Hong Kong. Os dados disponíveis não identificam a viagem exata da escala nem o conteúdo de cada contêiner.',hong:'HONG KONG',possible:'DESTINO PROVÁVEL CITADO',notConfirmed:'Passagem pelo porto ≠ entrega de barbatanas. O destino final e a carga exigem confirmação documental.',urgent:'PRIORIDADE ELEVADA',urgentTitle:'VERIFICAÇÃO TEMPESTIVA DAS INSTALAÇÕES',urgentDesc:'Solicitar às autoridades competentes avaliação imediata para inspeção legal, verificação dos estoques e registros, identificação de espécies e preservação de documentos e vestígios.',urgentCaution:'Não presumir fraude nem executar ações sem competência e autorização.'},
  en:{facility:'SHIPYARD · SANTA CATARINA',lead:'Receipt / processing / storage of fins: intelligence requiring verification at the site.',history:'CONTAINER HISTORY · 2025',year:'VOYAGE',asia:'ASIA',ports:'The query shows six voyages in 2025 including a Hong Kong call. Available records do not specify which of the six calls occurred there or the contents of any shipment.',hong:'HONG KONG',possible:'REPORTED PROBABLE DESTINATION',notConfirmed:'Port call ≠ delivery of fins. Final destination and cargo require documentary verification.',urgent:'HIGH PRIORITY',urgentTitle:'TIMELY FACILITY VERIFICATION',urgentDesc:'Refer an immediate lawful inspection request to competent authorities, covering stock, records, species identification and preservation of documentary and physical evidence.',urgentCaution:'Do not presume a crime or take action without authority.'},
  es:{facility:'ASTILLERO · SANTA CATARINA',lead:'Recepción / procesamiento / almacenamiento de aletas: información pendiente de verificación en el lugar.',history:'HISTORIAL DEL CONTENEDOR · 2025',year:'VIAJE',asia:'ASIA',ports:'La consulta registra seis viajes en 2025 e incluye escala en Hong Kong. No se identifica cuál de los seis viajes hizo la escala ni el contenido de las cargas.',hong:'HONG KONG',possible:'DESTINO PROBABLE MENCIONADO',notConfirmed:'Escala portuaria ≠ entrega de aletas. Destino final y mercancías requieren comprobación documental.',urgent:'PRIORIDAD ALTA',urgentTitle:'VERIFICACIÓN OPORTUNA DE LAS INSTALACIONES',urgentDesc:'Solicitar a las autoridades competentes una inspección legal inmediata para revisar existencias, registros, identificación de especies y conservación de indicios.',urgentCaution:'No presumir delito ni actuar sin competencia y autorización.'}
 }[l];
 if(index===0)return '<section class="ayla-shark-brief"><figure class="ayla-shark-photo"><img src="assets/mission4-shipyard-photo.webp?v=4.1.0" alt="Estaleiro e sacos de barbatanas de tubarão" loading="eager"><figcaption>AY-004 / SHIPYARD INTELLIGENCE</figcaption></figure><div class="ayla-shark-brief-kicker">SC-401 / INTELLIGENCE ALERT</div><div class="ayla-shark-facility"><div class="ayla-shark-warehouse" aria-hidden="true"><span>▥</span><small>SC / SHIPYARD</small></div><div><h3>'+escapeHtml(tx.facility)+'</h3><p>'+escapeHtml(tx.lead)+'</p></div></div></section>';
 if(index===1)return '<section class="ayla-container-history"><header><span>LG-402</span><strong>'+escapeHtml(tx.history)+'</strong></header><div class="ayla-container-voyages">'+voyages.map(v=>'<div><span>'+escapeHtml(tx.year)+' '+String(v.sequence).padStart(2,'0')+'</span><strong>2025</strong><em>'+escapeHtml(tx.asia)+'</em></div>').join('')+'</div><aside><strong>HONG KONG / PORT CALL</strong><p>'+escapeHtml(tx.ports)+'</p></aside></section>';
 if(index===2)return '<section class="ayla-hk-brief"><strong>HK-403 / '+escapeHtml(tx.possible)+'</strong><div class="ayla-hk-location"><span>SC</span><i aria-hidden="true">······</i><span>'+escapeHtml(tx.hong)+'</span></div><p>'+escapeHtml(tx.notConfirmed)+'</p></section>';
 return '<section class="ayla-urgent-brief"><div class="ayla-urgent-header"><span class="ayla-urgent-dot"></span>'+escapeHtml(tx.urgent)+'</div><h3>'+escapeHtml(tx.urgentTitle)+'</h3><p>'+escapeHtml(tx.urgentDesc)+'</p><small>'+escapeHtml(tx.urgentCaution)+'</small></section>';
}
window.AYLAMissionFour={locales,voyages,renderEvidence,answer:[0,1,2]};
})();