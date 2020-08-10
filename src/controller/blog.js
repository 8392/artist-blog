const { SuccessModel, ErrorModel } = require("../model/resModel")
const { createBlog } = require("../service/blog")

const createBlogC = async (params) => {
    const result = await createBlog(params);
    return new SuccessModel(result)
}

module.exports = {
    createBlogC
}