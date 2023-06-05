export default [{
        path: '/',
        name: 'Layout',
        component: () =>
            import ("../views/LayOut.vue"),
        redirect: "/index",
        children: [{
                path: "/index",
                name: "index",
                component: () =>
                    import ("../views/index/HomeIndex")
            },
            {
                path: "/orders/list",
                name: "orders-list",
                component: () =>
                    import ("../views/orders/OrdersLists"),
                meta: {
                    bread: ["订单管理", "订单列表"]
                }
            },
            {
                path: "/waybill/list",
                name: "waybill-list",
                meta: { bread: ["运单管理", "运单列表"], keepAlive: true },
                component: () =>
                    import ("../views/waybill/WaybillList")
            },
            {
                path: "/waybill/list/detail",
                name: "waybill-list-detail",
                meta: { bread: ["运单管理", "运单列表", "运单详情"] },
                component: () =>
                    import ("../views/waybill/WaybillDetail")


            },
            {
                path: "/depart/data",
                name: "waybill-list-in",
                meta: { bread: ["发车管理", "发车数据单"] },
                component: () =>
                    import ("../views/depart/DepartData.vue")

            }



        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ("../views/LoginVue.vue")
    },


]