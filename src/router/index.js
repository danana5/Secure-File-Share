import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "About",
    component: () => import("../views/Register.vue"),
  },
];

// let router = new VueRouter({
//   routes: [
//     {
//       path: "/dash",
//       name: "dashboard",
//       component: () => import("../views/Dashboard.vue"),
//       meta: {
//         requiresAuth: true,
//       },
//     },
//     {
//       path: "/",
//       name: "login",
//       component: Login,
//       meta: {
//         requiresGuest: true,
//       },
//     },
//     {
//       path: "/register",
//       name: "register",
//       component: () => import("../views/Register.vue"),
//       meta: {
//         requiresGuest: true,
//       },
//     },
//   ],
// });

const router = new VueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!firebase.auth().currentUser) {
//       next({
//         path: "/",
//         query: {
//           redirect: to.fullPath,
//         },
//       });
//     } else {
//       next();
//     }
//   } else if (to.matched.some((record) => record.meta.requiresGuest)) {
//     if (firebase.auth().currentUser) {
//       next({
//         path: "/dash",
//         query: {
//           redirect: to.fullPath,
//         },
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
