const Blog = require("./Blog");
const User = require("./User");

User.belongsTo(User, {
    foreignkey: 'userId'
})

module.exports = {
    Blog,
    User
}