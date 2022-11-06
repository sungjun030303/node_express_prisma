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
          // include : {
          //     author : {
          //         select : {
          //             user_id : true,
          //             nickname : true,
          //         },
          //     }
          // },
          select : {
              post_id : true,
              content    : true,
              thumbnail  : true,
              author : {
                  select : {
                      user_id: true,
                      nickname: true,
                      email: true,
                  },
              },
          },
          // select : postResponse ,
          // include :内部に定義する必要あり。
      });
      return res.status(200).json( posts )
  }catch (err) {
      console.log(err);
      return res.status(500).send(err);}
}
);

postRouter.post("/like", async (req, res)=>{
    try {
        const newLike = await prisma.like.create({
                data: {
                    author_id: Number(req.body.author_id),
                    post_id: Number(req.body.post_id),
                },
            }
        );
        return res.status(200).json(newLike);

    } catch (err){

        console.log(err);
        return res.status(500).send(err);

    }
})

postRouter.get("/like/:id", async (req, res)=>{
    try {
        const like = await prisma.like.findMany({
            where : {
                author_id: Number(req.params.id),
            },
            // include : {
            //     post : true,
            //     author: true,
            // }
            select : {
                post : {
                    select: {
                        post_id: true,
                        content: true,
                        author : {
                            select : {
                                user_id: true,
                                nickname: true,
                                email: true,
                            }
                        }
                    }
                },
                author : {
                    select: {
                        user_id: true,
                        nickname: true,
                        email: true,
                    }
                }
            }
        }
    );
        return res.status(200).json(like);
    }catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
})




module.exports =  postRouter ;