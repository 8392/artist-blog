const { Blog, User } = require("../db/model/index")

const createBlog = async ({ userId, title, description }) => {
    const result = await Blog.create({
        userId,
        title,
        description
    })
    return result;
}

const getBlog = async ({ currentPage, pageSize, id }) => {
    const result = await Blog.findAndCountAll({
        offset: pageSize * (currentPage - 1),
        limit: pageSize,
        include: [
            {
                model: User,
                attributes: ['userName', 'password', 'nickName'],
                where: { id }
            }
        ]
    })
    console.log("result", result)
    return result;
}

module.exports = {
    createBlog,
    getBlog
}