const User = require("../db/model/User");
/**
 * @description 获取用户
*/

const getUser = async ({ currentPage, pageSize }) => {
    const result = User.findAndCountAll({
        offset: pageSize * (currentPage - 1),
        limit: pageSize,
        order: [
            ['id', 'desc']
        ]
    })
    // console.log("result", result)
    return result; //返回新增的数据
}

/**
 * @description 新增用户
*/

const addUser = async ({ userName, password, nickName, gender }) => {
    const result = await User.create({
        userName,
        password,
        nickName,
        gender,
    })
    return result.dataValues; //返回新增的数据
}

/**
 * @description 删除用户
*/

const deleteUser = async (id) => {
    const result = await User.destroy({
        where: {
            id
        }
    })
    return result; //返回新增的数据
}

/**
 * @description 更新用户信息
*/

const updateUser = async ({ userName, nickName, gender, id }) => {
    const result = await User.update({ userName, nickName, gender }, {
        where: {
            id
        }
    })
    console.log("result", result)
    return result; //返回新增的数据
}


module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser
}