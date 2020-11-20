/**
 * 登录 
 */

import req from '@/utils/request'

// 1登录
export const login = params => req.post('/s_login', params)
// 获取用户详情
export const getUserInfor = params => req.post('/getLoginAccountInfo', params)