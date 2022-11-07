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


tagRouter.post('/', async (req, res) => {
    try {
    } catch (err) {
        console.log(err)
        return res.status(500).json({err});
    }
})

module.exports = tagRouter;