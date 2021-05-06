import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("./../views/HomeTemplate/HomeTemplate"),
        children: [
            {
                path: "/",
                component: () => import("../views/HomeTemplate/HomePage")
            },
            {
                path: "/signin",
                component: () => import("../views/HomeTemplate/Signin"),
                beforeEnter: (to, from, next) => {
                    const token = localStorage.getItem("token");
                    if (token) {
                        next("/");
                    } else {
                        next();
                    }
                },
            },
            {
                path: "/trip/booking",
                component: () => import("../views/HomeTemplate/BookTrip"),
            },
        ]

    },
    {
        path: "/admin",
        redirect: "/admin/dashboard"
    },
    {
        path: "/admin",
        component: () => import("../views/AminTemplate"),
        children: [
            {
                path: "/admin/dashboard",
                component: () => import("../views/AminTemplate/Dashboard")
            }
        ]
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    linkExactActiveClass: "active",
    routes,
})
export default router