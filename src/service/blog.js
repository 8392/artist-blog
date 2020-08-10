const Blog = require("../db/model/Blog");

const createBlog = async ({ userId, title, description }) => {
    const result = await Blog.create({
        userId,
        title,
        description
    })
    return result;
}

const getBlog = async ({ currentPage, pageSize }) => {
    const result = await Blog.findAndCountAll({
        offset: pageSize * (currentPage - 1),
        limit: pageSize,
        order: ['id']
    })
    return result;
}

module.exports = {
    createBlog,
    getBlog
}