const router = require("koa-router")();
const { createBlogC } = require("../controller/blog")

router.post("/blog", async (ctx) => {
    const result = await createBlogC(ctx.request.body);
    ctx.body = result
})

module.exports = router;
