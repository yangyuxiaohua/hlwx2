/**
 * 组织机构
 */

import req from '@/utils/request'

// 查询组织机构树形菜单
export const getOrganizationTreeData = params => req.post('/organization/getTreeData', params)

// 分页查询一批单位
export const pageUnit = params => req.post('/factory/page', params)

// 查询一批部门
export const partList = params => req.post('/factory/part/list', params)

// 搜索组织机构树形菜单 -> 下拉显示一级菜单内容
export const getOrganizationTreeOptions = params => req.post('/organization/getTreeOptions', params)

// 查询单位名字转换后的缩写
export const searchAliasName = params => req.post('/factory/searchAliasName', params)

// 获取三级联动地理区域
export const getRegions = params => req.post('/region/getRegions', params)

// 添加一个单位
export const addNewFactory = params => req.post('/factory/add', params)

// 添加一个部门
export const addNewPart = params => req.post('/factory/part/add', params)

// 删除单个组织机构
export const deleteOrganization= params => req.post('/organization/delete', params)

// 更新一个单位
export const updateUnit= params => req.post('/factory/update', params)

// 更新一个部门
export const updatePart= params => req.post('/factory/part/update', params)

// 查询单个单位
export const getUnit= params => req.get('/factory/get', params)

// 查询单个部门
export const getPart= params => req.get('/factory/part/get', params)

// 拖动节点排序
export const organizationSort= params => req.post('/organization/sort', params,'json')

// 开启一个单位
export const openUnit= params => req.get('/factory/enable', params)

// 关闭一个单位
export const closeUnit= params => req.get('/factory/unable', params)

// 开启一个部门
export const openPart= params => req.get('/factory/part/enable', params)

// 关闭一个部门
export const closePart= params => req.get('/factory/part/unable', params)







