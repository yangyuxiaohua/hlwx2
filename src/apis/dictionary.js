/**
 * 字典
 */

import req from '@/utils/request'

// 查询一批字典
export const listDictionary = params => req.post('/dictionary/listDictionary', params)