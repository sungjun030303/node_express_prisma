const { faker } = require('@faker-js/faker')

const { prisma } =require('./index');
const { v4 } = require('uuid');
const {userResponse} = require("./Vo/vo");
//
// console.log(faker.name.fullName());
// console.log(faker.color.human());

/**
 * npm i uuid -> create unique value
*/
async function inputUsers() {
    let i = 0;
    while (i < 100) {

        const providerx = Math.round(Math.random() * 3) > 2
            ? "LOCAL"
            : Math.round(Math.random() * 3) > 1
                ? "KAKAO"
                : "NAVER";

        const user = await prisma.user.create({
            data: {
                nickname: v4().slice( 0,12 ),
                email: faker.internet.email().slice( 0,30 ),
                password: faker.internet.password(),
                provider : providerx,
                name : faker.name.fullName().slice( 0,15 ),

            }
        });
        console.log(user);
        i++;
    }
}
//inputUsers();

//유저 작성 후 돌릴것.
async function inputPost() {
    let i= 0;
    while (i < 100) {
        //const author_id = Math.round(Math.random() * 10014 >= 13 ? Math.round(Math.random()*10014) : 13 )
        const author_id = i+1;
        const user = await prisma.user.findUnique({
            where: {
                user_id: author_id
            },
            select: userResponse
        })
        console.log(user);
        if (!user) {
            continue;
        }

        const newPost = await prisma.post.create({
            data: {
                content: faker.lorem.paragraphs().slice( 0,254),
                thumbnail: faker.image.imageUrl(),
                author_id,
            }
        });
        i++;
    }
}
//inputPost();


async function inputTages() {
    const content = ["ootd","맞집","뷰","한강","행복","맞팔"];
    try{
        let i = 347;
        while ( i < 700 ) {
            // const newTag = await prisma.tag.create({
            //     data: {
            //         content: content[ i % 6],
            //         //content: faker.random.word().slice( 7),
            //     }
            // });
            await prisma.tag.update({
                where: {
                    tag_id: i + 1
                },
                data: {
                    posts: Math.round(Math.random() *100) ,
                },
            })
            i++;
        }

    }catch(e){

        console.log(e);
    }

}

inputTages() ;