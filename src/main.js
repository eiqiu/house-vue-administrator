import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import "./assets/fonts/iconfont.css";

//导入验证码组件
import SIdentify from "./components/page/Identify";
Vue.component("SIdentify", SIdentify);
//前后端交互
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8089/";
Vue.prototype.$target = "http://localhost:8089/";
Vue.prototype.$http = axios;
Vue.prototype.$message = ElementUI.Message;
//
Vue.config.productionTip = false;
Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
  if (to.meta.logined) {
    if (sessionStorage.getItem("login") === "1") {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});
// 封装提示成功的弹出框
Vue.prototype.notifySucceed = function (msg) {
  this.$notify({
    title: "成功",
    message: msg,
    type: "success",
    offset: 100,
  });
};
// 封装提示失败的弹出框
Vue.prototype.notifyError = function (msg) {
  this.$notify.error({
    title: "错误",
    message: msg,
    offset: 100,
  });
};
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
