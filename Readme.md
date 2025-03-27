<script type="module">
      import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
      mermaid.initialize({ startOnLoad: true });
      
      mermaid.registerIconPacks([
        {
          name: 'mdi',
          loader: () =>
            fetch('https://unpkg.com/@iconify-json/mdi/icons.json').then((res) => res.json()),
        },
      ]);

</script>

# Complete App with GraphQL, Node.js, MongoDB and React.js

## Project Overview

This is a complete app with GraphQL, Node.js, MongoDB and React.js. This app is a simple CRUD app with a list of books. The app is divided into two parts: the server and the client. The server is built with Node.js, Express.js, GraphQL and MongoDB. The client is built with React.js and Apollo Client.

## Features

- Server
  - Node.js
  - Express.js
  - GraphQL
  - MongoDB
  - Mongoose
- Client
  - React.js
  - Apollo Client

## Structure

Application structure is divided into tree main parts: API, DB and UI.

```mermaid
architecture-beta

    group apiG(mdi:server)[API]
    group uiG(mdi:react)[UI]
    group dbG(mdi:database)[DB]

    service db(mdi:database)[MongoDB] in dbG
    service react(mdi:react)[ReactJS SPA] in uiG
    service charts(mdi:chart-line)[incl charts] in uiG
    service nodejs(mdi:nodejs)[NodeJS] in apiG
    service graphql(mdi:graphql)[GraphQL API] in apiG
    service prisma(mdi:database-search-outline)[Prisma] in apiG

    prisma:L <--> R:nodejs
    prisma:R --> L:db
    nodejs:T --> B:graphql
    react:B --> T:graphql
    react:R --> L:charts
```

## App Design

```mermaid
flowchart LR

    events[Events] <---> users[Users]

    subgraph Events
      direction TB
      Create --> events
      Update --> events
      Delete --> events
      Read --> events
    end

    subgraph Filters
      createdBy[created by] --> Read
      booked --> Read
    end

    subgraph Users
      direction TB
      users --> CreateU
      users --> Login
    end

    subgraph Bookings
      Book --> events
      users --> Book
      c_booking[Cancel Booking] --> events
      users --> c_booking
    end


```

## Init project

### Init git with .gitignore

```bash
git init
```

.gitignore

```bash
/node_modules
/dist

.env
.DS_Store
```

### Init npm

```bash
npm init -y
```

### Init typescript

```bash
npm i --save-dev typescript tsx
npx tsc --init
```

More tsconfig bases https://github.com/tsconfig/bases

### Init ESLint

```bash
npm i --save-dev eslint
npx eslint --init
```

### Instal express

```bash
npm i --save express body-parser express-graphql graphql mongoose dotenv
npm i --save-dev @types/express
```

### Install graphql

```bash
npm i --save express-graphql graphql
```

### Install Database

#### MongoDB

Refer to https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database

#### Prisma ORM

```bash
npm i --save-dev prisma
npm i --save @prisma/client
npx prisma init
```

Update schema.prisma and .env to corresponding MongoDB settings

Pull DB schema and generate client

```bash
npx prisma db pull
npx prisma generate
```
