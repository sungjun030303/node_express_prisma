//import express from 'express'
const express =require( 'express')
const app = express();
const { PrismaClient } =require( '@prisma/client');

const userRouter = require("./router/user");
const postRouter = require("./router/post")
const prisma = new PrismaClient();

//route
//14 以降BODYFASERを使用しないため、固定で設定。
app.use(express.urlencoded({extended:true}));
// mount the router on the app
app.use('/post',postRouter);
app.use('/', userRouter);



app.listen (3000, () => {
    console.log("server on 3000");
})

module.exports = { prisma };