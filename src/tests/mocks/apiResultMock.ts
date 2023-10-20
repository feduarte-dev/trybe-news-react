/* eslint-disable max-lines */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */

function transformDateToday() {
  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const ano = String(agora.getFullYear()).slice(-2);
  const hora = String(agora.getHours()).padStart(2, '0');
  const minuto = String(agora.getMinutes()).padStart(2, '0');
  const segundo = String(agora.getSeconds()).padStart(2, '0');

  const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;

  return dataFormatada;
}

function transformDateYesterday() {
  const agora = new Date();
  const dia = String(agora.getDate() - 1).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const ano = String(agora.getFullYear()).slice(-2);
  const hora = String(agora.getHours()).padStart(2, '0');
  const minuto = String(agora.getMinutes()).padStart(2, '0');
  const segundo = String(agora.getSeconds()).padStart(2, '0');

  const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;

  return dataFormatada;
}

const apiResultMock = [
  {
    id: 38095,
    tipo: 'Notícia',
    titulo:
        'Inflação fica em 0,26% em setembro, influenciada pelo aumento da gasolina',
    introducao:
            'Subitem de maior peso do IPCA, a gasolina teve alta e impactou na inflação de setembro - Foto: Helena Pontes/Agência IBGE Notícias A inflação do mês de setembro foi de 0,26%, ficando 0,03 ponto percentual (p.p.) acima da taxa de 0,23% registrada em...',
    data_publicacao: transformDateToday(),
    produto_id: 0,
    produtos:
        '9256|Índice Nacional de Preços ao Consumidor Amplo|indice-nacional-de-precos-ao-consumidor-amplo|2210;9258|Índice Nacional de Preços ao Consumidor|indice-nacional-de-precos-ao-consumidor|2077',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/estatisticas_economicas/2023_10/IPCA_THUMB_Helena-Pontes.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/estatisticas_economicas/2023_10/IPCA_HOME_Helena-Pontes.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '9256, 9258',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38095-inflacao-fica-em-0-26-em-setembro-influenciada-pelo-aumento-da-gasolina.html',
  },
  {
    id: 38090,
    tipo: 'Notícia',
    titulo:
        'Preços da construção variam 0,02% em setembro com menor número de acordos coletivos',
    introducao:
        'Com menos acordos coletivos, taxa da mão de obra passa de 0,64% em agosto para 0,36% em setembro - Foto: Lúcio Bernardo Jr./Agência Brasília O Índice Nacional da Construção Civil (Sinapi), divulgado hoje (11) pelo IBGE, apresentou variação de 0,02% em...',
    data_publicacao: transformDateYesterday(),
    produto_id: 9270,
    produtos:
        '9270|Sistema Nacional de Pesquisa de Custos e Índices da Construção Civil|sistema-nacional-de-pesquisa-de-custos-e-indices-da-construcao-civil|2079',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/estatisticas_economicas/2023_10/SINAPI_THUMB_Lcio-Bernardo-Jr-Agncia-Braslia_2.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/estatisticas_economicas/2023_10/SINAPI_HOME_Lcio-Bernardo-Jr-Agncia-Braslia_2.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '9270',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38090-precos-da-construcao-variam-0-02-em-setembro-com-menor-numero-de-acordos-coletivos.html',
  },
  {
    id: 38092,
    tipo: 'Release',
    titulo: 'IPCA foi de 0,26% em setembro',
    introducao:
        'Em setembro de 2023, o Índice Nacional de Preços ao Consumidor Amplo (IPCA) foi de 0,26%, 0,03 ponto percentual (p.p.) acima da taxa de agosto (0,23%). No ano, o IPCA acumula alta de 3,50% e, nos últimos 12 meses, de 5,19%, acima dos 4,61% observados nos...',
    data_publicacao: '11/10/2023 09:00:00',
    produto_id: 0,
    produtos:
        '9256|Índice Nacional de Preços ao Consumidor Amplo|indice-nacional-de-precos-ao-consumidor-amplo|2210;9258|Índice Nacional de Preços ao Consumidor|indice-nacional-de-precos-ao-consumidor|2077',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/releases/IPCA_Release1.png","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/releases/IPCA_Release1.png","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '9256, 9258',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/38092-ipca-foi-de-0-26-em-setembro.html',
  },
  {
    id: 38089,
    tipo: 'Release',
    titulo: 'Em setembro, Índice Nacional da Construção Civil varia 0,02%',
    introducao:
        'O Índice Nacional da Construção Civil (Sinapi) variou 0,02% em setembro, caindo 0,16 ponto percentual em relação ao índice de agosto (0,18%). O acumulado nos últimos doze meses foi de 2,68%, resultado abaixo dos 3,11% registrados nos doze meses...',
    data_publicacao: '11/10/2023 09:00:00',
    produto_id: 9270,
    produtos:
        '9270|Sistema Nacional de Pesquisa de Custos e Índices da Construção Civil|sistema-nacional-de-pesquisa-de-custos-e-indices-da-construcao-civil|2079',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/releases/SINAPI_Release.png","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/releases/SINAPI_Release.png","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '9270',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/38089-em-setembro-indice-nacional-da-construcao-civil-varia-0-02.html',
  },
  {
    id: 38075,
    tipo: 'Notícia',
    titulo:
        'Estimativa de setembro prevê safra recorde de 318,1 milhões de toneladas para 2023',
    introducao:
        'Com alta de 3,1% frente a estimativa de agosto, produção de milho passa para 131,7 milhões de toneladas em 2023 e atinge novo recorde. Foto: Helena Pontes/Agência IBGE Notícias O Levantamento Sistemático da Produção Agrícola (LSPA) para setembro,...',
    data_publicacao: '10/10/2023 09:00:00',
    produto_id: 9201,
    produtos:
        '9201|Levantamento Sistemático da Produção Agrícola|levantamento-sistematico-da-producao-agricola|2071',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/estatisticas_economicas/2023_10/LSPA_thumb.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/estatisticas_economicas/2023_10/LSPA_home.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '9201',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38075-estimativa-de-setembro-preve-safra-recorde-de-318-1-milhoes-de-toneladas-para-2023.html',
  },
  {
    id: 38074,
    tipo: 'Release',
    titulo:
        'Em setembro, IBGE prevê safra recorde de 318,1 milhões de toneladas para 2023',
    introducao:
        'A estimativa de setembro para a produção de cereais, leguminosas e oleaginosas de 2023 é de 318,1 milhões de toneladas, com altas de 20,9% ante a safra 2022 (263,2 milhões de toneladas) e de 1,5% (ou mais 4,8 milhões de toneladas) frente à estimativa de...',
    data_publicacao: '10/10/2023 09:00:00',
    produto_id: 9201,
    produtos:
        '9201|Levantamento Sistemático da Produção Agrícola|levantamento-sistematico-da-producao-agricola|2071',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/releases/LSPA_Release.png","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/releases/LSPA_Release.png","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '9201',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/38074-em-setembro-ibge-preve-safra-recorde-de-318-1-milhoes-de-toneladas-para-2023.html',
  },
  {
    id: 38065,
    tipo: 'Notícia',
    titulo:
        'Produção industrial avança em nove de 15 locais pesquisados em agosto frente a julho ',
    introducao:
        'Alta no setor de produtos químicos influenciou crescimento da indústria paulista (3,0%) em agosto - Foto: Freepik Com a variação de 0,4% na produção industrial nacional na passagem de julho para agosto, nove dos 15 locais investigados pela Pesquisa...',
    data_publicacao: '10/10/2023 09:00:00',
    produto_id: 9296,
    produtos:
        '9296|PIM-PF Regional#pimpf2|pesquisa-industrial-mensal-producao-fisica-regional|2209',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/estatisticas_economicas/2023_10/PIM-Reg_Thumb_Freepick.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/estatisticas_economicas/2023_10/PIM-Reg_Home_Freepick.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '9296',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38065-producao-industrial-avanca-em-nove-de-15-locais-pesquisados-em-agosto-frente-a-julho.html',
  },
  {
    id: 38064,
    tipo: 'Release',
    titulo: 'Em agosto, indústria avança em nove dos 15 locais pesquisados',
    introducao:
        'Com a variação positiva de 0,4% na indústria nacional em agosto, na série com ajuste sazonal, nove dos 15 locais pesquisados pelo IBGE nesse indicador apontaram taxas positivas. Os maiores avanços foram do Amazonas (11,5%), do Espírito Santo (5,2%) e do...',
    data_publicacao: '10/10/2023 09:00:00',
    produto_id: 9296,
    produtos:
        '9296|PIM-PF Regional#pimpf2|pesquisa-industrial-mensal-producao-fisica-regional|2209',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/releases/PIM-PF-REGIONAL_Release.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/releases/PIM-PF-REGIONAL_Release.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '9296',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/38064-em-agosto-industria-avanca-em-nove-dos-15-locais-pesquisados.html',
  },
  {
    id: 38058,
    tipo: 'Notícia',
    titulo:
        'PNDS vai a campo coletar informações sobre demografia, saúde reprodutiva e nutrição das crianças',
    introducao:
        'Pesquisa fará levantamento detalhado sobre saúde de mulheres, homens e crianças - Foto: Tomaz Silva/Agência Brasil O IBGE está iniciando hoje (9/10) a coleta da Pesquisa Nacional de Demografia e Saúde (PNDS) 2023, realizada em parceria com a Secretaria...',
    data_publicacao: '09/10/2023 10:00:00',
    produto_id: 0,
    produtos: '',
    editorias: 'ibge',
    imagens:
        '{"image_intro":"images/agenciadenoticias/ibge/2023_10/PNDS_THUMB_Tomaz-Silva-Agncia-Brasil.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/ibge/2023_10/PNDS_HOME_Tomaz-Silva-Agncia-Brasil.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38058-pnds-vai-a-campo-coletar-informacoes-sobre-demografia-saude-reprodutiva-e-nutricao-das-criancas.html',
  },
  {
    id: 38044,
    tipo: 'Notícia',
    titulo:
        'Em 2021, Brasil tinha 13,2 milhões  de microempreendedores individuais (MEIs)',
    introducao:
        'Cabeleireiros e outras atividades de tratamento de beleza reuniu 9,1% dos MEIs do país - Foto: Licia Rubinstein/Agência IBGE Notícias As Estatísticas dos Cadastros de Microempreendedores Individuais do IBGE revelam que, em 2021, havia 13,2 milhões de...',
    data_publicacao: '04/10/2023 10:00:00',
    produto_id: 38014,
    produtos:
        '38014|Estatísticas dos Cadastros de Microempreendedores Individuais|estatisticas-dos-cadastros-de-microempreendedores-individuais|3076',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/estatisticas_economicas/2023_10/Cadastro-MEI_THUMB_LiciaRubinstein.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/estatisticas_economicas/2023_10/Cadastro-MEI_HOME_LiciaRubinstein.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '38014',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38044-em-2021-brasil-tinha-13-2-milhoes-de-microempreendedores-individuais-meis.html',
  },
  {
    id: 38042,
    tipo: 'Notícia',
    titulo:
        'IBGE promove evento para discutir e rever o conceito de aglomerado subnormal',
    introducao:
        'Participaram do evento representantes do IBGE, de órgãos públicos, de universidades, da sociedade civil organizada e das favelas e comunidades - Foto: Jéssica Farias O Instituto Brasileiro de Geografia e Estatística (IBGE) realizou, entre os dias 25/09 e...',
    data_publicacao: '03/10/2023 16:00:00',
    produto_id: 0,
    produtos: '',
    editorias: 'ibge',
    imagens:
        '{"image_intro":"images/agenciadenoticias/ibge/2023_10/Evento_DF_THUMB_JessicaFarias.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/ibge/2023_10/Evento_DF_HOME_JessicaFarias.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38042-ibge-promove-evento-para-discutir-e-rever-o-conceito-de-aglomerado-subnormal.html',
  },
  {
    id: 38016,
    tipo: 'Notícia',
    titulo: 'Produção industrial nacional tem variação de 0,4% em agosto',
    introducao:
        'Desempenho da indústria farmacêutica impactou no resultado do mês - Foto: Freepik A indústria do país apresentou uma variação positiva de 0,4% na passagem de julho para agosto, eliminando parte da queda de 0,6% verificada no mês anterior. Na comparação...',
    data_publicacao: '03/10/2023 09:00:00',
    produto_id: 9294,
    produtos:
        '9294|PIM-PF Brasil#pimpf1|pesquisa-industrial-mensal-producao-fisica-brasil|2209',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/estatisticas_economicas/2023_10/PIM-BR_thumb-Freepik.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/estatisticas_economicas/2023_10/PIM-BR_home-Freepik.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '9294',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38016-producao-industrial-nacional-tem-variacao-de-0-4-em-agosto.html',
  },
  {
    id: 38015,
    tipo: 'Release',
    titulo: 'Produção industrial tem variação de 0,4% em agosto',
    introducao:
        'Em agosto de 2023, a produção industrial nacional variou 0,4% frente a julho, na série com ajuste sazonal. Em relação a agosto de 2022, o avanço foi de 0,5%. Frente a igual período de 2022, a indústria acumula taxa negativa no ano (-0,3%). O acumulado...',
    data_publicacao: '03/10/2023 09:00:00',
    produto_id: 9294,
    produtos:
        '9294|PIM-PF Brasil#pimpf1|pesquisa-industrial-mensal-producao-fisica-brasil|2209',
    editorias: 'economicas',
    imagens:
        '{"image_intro":"images/agenciadenoticias/releases/PIM-PF-BR_Release1.png","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images/agenciadenoticias/releases/PIM-PF-BR_Release1.png","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
    produtos_relacionados: '9294',
    destaque: true,
    link:
        'http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/38015-producao-industrial-tem-variacao-de-0-4-em-agosto.html',
  }];

export default apiResultMock;
