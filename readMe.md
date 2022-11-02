
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

