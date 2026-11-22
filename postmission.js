/* AYLA — Interception update and Winston's promotion (post AY-004).
   Original game storyline. No official interception records were independently supplied
   or verified; the authorities' identification method is deliberately left unknown. */
(function(){
 'use strict';
 const copy={
  pt:{
   levelUpTitle:'SUBIR DE NÍVEL',levelUpDescription:'Conclua as quatro missões para desbloquear o novo desdobramento do caso AY-003. Depois, converse com Winston para alcançar o Nível 2.',levelUpProgress:'MISSÕES CONCLUÍDAS',levelUpLocked:'EM PROGRESSO',levelUpReady:'PROMOÇÃO DISPONÍVEL',levelUpTalk:'CONVERSAR COM WINSTON',levelUpSee:'VER NOVO DESDOBRAMENTO',levelUpDone:'NÍVEL 2 CONQUISTADO',levelUpReview:'REVER DESDOBRAMENTO',levelUpPending:'AVALIAÇÃO PENDENTE',
   eventTag:'DESDOBRAMENTO · AY-003',
   eventTitle:'Interceptação em Guarulhos: 38 ovos de psitacídeos',
   eventLead:'A Receita Federal interceptou, no Aeroporto Internacional de Guarulhos (SP), um homem identificado como Ovir Mukalbahr ao tentar embarcar com 38 ovos de psitacídeos. Ele havia chegado de Foz do Iguaçu (PR).',
   followup:'Ovir Mukalbahr foi associado ao número telefônico com final 6142, identificado nas publicações e mensagens analisadas na Missão 3.',
   cautionTitle:'LIMITE DA INFORMAÇÃO RECEBIDA',
   caution:'As autoridades não divulgaram como chegaram à identificação do homem. Não se pode concluir que o relatório OSINT de Ayla foi a causa da interceptação.',
   routeFrom:'FOZ DO IGUAÇU · PR',routeFromLabel:'procedência informada',routeTo:'GUARULHOS · SP',routeToLabel:'interceptação pela Receita Federal',
   evidenceCount:'38 OVOS',evidenceName:'PSITACÍDEOS',contact:'CONTATO ••••6142',link:'VÍNCULO COM AY-003',
   continue:'FALAR COM WINSTON NA CENTRAL',return:'VOLTAR ÀS MISSÕES',
   archiveTitle:'Novo desdobramento · AY-003',archiveDescription:'Interceptação em Guarulhos, vínculo com o contato 6142 e conversa de avaliação com Winston.',
   archiveFresh:'NOVA INFORMAÇÃO',archiveOpen:'VER DESDOBRAMENTO',archivePending:'AGUARDANDO WINSTON',archiveCompleted:'RECONHECIMENTO CONCLUÍDO',archiveReview:'REVER DESDOBRAMENTO',
   finalButton:'NOVA INFORMAÇÃO · AY-003',objective:'Procure Winston para discutir o desdobramento AY-003 e receber sua avaliação.',
   rankOne:'NÍVEL 1 · INVESTIGADORA',rankTwo:'NÍVEL 2 · ANALISTA DE INTELIGÊNCIA',
   promotionTag:'PROMOÇÃO CONQUISTADA',promotionTitle:'AYLA · NÍVEL 2',promotionRole:'ANALISTA DE INTELIGÊNCIA',
   promotionBody:'Winston reconheceu sua capacidade de cruzar fontes, distinguir hipóteses de fatos e preservar os limites das evidências. Um novo nível foi registrado em seu perfil.',
   promotionArchive:'VOLTAR ÀS MISSÕES',promotionRoom:'CONTINUAR NA CENTRAL',
   dialogue:[
    'Parabéns, Ayla! Recebemos a notícia de Guarulhos: a Receita Federal interceptou Ovir Mukalbahr tentando embarcar com 38 ovos de psitacídeos, depois de chegar de Foz do Iguaçu. O número final 6142 aparece no material que você analisou no caso AY-003.',
    'Há uma ressalva importante: as autoridades não disseram como chegaram à identificação dele. Não podemos afirmar que nosso relatório OSINT provocou a interceptação. O mérito da sua análise está em documentar bem os vínculos e deixar claro o que ainda não sabemos.',
    'Sua investigação demonstrou rigor e maturidade. Por isso, você sobe de nível: a partir de agora, é Analista de Inteligência — Nível 2. Parabéns, Ayla!'
   ]
  },
  en:{
   levelUpTitle:'LEVEL UP',levelUpDescription:'Complete all four missions to unlock a new development in case AY-003. Then speak with Winston to reach Level 2.',levelUpProgress:'MISSIONS COMPLETED',levelUpLocked:'IN PROGRESS',levelUpReady:'PROMOTION AVAILABLE',levelUpTalk:'SPEAK WITH WINSTON',levelUpSee:'VIEW NEW DEVELOPMENT',levelUpDone:'LEVEL 2 ACHIEVED',levelUpReview:'REVIEW DEVELOPMENT',levelUpPending:'DEBRIEF PENDING',
   eventTag:'CASE DEVELOPMENT · AY-003',
   eventTitle:'Guarulhos interception: 38 parrot eggs',
   eventLead:'Brazilian Federal Revenue (Customs) intercepted a man identified as Ovir Mukalbahr at Guarulhos International Airport, São Paulo, as he attempted to board with 38 parrot eggs. He had arrived from Foz do Iguaçu, Paraná.',
   followup:'Ovir Mukalbahr was linked to the telephone number ending in 6142, previously documented in the social posts and messages examined in Mission 3.',
   cautionTitle:'LIMITS OF THE UPDATE',
   caution:'The authorities did not disclose how they identified the man. This information does not establish that Ayla’s OSINT report caused the interception.',
   routeFrom:'FOZ DO IGUAÇU · PR',routeFromLabel:'reported place of origin',routeTo:'GUARULHOS · SP',routeToLabel:'Federal Revenue interception',
   evidenceCount:'38 EGGS',evidenceName:'PARROTS',contact:'CONTACT ••••6142',link:'LINK TO AY-003',
   continue:'FIND WINSTON IN THE OPERATIONS CENTER',return:'BACK TO MISSIONS',
   archiveTitle:'New case development · AY-003',archiveDescription:'Guarulhos interception, contact 6142 and a debrief with Winston.',
   archiveFresh:'NEW INFORMATION',archiveOpen:'VIEW UPDATE',archivePending:'WINSTON DEBRIEF PENDING',archiveCompleted:'PROMOTION COMPLETED',archiveReview:'REVIEW UPDATE',
   finalButton:'NEW INFORMATION · AY-003',objective:'Find Winston to discuss the AY-003 development and receive your assessment.',
   rankOne:'LEVEL 1 · INVESTIGATOR',rankTwo:'LEVEL 2 · INTELLIGENCE ANALYST',
   promotionTag:'PROMOTION EARNED',promotionTitle:'AYLA · LEVEL 2',promotionRole:'INTELLIGENCE ANALYST',
   promotionBody:'Winston has recognized your ability to compare sources, separate leads from facts and preserve evidentiary limits. Your new level is now saved.',
   promotionArchive:'BACK TO MISSIONS',promotionRoom:'RETURN TO OPERATIONS CENTER',
   dialogue:[
    'Congratulations, Ayla. We have received news from Guarulhos: Brazilian Customs intercepted Ovir Mukalbahr attempting to board with 38 parrot eggs after arriving from Foz do Iguaçu. The number ending 6142 matches a contact examined in case AY-003.',
    'One important caveat: the authorities did not reveal how they identified him. We cannot claim our OSINT dossier caused the interception. What matters is that you documented links carefully and made clear what still required verification.',
    'You showed sound judgment and discipline. You are now promoted to Level 2 — Intelligence Analyst. Well done, Ayla.'
   ]
  },
  es:{
   levelUpTitle:'SUBIR DE NIVEL',levelUpDescription:'Completa las cuatro misiones para desbloquear una novedad del caso AY-003. Después, habla con Winston para llegar al Nivel 2.',levelUpProgress:'MISIONES COMPLETADAS',levelUpLocked:'EN PROGRESO',levelUpReady:'ASCENSO DISPONIBLE',levelUpTalk:'HABLAR CON WINSTON',levelUpSee:'VER NOVEDAD',levelUpDone:'NIVEL 2 CONSEGUIDO',levelUpReview:'REVISAR NOVEDAD',levelUpPending:'EVALUACIÓN PENDIENTE',
   eventTag:'NOVEDAD DEL CASO · AY-003',
   eventTitle:'Intercepción en Guarulhos: 38 huevos de psitácidos',
   eventLead:'La Receita Federal de Brasil (Aduanas) interceptó en el Aeropuerto Internacional de Guarulhos, São Paulo, a un hombre identificado como Ovir Mukalbahr cuando intentaba embarcar con 38 huevos de psitácidos. Había llegado desde Foz do Iguaçu, Paraná.',
   followup:'Ovir Mukalbahr fue vinculado al número de teléfono terminado en 6142, examinado previamente en las publicaciones y mensajes de la Misión 3.',
   cautionTitle:'LÍMITES DE LA NUEVA INFORMACIÓN',
   caution:'Las autoridades no explicaron cómo identificaron al hombre. No puede afirmarse que el informe OSINT de Ayla haya causado la intercepción.',
   routeFrom:'FOZ DO IGUAÇU · PR',routeFromLabel:'procedencia comunicada',routeTo:'GUARULHOS · SP',routeToLabel:'intercepción de Aduanas',
   evidenceCount:'38 HUEVOS',evidenceName:'PSITÁCIDOS',contact:'CONTACTO ••••6142',link:'VÍNCULO CON AY-003',
   continue:'HABLAR CON WINSTON EN LA CENTRAL',return:'VOLVER A MISIONES',
   archiveTitle:'Novedad del caso · AY-003',archiveDescription:'Intercepción en Guarulhos, contacto 6142 y evaluación con Winston.',
   archiveFresh:'NUEVA INFORMACIÓN',archiveOpen:'VER NOVEDAD',archivePending:'PENDIENTE HABLAR CON WINSTON',archiveCompleted:'ASCENSO COMPLETADO',archiveReview:'REVISAR NOVEDAD',
   finalButton:'NUEVA INFORMACIÓN · AY-003',objective:'Busca a Winston para comentar la novedad del AY-003 y recibir su evaluación.',
   rankOne:'NIVEL 1 · INVESTIGADORA',rankTwo:'NIVEL 2 · ANALISTA DE INTELIGENCIA',
   promotionTag:'ASCENSO CONSEGUIDO',promotionTitle:'AYLA · NIVEL 2',promotionRole:'ANALISTA DE INTELIGENCIA',
   promotionBody:'Winston reconoce tu habilidad para comparar fuentes, distinguir indicios de hechos y preservar los límites de las pruebas. El nuevo nivel quedó guardado.',
   promotionArchive:'VOLVER A MISIONES',promotionRoom:'CONTINUAR EN LA CENTRAL',
   dialogue:[
    '¡Felicidades, Ayla! Llegaron noticias de Guarulhos: Aduanas interceptó a Ovir Mukalbahr cuando intentaba embarcar con 38 huevos de psitácidos tras llegar de Foz do Iguaçu. El teléfono terminado en 6142 coincide con el contacto examinado en el caso AY-003.',
    'Una advertencia importante: las autoridades no explicaron cómo identificaron al hombre. No podemos afirmar que nuestro informe OSINT causó la intercepción. Tu mérito fue documentar los vínculos y distinguir claramente lo que aún no estaba comprobado.',
    'Has demostrado criterio y disciplina. Ahora asciendes al Nivel 2 — Analista de Inteligencia. ¡Enhorabuena, Ayla!'
   ]
  }
 };
 window.AYLAPostMission={copy,forLang(lang){return copy[lang]||copy.en}};
})();
