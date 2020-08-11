const router = require("koa-router")();
const { createBlogC, getBlogC } = require("../controller/blog")

router.post("/blog", async (ctx) => {
    const result = await createBlogC(ctx.request.body);
    ctx.body = result
})

router.get("/blog", async (ctx) => {
    let query = {
        currentPage: Number(ctx.query.currentPage),
        pageSize: Number(ctx.query.pageSize),
        id: ctx.query.id
    };
    const result = await getBlogC(query);
    ctx.body = result
})

module.exports = router;
