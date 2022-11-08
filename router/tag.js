const { Router } = require('express')
const { PrismaClient } = require('@prisma/client')
const {postResponse} = require('../Vo/vo')
const tagRouter = Router();
const prisma = new PrismaClient();

tagRouter.get('/', async (req, res) => {
    try {
        const page = Number(req.query.page);
        const tags = await prisma.tag.findMany({
            take: 20,
            skip:  20 * ( page -1 ),
            orderBy: {
                tag_id: 'desc',
            }
        })
        return res.status(200 ).json({tags})
    }catch (err) {
        console.log(err)
        return res.status(500).json({error: err});
    }
})

tagRouter.get('/agr', async (req, res) => {
    try {
        const tags = await prisma.tag.aggregate({
            _count: true,
            _avg: {
                posts: true,
            },
            _sum: {
                posts: true,
            },
            _min:{
                posts: true,
            },
            _max: {
                posts: true,
            }
        })
        return res.status(200 ).json({tags})
    }catch (err) {
        console.log(err)
        return res.status(500).json({error: err});
    }
})

tagRouter.get('/dis', async (req, res) => {
    try {
        const tags = await prisma.tag.findMany({
            orderBy: {
                tag_id: 'desc',
            },
            distinct:["content"], // 중복 제거 용.
        });
        return res.status(200 ).json({tags});
    }catch (err) {
        console.log(err);
        return res.status(500).json({error: err});
    }

})

tagRouter.get('/grb', async (req, res) => {
    try {
        const tags = await prisma.tag.groupBy({
            by: ["content"],
            _count: {
                _all: true,
            },
            _sum: {
                posts: true,
            },
            _avg:{
                posts: true,
            },
            _min: {
                posts: true,
            },
            _max: {
                posts: true,
            },
            having : { //조건절.
                posts: {
                    _avg : {
                        gt : 45
                    }
                }
            }
        })
        return res.status(200 ).json({tags});
    } catch (err) {
    console.log(err)
    return res.status(500).json({error: err});
    }
})
tagRouter.post('/', async (req, res) => {
    try {
    } catch (err) {
        console.log(err)
        return res.status(500).json({err});
    }
})

module.exports = tagRouter;