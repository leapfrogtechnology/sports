# Sports API

## Techs

- Typescript
- GraphQL
- Apollo Server
- ExpressJS

## Requirements

- NodeJS: 8+
- DynamoDB
- Yarn

## Database documentation

- [Database](./docs/db.md)

## Setup Instructions

- Please use docker for the database setup. Refer to the [root readme](../README.md)

- Copy environment file and update the values.

  ```bash
  cp `.env.example` `.env`
  ```

- Install dependencies.

  ```bash
  yarn
  ```

- Start application in development mode.

  ```bash
  yarn start:dev
  ```

- For production build:

  ```bash
  yarn build
  ```

- Migrations

  ```bash
  yarn migrate:make <migration_name>
  yarn migrate
  ```

- Seed

  ```bash
  yarn seed:make <seed_name>
  yarn seed
  ```
