<template>
  <div class="login-wrap">
    <div class="ms-title">馨家租房后台管理系统</div>
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
      >
        <el-form-item prop="account">
          <el-input v-model="ruleForm.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="validate">
          <el-input
            class="validate-code"
            v-model="ruleForm.validate"
            placeholder="验证码"
          ></el-input>
          <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-link type="primary" class="register" @click="register()"
            >没有账号，点此注册</el-link
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateV = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.identifyCode) {
        callback(new Error("验证码输入错误"));
      } else {
        callback();
      }
    };
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      ruleForm: {
        account: "",
        password: "",
        validate: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        validate: [{ validator: validateV, trigger: "blur" }],
      },
    };
  },
  components: {},
  mounted() {
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    makeCode(s, l) {
      for (let i = 0; i < l; i++)
        this.identifyCode += s[this.randomNum(0, s.length)];
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          return;
        }
        console.log("校验成功");
        // 前后端交互 语法糖
        const ret = await this.$http.post("/user/login", {
          user_account: this.ruleForm.account,
          user_password: this.ruleForm.password,
        });
        if (ret.data.code === 201) {
          //消息提醒
          this.$message.error("该用户不存在");
        } else if (ret.data.code === 200) {
          //将用户信息保存到session
          sessionStorage.setItem("ms_userId", ret.data.account);
          sessionStorage.setItem("ms_username", ret.data.username);
          sessionStorage.setItem("user_sex", ret.data.sex);
          sessionStorage.setItem("login", 1);
          this.$router.push("/readme");
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.register {
  float: right;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  border-radius: 5px;
  height: 240px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  background: #fff;
}
.code {
  width: 112px;
  height: 35px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
}
.validate-code {
  width: 136px;
  float: left;
}
</style>
