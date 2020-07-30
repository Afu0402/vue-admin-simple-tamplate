
import Axios from 'axios';
import qs from 'qs'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'

const service = new Axios.create({
  baseURL: process.env.VUE_APP_SERVICE,
  timeout:12000,
  headers:{
      "Content-Type": "application/x-www-form-urlencoded"
  }
})


//请求拦截：在请求发送去之前添加token
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      const token = localStorage.getItem('token');
      config.headers['Authorization'] =`Bearer ${token}`;
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.transformResponse = (res) => {
  res = JSON.parse(res);
  return res;
}

//请求拦截：在接受到请求且准备返回给用户时判断date.code代码。触发相应的提示
//
service.interceptors.response.use(res => {
  const data = res.data;
  if(data.code !== 200) {
      Message.error(data.msg);
  }
  if(res.state === 403) {
    MessageBox.alert('登录已过期，请重新登陆', {
      title:"提醒",
      center:true,
      showClose:false
    }).then(res => {
      store.dispatch('user/logout').then(res => {
        vm.$router.replace('/login')
      });
    })
    return Promise.reject('登陆已经过期...')
  } 
  return res;
}) 

export function request(url, data, method = 'post', config = {},form) {
  $Log('api请求参数和URL',url,data)
  const defaultConf = {
    url: url,
    method: method,
    data:{},
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  if(form === 'formData') {
    defaultConf.data = qs.stringify(data);
    defaultConf.headers["Content-Type"] = "application/x-www-form-urlencoded";
  } else {
    defaultConf.data = JSON.stringify(data);
    defaultConf.headers["Content-Type"] = "application/json	";
  }
  return service(Object.assign(defaultConf, config))
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      MessageBox.alert('系统繁忙，请稍后再试~', {
        title:"提醒",
        center:true,
        showClose:false
      }).then(res => {
        store.dispatch('user/logout').then(res => {
          vm.$router.replace('/login')
        });
      })
      console.log(`服务端请求/响应错误：", ${error}`)
      return Promise.reject(error);
    });
}

export let $requestFormData = (url, formData,method = 'post', config = {},form = 'formData') => request(url, formData,method, config,form);
export let $requestBody = (url, formData,method = 'post', config = {},form = 'body') => request(url, formData,method, config,form);