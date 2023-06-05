// 异步路由表，存放需要权限的路由
export default [{
        path: "/attendance",
        name: "Attendance",
        meta: { auth: ["boss", "administration"] },
        component: () =>
            import ("@/views/AuthView/AuthAttendance")
    },
    {
        path: "/salary",
        name: "Salary",
        meta: { auth: ["boss", "finance"] },
        component: () =>
            import ("@/views/AuthView/AuthSalary")
    },
    {
        path: "*",
        name: "NotFound",
        meta: { auth: ["boss", "finance", "administration", "user"] },
        component: () =>
            import ("@/views/NotFound")
    },

]