//封装get请求和post请求
import service from "./service";

export function get(url, params) {
    const config = {
        method: "get",
        url
    }
    if (params) {
        config.params = params
    }
    //如果调用了这个函数，就将这里面的参数传给service。返回的结果是service请求。

    return service(config)
}

export function post(url, params) {
    const config = {
        method: "post",
        url
    }
    if (params) {
        config.data = params
    }
    return service(config)
}