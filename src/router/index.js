import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";

Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/login",
//     name: "Login",
//     component: () => import("@/views/Login.vue"),
//   },
//   {
//     path: "/",
//     name: "Register",
//     component: () => import("@/views/Register.vue"),
//   },
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     component: () => import("@/views/Dashboard.vue"),
//   },
// ];

let router = new VueRouter({
  routes: [
    {
      path: "/dash",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
        requiresGuest: true,
      },
    },
  ],
});

// const router = new VueRouter({
//   routes,
// });

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/dash",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
