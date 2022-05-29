import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../components/page/LoginView.vue";
import Home from "../components/page/Home.vue";
import House from "../components/page/House.vue";
import Users from "@/components/page/Users";
import Readme from "../components/page/Readme.vue";
import Register from "../components/page/Register.vue";
import Echarts from "@/components/page/Echarts";
import Api from "@/components/page/Api";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    //name: "home",
    component: LoginView,
  },
  {
    path: "/register",
    //name: "home",
    component: Register,
  },
  {
    path: "/readme",
    //name: "home",
    component: Home,
    meta: { logined: true },
    children: [
      { path: "", component: Readme, meta: { logined: true } },
      { path: "/houses", component: House, meta: { logined: true } },
      { path: "/users", component: Users, meta: { logined: true } },
      { path: "/data", component: Echarts },
      { path: "/api", component: Api },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
