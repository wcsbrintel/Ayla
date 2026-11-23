/* AYLA — Wildlife Crime Investigation | Investigation experience 0.2
 * Mission AY-001 is a playable investigative scenario. Claims are assessed on source strength.
 * Babylon.js provides the 3D runtime; no account, analytics, or server is required.
 */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const screens = ['aftermathScreen','promotionScreen','missionSelectScreen','startScreen','introScreen','dialogScreen','terminalScreen','mapScreen','boardScreen','reportScreen','finalScreen','helpScreen','restrictedScreen','pecManScreen'];
  const ui = {
    pt: {
      hudLocation:'CENTRAL DE INTELIGÊNCIA',hudMission:'MISSÃO EM ANDAMENTO',missionTitle:'O Manifesto Inconsistente',missionSubtitle:'Identifique o que as evidências realmente demonstram.',heroSub:'Toda evidência tem uma história. Nem toda história é verdade.',heroDescription:'Entre na central de inteligência. Conheça Ayla e Winston. Explore, investigue e aprenda a distinguir fatos de hipóteses.',begin:'INICIAR INVESTIGAÇÃO',resume:'CONTINUAR MISSÃO',missionCount:'MISSÃO DEMONSTRATIVA',language:'IDIOMA',prologue:'PRÓLOGO',skip:'PULAR INTRODUÇÃO ↗',story:'A HISTÓRIA DE AYLA',next:'CONTINUAR',enter:'ENTRAR NA CENTRAL',mentor:'SEU MENTOR',continue:'CONTINUAR',terminal:'TERMINAL DE FONTES ABERTAS',selectSource:'SELECIONE UMA FONTE PARA ANALISAR',terminalFoot:'Analise a procedência de cada registro e compare as evidências disponíveis.',mapTitle:'HIPÓTESES DE ROTA',routeWarning:'Linhas tracejadas indicam hipóteses, não rotas criminosas comprovadas.',boardTitle:'QUADRO DE EVIDÊNCIAS',boardFoot:'A semelhança entre ocorrências não demonstra, por si só, uma rede comum.',reportTitle:'RELATÓRIO DE INTELIGÊNCIA',reportIntro:'Revise as evidências e selecione a conclusão mais defensável para cada tópico.',backToScene:'VOLTAR À CENTRAL',submitReport:'ENTREGAR DOSSIÊ',caseComplete:'DOSSIÊ CONCLUÍDO',finalHeading:'A verdade exige evidências.',finalBody:'Você documentou uma inconsistência, separou locais confirmados de destinos alegados e encaminhou o dossiê para análise por autoridades competentes. Ninguém foi acusado sem provas verificadas.',sourcesReviewed:'FONTES REVISADAS',findings:'CONCLUSÕES',case:'DOSSIÊ',playAgain:'REINICIAR MISSÃO',controls:'CONTROLES',move:'Mover Ayla',camera:'Arraste para girar a câmera',interact:'Interagir com objetos e personagens',close:'Fechar painéis',understood:'ENTENDI',beginLabel:'INICIANDO CENTRAL DE INTELIGÊNCIA',hint:'INTERAGIR',hintSub:'Pressione E ou clique',objectiveWinston:'Converse com Winston.',objectiveTerminal:'Examine as quatro fontes no terminal OSINT.',objectiveMap:'Analise o mapa e diferencie rotas comprovadas de hipóteses.',objectiveBoard:'Compare evidências no quadro.',objectiveReport:'Acesse a mesa de relatórios e conclua o dossiê.',objectiveComplete:'Missão concluída.',sourceReviewed:'FONTE REVISADA',markReviewed:'ADICIONAR À ANÁLISE',viewed:'Fonte revisada',docAlert:'AVALIAÇÃO DE CONFIABILIDADE',docClassification:'ANÁLISE DE EVIDÊNCIAS / AY-001',dialogNext:'CONTINUAR',legendConfirmed:'CONFIRMADO',legendConfirmedText:'Fiscalização no Posto Rio Claro; 18 aves apreendidas conforme o registro.',legendSuspected:'NÃO VERIFICADO',legendSuspectedText:'Destinos e vínculos sugeridos por publicações online; não há confirmação independente.',evidenceConfirmed:'Fatos observados',evidenceObserved:'Registro administrativo: 18 aves vivas; documentação incompatível com o conteúdo.',evidenceOpen:'Pista de fonte aberta',evidenceLead:'Postagem menciona 30 aves e suposto destino no Porto Azul, sem fonte original verificável.',evidenceRoute:'Limites geográficos',evidenceRouteText:'O ponto de apreensão é conhecido, mas o destino final não foi comprovado.',evidenceGap:'Lacunas relevantes',evidenceGapText:'Não há identidade confirmada de articuladores, registros de transporte adicionais nem destinatário verificado.',locked:'Antes de finalizar, converse com Winston, examine as quatro fontes, analise o mapa e consulte o quadro.',question1:'1. Qual quantidade está documentada na apreensão?',question2:'2. Qual interpretação da rota está sustentada?',question3:'3. Qual encaminhamento respeita os limites das evidências?',answers1:['18 aves vivas.','30 aves vendidas no exterior.','Nenhuma apreensão foi realizada.'],answers2:['O carregamento chegou ao exterior.','O destino foi sugerido, mas não confirmado.','A postagem comprova a rota completa.'],answers3:['Acusar publicamente alguém com base na postagem.','Encerrar a investigação por falta de dados.','Preservar provas, apontar lacunas e encaminhar pistas às autoridades competentes.'],answerError:'Revise suas respostas: uma hipótese não substitui prova. Reavalie os documentos e tente novamente.',incomplete:'Responda às três perguntas antes de concluir.',successToast:'Avaliação concluída com rigor. Bom trabalho!',sourceToast:'Fonte adicionada ao dossiê.',readyToast:'As quatro fontes foram analisadas.',mentorLines:['Ayla, antes de concluir qualquer coisa, verifique o que os documentos realmente mostram. Nosso trabalho não é encontrar alguém para culpar. É esclarecer os fatos.','Há quatro fontes no terminal. Algumas se contradizem. Compare-as com o mapa e depois prepare seu dossiê. Uma pista não é prova.'],storyFrames:[['O rio foi seu primeiro mapa','Ayla cresceu ouvindo a floresta. Sabia reconhecer os sons das aves muito antes de conhecer o nome de todas as cidades.','01 / THE BEGINNING'],['O silêncio mudou tudo','Na adolescência, viu aves resgatadas de um transporte clandestino. Quase nada se sabia sobre quem organizou a captura. Aquela dúvida ficou com ela.','02 / THE TURNING POINT'],['Perguntas viraram vocação','Anos de estudo em conservação, geografia e fontes abertas lhe ensinaram algo fundamental: uma informação só é útil quando sua origem e seus limites são conhecidos.','03 / THE PATH'],['Winston tinha uma regra','Winston, investigador veterano, tornou-se seu mentor. “A intuição pode iniciar uma investigação. Mas só a evidência pode concluí-la.” Hoje, o primeiro caso está esperando.','04 / THE MENTOR']],sources:[{id:'SR-047',cat:'[O] REGISTRO OFICIAL',title:'Auto de fiscalização',date:'14 NOV · CASO AY-001',body:'Uma fiscalização no Posto Rio Claro identificou 18 aves vivas em recipientes de transporte. Os documentos do veículo indicavam “material decorativo” como conteúdo. Não há identificação de destinatário neste registro.',note:'FATO OBSERVADO [O]: local, data, quantidade e declaração documental. Não demonstra destino nem autoria.'},{id:'OS-047',cat:'[N] FONTE ABERTA',title:'Postagem sobre Porto Azul',date:'DATA NÃO VERIFICADA',body:'Uma postagem pública sem autoria verificável alega que “30 aves raras foram enviadas ao Porto Azul”. Não inclui imagem original datada, documento ou segunda fonte independente.',note:'PISTA [N]: a postagem não confirma 30 aves, Porto Azul, nem conexão com a apreensão.'},{id:'VT-047',cat:'[O] VERIFICAÇÃO TÉCNICA',title:'Registro veterinário',date:'15 NOV · CASO AY-001',body:'O registro veterinário documenta o recebimento de 18 aves vivas procedentes da fiscalização. O estado sanitário exige cuidados. Nenhuma espécie ou origem geográfica foi individualmente validada nesse documento.',note:'FATO OBSERVADO [O]: 18 aves recebidas. Não extrapolar para espécies, rotas ou redes.'},{id:'AN-047',cat:'[N] NOTA DE ANÁLISE',title:'Comparação de fontes',date:'NOTA TÉCNICA / AY-001',body:'O auto e o registro veterinário coincidem quanto às 18 aves. A postagem fala em 30 aves e em um porto, mas carece de corroboração. Não existe, por ora, vínculo documentado entre a pessoa que postou e qualquer delito.',note:'LACUNA: divergência de quantidade; destino e envolvidos sem confirmação.'}]},
    en: {
      hudLocation:'INTELLIGENCE OPERATIONS CENTER',hudMission:'ACTIVE INVESTIGATION',missionTitle:'The Inconsistent Manifest',missionSubtitle:'Identify what the evidence actually supports.',heroSub:'Every clue has a story. Not every story is true.',heroDescription:'Enter the intelligence operations center. Meet Ayla and Winston. Explore, investigate and learn to separate facts from assumptions.',begin:'BEGIN INVESTIGATION',resume:'RESUME MISSION',missionCount:'DEMONSTRATION MISSION',language:'LANGUAGE',prologue:'PROLOGUE',skip:'SKIP INTRODUCTION ↗',story:'AYLA’S STORY',next:'CONTINUE',enter:'ENTER OPERATIONS CENTER',mentor:'YOUR MENTOR',continue:'CONTINUE',terminal:'OPEN-SOURCE INTELLIGENCE TERMINAL',selectSource:'CHOOSE A SOURCE TO REVIEW',terminalFoot:'Examine source provenance and compare the available evidence.',mapTitle:'ROUTE HYPOTHESES',routeWarning:'Dashed lines represent hypotheses, not proven trafficking routes.',boardTitle:'EVIDENCE BOARD',boardFoot:'Similar incidents alone do not establish a common criminal network.',reportTitle:'INTELLIGENCE ASSESSMENT',reportIntro:'Review the evidence and select the most defensible conclusion for each topic.',backToScene:'BACK TO OPERATIONS CENTER',submitReport:'SUBMIT DOSSIER',caseComplete:'DOSSIER COMPLETE',finalHeading:'Truth requires evidence.',finalBody:'You documented an inconsistency, separated confirmed locations from alleged destinations, and referred the dossier for authorized investigative review. No person was accused without verified proof.',sourcesReviewed:'SOURCES REVIEWED',findings:'CONCLUSIONS',case:'DOSSIER',playAgain:'REPLAY MISSION',controls:'CONTROLS',move:'Move Ayla',camera:'Drag to rotate the camera',interact:'Interact with objects and characters',close:'Close panels',understood:'UNDERSTOOD',beginLabel:'STARTING INTELLIGENCE CENTER',hint:'INTERACT',hintSub:'Press E or click',objectiveWinston:'Talk to Winston.',objectiveTerminal:'Review all four sources on the OSINT terminal.',objectiveMap:'Examine the map and distinguish proven routes from hypotheses.',objectiveBoard:'Compare the evidence on the board.',objectiveReport:'Go to the report desk and complete the dossier.',objectiveComplete:'Mission complete.',sourceReviewed:'SOURCE REVIEWED',markReviewed:'ADD TO CASE FILE',viewed:'Source reviewed',docAlert:'SOURCE RELIABILITY ASSESSMENT',docClassification:'EVIDENCE ASSESSMENT / AY-001',dialogNext:'CONTINUE',legendConfirmed:'CONFIRMED',legendConfirmedText:'Inspection at Rio Claro checkpoint; 18 birds documented in the case record.',legendSuspected:'UNVERIFIED',legendSuspectedText:'Destinations and links suggested in online claims; no independent verification.',evidenceConfirmed:'Observed facts',evidenceObserved:'Administrative record: 18 live birds; cargo paperwork inconsistent with contents.',evidenceOpen:'Open-source lead',evidenceLead:'A post mentions 30 birds and a supposed Porto Azul destination, without a verifiable original source.',evidenceRoute:'Geographic limitations',evidenceRouteText:'The seizure location is known; the final destination has not been verified.',evidenceGap:'Important gaps',evidenceGapText:'No verified identification of organizers, onward transport documents or confirmed recipient.',locked:'Before finishing, speak with Winston, review all four sources, examine the map and inspect the board.',question1:'1. What quantity is documented by the seizure?',question2:'2. Which route interpretation is supported?',question3:'3. Which response respects the evidence?',answers1:['18 live birds.','30 birds sold overseas.','No seizure took place.'],answers2:['The shipment reached another country.','A destination was suggested but not verified.','The online post proves the entire route.'],answers3:['Publicly accuse a person because of a post.','Close the investigation due to missing details.','Preserve evidence, identify gaps and refer leads to authorized authorities.'],answerError:'Review your answers: a hypothesis is not proof. Revisit the evidence and try again.',incomplete:'Answer all three questions before submitting.',successToast:'Evidence-based assessment complete. Good work!',sourceToast:'Source added to your case file.',readyToast:'All four sources reviewed.',mentorLines:['Ayla, before reaching any conclusion, check what the documents really show. Our work is not to find someone to blame. It is to establish the facts.','Four sources are waiting on the terminal. Some contradict each other. Compare them with the map and then prepare your dossier. A lead is not proof.'],storyFrames:[['The river was her first map','Ayla grew up listening to the forest. She knew birdsong long before she knew the names of distant cities.','01 / THE BEGINNING'],['The silence changed everything','As a teenager, she saw birds rescued from illegal transport. Almost nothing was known about who organized their capture. The question stayed with her.','02 / THE TURNING POINT'],['Questions became a calling','Years of studying conservation, geography and open-source intelligence taught her a basic rule: information only helps when its origin and limitations are understood.','03 / THE PATH'],['Winston had one rule','Winston, a veteran investigator, became her mentor. “Intuition may start an investigation. Only evidence can finish it.” Today, her first case is waiting.','04 / THE MENTOR']],sources:[{id:'SR-047',cat:'[O] OFFICIAL RECORD',title:'Inspection record',date:'14 NOV · CASE AY-001',body:'An inspection at Rio Claro checkpoint documented 18 live birds in transport containers. Vehicle documents described the cargo as “decorative materials”. The record does not identify a recipient.',note:'OBSERVED [O]: place, date, number and cargo declaration. Does not establish a destination or perpetrator.'},{id:'OS-047',cat:'[N] OPEN SOURCE',title:'Post mentioning Porto Azul',date:'DATE UNVERIFIED',body:'A public post with no verifiable author claims that “30 rare birds were shipped to Porto Azul”. It includes no dated original image, document or independent corroborating source.',note:'LEAD [N]: the post does not confirm 30 birds, Porto Azul or a link to the seizure.'},{id:'VT-047',cat:'[O] TECHNICAL RECORD',title:'Veterinary intake record',date:'15 NOV · CASE AY-001',body:'A veterinary intake log records receipt of 18 live birds from the inspection. The animals need care. Species and geographic origins have not been individually verified in this record.',note:'OBSERVED [O]: 18 birds received. Do not extrapolate species, routes or networks.'},{id:'AN-047',cat:'[N] ANALYTICAL NOTE',title:'Cross-source comparison',date:'ANALYTICAL NOTE / AY-001',body:'The seizure and veterinary records agree on 18 birds. The online post mentions 30 birds and a port, but remains uncorroborated. No documented link connects the poster to an offense.',note:'GAP: conflicting quantity; no confirmation of destinations or people involved.'}]},
    es: {
      hudLocation:'CENTRO DE INTELIGENCIA',hudMission:'INVESTIGACIÓN EN CURSO',missionTitle:'El Manifiesto Inconsistente',missionSubtitle:'Identifica lo que realmente demuestran las pruebas.',heroSub:'Cada pista tiene una historia. No todas las historias son verdad.',heroDescription:'Entra en el centro de inteligencia. Conoce a Ayla y Winston. Explora, investiga y aprende a diferenciar hechos de hipótesis.',begin:'INICIAR INVESTIGACIÓN',resume:'CONTINUAR MISIÓN',missionCount:'MISIÓN DEMOSTRATIVA',language:'IDIOMA',prologue:'PRÓLOGO',skip:'SALTAR INTRODUCCIÓN ↗',story:'LA HISTORIA DE AYLA',next:'CONTINUAR',enter:'ENTRAR AL CENTRO',mentor:'TU MENTOR',continue:'CONTINUAR',terminal:'TERMINAL DE FUENTES ABIERTAS',selectSource:'ELIGE UNA FUENTE PARA REVISAR',terminalFoot:'Examina la procedencia de cada registro y compara las pruebas disponibles.',mapTitle:'HIPÓTESIS DE RUTA',routeWarning:'Las líneas discontinuas son hipótesis, no rutas de tráfico comprobadas.',boardTitle:'TABLERO DE PRUEBAS',boardFoot:'La semejanza entre incidentes no demuestra por sí sola una red criminal.',reportTitle:'INFORME DE INTELIGENCIA',reportIntro:'Revisa las pruebas y elige la conclusión más defendible para cada tema.',backToScene:'VOLVER AL CENTRO',submitReport:'ENTREGAR EXPEDIENTE',caseComplete:'EXPEDIENTE FINALIZADO',finalHeading:'La verdad requiere pruebas.',finalBody:'Documentaste una inconsistencia, separaste lugares confirmados de destinos alegados y remitiste el expediente para revisión autorizada. Nadie fue acusado sin pruebas verificadas.',sourcesReviewed:'FUENTES REVISADAS',findings:'CONCLUSIONES',case:'EXPEDIENTE',playAgain:'REINICIAR MISIÓN',controls:'CONTROLES',move:'Mover a Ayla',camera:'Arrastra para girar la cámara',interact:'Interactuar con objetos y personajes',close:'Cerrar paneles',understood:'ENTENDIDO',beginLabel:'INICIANDO CENTRO DE INTELIGENCIA',hint:'INTERACTUAR',hintSub:'Pulsa E o haz clic',objectiveWinston:'Habla con Winston.',objectiveTerminal:'Revisa las cuatro fuentes de la terminal OSINT.',objectiveMap:'Analiza el mapa y distingue rutas confirmadas e hipótesis.',objectiveBoard:'Compara las pruebas en el tablero.',objectiveReport:'Ve a la mesa de informes y completa el expediente.',objectiveComplete:'Misión completada.',sourceReviewed:'FUENTE REVISADA',markReviewed:'AÑADIR AL EXPEDIENTE',viewed:'Fuente revisada',docAlert:'EVALUACIÓN DE CONFIABILIDAD',docClassification:'EVALUACIÓN DE PRUEBAS / AY-001',dialogNext:'CONTINUAR',legendConfirmed:'CONFIRMADO',legendConfirmedText:'Inspección en el puesto Río Claro; 18 aves documentadas en el registro.',legendSuspected:'NO VERIFICADO',legendSuspectedText:'Destinos y vínculos sugeridos en publicaciones online; sin confirmación independiente.',evidenceConfirmed:'Hechos observados',evidenceObserved:'Registro administrativo: 18 aves vivas; documentación incompatible con la carga.',evidenceOpen:'Pista de fuente abierta',evidenceLead:'Una publicación menciona 30 aves y Porto Azul sin una fuente original verificable.',evidenceRoute:'Límites geográficos',evidenceRouteText:'Se conoce el lugar de incautación, pero no se confirmó el destino final.',evidenceGap:'Vacíos importantes',evidenceGapText:'Sin identificación comprobada de organizadores, documentos posteriores de transporte o receptor confirmado.',locked:'Antes de terminar, habla con Winston, revisa las cuatro fuentes, examina el mapa y consulta el tablero.',question1:'1. ¿Qué cantidad documenta la incautación?',question2:'2. ¿Qué interpretación de la ruta está sustentada?',question3:'3. ¿Qué respuesta respeta las pruebas?',answers1:['18 aves vivas.','30 aves vendidas en el exterior.','No hubo incautación.'],answers2:['La carga llegó a otro país.','Se sugirió un destino, pero no fue verificado.','La publicación demuestra toda la ruta.'],answers3:['Acusar públicamente a alguien por una publicación.','Cerrar la investigación por falta de datos.','Preservar pruebas, identificar vacíos y remitir pistas a las autoridades competentes.'],answerError:'Revisa las respuestas: una hipótesis no es una prueba. Vuelve a analizar los documentos e inténtalo otra vez.',incomplete:'Responde las tres preguntas antes de terminar.',successToast:'Evaluación fundamentada completada. ¡Buen trabajo!',sourceToast:'Fuente añadida al expediente.',readyToast:'Las cuatro fuentes fueron revisadas.',mentorLines:['Ayla, antes de concluir, comprueba qué muestran realmente los documentos. Nuestro trabajo no es buscar a alguien a quien culpar, sino establecer los hechos.','En la terminal te esperan cuatro fuentes. Algunas se contradicen. Compáralas con el mapa y después elabora tu expediente. Una pista no es una prueba.'],storyFrames:[['El río fue su primer mapa','Ayla creció escuchando la selva. Conocía el canto de las aves antes de conocer el nombre de muchas ciudades.','01 / THE BEGINNING'],['El silencio lo cambió todo','De adolescente, vio aves rescatadas de un transporte ilegal. Casi nada se sabía sobre quién había organizado su captura. Esa pregunta la acompañó.','02 / THE TURNING POINT'],['Las preguntas se volvieron vocación','Años de estudio de conservación, geografía e inteligencia de fuentes abiertas le enseñaron que la información solo sirve cuando se conocen su origen y sus límites.','03 / THE PATH'],['Winston tenía una regla','Winston, investigador veterano, se convirtió en su mentor. «La intuición puede iniciar una investigación. Solo las pruebas pueden concluirla». Hoy la espera su primer caso.','04 / THE MENTOR']],sources:[{id:'SR-047',cat:'[O] REGISTRO OFICIAL',title:'Acta de inspección',date:'14 NOV · CASO AY-001',body:'Una inspección en Río Claro encontró 18 aves vivas en contenedores. Los documentos del vehículo indicaban «materiales decorativos». El acta no identifica ningún destinatario.',note:'OBSERVADO [O]: lugar, fecha, cantidad y declaración de carga. No demuestra destino ni autoría.'},{id:'OS-047',cat:'[N] FUENTE ABIERTA',title:'Publicación sobre Porto Azul',date:'FECHA NO VERIFICADA',body:'Una publicación de autoría no verificable afirma que «30 aves raras fueron enviadas a Porto Azul». No incluye imagen original fechada, documento ni segunda fuente independiente.',note:'PISTA [N]: la publicación no confirma 30 aves, Porto Azul ni un vínculo con la incautación.'},{id:'VT-047',cat:'[O] REGISTRO TÉCNICO',title:'Informe veterinario',date:'15 NOV · CASO AY-001',body:'El registro veterinario documenta la recepción de 18 aves vivas procedentes de la inspección. Los animales necesitan atención. En ese documento no se verificaron individualmente especies ni orígenes.',note:'OBSERVADO [O]: 18 aves recibidas. No extrapolar a especies, rutas o redes.'},{id:'AN-047',cat:'[N] NOTA ANALÍTICA',title:'Comparación de fuentes',date:'NOTA ANALÍTICA / AY-001',body:'El acta y el registro veterinario coinciden en 18 aves. La publicación habla de 30 aves y de un puerto, pero carece de corroboración. Ningún vínculo documentado conecta a quien publicó con un delito.',note:'VACÍO: cantidad divergente; destinos e implicados sin confirmar.'}]}
  };

  const introNarrative = {
  "pt": {
    "captions": [
      "Desde criança, Ayla se sentia parte da natureza. Os rios, as florestas e os animais eram seu lugar no mundo.",
      "Aos 17 anos, Ayla presenciou o resgate de aves retiradas de uma rota de tráfico. Algumas estavam feridas. Muitas perguntas ficaram sem resposta.",
      "A experiência mudou seu caminho. Ela estudou conservação, legislação ambiental, análise de dados e investigação com fontes abertas.",
      "Anos depois, Winston, um investigador experiente, convidou Ayla a integrar uma unidade de inteligência contra crimes ambientais.",
      "Hoje, Ayla investiga o tráfico de animais silvestres, cruzando registros, fontes públicas e evidências documentais.",
      "Cada investigação pode proteger animais e revelar conexões. Mas suspeitas não são provas: conclusões exigem verificação."
    ],
    "title": "AGORA, UMA NOVA MISSÃO COMEÇA.",
    "body": "Uma possível rede de tráfico está em atividade. Novas evidências acabam de surgir.\n\nWinston espera por Ayla na central. É hora de analisar fontes, comparar registros e descobrir o que as provas realmente sustentam.",
    "kicker": "NOVA MISSÃO",
    "patch": "INTELIGÊNCIA AMBIENTAL",
    "role": "INVESTIGADORA DE CRIMES CONTRA A VIDA SILVESTRE"
  },
  "en": {
    "captions": [
      "Since childhood, Ayla felt at home in nature. Rivers, forests and wildlife were her world.",
      "At 17, Ayla witnessed birds being rescued from illegal transport. Some were injured. Many questions remained unanswered.",
      "The experience changed her path. She studied conservation, environmental law, data analysis and open-source investigation.",
      "Years later, Winston, an experienced investigator, invited Ayla to join an environmental crime intelligence unit.",
      "Today, Ayla investigates wildlife trafficking, connecting records, open sources and documented evidence.",
      "Every investigation can protect wildlife and reveal connections. But suspicion is not proof: conclusions require verification."
    ],
    "title": "NOW, A NEW MISSION BEGINS.",
    "body": "A possible trafficking network is active. New evidence has just emerged.\n\nWinston is waiting for Ayla at the operations center. It is time to examine sources, compare records and establish what the evidence actually supports.",
    "kicker": "NEW MISSION",
    "patch": "ENVIRONMENTAL INTELLIGENCE",
    "role": "WILDLIFE CRIME INVESTIGATOR"
  },
  "es": {
    "captions": [
      "Desde niña, Ayla se sentía parte de la naturaleza. Los ríos, los bosques y los animales eran su mundo.",
      "A los 17 años, Ayla presenció el rescate de aves transportadas ilegalmente. Algunas estaban heridas. Muchas preguntas quedaron sin respuesta.",
      "La experiencia cambió su rumbo. Estudió conservación, legislación ambiental, análisis de datos e investigación de fuentes abiertas.",
      "Años después, Winston, investigador experimentado, invitó a Ayla a unirse a una unidad de inteligencia contra delitos ambientales.",
      "Hoy, Ayla investiga el tráfico de fauna silvestre, conectando registros, fuentes abiertas y pruebas documentadas.",
      "Cada investigación puede proteger la fauna y revelar conexiones. Pero una sospecha no es una prueba: hay que verificar las conclusiones."
    ],
    "title": "AHORA COMIENZA UNA NUEVA MISIÓN.",
    "body": "Una posible red de tráfico está activa. Acaban de surgir nuevas pruebas.\n\nWinston espera a Ayla en el centro de operaciones. Es hora de analizar fuentes, comparar registros y establecer qué demuestran realmente las pruebas.",
    "kicker": "NUEVA MISIÓN",
    "patch": "INTELIGENCIA AMBIENTAL",
    "role": "INVESTIGADORA DE DELITOS CONTRA LA FAUNA SILVESTRE"
  }
};

  let lang = 'en';
  try { const saved=localStorage.getItem('ayla-language'); if(ui[saved])lang=saved; } catch(e){}
  let introIndex=0,dialogIndex=0,playerActive=false,mentorMet=false,mapSeen=false,boardSeen=false,done=false;
  let sourcesReviewed=new Set(),selectedSource=-1,activePanel=null,nearby=null,toastTimeout=null;
  let cinematicPending=false,cinematicTimer=null,cinematicMode='idle',patrolPaused=false,seatTarget=null,demoActive=false,demoTimers=[];
  let seatInProgress=false,seatApproachStarted=false,seatLastPosition=null,seatFinished=false,seatQueued=false;
  const sceneCue={pt:{winston:'CONVERSA COM WINSTON',terminal:'ACESSANDO TERMINAL OSINT',map:'ANALISANDO ROTAS',board:'EXAMINANDO EVIDÊNCIAS',report:'PREPARANDO DOSSIÊ'},en:{winston:'BRIEFING WITH WINSTON',terminal:'ACCESSING OSINT TERMINAL',map:'ROUTE INTELLIGENCE',board:'REVIEWING THE EVIDENCE',report:'PREPARING CASE DOSSIER'},es:{winston:'REUNIÓN CON WINSTON',terminal:'ACCEDIENDO A TERMINAL OSINT',map:'ANÁLISIS DE RUTAS',board:'EXAMINANDO EVIDENCIAS',report:'PREPARANDO EXPEDIENTE'}};
  const missions=window.AYLAMissionsV2;
  const postMission=window.AYLAPostMission;
  let aftermathDebrief=false;
  let activeMission=missions?.current()||'AY-001';
  const stateKey='ayla-alpha-v01';
  const gameplayPanels=['dialogScreen','terminalScreen','mapScreen','boardScreen','reportScreen','helpScreen','restrictedScreen','pecManScreen'];
  // Missions remain available before login. A verified, approved Firebase
  // account switches the same scene to free roaming, without signing out when
  // the restricted communication window is closed.
  let approvedSession=false;
  let accountSignedIn=false, accountEmail='', accountState='guest';
  function updateAccountIndicator(){
    const labels={
      pt:{guest:'Visitante',pending:'Login · autorização pendente',approved:'Logado · autorizado',exit:'Sair / Missões'},
      en:{guest:'Guest',pending:'Signed in · pending approval',approved:'Signed in · authorized',exit:'Sign out / Missions'},
      es:{guest:'Visitante',pending:'Sesión iniciada · pendiente',approved:'Conectado · autorizado',exit:'Salir / Misiones'}
    };
    const words=labels[lang]||labels.pt;
    const indicator=$('aylaAccountMode'),control=$('aylaGuestMode');
    if(indicator){
      indicator.textContent=words[accountState]||words.guest;
      indicator.title=accountEmail||'';
    }
    if(control){
      control.textContent=words.exit;
      control.classList.toggle('hidden',!accountSignedIn);
      control.title=accountEmail||'';
    }
    const missionCode=$('missionCode');
    if(missionCode)missionCode.textContent=approvedSession?'SECURE COMMS':activeMission;
  }
  function syncAccess(){
    $('missionMenuButton')?.classList.toggle('hidden',approvedSession||!playerActive);
    renderRank();
    if(!$('missionHud'))return;
    const inRoom=playerActive&&!visible('startScreen')&&!visible('introScreen');
    $('missionHud').classList.toggle('hidden',!inRoom||approvedSession);
    if(approvedSession){
      $('resumeButton')?.classList.add('hidden');
      if(activePanel&&activePanel!=='restrictedScreen')closePanels();
    }else{
      // When an approved user signs out while exploring the wall, restore
      // the playable public scene, not an invisible locked input panel.
      if(activePanel==='wallScreen')closePanels();
      updateHud();
    }
    updateAccountIndicator();
    window.AYLAWall?.setAuthorized(approvedSession);
    if(window.AYLAGlobeDecor){
      window.AYLAGlobeDecor.globe?.setEnabled(!approvedSession);
      window.AYLAGlobeDecor.header?.setEnabled(!approvedSession);
    }
    updateHint();
  }
  window.addEventListener('ayla:auth-state',event=>{
    approvedSession=event.detail?.approved===true;
    accountSignedIn=event.detail?.signedIn===true;
    accountState=event.detail?.state|| (approvedSession?'approved':accountSignedIn?'pending':'guest');
    accountEmail=typeof event.detail?.email==='string'?event.detail.email:'';
    syncAccess();
  });
  function t(key){return missions?.override(activeMission,lang,key)??ui[lang][key]??key;}
  function safe(str){return String(str).replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function show(id){screens.forEach((s)=>$(s).classList.toggle('hidden',s!==id));}
  function hide(id){$(id).classList.add('hidden');}
  function enterPanel(id){activePanel=id;$('renderCanvas').classList.add('panel-active');$(id).classList.remove('hidden');$('hintBox').classList.add('hidden');}
  function closePanels(){restoreReportCamera();if(activePanel==='restrictedScreen')window.AYLARestricted?.close();if(activePanel==='wallScreen')window.AYLAWall?.unfocus();if(activePanel==='pecManScreen')window.AYLAPecMan?.close();clearTimeout(cinematicTimer);demoTimers.forEach(clearTimeout);demoTimers=[];demoActive=false;cinematicPending=false;cinematicMode='idle';seatTarget=null;seatInProgress=false;seatApproachStarted=false;seatFinished=false;seatQueued=false;navigation?.cancelSeat?.();if(ayla?.setSeated)ayla.setSeated(false);$('cinematicCue').classList.add('hidden');$('renderCanvas').classList.remove('panel-active');gameplayPanels.forEach(hide);activePanel=null;patrolPaused=false;if(winston?.setTalking)winston.setTalking(false);if(winston?.setDialogue)winston.setDialogue(false);if(ayla?.setSeated)ayla.setSeated(false);if(ayla?.setCinematic)ayla.setCinematic('idle');if(ayla?.setInteraction)ayla.setInteraction('idle');updateHint();}
  function visible(id){return !$(id).classList.contains('hidden');}
  function notify(message){clearTimeout(toastTimeout);$('toast').textContent=message;$('toast').classList.remove('hidden');toastTimeout=setTimeout(()=>hide('toast'),2800);}
  function save(){missions?.save(activeMission,{mentorMet,mapSeen,boardSeen,done,sources:[...sourcesReviewed]});}
  function restore(){const data=missions?.load(activeMission);if(data){mentorMet=!!data.mentorMet;mapSeen=!!data.mapSeen;boardSeen=!!data.boardSeen;done=!!data.done;sourcesReviewed=new Set(data.sources||[]);}}
  function resetMission(){mentorMet=mapSeen=boardSeen=done=false;sourcesReviewed.clear();selectedSource=-1;missions?.reset(activeMission);updateHud();}

  const mi=(key)=>missions?.text(lang,key)||key;

  function rankText(){const c=postMission.forLang(lang);return missions.aftermath().level2?c.rankTwo:c.rankOne;}
  function renderRank(){const el=$('aylaRank');if(!el)return;el.textContent=rankText();el.classList.toggle('hidden',approvedSession||!playerActive);}
  function renderAftermathArchive(){
    const st=missions.aftermath(),c=postMission.forLang(lang),panel=$('aftermathArchive');
    const completed=missions.ids.slice(0,4).reduce((n,id)=>n+(missions.completed(id)?1:0),0);
    const bar=$('aylaLevelProgressFill');
    bar.style.width=(completed/4*100)+'%';
    panel.querySelector('.level-up-meter').setAttribute('aria-valuenow',String(completed));
    $('aylaMissionLevel').textContent=st.level2?c.rankTwo:c.rankOne;
    $('aylaLevelProgressText').textContent=completed+' / 4 '+c.levelUpProgress;
    $('aftermathArchiveTitle').textContent=st.level2?c.levelUpDone:c.levelUpTitle;
    $('aftermathArchiveDescription').textContent=st.level2?c.promotionBody:c.levelUpDescription;
    $('aftermathArchiveStatus').textContent=st.level2?c.archiveCompleted:st.pending?c.levelUpPending:st.unlocked?c.levelUpReady:c.levelUpLocked;
    const btn=$('aftermathArchiveButton');
    btn.disabled=!st.unlocked;
    btn.textContent=st.level2?c.levelUpReview:st.pending?c.levelUpTalk:st.unlocked?c.levelUpSee:mi('locked');
    panel.classList.toggle('is-locked',!st.unlocked);
    panel.classList.toggle('is-ready',st.unlocked&&!st.level2);
    panel.classList.toggle('is-promoted',st.level2);
    // The Level 2 progress box appears only after Mission 4 is completed.
    panel.classList.toggle('hidden',!st.unlocked);
  }
  function renderAftermath(){
    const c=postMission.forLang(lang);
    const pairs={aftermathTag:'eventTag',aftermathTitle:'eventTitle',aftermathLead:'eventLead',aftermathFrom:'routeFrom',aftermathFromLabel:'routeFromLabel',aftermathTo:'routeTo',aftermathToLabel:'routeToLabel',aftermathCount:'evidenceCount',aftermathEggs:'evidenceName',aftermathContact:'contact',aftermathLink:'link',aftermathFollowup:'followup',aftermathCautionTitle:'cautionTitle',aftermathCaution:'caution',aftermathContinue:'continue',aftermathBack:'return',aftermathClose:'return'};
    for(const [id,key] of Object.entries(pairs))$(id).textContent=c[key];
    $('aftermathContinue').classList.toggle('hidden',missions.aftermath().level2);
  }
  function renderPromotion(){
    const c=postMission.forLang(lang);
    for(const [id,key] of Object.entries({promotionTag:'promotionTag',promotionTitle:'promotionTitle',promotionRole:'promotionRole',promotionBody:'promotionBody',promotionArchive:'promotionArchive',promotionRoom:'promotionRoom'}))$(id).textContent=c[key];
  }
  function openAftermath(){
    if(!missions.aftermath().unlocked){openMissionArchive();return;}
    if(activePanel)closePanels();
    playerActive=false;
    for(const id of ['missionMenuButton','missionHud','hintBox','mobileControls','compass','topbar','aylaRank'])$(id)?.classList.add('hidden');
    show('aftermathScreen');renderAftermath();
  }

  function renderMissionArchive(){
    const fields={missionSelectTitle:'header',missionSelectIntro:'intro',missionTitle1:'m1',missionTitle2:'m2',missionTitle3:'m3',missionTitle4:'m4',missionTitle5:'m5',missionTitle6:'m6',missionDescription1:'m1Description',missionDescription2:'m2Description',missionDescription3:'m3Description',missionDescription4:'m4Description',missionDescription5:'m5Description',missionDescription6:'m6Description',missionProgressNotice:'local',missionExport:'backup',missionImport:'restore'};
    for(const [id,key] of Object.entries(fields))if($(id))$(id).textContent=mi(key);
    renderAftermathArchive();
    for(let i=1;i<=6;i++){
      const id='AY-00'+i,state=missions.load(id),locked=!missions.unlocked(id),completed=state.completed;
      const started=state.mentorMet||state.mapSeen||state.boardSeen||state.sources.length>0;
      $('missionCard'+i).classList.toggle('is-locked',locked);
      $('missionCard'+i).classList.toggle('is-complete',completed);
      $('missionStatus'+i).textContent=locked?mi('locked'):completed?mi('finished'):started?mi('inProgress'):mi('available');
      $('missionPlay'+i).textContent=locked?mi('locked'):completed?mi('review'):started?mi('resume'):mi('start');
      $('missionPlay'+i).disabled=locked;
      $('missionReplay'+i).classList.toggle('hidden',!completed);
      $('missionReplay'+i).textContent=mi('replay');
      $('missionDescription'+i).textContent=mi('m'+i+'Description')+(locked?' '+mi(i===6?'unlock6':i===5?'unlock5':i===4?'unlock4':i===3?'unlock3':'unlock'):'');
    }
  }
  function openMissionArchive(){
    if(activePanel)closePanels();
    aftermathDebrief=false;
    playerActive=false;
    for(const id of ['missionMenuButton','missionHud','hintBox','mobileControls','compass','topbar'])$(id)?.classList.add('hidden');
    show('missionSelectScreen');renderMissionArchive();
  }
  function selectMission(id,replay=false){
    if(!missions?.unlocked(id)){notify(mi(id==='AY-006'?'needFinish6':id==='AY-005'?'needFinish5':id==='AY-004'?'needFinish4':id==='AY-003'?'needFinish3':'needFinish'));return;}
    if(activePanel)closePanels();
    missions.choose(id);activeMission=id;restore();
    if(replay)resetMission();
    selectedSource=-1;
    if(ayla)ayla.root.position.set(0,0,1.2);
    aftermathDebrief=false;
    localize();launch();
  }
  function showMissionComplete(){
    $('finalMissionCode').textContent=activeMission;
    $('finalScreen').querySelector('[data-t="finalHeading"]').textContent=t('finalHeading');
    $('finalScreen').querySelector('[data-t="finalBody"]').textContent=t('finalBody');
    const nextMission=activeMission==='AY-001'?'AY-002':activeMission==='AY-002'?'AY-003':activeMission==='AY-003'?'AY-004':activeMission==='AY-004'&&missions.unlocked('AY-005')?'AY-005':activeMission==='AY-005'&&missions.unlocked('AY-006')?'AY-006':null;
    $('missionNextButton').classList.toggle('hidden',!nextMission||!missions.unlocked(nextMission));
    $('missionNextButton').textContent=mi('next');$('missionReturnButton').textContent=mi('select');
    $('aftermathFinalButton').classList.toggle('hidden',activeMission!=='AY-004'||!missions.aftermath().unlocked);
    $('aftermathFinalButton').textContent=postMission.forLang(lang).finalButton;
  }


  const navigationCopy={
    pt:{home:'← Voltar ao Início',review:'Rever introdução',reset:'Resetar progresso',resetPrompt:'Deseja realmente apagar TODO o progresso do AYLA? As seis missões, o Nível 2, os desbloqueios e o desdobramento com Winston serão zerados. Essa ação não pode ser desfeita.',resetDone:'Todo o progresso foi zerado. Ayla voltou ao Nível 1.',resetFailed:'Não foi possível salvar o reset neste navegador.'},
    en:{home:'← Back to Home',review:'Replay introduction',reset:'Reset progress',resetPrompt:'Erase ALL AYLA progress? This resets all six missions, Level 2, all unlocks and the Winston follow-up. This cannot be undone.',resetDone:'All progress was reset. Ayla is back at Level 1.',resetFailed:'Unable to save the reset in this browser.'},
    es:{home:'← Volver al Inicio',review:'Volver a ver la introducción',reset:'Reiniciar progreso',resetPrompt:'¿Eliminar TODO el progreso de AYLA? Se reiniciarán las seis misiones, el Nivel 2, los desbloqueos y la conversación con Winston. No se puede deshacer.',resetDone:'Progreso reiniciado. Ayla volvió al Nivel 1.',resetFailed:'No se pudo guardar el reinicio en este navegador.'}
  };
  function navigationText(){return navigationCopy[lang]||navigationCopy.en}
  function localizeNavigation(){
    const c=navigationText();
    for(const id of ['missionSelectClose','homeFromCentral'])$(id).textContent=c.home;
    $('replayIntroduction').textContent=c.review;
    for(const id of ['resetFromStart','resetFromArchive'])$(id).textContent=c.reset;
  }
  function returnToIntroduction(){
    if(activePanel)closePanels();
    if(activePanel==='wallScreen')window.AYLAWall?.unfocus?.();
    aftermathDebrief=false;
    playerActive=false;
    held={};
    for(const id of ['topbar','missionHud','hintBox','mobileControls','compass','aylaRank'])$(id)?.classList.add('hidden');
    $('toast').classList.add('hidden');
    $('langDrop').classList.add('hidden');
    intro(); // Read-only replay; saved mission state and promotion remain intact.
  }
  function resetAllProgress(){
    if(!window.confirm(navigationText().resetPrompt))return;
    if(activePanel)closePanels();
    if(!missions.resetAll()){notify(navigationText().resetFailed);return;}
    activeMission='AY-001';
    restore();
    selectedSource=-1;
    dialogIndex=0;
    aftermathDebrief=false;
    held={};
    playerActive=false;
    if(ayla)ayla.root.position.set(0,0,1.2);
    for(const id of ['topbar','missionHud','hintBox','mobileControls','compass','aylaRank'])$(id)?.classList.add('hidden');
    localize();
    openMissionArchive();
    notify(navigationText().resetDone);
  }

  function localize(){document.documentElement.lang=lang;localizeNavigation();updateAccountIndicator();renderRank();if(visible('aftermathScreen'))renderAftermath();if(visible('promotionScreen'))renderPromotion();if($('missionMenuButton'))$('missionMenuButton').textContent=mi('missions');window.AYLAPecMan?.setLanguage(lang);document.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t(el.dataset.t);});$('loadingLabel').textContent=t('beginLabel');$('nextIntroLabel').textContent=t('enter');$('hintTitle').textContent=t('hint');$('hintSub').textContent=t('hintSub');$('langButton').innerHTML=lang.toUpperCase()+' <span>⌄</span>';document.querySelectorAll('[data-language],[data-lang]').forEach(el=>{el.classList.toggle('selected',(el.dataset.language||el.dataset.lang)===lang);});if(visible('introScreen'))renderIntro();if(visible('dialogScreen'))renderDialog();if(visible('terminalScreen'))renderSources();if(visible('mapScreen'))renderMap();if(visible('boardScreen'))renderBoard();if(visible('reportScreen'))renderReport();if(visible('finalScreen'))showMissionComplete();updateHud();updateHint();}
  function setLanguage(s){if(!ui[s])return;lang=s;window.AYLARestricted?.setLanguage(s);window.AYLAWall?.setLanguage(s);try{localStorage.setItem('ayla-language',s)}catch(e){}localize();hide('langDrop');if(visible('missionSelectScreen'))renderMissionArchive();}
  function renderIntro(){
    const story=introNarrative[lang]||introNarrative.en;
    document.querySelectorAll('[data-intro-caption]').forEach((node)=>{
      const index=Number(node.dataset.introCaption);
      node.textContent=story.captions[index]||'';
    });
    $('introMissionTitle').textContent=story.title;
    $('introMissionBody').textContent=story.body;
    document.querySelector('[data-intro-kicker]').textContent=story.kicker;
    if(document.querySelector('[data-intro-patch]'))document.querySelector('[data-intro-patch]').textContent=story.patch;
    if(document.querySelector('[data-intro-role]'))document.querySelector('[data-intro-role]').textContent=story.role;
    $('nextIntroLabel').textContent=t('enter');
  }
  function intro(){show('introScreen');introIndex=0;renderIntro();}
  function launch(){missions?.markIntro();show('');screens.forEach(hide);$('topbar').classList.remove('hidden');$('missionHud').classList.toggle('hidden',approvedSession);$('compass').classList.remove('hidden');$('mobileControls').classList.remove('hidden');playerActive=true;updateHud();syncAccess();if(engine)engine.resize();}
  function progress(){return (mentorMet?1:0)+(sourcesReviewed.size===4?1:0)+(mapSeen?1:0)+(boardSeen?1:0);}
  function updateHud(){const p=progress();if($('missionHud')){$('missionHud').querySelector('[data-t="missionTitle"]').textContent=t('missionTitle');$('missionHud').querySelector('[data-t="missionSubtitle"]').textContent=t('missionSubtitle');}$('progressFill').style.width=(25*p)+'%';$('progressText').textContent=p+' / 4';let objective='objectiveWinston';if(done)objective='objectiveComplete';else if(!mentorMet)objective='objectiveWinston';else if(sourcesReviewed.size!==4)objective='objectiveTerminal';else if(!mapSeen)objective='objectiveMap';else if(!boardSeen)objective='objectiveBoard';else objective='objectiveReport';$('objectiveText').textContent=missions.aftermath().pending?postMission.forLang(lang).objective:t(objective);$('resumeButton').classList.toggle('hidden',approvedSession||(p===0&&!done));}
  function markMentor(){mentorMet=true;save();updateHud();}
  function showDialog(){dialogIndex=0;aftermathDebrief=!!missions.aftermath().pending&&missions.aftermath().unlocked;if(winston?.setTalking)winston.setTalking(true);enterPanel('dialogScreen');renderDialog();}
  function renderDialog(){$('dialogBody').textContent=aftermathDebrief?postMission.forLang(lang).dialogue[dialogIndex]:t('mentorLines')[dialogIndex];$('dialogNext').querySelector('span').textContent=t('dialogNext');}
  function nextDialog(){
    if(aftermathDebrief){
      if(dialogIndex<postMission.forLang(lang).dialogue.length-1){dialogIndex++;renderDialog();return;}
      closePanels();aftermathDebrief=false;
      if(missions.promote()){renderRank();renderPromotion();show('promotionScreen');}
      else openMissionArchive();
      return;
    }
    if(dialogIndex===0){dialogIndex=1;renderDialog();}else{markMentor();closePanels();}
  }
  function showSources(){selectedSource=-1;enterPanel('terminalScreen');renderSources();}
  function showRestricted(){enterPanel('restrictedScreen');if(window.AYLARestricted)window.AYLARestricted.open(lang);else $('restrictedStatus').textContent={pt:'Conectando ao Firebase...',en:'Connecting to Firebase...',es:'Conectando a Firebase...'}[lang];}
  function renderSources(){const s=t('sources');$('sourceCount').textContent=sourcesReviewed.size+'/4';$('sourceList').innerHTML=s.map((d,i)=>'<button type="button" class="source-button '+(i===selectedSource?'active':'')+'" data-source="'+i+'"><span class="src-id">'+safe(d.id)+' '+(sourcesReviewed.has(i)?'<span class="reviewed">✓</span>':'')+'</span><strong>'+safe(d.title)+'</strong><small>'+safe(d.cat)+'</small></button>').join('');$('sourceList').querySelectorAll('[data-source]').forEach(btn=>btn.onclick=()=>{selectedSource=Number(btn.dataset.source);renderSources();});if(selectedSource===-1){$('sourceDetail').innerHTML='<div class="empty-state">'+safe(t('selectSource'))+'</div>';return;}const d=s[selectedSource];$('sourceDetail').innerHTML='<div class="doc-meta"><span>'+safe(d.id)+'</span><span>'+safe(d.cat)+'</span><span>'+safe(d.date)+'</span></div><h3 class="doc-title">'+safe(d.title)+'</h3>'+(activeMission==='AY-006'?(window.AYLAMissionSix?.renderEvidence(selectedSource,lang,missions.load('AY-006'))||''):activeMission==='AY-005'?(window.AYLAMissionFive?.renderEvidence(selectedSource,lang)||''):activeMission==='AY-004'?(window.AYLAMissionFour?.renderEvidence(selectedSource,lang)||''):activeMission==='AY-003'?(window.AYLAMissionThree?.renderEvidence(selectedSource,lang)||''):'')+'<p class="doc-body">'+safe(d.body)+'</p><div class="doc-note"><strong>'+safe(t('docAlert'))+'</strong><br>'+safe(d.note)+'</div><div class="doc-meta">'+safe(t('docClassification'))+'</div><div class="doc-actions"><button type="button" id="reviewSourceButton" class="primary-button"><span>'+(sourcesReviewed.has(selectedSource)?safe(t('viewed'))+' ✓':safe(t('markReviewed')))+' </span>→</button></div>';$('reviewSourceButton').onclick=()=>{sourcesReviewed.add(selectedSource);save();updateHud();notify(sourcesReviewed.size===4?t('readyToast'):t('sourceToast'));renderSources();};const capture=$('m6CaptureStory');if(capture&&!missions.load('AY-006').m6StoryCaptured)capture.onclick=()=>{missions.save('AY-006',{m6StoryCaptured:true});notify(window.AYLAMissionSix.copy(lang).captured);renderSources();};}
  function showMap(){mapSeen=true;save();updateHud();enterPanel('mapScreen');renderMap();}
  function renderMap(){const mapWrap=document.querySelector('#mapScreen .map-svg-wrap');if(mapWrap){mapWrap.classList.toggle('mission-two-map',activeMission==='AY-002');mapWrap.classList.toggle('mission-three-map',activeMission==='AY-003');mapWrap.classList.toggle('mission-four-map',activeMission==='AY-004');mapWrap.classList.toggle('mission-five-map',activeMission==='AY-005');mapWrap.classList.toggle('mission-six-map',activeMission==='AY-006');mapWrap.dataset.caseLabel=activeMission==='AY-006'?({pt:'MOSCOU → MADRID-BARAJAS · QUATRO VIAGENS REGISTRADAS / CENÁRIO FICTÍCIO',en:'MOSCOW → MADRID-BARAJAS · FOUR DOCUMENTED TRIPS / FICTIONAL CASE',es:'MOSCÚ → MADRID-BARAJAS · CUATRO VUELOS DOCUMENTADOS / CASO FICTICIO'}[lang]||''):activeMission==='AY-005'?({pt:'MAPA DO JOGO · CIDADES E LOTES INVENTADOS',en:'GAME MAP · INVENTED TOWNS AND PLOTS',es:'MAPA DEL JUEGO · CIUDADES Y PARCELAS INVENTADAS'}[lang]||''):activeMission==='AY-004'?({pt:'SANTA CATARINA → 6 VIAGENS À ÁSIA EM 2025 · PASSAGEM POR HONG KONG / CARGA NÃO VERIFICADA',en:'SANTA CATARINA → SIX ASIA VOYAGES IN 2025 · HONG KONG PORT CALL / CARGO UNVERIFIED',es:'SANTA CATARINA → SEIS VIAJES A ASIA EN 2025 · ESCALA EN HONG KONG / CARGA SIN VERIFICAR'}[lang]||''):activeMission==='AY-003'?({pt:'PERFIL ONLINE → CONTATO ••••6142 → PROPOSTA VIA AEROPORTO / TRAJETO NÃO COMPROVADO',en:'SOCIAL PROFILE → CONTACT ••••6142 → AIRPORT PROPOSAL / NO JOURNEY VERIFIED',es:'PERFIL SOCIAL → CONTACTO ••••6142 → PROPUESTA EN AEROPUERTO / VIAJE SIN VERIFICAR'}[lang]||''):({pt:'SERRA CLARA · LOCAL DE FISCALIZAÇÃO DOCUMENTADO / ORIGEM E DESTINO NÃO CONFIRMADOS',en:'SERRA CLARA · DOCUMENTED INSPECTION SITE / ORIGIN AND DESTINATION UNVERIFIED',es:'SERRA CLARA · LUGAR DE INSPECCIÓN DOCUMENTADO / ORIGEN Y DESTINO SIN CONFIRMAR'}[lang]||'');}$('mapLegend').innerHTML='<div class="legend-item"><strong>● '+safe(t('legendConfirmed'))+'</strong>'+safe(t('legendConfirmedText'))+'</div><div class="legend-item warn"><strong>◌ '+safe(t('legendSuspected'))+'</strong>'+safe(t('legendSuspectedText'))+'</div>';renderMissionFiveMap();renderMissionSixMap();}

  function renderMissionFiveMap(){
    const target=$('mapScreen').querySelector('.map-space');
    if(!target)return;
    let root=$('m5-workspace');
    if(activeMission!=='AY-005'){
      if(root)root.remove();
      return;
    }
    if(!root){
      root=document.createElement('div');
      root.id='m5-workspace';
      target.appendChild(root);
    }
    const cfg=window.AYLAMissionFive;
    root.innerHTML=cfg.renderMap(lang,missions.load('AY-005'));
    const btn=root.querySelector('#m5-check');
    if(!btn)return;
    btn.onclick=()=>{
      const town=root.querySelector('#m5-town').value;
      const plot=root.querySelector('#m5-plot').value;
      const text=cfg.copy(lang);
      if(!town||!plot){root.querySelector('#m5-result').textContent=text.missing;return;}
      const solved=cfg.valid(town,plot);
      missions.save('AY-005',{m5Town:town,m5Plot:plot,m5Solved:solved});
      root.querySelector('#m5-result').textContent=solved?text.success:text.failure;
      root.classList.toggle('m5-correct',solved);
      updateHud();
      if(solved)notify(text.success);
    };
  }

  function renderMissionSixMap(){
    const target=$('mapScreen').querySelector('.map-space');
    if(!target)return;
    let root=$('m6-workspace');
    if(activeMission!=='AY-006'){
      if(root)root.remove();
      return;
    }
    if(!root){
      root=document.createElement('div');
      root.id='m6-workspace';
      target.appendChild(root);
    }
    root.innerHTML=window.AYLAMissionSix.renderMap(lang);
  }

  function showBoard(){boardSeen=true;save();updateHud();enterPanel('boardScreen');renderBoard();}
  function renderBoard(){const all=[{key:'evidenceConfirmed',body:'evidenceObserved',warn:false,source:0},{key:'evidenceOpen',body:'evidenceLead',warn:true,source:1},{key:'evidenceRoute',body:'evidenceRouteText',warn:true,source:3},{key:'evidenceGap',body:'evidenceGapText',warn:true,source:3}];$('boardContent').innerHTML=all.map((c)=>'<div class="board-card '+(c.warn?'warn ':'')+(sourcesReviewed.has(c.source)?'':'locked')+'"><div class="tag">'+(c.warn?'[N] / ?':'[O] / ✓')+'</div><h3>'+safe(t(c.key))+'</h3><p>'+safe(t(c.body))+'</p></div>').join('')+(activeMission==='AY-006'?window.AYLAMissionSix.renderNetwork(lang):'');}


  // Dossier camera is presentation-only. Never modify Ayla's yaw, position,
  // locomotion state or rig: her original walking and turning belong to navigation.
  let reportCameraPose=null,reportCameraRestore=null;
  function chooseReportCameraPose(){
    if(!ayla||!camera||!navigation)return null;
    const p=ayla.root.position;
    // Babylon ArcRotateCamera alpha: camera behind current character yaw.
    const behind=Math.PI/2-ayla.root.rotation.y;
    const beta=1.11,desiredRadius=5.0;
    const reach=desiredRadius*Math.sin(beta);
    const offsets=[0,.28,-.28,.56,-.56,.84,-.84,1.12,-1.12];
    let bestAlpha=behind,bestClear=0;
    for(const offset of offsets){
      const alpha=behind+offset;
      let clear=0;
      // Keep the camera's XZ path inside the operations center and off desks.
      for(let d=.35;d<=reach;d+=.18){
        const x=p.x+Math.cos(alpha)*d,z=p.z+Math.sin(alpha)*d;
        if(navigation.blocked(x,z,.12,null,null))break;
        clear=d;
      }
      if(clear>bestClear){bestClear=clear;bestAlpha=alpha;}
      if(clear>=reach-.2)break;
    }
    // A fixed radius was the reason shots could cross the wall even when an
    // unobstructed angle was selected. Use the actually verified distance.
    const radius=Math.max(1.45,Math.min(desiredRadius,(bestClear-.15)/Math.sin(beta)));
    return {x:p.x,y:1.52,z:p.z,radius,beta,alpha:bestAlpha};
  }
  function focusReportCamera(){
    if(!camera)return;
    // This function is called both on interaction and when the panel opens.
    // Save the original view only once, before the cinematic changes it.
    if(!reportCameraRestore){
      reportCameraRestore={
        alpha:camera.alpha,beta:camera.beta,radius:camera.radius,
        lowerRadiusLimit:camera.lowerRadiusLimit,target:camera.target.clone()
      };
    }
    if(!reportCameraPose)reportCameraPose=chooseReportCameraPose();
    if(!reportCameraPose)return;
    const pose=reportCameraPose;
    // Small radius is necessary when the desk is close to the wall.
    camera.lowerRadiusLimit=1.4;
    camera.alpha=pose.alpha;camera.beta=pose.beta;camera.radius=pose.radius;
    camera.inertialAlphaOffset=0;camera.inertialBetaOffset=0;camera.inertialRadiusOffset=0;
    camera.setTarget(new window.BABYLON.Vector3(pose.x,pose.y,pose.z));
  }
  function restoreReportCamera(){
    if(reportCameraRestore&&camera){
      const prev=reportCameraRestore;
      camera.alpha=prev.alpha;camera.beta=prev.beta;camera.radius=prev.radius;
      camera.lowerRadiusLimit=prev.lowerRadiusLimit;
      camera.inertialAlphaOffset=0;camera.inertialBetaOffset=0;camera.inertialRadiusOffset=0;
      camera.setTarget(prev.target);
    }
    reportCameraPose=null;reportCameraRestore=null;
  }
  function showReport(){focusReportCamera();enterPanel('reportScreen');renderReport();}
  function renderReport(){const ready=mentorMet&&mapSeen&&boardSeen&&sourcesReviewed.size===4&&(activeMission!=='AY-005'||missions.load('AY-005').m5Solved)&&(activeMission!=='AY-006'||missions.load('AY-006').m6StoryCaptured);const form=$('reportForm');$('reportFeedback').classList.add('hidden');if(!ready){$('reportQuestions').innerHTML='<div class="question"><p>'+safe(activeMission==='AY-006'&&!missions.load('AY-006').m6StoryCaptured?window.AYLAMissionSix.copy(lang).captureRequired:t('locked'))+'</p></div>';form.querySelector('[type="submit"]').disabled=true;return;}form.querySelector('[type="submit"]').disabled=false;$('reportQuestions').innerHTML=(activeMission==='AY-006'?window.AYLAMissionSix.storyAttachment(lang):'')+[1,2,3].map((i)=>'<div class="question"><h3>'+safe(t('question'+i))+'</h3>'+t('answers'+i).map((a,j)=>'<label><input type="radio" name="q'+i+'" value="'+j+'"><span>'+safe(a)+'</span></label>').join('')+'</div>').join('');}
  function evaluateReport(e){e.preventDefault();const choices=[1,2,3].map(i=>{const el=document.querySelector('input[name="q'+i+'"]:checked');return el?Number(el.value):-1;});const feedback=$('reportFeedback');feedback.classList.remove('hidden','ok');if(choices.includes(-1)){feedback.textContent=t('incomplete');return;}if((activeMission!=='AY-005'||missions.load('AY-005').m5Solved)&&(activeMission!=='AY-006'||missions.load('AY-006').m6StoryCaptured)&&choices.every((choice,i)=>choice===(missions?.correct(activeMission)||[0,1,2])[i])){done=true;save();feedback.classList.add('ok');feedback.textContent=t('successToast');closePanels();show('finalScreen');showMissionComplete();updateHud();}else{feedback.textContent=t('answerError');}}
  function updateHint(){const on=playerActive&&!activePanel&&nearby&&(!approvedSession||nearby.id==='restricted'||nearby.id==='wall'||nearby.id==='pecman');const hint=$('hintBox');hint.classList.toggle('hidden',!on);if(on){const name={winston:'Winston',terminal:t('terminal'),restricted:{pt:'Área restrita',en:'Restricted area',es:'Área restringida'}[lang],wall:{pt:'Telão do Observatório',en:'Observatory display',es:'Pantalla del Observatorio'}[lang],map:t('mapTitle'),board:t('boardTitle'),report:t('reportTitle'),pecman:'PEC MAN'}[nearby.id];$('hintTitle').textContent=name;}else $('hintTitle').textContent=t('hint');}
  function openPecMan(){
    if(!playerActive||activePanel||cinematicPending||!window.AYLAPecMan)return;
    held={};
    cinematicMode='idle';
    enterPanel('pecManScreen');
    window.AYLAPecMan.open(lang,closePanels);
  }
  function interact(id){
    if(!playerActive||activePanel||cinematicPending)return;
    if(!['winston','terminal','restricted','wall','map','board','report','pecman'].includes(id))return;
    if(approvedSession&&id!=='restricted'&&id!=='wall'&&id!=='pecman')return;
    if(id==='wall'){
      if(!approvedSession)return;
      cinematicMode='wall';activePanel='wallScreen';
      window.AYLAWall?.focus();
      $('renderCanvas').classList.add('panel-active');
      $('hintBox').classList.add('hidden');
      return;
    }
    if(id==='restricted'){cinematicMode='restricted';showRestricted();return;}
    if(id==='pecman'){openPecMan();return;}
    cinematicPending=true;cinematicMode=id;patrolPaused=(id==='winston');
    if(id==='report')focusReportCamera();
    const cue=$('cinematicCue');
    cue.textContent=(sceneCue[lang]||sceneCue.en)[id];cue.classList.remove('hidden');
    if(ayla?.setInteraction)ayla.setInteraction(id);
    if(ayla?.setCinematic)ayla.setCinematic(id);
    if(id==='winston'){
      if(winston?.setDialogue)winston.setDialogue(true);
      if(winston?.setTalking)winston.setTalking(true);
    }
    $('hintBox').classList.add('hidden');
    const open=()=>{cinematicPending=false;cue.classList.add('hidden');if(!playerActive)return;switch(id){case 'winston':showDialog();break;case 'terminal':showSources();break;case 'restricted':showRestricted();break;case 'map':showMap();break;case 'board':showBoard();break;case 'report':showReport();break;}};
    cinematicTimer=setTimeout(open,3000);
  }


  $('missionMenuButton').onclick=openMissionArchive;
  $('homeFromCentral').onclick=returnToIntroduction;
  $('replayIntroduction').onclick=returnToIntroduction;
  $('resetFromStart').onclick=resetAllProgress;
  $('resetFromArchive').onclick=resetAllProgress;
  $('missionSelectClose').onclick=returnToIntroduction;
  $('missionPlay1').onclick=()=>selectMission('AY-001');
  $('missionPlay2').onclick=()=>selectMission('AY-002');
  $('missionPlay3').onclick=()=>selectMission('AY-003');
  $('missionPlay4').onclick=()=>selectMission('AY-004');
  $('missionPlay5').onclick=()=>selectMission('AY-005');
  $('missionPlay6').onclick=()=>selectMission('AY-006');
  $('aftermathArchiveButton').onclick=()=>{
    const st=missions.aftermath();
    if(!st.unlocked)return;
    if(st.pending){
      activeMission='AY-004';missions.choose('AY-004');restore();localize();launch();
      notify(postMission.forLang(lang).objective);
    }else openAftermath();
  };
  $('aftermathFinalButton').onclick=openAftermath;
  $('aftermathClose').onclick=openMissionArchive;
  $('aftermathBack').onclick=openMissionArchive;
  $('aftermathContinue').onclick=()=>{if(missions.aftermath().level2){openMissionArchive();return;}missions.markNews();activeMission='AY-004';missions.choose('AY-004');restore();localize();launch();notify(postMission.forLang(lang).objective);};
  $('promotionArchive').onclick=openMissionArchive;
  $('promotionRoom').onclick=()=>{activeMission='AY-004';missions.choose('AY-004');restore();localize();launch();};
  $('missionReplay1').onclick=()=>selectMission('AY-001',true);
  $('missionReplay2').onclick=()=>selectMission('AY-002',true);
  $('missionReplay3').onclick=()=>selectMission('AY-003',true);
  $('missionReplay4').onclick=()=>selectMission('AY-004',true);
  $('missionReplay5').onclick=()=>selectMission('AY-005',true);
  $('missionReplay6').onclick=()=>selectMission('AY-006',true);
  $('missionNextButton').onclick=()=>{const nextMission=activeMission==='AY-001'?'AY-002':activeMission==='AY-002'?'AY-003':activeMission==='AY-003'?'AY-004':activeMission==='AY-004'&&missions.unlocked('AY-005')?'AY-005':activeMission==='AY-005'&&missions.unlocked('AY-006')?'AY-006':null;if(nextMission)selectMission(nextMission);};
  $('missionReturnButton').onclick=openMissionArchive;
  $('missionExport').onclick=async()=>{
    const code=missions.copyCode();
    try{await navigator.clipboard.writeText(code);notify(mi('backupSuccess'));}
    catch(e){window.prompt(mi('backupFallback'),code);}
  };
  $('missionImport').onclick=()=>{
    const code=window.prompt(mi('importPrompt'));if(!code)return;
    if(missions.importCode(code)){notify(mi('importSuccess'));renderMissionArchive();}
    else notify(mi('importFailure'));
  };

  $('langButton').onclick=()=> $('langDrop').classList.toggle('hidden');
  document.querySelectorAll('[data-lang],[data-language]').forEach(el=>el.addEventListener('click',()=>setLanguage(el.dataset.lang||el.dataset.language)));
  $('startButton').onclick=()=>approvedSession?launch():(missions?.introSeen()?openMissionArchive():intro());
  $('aylaGuestMode').onclick=async()=>{
    const button=$('aylaGuestMode');
    if(button.disabled)return;
    button.disabled=true;
    try{
      const ok=await window.AYLARestricted?.signOut?.();
      if(ok){
        // Closing the restricted view does not sign out, but explicitly
        // selecting this action does. Restore the public mission in place.
        if(activePanel==='restrictedScreen')closePanels();
        syncAccess();
      }else if(!window.AYLARestricted?.signOut){
        notify({pt:'Login ainda não disponível.',en:'Login is not available yet.',es:'El acceso todavía no está disponible.'}[lang]);
      }
    }finally{button.disabled=false;}
  };
  $('resumeButton').onclick=openMissionArchive;
  $('nextIntro').onclick=()=>{missions?.markIntro();openMissionArchive();};
  $('skipIntro').onclick=()=>{missions?.markIntro();openMissionArchive();};
  $('dialogNext').onclick=nextDialog;
  $('reportForm').onsubmit=evaluateReport;
  $('closeReport').onclick=closePanels;
  $('helpButton').onclick=()=>enterPanel('helpScreen');
  window.addEventListener('ayla:wall-close',()=>{if(activePanel==='wallScreen')closePanels()});
  window.addEventListener('ayla:wall-open',()=>{if(playerActive&&!activePanel&&approvedSession)interact('wall')});
  $('restartButton').onclick=()=>{resetMission();if(ayla)ayla.root.position.set(0,0,1.2);localize();launch();};
  document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closePanels);
  $('mobileInteract').onclick=()=>{if(nearby)interact(nearby.id);};
  // A visible in-game demonstration for verifying the character actions and camera.
  function runCinematicDemo(){
    if(!playerActive||activePanel||cinematicPending||demoActive)return;
    demoActive=true;cinematicPending=true;cinematicMode='winston';patrolPaused=false;
    const cue=$('cinematicCue');
    cue.textContent={pt:'WINSTON EM PATRULHA',en:'WINSTON ON PATROL',es:'WINSTON EN PATRULLA'}[lang];
    cue.classList.remove('hidden');$('hintBox').classList.add('hidden');
    demoTimers.push(setTimeout(()=>{
      if(!demoActive)return;
      cinematicMode='terminal';
      if(ayla?.setInteraction)ayla.setInteraction('terminal');
      if(ayla?.setCinematic)ayla.setCinematic('terminal');
      cue.textContent={pt:'AYLA NO TERMINAL OSINT',en:'AYLA AT THE OSINT DESK',es:'AYLA EN EL TERMINAL OSINT'}[lang];
    },3200));
    demoTimers.push(setTimeout(()=>{
      if(!demoActive)return;
      demoActive=false;cinematicPending=false;cue.classList.add('hidden');
      cinematicMode='terminal';showSources();
    },7100));
  }
  // Player-controlled inspection camera: optional close view, unchanged collision logic.
  let closeCamera=true;
  function toggleCamera(){
    closeCamera=!closeCamera;
    const btn=$('cameraButton');
    if(btn){btn.classList.toggle('active',closeCamera);btn.setAttribute('aria-pressed',String(closeCamera));}
    if(camera)camera.radius=closeCamera?5.3:9.8;
  }
  $('cameraButton').onclick=toggleCamera;
  let held={};
  addEventListener('keydown',(e)=>{const key=e.key.toLowerCase();if(playerActive&&(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','e','shift'].includes(key)))e.preventDefault();held[key]=true;if(key==='escape')closePanels();if(key==='c'&&!e.repeat&&playerActive&&!activePanel)toggleCamera();if(key==='e'&&!e.repeat&&nearby)interact(nearby.id);});
  addEventListener('keyup',(e)=>held[e.key.toLowerCase()]=false);
  addEventListener('blur',()=>held={});
  document.querySelectorAll('[data-key]').forEach(b=>{const k=b.dataset.key;b.addEventListener('pointerdown',(e)=>{e.preventDefault();held[k]=true;b.setPointerCapture(e.pointerId);});['pointerup','pointercancel','lostpointercapture'].forEach(ev=>b.addEventListener(ev,()=>held[k]=false));});
  restore();localize();

  let engine,scene,camera,ayla,winston,navigation,crowd;const interactables=[];
  function setupScene(){
    const B=window.BABYLON;
    if(!B){$('engineError').textContent='The 3D engine could not be loaded. Check your connection and reload.';$('engineError').classList.remove('hidden');hide('loading');return;}
    try{engine=new B.Engine($('renderCanvas'),true,{antialias:true,stencil:true});}catch(err){$('engineError').textContent='WebGL initialization failed: '+String(err);$('engineError').classList.remove('hidden');hide('loading');return;}
    scene=new B.Scene(engine);scene.clearColor=new B.Color4(.018,.042,.048,1);
    // Neutral cinematic exposure prevents the green/cyan lights from blowing out faces.
    const imaging=scene.imageProcessingConfiguration;
    imaging.toneMappingEnabled=true;
    imaging.toneMappingType=B.ImageProcessingConfiguration.TONEMAPPING_ACES;
    imaging.exposure=.82;imaging.contrast=1.17;
    const hemi=new B.HemisphericLight('ambient',new B.Vector3(0,1,0),scene);hemi.intensity=.64;hemi.diffuse=B.Color3.FromHexString('#e0e9e4');hemi.groundColor=B.Color3.FromHexString('#454d4b');
    const dir=new B.DirectionalLight('keyLight',new B.Vector3(-.3,-1,.45),scene);dir.position=new B.Vector3(4,11,-5);dir.intensity=1.02;dir.diffuse=B.Color3.FromHexString('#f7eee1');
    const l1=new B.PointLight('greenGlow',new B.Vector3(-7,4,5),scene);l1.diffuse=B.Color3.FromHexString('#8ba99b');l1.intensity=1.75;l1.range=11;
    const l2=new B.PointLight('cyanGlow',new B.Vector3(5,4,-4),scene);l2.diffuse=B.Color3.FromHexString('#84b1b3');l2.intensity=2.0;l2.range=11;
    function material(name,color,emissive){const m=new B.StandardMaterial(name,scene);m.diffuseColor=B.Color3.FromHexString(color);m.specularColor=new B.Color3(.07,.13,.1);if(emissive)m.emissiveColor=B.Color3.FromHexString(emissive);return m;}
    const M={floor:material('floor','#203c3a'),wall:material('wall','#142f30'),wall2:material('wall2','#0a252a'),frame:material('frame','#3a5750'),green:material('green','#8caa7b','#233e2c'),wood:material('wood','#435d4a'),metal:material('metal','#192c2b'),screen:material('screen','#1a4549','#123b3e'),paper:material('paper','#8eaa9b'),glass:material('glass','#35665e'),skin:material('skin','#b67e65'),hair:material('hair','#202020'),jacket:material('jacket','#24615c'),pants:material('pants','#20343c'),skinW:material('skinW','#aa846a'),hairW:material('hairW','#b7beb6'),jacketW:material('jacketW','#4d6465')};M.glass.alpha=.34;
    function bx(name,w,h,d,x,y,z,mat,parent){const o=B.MeshBuilder.CreateBox(name,{width:w,height:h,depth:d},scene);o.position.set(x,y,z);o.material=mat;if(parent)o.parent=parent;return o;}
    function ball(name,r,x,y,z,mat,parent){const o=B.MeshBuilder.CreateSphere(name,{diameter:r*2,segments:14},scene);o.position.set(x,y,z);o.material=mat;if(parent)o.parent=parent;return o;}
    function cylinder(name,r,h,x,y,z,mat,parent){const o=B.MeshBuilder.CreateCylinder(name,{diameter:r*2,height:h,tessellation:16},scene);o.position.set(x,y,z);o.material=mat;if(parent)o.parent=parent;return o;}
    bx('floor',24,.24,20,0,-.2,0,M.floor);
    for(let n=-11;n<=11;n+=2)bx('floorLine',.025,.01,19,n,-.072,0,M.frame);
    for(let n=-9;n<=9;n+=2)bx('floorLine',23,.01,.025,0,-.068,n,M.frame);
    bx('northWall',24,5.7,.35,0,2.7,9.7,M.wall2);bx('westWall',.35,5.7,20,-11.9,2.7,0,M.wall);bx('eastWall',.35,5.7,8,11.9,2.7,5,M.wall);
    bx('wallAccent',23,.15,.4,0,5.5,9.42,M.green);bx('frontBeam',24,.15,.24,0,5.3,-9.7,M.frame);
    for(let x=-9;x<=9;x+=4.5){bx('window',4.1,2.9,.06,x+1.9,2.8,9.5,M.glass);bx('pillar',.12,5.3,.38,x,2.65,9.46,M.frame);}
    for(let x=-7;x<=7;x+=7)for(let z=-4;z<=4;z+=4)bx('lightPanel',2.5,.14,.38,x,5.15,z,M.green);
    function desk(x,z,w,d){const root=new B.TransformNode('desk',scene);root.position.set(x,0,z);bx('deskTop',w,.18,d,0,1.01,0,M.wood,root);for(let k of [-1,1])for(let j of [-1,1])bx('deskLeg',.13,.96,.13,k*(w/2-.18),.47,j*(d/2-.17),M.metal,root);return root;}
    function computer(root,x,z){bx('monitorCase',1.4,.9,.12,x,1.7,z,M.metal,root);bx('screen',1.27,.76,.05,x,1.72,z-.075,M.screen,root);bx('stand',.09,.3,.1,x,1.14,z+.03,M.frame,root);bx('keyboard',1.1,.07,.38,x,1.16,z-.55,M.metal,root);for(let i=0;i<6;i++)bx('screenGlyph',.08+i*.08,.025,.01,x-.43,1.97-i*.105,z-.104,M.green,root);}
    const terminalDesk=desk(4.7,-3.3,3.5,1.7);computer(terminalDesk,-.75,.09);computer(terminalDesk,.85,.12);
    // Use the existing right-hand monitor for authorized access.
    // Text is drawn onto a front-facing, unlit screen plane so it remains
    // readable from the approach side and never appears mirrored.
    const restrictedTex=new B.DynamicTexture('ayla-restricted-terminal',{width:1024,height:640},scene,true);
    const rc=restrictedTex.getContext();
    rc.fillStyle='#06171b';rc.fillRect(0,0,1024,640);
    rc.strokeStyle='#759f90';rc.lineWidth=9;rc.strokeRect(26,25,972,590);
    rc.fillStyle='#a9d5a6';rc.font='bold 42px monospace';rc.fillText('AYLA // SECURE ACCESS',65,110);
    rc.strokeStyle='#88ba9d';rc.lineWidth=17;rc.strokeRect(447,257,130,125);
    rc.beginPath();rc.arc(512,257,49,Math.PI,0);rc.stroke();
    rc.fillStyle='#cae99f';rc.font='bold 61px Arial';rc.textAlign='center';rc.fillText('ÁREA RESTRITA',512,469);
    rc.fillStyle='#7fa99e';rc.font='29px monospace';rc.fillText('FIREBASE / LOGIN',512,536);
    restrictedTex.update();
    const restrictedDisplay=B.MeshBuilder.CreatePlane('ayla-restricted-monitor-face',{width:1.19,height:.72},scene);
    restrictedDisplay.parent=terminalDesk;
    restrictedDisplay.position.set(.85,1.72,.12-.113);
    restrictedDisplay.rotation.y=Math.PI;
    const restrictedMat=new B.StandardMaterial('restricted-screen-emissive',scene);
    restrictedMat.diffuseTexture=restrictedTex;restrictedMat.disableLighting=true;restrictedMat.backFaceCulling=false;
    restrictedDisplay.material=restrictedMat;
    restrictedDisplay.metadata={interaction:'restricted'};

    const reportDesk=desk(-8.0,-8.05,3.8,1.9);bx('paperReport',.86,.025,1.2,-.35,1.14,-.04,M.paper,reportDesk);bx('fileBand',.87,.035,.12,-.35,1.18,.18,M.green,reportDesk);
    const fileDesk=desk(5.4,4.0,3.4,1.8);for(let i=0;i<4;i++)bx('documents',.75,.03,.95,-1+i*.52,1.13,i*.12-.28,M.paper,fileDesk);bx('evidenceBox',.95,.6,.73,.85,1.41,-.03,M.frame,fileDesk);
    const boardDesk=desk(-6,5.6,3.5,1.7);bx('folders',1,.13,.74,0,1.17,0,M.paper,boardDesk);
    bx('mapDisplay',4.7,2.7,.15,2.5,3.15,9.25,M.screen);for(let i=0;i<5;i++)bx('mapLine',.045,.17+i*.09,.018,.6+i*.75,2.7+Math.sin(i)*.3,9.16,M.green);ball('mapPoint',.11,1.0,3.2,9.11,M.green);ball('mapPoint',.11,3.5,3.6,9.11,M.paper);
    bx('bulletinBoard',4.7,2.7,.13,-5.9,3.1,9.24,M.wood);for(let i=0;i<5;i++){const card=bx('note',.65,.83,.04,-7.6+i*.86,2.95+(i%2)*.24,9.13,M.paper);card.rotation.z=(i%3-1)*.08;}for(let i=0;i<4;i++){let wire=bx('connection',.62,.022,.024,-7.12+i*.85,3.21,9.08,M.green);wire.rotation.z=i%2?.27:-.24;}
    // Decorative plants removed; the wall-display area is unobstructed.

    // Environmental intelligence center: layered materials, illuminated surfaces and working equipment.
    const cyan=material('interface cyan','#1f7f88','#0c454c');
    const brass=material('brushed gold','#b1a074');
    const trim=material('brushed aluminum','#537773');
    const deep=material('graphite','#081c25');
    const amber=material('evidence amber','#b37b3f','#7a4e24');
    const greenStrip=material('floor wayfinding','#5d9468','#3a7656');
    const softLight=material('ceiling white','#dff2db','#8eaa9b');
    const seaglass=material('glass panel','#3c8c8c','#13353d');seaglass.alpha=.25;
    // Architectural grid and layered ceiling ribs.
    for(let x=-10.8;x<=10.8;x+=2.7){
      bx('ceilingRib',.075,.16,18,x,5.55,0,trim);
      bx('suspendedStrip',.04,.035,16,x,5.32,0,greenStrip);
    }
    for(let z=-8.6;z<=7.5;z+=3.2){
      bx('ceilingCrossbeam',21,.13,.08,0,5.5,z,trim);
      bx('luminaire',3.7,.075,.17,0,5.24,z,softLight);
    }
    for(let x=-9.5;x<10;x+=4){
      bx('floorGuide',.07,.008,3.6,x,-.067,.3,greenStrip);
    }
    // Reinforced window frames and lower back-wall trim.
    bx('northSkirting',23,.12,.11,0,.18,9.42,trim);
    bx('westSkirting',.11,.12,19,-11.65,.18,0,trim);
    for(let x=-9;x<=9;x+=4.5){
      bx('windowTop',4.14,.075,.12,x+1.9,4.27,9.38,trim);
      bx('windowBottom',4.14,.08,.12,x+1.9,1.36,9.38,trim);
      bx('windowHalf',4.14,.04,.1,x+1.9,2.82,9.36,trim);
    }
    // Chairs removed. Workstation interactions are standing-only.
    function terminalSlab(x,y,z,w,h,label){
      const p=bx('dataDisplay',w,h,.06,x,y,z,deep);
      const tex=new B.DynamicTexture('datastream-'+label,{width:1024,height:512},scene,true);
      const ctx=tex.getContext();
      ctx.fillStyle='#06242b';ctx.fillRect(0,0,1024,512);
      ctx.strokeStyle='#245457';ctx.lineWidth=2;
      for(let i=0;i<14;i++){ctx.beginPath();ctx.moveTo(i*75,0);ctx.lineTo(i*75,512);ctx.stroke()}
      for(let i=0;i<8;i++){ctx.beginPath();ctx.moveTo(0,i*70);ctx.lineTo(1024,i*70);ctx.stroke()}
      ctx.fillStyle='#a9edbb';ctx.font='bold 49px Arial';ctx.fillText(label,48,90);
      ctx.fillStyle='#60a8a6';
      for(let i=0;i<11;i++){ctx.fillRect(46,130+i*28,120+(i*71)%390,8)}
      ctx.strokeStyle='#a8d970';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(544,400);
      for(let i=0;i<11;i++)ctx.lineTo(544+i*37,300+Math.sin(i*1.2)*57);ctx.stroke();
      ctx.fillStyle='#b1d88f';ctx.font='24px monospace';ctx.fillText('AY / ACTIVE INVESTIGATION',540,460);
      tex.update();
      const mt=new B.StandardMaterial('holo screen '+label,scene);mt.diffuseTexture=tex;mt.emissiveColor=new B.Color3(.45,.55,.51);mt.backFaceCulling=false;
      bx('dataSurface',w-.09,h-.09,.009,x,y,z-.042,mt);
      return p;
    }
    terminalSlab(2.4,3.12,9.13,4.45,2.45,'GEOINT / ROUTES');
    terminalSlab(-5.9,3.12,9.06,4.1,2.45,'OSINT / NETWORK');
    for(let i=0;i<3;i++){
      bx('serverColumn',1.0,2.95,.85,10.7,1.59,-6.7+i*1.4,deep);
      for(let j=0;j<9;j++){
        bx('serverBay',.79,.115,.08,10.7,.45+j*.27,-7.15+i*1.4,trim);
        ball('serverLED',.028,10.38,.45+j*.27,-7.20+i*1.4,j%3?greenStrip:amber);
      }
    }
    // A working case evidence corner.
    bx('cabinet',2.25,1.72,.8,-9.55,.88,2.0,deep);
    for(let j=0;j<3;j++){
      bx('cabinetDrawer',2.0,.44,.08,-9.55,.39+j*.5,1.55,trim);
      bx('cabinetHandle',.43,.04,.07,-9.55,.4+j*.5,1.50,softLight);
    }
    for(let i=0;i<5;i++){
      bx('fileBinder',.12,.64,.42,-10.1+i*.24,2.0,2.0,i%2?M.green:M.paper);
    }
    function fieldKit(x,z){
      bx('fieldcase',.86,.24,.55,x,1.27,z,deep);
      bx('fieldcaseLid',.9,.07,.58,x,1.43,z,trim);
      bx('fieldcaseLatch',.1,.07,.03,x,1.41,z-.3,brass);
    }
    fieldKit(5.8,4.13);
    // Decorative plus-sign floor markers intentionally removed.
    // Glowing interactive pylons above existing interaction rings, without new collision zones.
    function labelBeacon(x,z,txt){
      const pillar=cylinder('interactionPillar',.08,.77,x,.62,z,cyan);
      const bulb=ball('interactionLight',.14,x,1.1,z,M.green);
      const plane=B.MeshBuilder.CreatePlane('interactionLabel',{width:2.1,height:.48},scene);
      plane.position.set(x,1.78,z);
      plane.billboardMode=B.Mesh.BILLBOARDMODE_ALL;
      const tex=new B.DynamicTexture('interactionTexture '+txt,{width:512,height:128},scene,true);
      const c=tex.getContext();c.fillStyle='#08252d';c.fillRect(0,0,512,128);
      c.strokeStyle='#9acc8c';c.lineWidth=6;c.strokeRect(5,5,502,118);
      c.fillStyle='#deffbd';c.font='bold 37px Arial';c.textAlign='center';c.fillText(txt,256,78);tex.update();
      const labelMat=new B.StandardMaterial('labelMaterial '+txt,scene);labelMat.diffuseTexture=tex;labelMat.emissiveColor=new B.Color3(.55,.62,.56);labelMat.backFaceCulling=false;plane.material=labelMat;
      return {pillar,bulb,plane};
    }
    // Named 3D billboards and illuminated hoops were removed. The nearby E prompt remains.
    const winstonBeacon=null;

    // AYLA 0.3: original articulated human characters built with Babylon.js meshes.
    // These procedural actors replace the prior geometric placeholder avatars.
    if (!window.AYLACharacterFactory) {
      throw new Error('AYLACharacterFactory did not load. Refresh the page.');
    }
    ayla=window.AYLACharacterFactory.create(B,scene,{name:'Ayla',x:0,z:1.2,isWinston:false});
    winston=window.AYLACharacterFactory.create(B,scene,{name:'Winston',x:-5.7,z:-2.3,isWinston:true});
    winston.root.rotation.y=1.3;
    const points=[{id:'winston',x:-5.7,z:-2.3},{id:'terminal',x:4.7,z:-3.3},{id:'restricted',x:5.65,z:-3.18},{id:'wall',x:-1.55,z:-8.40},{id:'map',x:2.2,z:7.3},{id:'board',x:-6.0,z:7.3},{id:'report',x:-8.0,z:-8.05},{id:'pecman',x:8.6,z:.6}];
    // Patrol stays within the open west corridor, away from desks and workstations.
    const patrol=[[-5.7,-2.3],[-7.6,-2.3],[-8.6,-.6],[-7.4,1.0],[-5.8,.7]];
    let patrolIndex=1,patrolRest=0;
    function animateWinston(dt,now){
      const pause=patrolPaused||activePanel==='dialogScreen'||(cinematicMode==='winston'&&!demoActive)||!playerActive;
      if(pause){winston.animate(dt,false,false,now);return;}
      if(patrolRest>0){patrolRest-=dt;winston.animate(dt,false,false,now);return;}
      const [tx,tz]=patrol[patrolIndex];
      const moved=navigation.moveNPC(winston,{x:tx,z:tz},dt,othersFor(winston));
      if(moved.arrived){patrolIndex=(patrolIndex+1)%patrol.length;patrolRest=1.0;}
      else if(!moved.moving)patrolRest=.3;
      winston.animate(dt,moved.moving,false,now);
    }
    points.forEach((p)=>{const ring=B.MeshBuilder.CreateTorus('interaction_'+p.id,{diameter:1.28,thickness:.08,tessellation:36},scene);ring.position.set(p.x,.22,p.z);ring.rotation.x=Math.PI/2;ring.material=M.green;ring.metadata={interaction:p.id};p.ring=ring;ring.setEnabled(false);
      // Invisible click targets preserve mouse/touch access after removing
      // the animated naming plates and floor hoops.
      const proxy=B.MeshBuilder.CreateSphere('interaction-target-'+p.id,{diameter:1.72,segments:8},scene);
      proxy.position.set(p.x,1.36,p.z);proxy.visibility=.001;proxy.isPickable=true;
      proxy.metadata={interaction:p.id};p.proxy=proxy;
      interactables.push(p);});
    camera=new B.ArcRotateCamera('camera',-Math.PI/2,1.15,5.3,new B.Vector3(0,1.5,1.2),scene);camera.attachControl($('renderCanvas'),true);camera.lowerRadiusLimit=4.8;camera.upperRadiusLimit=15;camera.lowerBetaLimit=.47;camera.upperBetaLimit=1.49;camera.wheelPrecision=32;camera.panningSensibility=0;camera.angularSensibilityX=2200;camera.angularSensibilityY=1900;camera.inputs.removeByType('ArcRotateCameraKeyboardMoveInput');
    // Capsule-based collision and pathfinding for desks, walls, props and actors.
    if(!window.AYLANavigationV8||!window.AYLARoomV8)throw new Error('AYLA 0.8 environment was not loaded');
    const room=window.AYLARoomV8.install(B,scene);
    window.AYLAGlobeDecor={globe:room.globe,header:scene.getMeshByName('v8-global-header')};
    const wallTap=B.MeshBuilder.CreatePlane('ayla-wall-interaction',{width:5.44,height:3.83},scene);
    wallTap.position.set(-1.55,2.93,-9.02);
    wallTap.visibility=.0001;wallTap.isPickable=true;
    wallTap.metadata={interaction:'wall'};
    window.AYLAWall?.init(B,scene,camera,engine);
    window.AYLAWall?.setLanguage(lang);
    window.AYLAWall?.setAuthorized(approvedSession);
    const historic=window.AYLAVintageV9.install(B,scene);

    // PEC MAN: compact arcade cabinet beside the east corridor.
    const pecRoot=new B.TransformNode('pec-man-arcade-cabinet',scene);
    pecRoot.position.set(9.45,0,.6);
    const pecBody=material('pec-man-cabinet','#172b29');
    const pecTrim=material('pec-man-trim','#83bd70','#325533');
    bx('pec-man-cabinet-body',.70,1.58,1.05,0,.79,0,pecBody,pecRoot).isPickable=false;
    bx('pec-man-cabinet-plinth',.77,.16,1.12,0,.08,0,M.metal,pecRoot).isPickable=false;
    bx('pec-man-cabinet-marquee',.20,.34,.98,-.39,1.65,0,pecTrim,pecRoot).isPickable=false;
    bx('pec-man-cabinet-display-frame',.09,.70,.82,-.39,1.15,0,M.metal,pecRoot).isPickable=false;
    bx('pec-man-cabinet-console',.18,.12,.76,-.43,.73,0,pecTrim,pecRoot).isPickable=false;
    const pmTex=new B.DynamicTexture('pec-man-arcade-picture',{width:512,height:512},scene,true);
    // The east-facing cabinet UVs were mirrored in the room: compensate on
    // the display texture so PEC MAN reads left-to-right from Ayla's viewpoint.
    pmTex.uScale=-1;pmTex.uOffset=1;
    const pmCtx=pmTex.getContext();
    pmCtx.fillStyle='#071a18';pmCtx.fillRect(0,0,512,512);
    pmCtx.strokeStyle='#73d39e';pmCtx.lineWidth=12;pmCtx.strokeRect(22,22,468,468);
    pmCtx.textAlign='center';pmCtx.font='bold 64px Arial';pmCtx.fillStyle='#c0f18c';pmCtx.fillText('PEC MAN',256,108);pmCtx.font='bold 22px Arial';pmCtx.fillStyle='#e7b76c';pmCtx.fillText('ARCADE / FLIPERAMA',256,142);
    pmCtx.fillStyle='#87b9a8';
    for(let line=0;line<5;line++)pmCtx.fillRect(75,154+line*53,363,7);
    for(let dot=0;dot<9;dot++){pmCtx.fillStyle=dot%3===0?'#f5d783':'#b6ee9e';pmCtx.beginPath();pmCtx.arc(90+dot*41,355,7,0,Math.PI*2);pmCtx.fill();}
    pmCtx.fillStyle='#c2eb6b';pmCtx.beginPath();pmCtx.moveTo(256,276);pmCtx.arc(256,276,42,.48,Math.PI*2-.48);pmCtx.closePath();pmCtx.fill();
    pmTex.update();
    const pmMaterial=new B.StandardMaterial('pec-man-arcade-illustrated-screen',scene);
    pmMaterial.diffuseTexture=pmTex;pmMaterial.emissiveColor=new B.Color3(.5,.67,.42);pmMaterial.disableLighting=true;pmMaterial.backFaceCulling=false;
    const pmPlane=B.MeshBuilder.CreatePlane('pec-man-arcade-display',{width:.77,height:.77},scene);
    pmPlane.parent=pecRoot;pmPlane.position.set(-.47,1.15,0);pmPlane.rotation.y=-Math.PI/2;pmPlane.material=pmMaterial;pmPlane.metadata={interaction:'pecman'};
    // Dedicated arcade controls: joystick, two play buttons, coin/credit slot.
    const pecJoyMaterial=material('pec-man-joystick','#f0b95e','#382514');
    const pecButtonRed=material('pec-man-play-red','#dc5b51','#3b1114');
    const pecButtonBlue=material('pec-man-play-blue','#55cad9','#0d353f');
    const joyStem=B.MeshBuilder.CreateCylinder('pec-man-joystick',{height:.21,diameter:.045,tessellation:10},scene);
    joyStem.parent=pecRoot;joyStem.position.set(-.52,.84,-.22);joyStem.material=M.metal;
    const joyBall=B.MeshBuilder.CreateSphere('pec-man-joystick-ball',{diameter:.13,segments:12},scene);
    joyBall.parent=pecRoot;joyBall.position.set(-.52,.96,-.22);joyBall.material=pecJoyMaterial;
    for(const [z,mat] of [[.12,pecButtonRed],[.32,pecButtonBlue]]){
      const button=B.MeshBuilder.CreateSphere('pec-man-control-button',{diameter:.12,segments:12},scene);
      button.parent=pecRoot;button.position.set(-.53,.83,z);button.scaling.y=.28;button.material=mat;
    }
    bx('pec-man-coin-slot',.035,.14,.22,-.372,.39,.05,M.metal,pecRoot).isPickable=false;
    const pecLight=new B.PointLight('pec-man-marquee-light',new B.Vector3(9.01,1.73,.6),scene);
    pecLight.diffuse=B.Color3.FromHexString('#a0ed7d');pecLight.intensity=.28;pecLight.range=2.1;
        navigation=window.AYLANavigationV8.create([...room.obstacles,...historic.obstacles,{x:9.45,z:.6,w:.82,d:1.19,tag:'pec-man-arcade'}]);
    crowd=window.AYLACrowdV9.create(B,scene,navigation,ayla,winston,()=>playerActive&&!activePanel&&!cinematicPending,()=>lang);
    function othersFor(actor){
      return [ayla,winston,...(crowd?.actors||[]).map(c=>c.actor)].filter(a=>a&&a!==actor)
        .map(a=>({x:a.root.position.x,z:a.root.position.z,r:.37}));
    }
    function collision(x,z){return navigation.blocked(x,z,.34,othersFor(ayla),null);}
    scene.onPointerObservable.add((info)=>{if(info.type!==B.PointerEventTypes.POINTERPICK||!playerActive||activePanel)return;const mesh=info.pickInfo&&info.pickInfo.pickedMesh;const id=mesh?.metadata?.interaction;if(id)interact(id);});
    engine.runRenderLoop(()=>{
      const dt=Math.min(engine.getDeltaTime()/1000,.06);
      const allow=playerActive&&!activePanel&&!cinematicPending&&!visible('finalScreen')&&!seatInProgress&&!ayla?.isSeated?.();
      const hx=(held['d']||held['arrowright']?1:0)-(held['a']||held['arrowleft']?1:0);
      const hz=(held['w']||held['arrowup']?1:0)-(held['s']||held['arrowdown']?1:0);
      const moved=navigation.walk(ayla,camera,hx,hz,allow,!!held['shift'],dt,othersFor(ayla));
      // No automatic chair approach or sit animation.
      const approaching=false;
      if(moved.moving&&ayla?.setInteraction)ayla.setInteraction('idle');
      ayla.animate(dt,moved.moving||approaching,moved.running&&!approaching,performance.now());
      animateWinston(dt,performance.now());
      crowd.update(dt,performance.now());
      if(cinematicMode==='winston' && (cinematicPending||activePanel==='dialogScreen')){
        // Both investigators face each other throughout their conversation.
        for(const [person,other] of [[ayla,winston],[winston,ayla]]){
          const dx=other.root.position.x-person.root.position.x,dz=other.root.position.z-person.root.position.z;
          const desired=Math.atan2(-dx,-dz);
          const diff=Math.atan2(Math.sin(desired-person.root.rotation.y),Math.cos(desired-person.root.rotation.y));
          person.root.rotation.y+=diff*Math.min(1,dt*4.5);
        }
      }
      if(!approvedSession)room.tick(dt);
      // Cinematic focus when engaging a workstation or speaking with Winston.
      const shots={winston:{x:winston.root.position.x+.1,y:1.8,z:winston.root.position.z,radius:5.15,beta:1.21,alpha:-1.45},terminal:{x:4.65,y:1.55,z:-2.73,radius:5.1,beta:1.20,alpha:-1.0},restricted:{x:5.55,y:1.65,z:-2.9,radius:5.0,beta:1.20,alpha:-1.1},map:{x:2.2,y:2.7,z:7.5,radius:6.2,beta:1.12,alpha:-1.9},board:{x:-6,y:2.7,z:7.5,radius:6.25,beta:1.12,alpha:-1.45},report:reportCameraPose||chooseReportCameraPose()};
      const shot=activePanel==='wallScreen'&&approvedSession
        ?{x:-1.55,y:2.95,z:-9.1,radius:6.6,beta:1.43,alpha:1.5708}
        :activePanel==='restrictedScreen'&&approvedSession
        ?{x:.45,y:2.95,z:-9.1,radius:8.5,beta:1.22,alpha:1.27}
        :(cinematicPending||activePanel)&&shots[cinematicMode];
      const target=shot?new B.Vector3(shot.x,shot.y,shot.z):new B.Vector3(ayla.root.position.x,1.46,ayla.root.position.z);
      const k=Math.min(1,dt*(shot?3.0:5.5));
      camera.setTarget(B.Vector3.Lerp(camera.target,target,k));
      if(shot){camera.radius+=(shot.radius-camera.radius)*k;camera.beta+=(shot.beta-camera.beta)*k;let da=((shot.alpha-camera.alpha+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;camera.alpha+=da*k;}
      window.AYLAWall?.update();
      if(!shot&&cinematicMode==='idle'){camera.radius+=((closeCamera?5.3:9.8)-camera.radius)*Math.min(1,dt*2.4);camera.beta+=(1.15-camera.beta)*Math.min(1,dt*1.8);}
      const winstonMarker=interactables.find(p=>p.id==='winston');
      if(winstonMarker){winstonMarker.x=winston.root.position.x;winstonMarker.z=winston.root.position.z;winstonMarker.ring.position.x=winstonMarker.x;winstonMarker.ring.position.z=winstonMarker.z;if(winstonMarker.proxy){winstonMarker.proxy.position.x=winstonMarker.x;winstonMarker.proxy.position.z=winstonMarker.z;}if(winstonBeacon){winstonBeacon.pillar.position.x=winstonMarker.x;winstonBeacon.pillar.position.z=winstonMarker.z;winstonBeacon.bulb.position.x=winstonMarker.x;winstonBeacon.bulb.position.z=winstonMarker.z;winstonBeacon.plane.position.x=winstonMarker.x;winstonBeacon.plane.position.z=winstonMarker.z;}}
      winston.root.position.y=0;interactables.forEach((p,i)=>{p.ring.position.y=.22+Math.sin(performance.now()*.003+i)*.06;const k=1+.07*Math.sin(performance.now()*.003+i);p.ring.scaling.set(k,k,k);});let next=null,best=3.2;interactables.forEach(p=>{if(approvedSession&&p.id!=='restricted'&&p.id!=='wall'&&p.id!=='pecman')return;const d=Math.hypot(ayla.root.position.x-p.x,ayla.root.position.z-p.z);if(d<best){best=d;next=p;}});if(next!==nearby){nearby=next;updateHint();}
      const wallButton=$('aylaWallButton');if(wallButton)wallButton.classList.toggle('hidden',!(approvedSession&&next?.id==='wall'&&!activePanel));
      scene.render();});
    addEventListener('resize',()=>engine.resize());hide('loading');show('startScreen');localize();
  }
  setupScene();
})();