# TereVerde 🌿

Plataforma web desenvolvida para centralizar informações sobre parques, trilhas e eventos ecológicos de Teresópolis.

## Objetivo

O projeto tem como objetivo facilitar o acesso às informações turísticas e ambientais da cidade, reunindo em um único sistema dados sobre parques, trilhas, eventos e localizações.

## Funcionalidades

### Usuário

* Visualização de parques
* Visualização de trilhas
* Filtro de trilhas por parque
* Filtro de trilhas por dificuldade
* Consulta de eventos
* Visualização de detalhes dos parques
* Visualização de detalhes das trilhas
* Integração com Google Maps

### Administrador

* Cadastro de parques
* Edição de parques
* Exclusão de parques
* Cadastro de trilhas
* Edição de trilhas
* Exclusão de trilhas
* Cadastro de eventos
* Edição de eventos
* Exclusão de eventos
* Área protegida por autenticação JWT

## Tecnologias Utilizadas

### Frontend

* React
* React Router
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express

### Banco de Dados

* PostgreSQL
* Prisma ORM

### Segurança

* JWT (JSON Web Token)

## Estrutura do Projeto

/frontend
/src
/components
/pages

/backend
/controllers
/routes
/middlewares
/services

## Principais Entidades

### Parque

* Nome
* Descrição
* Localização
* Imagem

### Trilha

* Nome
* Descrição
* Distância
* Dificuldade
* Coordenadas
* Parque relacionado

### Evento

* Título
* Descrição
* Data
* Local
* Parque relacionado

## Como Executar

### Backend

```bash
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

## Funcionalidades Implementadas

* Sistema de autenticação
* CRUD completo de parques
* CRUD completo de trilhas
* CRUD completo de eventos
* Relacionamento entre parques, trilhas e eventos
* Página de detalhes dos parques
* Página de detalhes das trilhas
* Filtros dinâmicos
* Layout responsivo

## Projeto Acadêmico

Projeto desenvolvido para conclusão do curso de Tecnologia em Análise e Desenvolvimento de Sistemas.

## Autor

Anderson
