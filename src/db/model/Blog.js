const { INTEGER, STRING, DECIMAL } = require('sequelize')
const seq = require("../seq");

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    title: {
        type: STRING,
        allowNull: false,
        unique: false,
        comment: '标题'
    },
    description: {
        type: STRING,
        allowNull: false,
        comment: '描述'
    },
})
module.exports = Blog;