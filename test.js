const { faker } = require('@faker-js/faker')

const { prisma } =require('./index');
const { v4 } = require('uuid');
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
inputUsers();
