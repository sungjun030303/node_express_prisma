//import express from 'express'
const express =require( 'express')
const app = express();
const { PrismaClient } =require( '@prisma/client');

const userRouter = require("./router/user")
const prisma = new PrismaClient();

//route

// mount the router on the app
app.use('/', userRouter, (req, res) => {
    res.sendStatus(401)
})
//14 以降BODYFASERを使用しないため、固定で設定。
app.use(express.urlencoded({extended:true}));

app.listen (3000, () => {
    console.log("server on 3000");
})

module.exports = { prisma };