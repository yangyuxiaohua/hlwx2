/**
 * 通用的请求axios  --- 工具函数层
 * 2019-10-22 by 小貂蝉
 */

// 引入库
import axios from 'axios'
import qs from 'qs'


// 引入本地存储工具函数
import {
    getItem
} from "@/utils/local";

// 按需引入组件
import {
    Message
} from 'element-ui'

// 设置默认请求的接口地址
axios.defaults.baseURL = 'http://192.168.0.200:2221'
// axios.defaults.timeout = 6000

// axios.defaults.withCredentials=true  //请求跨域的时候是否需要凭证
// 请求拦截器
axios.interceptors.request.use(config => {
    if (sessionStorage.sid) {
        config.headers['sid'] = getItem('sid') // 让每个请求携带自定义
    }
    return config
}, error => {
    return Promise.reject(error); // 请求错误处理
})

// 响应拦截器
axios.interceptors.response.use(response => {
    // console.log(response)
    if (response.data.httpStatus === 406) {
        Message.warning("登录过期，请重新登录！")
        window.location.href='/'
    } else if (response.data.httpStatus === 400 || response.data.httpStatus === 413 || response.data.httpStatus === 404 || response.data.httpStatus === 405 || response.data.httpStatus === 415 || response.data.httpStatus === 417 || response.data.httpStatus === 500) {
        Message.warning(response.data.msg)
    } else if (response.data.httpStatus === 403) {
    window.location.hash='/404'
    } else if (response.data.httpStatus === 503) {
        Message.warning("响应超时！")
    }
    
    return response

}, error => {
    Message.error("网络请求发生错误，请稍后再试")
    return Promise.reject(error); // 响应错误处理
});


// 导出两个方法
export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params
                })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    post(url, params = {}, type) {
        if (type == 'json') {
            axios.defaults.headers = {
                'Content-type': 'application/json' //设置请求参数格式
            }
            console.log(params)
            return new Promise((resolve, reject) => {
                axios.post(url, params)
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })

        } else {
            axios.defaults.headers = {
                'Content-type': 'application/x-www-form-urlencoded' //设置请求参数格式
            }
            return new Promise((resolve, reject) => {
                axios.post(url, qs.stringify(params))
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}