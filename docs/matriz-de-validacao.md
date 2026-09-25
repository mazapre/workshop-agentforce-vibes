# Ficha de validação — Guest Management Agent

Data: ______  Participante: ______

Alias da org (sem credenciais): ______

Versão publicada: ______  Versão ativa: ______

Ponto de entrada usado (preview/app): ______

Contagem inicial de presentes: ______

## Preparação

Use dados fictícios e um anfitrião ativo. Execute entrada → notificação → saída na mesma conversa. Para casos independentes, abra uma conversa nova. Use nomes/sufixos novos em cada rodada para evitar duplicidades acidentais. Não publique IDs, registros de conversa internos ou dados reais nesta ficha em repositórios públicos.

## Consulta

**Frase / preparação:** Quem está no prédio agora?

**Esperado:** Lista apenas CheckedIn; nomes e quantidade correspondem à consulta na org.

- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado
- Ação e versão observadas: ______
- Evidência na org (registre no canal privado da turma): ______
- Observação / correção necessária: ______

## Dados faltantes

**Frase / preparação:** Registre a entrada de Marina Teste.

**Esperado:** Pede anfitrião e motivo antes de gravar. Nenhum registro incompleto é criado.

- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado
- Ação e versão observadas: ______
- Evidência na org (registre no canal privado da turma): ______
- Observação / correção necessária: ______

## Entrada completa

**Frase / preparação:** Registre a entrada de Marina Teste para uma reunião com [anfitrião ativo].

**Esperado:** Uma visita é criada com nome, Host, Meeting e entrada; status CheckedIn. Anote o Id retornado.

- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado
- Ação e versão observadas: ______
- Evidência na org (registre no canal privado da turma): ______
- Observação / correção necessária: ______

## Contexto: notificar

**Frase / preparação:** Notifique o anfitrião dela.

**Esperado:** Na mesma conversa, usa o registro recém-criado. O anfitrião recebe a notificação no sino.

- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado
- Ação e versão observadas: ______
- Evidência na org (registre no canal privado da turma): ______
- Observação / correção necessária: ______

## Contexto: saída

**Frase / preparação:** Agora registre a saída dela.

**Esperado:** O mesmo registro recebe saída, CheckedOut e duração. O contador volta ao valor inicial.

- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado
- Ação e versão observadas: ______
- Evidência na org (registre no canal privado da turma): ______
- Observação / correção necessária: ______

## Pedido genérico

**Frase / preparação:** Dê saída em um visitante.

**Esperado:** Em conversa nova, pede identificação; não escolhe alguém por conta própria.

- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado
- Ação e versão observadas: ______
- Evidência na org (registre no canal privado da turma): ______
- Observação / correção necessária: ______

## Nenhum resultado

**Frase / preparação:** Dê saída em Pessoa Inexistente ZZZ.

**Esperado:** Informa que não encontrou uma visita; não altera outro registro.

- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado
- Ação e versão observadas: ______
- Evidência na org (registre no canal privado da turma): ______
- Observação / correção necessária: ______

## Homônimos

**Frase / preparação:** Dê saída em Alex Teste.

**Esperado:** Prepare duas visitas presentes com esse nome e anfitriões/crachás distintos: o agente deve desambiguar, sem alterar nenhuma antes disso.

- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado
- Ação e versão observadas: ______
- Evidência na org (registre no canal privado da turma): ______
- Observação / correção necessária: ______

## Troca de alvo

**Frase / preparação:** Após entrar Marina Teste: dê saída em Bruno Teste.

**Esperado:** Prepare Bruno presente. Altera somente Bruno; a visita recente de Marina permanece CheckedIn.

- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado
- Ação e versão observadas: ______
- Evidência na org (registre no canal privado da turma): ______
- Observação / correção necessária: ______

## Repetição

**Frase / preparação:** Repita a saída do visitante que já saiu.

**Esperado:** Informa a situação atual ou retorna erro útil, sem alterar o horário da primeira saída.

- Resultado: [ ] Passou  [ ] Falhou  [ ] Não executado
- Ação e versão observadas: ______
- Evidência na org (registre no canal privado da turma): ______
- Observação / correção necessária: ______

## Encerramento

- [ ] Os horários, status e duração da visita estão coerentes.
- [ ] A notificação chegou ao sino do anfitrião.
- [ ] Os testes de ambiguidade não alteraram o registro errado.
- [ ] O contador bate com a consulta na org.
- [ ] A matriz foi repetida após as correções.

Limitações e verificações não executadas: ______
