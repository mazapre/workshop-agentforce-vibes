export type Step = {
  id: number;
  short: string;
  title: string;
  phase: string;
  mode: string;
  goal: string;
  prompt: string;
  checks: string[];
  recovery: string;
};

export const steps: Step[] = [
  {
    id: 1,
    short: 'Abrir o Vibes',
    title: 'Abrir o Vibes e confirmar a org',
    phase: 'Preparar',
    mode: 'Planejar',
    goal: 'Antes de gerar arquivos, confirme o projeto aberto, as ferramentas disponíveis e a org que receberá as alterações.',
    prompt: `Vamos construir um sistema de gestão de visitantes neste projeto Salesforce.
Confirme a org de destino por uma consulta real e inspecione os arquivos existentes. Liste as ferramentas disponíveis para consultar metadados, fazer deploy e executar testes. Não imprima tokens, senhas ou URLs de autenticação.
Nesta etapa, apenas planeje: não altere arquivos ou dados. Se algum acesso falhar, mostre a falha e o que falta configurar.
Nas próximas etapas, reutilize o que já existir, use os nomes de API definidos neste guia e faça deploy apenas dos componentes do workshop. Após cada execução, informe o que mudou e a evidência de validação. Aguarde o próximo prompt.`,
    checks: [
      'A org consultada é a org do treinamento.',
      'O Vibes consegue ler o projeto e consultar metadados; as ferramentas necessárias estão disponíveis.',
    ],
    recovery:
      'Se a org não aparecer, confira a autorização e selecione-a novamente no projeto. Para MCP desconectado, use o diagnóstico do pre-work. Não continue com uma org escolhida por suposição.',
  },
  {
    id: 2,
    short: 'Criar o app',
    title: 'Criar a base do aplicativo',
    phase: 'Construir',
    mode: 'Executar',
    goal: 'Crie o contêiner de navegação. A aba de visitantes será acrescentada depois que o objeto existir.',
    prompt: `Crie ou atualize o Lightning App "Guest Management App", API Guest_Management_App, para uma recepção acompanhar visitantes.
Use navegação padrão. Nesta etapa, inclua apenas abas que já existam na org: não referencie o futuro objeto de visitantes.
Inspecione o projeto para evitar um app duplicado. Faça deploy do app na org de treinamento e informe o resultado real do deploy e como abri-lo no App Launcher.`,
    checks: [
      'O deploy do app termina com sucesso.',
      'Guest Management App aparece no App Launcher do usuário do treinamento.',
    ],
    recovery:
      'Se uma aba ainda inexistente bloquear o deploy, remova essa referência e tente novamente. Se o app não aparecer, confira visibilidade no perfil/permission set e atualize a sessão.',
  },
  {
    id: 3,
    short: 'Modelar os dados',
    title: 'Definir o contrato de dados',
    phase: 'Construir',
    mode: 'Planejar → executar',
    goal: 'Use o mesmo vocabulário em dados, automação, interface e agente. Os dez campos de negócio estão detalhados abaixo.',
    prompt: `Planeje o objeto Guest_Check_In__c (rótulo Guest Check-In), com Name do tipo Text para o nome do visitante, e estes 9 campos personalizados:
- Host__c: Lookup(User), obrigatório; o anfitrião deve estar ativo.
- Check_In_Time__c e Check_Out_Time__c: DateTime, opcionais.
- Status__c: Picklist restrita; valores de API Expected, CheckedIn, CheckedOut, NoShow, Cancelled; padrão Expected.
- Visit_Purpose__c: Picklist restrita, obrigatória; Meeting, Interview, Delivery, Maintenance, Other.
- Badge_Number__c: Text(10), opcional.
- Company__c: Text(100), opcional.
- Guest_Email__c: Email, opcional.
- Visit_Duration_Minutes__c: Formula(Number, 1 decimal). Retorne a diferença em minutos entre saída e entrada quando ambas existirem; caso contrário, deixe em branco.
São 10 campos de negócio incluindo Name; campos padrão de auditoria não entram na contagem.
Crie a aba do objeto e adicione-a ao Guest_Management_App. Inclua os campos editáveis no layout e na list view, respeitando o tipo de cada campo.
Primeiro apresente o plano. Após minha aprovação, implemente e faça deploy. Se já existir um campo compatível, reutilize-o; se houver conflito, apresente-o antes de modificar dados ou tipo.`,
    checks: [
      'Object Manager mostra o objeto e os campos com os nomes e tipos combinados.',
      'A aba abre no app. Você consegue salvar um visitante Expected com nome, anfitrião ativo e motivo.',
    ],
    recovery:
      'Confira valores de API das picklists, não apenas seus rótulos. Um lookup para Contact não substitui Host__c → User. Não recrie o objeto para corrigir um campo isolado.',
  },
  {
    id: 4,
    short: 'Conceder acesso',
    title: 'Criar e atribuir o permission set',
    phase: 'Construir',
    mode: 'Executar',
    goal: 'Garanta que o participante possa usar o app e seus dados. O acesso ampliado fica restrito ao objeto do laboratório.',
    prompt: `Crie ou atualize o permission set "Guest Management App Access", API Guest_Management_App_Access.
Conceda acesso ao Guest_Management_App e à aba Guest_Check_In__c. Para Guest_Check_In__c, inclua Read, Create, Edit, Delete, View All Records e Modify All Records.
Conceda leitura dos campos e edição apenas dos campos editáveis. A fórmula Visit_Duration_Minutes__c deve ser somente leitura.
Não conceda View All Data ou Modify All Data globalmente.
Faça deploy, atribua o permission set ao meu usuário do treinamento e verifique a atribuição na org. Se uma permissão solicitada não puder ser aplicada, informe o bloqueio em vez de ampliar o acesso global.`,
    checks: [
      'O permission set está implantado e atribuído ao usuário correto.',
      'O usuário abre o app, lê os campos e cria/edita um registro pela interface.',
    ],
    recovery:
      'A criação do permission set não equivale à atribuição. Confira Permission Set Assignments. Se o XML falhar, valide os nomes de API e mantenha a descrição em até 255 caracteres.',
  },
  {
    id: 5,
    short: 'Popular a org',
    title: 'Criar dados que ajudem a testar',
    phase: 'Construir',
    mode: 'Planejar → executar',
    goal: 'Prepare uma amostra pequena e reconhecível. Ela será a referência para conferir a UI e as respostas do agente.',
    prompt: `Planeje 8 visitas fictícias em Guest_Check_In__c, identificadas pelos crachás WKS-001 até WKS-008. Use nomes fictícios e, se incluir e-mail, o domínio example.invalid. Use meu usuário ativo como anfitrião, obtendo seu Id por consulta.
Distribuição: 3 CheckedIn, 3 CheckedOut e 2 Expected, com Meeting, Interview e Delivery. Entradas e saídas devem ser coerentes; visitas Expected não têm timestamps. Não preencha a fórmula de duração.
Antes de inserir, consulte cada Badge_Number__c. Se já existir, reporte e reutilize sem sobrescrever. Se houver mais de um registro para o crachá, interrompa aquele item e informe a duplicidade. Uma repetição não deve duplicar a amostra nem apagar registros.
Após minha aprovação, execute e consulte os 8 crachás para mostrar quantidade, status, horários e anfitrião. Conte separadamente outros registros da org.`,
    checks: [
      'Há um registro por crachá WKS-001…WKS-008.',
      'Na primeira criação, a amostra contém 3 presentes, 3 saídas e 2 esperados, com horários coerentes.',
    ],
    recovery:
      'Deploy não cria dados por si só. Peça uma consulta real ao objeto. Se você já usou a amostra nos testes, os status podem ter mudado: não repita a carga para “corrigir” a contagem.',
  },
  {
    id: 6,
    short: 'Automatizar o status',
    title: 'Implementar regras e testes Apex',
    phase: 'Construir',
    mode: 'Planejar → executar',
    goal: 'A regra de negócio precisa valer para a tela, a API e o agente. Centralize-a em Apex e cubra os casos de falha.',
    prompt: `Planeje um trigger e handler Apex para Guest_Check_In__c, com processamento em lote:
- Com entrada e sem saída: Status__c = CheckedIn.
- Com entrada e saída válida: Status__c = CheckedOut.
- Sem ambos os horários: aceite apenas Expected, NoShow ou Cancelled.
- Rejeite saída sem entrada, saída anterior à entrada, anfitrião inativo e nome/motivo/anfitrião ausentes, com mensagem clara.
- Não faça SOQL ou DML dentro de loops. Preserve a fórmula de duração.
Crie testes para cada regra, inserção/atualização e um lote de pelo menos 200 registros. Não use SeeAllData=true; crie os dados necessários no teste.
Após minha aprovação, implemente, implante e execute os testes. Informe quais rodaram, falhas e cobertura das classes alteradas. Se uma ferramenta não estiver disponível, declare que a verificação não foi executada.`,
    checks: [
      'Os testes das regras passam, incluindo lote e datas inválidas.',
      'Na org, preencher a saída de uma visita atualiza o status e a duração; saída anterior à entrada é rejeitada.',
    ],
    recovery:
      'Leia o primeiro erro de compilação antes de regenerar tudo. Em Apex, literais de texto usam aspas simples. User.Name é somente leitura: testes devem preencher FirstName e LastName quando criarem usuários.',
  },
  {
    id: 7,
    short: 'Montar a recepção',
    title: 'Construir uma interface utilizável',
    phase: 'Construir',
    mode: 'Planejar → executar',
    goal: 'Dê à recepção uma visão clara de quem está no prédio, com ações que possam ser conferidas imediatamente.',
    prompt: `Planeje o LWC guestReception e seu controller Apex para o Guest_Management_App.
Mostre Nome, Anfitrião, Motivo, Status, Entrada e Saída, com destaque textual e visual para CheckedIn. Inclua contador de presentes, atualizar, estado vazio, carregamento e erro útil. Não dependa apenas de cor.
Permita check-in rápido de um registro Expected e check-out de um CheckedIn, identificando o registro pela linha selecionada. Use as regras da etapa 6 e atualize a lista/contador após sucesso. Previna duplo clique e não informe sucesso quando a gravação falhar.
No controller, respeite compartilhamento e CRUD/FLS usando operações em modo usuário ou tratamento explícito equivalente. Crie testes significativos para consultas e mutações.
Após minha aprovação, implemente e publique numa Lightning App Page "Guest Reception", API Guest_Reception. Crie/atualize a aba e sua navegação no app. Atualize o permission set com acesso ao controller e à aba. Implante e teste.`,
    checks: [
      'A página Guest Reception abre dentro do app, com dados reais e contador coerente.',
      'Ao entrar um esperado, o contador aumenta em 1; ao dar saída nele, volta ao valor anterior.',
      'Uma operação inválida mostra erro e não muda o contador como se tivesse dado certo.',
    ],
    recovery:
      'LWC implantado ainda precisa estar numa página e numa aba acessível. Se a FlexiPage falhar, compare o XML gerado com um exemplo válido da mesma API; não repita o mesmo deploy sem corrigir o arquivo.',
  },
  {
    id: 8,
    short: 'Desenhar o agente',
    title: 'Definir o comportamento do agente',
    phase: 'Conectar',
    mode: 'Planejar → executar',
    goal: 'Defina as quatro capacidades do agente e seus limites antes de conectar operações que alteram registros.',
    prompt: `Planeje um Employee Agent "Guest Management Agent", API Guest_Management_Agent, para apoiar a recepção em português.
Capacidades: consultar visitas/presentes; registrar entrada; registrar saída; enviar notificação de chegada ao anfitrião.
Antes de gravar, deve obter nome, anfitrião ativo resolvido para um único User e motivo válido. Para registro ambíguo, deve pedir esclarecimento; jamais escolher a primeira correspondência. Não invente visitantes, IDs ou confirmação de sucesso.
Mostre a tabela de ações com entradas, saídas e classe Apex alvo. Use as regras da etapa 6, sem duplicá-las no texto do agente.
Confira qual caminho de criação está disponível nesta org. Prefira Agent Script/authoring bundle se suportado; registre o caminho escolhido para mantê-lo nas próximas etapas. Se só o Builder estiver disponível, use suas ações equivalentes e registre essa diferença.
Após minha aprovação, crie o rascunho/configuração inicial. As implementações e os vínculos das ações serão concluídos na etapa 9; não declare o agente funcional ainda.`,
    checks: [
      'O rascunho tem identidade, instruções e um plano explícito para as quatro ações.',
      'Você sabe qual caminho será usado: Agent Script ou Builder, conforme os recursos da org.',
    ],
    recovery:
      'Se Employee Agent ou o editor necessário não estiver disponível, pare neste checkpoint e verifique o provisionamento com o facilitador. Não troque silenciosamente por um agente de outro tipo. Erro no bundle exige comparar o descriptor com o formato suportado pela versão instalada.',
  },
  {
    id: 9,
    short: 'Conectar as ações',
    title: 'Ligar o agente aos registros reais',
    phase: 'Conectar',
    mode: 'Planejar → executar',
    goal: 'Conecte as ações e preserve o registro correto entre turnos. Esta é a etapa mais importante para evitar uma demonstração que apenas parece funcionar.',
    prompt: `Implemente e conecte as ações do Guest_Management_Agent conforme o plano aprovado:
1. Consultar: buscar visitas e presentes, retornando dados reais e IDs completos.
2. Check-in: resolver anfitrião ativo sem ambiguidade, validar os campos e criar uma visita CheckedIn.
3. Check-out: identificar uma única visita presente e preencher a saída. Se ela já tiver saído, informar a situação sem sobrescrever o horário da primeira saída.
4. Notificar anfitrião: enviar uma Custom Notification Guest_Arrival ao Host__c da visita, com o registro como destino. Não substitua envio real por uma mensagem de sucesso.
Use Apex invocable, compartilhamento e CRUD/FLS. As ações de gravação retornam isSuccess, errorMessage e o guestRecordId real quando aplicável. Teste sucesso, falha e resultados ambíguos.
Para “notifique o anfitrião dele” ou “dê saída nele”, capture guestRecordId retornado pelo check-in em uma variável e vincule-a diretamente à ação seguinte. Não deixe o modelo reconstruir ou completar o Id. Em Agent Script, use string para IDs e mantenha sucesso/erro disponíveis ao raciocínio.
Se o usuário citar outro visitante pelo nome, faça nova resolução e não reutilize o último Id por padrão. Se houver múltiplos candidatos, peça uma informação adicional. Não escolha o primeiro.
Após minha aprovação, implante dependências e ações, conecte-as ao agente e valide. Para Agent Script, publique o bundle em uma nova versão; para Builder, confirme a versão equivalente. Registre o número da versão. A ativação e o acesso vêm na próxima etapa.`,
    checks: [
      'As quatro ações têm implementações implantadas e vínculos válidos no agente.',
      'Uma consulta retorna os mesmos registros que a org, e cada mutação só retorna sucesso após concluir.',
      'A versão publicada existe; o identificador da visita recente é passado diretamente entre ações.',
    ],
    recovery:
      'Se o agente gerar Id inválido, inspecione entrada, saída e vínculo da ação; mais texto no prompt pode não resolver. Para notificação, confira o tipo e o destinatário reais. No projeto DX, o arquivo do tipo fica em notificationtypes/Guest_Arrival.notiftype-meta.xml. Confira o formato na referência técnica.',
  },
  {
    id: 10,
    short: 'Liberar e ativar',
    title: 'Dar acesso e ativar a versão certa',
    phase: 'Conectar',
    mode: 'Executar',
    goal: 'Publicar, ativar e permitir acesso são operações diferentes. Confira as três antes dos testes de conversa.',
    prompt: `Atualize Guest_Management_App_Access com acesso às classes Apex realmente usadas pelo LWC e pelas ações do Guest_Management_Agent. Não inclua classes inexistentes ou de teste.
Adicione o acesso ao agente pelo formato suportado pela org. Em metadata de PermissionSet com agentAccesses, valide a referência agentName com o nome de API correto.
Faça deploy e confirme a atribuição ao usuário que executará o agente. Confira também as permissões do contexto de execução aplicável, sem ampliar o acesso global.
Localize a versão publicada na etapa 9, ative essa versão na org de treinamento e confirme seu status. Abra o ponto de entrada/preview disponível e registre qual versão será testada. Se uma versão anterior estiver ativa, informe a diferença antes de substituí-la.`,
    checks: [
      'O usuário tem acesso às classes, ao objeto, aos campos e ao agente.',
      'A versão pretendida está ativa e uma conversa pode ser iniciada no ponto de entrada disponível.',
    ],
    recovery:
      'Se o agente está publicado mas não aparece, confira ativação e acesso separadamente. No permission set, não substitua agentName por um elemento inventado. No preview, identifique se está testando um rascunho ou a versão ativa.',
  },
  {
    id: 11,
    short: 'Testar conversas',
    title: 'Testar a conversa e a mudança na org',
    phase: 'Validar',
    mode: 'Conversa + evidências',
    goal: 'Execute a matriz de testes abaixo no agente da aplicação. O Vibes ajuda a preparar os dados e verificar o resultado; uma resposta fluente não basta.',
    prompt: `Ajude-me a executar a matriz de testes deste guia no Guest_Management_Agent.
Primeiro consulte a contagem atual de CheckedIn e prepare nomes fictícios únicos para os testes, sem alterar a amostra WKS. Identifique um anfitrião ativo acessível e informe seu nome de exibição para eu usar na conversa.
Para cada teste, registre: frase enviada, versão do agente, ação acionada, resultado esperado, resultado observado e evidência na org. Teste consulta, check-in completo, informações faltantes, checkout genérico, visitante inexistente, homônimos, sequência check-in → notificar → checkout e mudança para outro visitante.
Para a notificação, a evidência inclui recebimento no sino do usuário anfitrião; teste Apex com envio simulado não comprova entrega.
Se você não tiver ferramenta de conversa com o agente, forneça as frases para eu executar no preview/UI e aguarde o resultado. Não simule execução nem marque “passou” sem evidência.`,
    checks: [
      'A matriz foi executada e cada linha tem evidência; resultados não executados estão identificados.',
      'Na sequência completa, entrada, notificação e saída apontam para o mesmo registro.',
      'Nenhum registro incorreto é alterado em testes de ambiguidade ou troca de visitante.',
    ],
    recovery:
      'Separe erro de entendimento, erro de permissão e erro da ação usando o trace. Compare inputs e outputs com o registro consultado. Se o envio foi simulado em teste unitário, ainda falta conferir o sino na org.',
  },
  {
    id: 12,
    short: 'Corrigir e repetir',
    title: 'Corrigir a causa, depois repetir o teste',
    phase: 'Validar',
    mode: 'Planejar → executar',
    goal: 'Faça uma alteração pequena por vez e repita também o que já passava. Conversas com vários turnos expõem erros que testes isolados não mostram.',
    prompt: `Revise apenas os testes que falharam na etapa 11. Para cada um, mostre a evidência e classifique a causa: instrução, metadado, permissão, resolução de registro, ação ou estado da conversa.
Proponha a menor correção. Não tente resolver um vínculo de Id quebrado apenas com mais instruções. Preserve o contexto recente somente quando a ação anterior realmente tiver sucesso; descarte ou atualize esse contexto quando o alvo mudar ou a visita for encerrada.
Se usar before_reasoning/after_reasoning em Agent Script, confirme no trace que a transição desejada executa a limpeza de estado. Não assuma que ela aconteceu.
Após minha aprovação, implemente, rode os testes afetados, publique uma nova versão se necessário, ative-a e registre a versão.
Repita a matriz inteira em uma conversa nova e as sequências de vários turnos. Gere um resumo com passou/falhou/não executado e evidências, incluindo limitações restantes.`,
    checks: [
      'Falhas foram corrigidas e a matriz foi repetida na nova versão.',
      'Pedir outro visitante depois de um check-in não reutiliza o registro anterior.',
      'O relatório diferencia teste aprovado, falha e verificação não executada.',
    ],
    recovery:
      'Se uma correção regredir outra ação, retorne à última versão funcional registrada, preserve a evidência da falha e corrija o vínculo específico. Teste em conversa nova para não confundir estado antigo com código novo.',
  },
  {
    id: 13,
    short: 'Expandir e demonstrar',
    title: 'Escolher uma melhoria e demonstrar',
    phase: 'Validar',
    mode: 'Explorar',
    goal: 'Conclua com uma melhoria pequena e verificável. O sistema básico já deve funcionar antes de abrir novas frentes.',
    prompt: `O fluxo principal do Guest Management App passou pela matriz de testes. Proponha uma melhoria de escopo pequeno usando os componentes que já existem: filtro por anfitrião, busca de visitantes, visualização da duração das visitas concluídas ou prevenção de crachá duplicado entre visitas presentes.
Para cada opção, mostre o benefício, os componentes alterados e um critério de aceite observável. Aguarde minha escolha.
Implemente apenas a opção escolhida após aprovação, atualize os testes pertinentes e faça deploy. Repita o fluxo consulta → entrada → notificação → saída e registre a demonstração final, a versão do agente e as limitações conhecidas.`,
    checks: [
      'A melhoria escolhida satisfaz seu critério de aceite.',
      'O fluxo principal continua funcionando e o grupo consegue explicar o que cada ação alterou na org.',
    ],
    recovery:
      'Se a extensão ameaçar o tempo da aula, preserve o sistema principal funcional e documente a ideia para depois. MuleSoft e OmniStudio são trilhas separadas: exigem provisionamento próprio e não são pré-requisito de conclusão deste workshop.',
  },
];

export const fields = [
  ['Name', 'Text (padrão)', 'Nome do visitante; obrigatório.'],
  ['Host__c', 'Lookup → User', 'Anfitrião ativo; obrigatório.'],
  ['Check_In_Time__c', 'DateTime', 'Horário da entrada.'],
  [
    'Check_Out_Time__c',
    'DateTime',
    'Horário da saída, nunca anterior à entrada.',
  ],
  [
    'Status__c',
    'Picklist restrita',
    'Expected · CheckedIn · CheckedOut · NoShow · Cancelled',
  ],
  [
    'Visit_Purpose__c',
    'Picklist restrita',
    'Meeting · Interview · Delivery · Maintenance · Other; obrigatório.',
  ],
  ['Badge_Number__c', 'Text(10)', 'Crachá; opcional.'],
  ['Company__c', 'Text(100)', 'Empresa; opcional.'],
  ['Guest_Email__c', 'Email', 'E-mail; opcional.'],
  [
    'Visit_Duration_Minutes__c',
    'Formula: Number(1 decimal)',
    'Minutos entre entrada e saída; em branco antes da saída.',
  ],
];

export const scenarios = [
  [
    'Consulta',
    'Quem está no prédio agora?',
    'Lista apenas CheckedIn; nomes e quantidade correspondem à consulta na org.',
  ],
  [
    'Dados faltantes',
    'Registre a entrada de Marina Teste.',
    'Pede anfitrião e motivo antes de gravar. Nenhum registro incompleto é criado.',
  ],
  [
    'Entrada completa',
    'Registre a entrada de Marina Teste para uma reunião com [anfitrião ativo].',
    'Uma visita é criada com nome, Host, Meeting e entrada; status CheckedIn. Anote o Id retornado.',
  ],
  [
    'Contexto: notificar',
    'Notifique o anfitrião dela.',
    'Na mesma conversa, usa o registro recém-criado. O anfitrião recebe a notificação no sino.',
  ],
  [
    'Contexto: saída',
    'Agora registre a saída dela.',
    'O mesmo registro recebe saída, CheckedOut e duração. O contador volta ao valor inicial.',
  ],
  [
    'Pedido genérico',
    'Dê saída em um visitante.',
    'Em conversa nova, pede identificação; não escolhe alguém por conta própria.',
  ],
  [
    'Nenhum resultado',
    'Dê saída em Pessoa Inexistente ZZZ.',
    'Informa que não encontrou uma visita; não altera outro registro.',
  ],
  [
    'Homônimos',
    'Dê saída em Alex Teste.',
    'Prepare duas visitas presentes com esse nome e anfitriões/crachás distintos: o agente deve desambiguar, sem alterar nenhuma antes disso.',
  ],
  [
    'Troca de alvo',
    'Após entrar Marina Teste: dê saída em Bruno Teste.',
    'Prepare Bruno presente. Altera somente Bruno; a visita recente de Marina permanece CheckedIn.',
  ],
  [
    'Repetição',
    'Repita a saída do visitante que já saiu.',
    'Informa a situação atual ou retorna erro útil, sem alterar o horário da primeira saída.',
  ],
];

export const troubleshooting = [
  {
    title: 'A org não aparece ou o Vibes não termina de carregar',
    text: 'Confira a sessão Salesforce e a org autorizada. Aguarde o carregamento inicial; se ficar travado, atualize uma vez ou reabra o Vibes pela org. Se persistir, peça ao facilitador para verificar provisionamento e autorização. Não troque de org só para fazer a tela avançar.',
  },
  {
    title: 'MCP desconectado, erro 401 ou sessão 404',
    text: 'Confira a ativação na org e o servidor em Toolkit → MCP Servers (ou Configure/Settings, conforme a interface). Para 401, renove a autorização; para sessão expirada/404, reconecte o servidor e reabra a sessão. Faça uma consulta simples para verificar a recuperação. Se persistir, registre o erro com o facilitador.',
  },
  {
    title: 'O deploy falhou e várias etapas ficaram bloqueadas',
    text: 'Peça o primeiro erro, o arquivo e a linha. Corrija a dependência ou o metadado inválido e faça deploy apenas do conjunto necessário. Um arquivo malformado pode bloquear a leitura do projeto, mesmo quando outro componente é o alvo. Não apague o projeto nem recrie tudo.',
  },
  {
    title: 'A análise de código não está disponível',
    text: 'Registre “não executada” e a causa. Execute os testes Apex e a validação de deploy disponíveis, mas não os apresente como substitutos da análise estática. O facilitador pode executar a verificação em um ambiente preparado e anexar o resultado.',
  },
  {
    title: 'O agente responde, mas os dados não mudam',
    text: 'Inspecione se uma ação realmente foi chamada, com quais inputs, e se retornou sucesso. Confira permissão, versão ativa e consulta ao registro. Texto de confirmação do agente não comprova gravação ou envio de notificação.',
  },
  {
    title: 'Não consigo sair do erro durante a aula',
    text: 'Registre etapa, erro e última evidência válida. Peça ao facilitador para retomar o último checkpoint do projeto. Se uma alternativa por CLI for necessária, documente a intervenção; não marque a etapa como concluída exclusivamente pelo Vibes.',
  },
];
