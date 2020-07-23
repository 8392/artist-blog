const router = require("koa-router")();

router.get("/city", async (ctx) => {
    const data = {
        id: 1,
        city: "北京"
    }
    ctx.body = data;
})

module.exports = router;