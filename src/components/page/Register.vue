<!--
 * @FileDescription: 注册组件
 * @Author: jzs
 * @Date: 2022/5/15
 * @LastEditors:
 * @LastEditTime: 2022/5/15
 -->
<template>
  <div class="register-wrap">
    <div class="register-title">注册</div>
    <div class="register-form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号名称" prop="account">
          <el-input
            v-model="ruleForm.account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="re_password" label="确认密码">
          <el-input
            type="password"
            v-model="ruleForm.re_password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="ruleForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入手机"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="credit_card">
          <el-input
            v-model="ruleForm.credit_card"
            placeholder="请输入银行卡号"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    let validateEmail = (rule, value, callback) => {
      const emailRule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (emailRule.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱"));
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号！"));
      }
      const phoneRule =
        /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (phoneRule.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号！"));
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        account: "",
        password: "",
        re_password: "",
        email: "",
        phone: "",
        credit_card: "",
        birthday: "",
        sex: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        re_password: [{ validator: validatePassword, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.register-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.register-title {
  margin-left: 450px;
  margin-top: 10px;
  width: 500px;
  height: 30px;
  text-align: center;
  font-size: 20px;
  color: #4e5862;
  background-color: #344158;
}
.register-form {
  margin-left: 400px;
  width: 500px;
  border-radius: 5px;
  padding: 40px;
}
</style>
