import axios from 'axios'

export function request(config, success, failure) {
  //创建axios实例
  const get = axios.create({
    baseURL: 'http://10.0.2.148:8080/api/monitor',
    timeout: 5000
  })

  // // axios 拦截器
  // axios.interceptors.request.use(config =>{
  //   console.log(config);
  //   //过滤数据
  //   // 可加入请求动画
  //   return config
  // },err =>{
  //   console.l
  // })
  // axios.interceptors.response.use(res =>{
  //   console.log(res);
  //   return res.data
  // },err=>{
  //   console.log(err)
  // })

  // 发送真正网络请求
  return get(config)
}

export function instance2() {

}
