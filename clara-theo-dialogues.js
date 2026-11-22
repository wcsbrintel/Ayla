/* AYLA · Clara & Theo ambient conversations, version 2.0
   All conversations are original fiction; resource descriptions are factual,
   and links point to public information, not to individual case evidence. */
(function(){
'use strict';
const packs=[
{
 id:'observatory',long:true,source:'IWT Global Observatory · WCS Brasil',
 href:'https://wcsbrintel.github.io/iwt_globalobservatory/',
 pt:[
 ['Clara','Estou no IWT Global Observatory da WCS Brasil. Gosto de enxergar as apreensões no mapa, não só numa planilha.'],
 ['Theo','E das rotas documentadas. Às vezes um trajeto explica melhor o caso que dez manchetes.'],
 ['Clara','Desde que a gente não transforme uma origem provável em rota confirmada.'],
 ['Theo','Claro. A ficha distingue o fato observado do contexto e das hipóteses.'],
 ['Clara','Também gosto de filtrar por país, período, grupo de fauna e modal.'],
 ['Theo','Eu sempre começo pelos relatórios semanais. Ajudam a perceber onde vale aprofundar.'],
 ['Clara','E conferiu a publicação original? O Observatório não substitui a fonte primária.'],
 ['Theo','Conferi. Uma notícia dizia “destino internacional”, mas não identificava país nenhum.'],
 ['Clara','Então sem seta no mapa. Primeiro a evidência, depois a interpretação.'],
 ['Theo','Um dia você vai mandar imprimir isso e colocar em todas as mesas da Central.']
 ],
 en:[
 ['Clara','I am checking WCS Brasil’s IWT Global Observatory. Seeing seizures on a map helps more than another spreadsheet.'],
 ['Theo','Especially documented routes. Sometimes a route explains a case better than ten headlines.'],
 ['Clara','As long as we do not turn a presumed origin into a confirmed route.'],
 ['Theo','Of course. The records separate observed facts from context and investigative leads.'],
 ['Clara','I like filtering by country, period, animal group and transport mode too.'],
 ['Theo','I start with the weekly reports. They help me decide which patterns deserve a closer look.'],
 ['Clara','And did you check the original publication? The Observatory cannot replace primary sources.'],
 ['Theo','I did. One article said “international destination” without naming any country.'],
 ['Clara','Then no arrow on the map. Evidence first; interpretation second.'],
 ['Theo','One day you will print that and put it above every desk here.']
 ],
 es:[
 ['Clara','Estoy mirando el IWT Global Observatory de WCS Brasil. Ver las incautaciones en un mapa ayuda más que otra hoja de cálculo.'],
 ['Theo','Y sus rutas documentadas. A veces una ruta explica mejor un caso que diez titulares.'],
 ['Clara','Siempre que no confundamos un origen probable con una ruta confirmada.'],
 ['Theo','Por supuesto. Los registros separan hechos observados, contexto e indicios.'],
 ['Clara','También me gusta filtrar por país, período, grupo de fauna y medio de transporte.'],
 ['Theo','Yo empiezo por los informes semanales. Me ayudan a ver qué patrones merecen atención.'],
 ['Clara','¿Y verificaste la publicación original? El Observatorio no reemplaza la fuente primaria.'],
 ['Theo','Sí. Una noticia decía “destino internacional”, pero no mencionaba ningún país.'],
 ['Clara','Entonces no dibujes una flecha en el mapa. Primero las pruebas, luego la interpretación.'],
 ['Theo','Algún día imprimirás esa frase y la pondrás en todas las mesas.']
 ]
},
{
 id:'cites',long:false,source:'CITES · Species+',
 href:'https://www.speciesplus.net/',
 pt:[
 ['Theo','Clara, você consultou os apêndices CITES daquela espécie?'],
 ['Clara','Consultei o Species+. Mas não vou confundir listagem em apêndice com prova de ilegalidade.'],
 ['Theo','Nem toda movimentação internacional de espécie listada é automaticamente tráfico.'],
 ['Clara','Exatamente. Precisamos conferir documentos, origem, datas, legislação aplicável e finalidade.'],
 ['Theo','E a identificação taxonômica? Tenho duas grafias diferentes no relatório.'],
 ['Clara','Verifique a nomenclatura aceita antes de cruzar bases. Um nome errado muda toda a busca.'],
 ['Theo','Pronto. Corrigi o táxon e mantive a grafia original no registro da fonte.']
 ],
 en:[
 ['Theo','Clara, did you check the CITES Appendices for that species?'],
 ['Clara','I checked Species+. But an Appendix listing does not, by itself, prove an illegal trade.'],
 ['Theo','Not every international movement of a listed species is automatically trafficking.'],
 ['Clara','Exactly. We need permits, origin, dates, applicable rules and purpose.'],
 ['Theo','What about taxonomy? I have two spellings in the report.'],
 ['Clara','Verify the accepted name before cross-referencing databases. One mistake can change the results.'],
 ['Theo','Done. I corrected the taxon and preserved the spelling used by the source.']
 ],
 es:[
 ['Theo','Clara, ¿revisaste los apéndices CITES de esa especie?'],
 ['Clara','Consulté Species+. Pero figurar en un apéndice no demuestra por sí solo un comercio ilegal.'],
 ['Theo','No todo movimiento internacional de una especie listada constituye tráfico.'],
 ['Clara','Exacto. Hay que verificar permisos, origen, fechas, normas y finalidad.'],
 ['Theo','¿Y la taxonomía? Tengo dos grafías diferentes en el informe.'],
 ['Clara','Comprueba el nombre aceptado antes de cruzar bases. Un error altera los resultados.'],
 ['Theo','Listo. Corregí el taxón y conservé el nombre utilizado por la fuente.']
 ]
},
{
 id:'traffic',long:true,source:'TRAFFIC · Wildlife Trade Portal',
 href:'https://www.wildlifetradeportal.org/',
 pt:[
 ['Clara','O portal da TRAFFIC está entre os meus favoritos para comparar padrões de apreensões.'],
 ['Theo','O Wildlife Trade Portal? Gosto dos filtros de espécie, produto, país e tipo de ocorrência.'],
 ['Clara','E do cuidado de olhar a metodologia antes de interpretar os números.'],
 ['Theo','Porque um país com mais registros pode estar fiscalizando melhor, não necessariamente traficando mais.'],
 ['Clara','Exato. Visibilidade e prevalência não são a mesma coisa.'],
 ['Theo','Olha esta concentração de registros. Parece uma rota interessante.'],
 ['Clara','Parece, mas precisamos verificar datas, eventos duplicados e se as rotas foram de fato documentadas.'],
 ['Theo','Podemos comparar com o Observatório Global da WCS Brasil e voltar às fontes.'],
 ['Clara','Sim. Cruzar bases é uma forma de encontrar perguntas melhores, não de fabricar certezas.'],
 ['Theo','Isso devia vir escrito na tela de carregamento do computador.']
 ],
 en:[
 ['Clara','TRAFFIC’s portal is one of my favourite places to compare seizure patterns.'],
 ['Theo','The Wildlife Trade Portal? I like its filters for taxa, products, countries and incident types.'],
 ['Clara','And the reminder to read the methodology before interpreting figures.'],
 ['Theo','A country with more records might have stronger enforcement, not necessarily more trafficking.'],
 ['Clara','Exactly. Visibility and prevalence are not the same thing.'],
 ['Theo','Look at this cluster. It could be an interesting route.'],
 ['Clara','Could be. We still need to check dates, duplicate events and whether movements were actually documented.'],
 ['Theo','We can compare the WCS Brasil Observatory and return to the original sources.'],
 ['Clara','Yes. Linking databases should generate better questions, not manufactured certainty.'],
 ['Theo','That sentence ought to be the computer’s welcome message.']
 ],
 es:[
 ['Clara','El portal de TRAFFIC es uno de mis favoritos para comparar patrones de incautación.'],
 ['Theo','¿El Wildlife Trade Portal? Me gustan sus filtros de especies, productos, países y tipos de incidente.'],
 ['Clara','Y la importancia de leer la metodología antes de interpretar las cifras.'],
 ['Theo','Un país con más registros quizá fiscaliza mejor, no necesariamente tiene más tráfico.'],
 ['Clara','Exactamente. Visibilidad y prevalencia no son lo mismo.'],
 ['Theo','Mira esta concentración. Podría ser una ruta interesante.'],
 ['Clara','Podría. Todavía debemos verificar fechas, duplicados y movimientos documentados.'],
 ['Theo','Podemos compararla con el Observatorio Global de WCS Brasil y revisar las fuentes.'],
 ['Clara','Sí. Cruzar bases debe producir mejores preguntas, no certezas inventadas.'],
 ['Theo','Esa frase debería aparecer al encender el ordenador.']
 ]
},
{
 id:'congress',long:true,source:null,href:null,
 pt:[
 ['Theo','Clara, você vai para o Congresso no ano que vem?'],
 ['Clara','Ainda não sei, Theo... Estou atolada de casos para investigar.'],
 ['Theo','Mas você sempre volta desses encontros com ótimas ideias e contatos.'],
 ['Clara','É, mas ideias não resolvem sozinhas um dossiê cheio de lacunas.'],
 ['Theo','Você já conseguiu ligar registros que ninguém tinha relacionado antes.'],
 ['Clara','E ainda preciso de resultados bons. Sem isso, vou permanecer atrás de um computador para sempre.'],
 ['Theo','Para sempre é bastante tempo. Pelo menos escolha uma cadeira melhor.'],
 ['Clara','Não brinca. Ontem fiquei três horas tentando descobrir se duas notícias eram o mesmo caso.'],
 ['Theo','Eram?'],
 ['Clara','Eram. Mas cada uma tinha uma data, um número de animais e uma cidade diferente.'],
 ['Theo','Então você teve um resultado: evitou criar um caso duplicado.'],
 ['Clara','Talvez. Se conseguirmos fechar as evidências até 2027, eu penso no Congresso.'],
 ['Theo','Combinado. Eu reservo o café; você leva as perguntas difíceis.']
 ],
 en:[
 ['Theo','Clara, are you going to the congress next year?'],
 ['Clara','I am not sure, Theo... I am buried in cases to investigate.'],
 ['Theo','But you always come back from those meetings with good ideas and contacts.'],
 ['Clara','Ideas alone will not close a dossier full of missing evidence.'],
 ['Theo','You have connected records nobody else had linked before.'],
 ['Clara','And I still need solid results. Without them, I will be stuck behind a computer forever.'],
 ['Theo','Forever is a long time. At least get yourself a better chair.'],
 ['Clara','Not funny. Yesterday I spent three hours checking whether two reports were the same incident.'],
 ['Theo','Were they?'],
 ['Clara','Yes. But each report had a different date, animal count and city.'],
 ['Theo','Then you did get a result: you prevented a duplicate case.'],
 ['Clara','Maybe. If we settle the evidence before 2027, I might go to the congress.'],
 ['Theo','Deal. I will handle the coffee; you bring the hard questions.']
 ],
 es:[
 ['Theo','Clara, ¿vas a ir al congreso el año que viene?'],
 ['Clara','Todavía no lo sé, Theo... Estoy saturada de casos por investigar.'],
 ['Theo','Pero siempre vuelves de esos encuentros con buenas ideas y contactos.'],
 ['Clara','Las ideas no resuelven solas un expediente lleno de vacíos.'],
 ['Theo','Has relacionado registros que nadie había conectado antes.'],
 ['Clara','Y aún necesito buenos resultados. Si no, me quedaré detrás de un ordenador para siempre.'],
 ['Theo','Para siempre es mucho tiempo. Por lo menos busca una silla mejor.'],
 ['Clara','No te burles. Ayer pasé tres horas comprobando si dos noticias eran el mismo caso.'],
 ['Theo','¿Lo eran?'],
 ['Clara','Sí, pero tenían fechas, cantidades y ciudades distintas.'],
 ['Theo','Entonces hubo un resultado: evitaste un expediente duplicado.'],
 ['Clara','Quizá. Si cerramos las pruebas antes de 2027, pensaré en el congreso.'],
 ['Theo','Trato hecho. Yo llevo el café y tú las preguntas difíciles.']
 ]
},
{
 id:'trade',long:false,source:'CITES Trade Database',href:'https://trade.cites.org/',
 pt:[
 ['Theo','Encontrei números altos na CITES Trade Database. Isso significa um aumento de apreensões?'],
 ['Clara','Não. Ali estamos olhando registros oficiais de comércio internacional reportados pelas Partes.'],
 ['Theo','Então preciso separar fluxo comercial declarado e casos de comércio ilegal.'],
 ['Clara','Isso. E observar unidade de medida, origem, ano e país declarante.'],
 ['Theo','Vou abrir uma tabela comparativa antes de tirar qualquer conclusão.'],
 ['Clara','Boa escolha. Números comparáveis primeiro, gráficos bonitos depois.']
 ],
 en:[
 ['Theo','The CITES Trade Database shows large figures. Does that mean seizures increased?'],
 ['Clara','No. We are looking at official international trade records reported by Parties.'],
 ['Theo','So declared trade and illegal trade incidents must remain separate.'],
 ['Clara','Right. And watch units, source codes, years and reporting countries.'],
 ['Theo','I will build a comparable table before reaching a conclusion.'],
 ['Clara','Good. Comparable numbers first, beautiful charts later.']
 ],
 es:[
 ['Theo','La CITES Trade Database muestra cifras elevadas. ¿Aumentaron las incautaciones?'],
 ['Clara','No. Son registros oficiales de comercio internacional reportados por las Partes.'],
 ['Theo','Entonces debemos separar comercio declarado e incidentes ilegales.'],
 ['Clara','Y revisar unidades, códigos de origen, años y países declarantes.'],
 ['Theo','Haré una tabla comparable antes de sacar conclusiones.'],
 ['Clara','Bien. Primero cifras comparables y después gráficos bonitos.']
 ]
},
{
 id:'species',long:false,source:'GBIF · Biodiversity Data',href:'https://www.gbif.org/',
 pt:[
 ['Clara','O GBIF ajuda a verificar registros de ocorrência de espécies, mas não é uma base de tráfico.'],
 ['Theo','E a Lista Vermelha da IUCN traz informação de risco de extinção, não de culpa criminal.'],
 ['Clara','Exatamente. Cada base responde uma pergunta diferente.'],
 ['Theo','Então um registro de ocorrência não prova a origem de um animal apreendido.'],
 ['Clara','Nem uma espécie ameaçada prova que o transporte específico foi ilícito.'],
 ['Theo','Vou registrar as limitações no nosso relatório, antes que o gráfico vire uma sentença.']
 ],
 en:[
 ['Clara','GBIF is useful for species occurrence records, but it is not a trafficking database.'],
 ['Theo','And the IUCN Red List covers extinction risk, not criminal responsibility.'],
 ['Clara','Exactly. Every database answers a different question.'],
 ['Theo','So an occurrence record does not prove the origin of a seized animal.'],
 ['Clara','Nor does threatened status prove a particular transport was illegal.'],
 ['Theo','I will add those limitations before our chart turns into a verdict.']
 ],
 es:[
 ['Clara','GBIF es útil para registros de presencia de especies, pero no es una base de tráfico.'],
 ['Theo','Y la Lista Roja de la UICN evalúa riesgo de extinción, no responsabilidad penal.'],
 ['Clara','Exacto. Cada base responde a una pregunta distinta.'],
 ['Theo','Un registro de presencia no prueba el origen de un animal incautado.'],
 ['Clara','Y que una especie esté amenazada no prueba que un transporte sea ilícito.'],
 ['Theo','Anotaré esos límites antes de que el gráfico se convierta en una sentencia.']
 ]
},
{
 id:'container',long:true,source:null,href:null,
 pt:[
 ['Theo','Você viu o histórico daquele contêiner que passou pela Ásia seis vezes?'],
 ['Clara','Vi. O histórico comprova as viagens do contêiner, não o que estava dentro dele.'],
 ['Theo','O pessoal fica tentado a desenhar uma rota direta para as barbatanas.'],
 ['Clara','Uma passagem por Hong Kong não é prova de que a mercadoria foi entregue lá.'],
 ['Theo','Ainda assim, o estaleiro merece uma verificação urgente.'],
 ['Clara','Concordo. Urgência não significa pular a cadeia de custódia.'],
 ['Theo','Vou separar uma coluna para movimentação do contêiner e outra para conteúdo comprovado.'],
 ['Clara','E outra para lacunas. Aposto que essa será a mais comprida.'],
 ['Theo','Infelizmente, você costuma ganhar essas apostas.']
 ],
 en:[
 ['Theo','Did you see the container history showing six trips to Asia?'],
 ['Clara','I did. It proves the container travelled, not what was inside it.'],
 ['Theo','Everyone wants to draw a direct shark-fin route from that.'],
 ['Clara','A Hong Kong port call is not proof that the goods were delivered there.'],
 ['Theo','Even so, the shipyard deserves an urgent lawful check.'],
 ['Clara','Agreed. Urgency does not mean skipping chain-of-custody requirements.'],
 ['Theo','I will separate container movements from independently verified cargo.'],
 ['Clara','And add a column for gaps. I bet that one will be the longest.'],
 ['Theo','Unfortunately, you usually win that kind of bet.']
 ],
 es:[
 ['Theo','¿Viste el historial del contenedor que viajó seis veces a Asia?'],
 ['Clara','Sí. Demuestra los viajes del contenedor, no lo que llevaba dentro.'],
 ['Theo','Todos quieren dibujar una ruta directa para las aletas.'],
 ['Clara','Una escala en Hong Kong no prueba que se entregara la mercancía allí.'],
 ['Theo','Aun así, el astillero merece una comprobación legal urgente.'],
 ['Clara','De acuerdo. La urgencia no permite saltarse la cadena de custodia.'],
 ['Theo','Separaré los movimientos del contenedor de las cargas verificadas.'],
 ['Clara','Y añadiré una columna para los vacíos. Seguro que será la más larga.'],
 ['Theo','Por desgracia, casi siempre ganas ese tipo de apuestas.']
 ]
},
{
 id:'research',long:false,source:'UNODC · World Wildlife Crime Report',href:'https://www.unodc.org/',
 pt:[
 ['Clara','O relatório da UNODC é útil para entender padrões globais, mas um caso local exige fontes locais.'],
 ['Theo','Então tendência global não substitui evidência sobre um suspeito específico.'],
 ['Clara','Exatamente. E nunca confunda país de publicação com país onde o fato ocorreu.'],
 ['Theo','Vou registrar data do evento e data da notícia em campos diferentes.'],
 ['Clara','Perfeito. Agora só falta o café.'],
 ['Theo','Isso a planilha ainda não consegue automatizar.']
 ],
 en:[
 ['Clara','UNODC reports help with global trends, but a local incident needs local sources.'],
 ['Theo','So a global pattern cannot substitute evidence about a particular suspect.'],
 ['Clara','Exactly. And do not confuse country of publication with country where the event occurred.'],
 ['Theo','I will keep the event date separate from the article date.'],
 ['Clara','Perfect. Now we just need coffee.'],
 ['Theo','That is the one thing our spreadsheet cannot automate.']
 ],
 es:[
 ['Clara','Los informes de UNODC ayudan con tendencias globales, pero un caso local exige fuentes locales.'],
 ['Theo','Un patrón global no reemplaza las pruebas sobre un sospechoso concreto.'],
 ['Clara','Exacto. Y no confundas país de publicación con país del hecho.'],
 ['Theo','Separaré la fecha del evento de la fecha de la noticia.'],
 ['Clara','Perfecto. Ahora solo falta café.'],
 ['Theo','Eso la hoja de cálculo todavía no puede automatizarlo.']
 ]
}
];
const ids=new Set(),allowed=new Set(['Clara','Theo']);
for(const p of packs){
 if(ids.has(p.id))throw Error('Duplicate pack: '+p.id);
 ids.add(p.id);
 for(const lang of ['pt','en','es']){
  if(!Array.isArray(p[lang])||p[lang].length<5)throw Error('Missing dialogue '+p.id+' '+lang);
  for(const line of p[lang])if(!Array.isArray(line)||line.length!==2||!allowed.has(line[0])||typeof line[1]!=='string'||!line[1])throw Error('Invalid line '+p.id);
 }
}
window.AYLAClaraTheoDialogue={version:'2.0',packs};
})();
