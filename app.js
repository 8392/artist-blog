const Koa = require('koa')
const app = new Koa()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require("koa-jwt")
const debug = require('debug')('koa2:server')
const path = require('path')

const config = require('./config')
const index = require('./routes/index')
const users = require('./routes/users')

const port = process.env.PORT || config.port

// error handler
onerror(app)

// middlewares

// app.use(koajwt({ secret: 'ArtistXB' }).unless({
//     // 登录接口不需要验证
//     path: [/^\/login/]
// }));


app.use(bodyparser())
    .use(json())
    .use(logger())
    .use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - $ms`)
})


app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


app.on('error', function (err, ctx) {
    console.log('err', err)
    logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
    // console.log(`服务启动成功`)
})
