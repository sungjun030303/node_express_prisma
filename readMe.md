
옛날 방식
express 서버 설치.

npm init
npm i express
npm i -D nodemon

touch index.js

```
import express from 'express'

const app =express();

//route
app.get("/",(req,res) => {
    return res.send("hello world!!");
})

app.listen (3000, () => {
    console.log("server on 3000");
}) 
```

“dev”: “nodemon —-watch ./index.js”

npm run dev -> hello world.


npm i prisma
npx prisma init
```
 ✝  prisma/example/node_express_prisma   master±  npx prisma init

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```
.env file and schema.prisma file are created.

table is called model in prisma.

3  add model
& npx prisma format

npx prisma migrate dev
```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "prisma_test", schema "public" at "localhost:5443"

✔ Enter a name for the new migration: … init
Applying migration `20221102023129_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20221102023129_init/
    └─ migration.sql

Your database is now in sync with your schema.
```
