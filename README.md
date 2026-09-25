# Agentforce Vibes — workshop em 13 etapas

Página em português para construir uma aplicação Salesforce de gestão de visitantes, com Apex, LWC e um Employee Agent. Inclui prompts, critérios de aceite, diagnóstico de falhas, matriz de testes e material para o facilitador.

O foco da revisão são as **13 etapas**. O pre-work cobre apenas org, acesso, Vibes e MCPs necessários ao laboratório.

## Publicar no GitHub Pages

Os arquivos estáticos já estão versionados em `docs/`. Não é necessário executar Node.js no GitHub Pages nem configurar um Worker.

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **Deploy from a branch**.
3. Selecione **main**, pasta **/docs**, e clique em **Save**.
4. Aguarde o deploy do GitHub. A página ficará em https://mazapre.github.io/workshop-agentforce-vibes/.

O arquivo `docs/.nojekyll` preserva os assets gerados. A configuração usa o caminho `/workshop-agentforce-vibes`. Se renomear o repositório, atualize `assetPrefix` em `next.config.ts`, o caminho do favicon em `app/layout.tsx`, os prefixos em `scripts/prepare-pages.mjs`, `scripts/check-pages.mjs` e `scripts/preview-pages.mjs`, e os links do GitHub na página/README; gere `docs/` novamente.

Referência: [criar um site no GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). A ativação do Pages é uma ação separada; este repositório já contém os arquivos de publicação.

## Editar e gerar uma nova versão

Requer Node.js 22.13+ e npm. Use o lockfile do projeto.

```sh
npm ci
npm run dev
```

- `content/workshop.ts`: fonte principal das 13 etapas, campos, cenários e diagnóstico.
- `app/page.tsx`: estrutura da página, pre-work e orientações do facilitador.
- `app/globals.css`: estilo responsivo e impressão.
- `components/guide-figure.tsx`: imagens com texto alternativo, legenda e ampliação.
- `public/images/`: capturas reais usadas no pre-work e nas etapas 3, 7 e 10.
- `public/guia-do-facilitador.md`: material adicional para download.
- `scripts/handouts.mjs`: gera os prompts e a ficha de validação a partir do mesmo conteúdo da página.

Depois de editar:

```sh
npm run typecheck
npm run lint
npm run build
npm run check:pages
```

O build gera os materiais de apoio, exporta a página estática e substitui `docs/` pelos novos arquivos. Faça commit das fontes, do lockfile se alterado e de `docs/`; envie para `main`. Não edite `docs/` manualmente. Nenhum segredo ou configuração de org é necessário para gerar o site.

Para conferir o pacote estático localmente no caminho usado pelo Pages:

```sh
npm run preview:pages
```

Abra http://127.0.0.1:4173/workshop-agentforce-vibes/. O site tem apenas leitura, navegação e cópia de prompts; não se conecta à sua org, não recebe credenciais e não armazena progresso dos participantes.

## Escopo e validação

O roteiro incorpora aprendizados de uma execução em uma org de treinamento, incluindo problemas de metadados, permissões e contexto entre ações. A nova redação dos prompts não é um pacote Salesforce pré-validado: ensaie o roteiro completo numa org limpa antes de ministrar uma turma.

O número de testes e a cobertura dependem da implementação gerada. O guia exige evidências próprias e distingue verificações aprovadas, falhas e não executadas. Extensões com MuleSoft/OmniStudio não integram os critérios de conclusão.

O repositório não contém credenciais, dados reais, logs da org de referência ou o projeto Salesforce implantado. Os arquivos do site não devem ser usados para armazenar esse material.

## Origem e referências

Inspirado no cenário e sequência do [workshop original de JF Lucindo](https://jflucindo.github.io/workshop-agentforce-vibes/). Texto, prompts e interface foram reescritos. Não foram copiados screenshots ou o código da página original.

As seis imagens em `public/images/` foram capturadas em 25/09/2026 na org de treinamento usada na execução de referência. Mostram os MCPs ativos, Agentforce ligado, acesso ao Vibes, campos do objeto, LWC de recepção e versão ativa do agente. Os visitantes são fictícios. As capturas não incluem credenciais, URLs da org ou identificadores de sessão. Cada imagem tem legenda, texto alternativo e link para o arquivo original, sem depender de hospedagem externa.

As telas orientam a navegação e a conferência visual; não substituem a validação dos passos. O app já construído, os contadores e a versão 3 do agente refletem aquela execução e não são pré-requisitos nem valores esperados para toda turma. Ao atualizar uma imagem, preserve o nome do arquivo ou atualize a referência em `app/page.tsx`, confira seu conteúdo antes de publicá-la e gere `docs/` novamente.

- [MCPs no Agentforce Vibes](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-mcp-servers.html)
- [Construir um Lightning App com Vibes](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-lexapp-overview.html)
- [Ações no Agent Script](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-actions.html)
- [Publicar um authoring bundle](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx-nga-publish.html)
- [Registro de tipos de metadados Salesforce](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json)

Material independente da comunidade. Revisão editorial em 25/09/2026. O site foi estruturado com React, vinext, Tailwind e o starter de Sites; a entrega é uma exportação estática para GitHub Pages.
