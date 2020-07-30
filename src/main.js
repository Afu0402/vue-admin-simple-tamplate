import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/global.css';

//引入全局自定义组件和工具
import '@/components/index.js';
import '@/tools/index.js'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/el-element.scss'; //修改element-ui的样式


import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration
Vue.use(ElementUI)

import router from '@/route/index'

router.beforeEach((to,form,next) => {
  NProgress.start()
  next();
  // 围绕token页面权限跳转的验证
  // const hasToken = localStorage.getItem('token');
  // if(hasToken) {
  //   if(to.path === '/login'){
  //     next({path:'/',replace:true})
  //     NProgress.done();
  //   } else {
  //     next();
  //     NProgress.done();
  //   }
  // } else {
  //   if(to.path === '/login') {
  //     next();
  //     NProgress.done();
  //   } else {
  //     next({path:'/login',replace:true});
  //   } 
  // }
})

router.afterEach((to) => {
  document.title = $getPageTitle(to.meta.title);
  NProgress.done()
})


Vue.config.productionTip = false

let vm = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

global.vm = vm;
