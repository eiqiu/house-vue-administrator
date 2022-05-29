<template>
  <div class="sidebar">
    <el-menu
      :default-active="onRoutes"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <div v-for="(item, ii) in items" :key="ii">
        <el-submenu v-if="item.subs" :index="item.index">
          <template slot="title"
            ><i :class="item.icon"></i>{{ item.title }}</template
          >
          <el-menu-item
            v-for="subItem in item.subs"
            :index="subItem.index"
            :key="subItem.index"
            >{{ subItem.title }}</el-menu-item
          ></el-submenu
        >
        <el-menu-item v-else :index="item.index">
          <i :class="item.icon"></i>{{ item.title }}
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
import
<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-setting",
          index: "readme",
          title: "系统功能简介",
        },
        {
          icon: "el-icon-setting",
          index: "api",
          title: "后端接口",
        },
        {
          icon: "el-icon-setting",
          index: "data",
          title: "数据视图",
        },
        {
          icon: "el-icon-setting",
          index: "users",
          title: "用户管理",
        },
        {
          icon: "el-icon-setting",
          index: "houses",
          title: "房屋管理",
        },
      ],
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {},
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
};
</script>

<style>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
</style>
