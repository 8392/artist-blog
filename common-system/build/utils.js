const path = require('path')
const fs = require('fs')
const { promisify } = require('util')

const recursiveDir = async (dirPath, target, callback) => {
    const filePathList = []
    try {
        const isDir = await promisify(fs.stat)(dirPath)
        if (isDir.isDirectory()) {  //判断如果是目录，进行下一步
            // 判断是文件的方法 isDir.isFile()
            const dirList = await promisify(fs.readdir)(dirPath) //读取目录下的文件名，返回一个数组
            for (const item of dirList) {
                const itemList = await recursiveDir(path.resolve(dirPath, item), target)
                filePathList.push(...itemList)
            }
        } else if (target.test(dirPath)) {
            filePathList.push(dirPath)
        }
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
    return filePathList
}

exports.recursiveDir = recursiveDir
