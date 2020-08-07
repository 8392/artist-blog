const router = require("koa-router")();
const koaForm = require('formidable-upload-koa')
const { saveFile } = require("../controller/index")
router.post("/upload", koaForm(), async (ctx) => {
    const file = ctx.req.files['file']
    if (!file) {
        return
    }
    const { size, path, name, type } = file
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
})

module.exports = router;