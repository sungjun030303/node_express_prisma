//import express from 'express'
const express =require( 'express')
const app =express();
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();

//14 以降BODYFASERを使用しないため、固定で設定。
app.use(express.urlencoded({extended:true}));
//route
app.get("/", async (req,res) => {
    try {
        const user = await prisma.user.findMany();
        return res.status(200).json({ user});
    } catch (err) {
        console.log(err);
    }
    // return res.send("hello world!!");
})

app.post("/", async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                nickname: req.body.nickname ,
                email: req.body.email,
                password: req.body.password,
                provider: req.body.provider,
                agree: req.body.agree ==='false' || req.body.agree === "0" ? false : true,
            },
            }
        );
        return res.status(200).json({ newUser});
    }catch(err){
        console.log(err);
        return res.status(500).json({ err });

    }
})

app.delete("/", async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                // email: req.body.email,
                // nickname: req.body.nickname
                user_id: Number(req.body.user_id),
            }
        })
        return res.status(200).json({ user});
    } catch (err){
        console.log(err);
        return res.status(500).json({ err });
    }
})

app.listen (3000, () => {
    console.log("server on 3000");
}) 