import axios from "axios";
import { Message } from 'element-ui';
import { getToken } from "./auth";
const service = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000
})

// //请求拦截器
service.interceptors.request.use((config) => {
    //如果调用了这个方法就
    if (getToken()) {
        config.headers.token = getToken()
    }

    return config
}, () => {
    Message({
        type: "error",
        message: "请求错误"
    })
    return Promise.reject(new Error("请求错误"))
})

//响应拦截器
service.interceptors.response.use((res) => {
    const result = res.data;

    if (result.success) {

        return result
    } else {
        Message({
            type: "error",
            message: result.message || "请求错误"
        })
        return Promise.reject(new Error(result.message || "请求错误"))
        //把错误抛出去，以后如果写了catch能捕获。这里的错误是通了，但是后端觉得有哪里不对
    }
}, () => {
    Message({
        type: "error",
        message: "请求错误"
    })
    return Promise.reject(new Error("请求错误"))
})//这个请求没通。不用error，没有result。



//导出
export default service