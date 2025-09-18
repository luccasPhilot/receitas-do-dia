# 🍴 Recipe of the Day

Um **SPA (Single Page Application)** desenvolvido em React para descobrir, buscar e visualizar receitas culinárias.

---

## Sobre o Projeto

Este é um projeto acadêmico desenvolvido para a disciplina de **Programação Web Fullstack**.  
O principal objetivo foi construir uma aplicação web moderna do tipo SPA, utilizando **React.js** para consumir uma API JSON pública (**TheMealDB**), gerenciando estados complexos e aplicando conceitos avançados de hooks e bibliotecas externas.

O resultado é uma **interface limpa, minimalista e responsiva**, focada na experiência do usuário para a descoberta de novas receitas.

---

## Principais Funcionalidades

- **Descoberta Aleatória**: Ao carregar o site ou clicar no botão _"Surprise Me"_, uma receita aleatória é apresentada.
- **Busca por Nome**: O usuário pode buscar por receitas específicas. A busca retorna uma lista de resultados correspondentes.
- **Visualização de Resultados**: Os resultados da busca são exibidos em uma grade de cards interativos.
- **Detalhes da Receita**: Ao selecionar uma receita (seja da busca, aleatória ou do histórico), um card detalhado é exibido com imagem, ingredientes e instruções.
- **Histórico de Visualização**: Todas as receitas visualizadas são salvas em um histórico, permitindo que o usuário as revisite com um único clique.
- **Interface Responsiva**: O layout se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.

---

## Decisões de Arquitetura e Design

### Idioma da Aplicação (Inglês)

Durante o desenvolvimento, foi constatado que a API utilizada, **TheMealDB**, fornece todos os dados (nomes, ingredientes, instruções) exclusivamente em inglês.  
Para garantir a consistência e a coesão da experiência do usuário, optou-se por desenvolver toda a interface gráfica também em **inglês**. Isso evita uma experiência mista, onde a interface estaria em português e os dados das receitas em outro idioma.

### Gerenciamento de Estado com `useReducer`

Para atender a um dos requisitos da disciplina, o hook avançado **`useReducer`** foi escolhido para gerenciar os estados complexos da aplicação.  
Toda a lógica relacionada ao ciclo de vida das requisições à API (carregamento, sucesso, erro), bem como a manipulação da lista de resultados e da receita selecionada, está centralizada na função `recipeReducer`.

Essa abordagem torna o fluxo de dados mais previsível, organizado e fácil de depurar em comparação com o uso de múltiplos `useState`.

---

## Tecnologias Utilizadas

- **React.js**: Biblioteca principal para a construção da interface de usuário.
- **Material-UI (MUI)**: Biblioteca de componentes React para um design moderno e responsivo.
- **TheMealDB API**: API JSON pública utilizada como fonte de dados para as receitas.
- **JavaScript (ES6+)**: Linguagem base para toda a lógica da aplicação.
- **CSS**: Para estilizações globais e ajustes finos.

---

## Como Rodar o Projeto Localmente

Para executar este projeto em sua máquina local, siga os passos abaixo.

```bash
# Clone o repositório
git clone https://github.com/luccasPhilot/receitas-do-dia

# Acesse a pasta do projeto
cd receitas-do-dia

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

A aplicação será aberta automaticamente em http://localhost:3000
no seu navegador.

## 🌐 Acesso ao Projeto

Você pode acessar a versão online do projeto através do seguinte link:

[link](link aqui)
