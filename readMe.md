
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
npm i @faker-js/faker


```
✝  prisma/example/node_express_prisma   master±  node test
Jan Hettinger
silver
```

jake テストファイル生成　→
　
DB　model 変更
```
 ✝  prisma/example/node_express_prisma   master±  npx prisma format
Prisma schema loaded from prisma/schema.prisma
Formatted /Users/sjkim030303/opt/dev_2022/nestjs/prisma/example/node_express_prisma/prisma/schema.prisma in 21ms 🚀

npx prisma migrate dev
......

 ✝  prisma/example/node_express_prisma   master±  npx prisma db push
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "prisma_test", schema "public" at "localhost:5443"

⚠️ We found changes that cannot be executed:
  • Added the required column `name` to the `User` table without a default value. There are 3 rows in this table, it is not possible to execute this step.
✔ To apply this change we need to reset the database, do you want to continue? All data will be lost. … yes
The PostgreSQL database "prisma_test" from "localhost:5443" was successfully reset.
🚀  Your database is now in sync with your Prisma schema. Done in 35.60s
✔ Generated Prisma Client (4.5.0 | library) to ./node_modules/@prisma/client in 44ms


 ✝  prisma/example/node_express_prisma   master±  npx prisma generate   
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (4.5.0 | library) to ./node_modules/@prisma/client in 43ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client
--
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
--
```

