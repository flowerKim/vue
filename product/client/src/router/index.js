import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../views/ProductList.vue";

const routes = [
  {
    path: "/productList",
    name: "Home",
    component: ProductList,
  },

  {
    path: "/",
    name: "board",
    component: () =>
      import(/* webpackChunkName: "board" */ "../views/BoardList.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/naverlogin",
    name: "NaverLogin",
    component: () =>
      import(/* webpackChunkName: "NaverLogin" */ "../views/NaverLogin.vue"),
  },
  {
    path: "/detail",
    name: "productdetail",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetail" */ "../views/ProductDetail.vue"
      ),
  },
  {
    path: "/create",
    name: "productcreate",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetail" */ "../views/ProductCreate.vue"
      ),
  },
  {
    path: "/sales",
    name: "saleslist",
    component: () =>
      import(/* webpackChunkName: "ProductDetail" */ "../views/SalesList.vue"),
  },
  {
    path: "/image_insert",
    name: "image_insert",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetail" */ "../views/ImageInsert.vue"
      ),
  },
  {
    path: "/update",
    name: "ProductUpdate",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetail" */ "../views/ProductUpdate.vue"
      ),
  },
  {
    path: "/boardList",
    name: "BoardList",
    component: () =>
      import(/* webpackChunkName: "BoardList" */ "../views/BoardList.vue"),
  },
  {
    path: "/boardDetail",
    name: "BoardDetail",
    component: () =>
      import(/* webpackChunkName: "BoardDetail" */ "../views/BoardDetail.vue"),
  },
  {
    path: "/boardUpdate",
    name: "BoardUpdate",
    component: () =>
      import(/* webpackChunkName: "BoardUpdate" */ "../views/BoardUpdate.vue"),
  },
  {
    path: "/boardCreate",
    name: "BoardCreate",
    component: () =>
      import(/* webpackChunkName: "BoardCreate" */ "../views/BoardCreate.vue"),
  },
  {
    path: "/boardSearchList",
    name: "BoardSearchList",
    component: () =>
      import(
        /* webpackChunkName: "BoardSearchList" */ "../views/BoardSearchList.vue"
      ),
  },
  {
    path: "/ChildView",
    name: "ChildView",
    component: () =>
      import(/* webpackChunkName: "ChildView" */ "../views/ChildView.vue"),
  },
  {
    path: "/ParentView",
    name: "ParentView",
    component: () =>
      import(
        /* webpackChunkName: "ParentView" */ "../components/ParentView.vue"
      ),
  },
  {
    path: "/BoardReplyList",
    name: "BoardReplyList",
    component: () =>
      import(
        /* webpackChunkName: "BoardReplyList" */ "../views/BoardReplyList.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
