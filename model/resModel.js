/**
 *@description 基础模块
*/

class BaseModel {
    constructor({ code, data, message }) {
        this.code = code;
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

/**
 * @description 成功返回的数据格式
*/

class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({
            code: 0,
            data
        })
    }
}


/**
 * @description 失败返回的数据格式
*/

class ErrorModel extends BaseModel {
    constructor(errno, message) {
        super({
            code: errno,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}