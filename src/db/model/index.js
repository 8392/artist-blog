const Blog = require("./Blog");
const User = require("./User");

Blog.belongsTo(User, {
    foreignkey: 'userId'
})

module.exports = {
    Blog,
    User
}