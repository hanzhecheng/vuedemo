import axios from 'axios'
const instance = axios.create({
})
//发送时拦截器，axios发送请求前操作
instance.interceptors.request.use(config => {
    return config;
}, error => {
    Promise.reject(error);
})
//接收时拦截器，axios接收请求后操作
instance.interceptors.response.use(res => {
    return res;
}, error => {
    Promise.reject(error);
})
export default instance;