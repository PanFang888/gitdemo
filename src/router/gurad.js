import router from "./index";
import { getToken } from "@/utils/auth";
import asyncRoutes from "./asyncRouterMap"
import store from "@/store";//不是单文件组件，用不了辅助函数

router.beforeEach(async(to, from, next) => {
    const hasToken = getToken();
    if (hasToken) {
        //刷新数据丢失，重新拿到角色
        await store.dispatch("getRole")
        if (to.path == "/login") {
            next("/")
        } else {
            //动态添加路由，如果希望访问需要权限的路由，再添加
            //动态添加的路由刷新会丢失，所以在这里添加路由
            if (to.name == null) {
                let f = asyncRoutes.filter(item => item.meta.auth.includes(store.state.role))

                for (let i = 0; i < f.length; i++) {
                    //因为引入了路由，在组件中，所以不用加this
                    router.addRoute(f[i])
                }
                //因为跳转有可能发生在路由添加成功之前，所以要反复执行，参数to找不到对应路由的话，就回再重复执行，直到找到会执行else
                //这里写...是因为把它拆开之后加一个replace，防止用户撤销退回，不然直接写next(to)就好了
                next({...to, replace: true })
            } else {
                next();
            }



        }
    } else {
        if (to.path == "/login") {
            next()
        } else {
            next("/login")
        }
    }
})