# Guia do facilitador — Agentforce Vibes

Revisão: 25/09/2026. Apoio às 13 etapas do laboratório de gestão de visitantes.

## Antes da turma

- Ensaie o roteiro em uma org limpa com o mesmo provisionamento da turma. A execução de referência em uma org demonstrou viabilidade, mas esta revisão de prompts ainda exige ensaio próprio.
- Confirme acesso ao Setup, Agentforce, Employee Agent, Agentforce Vibes e aos MCPs Salesforce DX, Metadata Experts e Salesforce API Context. Os menus dependem da interface disponível.
- Entregue credenciais em canal privado. Não publique senhas, tokens, IDs ou logs de conversas internas no repositório do guia.
- Confirme um anfitrião ativo que possa receber Custom Notifications e abrir o sino. É necessário observar o recebimento real na etapa 11.
- No caminho de Vibes no navegador, não exija instalação local do participante sem necessidade. Se usar VS Code/CLI como contingência, prepare e valide esse ambiente antes.
- Separe eventuais aceites de termos para a pessoa autorizada. Não os deixe como bloqueio inesperado durante a aula.
- Reserve margem para carregamento do workspace, deploys, testes e publicação do agente. A duração depende do nível da turma e do provisionamento; meça no ensaio.

## Quatro checkpoints

| Checkpoint | Etapas | Evidência mínima                                                                           |
| ---------- | ------ | ------------------------------------------------------------------------------------------ |
| A          | 1–4    | App, objeto e permission set implantados; atribuição confirmada; usuário acessa a aba.     |
| B          | 5–7    | Amostra identificável; testes Apex passando; UI faz entrada/saída e atualiza o contador.   |
| C          | 8–10   | Quatro ações implementadas; IDs vinculados; versão do agente publicada, ativa e acessível. |
| D          | 11–13  | Matriz de conversas executada; notificações recebidas; regressões verificadas.             |

Após cada checkpoint, salve o projeto ou faça commit em um repositório de trabalho privado adequado à turma. Registre separadamente a versão publicada/ativa do agente e as alterações de dados.

Este repositório contém a página e o roteiro, não um pacote Salesforce de referência. Se quiser distribuir pontos de recuperação, produza-os no ensaio, valide-os em uma segunda org e documente as dependências e o modo de instalação. Um commit de código não restaura dados nem troca a versão ativa automaticamente.

## Durante a aula

1. Leia o objetivo da etapa, peça um plano e revise o escopo antes de executar.
2. Faça uma mudança por vez e evite deploys de componentes que não pertencem ao laboratório.
3. Confirme resultados na org; mensagens do Vibes ou do agente não são evidência suficiente.
4. Anote erros com etapa, arquivo, ação e versão, em local adequado às informações da turma.
5. Se usar CLI ou intervenção manual como recuperação, registre isso no relatório da execução.

## Pontos que merecem atenção

- **Modelo de dados:** Name + 9 campos personalizados são os 10 campos de negócio. Campos de sistema não entram no limite.
- **Dados:** a carga usa WKS-001…WKS-008 para evitar novas cópias ao repetir. Os status mudam durante testes; não sobrescreva a amostra para forçar uma contagem inicial.
- **Permissões:** View All/Modify All do objeto são uma simplificação do laboratório. Não adicione permissões globais como alternativa a um erro.
- **Agente:** publicar não é ativar; ativar não concede acesso. Registre qual versão está sendo testada.
- **Contexto:** o Id retornado pelo check-in deve ser capturado e vinculado à próxima ação; não peça ao modelo para reconstruí-lo.
- **Homônimos:** não permita escolha automática do primeiro resultado. Use anfitrião/crachá ou a linha específica da UI.
- **Notificação:** um mock em teste Apex não comprova entrega. Confira o sino do anfitrião real do teste.
- **Qualidade:** ferramenta de análise indisponível significa “não executada”. Não copie contagens/cobertura de outra execução como evidência.

## Conclusão e extensões

O participante deve demonstrar consulta → entrada → notificação → saída e conferir os registros, a duração e o contador. Após correções, repita a matriz em conversa nova e as sequências de vários turnos.

MuleSoft e OmniStudio precisam de provisionamento separado e ficam fora dos critérios de conclusão. Para a etapa 13, escolha uma única melhoria pequena e verificável.

## Fontes

- Roteiro original: https://jflucindo.github.io/workshop-agentforce-vibes/
- MCPs do Vibes: https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-mcp-servers.html
- Ações no Agent Script: https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-actions.html
- Publicação do bundle: https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-nga-publish.html
