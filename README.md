# Sistema de Gestão de Problemas Urbanos (Frontend Angular)

O Sistema de Gestão de Problemas Urbanos é uma plataforma desenhada para facilitar a comunicação entre cidadãos e a administração pública municipal. Ele permite que os cidadãos reportem problemas urbanos de forma eficiente e acompanhem sua resolução, enquanto oferece aos agentes públicos ferramentas para gerenciar, priorizar e responder a essas demandas de forma transparente.

## Atores do Sistema

*   **Cidadão:** Qualquer indivíduo que deseja reportar um problema urbano ou acompanhar o status de problemas existentes.
*   **Agente Público:** Funcionário da administração municipal responsável por receber, analisar, encaminhar, atualizar o status e registrar a solução dos problemas reportados.

## Funcionalidades Principais Implementadas

### Para Cidadãos:

*   **Registrar Problema:**
    *   Descrever o problema.
    *   Informar a localização (endereço, ponto de referência).
    *   Anexar mídias
*   **Visualizar Meus Problemas:**
    *   Listar todos os problemas registrados pelo cidadão logado.
    *   Acompanhar o status atual de cada um.
    *   Visualizar as respostas e evidências fornecidas pelos agentes públicos.
*   **Atualizar Problema:**
    *   Modificar informações do problema (descrição, localização, mídias) antes que um agente público inicie o atendimento.
*   **Deletar/Cancelar Problema:**
    *   Solicitar o cancelamento de um problema registrado.

### Para Agentes Públicos:

*   **Visualizar Painel de Problemas:**
    *   Acessar uma lista de todos os problemas reportados.
    *   Filtrar e ordenar problemas por tipo, data, status, etc.
*   **Atualizar Status do Problema:**
    *   Modificar o status do problema ao longo do seu ciclo de vida (ex: "Recebido", "Em Análise", "Resolvido", etc.).
*   **Registrar Resposta e Solução:**
    *   Adicionar comentários sobre as ações tomadas.
    *   Anexar mídias comprovando a solução.

### Modelo de Dados e Relacionamentos
## O sistema possui as seguintes entidades principais e seus relacionamentos:
   ## Usuário (1) → (N) Problema
   
   # Um usuário pode registrar vários problemas
   # Cada problema pertence a um único usuário
   
   ## Problema (1) → (N) Atualização
   # Um problema pode ter várias atualizações de status
   # Cada atualização pertence a um único problema
   ## Problema (1) → (N) Mídia
   # Um problema pode ter várias mídias associadas (fotos, vídeos)
   # Cada mídia pertence a um único problema
   ## Agente Público (1) → (N) Atualização
   # Um agente pode realizar várias atualizações
   # Cada atualização é feita por um único agente

## Fluxo Básico de um Problema 

1.  **Registro:** Cidadão registra um novo problema. Status inicial: "Registrado".
2.  **Triagem e Avaliação:** Agente Público visualiza o problema. Pode mudar o status (ex: "Em Análise") para dar continuidade no processo.
3.  **Resolução:**  Agente registra a solução, anexa evidências  e atualiza o status para "Resolvido".
4.  **Notificação:** O Cidadão é informado (visualizando o status atualizado e as respostas do agente).
5.  **Cancelamento/Recusa:** Um problema pode ser "Cancelado pelo Cidadão" ou "Recusado" pelo Agente (com justificativa).

