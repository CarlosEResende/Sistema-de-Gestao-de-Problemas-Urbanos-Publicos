# Sistema de Gestão de Problemas Urbanos

## Visão Geral

O Sistema de Gestão de Problemas Urbanos é uma plataforma projetada para facilitar a comunicação entre cidadãos e a administração pública municipal, permitindo o registro, acompanhamento e resolução de questões urbanas. O objetivo principal é fornecer um canal direto e transparente para que os cidadãos reportem problemas em sua cidade e para que os agentes públicos possam gerenciar essas demandas de forma eficiente.

Este projeto, em sua fase atual, foca nas funcionalidades centrais de registro e gerenciamento, utilizando armazenamento de dados em memória para fins de demonstração e desenvolvimento.

## Conceito Principal

A ideia central é criar um fluxo onde:

1.  **Cidadãos** podem se cadastrar e registrar problemas que observam na cidade (ex: buracos em vias, falhas na iluminação pública, acúmulo de lixo).
2.  Os problemas registrados recebem um status inicial (ex: "Registrado").
3.  **Agentes Públicos** cadastrados têm acesso a todos os problemas reportados, podem analisá-los, atualizar seus status (ex: "Em Análise", "Em Andamento", "Resolvido", "Recusado") e adicionar comentários sobre o progresso.
4.  Os **Cidadãos** podem acompanhar o status e os comentários referentes aos problemas que registraram.
5.  Uma vez que um problema avança para um status de análise pelo agente público (ex: "Em Análise"), o cidadão não pode mais editar os detalhes originais do problema, garantindo que o agente trabalhe com informações consistentes.

## Perfis de Usuário

O sistema contempla dois tipos principais de usuários:

### 1. Cidadão

*   **Funcionalidades:**
    *   **Cadastro e Login:** Criar uma conta e acessar o sistema.
    *   **Registro de Problemas:** Submeter novos problemas urbanos, fornecendo detalhes como título, descrição, tipo de problema (categoria) e endereço.
    *   **Visualização dos Meus Problemas:** Acompanhar a lista de problemas que registrou, visualizando o status atual, histórico de atualizações e comentários dos agentes públicos.
    *   **Edição de Problemas (Limitada):** Editar os detalhes de um problema registrado, APENAS se o status ainda permitir (ex: "Registrado"). Após avançar para análise, a edição pelo cidadão é bloqueada.
    *   **Adição de Comentários (Limitada):** Poder adicionar comentários adicionais a um problema que registrou, sob certas condições de status.

### 2. Agente Público

*   **Funcionalidades:**
    *   **Cadastro e Login:** Acesso ao painel de gerenciamento (o cadastro de agentes pode, em uma versão futura, requerer aprovação administrativa).
    *   **Visualização de Todos os Problemas:** Acessar uma lista completa de todos os problemas urbanos registrados por todos os cidadãos.
    *   **Filtros e Busca:** Filtrar problemas por status, tipo, bairro (em futuras implementações), etc., para facilitar o gerenciamento.
    *   **Análise de Problemas:** Visualizar detalhes completos de cada problema.
    *   **Atualização de Status:** Modificar o status de um problema à medida que ele progride no fluxo de resolução (ex: de "Registrado" para "Em Análise", de "Em Análise" para "Em Andamento", etc.).
    *   **Adição de Comentários:** Registrar comentários a cada atualização de status ou sempre que necessário, informando o cidadão sobre as ações tomadas ou solicitando mais informações. Estes comentários podem ser internos ou visíveis ao cidadão.

## Fluxo de um Problema

1.  **Registro:** Um cidadão registra um novo problema. O status inicial é **"Registrado"**.
2.  **Visualização pelo Agente:** O problema aparece no painel do agente público.
3.  **Análise:** Um agente público analisa o problema e pode:
    *   Mudar o status para **"Em Análise"**. Neste ponto, o cidadão não pode mais editar o problema.
    *   Adicionar um comentário.
4.  **Andamento:** Se o problema for válido e os recursos estiverem disponíveis:
    *   O status pode ser alterado para **"Em Andamento"** (ou similar, como "Aguardando Recursos", "Equipe Designada").
    *   Comentários podem ser adicionados para informar sobre o progresso.
5.  **Resolução/Conclusão:**
    *   Se o problema for solucionado, o status muda para **"Resolvido"**.
    *   Se o problema for considerado inválido, duplicado ou não passível de resolução pela instância atual, o status pode mudar para **"Recusado"** (com uma justificativa obrigatória).
    *   O cidadão pode ser notificado sobre a conclusão.
6.  **Acompanhamento:** Durante todo o processo, o cidadão que registrou o problema pode visualizar o status atual e o histórico de comentários.



## Tecnologias (Contexto do Desenvolvimento)

Este projeto está sendo desenvolvido utilizando:

*   **Frontend:** Angular e TypeScript.
*   **Gerenciamento de Dados (Demonstração):** Em memória, através de services no Angular.


## Objetivos Futuros (Potenciais Evoluções)

*   Notificações por e-mail/push para cidadãos e agentes.
*   Upload de fotos/vídeos pelos cidadãos ao registrar problemas.
*   Integração com mapas para visualização geográfica dos problemas.
*   Painel administrativo para gerenciamento de usuários (agentes), categorias, etc.
*   Geração de relatórios para a gestão pública.
*   Persistência de dados em um banco de dados real.
*   Fluxos de aprovação mais complexos e atribuição de problemas a equipes específicas.

---
