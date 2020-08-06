
const Sequelize = require("sequelize");

const database = 'artist_blog'
const user = 'root'
const password = '123456'
const conf = {
    host: 'localhost',
    dialect: 'mysql'
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;