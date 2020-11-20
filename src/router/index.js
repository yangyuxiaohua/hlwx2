import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Index from '@/views/Index'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children:[
      //配置中心
      {
        path:'/index/configMenu',
        name:'configMenu',
        component: () => import('@/views/config/ConfigMenu'),
        children:[
          //组织机构
          {
            path:'/index/config/user/organization',
            name:'organization',
            component:()=> import('@/views/config/user/Organization.vue')
          },
          //系统用户
          {
            path:'/index/config/user/userManage',
            name:'userManage',
            component:()=> import('@/views/config/user/UserManage.vue')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
