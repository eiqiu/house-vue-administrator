<template>
  <div class="header">
    <div class="logo">馨家租房后台管理系统</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img
            class="user-logo"
            v-if="usersex === 'man'"
            src="@/assets/img/man.png"
          />
          <img class="user-logo" v-else src="@/assets/img/woman.png" />
          {{ username }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usersex: "",
      username: "",
    };
  },
  mounted() {
    this.usersex = sessionStorage.getItem("user_sex");
    this.username = sessionStorage.getItem("ms_username");
  },
  methods: {
    handleCommand(command) {
      if (command === "userCenter") {
        //console.log("user");
        this.$router.push("/userCenter");
      } else if (command === "logout") {
        // console.log("1111");
        sessionStorage.clear();
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
}
.header .logo {
  float: left;
  width: 250px;
  text-align: center;
}
.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}
.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}
.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
