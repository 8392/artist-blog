const router = require("koa-router")();
const jwt = require('jsonwebtoken');

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

router.get("/register", async (ctx) => { // 注册
    const data = {
        id: 1,
        city: "北京"
    }
    ctx.body = data;
})


module.exports = router;



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiaWF0IjoxNTk1NDc5MjE3LCJleHAiOjE1OTU0ODI4MTd9.mV8HUoPoik42IqjWjtZv1F6WTXUe9RsGbAdjwNKaP2I