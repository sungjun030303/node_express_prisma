//import express from 'express'
const express =require( 'express')
const app =express();
const { PrismaClient } =require( '@prisma/client');
const {userResponse} = require("./vo");
const prisma = new PrismaClient();

//14 以降BODYFASERを使用しないため、固定で設定。
app.use(express.urlencoded({extended:true}));
//route
app.get("/", async (req,res) => {
    try {
        const page = req.query.page;
        const limit = 12;//req.query.limit;
        const offset = (page-1) * limit;

        const [ users , count] = await Promise.all([
            await prisma.user.findMany({
                take: limit,
                skip: offset,
                orderBy:
                    {
                        user_id: 'asc'
                    },
            }),
            await prisma.user.count(),
        ]);
        //const user = await prisma.user.findMany();
        return res.status(200).json({ users , maxPage: Math.ceil(( count  ) / limit ) , prePageNum: Math.ceil(( offset  ) / limit )} );
        // return res.status(200).json({page: req.query.page})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err });
    }
    // return res.send("hello world!!");
})

app.get('/:id',async (req,res)=> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: Number (req.params.id)
            } ,
            select: userResponse,
        });
        //delete user.password; こちらもOK
        // javascript inner function
        return res.status(200).json(user);
    }catch (err){
        console.log(err);
        return res.status(500).json({ err });
    }

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

module.exports = { prisma };