const userResponse ={
    user_id: true,
    nickname: true,
    email: true,
    password: false,
    provider: true,
    name: true,
    agree: true,
}

const postResponse ={
    post_id : true,
    content    : true,
    thunbnail  : true,
    created_at : true,
    updated_at : true,
    author_id : true,
}

module.exports = {userResponse ,postResponse};