/* AYLA / AY-006 — Bear bile intelligence case.
 * Entire scenario and identities are investigative case content. The
 * Adolfo Suárez Madrid-Barajas airport name and aviation security functions
 * are factual background, not a claim of an actual seizure.
 */
(function(){
'use strict';
const locales={
pt:{
 missionTitle:'As Ampolas de Madrid',missionSubtitle:'Tráfico de bile de urso: perícia, rota aérea e preservação de um story como evidência OSINT.',
 mapTitle:'ROTA DOCUMENTADA · MOSCOU → MADRID',routeWarning:'trecho Moscou–Madrid registrado em bilhetes e controles. Viagens repetidas não comprovam crimes anteriores.',
 reportTitle:'DOSSIÊ AY-006 · BILE DE URSO',reportIntro:'Correlacione fiscalização, laudo, histórico de voos e fontes abertas. A captura do story deve constar no dossiê antes do envio.',
 terminalFoot:'Dados pessoais e passaporte foram protegidos e minimizados para análise. Preserve fonte, data e limites da evidência.',
 boardTitle:'REDE SOCMINT · CORRELAÇÕES A VERIFICAR',boardFoot:'Uma fotografia com uma pessoa investigada é pista de relação social, não prova de participação em tráfico.',
 objectiveWinston:'Receba o briefing de Winston sobre a apreensão em Madrid.',objectiveTerminal:'Analise o registro aeroportuário, a perícia, a passageira e o story.',objectiveMap:'Confirme a rota Moscou–Madrid e separe deslocamentos comprovados de inferências.',objectiveBoard:'Correlacione residência, atividade empresarial e conexões sociais identificadas.',objectiveReport:'Capture o story e anexe a imagem ao dossiê antes do envio.',
 mentorLines:[
 'Ayla, a segurança aeroportuária do Adolfo Suárez Madrid-Barajas reteve uma caixa com várias ampolas. A perícia da Agência identificou bile de Ursus tibetanus. Os controles de viagem indicam uma rota Moscou–Madrid e quatro viagens anteriores no mesmo corredor nos últimos três anos.',
 'Recebemos um extrato de passaporte protegido. Investigue fontes autorizadas, compare perfis e preserve a publicação temporária em que a passageira aparece com o contato sob investigação, identificado no material analisado. Uma fotografia é uma pista: entregue às autoridades espanholas o que está comprovado, sem acusação pública.'
 ],
 legendConfirmed:'FATOS DOCUMENTADOS',legendConfirmedText:'Ampolas retidas em Madrid-Barajas; laudo identificou bile de Ursus tibetanus. Bilhetes documentam Moscou–Madrid.',
 legendSuspected:'VÍNCULOS A INVESTIGAR',legendSuspectedText:'Quatro viagens anteriores não demonstram repetição do tráfico; a associação social e os negócios exigem corroboração.',
 evidenceConfirmed:'Fiscalização e cadeia de custódia',evidenceObserved:'No controle aeroportuário, vigilantes de segurança privada do controle aeroportuário encontraram a caixa de ampolas. O material foi encaminhado para exame oficial.',
 evidenceOpen:'Perícia e espécie',evidenceLead:'O laudo identificou bile de Ursus tibetanus; uma identificação da substância não comprova autoria nem origem geográfica do material.',
 evidenceRoute:'Bilhetes e histórico migratório',evidenceRouteText:'Rota Moscou–Madrid do voo analisado; quatro deslocamentos anteriores no mesmo corredor em três anos. A finalidade de cada viagem continua desconhecida.',
 evidenceGap:'Pistas OSINT sob reserva',evidenceGapText:'Residência e empresa identificadas em Madrid; postagens de Instagram/Facebook; story com contato sob investigação. Preservar captura, URL de origem, horário e contexto antes de encaminhar à polícia.',
 question1:'1. Que conclusão a perícia sustenta?',answers1:['A passageira transportou bile nas quatro viagens anteriores.','As ampolas continham bile identificada como Ursus tibetanus.','O story demonstra que o contato sob investigação enviou as ampolas.'],
 question2:'2. O que é possível afirmar sobre a rota?',answers2:['A viagem investigada seguiu Moscou–Madrid; outras quatro viagens anteriores no corredor foram registradas, sem comprovação de ilícito nelas.','As quatro viagens levaram o mesmo material.','Os negócios em Madrid comprovam a origem russa da bile.'],
 question3:'3. Qual tratamento correto para o story?',answers3:['Publicar a imagem com a acusação para mobilizar usuários.','Excluir a postagem porque a foto não demonstra um crime.','Capturar, registrar a origem e anexar como pista de relação social, distinguindo indícios de prova.'],
 locked:'Converse com Winston, analise quatro fontes, revise a rota, consulte o quadro e capture o story antes de enviar o dossiê.',
 successToast:'Story arquivado e análise encaminhada à polícia espanhola para análise.',
 finalHeading:'Uma conexão social é uma pista, não uma condenação.',
 finalBody:'Ayla preservou a imagem do story e anexou sua cadeia de proveniência ao dossiê AY-006. O laudo e a rota aérea foram tratados como fatos documentados; as viagens anteriores, a empresa e o contato social como pistas sujeitas a verificação pelas autoridades espanholas.',
 capture:'CAPTURAR STORY E ANEXAR AO DOSSIÊ',captured:'STORY CAPTURADO E ANEXADO',captureRequired:'Capture o story no terminal antes de entregar o dossiê.',storyTag:'STORY ARQUIVADO · FONTE REGISTRADA',storyInfo:'Captura de fonte aberta preservada para o dossiê policial, sem identificação real.',training:'REGISTROS DA INVESTIGAÇÃO',
 mapHeading:'REGISTRO AEROPORTUÁRIO / MOSCOU → MADRID',mapFoot:'O material foi retido em Madrid-Barajas. Quatro viagens anteriores no mesmo corredor não têm cargas confirmadas.',
 dossierAttachment:'ANEXO VISUAL · STORY PRESERVADO',
 sources:[
 {id:'AV-601',cat:'[O] SEGURANÇA AEROPORTUÁRIA',title:'Caixa de ampolas no aeroporto',date:'OCORRÊNCIA AY-006 · MADRID-BARAJAS',body:'Durante a inspeção de bagagem, vigilantes de segurança privada habilitados para controles aeroportuários detectaram uma caixa com várias ampolas. A ocorrência foi remetida à Guardia Civil, com preservação do material para perícia.',note:'REGISTRO: retenção das ampolas e encaminhamento do material à perícia.'},
 {id:'LAB-602',cat:'[T] LAUDO PERICIAL',title:'Substância identificada: bile de urso',date:'LAUDO PERICIAL · AY-006',body:'O material nas ampolas foi examinado. O laudo sob análise identifica bile de urso-negro-asiático (Ursus tibetanus). A quantidade exata e a origem dos indivíduos não foram determinadas.',note:'CONCLUSÃO LIMITADA: identificação da substância e espécie. Não se conclui, por isso, autoria ou rede criminosa.'},
 {id:'PAS-603',cat:'[O] BILHETES / DOCUMENTO RECEBIDO',title:'Passageira russa residente na Espanha',date:'EXTRATO DE ANÁLISE · PASSAPORTE MASCARADO',body:'Identificador protegido R-17; nacionalidade russa; residência declarada na Espanha. Há quatro registros anteriores de voos Moscou–Madrid nos últimos três anos, além do voo investigado. Fontes identificadas apontam uma residência e um pequeno comércio em Madrid, sem ligação material comprovada com as ampolas.',note:'PROTEÇÃO DE DADOS: número de passaporte e endereço não são exibidos; registros de viagens anteriores não provam conduta ilícita.'},
 {id:'SOC-604',cat:'[N] STORY / INSTAGRAM / FACEBOOK',title:'Story com o contato sob investigação',date:'STORY REGISTRADO · PRESERVAÇÃO OSINT',body:'Postagens sociais identificadas ligam R-17 a um estabelecimento e a um círculo de contatos de Madrid. Um story temporário mostra R-17 ao lado do contato sob investigação, contato de interesse para a investigação. A imagem precisa ser capturada e anexada antes de desaparecer.',note:'PISTA [N]: coaparição visual e vínculo social; não prova tráfico nem participação conjunta. Registrar captura e contexto para a polícia.'}
 ]},
en:{
 missionTitle:'The Madrid Ampoules',missionSubtitle:'Bear bile trafficking: laboratory evidence, air route and preserving a social-media story as an OSINT lead.',
 mapTitle:'DOCUMENTED FLIGHT · MOSCOW → MADRID',routeWarning:'Moscow–Madrid flight is documented in the travel records. Repeat travel is not evidence of prior smuggling.',
 reportTitle:'DOSSIER AY-006 · BEAR BILE',reportIntro:'Compare security, forensic, travel and open-source evidence. Capture the story before submitting the dossier.',
 terminalFoot:'Passport and personal data are masked, investigative case records. Preserve source and evidentiary limitations.',
 boardTitle:'SOCMINT NETWORK · UNVERIFIED LINKS',boardFoot:'Being photographed with a person of interest is a social lead, not proof of trafficking.',
 objectiveWinston:'Receive Winston’s briefing on the Madrid seizure.',objectiveTerminal:'Inspect airport records, laboratory finding, passenger record and story.',objectiveMap:'Verify Moscow–Madrid and distinguish travel records from inference.',objectiveBoard:'Review investigative residence, business and social ties in Madrid.',objectiveReport:'Capture and attach the story before submitting the dossier.',
 mentorLines:[
 'Ayla, airport security at Adolfo Suárez Madrid-Barajas retained a box of ampoules. In this investigative case the lab identified bear bile from Ursus tibetanus. The documented corridor is Moscow–Madrid, with four earlier flights over three years, in addition to the investigated journey.',
 'A masked case passport extract has reached the center. Compare the social profiles and preserve a story showing passenger R-17 beside contact under investigation, a person of interest. This photograph is a lead, not proof: document its provenance before referring the case to Spanish police.'
 ],
 legendConfirmed:'CASE FACTS',legendConfirmedText:'Ampoules found at Madrid-Barajas, forensic identification as Ursus tibetanus, Moscow–Madrid flight.',
 legendSuspected:'LEADS TO VERIFY',legendSuspectedText:'Four previous trips do not establish repeated trafficking; business and social links require verification.',
 evidenceConfirmed:'Security and custody',evidenceObserved:'Private security officers assigned to airport screening found the ampoules during screening and referred the material for official examination.',
 evidenceOpen:'Forensic species identification',evidenceLead:'The record laboratory identified bile from Ursus tibetanus, but this does not establish criminal authorship or geographic origin.',
 evidenceRoute:'Tickets and travel history',evidenceRouteText:'One investigated Moscow–Madrid journey plus four earlier flights on the same corridor over three years; no validated contents for previous journeys.',
 evidenceGap:'Restricted OSINT leads',evidenceGapText:'Investigative residence, business and Instagram/Facebook connections in Madrid; story with contact under investigation. Preserve screenshot, time and provenance for police.',
 question1:'1. What does the forensic report establish?',answers1:['The passenger carried bear bile on every prior flight.','The seized ampoules contained bile identified as Ursus tibetanus.','The story proves the contact C-09 sent the ampoules.'],
 question2:'2. What is supported about the route?',answers2:['Moscow–Madrid is documented for this journey, and four earlier journeys, without evidence of offenses on those trips.','All four trips carried the same substance.','The Madrid shop proves the bile came from Russia.'],
 question3:'3. How should Ayla handle the story?',answers3:['Publish accusations with the image.','Delete the story because a photograph is not conclusive.','Capture, preserve provenance, and attach it as a social lead, not conclusive evidence.'],
 locked:'Speak to Winston, review all four records, examine the route and board, then capture the story before submitting the case.',
 successToast:'Story preserved and investigative dossier referred for Spanish police review.',
 finalHeading:'A social link is a lead, not a conviction.',
 finalBody:'Ayla captured the temporary story and added its provenance to the AY-006 dossier. The flight and lab result are documented as case findings; earlier journeys and social ties remain leads for authorized Spanish investigators.',
 capture:'CAPTURE STORY AND ATTACH TO DOSSIER',captured:'STORY CAPTURED AND ATTACHED',captureRequired:'Capture the story at the OSINT terminal before filing the dossier.',storyTag:'ARCHIVED STORY · CASE SOURCE',storyInfo:'Open-source screenshot stored in the police referral dossier; no real person identified.',training:'CASE INVESTIGATION RECORDS',
 mapHeading:'AIR TRAVEL RECORD / MOSCOW → MADRID',mapFoot:'The investigative ampoules were retained at Madrid-Barajas. Four earlier flights have no verified luggage contents.',
 dossierAttachment:'VISUAL ATTACHMENT · PRESERVED STORY',
 sources:[
 {id:'AV-601',cat:'[O] AIRPORT SECURITY',title:'Box of ampoules detected at screening',date:'AY-006 CASE · MADRID-BARAJAS',body:'Airport-screening private security officers detected a box holding multiple ampoules. The report documents a handover to the Guardia Civil for forensic processing.',note:'CASE OBSERVATION: seizure is investigative; the role and airport name reflect real institutional terminology.'},
 {id:'LAB-602',cat:'[T] FORENSIC IDENTIFICATION',title:'Species: Asian black bear',date:'MASKED FORENSIC REPORT · AY-006',body:'Analysis of the ampoules identified bear bile linked to Ursus tibetanus. The total quantity and precise origins of the animals are not established.',note:'LIMIT: confirming a product and species is not proof of a perpetrator or the substance’s origin.'},
 {id:'PAS-603',cat:'[O] PASSENGER RECORD',title:'Russian national residing in Spain',date:'MASKED CASE PASSPORT',body:'Masked identifier R-17, Russian nationality and declared Spanish residence. Four prior Moscow–Madrid flights over three years, in addition to the investigated journey. The case has investigative premises and a small business in Madrid but no verified operational connection to the ampoules.',note:'DATA MINIMIZATION: no usable passport number or home address; earlier travel is not evidence of criminal conduct.'},
 {id:'SOC-604',cat:'[N] SOCIAL-MEDIA STORY',title:'Temporary story with contact under investigation',date:'CASE STORY · OSINT CAPTURE',body:' social profiles connect R-17 to a Madrid business and acquaintances. A temporary story depicts R-17 beside investigative contact under investigation, a trafficking person of interest in the game. Preserve the visual and its context.',note:'SOCIAL LEAD ONLY: a shared photograph does not prove criminal participation.'}
 ]},
es:{
 missionTitle:'Las Ampollas de Madrid',missionSubtitle:'Tráfico de bilis de oso: peritaje, ruta aérea y captura de una historia como pista OSINT.',
 mapTitle:'VUELO DOCUMENTADO · MOSCÚ → MADRID',routeWarning:'el trayecto Moscú–Madrid está documentado en el juego. Los viajes anteriores no demuestran tráfico.',
 reportTitle:'EXPEDIENTE AY-006 · BILIS DE OSO',reportIntro:'Compara seguridad, peritaje, viajes y redes sociales. Captura la historia antes de entregar el expediente.',
 terminalFoot:'Pasaporte y datos personales protegidos y protegidos; documenta siempre la procedencia de las pistas.',
 boardTitle:'RED SOCMINT · VÍNCULOS SIN VERIFICAR',boardFoot:'Una foto con una persona investigada es indicio social, no prueba de tráfico.',
 objectiveWinston:'Recibe de Winston el informe del caso Madrid.',objectiveTerminal:'Analiza seguridad, laboratorio, pasaporte e historia.',objectiveMap:'Verifica Moscú–Madrid y las limitaciones de los viajes anteriores.',objectiveBoard:'Revisa vivienda, negocio y vínculos sociales registrados.',objectiveReport:'Captura y adjunta la historia al expediente antes de enviarlo.',
 mentorLines:[
 'Ayla, la seguridad del aeropuerto Adolfo Suárez Madrid-Barajas retuvo una caja con ampollas. En este ejercicio registrado, el laboratorio identificó bilis de Ursus tibetanus. Hay cuatro vuelos anteriores Moscú–Madrid durante tres años, además del investigado.',
 'El centro dispone de un pasaporte protegido. Compara los perfiles y preserva la historia donde R-17 aparece con C-09, un personaje registrado de interés para la investigación. No confundas una relación social con prueba penal.'
 ],
 legendConfirmed:'HECHOS DEL EJERCICIO',legendConfirmedText:'Ampollas retenidas en Madrid-Barajas, peritaje de Ursus tibetanus y ruta Moscú–Madrid.',
 legendSuspected:'INDICIOS SIN VERIFICAR',legendSuspectedText:'Los cuatro vuelos anteriores no demuestran delitos; empresa y relaciones precisan corroboración.',
 evidenceConfirmed:'Seguridad y custodia',evidenceObserved:'En el juego, vigilantes de seguridad privada del control aeroportuario detectan ampollas y entregan el material a la Guardia Civil.',
 evidenceOpen:'Especie identificada',evidenceLead:'El peritaje registrado identifica bilis de Ursus tibetanus sin demostrar autoría ni procedencia.',
 evidenceRoute:'Billetes e historial',evidenceRouteText:'Viaje investigado Moscú–Madrid y cuatro anteriores durante tres años. Se desconoce el contenido de los equipajes anteriores.',
 evidenceGap:'Pistas OSINT',evidenceGapText:'Vivienda y negocio sob investigação de Madrid, redes sociales e historia con contato sob investigação. Capturar y documentar su procedencia.',
 question1:'1. ¿Qué confirma el peritaje?',answers1:['Hubo bilis en todos los viajes anteriores.','Las ampollas contenían bilis de Ursus tibetanus.','C-09 envió las ampollas según la foto.'],
 question2:'2. ¿Qué puede afirmarse sobre la ruta?',answers2:['El trayecto investigado fue Moscú–Madrid, con otros cuatro vuelos anteriores registrados sin delitos confirmados.','Los cuatro vuelos llevaron las mismas sustancias.','El negocio de Madrid confirma el origen de la bilis.'],
 question3:'3. ¿Cómo tratar la historia?',answers3:['Publicarla acusando a los protagonistas.','Descartarla porque no prueba un delito.','Capturarla y adjuntarla como pista social, con procedencia y limitaciones.'],
 locked:'Habla con Winston, revisa las cuatro fuentes, analiza ruta y conexiones y captura la historia antes de entregar el expediente.',
 successToast:'Historia archivada y expediente registrado remitido para revisión policial.',
 finalHeading:'Una relación social es una pista, no una condena.',
 finalBody:'Ayla conservó la imagen de la historia y registró su procedencia en el expediente AY-006. La ruta y el peritaje son hechos ; los demás vínculos siguen sujetos a verificación policial.',
 capture:'CAPTURAR HISTORIA Y ADJUNTAR',captured:'HISTORIA CAPTURADA Y ADJUNTADA',captureRequired:'Captura la historia en el terminal antes de entregar el expediente.',storyTag:'HISTORIA ARCHIVADA · FUENTE REGISTRADA',storyInfo:'Captura de fuente abierta conservada sin identificar personas reales.',training:'REGISTROS DE INVESTIGACIÓN',
 mapHeading:'HISTORIAL AÉREO / MOSCÚ → MADRID',mapFoot:'Las ampollas del juego se detectaron en Madrid-Barajas; se desconoce la carga de los vuelos anteriores.',
 dossierAttachment:'ANEXO VISUAL · HISTORIA CONSERVADA',
 sources:[
 {id:'AV-601',cat:'[O] SEGURIDAD AEROPORTUARIA',title:'Caja de ampollas en el control',date:'AY-006 · MADRID-BARAJAS',body:'Vigilantes de seguridad privada del control aeroportuario detectaron una caja con ampollas y remitieron el material a la Guardia Civil para su análisis, en la investigación.',note:'REGISTRO: incautación y envío de las ampollas para peritaje.'},
 {id:'LAB-602',cat:'[T] INFORME PERICIAL',title:'Bilis de oso negro asiático',date:'PERITAJE · AY-006',body:'El análisis de las ampollas detectó bilis de Ursus tibetanus. No se establecieron cantidades exactas ni el origen de los animales.',note:'LÍMITE: identificar el material no prueba autoría ni procedencia geográfica.'},
 {id:'PAS-603',cat:'[O] PASAPORTE Y BILLETES',title:'Pasajera rusa residente en España',date:'DOCUMENTACIÓN DE ANÁLISIS',body:'Identificador registrado R-17. Nacionalidad rusa y residencia declarada en España. Cuatro vuelos previos Moscú–Madrid en tres años, además del vuelo investigado. Existen indicios registrados de residencia y comercio en Madrid.',note:'PROTECCIÓN: no se muestran números reales ni direcciones particulares.'},
 {id:'SOC-604',cat:'[N] HISTORIA DE RED SOCIAL',title:'Historia junto al contacto de interés',date:'HISTORIA REGISTRADA · CAPTURA OSINT',body:'Las publicaciones examinadas asocian R-17 con un comercio madrileño y un grupo social. La historia muestra a R-17 junto al personaje C-09, persona de interés de interés internacional.',note:'INDICIO SOCIAL: aparecer en una foto no demuestra participación criminal.'}
 ]}
};
function safe(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function copy(lang){return locales[lang]||locales.en;}
function storyImage(lang){
 const t=copy(lang),caption='R-17 / C-09 • MADRID';
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="520" height="600" viewBox="0 0 520 600"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#143a3c"/><stop offset="1" stop-color="#0b131c"/></linearGradient></defs><rect width="520" height="600" rx="14" fill="url(#bg)"/><rect x="15" y="13" width="490" height="6" rx="3" fill="#9febb2"/><text x="33" y="61" font-size="23" fill="white" font-family="sans-serif">● R-17 · 14 h</text><text x="34" y="108" font-size="15" fill="#b1d7c9" font-family="monospace">MASKED / CASE STORY</text><path d="M88 384 Q80 260 180 245 Q245 258 263 390 L263 521 L62 521Z" fill="#46636e"/><circle cx="165" cy="240" r="67" fill="#a8b1a8"/><path d="M97 226 Q92 155 156 153 Q225 142 233 228 Q180 187 97 226" fill="#2c3436"/><path d="M282 377 Q280 258 388 247 Q458 267 467 374 L473 518 L275 518Z" fill="#405a50"/><circle cx="367" cy="238" r="70" fill="#9b958d"/><path d="M290 231 Q309 147 384 160 Q444 162 439 238 Q395 199 290 231" fill="#1e3031"/><rect x="98" y="223" width="132" height="24" rx="11" fill="#141b1c"/><rect x="298" y="219" width="137" height="27" rx="12" fill="#121a1b"/><text x="25" y="562" font-size="20" fill="#def5df" font-family="monospace">'+caption+'</text><text x="26" y="586" font-size="13" fill="#a3c0b5" font-family="sans-serif">AYLA / AY-006 · EVIDÊNCIA OSINT</text></svg>';
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function renderEvidence(index,lang,state){
 const t=copy(lang);
 if(index===0)return '<figure class="m6-evidence-art"><img src="assets/mission6-art.svg" alt="'+safe(t.missionTitle)+'"><figcaption>'+safe(t.case)+'</figcaption></figure>';
 if(index===1)return '<div class="m6-sample"><strong>Ursus tibetanus</strong><span>LAB / AY-006 · '+safe(t.case)+'</span><div class="m6-vials"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>';
 if(index===2)return '<div class="m6-passport"><span>R-17 · PASSPORT EXTRACT</span><strong>RU •••• 7042</strong><span>MOSCOW → MADRID · 4 PREVIOUS / 3 YEARS</span><small>'+safe(t.case)+'</small></div>'+renderNetwork(lang);
 if(index===3)return '<div class="m6-story-workspace '+(state?.m6StoryCaptured?'is-captured':'')+'"><img class="m6-story-shot" src="'+storyImage(lang)+'" alt="'+safe(t.storyTag)+'"><p>'+safe(t.storyInfo)+'</p><button type="button" id="m6CaptureStory" class="primary-button" '+(state?.m6StoryCaptured?'disabled':'')+'>'+(state?.m6StoryCaptured?safe(t.captured):safe(t.capture))+'</button></div>';
 return '';
}
function renderMap(lang){
 const t=copy(lang);
 return '<div class="m6-map-workspace"><span class="m6-label">'+safe(t.case)+'</span><h3>'+safe(t.mapHeading)+'</h3><div class="m6-route"><div><b>МОСКВА</b><strong>MOSCOW · AIRPORT UNVERIFIED</strong><small>RUSSIA</small></div><span class="m6-flight">✈</span><div><b>MADRID</b><strong>ADOLFO SUÁREZ MADRID-BARAJAS</strong><small>SPAIN</small></div></div><div class="m6-flight-history"><b>4 ×</b><span>MOSCOW → MADRID<br>4 PRIOR TRIPS / 3 YEARS</span></div><p>'+safe(t.mapFoot)+'</p></div>';
}
function renderNetwork(lang){
 const t=copy(lang);
 const labels={
 pt:{center:'PASSAGEIRA R-17',home:'RESIDÊNCIA · SETOR / MADRID',business:'NEGÓCIO · LOJA REGISTRADA / MADRID',instagram:'INSTAGRAM · PERFIL ',facebook:'FACEBOOK · RELAÇÕES ',contact:'CONTATO SOB INVESTIGAÇÃO · VÍNCULO SOCIAL',limit:'Conexões de fontes identificadas. A existência de uma ligação social não prova crime.'},
 en:{center:'PASSENGER R-17',home:'RESIDENCE · DISTRICT / MADRID',business:'BUSINESS · CASE SHOP / MADRID',instagram:'INSTAGRAM · MASKED PROFILE',facebook:'FACEBOOK · MASKED CONTACTS',contact:'CONTACT UNDER INVESTIGATION · SOCIAL LINK',limit:'Investigative sources only. A social connection does not establish an offense.'},
 es:{center:'PASAJERA R-17',home:'VIVIENDA · BARRIO / MADRID',business:'NEGOCIO · TIENDA REGISTRADA / MADRID',instagram:'INSTAGRAM · PERFIL ',facebook:'FACEBOOK · CONTACTOS ',contact:'CONTATO SOB INVESTIGAÇÃO · VÍNCULO SOCIAL',limit:'Fuentes registradas. Una relación social no demuestra un delito.'}
 }[lang]||null;
 const x=labels||{center:'PASSENGER R-17',home:'RESIDENCE / MADRID',business:'BUSINESS / MADRID',instagram:'INSTAGRAM',facebook:'FACEBOOK',contact:'CONTACT UNDER INVESTIGATION',limit:'Investigative links'};
 return '<div class="m6-network"><div class="m6-network-root">'+safe(x.center)+'</div><div class="m6-network-grid">'+[x.home,x.business,x.instagram,x.facebook,x.contact].map(n=>'<div class="m6-network-node">'+safe(n)+'</div>').join('')+'</div><small>'+safe(x.limit)+'</small></div>';
}
function storyAttachment(lang){
 const t=copy(lang);
 return '<div class="m6-report-attachment"><img src="'+storyImage(lang)+'" alt="'+safe(t.storyTag)+'"><div><strong>'+safe(t.dossierAttachment)+'</strong><p>AY6-STORY-001 / R-17 / C-09</p><small>'+safe(t.storyInfo)+'</small></div></div>';
}
window.AYLAMissionSix={locales,copy,answer:[1,0,2],renderEvidence,renderMap,renderNetwork,storyAttachment,storyImage};
})();