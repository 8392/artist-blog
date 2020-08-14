const webpack = require('webpack')
const configFn = require('./webpack.config.js')
const fs = require('fs')
const path = require('path')
const { recursiveDir } = require('./utils')
const { promisify } = require('util'); //处理异步函数，把异步函数转换成promise
const md5 = require('md5')

const config = {
    outputDir: path.resolve(__dirname, '../public/plugin'),//出口
    rootPath: path.resolve(__dirname, '../'),
    compPath: path.resolve(__dirname, '../src/plugins') //入库
}

async function getentryDir() {
    const result = await recursiveDir(config.compPath, /\.vue$/)
    const targetResult = []
    for (const file of result) {
        const dirPath = path.dirname(file)
        const dirList = await promisify(fs.readdir)(dirPath)
        if (dirList.includes('index.vue') && dirList.includes('index.json') && dirList.includes('index.png')) {
            targetResult.push(dirPath)
        }
    }
    // console.log('targetResult', targetResult) //获取plugin文件下的文件目录

    return targetResult.filter((_, i, arr) => arr.indexOf(_) === i)
}

; (async () => {
    const entryList = await getentryDir()
    console.log('entryList:', entryList)
    // console.log('删除主目录', config.outputDir)
    delDir(config.outputDir)
    // await promisify(fs.rmdir)(config.outputDir, { recursive: true })

    for (let i = 0, len = entryList.length; i < len; i++) {
        const fileDir = entryList[i]
        // if (i >= 1) {
        //   return
        // }
        const outputDir = path.join(config.outputDir, fileDir.replace(config.compPath, ''))
        // console.log(`删除目录：${outputDir}`)
        // fs.rmdirSync(outputDir, { recursive: true })
        console.log('fileDir', fileDir)
        const fileList = await promisify(fs.readdir)(fileDir)
        const vueList = fileList.filter((file) => /.vue$/.test(file)).map((file) => path.join(fileDir, file))
        console.log('fileList', fileList)

        // 复制文件
        fs.mkdirSync(outputDir, { recursive: true })
        for (const item of fileList) {
            if (/(.json|.png|.jpg)$/.test(item)) {
                console.log('item', item)
                let saveFile = path.join(outputDir, item)
                if (/(.png|.jpg)$/.test(item)) {
                    const name = await md5Img(path.resolve(fileDir, item))
                    console.log('name:', name)

                    saveFile = path.join(outputDir, name)
                }
                await promisify(fs.copyFile)(path.resolve(fileDir, item), saveFile)
            }
        }

        const jsonPath = path.resolve(outputDir, 'index.json')
        const content = require(jsonPath)

        // console.log('vueList', vueList)
        for (const vueFile of vueList) {
            let outputFileName = ''
            const baseName = path.basename(vueFile)
            console.log('outputDir', outputDir)
            const webpackConfig = await buildVue({
                entryPath: vueFile,
                outputPath: outputDir,
                callback(fileName) {
                    outputFileName = fileName
                }
            })
            const result = await buildFile(webpackConfig)
            console.log(result)
            if (baseName === 'index.vue') {
                changeMainJs({
                    content,
                    jsName: outputFileName
                })
            } else {
                changePropsJs({
                    content,
                    jsName: outputFileName,
                    sourceName: baseName
                })
            }
        }
        fs.writeFileSync(jsonPath, JSON.stringify(content))
    }
})()

async function buildVue({ entryPath, outputPath, callback }) {
    console.log('outputPath', outputPath)

    const baseName = path.parse(entryPath).name
    const webpackConfig = configFn({
        entry: entryPath,
        outputPath: outputPath,
        filename: (chunkData) => {
            const fileHashName = `${baseName}.${chunkData.chunk.contentHash.javascript.slice(0, 8)}.js`
            callback && callback(fileHashName)
            console.log('fileHashName', fileHashName)
            return fileHashName
        }
    })
    return webpackConfig
}

async function buildFile(fileConfig) {
    return new Promise((resolve, reject) => {
        webpack(fileConfig, (err, stats) => {
            console.log('err:', err, fileConfig.entry)
            console.log('stats', stats.hasError)
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }))
            if (err || stats.hasError) {
                console.log('构建过程出错')
                reject(err)
                throw (new Error('构建过程出错'))
            } else {
                resolve('打包完成')
            }
        })
    })
}

async function changeMainJs({ content, jsName }) {
    if (content.hasOwnProperty('web_template_url')) {
        content.web_template_url = `/${jsName}`
    }
    if (content.hasOwnProperty('app_template_url')) {
        content.app_template_url = `/${jsName}`
    }

    /* 修改主题的配置 */
    if (content.hasOwnProperty('appLayout')) {
        content.appLayout.forEach((row) => {
            const ordUrl = row.template_url
            row.template_url = `${ordUrl}/${jsName}`
        })
    }
    if (content.hasOwnProperty('webLayout')) {
        content.webLayout.forEach((row) => {
            const ordUrl = row.template_url
            row.template_url = `${ordUrl}/${jsName}`
        })
    }
}

/* 修改异步组件 */
async function changePropsJs({ content, jsName, sourceName }) {
    if (content.hasOwnProperty('props')) {
        const propList = content.props
        propList.forEach(item => {
            if (item.hide && item.asyncPage && item.value === sourceName) {
                // delete item.asyncPage
                item.value = jsName
            }
        })
    }
}

async function md5Img(imgPath) {
    const img = path.parse(imgPath)
    const buf = await promisify(fs.readFile)(imgPath)
    const hashName = md5(buf)
    return `${img.name}-${hashName.slice(0, 8)}${img.ext}`
}

function delDir(path) {
    let files = []
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach((file, index) => {
            const curPath = path + '/' + file
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath) // 递归删除文件夹
            } else {
                fs.unlinkSync(curPath) // 删除文件
            }
        })
        fs.rmdirSync(path)
    }
}
