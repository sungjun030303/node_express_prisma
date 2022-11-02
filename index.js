import express from 'express'

const app =express();

//route
app.get("/",(req,res) => {
    return res.send("hello world!!");
})

app.listen (3000, () => {
    console.log("server on 3000");
}) 