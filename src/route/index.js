import VueRouter from 'vue-router';
import Vue from 'vue';
import Layout from '@/layout'
Vue.use(VueRouter);
//解决添加重复路由时的点机问题
const VueRouterPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export const routes = [
    {
        path: '/login',
        component: () => import('@/views/login'),
        meta:{title:'登陆'},
        hidden:true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'Home',
            component: () => import('@/views/home'),
            // title: 菜单名字。 icon菜单的图标
            meta: { title: '首页', icon: 'el-icon-s-promotion' }
        }]
    },
]

const router = new VueRouter({
    mode: "hash",
    routes: routes
})
export default router