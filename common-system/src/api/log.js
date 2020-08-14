/* page: 系统日志/用户操作日志、 登录登出日志 */
import { post } from '@/utils/request'

/* 查询操作日志列表 */
export const getOperationLogByPage = (data) => post('/getOperationLogByPage', data)
