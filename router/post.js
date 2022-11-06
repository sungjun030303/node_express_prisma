const { Router } = require('express')
const { PrismaClient } = require('@prisma/client')
const {postResponse} = require('../Vo/vo')
const postRouter = Router();
const prisma = new PrismaClient();


postRouter.get('/', async (req, res) => {
  try {
      const page = Number(req.query.page);
      const posts = await prisma.post.findMany({
          take : 12,
          skip : 12 * ( page -1 ),
          orderBy: {
              post_id : 'desc'
          },
          select : postResponse
      });
      return res.status(200).json( posts )
  }catch (err) {
      console.log(err);
      return res.status(500).send(err);}
}
);

module.exports =  postRouter ;