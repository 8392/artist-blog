const router = require("koa-router")();
const jwt = require('jsonwebtoken');
const { getUserC, register, deleteUserC, updateUserC } = require("../controller/user")

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

router.get("/user", async (ctx) => { // 注册
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiaWF0IjoxNTk1NDc5MjE3LCJleHAiOjE1OTU0ODI4MTd9.mV8HUoPoik42IqjWjtZv1F6WTXUe9RsGbAdjwNKaP2I