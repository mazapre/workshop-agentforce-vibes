import { writeFile } from 'node:fs/promises';
import { steps, scenarios, fields } from '../content/workshop.ts';

const prompts = [
  '# Agentforce Vibes — os 13 prompts',
  'Revisão: 25/09/2026. Material de apoio ao roteiro em https://github.com/mazapre/workshop-agentforce-vibes.',
  'Use a org de treinamento. Revise o plano antes de executar. Guarde a evidência de cada etapa; não publique credenciais ou dados da org.',
  '## Contrato de dados',
  'Objeto: Guest_Check_In__c. Dez campos de negócio, incluindo Name.',
  '| Campo | Tipo | Uso |\n| --- | --- | --- |\n' +
    fields.map((row) => `| ${row.join(' | ')} |`).join('\n'),
  ...steps.flatMap((step) => [
    `## ${step.id}. ${step.title}`,
    `**${step.phase} · ${step.mode}**\n\n${step.goal}`,
    '```text\n' + step.prompt + '\n```',
    ...(step.mode === 'Planejar → executar'
      ? [
          'Depois de revisar o plano: “Pode implementar o plano aprovado, fazer deploy na org de treinamento e executar as validações desta etapa.”',
        ]
      : []),
    '### Só avance quando\n\n' +
      step.checks.map((check) => '- [ ] ' + check).join('\n'),
    '**Se travar:** ' + step.recovery,
  ]),
  'Texto e prompts reescritos a partir do cenário e sequência do workshop de JF Lucindo: https://jflucindo.github.io/workshop-agentforce-vibes/. Consulte também as referências oficiais da página.',
].join('\n\n');

const matrix = [
  '# Ficha de validação — Guest Management Agent',
  'Data: ______  Participante: ______\n\nAlias da org (sem credenciais): ______\n\nVersão publicada: ______  Versão ativa: ______\n\nPonto de entrada usado (preview/app): ______\n\nContagem inicial de presentes: ______',
  '## Preparação',
  'Use dados fictícios e um anfitrião ativo. Execute entrada → notificação → saída na mesma conversa. Para casos independentes, abra uma conversa nova. Use nomes/sufixos novos em cada rodada para evitar duplicidades acidentais. Não publique IDs, registros de conversa internos ou dados reais nesta ficha em repositórios públicos.',
  ...scenarios.map(
    ([name, phrase, expected]) =>
      `## ${name}\n\n**Frase / preparação:** ${phrase}\n\n**Esperado:** ${expected}\n\n- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado\n- Ação e versão observadas: ______\n- Evidência na org (registre no canal privado da turma): ______\n- Observação / correção necessária: ______`,
  ),
  '## Encerramento',
  '- [ ] Os horários, status e duração da visita estão coerentes.\n- [ ] A notificação chegou ao sino do anfitrião.\n- [ ] Os testes de ambiguidade não alteraram o registro errado.\n- [ ] O contador bate com a consulta na org.\n- [ ] A matriz foi repetida após as correções.\n\nLimitações e verificações não executadas: ______',
].join('\n\n');

await writeFile(
  new URL('../public/prompts-do-workshop.md', import.meta.url),
  prompts + '\n',
);
await writeFile(
  new URL('../public/matriz-de-validacao.md', import.meta.url),
  matrix + '\n',
);
console.log('Generated prompts and validation worksheet.');
