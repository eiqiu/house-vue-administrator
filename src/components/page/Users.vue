<template>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable=""
            @clear="searchUserInfo"
            placeholder="请输入搜索的内容"
            v-model="searchParams.keyWords"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUserInfo"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="usersList" stripe border style="width: 100%">
        <el-table-column prop="user_id" label="编号"></el-table-column>
        <el-table-column prop="user_name" label="用户名"></el-table-column>
        <el-table-column prop="user_account" label="账号"></el-table-column>
        <el-table-column prop="user_tel" label="电话"></el-table-column>
        <el-table-column prop="user_address" label="地址"></el-table-column>
        <el-table-column prop="user_age" label="年龄"></el-table-column>
        <el-table-column prop="user_sex" label="性别"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="编辑用户" placement="left">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="toeditUserInfo(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除用户" placement="right">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteUser(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--页码区-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParams.pagenum"
        :page-sizes="[2, 3, 4, 5, 6, 7]"
        :page-size="searchParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalUsers"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="编辑用户" :visible.sync="editUserVisible" width="50%">
      <el-form
        ref="editUserRef"
        :model="editUser"
        label-width="60px"
        :rules="editUserRules"
      >
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="editUser.user_name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="user_tel">
          <el-input v-model="editUser.user_tel" type="text"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="user_address">
          <el-input v-model="editUser.user_address"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="user_age">
          <el-input v-model="editUser.user_age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editUser.user_sex" placeholder="请选择">
            <el-option label="男" value="男"> </el-option>
            <el-option label="女" value="女"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usersList: [],
      searchParams: {
        keyWords: "",
        pagenum: 5,
        pagesize: 5,
      },
      totalUsers: 0,
      editUserVisible: false,
      editUser: {
        user_name: "",
        user_tel: "",
        user_address: "",
        user_age: "",
        user_sex: "",
        user_id: "",
      },
      editUserRules: {
        user_name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3-10之间",
            trigger: "blur",
          },
        ],
        user_tel: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
        ],
        user_address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    // async getUsers() {
    //   const ret = await this.$http.get("/backstage/getAllUser", {
    //     params: this.searchParams,
    //   });
    //   if (ret.status !== 200) {
    //     this.$message.error("获取用户信息错误");
    //     return;
    //   }
    //   this.usersList = ret.data.users;
    //   this.totalUsers = ret.data.total;
    // },
    //获取所有的用户
    async getUsers() {
      await this.$http.post("/system/getAllUser").then((res) => {
        if (res.data.code === 200) {
          console.log(res.data.data);
          this.usersList = res.data.data;
          this.notifySucceed(res.data.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.searchParams.pagesize = val;
      this.getUsers();
    },
    handleCurrentChange(val) {
      this.searchParams.pagenum = val;
      this.getUsers();
    },
    //搜索用户
    async searchUserInfo() {
      this.searchParams.pagenum = 1;
      await this.$http
        .post("/system/searchUserInfo", {
          keyWords: this.searchParams.keyWords,
        })
        .then((res) => {
          if (res.data.code === 200) {
            console.log(res.data.data);
            this.usersList = res.data.data;
            this.notifySucceed(res.data.msg);
          }
        });
    },
    //修改用户信息
    toeditUserInfo(row) {
      this.editUserVisible = true;
      this.editUser.user_id = row.user_id;
      this.editUser.user_name = row.user_name;
      this.editUser.user_tel = row.user_tel;
      this.editUser.user_address = row.user_address;
      this.editUser.user_age = row.user_age;
      this.editUser.user_sex = row.user_sex;
    },
    async editUserInfo() {
      await this.$http
        .post("/system/modifyUserInfo", this.editUser)
        .then((res) => {
          if (res.data.code === 200) {
            this.notifySucceed(res.data.msg);
            this.getUsers();
          } else {
            this.notifyError(res.data.msg);
          }
        });
    },
    //删除用户
    deleteUser(row) {
      this.$confirm("此操作会删除当前选中的数据，请问是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.axios = this.$http
          .post("/backstage/deleteUserInfo", {
            user_id: row.user_id,
          })
          .then((res) => {
            if (res.data.code === 200) {
              this.notifySucceed(res.data.msg);
              this.getUsers();
            } else {
              this.notifyError(res.data.msg);
            }
          });
      });
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
