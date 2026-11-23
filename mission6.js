/* AYLA / AY-006 — Bear bile intelligence case.
 * Entire scenario and identities are fictional training content. The
 * Adolfo Suárez Madrid-Barajas airport name and aviation security functions
 * are factual background, not a claim of an actual seizure.
 */
(function(){
'use strict';
const locales={
pt:{
 missionTitle:'As Ampolas de Madrid',missionSubtitle:'Tráfico de bile de urso: perícia, rota aérea e preservação de um story como evidência OSINT.',
 mapTitle:'ROTA DOCUMENTADA · MOSCOU → MADRID',routeWarning:'Cenário fictício: trecho Moscou–Madrid registrado em bilhetes e controles. Viagens repetidas não comprovam crimes anteriores.',
 reportTitle:'DOSSIÊ AY-006 · BILE DE URSO',reportIntro:'Correlacione fiscalização, laudo, histórico de voos e fontes abertas. A captura do story deve constar no dossiê antes do envio.',
 terminalFoot:'Dados pessoais e passaporte foram simulados e minimizados para treinamento. Preserve fonte, data e limites da evidência.',
 boardTitle:'REDE SOCMINT · CORRELAÇÕES A VERIFICAR',boardFoot:'Uma fotografia com uma pessoa investigada é pista de relação social, não prova de participação em tráfico.',
 objectiveWinston:'Receba o briefing de Winston sobre a apreensão em Madrid.',objectiveTerminal:'Analise o registro aeroportuário, a perícia, a passageira e o story.',objectiveMap:'Confirme a rota Moscou–Madrid e separe deslocamentos comprovados de inferências.',objectiveBoard:'Correlacione residência, atividade empresarial e conexões sociais fictícias.',objectiveReport:'Capture o story e anexe a imagem ao dossiê antes do envio.',
 mentorLines:[
 'Ayla, a segurança aeroportuária do Adolfo Suárez Madrid-Barajas reteve uma caixa com várias ampolas. A perícia do nosso cenário identificou bile de Ursus tibetanus. Os controles de viagem indicam uma rota Moscou–Madrid e quatro viagens equivalentes nos últimos três anos.',
 'Recebemos um extrato de passaporte simulado. Investigue fontes autorizadas, compare perfis e preserve um story em que a passageira aparece com o operador X-09, personagem fictício conhecido neste caso. Uma fotografia é uma pista: entregue às autoridades espanholas o que está comprovado, sem acusação pública.'
 ],
 legendConfirmed:'FATOS DO CENÁRIO',legendConfirmedText:'Ampolas retidas em Madrid-Barajas; laudo identificou bile de Ursus tibetanus. Bilhetes documentam Moscou–Madrid.',
 legendSuspected:'VÍNCULOS A INVESTIGAR',legendSuspectedText:'Quatro viagens não demonstram repetição do tráfico; a associação social e os negócios exigem corroboração.',
 evidenceConfirmed:'Fiscalização e cadeia de custódia',evidenceObserved:'No cenário, vigilantes de segurança privada do controle aeroportuário encontraram a caixa de ampolas. O material foi encaminhado para exame oficial.',
 evidenceOpen:'Perícia e espécie',evidenceLead:'O laudo do exercício identificou bile de Ursus tibetanus; uma identificação da substância não comprova autoria nem origem geográfica do material.',
 evidenceRoute:'Bilhetes e histórico migratório',evidenceRouteText:'Rota Moscou–Madrid do voo analisado; três deslocamentos anteriores no mesmo corredor em três anos. A finalidade de cada viagem continua desconhecida.',
 evidenceGap:'Pistas OSINT sob reserva',evidenceGapText:'Residência e empresa fictícias em Madrid; postagens de Instagram/Facebook; story com operador X-09. Preservar captura, URL fictícia, horário e contexto antes de encaminhar à polícia.',
 question1:'1. Que conclusão a perícia sustenta?',answers1:['A passageira transportou bile nas quatro viagens anteriores.','As ampolas do cenário continham bile identificada como Ursus tibetanus.','O story demonstra que o operador X-09 enviou as ampolas.'],
 question2:'2. O que é possível afirmar sobre a rota?',answers2:['A viagem investigada seguiu Moscou–Madrid; outras três viagens no corredor foram registradas, sem comprovação de ilícito nelas.','As quatro viagens levaram o mesmo material.','Os negócios em Madrid comprovam a origem russa da bile.'],
 question3:'3. Qual tratamento correto para o story?',answers3:['Publicar a imagem com a acusação para mobilizar usuários.','Excluir a postagem porque a foto não demonstra um crime.','Capturar, registrar a origem e anexar como pista de relação social, distinguindo indícios de prova.'],
 locked:'Converse com Winston, analise quatro fontes, revise a rota, consulte o quadro e capture o story antes de enviar o dossiê.',
 successToast:'Story arquivado e análise encaminhada à polícia espanhola no cenário de treinamento.',
 finalHeading:'Uma conexão social é uma pista, não uma condenação.',
 finalBody:'Ayla preservou a imagem do story e anexou sua cadeia de proveniência ao dossiê AY-006. O laudo e a rota aérea foram tratados como fatos do cenário; as viagens anteriores, a empresa e o contato social como pistas sujeitas a verificação pelas autoridades espanholas.',
 capture:'CAPTURAR STORY E ANEXAR AO DOSSIÊ',captured:'STORY CAPTURADO E ANEXADO',captureRequired:'Capture o story no terminal antes de entregar o dossiê.',storyTag:'STORY ARQUIVADO · FONTE FICTÍCIA',storyInfo:'Captura de fonte aberta preservada para o dossiê policial, sem identificação real.',training:'CENÁRIO FICTÍCIO · DADOS SIMULADOS',
 mapHeading:'REGISTRO AEROPORTUÁRIO / MOSCOU → MADRID',mapFoot:'O material do cenário foi retido em Madrid-Barajas. Três viagens anteriores no mesmo corredor não têm cargas confirmadas.',
 dossierAttachment:'ANEXO VISUAL · STORY PRESERVADO',
 sources:[
 {id:'AV-601',cat:'[O] SEGURANÇA AEROPORTUÁRIA',title:'Caixa de ampolas no aeroporto',date:'CENÁRIO AY-006 · MADRID-BARAJAS',body:'Durante a inspeção de bagagem, vigilantes de segurança privada habilitados para controles aeroportuários detectaram uma caixa com várias ampolas. A ocorrência foi remetida à Guardia Civil, com preservação do material para perícia.',note:'OBSERVADO NO JOGO: retenção das ampolas. Não se atribuem fatos a uma ocorrência real.'},
 {id:'LAB-602',cat:'[T] LAUDO PERICIAL',title:'Substância identificada: bile de urso',date:'PERÍCIA DO CENÁRIO · AY-006',body:'O material nas ampolas foi examinado. O laudo fictício identifica bile de urso-negro-asiático (Ursus tibetanus). A quantidade exata e a origem dos indivíduos não foram determinadas.',note:'CONCLUSÃO LIMITADA: identificação da substância e espécie. Não se conclui, por isso, autoria ou rede criminosa.'},
 {id:'PAS-603',cat:'[O] BILHETES / DOCUMENTO RECEBIDO',title:'Passageira russa residente na Espanha',date:'EXTRATO DE TREINAMENTO · PASSAPORTE MASCARADO',body:'Identificador simulado R-17; nacionalidade russa; residência declarada na Espanha. Há quatro registros de voos Moscou–Madrid em três anos, incluindo o voo investigado. Fontes fictícias apontam uma residência e um pequeno comércio em Madrid, sem ligação material comprovada com as ampolas.',note:'PROTEÇÃO DE DADOS: número de passaporte e endereço não são exibidos; registros de viagens anteriores não provam conduta ilícita.'},
 {id:'SOC-604',cat:'[N] STORY / INSTAGRAM / FACEBOOK',title:'Story com o operador X-09',date:'STORY FICTÍCIO · PRESERVAÇÃO OSINT',body:'Postagens sociais fictícias ligam R-17 a um estabelecimento e a um círculo de contatos de Madrid. Um story temporário mostra R-17 ao lado do operador X-09, personagem associado ao tráfico no universo do jogo. A imagem precisa ser capturada e anexada antes de desaparecer.',note:'PISTA [N]: coaparição visual e vínculo social; não prova tráfico nem participação conjunta. Registrar captura e contexto para a polícia.'}
 ]},
en:{
 missionTitle:'The Madrid Ampoules',missionSubtitle:'Bear bile trafficking: laboratory evidence, air route and preserving a social-media story as an OSINT lead.',
 mapTitle:'DOCUMENTED FLIGHT · MOSCOW → MADRID',routeWarning:'Fictional training case: Moscow–Madrid flight is documented in the scenario. Repeat travel is not evidence of prior smuggling.',
 reportTitle:'DOSSIER AY-006 · BEAR BILE',reportIntro:'Compare security, forensic, travel and open-source evidence. Capture the story before submitting the dossier.',
 terminalFoot:'Passport and personal data are masked, fictional training records. Preserve source and evidentiary limitations.',
 boardTitle:'SOCMINT NETWORK · UNVERIFIED LINKS',boardFoot:'Being photographed with a person of interest is a social lead, not proof of trafficking.',
 objectiveWinston:'Receive Winston’s briefing on the Madrid seizure.',objectiveTerminal:'Inspect airport records, laboratory finding, passenger record and story.',objectiveMap:'Verify Moscow–Madrid and distinguish travel records from inference.',objectiveBoard:'Review fictional residence, business and social ties in Madrid.',objectiveReport:'Capture and attach the story before submitting the dossier.',
 mentorLines:[
 'Ayla, airport security at Adolfo Suárez Madrid-Barajas retained a box of ampoules. In this fictional exercise the lab identified bear bile from Ursus tibetanus. The documented corridor is Moscow–Madrid, with four flights over three years.',
 'A masked training passport extract has reached the center. Compare the social profiles and preserve a story showing passenger R-17 beside operator X-09, a fictional person of interest. This photograph is a lead, not proof: document its provenance before referring the case to Spanish police.'
 ],
 legendConfirmed:'TRAINING FACTS',legendConfirmedText:'Ampoules found at Madrid-Barajas, forensic identification as Ursus tibetanus, Moscow–Madrid flight.',
 legendSuspected:'LEADS TO VERIFY',legendSuspectedText:'Three previous trips do not establish repeated trafficking; business and social links require verification.',
 evidenceConfirmed:'Security and custody',evidenceObserved:'Private security officers assigned to airport screening found the ampoules in this fictional case and referred the material for official examination.',
 evidenceOpen:'Forensic species identification',evidenceLead:'The scenario laboratory identified bile from Ursus tibetanus, but this does not establish criminal authorship or geographic origin.',
 evidenceRoute:'Tickets and travel history',evidenceRouteText:'One investigated Moscow–Madrid journey plus three earlier flights on the same corridor over three years; no validated contents for previous journeys.',
 evidenceGap:'Restricted OSINT leads',evidenceGapText:'Fictional residence, business and Instagram/Facebook connections in Madrid; story with operator X-09. Preserve screenshot, time and provenance for police.',
 question1:'1. What does the forensic report establish?',answers1:['The passenger carried bear bile on every prior flight.','The scenario ampoules contained bile identified as Ursus tibetanus.','The story proves X-09 sent the ampoules.'],
 question2:'2. What is supported about the route?',answers2:['Moscow–Madrid is documented for this journey, and three earlier journeys, without evidence of offenses on those trips.','All four trips carried the same substance.','The Madrid shop proves the bile came from Russia.'],
 question3:'3. How should Ayla handle the story?',answers3:['Publish accusations with the image.','Delete the story because a photograph is not conclusive.','Capture, preserve provenance, and attach it as a social lead, not conclusive evidence.'],
 locked:'Speak to Winston, review all four records, examine the route and board, then capture the story before submitting the case.',
 successToast:'Story preserved and fictional dossier referred for Spanish police review.',
 finalHeading:'A social link is a lead, not a conviction.',
 finalBody:'Ayla captured the temporary story and added its provenance to the AY-006 dossier. The flight and lab result are treated as scenario facts; earlier journeys and social ties remain leads for authorized Spanish investigators.',
 capture:'CAPTURE STORY AND ATTACH TO DOSSIER',captured:'STORY CAPTURED AND ATTACHED',captureRequired:'Capture the story at the OSINT terminal before filing the dossier.',storyTag:'ARCHIVED STORY · FICTIONAL SOURCE',storyInfo:'Open-source screenshot stored in the police referral dossier; no real person identified.',training:'FICTIONAL SCENARIO · SIMULATED DATA',
 mapHeading:'AIR TRAVEL RECORD / MOSCOW → MADRID',mapFoot:'The fictional ampoules were retained at Madrid-Barajas. Three earlier flights have no verified luggage contents.',
 dossierAttachment:'VISUAL ATTACHMENT · PRESERVED STORY',
 sources:[
 {id:'AV-601',cat:'[O] AIRPORT SECURITY',title:'Box of ampoules detected at screening',date:'AY-006 SCENARIO · MADRID-BARAJAS',body:'Airport-screening private security officers detected a box holding multiple ampoules. The scenario records a handover to the Guardia Civil for forensic processing.',note:'TRAINING OBSERVATION: seizure is fictional; the role and airport name reflect real institutional terminology.'},
 {id:'LAB-602',cat:'[T] FORENSIC IDENTIFICATION',title:'Species: Asian black bear',date:'SIMULATED FORENSIC REPORT · AY-006',body:'Analysis of the ampoules identified bear bile linked to Ursus tibetanus. The total quantity and precise origins of the animals are not established.',note:'LIMIT: confirming a product and species is not proof of a perpetrator or the substance’s origin.'},
 {id:'PAS-603',cat:'[O] PASSENGER RECORD',title:'Russian national residing in Spain',date:'MASKED TRAINING PASSPORT',body:'Simulated identifier R-17, Russian nationality and declared Spanish residence. Four Moscow–Madrid flights in three years, including the investigated journey. The case has fictional premises and a small business in Madrid but no verified operational connection to the ampoules.',note:'DATA MINIMIZATION: no usable passport number or home address; earlier travel is not evidence of criminal conduct.'},
 {id:'SOC-604',cat:'[N] SOCIAL-MEDIA STORY',title:'Temporary story with operator X-09',date:'FICTIONAL STORY · OSINT CAPTURE',body:'Invented social profiles connect R-17 to a Madrid business and acquaintances. A temporary story depicts R-17 beside fictional operator X-09, a trafficking person of interest in the game. Preserve the visual and its context.',note:'SOCIAL LEAD ONLY: a shared photograph does not prove criminal participation.'}
 ]},
es:{
 missionTitle:'Las Ampollas de Madrid',missionSubtitle:'Tráfico de bilis de oso: peritaje, ruta aérea y captura de una historia como pista OSINT.',
 mapTitle:'VUELO DOCUMENTADO · MOSCÚ → MADRID',routeWarning:'Caso ficticio: el trayecto Moscú–Madrid está documentado en el juego. Los viajes anteriores no demuestran tráfico.',
 reportTitle:'EXPEDIENTE AY-006 · BILIS DE OSO',reportIntro:'Compara seguridad, peritaje, viajes y redes sociales. Captura la historia antes de entregar el expediente.',
 terminalFoot:'Pasaporte y datos personales simulados y protegidos; documenta siempre la procedencia de las pistas.',
 boardTitle:'RED SOCMINT · VÍNCULOS SIN VERIFICAR',boardFoot:'Una foto con una persona investigada es indicio social, no prueba de tráfico.',
 objectiveWinston:'Recibe de Winston el informe del caso Madrid.',objectiveTerminal:'Analiza seguridad, laboratorio, pasaporte e historia.',objectiveMap:'Verifica Moscú–Madrid y las limitaciones de los viajes anteriores.',objectiveBoard:'Revisa vivienda, negocio y vínculos sociales ficticios.',objectiveReport:'Captura y adjunta la historia al expediente antes de enviarlo.',
 mentorLines:[
 'Ayla, la seguridad del aeropuerto Adolfo Suárez Madrid-Barajas retuvo una caja con ampollas. En este ejercicio ficticio, el laboratorio identificó bilis de Ursus tibetanus. Hay cuatro vuelos Moscú–Madrid durante tres años.',
 'El centro dispone de un pasaporte simulado. Compara los perfiles y preserva la historia donde R-17 aparece con X-09, un personaje ficticio de interés para la investigación. No confundas una relación social con prueba penal.'
 ],
 legendConfirmed:'HECHOS DEL EJERCICIO',legendConfirmedText:'Ampollas retenidas en Madrid-Barajas, peritaje de Ursus tibetanus y ruta Moscú–Madrid.',
 legendSuspected:'INDICIOS SIN VERIFICAR',legendSuspectedText:'Los tres vuelos anteriores no demuestran delitos; empresa y relaciones precisan corroboración.',
 evidenceConfirmed:'Seguridad y custodia',evidenceObserved:'En el juego, vigilantes de seguridad privada del control aeroportuario detectan ampollas y entregan el material a la Guardia Civil.',
 evidenceOpen:'Especie identificada',evidenceLead:'El peritaje ficticio identifica bilis de Ursus tibetanus sin demostrar autoría ni procedencia.',
 evidenceRoute:'Billetes e historial',evidenceRouteText:'Viaje investigado Moscú–Madrid y tres anteriores durante tres años. Se desconoce el contenido de los equipajes anteriores.',
 evidenceGap:'Pistas OSINT',evidenceGapText:'Vivienda y negocio inventados de Madrid, redes sociales e historia con operador X-09. Capturar y documentar su procedencia.',
 question1:'1. ¿Qué confirma el peritaje?',answers1:['Hubo bilis en todos los viajes anteriores.','Las ampollas del ejercicio contenían bilis de Ursus tibetanus.','X-09 envió las ampollas según la foto.'],
 question2:'2. ¿Qué puede afirmarse sobre la ruta?',answers2:['El trayecto investigado fue Moscú–Madrid, con otros tres vuelos registrados sin delitos confirmados.','Los cuatro vuelos llevaron las mismas sustancias.','El negocio de Madrid confirma el origen de la bilis.'],
 question3:'3. ¿Cómo tratar la historia?',answers3:['Publicarla acusando a los protagonistas.','Descartarla porque no prueba un delito.','Capturarla y adjuntarla como pista social, con procedencia y limitaciones.'],
 locked:'Habla con Winston, revisa las cuatro fuentes, analiza ruta y conexiones y captura la historia antes de entregar el expediente.',
 successToast:'Historia archivada y expediente ficticio remitido para revisión policial.',
 finalHeading:'Una relación social es una pista, no una condena.',
 finalBody:'Ayla conservó la imagen de la historia y registró su procedencia en el expediente AY-006. La ruta y el peritaje son hechos del ejercicio; los demás vínculos siguen sujetos a verificación policial.',
 capture:'CAPTURAR HISTORIA Y ADJUNTAR',captured:'HISTORIA CAPTURADA Y ADJUNTADA',captureRequired:'Captura la historia en el terminal antes de entregar el expediente.',storyTag:'HISTORIA ARCHIVADA · FUENTE FICTICIA',storyInfo:'Captura de fuente abierta conservada sin identificar personas reales.',training:'ESCENARIO FICTICIO · DATOS SIMULADOS',
 mapHeading:'HISTORIAL AÉREO / MOSCÚ → MADRID',mapFoot:'Las ampollas del juego se detectaron en Madrid-Barajas; se desconoce la carga de los vuelos anteriores.',
 dossierAttachment:'ANEXO VISUAL · HISTORIA CONSERVADA',
 sources:[
 {id:'AV-601',cat:'[O] SEGURIDAD AEROPORTUARIA',title:'Caja de ampollas en el control',date:'AY-006 · MADRID-BARAJAS',body:'Vigilantes de seguridad privada del control aeroportuario detectaron una caja con ampollas y remitieron el material a la Guardia Civil para su análisis, en el escenario ficticio.',note:'OBSERVADO EN EL JUEGO: ningún hecho se atribuye a una persona real.'},
 {id:'LAB-602',cat:'[T] INFORME PERICIAL',title:'Bilis de oso negro asiático',date:'PERITAJE SIMULADO · AY-006',body:'El análisis de las ampollas detectó bilis de Ursus tibetanus. No se establecieron cantidades exactas ni el origen de los animales.',note:'LÍMITE: identificar el material no prueba autoría ni procedencia geográfica.'},
 {id:'PAS-603',cat:'[O] PASAPORTE Y BILLETES',title:'Pasajera rusa residente en España',date:'DOCUMENTACIÓN DE ENTRENAMIENTO',body:'Identificador ficticio R-17. Nacionalidad rusa y residencia declarada en España. Cuatro vuelos Moscú–Madrid en tres años, incluido el vuelo investigado. Existen indicios ficticios de residencia y comercio en Madrid.',note:'PROTECCIÓN: no se muestran números reales ni direcciones particulares.'},
 {id:'SOC-604',cat:'[N] HISTORIA DE RED SOCIAL',title:'Historia junto al operador X-09',date:'HISTORIA FICTICIA · CAPTURA OSINT',body:'Las publicaciones inventadas asocian R-17 con un comercio madrileño y un grupo social. La historia muestra a R-17 junto al personaje X-09, sospechoso ficticio de interés internacional.',note:'INDICIO SOCIAL: aparecer en una foto no demuestra participación criminal.'}
 ]}
};
function safe(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function copy(lang){return locales[lang]||locales.en;}
function storyImage(lang){
 const t=copy(lang),caption='R-17  /  X-09  •  MADRID';
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="520" height="600" viewBox="0 0 520 600"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#143a3c"/><stop offset="1" stop-color="#0b131c"/></linearGradient></defs><rect width="520" height="600" rx="14" fill="url(#bg)"/><rect x="15" y="13" width="490" height="6" rx="3" fill="#9febb2"/><text x="33" y="61" font-size="23" fill="white" font-family="sans-serif">● R-17  ·  14 h</text><text x="34" y="108" font-size="15" fill="#b1d7c9" font-family="monospace">SIMULATED / FICTIONAL STORY</text><path d="M88 384 Q80 260 180 245 Q245 258 263 390 L263 521 L62 521Z" fill="#46636e"/><circle cx="165" cy="240" r="67" fill="#a8b1a8"/><path d="M97 226 Q92 155 156 153 Q225 142 233 228 Q180 187 97 226" fill="#2c3436"/><path d="M282 377 Q280 258 388 247 Q458 267 467 374 L473 518 L275 518Z" fill="#405a50"/><circle cx="367" cy="238" r="70" fill="#9b958d"/><path d="M290 231 Q309 147 384 160 Q444 162 439 238 Q395 199 290 231" fill="#1e3031"/><rect x="98" y="223" width="132" height="24" rx="11" fill="#141b1c"/><rect x="298" y="219" width="137" height="27" rx="12" fill="#121a1b"/><text x="25" y="562" font-size="20" fill="#def5df" font-family="monospace">'+caption+'</text><text x="26" y="586" font-size="13" fill="#a3c0b5" font-family="sans-serif">AYLA / AY-006 · TRAINING EVIDENCE</text></svg>';
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function renderEvidence(index,lang,state){
 const t=copy(lang);
 if(index===0)return '<figure class="m6-evidence-art"><img src="assets/mission6-art.svg" alt="'+safe(t.missionTitle)+'"><figcaption>'+safe(t.training)+'</figcaption></figure>';
 if(index===1)return '<div class="m6-sample"><strong>Ursus tibetanus</strong><span>LAB / AY-006 · '+safe(t.training)+'</span><div class="m6-vials"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>';
 if(index===2)return '<div class="m6-passport"><span>R-17 · PASSPORT EXTRACT</span><strong>RU •••• 7042</strong><span>MOSCOW → MADRID · 4 / 3 YEARS</span><small>'+safe(t.training)+'</small></div>'+renderNetwork(lang);
 if(index===3)return '<div class="m6-story-workspace '+(state?.m6StoryCaptured?'is-captured':'')+'"><img class="m6-story-shot" src="'+storyImage(lang)+'" alt="'+safe(t.storyTag)+'"><p>'+safe(t.storyInfo)+'</p><button type="button" id="m6CaptureStory" class="primary-button" '+(state?.m6StoryCaptured?'disabled':'')+'>'+(state?.m6StoryCaptured?safe(t.captured):safe(t.capture))+'</button></div>';
 return '';
}
function renderMap(lang){
 const t=copy(lang);
 return '<div class="m6-map-workspace"><span class="m6-label">'+safe(t.training)+'</span><h3>'+safe(t.mapHeading)+'</h3><div class="m6-route"><div><b>МОСКВА</b><strong>MOSCOW · AIRPORT UNVERIFIED</strong><small>RUSSIA</small></div><span class="m6-flight">✈</span><div><b>MADRID</b><strong>ADOLFO SUÁREZ MADRID-BARAJAS</strong><small>SPAIN</small></div></div><div class="m6-flight-history"><b>4 ×</b><span>MOSCOW → MADRID<br>3 YEARS · SIMULATED DOCUMENTS</span></div><p>'+safe(t.mapFoot)+'</p></div>';
}
function renderNetwork(lang){
 const t=copy(lang);
 const labels={
  pt:{center:'PASSAGEIRA R-17',home:'RESIDÊNCIA · SETOR INVENTADO / MADRID',business:'NEGÓCIO · LOJA FICTÍCIA / MADRID',instagram:'INSTAGRAM · PERFIL SIMULADO',facebook:'FACEBOOK · RELAÇÕES SIMULADAS',contact:'OPERADOR X-09 · VÍNCULO SOCIAL',limit:'Conexões de fontes fictícias. A existência de uma ligação social não prova crime.'},
  en:{center:'PASSENGER R-17',home:'RESIDENCE · INVENTED DISTRICT / MADRID',business:'BUSINESS · FICTIONAL SHOP / MADRID',instagram:'INSTAGRAM · SIMULATED PROFILE',facebook:'FACEBOOK · SIMULATED CONTACTS',contact:'OPERATOR X-09 · SOCIAL LINK',limit:'Fictional sources only. A social connection does not establish an offense.'},
  es:{center:'PASAJERA R-17',home:'VIVIENDA · BARRIO INVENTADO / MADRID',business:'NEGOCIO · TIENDA FICTICIA / MADRID',instagram:'INSTAGRAM · PERFIL SIMULADO',facebook:'FACEBOOK · CONTACTOS SIMULADOS',contact:'OPERADOR X-09 · VÍNCULO SOCIAL',limit:'Fuentes ficticias. Una relación social no demuestra un delito.'}
 }[lang]||null;
 const x=labels||{center:'PASSENGER R-17',home:'RESIDENCE / MADRID',business:'BUSINESS / MADRID',instagram:'INSTAGRAM',facebook:'FACEBOOK',contact:'OPERATOR X-09',limit:'Fictional links'};
 return '<div class="m6-network"><div class="m6-network-root">'+safe(x.center)+'</div><div class="m6-network-grid">'+[x.home,x.business,x.instagram,x.facebook,x.contact].map(n=>'<div class="m6-network-node">'+safe(n)+'</div>').join('')+'</div><small>'+safe(x.limit)+'</small></div>';
}
function storyAttachment(lang){
 const t=copy(lang);
 return '<div class="m6-report-attachment"><img src="'+storyImage(lang)+'" alt="'+safe(t.storyTag)+'"><div><strong>'+safe(t.dossierAttachment)+'</strong><p>AY6-STORY-001 / R-17 / X-09</p><small>'+safe(t.storyInfo)+'</small></div></div>';
}
window.AYLAMissionSix={locales,copy,answer:[1,0,2],renderEvidence,renderMap,renderNetwork,storyAttachment,storyImage};
})();