const { SuccessModel, ErrorModel } = require("../model/resModel")
const { createBlog, getBlog } = require("../service/blog")
const TableData = require("../model/tableModel")

const createBlogC = async (params) => {
    const result = await createBlog(params);
    return new SuccessModel(result)
}

const getBlogC = async (params) => {
    const result = await getBlog(params);
    const res = new TableData(result, params);
    return new SuccessModel(res)
}

module.exports = {
    createBlogC,
    getBlogC
}