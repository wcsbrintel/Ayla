/* AYLA Mission 3 — original investigative storyline.
   Photographs are generated narrative artwork, not evidence against an actual person.
   Contact identifiers are invented/masked; the case does not establish a real-world suspect. */
(function(){
 'use strict';
 const locales={
 pt:{
  missionTitle:'A Oferta Internacional',missionSubtitle:'Uma vitrine online, um contato recorrente e uma proposta para transportar ovos por aeroporto.',
  mapTitle:'CONEXÕES INTERNACIONAIS · ROTAS NÃO CONFIRMADAS',
  routeWarning:'Publicações e mensagens registram uma proposta; não demonstram que houve viagem, embarque ou transporte de ovos.',
  reportTitle:'DOSSIÊ AY-003 · TRÁFICO ONLINE INTERNACIONAL',
  reportIntro:'Avalie o perfil, as imagens, o contato telefônico e as mensagens do informante. Distinga oferta, aliciamento e movimentação efetivamente comprovada.',
  terminalFoot:'Preserve URLs, datas, capturas originais e contexto de obtenção antes de estabelecer vínculos entre perfis e contatos.',
  boardTitle:'REDE DE CONTATOS E EVIDÊNCIAS',boardFoot:'Uma oferta e uma tentativa de aliciamento são relevantes; não equivalem a prova de embarque ou de rede internacional completa.',
  objectiveWinston:'Receba de Winston o novo alerta sobre o perfil online.',
  objectiveTerminal:'Analise quatro fontes: fotos, anúncio, telefone e mensagens.',
  objectiveMap:'Compare localizações declaradas e destinos ainda não comprovados.',
  objectiveBoard:'Relacione o contato às mensagens e identifique lacunas.',
  objectiveReport:'Produza uma avaliação sobre oferta, aliciamento e risco internacional.',
  mentorLines:[
   'Ayla, uma conta nas redes sociais publicou fotografias de animais oferecidos a compradores de outros países. O perfil indica um número de contato. Precisamos preservar cada publicação e separar indícios de conclusões.',
   'Um informante da agência recebeu mensagens de um contato com a mesma terminação telefônica. O interlocutor tentou convencê-lo a transportar ovos por um aeroporto. Sua tarefa é verificar o vínculo, proteger a fonte e avaliar o que realmente foi proposto — sem presumir que o transporte aconteceu.'
  ],
  legendConfirmed:'EVIDÊNCIA DISPONÍVEL',
  legendConfirmedText:'Há duas publicações preservadas e mensagens fornecidas pelo informante, com referência a um aeroporto internacional.',
  legendSuspected:'SEM CONFIRMAÇÃO INDEPENDENTE',
  legendSuspectedText:'Não há registro de viagem, embarque, passagem de fronteira, entrega de ovos ou identificação civil validada do operador.',
  evidenceConfirmed:'Oferta de animais em rede social',
  evidenceObserved:'Duas postagens exibem aves oferecidas em uma conta. Os arquivos de origem e o histórico de publicação exigem preservação.',
  evidenceOpen:'Contato e mensagens ao informante',
  evidenceLead:'O anúncio e as mensagens apresentam o mesmo identificador de contato mascarado, terminado em 6142; a titularidade requer confirmação.',
  evidenceRoute:'Possível conexão internacional',
  evidenceRouteText:'As mensagens mencionam um comprador no exterior e um aeroporto; não há evidência de deslocamento ou embarque.',
  evidenceGap:'Proteção da fonte e diligências',
  evidenceGapText:'Preservar mensagens originais, metadados e cadeia de custódia; evitar expor o informante; submeter a vinculação a verificação autorizada.',
  question1:'1. O que as fotografias publicadas permitem afirmar?',
  answers1:['Os animais já cruzaram uma fronteira.','A conta publicou imagens de animais em contexto de oferta; origem e posse ainda exigem verificação.','As imagens comprovam o proprietário legal de todos os animais.'],
  question2:'2. O que é sustentado pelas mensagens com o informante?',
  answers2:['A troca registrada contém tentativa de aliciamento para levar ovos por aeroporto, mas não comprova o transporte.','O informante realizou a viagem e entregou os ovos.','O número telefônico, isoladamente, comprova a identidade civil do autor.'],
  question3:'3. Qual encaminhamento é mais adequado?',
  answers3:['Publicar o nome do informante e acusar todos os contatos.','Organizar a operação usando as instruções de ocultação descritas pelo interlocutor.','Preservar originais e metadados, proteger o informante e encaminhar os indícios para verificação e cooperação legal.'],
  locked:'Para concluir, fale com Winston, analise as quatro fontes, avalie as conexões geográficas e examine o quadro de evidências.',
  successToast:'Dossiê concluído: vínculos e limites probatórios registrados.',
  finalHeading:'O contato é uma pista. A prova exige verificação.',
  finalBody:'Ayla documentou a oferta de animais, registrou a tentativa de aliciamento para transporte de ovos e identificou o contato recorrente. O dossiê preserva as lacunas sobre identidade, origem, rotas e execução da viagem, com proteção ao informante.',
  sources:[
   {id:'OS-301',cat:'[O] REGISTRO DE REDE SOCIAL',title:'Publicação com araras oferecidas',date:'18 NOV · PERFIL OBSERVADO',body:'Uma publicação apresenta duas araras ao lado do administrador aparente da conta. O texto associado oferece contato privado para compradores e menciona interesse de clientes de outros países. A publicação foi preservada, mas a origem e a posse dos animais não foram verificadas.',note:'OBSERVADO: a conta publicou uma oferta acompanhada de imagens. A fotografia não comprova comércio concluído, captura, destino ou titularidade.'},
   {id:'OS-302',cat:'[O] SEGUNDA PUBLICAÇÃO',title:'Ave em caixa e contato de negociação',date:'19 NOV · PERFIL OBSERVADO',body:'Outra publicação da mesma conta mostra uma ave em uma caixa de transporte, acompanhada do contato terminado em 6142. O mesmo identificador aparece nos registros de mensagens apresentados pelo informante.',note:'VÍNCULO: coincidência de identificador nos materiais preservados. É necessário autenticar o perfil e verificar a atribuição do contato.'},
   {id:'IN-303',cat:'[N] COMUNICAÇÃO COM INFORMANTE',title:'Convite para transportar ovos',date:'20 NOV · MENSAGENS PRESERVADAS',body:'O informante encaminhou uma sequência de mensagens na qual um contato terminado em 6142 pergunta sobre disponibilidade para uma viagem internacional por aeroporto e solicita participação no transporte de ovos. O informante não aceita a proposta; não há prova de embarque.',note:'PISTA: a tentativa de aliciamento está registrada nas mensagens. O material não comprova que os ovos foram obtidos nem transportados.'},
   {id:'AN-304',cat:'[T] ANÁLISE DE VINCULAÇÃO',title:'Perfil, telefone e limites das rotas',date:'NOTA DE ANÁLISE · AY-003',body:'As duas publicações pertencem ao mesmo perfil e apontam para o contato terminado em 6142. Uma exportação de mensagens fornecida pelo informante registra esse identificador e proposta de transporte de ovos. A identidade do interlocutor, o controle da conta e a materialização da rota ainda precisam de confirmação independente.',note:'PRÓXIMAS ETAPAS: preservar fontes e versões originais, validar a atribuição do contato e encaminhar o caso de forma autorizada, com proteção à fonte.'}
  ]
 },
 en:{
  missionTitle:'The International Offer',missionSubtitle:'An online storefront, a recurring contact, and an invitation to carry eggs through an airport.',
  mapTitle:'INTERNATIONAL LINKS · UNVERIFIED ROUTES',
  routeWarning:'The posts and messages document a proposal, not evidence of travel, airport boarding or egg transportation.',
  reportTitle:'DOSSIER AY-003 · INTERNATIONAL ONLINE TRAFFICKING',
  reportIntro:'Review the account, photographs, phone contact and informant communications. Separate an offer and recruitment from completed movement.',
  terminalFoot:'Preserve original URLs, dates, screenshots and acquisition context before linking accounts to people.',
  boardTitle:'CONTACT NETWORK AND EVIDENCE',boardFoot:'An offer and attempted recruitment matter, but neither proves international shipment or an entire trafficking network.',
  objectiveWinston:'Get Winston’s briefing on the online account.',
  objectiveTerminal:'Review four sources: photos, listing, phone and messages.',
  objectiveMap:'Distinguish claimed locations from verified movements.',
  objectiveBoard:'Link the contact to messages and identify gaps.',
  objectiveReport:'Assess the offer, recruitment attempt and international risk.',
  mentorLines:[
   'Ayla, a social account posted images of wildlife offered to buyers abroad. A phone contact appears on the profile. Preserve each post and distinguish leads from conclusions.',
   'An agency informant received messages from a contact ending in the same digits. The sender tried to recruit the source to carry eggs through an airport. Verify the link, protect the source, and assess what was proposed without assuming a shipment occurred.'
  ],
  legendConfirmed:'AVAILABLE EVIDENCE',
  legendConfirmedText:'Two preserved social posts and informant-provided messages refer to an international airport.',
  legendSuspected:'NOT INDEPENDENTLY CONFIRMED',
  legendSuspectedText:'No travel, boarding, border crossing, egg delivery or verified civil identity has been established.',
  evidenceConfirmed:'Wildlife offered on a social account',
  evidenceObserved:'Two posts display parrots in an offer context; source files and posting history need preservation.',
  evidenceOpen:'Phone contact and informant messages',
  evidenceLead:'The listing and messages share a masked contact identifier ending 6142; verified ownership is still missing.',
  evidenceRoute:'Possible international connection',
  evidenceRouteText:'Messages mention an overseas buyer and an airport. There is no evidence of actual travel or boarding.',
  evidenceGap:'Source protection and follow-up',
  evidenceGapText:'Preserve original communications, metadata and chain of custody; protect the informant and verify attribution through lawful channels.',
  question1:'1. What do the social photographs substantiate?',
  answers1:['The birds already crossed an international border.','The account published wildlife in an offer context; possession and origin remain unverified.','The images prove legal ownership of every animal.'],
  question2:'2. What is supported by the informant messages?',
  answers2:['The exchange includes an attempt to recruit someone to carry eggs via an airport, not proof of shipment.','The informant took the flight and delivered the eggs.','The telephone number alone proves the sender’s civil identity.'],
  question3:'3. What is the appropriate investigative response?',
  answers3:['Publish the informant’s identity and accuse every contact.','Plan the movement using concealment details supplied by the sender.','Preserve originals and metadata, protect the informant and refer leads for lawful verification and cooperation.'],
  locked:'Speak to Winston, review the four records, assess geographic links and examine the evidence board before filing.',
  successToast:'Dossier completed: links and evidentiary limits recorded.',
  finalHeading:'A contact is a lead. Evidence still requires verification.',
  finalBody:'Ayla documented the online wildlife offers, the attempted recruitment to carry eggs, and the repeated contact identifier. The dossier preserves gaps concerning identity, origin, route and whether travel occurred, while protecting the informant.',
  sources:[
   {id:'OS-301',cat:'[O] SOCIAL POST',title:'Macaws offered online',date:'18 NOV · PROFILE OBSERVED',body:'A post shows two macaws next to the apparent account operator. Its accompanying text invites private contact from buyers and refers to overseas interest. The post was preserved, but possession and origin of the birds remain unverified.',note:'OBSERVED: an offer was published with images. The photo does not prove a completed transaction, capture, destination or legal title.'},
   {id:'OS-302',cat:'[O] SECOND POST',title:'Parrot in a carrier and sales contact',date:'19 NOV · PROFILE OBSERVED',body:'Another post from the same account shows a parrot inside a carrier and a contact identifier ending 6142. The same ending occurs in communications provided by the informant.',note:'LINK: a shared identifier across preserved records, not independent proof of the account operator’s identity.'},
   {id:'IN-303',cat:'[N] INFORMANT COMMUNICATION',title:'Invitation to carry eggs',date:'20 NOV · MESSAGES PRESERVED',body:'The informant supplied a message sequence in which a contact ending 6142 asks about an international airport trip and attempts to recruit the recipient to carry eggs. The informant does not accept; no boarding is documented.',note:'LEAD: attempted recruitment is documented in the messages. They do not establish eggs were acquired or transported.'},
   {id:'AN-304',cat:'[T] LINK ANALYSIS',title:'Profile, telephone and route limitations',date:'ANALYTICAL NOTE · AY-003',body:'The two posts are linked to the same account and contact ending 6142. An informant-provided message export shows the same identifier and an egg-transport proposal. Control of the account, the sender’s identity and any actual journey require independent verification.',note:'FOLLOW-UP: preserve sources and original versions, verify contact attribution and submit leads lawfully while protecting the source.'}
  ]
 },
 es:{
  missionTitle:'La Oferta Internacional',missionSubtitle:'Ofertas en línea, un contacto recurrente y una propuesta para llevar huevos por un aeropuerto.',
  mapTitle:'CONEXIONES INTERNACIONALES · RUTAS SIN VERIFICAR',
  routeWarning:'Las publicaciones y mensajes documentan una propuesta, no un viaje, embarque o transporte de huevos confirmado.',
  reportTitle:'EXPEDIENTE AY-003 · TRÁFICO INTERNACIONAL EN LÍNEA',
  reportIntro:'Examina la cuenta, las fotos, el teléfono y los mensajes del informante. Separa la oferta y la captación de cualquier traslado demostrado.',
  terminalFoot:'Conserva URL, fechas, capturas originales y contexto antes de vincular perfiles y personas.',
  boardTitle:'RED DE CONTACTOS Y PRUEBAS',boardFoot:'Una oferta y un intento de captación son relevantes; no prueban un envío ni una red completa.',
  objectiveWinston:'Escucha el aviso de Winston sobre la cuenta.',
  objectiveTerminal:'Analiza cuatro fuentes: fotos, oferta, teléfono y mensajes.',
  objectiveMap:'Separa lugares mencionados de desplazamientos demostrados.',
  objectiveBoard:'Relaciona el contacto y los mensajes; identifica vacíos.',
  objectiveReport:'Evalúa la oferta, la captación y el riesgo internacional.',
  mentorLines:[
   'Ayla, una cuenta publicó fotos de fauna ofrecida a compradores de otros países. En el perfil aparece un contacto telefónico. Conserva cada publicación y separa pistas de conclusiones.',
   'Un informante de la agencia recibió mensajes de un número con la misma terminación. El remitente intentó reclutarlo para transportar huevos por un aeropuerto. Verifica la relación, protege la fuente y no supongas que el viaje ocurrió.'
  ],
  legendConfirmed:'PRUEBAS DISPONIBLES',
  legendConfirmedText:'Se conservaron dos publicaciones y mensajes aportados por el informante que mencionan un aeropuerto internacional.',
  legendSuspected:'SIN CONFIRMACIÓN INDEPENDIENTE',
  legendSuspectedText:'No hay viaje, embarque, cruce de frontera, entrega de huevos ni identidad civil verificados.',
  evidenceConfirmed:'Oferta de animales en red social',
  evidenceObserved:'Dos publicaciones muestran loros en un contexto de oferta; deben conservarse archivos e historial originales.',
  evidenceOpen:'Contacto y mensajes al informante',
  evidenceLead:'La oferta y los mensajes comparten un identificador de contacto enmascarado terminado en 6142; no consta su titular.',
  evidenceRoute:'Posible conexión internacional',
  evidenceRouteText:'Los mensajes mencionan un comprador extranjero y un aeropuerto; no prueban viaje ni embarque.',
  evidenceGap:'Protección de la fuente y diligencias',
  evidenceGapText:'Conservar mensajes, metadatos y cadena de custodia; proteger al informante y verificar legalmente la atribución.',
  question1:'1. ¿Qué demuestran las fotografías publicadas?',
  answers1:['Las aves ya cruzaron una frontera.','La cuenta publicó imágenes de animales en contexto de oferta; origen y posesión necesitan verificación.','Las imágenes demuestran la titularidad legal de todos los animales.'],
  question2:'2. ¿Qué respaldan los mensajes del informante?',
  answers2:['Existe un intento documentado de reclutamiento para llevar huevos por aeropuerto, pero no prueba del transporte.','El informante viajó y entregó los huevos.','El número telefónico prueba por sí solo la identidad civil.'],
  question3:'3. ¿Qué actuación es adecuada?',
  answers3:['Publicar la identidad del informante y acusar a todos los contactos.','Organizar el viaje utilizando detalles de ocultación del remitente.','Conservar originales y metadatos, proteger al informante y remitir los indicios para verificación legal y cooperación.'],
  locked:'Habla con Winston, revisa cuatro registros, evalúa los vínculos geográficos y examina el tablero antes de presentar el informe.',
  successToast:'Expediente completado: vínculos y límites de las pruebas registrados.',
  finalHeading:'Un contacto es una pista. Las pruebas requieren verificación.',
  finalBody:'Ayla documentó las ofertas de animales, el intento de captación para transportar huevos y el contacto repetido. El expediente conserva vacíos sobre identidad, origen, ruta y viaje efectivo, protegiendo al informante.',
  sources:[
   {id:'OS-301',cat:'[O] PUBLICACIÓN SOCIAL',title:'Guacamayos ofrecidos en línea',date:'18 NOV · PERFIL OBSERVADO',body:'Una publicación muestra dos guacamayos junto al aparente operador de la cuenta. El texto invita a compradores a establecer contacto privado y menciona interés en el extranjero. Se conservó la publicación; el origen y la posesión de las aves no están verificados.',note:'OBSERVADO: se publicó una oferta con imágenes. La foto no demuestra venta, captura, destino ni titularidad.'},
   {id:'OS-302',cat:'[O] SEGUNDA PUBLICACIÓN',title:'Ave en transportín y contacto de venta',date:'19 NOV · PERFIL OBSERVADO',body:'Otra publicación de la cuenta muestra un loro dentro de un transportín junto al contacto terminado en 6142. La misma terminación aparece en los mensajes aportados por el informante.',note:'VÍNCULO: identificador coincidente en registros conservados. No demuestra por sí solo identidad civil.'},
   {id:'IN-303',cat:'[N] COMUNICACIÓN CON INFORMANTE',title:'Propuesta para transportar huevos',date:'20 NOV · MENSAJES CONSERVADOS',body:'El informante aportó mensajes en los que un contacto terminado en 6142 pregunta por un viaje internacional por aeropuerto e intenta reclutarlo para llevar huevos. El informante no acepta; no consta embarque.',note:'PISTA: los mensajes documentan el intento de captación, no que los huevos se obtuvieran o transportaran.'},
   {id:'AN-304',cat:'[T] ANÁLISIS DE RELACIÓN',title:'Perfil, teléfono y límites de la ruta',date:'NOTA ANALÍTICA · AY-003',body:'Dos publicaciones de la misma cuenta contienen el contacto terminado en 6142. Los mensajes aportados por el informante incluyen ese mismo identificador y una propuesta sobre huevos. La identidad, el control del perfil y cualquier viaje necesitan comprobación independiente.',note:'DILIGENCIAS: preservar originales, verificar el contacto y derivar los indicios legalmente sin exponer la fuente.'}
  ]
 }
 };
 const alt={pt:['Captura de postagem: homem ao lado de duas araras','Captura de postagem: homem com papagaio em caixa de transporte'],en:['Captured post: a man with two macaws','Captured post: a man with a parrot in a carrier'],es:['Publicación: hombre junto a dos guacamayos','Publicación: hombre con loro en un transportín']};
 const messages={
 pt:[['INFORMANTE · 20 NOV, 14:08','Qual é a proposta?'],['CONTATO ·••••6142 · 14:11','Preciso de alguém disposto a levar ovos numa viagem internacional por aeroporto. Você teria interesse?'],['INFORMANTE · 14:13','Não confirmei nada. Preciso entender de onde vêm os animais.'],['CONTATO ·••••6142 · 14:16','Falamos depois. Tenho um contato do outro lado.']],
 en:[['INFORMANT · 20 NOV, 14:08','What is your proposal?'],['CONTACT ·••••6142 · 14:11','I need someone willing to carry eggs on an international airport trip. Would you be interested?'],['INFORMANT · 14:13','I have not agreed. Where are the animals coming from?'],['CONTACT ·••••6142 · 14:16','We can talk later. I have a contact overseas.']],
 es:[['INFORMANTE · 20 NOV, 14:08','¿Cuál es la propuesta?'],['CONTACTO ·••••6142 · 14:11','Necesito a alguien dispuesto a llevar huevos en un viaje internacional por aeropuerto. ¿Te interesa?'],['INFORMANTE · 14:13','No he aceptado. ¿De dónde vienen los animales?'],['CONTACTO ·••••6142 · 14:16','Hablamos después. Tengo un contacto al otro lado.']]
 };
 function renderEvidence(i,lang){
  const L=locales[lang]?lang:'en';
  if(i===0||i===1){
   const img=i+1;
   return '<figure class="ayla-social-evidence"><div class="ayla-post-header"><span class="ayla-post-avatar">◎</span><span><strong>@forest_trade_47</strong><small>PUBLIC POST · OSINT / AY-003</small></span><span class="ayla-post-menu">•••</span></div><img loading="eager" src="assets/mission3-social-'+img+'.webp" alt="'+alt[L][i]+'"><figcaption><strong>POST / '+(i===0?'OS-301':'OS-302')+'</strong> · '+(i===0?'18 NOV':'19 NOV')+'<br><span>'+({pt:'Captura arquivada para exame. Informações sobre posse, origem e identidade ainda precisam de confirmação.',en:'Archived image for review. Ownership, origin and identity require independent verification.',es:'Imagen conservada para examen. Posesión, origen e identidad requieren verificación.'}[L])+'</span></figcaption></figure>';
  }
  if(i===2){
   return '<section class="ayla-message-evidence"><div class="ayla-message-heading">COMMUNICATION EXTRACT · REF IN-303 · ••••6142</div>'+messages[L].map(([from,txt],k)=>'<div class="ayla-msg '+(k%2===0?'from-source':'from-contact')+'"><small>'+from+'</small><p>'+txt+'</p></div>').join('')+'<footer>'+({pt:'Os dados identificadores do informante foram omitidos para proteção da fonte.',en:'Identifying details of the informant are omitted to protect the source.',es:'Se omiten los datos de identificación del informante para proteger la fuente.'}[L])+'</footer></section>';
  }
  return '<div class="ayla-link-brief"><strong>OS-301 / OS-302 → CONTACT ••••6142 → IN-303</strong><p>'+({pt:'Coincidência de contato nos registros. Atribuição pessoal e realização da rota permanecem não verificadas.',en:'A contact identifier matches across records. Personal attribution and actual travel remain unverified.',es:'Un identificador coincide en varios registros. No se comprobaron atribución personal ni viaje.'}[L])+'</p></div>';
 }
 window.AYLAMissionThree={locales,renderEvidence,answer:[1,0,2]};
})();