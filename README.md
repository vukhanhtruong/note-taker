# Overview

This project provides a comprehensive guide to building a Note Taker App, an OpenAPI-compliant API powered by Cloudflare Workers. Inspired by the concepts outlined in the [Visualizing Software Architecture post](https://hihoay.substack.com/p/visualizing-software-architecture), this app demonstrates how to build a modern, serverless API architecture with Cloudflare Workers and Clean Architecture.

---

## Prerequisites

Before starting, ensure you have the following tools installed:

- **Node.js**: Version 18 or later.
- **npm**: Installed with Node.js.
- **Cloudflare Wrangler**: CLI for managing Cloudflare Workers.
- **Git**: For cloning the repository.
- **Prisma**: CLI for database migrations and schema management.
- **Cloudflare Account**: Sign up for a [Cloudflare Workers account](https://workers.dev).

## Online demo

- [Frontend](https://note-taker-staging.vukhanhtruong.workers.dev)
- [Swagger](https://note-taker-staging.vukhanhtruong.workers.dev/v1/docs)

---

## Getting Started

### Step 1: Clone the Repository

Clone this project to your local machine and install dependencies:

```
git clone <repository-url> <project-folder>

cd api

npm install

cd frontend

npm install
```

### Step 2: Authenticate with Cloudflare

Log in to your Cloudflare account: `npx wrangler login`

---

## Database

This project uses **Cloudflare D1** with Prisma ORM.

### Setting Up the Database

1.  **Create Databases**:

```
npx wrangler d1 create note-taker-staging
```

2.  **Generate Migrations**:

```
npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_create_user_note_table.sql
```

Find out more [here](https://www.prisma.io/docs/orm/overview/databases/cloudflare-d1)

3.  **Apply Migrations**:

```sh
# local db
npx wrangler d1 migrations apply note-taker-staging --local --env staging

# remote db
npx wrangler d1 migrations apply note-taker-staging --remote --env staging
```

4.  **Generate Prisma Client**: After schema changes, regenerate the Prisma client:

```
npx prisma generate
```

### Querying the Database

Use Wrangler CLI commands to interact with the D1 database:

```
wrangler d1 execute note-taker-staging --command "SELECT * FROM User" --env staging
```

---

## Local Development

1. Copy `.dev.vars.example` to `.dev.vars` files to the root of your project directory, modify the value along the way.

2. Start the Local Development Server:

   `npx wrangler dev --env staging`

### API

1.  Access the Swagger interface to test your API at: `http://localhost:8787/v1/docs#`

2.  Unit testing: `npm run test`

## Frontend

1.  Start the development server:

    `npm run dev`

2.  Open the browser at `http://localhost:5173`.

3.  To test the frontend in a Cloudflare Worker-like environment:

    - Bundle the frontend:
      `npm run build`

    - Open the browser at `http://localhost:8787`.

---

## Deployment

### Setting Environment Variables

Set all environment variables created in `.dev.vars` file, such as JWT secrets:

`wrangler secret put JWT_SECRET --env staging`

### Build and Deploy

1.  **Build Frontend**:

    `cd frontend && npm run build`

2.  **Deploy API**:

    `npx wrangler deploy --env staging`

---

## Troubleshooting

### Common Issues

1.  **Authentication Errors**:
    - Ensure you are logged into Cloudflare with `npx wrangler login`.
    - Verify that environment variables are set correctly.
2.  **Database Connection Issues**:
    - Check that your Prisma schema aligns with the database structure.
    - Reapply migrations if necessary.
3.  **Deployment Errors**:
    - Check for syntax errors in the `wrangler.toml` configuration file.
    - Verify Cloudflare account permissions.

---

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [chanfana Documentation](https://chanfana.pages.dev/)
- [Hono Documentation](https://hono.dev/docs/)
- [D1 and Prisma Setup](https://developers.cloudflare.com/d1/tutorials/d1-and-prisma-orm/)
