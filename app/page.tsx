/* oxlint-disable jsx-a11y/no-noninteractive-tabindex -- The two horizontally scrollable tables must accept keyboard focus. */
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Terminal,
  Layers,
  Download,
  ArrowRight,
} from 'lucide-react';
import { CopyPrompt } from '@/components/copy-prompt';
import { GuideFigure } from '@/components/guide-figure';
import { steps, fields, scenarios, troubleshooting } from '@/content/workshop';

export const dynamic = 'force-static';

const groups = [
  { label: '01 / PREPARAR', from: 1, to: 1 },
  { label: '02 / CONSTRUIR', from: 2, to: 7 },
  { label: '03 / CONECTAR', from: 8, to: 10 },
  { label: '04 / VALIDAR', from: 11, to: 13 },
];

function FieldContract() {
  return (
    <div className="reference-block">
      <h3>O mesmo contrato em todas as etapas</h3>
      <p>
        Nome de API do objeto: <code>Guest_Check_In__c</code>. São dez campos de
        negócio; Id, CreatedDate e outros campos de sistema não entram nesse
        limite.
      </p>
      <section
        className="table-scroll"
        tabIndex={0}
        aria-label="Campos do objeto de visitantes"
      >
        <table>
          <caption>Modelo de dados do laboratório</caption>
          <thead>
            <tr>
              <th scope="col">Campo</th>
              <th scope="col">Tipo</th>
              <th scope="col">Uso</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(([name, type, use]) => (
              <tr key={name}>
                <th scope="row">
                  <code>{name}</code>
                </th>
                <td>{type}</td>
                <td>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="small-note">
        Rótulos podem estar traduzidos na org. Nos prompts, Apex e integrações,
        mantenha os valores de API exatamente como definidos.
      </p>
    </div>
  );
}

function TestMatrix() {
  return (
    <div className="reference-block">
      <h3>Matriz de testes de conversa</h3>
      <p>
        Envie estas frases ao <strong>Guest Management Agent</strong>. Substitua
        o texto entre colchetes pelo nome de um anfitrião ativo. Cada teste
        independente começa numa conversa nova; mantenha entrada → notificação →
        saída na mesma conversa.
      </p>
      <section
        className="table-scroll"
        tabIndex={0}
        aria-label="Cenários de teste do agente"
      >
        <table className="test-table">
          <caption>O que pedir e qual evidência procurar</caption>
          <thead>
            <tr>
              <th scope="col">Caso</th>
              <th scope="col">Frase / preparação</th>
              <th scope="col">Resultado esperado</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map(([name, phrase, expected]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>{phrase}</td>
                <td>{expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="small-note">
        Use um novo nome ou sufixo em cada rodada. Evite criar homônimos
        acidentais quando o objetivo for testar um visitante único. Para
        homônimos, use crachá/anfitrião como esclarecimento ou a linha
        específica da UI.
      </p>
      <a className="text-link" href="./matriz-de-validacao.md" download>
        <Download size={16} /> Baixar ficha para registrar os resultados
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="topbar">
        <a className="brand" href="#inicio">
          <span className="brand-icon">
            <Layers size={20} />
          </span>{' '}
          Agentforce <strong>Vibes</strong>
          <span className="edition">GUIA DE LABORATÓRIO</span>
        </a>
        <a
          className="source-link"
          href="https://github.com/mazapre/workshop-agentforce-vibes"
        >
          GitHub <ArrowUpRight size={16} />
        </a>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <p className="eyebrow">SEU ROTEIRO</p>
          <nav aria-label="Roteiro do workshop">
            <a href="#inicio">Visão geral</a>
            <a href="#pre-work">Antes de começar</a>
            {groups.map((group) => (
              <div className="nav-section" key={group.label}>
                <p className="nav-group">{group.label}</p>
                {steps
                  .filter(
                    (step) => step.id >= group.from && step.id <= group.to,
                  )
                  .map((step) => (
                    <a key={step.id} href={`#etapa-${step.id}`}>
                      <span className="nav-number">
                        {String(step.id).padStart(2, '0')}
                      </span>
                      {step.short}
                    </a>
                  ))}
              </div>
            ))}
            <div className="nav-extras">
              <a href="#destravar">Preciso destravar</a>
              <a href="#facilitador">Para quem facilita</a>
              <a href="#referencias">Referências</a>
            </div>
          </nav>
          <div className="sidebar-note">
            <Terminal size={19} />
            <p>
              Planeje. Construa.
              <br />
              <strong>Confira na org.</strong>
            </p>
          </div>
        </aside>
        <main id="conteudo">
          <section id="inicio" className="intro">
            <p className="eyebrow accent">WORKSHOP PRÁTICO · SALESFORCE</p>
            <h1>
              Da recepção
              <br />
              ao agente de IA.
            </h1>
            <p className="lead">
              Construa um sistema de gestão de visitantes com Agentforce Vibes.
              Treze etapas com prompts prontos para usar, resultados esperados e
              ajuda quando algo não sair como planejado.
            </p>
            <div className="intro-meta">
              <span>13 etapas</span>
              <span>Português</span>
              <span>App + Apex + LWC + Agentforce</span>
            </div>
            <div className="intro-actions">
              <a className="primary-link" href="#pre-work">
                Preparar meu ambiente <ChevronRight size={18} />
              </a>
              <a className="text-link" href="#etapa-1">
                Já fiz o setup <ArrowRight size={16} />
              </a>
            </div>
            <div className="journey" aria-label="Quatro fases do workshop">
              <span>
                <b>01</b> Preparar
              </span>
              <ArrowRight size={16} />
              <span>
                <b>02</b> Construir
              </span>
              <ArrowRight size={16} />
              <span>
                <b>03</b> Conectar
              </span>
              <ArrowRight size={16} />
              <span>
                <b>04</b> Validar
              </span>
            </div>
          </section>
          <section className="how-to" aria-labelledby="como-usar">
            <h2 id="como-usar">Uma etapa, uma evidência.</h2>
            <p>
              A recepção precisa saber quem chegou, quem está no prédio e quem
              já saiu. Você vai transformar esse cenário em dados, regras, uma
              tela e um agente que executa ações reais.
            </p>
            <ol className="workflow">
              <li>
                <b>Leia e planeje.</b> Copie o prompt no Vibes. Revise o plano e
                a org de destino.
              </li>
              <li>
                <b>Execute e implante.</b> Nas etapas “Planejar → executar”,
                aprove o plano antes de pedir a implementação e o deploy.
              </li>
              <li>
                <b>Confira na org.</b> Use o bloco “Só avance quando”. Guarde a
                evidência e o último estado funcional.
              </li>
            </ol>
            <p className="small-note">
              Os nomes dos controles podem variar: Plan/Act ou os modos
              equivalentes de planejamento e execução. Use o modelo disponível
              para o treinamento; não há dependência de uma versão específica de
              modelo.
            </p>
            <div className="role-note">
              <span className="label">DOIS AGENTES, DOIS PAPÉIS</span>
              <p>
                <strong>Vibes</strong> ajuda você a construir.{' '}
                <strong>Guest Management Agent</strong> é o agente que você
                construirá e testará a partir da etapa 8.
              </p>
            </div>
          </section>
          <section id="pre-work" className="prework">
            <div className="section-heading">
              <span className="section-tag">ANTES DE COMEÇAR</span>
              <h2>Um ambiente pronto evita uma aula travada.</h2>
            </div>
            <p>
              Use a org de treinamento e as credenciais entregues pelo
              facilitador. Se já concluiu parte do setup, confira os itens
              restantes.
            </p>
            <p className="small-note">
              As capturas mostram uma execução de referência com dados fictícios.
              Use-as para localizar os controles; a interface, os nomes dos
              visitantes, os contadores e as versões podem variar na sua org.
              Clique em qualquer imagem para ampliar.
            </p>
            <ol className="setup-list">
              <li>
                <strong>Entrar e confirmar o acesso</strong>
                <p>
                  Acesse{' '}
                  <a href="https://login.salesforce.com">
                    login.salesforce.com
                  </a>{' '}
                  ou o endereço fornecido para a turma. Confirme que está na org
                  correta e consegue abrir o Setup. O facilitador deve garantir
                  o provisionamento de Agentforce, Employee Agent e Vibes para
                  este laboratório.
                </p>
              </li>
              <li>
                <strong>Ativar os recursos da org</strong>
                <p>
                  No Setup, procure{' '}
                  <b>API Catalog → MCP Servers → Salesforce Servers</b> e ative{' '}
                  <code>metadata-experts</code> e{' '}
                  <code>salesforce-api-context</code>, se ainda não estiverem
                  ativos. Em <b>Agentforce Agents</b>, confirme que o Agentforce
                  está <b>On</b>.
                </p>
                <GuideFigure
                  file="prework-mcp-ativos.png"
                  title="Os dois servidores MCP ativos"
                  alt="Setup, MCP Servers, aba Salesforce Servers: metadata-experts e salesforce-api-context com status Active."
                  caption="Confira o status Active nas duas linhas. A ordenação e a largura das colunas foram ajustadas nesta tela para facilitar a leitura; os demais servidores não são necessários para este roteiro."
                />
                <GuideFigure
                  file="prework-agentforce-on.png"
                  title="Agentforce ligado na org"
                  alt="Setup, Agentforce Agents, com a chave Agentforce marcada como On."
                  caption="O ponto a conferir é a chave On no topo. O Guest Management Agent aparece porque esta captura foi feita após o laboratório; você só vai criá-lo a partir da etapa 8."
                />
              </li>
              <li>
                <strong>Abrir o Vibes e conectar o projeto</strong>
                <p>
                  Na engrenagem do Salesforce, abra <b>Agentforce Vibes</b>, se
                  disponível nesse ambiente. Conclua autenticação, seleção da
                  org e eventual aceite dos termos por quem tem autorização.
                  Espere o workspace carregar e confirme a org conectada no
                  projeto.
                </p>
                <GuideFigure
                  file="prework-abrir-vibes.png"
                  title="Onde abrir o Agentforce Vibes"
                  alt="Menu da engrenagem do Salesforce aberto, com Agentforce Vibes entre Your Account e Developer Console."
                  caption="Na engrenagem, procure Agentforce Vibes. O app de recepção ao fundo é o resultado do laboratório, não um requisito para abrir o workspace."
                />
              </li>
              <li>
                <strong>Verificar as ferramentas</strong>
                <p>
                  Em <b>Toolkit → MCP Servers</b> (ou Configure/Settings),
                  confirme Salesforce DX, Metadata Experts e Salesforce API
                  Context conectados. Habilite as skills Salesforce pertinentes
                  disponíveis. Faça a consulta da etapa 1 para comprovar acesso.{' '}
                  <a href="https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-mcp-servers.html">
                    Referência oficial de MCPs
                  </a>
                  .
                </p>
              </li>
            </ol>
            <div className="callout">
              <strong>Pronto para começar quando…</strong>
              <p>
                Você acessa a org, abre o projeto no Vibes e consegue consultar
                seus metadados. Salve credenciais no canal da turma, nunca nos
                prompts, arquivos públicos ou commits.
              </p>
            </div>
            <p className="small-note">
              Sem menu Vibes, Employee Agent ou servidor esperado? Isso precisa
              ser resolvido pelo facilitador antes da aula. Consulte{' '}
              <a href="#destravar">o diagnóstico rápido</a>. MuleSoft,
              OmniStudio e integrações externas não fazem parte deste pre-work.
            </p>
          </section>
          {steps.map((step) => (
            <section key={step.id} id={`etapa-${step.id}`} className="step">
              <div className="step-heading">
                <span className="step-number">
                  {String(step.id).padStart(2, '0')}
                </span>
                <div>
                  <p className="eyebrow">
                    {step.phase} · {step.mode}
                  </p>
                  <h2>{step.title}</h2>
                </div>
              </div>
              <p className="step-goal">{step.goal}</p>
              {step.id === 3 && <FieldContract />}
              <CopyPrompt number={step.id} text={step.prompt} />
              {step.mode === 'Planejar → executar' && (
                <p className="after-prompt">
                  <strong>Depois do plano:</strong> revise os nomes, as mudanças
                  e a org. Se estiver correto, peça: “Pode implementar o plano
                  aprovado, fazer deploy na org de treinamento e executar as
                  validações desta etapa.”
                </p>
              )}
              <div className="validation">
                <h3>
                  <Check size={18} /> Só avance quando
                </h3>
                <ul className="check-list">
                  {step.checks.map((check) => (
                    <li key={check}>
                      <span className="check-square" aria-hidden="true" />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {step.id === 3 && (
                <GuideFigure
                  file="etapa-03-campos.png"
                  title="Conferir os campos no Object Manager"
                  alt="Guest Check-In, Fields & Relationships: rótulos, nomes de API e tipos dos campos, incluindo Host como Lookup(User) e Status como Picklist."
                  caption="Em Object Manager → Guest Check-In → Fields & Relationships, compare nomes de API e tipos com a tabela desta etapa. Role a lista para conferir todos os campos; os campos de sistema também aparecem nela."
                />
              )}
              {step.id === 7 && (
                <GuideFigure
                  file="etapa-07-recepcao.png"
                  title="A recepção funcionando no app"
                  alt="Guest Reception com dois cartões de resumo, busca e tabela de visitantes fictícios com anfitrião, status e motivo da visita."
                  caption="Exemplo do LWC na org: contador de presentes, duração das visitas concluídas, busca e tabela. Nesta execução havia dois presentes; confira o contador contra os registros da sua própria org."
                />
              )}
              {step.id === 10 && (
                <GuideFigure
                  file="etapa-10-agente-ativo.png"
                  title="Identificar a versão ativa do agente"
                  alt="Agentforce Builder, Guest Management Agent, com Version 3 (Active) no cabeçalho e o fluxo visual em Agent Definition."
                  caption="Confira o nome do agente e o indicador Active no cabeçalho. Version 3 pertence à execução de referência: registre a versão publicada na sua org e valide seu comportamento na etapa 11."
                />
              )}
              <aside className="recovery">
                <strong>Se travar</strong>
                <p>{step.recovery}</p>
              </aside>
              {step.id === 4 && (
                <p className="small-note">
                  View All/Modify All neste objeto simplificam o laboratório.
                  Para uso real, redesenhe os acessos conforme as funções de
                  recepção, anfitrião e administração.
                </p>
              )}
              {step.id === 9 && (
                <p className="small-note">
                  Referências:{' '}
                  <a href="https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-actions.html">
                    ações e vínculos no Agent Script
                  </a>{' '}
                  ·{' '}
                  <a href="https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-nga-publish.html">
                    publicação de authoring bundles
                  </a>{' '}
                  ·{' '}
                  <a href="https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json">
                    registro de tipos de metadados
                  </a>
                  .
                </p>
              )}
              {step.id === 11 && <TestMatrix />}
              <div className="step-footer">
                <span>ETAPA {String(step.id).padStart(2, '0')} / 13</span>
                <a href={step.id < 13 ? `#etapa-${step.id + 1}` : '#conclusao'}>
                  {step.id < 13 ? 'Próxima etapa' : 'Conferir a entrega'}{' '}
                  <ArrowRight size={16} />
                </a>
              </div>
            </section>
          ))}
          <section id="conclusao" className="finish">
            <span className="section-tag">A ENTREGA</span>
            <h2>Você consegue demonstrar o fluxo inteiro?</h2>
            <p>
              Abra o app, confira os presentes, registre uma entrada pelo
              agente, receba a notificação e dê saída na mesma visita. Depois
              confira horários, status, duração e contador na org.
            </p>
            <ul className="check-list">
              {[
                'App e tela acessíveis; objeto, dados e permissões consistentes.',
                'Regras e testes Apex passando; verificações indisponíveis registradas.',
                'Agente com versão identificada, publicada, ativa e acessível.',
                'Matriz de conversa concluída, com evidências e limitações conhecidas.',
              ].map((text) => (
                <li key={text}>
                  <Check size={18} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <p className="small-note">
              A quantidade de testes e a cobertura dependem do código gerado.
              Registre seus resultados; não use os números de outra execução
              como critério automático de aprovação.
            </p>
          </section>
          <section id="destravar" className="support">
            <span className="section-tag">QUANDO ALGO NÃO FUNCIONAR</span>
            <h2>Diagnóstico rápido</h2>
            <div className="troubleshooting">
              {troubleshooting.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section id="facilitador" className="facilitator">
            <span className="section-tag">PARA QUEM FACILITA</span>
            <h2>Prepare também o caminho de volta.</h2>
            <p>
              Antes da turma, ensaie em uma org limpa com o mesmo
              provisionamento. Reserve margem para autenticação, deploy e
              publicação do agente. Testar uma org confirma viabilidade nessa
              org, não garante todas as combinações de edição e release.
            </p>
            <div className="checkpoint-list">
              <div>
                <b>A / Etapas 1–4</b>
                <span>Projeto conectado, app, objeto e acesso.</span>
              </div>
              <div>
                <b>B / Etapas 5–7</b>
                <span>Dados, regras testadas e UI funcional.</span>
              </div>
              <div>
                <b>C / Etapas 8–10</b>
                <span>Ações conectadas, versão publicada e ativa.</span>
              </div>
              <div>
                <b>D / Etapas 11–13</b>
                <span>Matriz executada e demonstração concluída.</span>
              </div>
            </div>
            <p>
              Salve o projeto ou faça um commit após cada checkpoint. Registre
              também a versão do agente: um commit local, sozinho, não restaura
              a versão ativa nem os dados da org. Este repositório entrega o
              roteiro; não inclui um pacote Salesforce de recuperação
              previamente implantado.
            </p>
            <div className="download-row">
              <a className="text-link" href="./guia-do-facilitador.md" download>
                <Download size={16} /> Guia do facilitador
              </a>
              <a className="text-link" href="./prompts-do-workshop.md" download>
                <Download size={16} /> Os 13 prompts em Markdown
              </a>
            </div>
            <div className="callout">
              <strong>Extensões opcionais</strong>
              <p>
                MuleSoft para integrações ou OmniStudio para experiências
                guiadas exigem ambientes e permissões próprios. Planeje essas
                trilhas separadamente, depois que o fluxo principal estiver
                validado.
              </p>
            </div>
          </section>
          <footer id="referencias">
            <p className="eyebrow">ORIGEM E MANUTENÇÃO</p>
            <p>
              Roteiro independente inspirado no{' '}
              <a href="https://jflucindo.github.io/workshop-agentforce-vibes/">
                workshop de JF Lucindo
              </a>
              , com texto, prompts e interface reescritos para facilitar
              execução, validação e recuperação.
            </p>
            <p>
              Revisão editorial:{' '}
              <time dateTime="2026-09-25">25 de setembro de 2026</time>. Esta
              versão incorpora aprendizados de uma execução em org de
              treinamento. As novas instruções devem ser ensaiadas pelo
              facilitador antes de cada turma.
            </p>
            <div className="footer-links">
              <a href="https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-lexapp-overview.html">
                Documentação do Vibes <ArrowUpRight size={14} />
              </a>
              <a href="https://github.com/mazapre/workshop-agentforce-vibes">
                Editar no GitHub <ArrowUpRight size={14} />
              </a>
              <a href="#inicio">Voltar ao início ↑</a>
            </div>
            <p className="small-note">
              Material educacional da comunidade. Salesforce e Agentforce são
              marcas de seus respectivos titulares.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
