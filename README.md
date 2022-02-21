## NGT API Boilerplate

### Simple Node/Express/GraphQL/Typescript API boilerplate.
----

#### Under the hood

-Postgres for database.

-Uses Redis for caching.

-TypeORM for entities

This is a simple API boilerplate based off the fantastic Youtube series by Ben Awad where he builds a full stack Reddit clone.  This is the Backend portion that I have modified slightly.

---

### Setup

```bash
npm install
```

to generate example .env file
```bash
gen-env
```

The first time you may need to run 
```bash
npm run build
```
to compile Typescript.

After that you can run 
```
npm run start
```


### Example ENV
```Javascript
DATABASE_URL=postgresql://user:password@localhost:port/databaseName
REDIS_URL=127.0.0.1:6379
PORT=4000// Port to run express on
SESSION_SECRET=ThisIsMySecretYo
// Address of frontend
CORS_ORIGIN=http://localhost:3000
RUN_MIGRATIONS=false
```