const { getUser, addUser, deleteUser, updateUser } = require("../service/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const TableData = require("../model/tableModel")

const getUserC = async ({ currentPage, pageSize }) => {
    const result = await getUser({ currentPage, pageSize })
    const res = new TableData(result, { currentPage, pageSize });
    return new SuccessModel(res);
}

const register = async ({ userName, password, nickName, gender }) => {
    const result = await addUser({
        userName,
        password,
        nickName,
        gender,
    })
    return new SuccessModel(result);
}

const deleteUserC = async (id) => {
    const result = await deleteUser(id)
    if (result == 1) {
        return new SuccessModel("删除成功");
    } else {
        return new ErrorModel(-1, "删除失败")
    }
}

const updateUserC = async ({ userName, gender, nickName, id }) => {
    const result = await updateUser({ userName, gender, nickName, id })
    // if (result == 1) {
    //     return new SuccessModel("删除成功");
    // } else {
    //     return new ErrorModel(-1, "删除失败")
    // }
    return new SuccessModel(result)
}


module.exports = {
    getUserC,
    register,
    deleteUserC,
    updateUserC
}