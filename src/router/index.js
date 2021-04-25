import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";

Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/log-in",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/dash",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create-group",
      name: "createGroup",
      component: () => import("../views/CreateGroup.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/group/:group_id/add",
      name: "add-user",
      component: () => import("../views/AddUser.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/group/:group_id/remove",
      name: "rem-user",
      component: () => import("../views/RemUser.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/group/:group_id",
      name: "group",
      component: () => import("../views/Group.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

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
