const Koa = require('koa')
const app = new Koa();
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
const koaStatic = require('koa-static')
const koaSwagger = require("koa2-swagger-ui")

const swagger = require("../swagger/swagger")
const config = require('./config')
const index = require('./routes/index')
const users = require('./routes/users')

const port = process.env.PORT || config.port

// error handler
onerror(app)
// middlewares

// JWT登录token验证
// app.use(koajwt({ secret: 'ArtistXB' }).unless({
//     // 登录接口不需要验证
//     path: [/^\/login/]
// }));

app.use(koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
        url: '/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
    },
}))


app.use(bodyparser())
    .use(json())
    .use(logger())
    .use(require('koa-static')(__dirname + '/public'))

app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))
app.use(koaStatic(path.join(__dirname, '..', 'swagger')))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - $ms`)
})

app.use(swagger.routes(), swagger.allowedMethods())
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


app.on('error', function (err, ctx) {
    console.log('err', err)
    logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
    // console.log(`服务启动成功`)
})
