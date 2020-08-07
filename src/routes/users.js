const router = require("koa-router")();
const jwt = require('jsonwebtoken');
const { getUserC, register, deleteUserC, updateUserC } = require("../controller/user")

/**
 * @swagger 666
*/
router.post("/login", async (ctx) => {  //登录
    const { username, password } = ctx.request.body;
    const data = {
        username,
        password
    }
    resData = jwt.sign({
        data,
    }, 'ArtistXB', { expiresIn: 60 * 60 });

    ctx.body = {
        code: 0,
        token: resData
    };
})

router.get("/users", async (ctx) => { // 注册
    // let query = ctx.query;
    let query = {
        currentPage: Number(ctx.query.currentPage),
        pageSize: Number(ctx.query.pageSize),
    };
    console.log("params", ctx.querystring)
    const result = await getUserC(query)
    ctx.body = result;
})

router.post("/user", async (ctx) => { // 注册
    const result = await register(ctx.request.body)
    ctx.body = result;
})

router.delete("/user", async (ctx) => { // 注册
    const { id } = ctx.request.body;
    const result = await deleteUserC(id)
    ctx.body = result;
})

router.patch("/user", async (ctx) => { // 注册
    const result = await updateUserC(ctx.request.body)
    ctx.body = result;
})


module.exports = router;
