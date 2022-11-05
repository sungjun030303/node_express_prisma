const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const {userResponse} = require("../vo");
const userRouter = Router();
const prisma = new PrismaClient();


userRouter.get("/", async (req,res) => {
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

userRouter.get('/:id',async (req,res)=> {
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
userRouter.post("/", async (req, res) => {
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

userRouter.patch("/", async (req, res) => {
    try {
        //updatemany
        const count = await prisma.user.updateMany({
            where: {
                provider: "NAVER"
            },
            data: {
                provider: "LOCAL"
            },
        })
        return res.status(200 ).json(count);

    }catch (err){
        console.log(err);
        return res.status(500).json({ err });
    }
})
/*
app.patch("/:id", async (req, res) => {
    try {
        //update
        const count = await prisma.user.update({
            where: {
                user_id: Number (req.params.id)
            },
            data: {
                ...req.body
            },
            select: userResponse,
        })
        return res.status(200 ).json(count);

    }catch (err){
        console.log(err);
        return res.status(500).json({ err });
    }
})
*/

/**
 * upsert is updates if existing, create if not existing.
 */
userRouter.patch("/:id", async (req, res) => {
    try {
        //update
        const count = await prisma.user.upsert({
            where: {
                user_id: Number (req.params.id)
            },
            update: {
                ...req.body
            },
            create: {
                ...req.body
            }
        })
        return res.status(200 ).json(count);

    }catch (err){
        console.log(err);
        return res.status(500).json({ err });
    }
})

userRouter.delete("/", async (req, res) => {
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

module.exports = userRouter;