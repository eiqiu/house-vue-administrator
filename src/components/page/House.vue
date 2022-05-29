<template>
  <div class="main">
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
      <el-breadcrumb-item>房屋列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dialog title="房屋信息" :visible.sync="houseInformation">
      <el-form :model="form">
        <el-form-item label="房屋地址" :label-width="formLabelWidth">
          <el-input v-model="form.houseAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="房屋面积" :label-width="formLabelWidth">
              <el-input v-model="form.area" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋类型" :label-width="formLabelWidth">
              <el-input v-model="form.type" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="建筑类型" :label-width="formLabelWidth">
              <el-input
                v-model="form.buildingTypes"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋结构" :label-width="formLabelWidth">
              <el-input v-model="form.structure" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="房屋方向" :label-width="formLabelWidth">
              <el-input v-model="form.towards" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋装饰" :label-width="formLabelWidth">
              <el-input v-model="form.decoration" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="房屋楼梯" :label-width="formLabelWidth">
              <el-input v-model="form.ladder" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="供暖方式" :label-width="formLabelWidth">
              <el-input
                v-model="form.heatingMode"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="交通" :label-width="formLabelWidth">
          <el-input v-model="form.transportation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="附近设施" :label-width="formLabelWidth">
          <el-input
            v-model="form.surroundingFacilities"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="房屋描述" :label-width="formLabelWidth">
          <el-input
            v-model="form.houseDescription"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="houseInformation = false">取 消</el-button>
        <el-button type="primary" @click="houseInformation = false"
          >确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="拥有人信息" :visible.sync="ownerInformation">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input
            v-model="form.telephoneNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ownerInformation = false">取 消</el-button>
        <el-button type="primary" @click="ownerInformation = false"
          >确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="房屋图片" :visible.sync="housePictures">
      <el-form :model="form">
        <div class="demo-image__lazy">
          <el-image
            v-for="url in urls"
            :key="url.picture_id"
            :src="$target + url.src"
            lazy
          ></el-image>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="housePictures = false">取 消</el-button>
        <el-button type="primary" @click="housePictures = false"
          >确 定
        </el-button>
      </div>
    </el-dialog>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable=""
            @clear="searchHouse"
            placeholder="请输入搜索内容"
            v-model="searchParams.name"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchHouse"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table
        :data="houseList"
        stripe
        border
        style="width: 100%"
        @row-click="clickRow"
      >
        <el-table-column prop="house_id" label="id"></el-table-column>
        <el-table-column prop="house_title" label="标题"></el-table-column>
        <el-table-column prop="house_price" label="价格"></el-table-column>
        <el-table-column
          prop="publish_time"
          label="发布时间"
          :formatter="formatDate"
        ></el-table-column>
        <el-table-column prop="information" label="详细信息">
          <el-button type="text" @click="houseInformation = true"
            >查看
          </el-button>
        </el-table-column>
        <el-table-column prop="owner" label="拥有人">
          <el-button type="text" @click="ownerInformation = true"
            >查看
          </el-button>
        </el-table-column>
        <el-table-column prop="pictures" label="房屋图片">
          <el-button type="text" @click="housePictures = true">查看 </el-button>
        </el-table-column>
        <el-table-column prop="house_state" label="状态" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.house_state"
              @change="changeHousestate(scope.row)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-tooltip content="删除" placement="right">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="toDelHouse(props.row.house_id)"
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
        :page-sizes="[10, 15, 20]"
        :page-size="searchParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalHouse"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 后台返回的房屋信息
      houseList: [],
      searchParams: {
        name: "",
        pagenum: 1,
        pagesize: 10,
      },
      totalHouse: 0,
      houseInformation: false,
      ownerInformation: false,
      housePictures: false,
      form: {
        houseAddress: "",
        area: "",
        type: "",
        buildingTypes: "",
        structure: "",
        towards: "",
        decoration: "",
        ladder: "",
        heatingMode: "",
        transportation: "",
        houseDescription: "",
        surroundingFacilities: "",
        name: "",
        telephoneNumber: "",
        age: "",
        birthday: "",
        address: "",
      },
      formLabelWidth: "100px",
      urls: [],
      value: true,
      options: [
        {
          value: 0,
          label: "待审核",
        },
        {
          value: 1,
          label: "通过",
        },
        {
          value: 2,
          label: "失败",
        },
      ],
    };
  },
  methods: {
    clickRow(row) {
      for (var i = 0; i < this.houseList.length; i++) {
        if (this.houseList[i].house_id === row.house_id) {
          // 找到了
          this.form.houseAddress = this.houseList[i].house_address;
          this.form.area = this.houseList[i].house_area;
          this.form.type = this.houseList[i].house_type;
          this.form.buildingTypes = this.houseList[i].building_type;
          this.form.structure = this.houseList[i].house_structure;
          this.form.towards = this.houseList[i].house_towards;
          this.form.decoration = this.houseList[i].house_decoration;
          this.form.ladder = this.houseList[i].house_ladder;
          this.form.heatingMode = this.houseList[i].heating_mode;
          this.form.transportation = this.houseList[i].transportation;
          this.form.surroundingFacilities =
            this.houseList[i].surrounding_facilities;
          this.form.houseDescription = this.houseList[i].house_description;
          this.form.name = this.houseList[i].user_name;
          this.form.telephoneNumber = this.houseList[i].user_tel;
          this.form.sex = this.houseList[i].user_sex;
          this.form.age = this.houseList[i].user_age;
          this.form.address = this.houseList[i].user_address;
          this.urls = this.houseList[i].pictures;
        }
      }
    },
    formatDate(row, column, cellValue) {
      let datetime = cellValue;
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + "-";
        let mon = (datetime.getMonth() + 1).toString().padStart(2, "0") + "-";
        let d = datetime.getDate().toString().padStart(2, "0");
        return y + mon + d;
      }
      return "";
    },
    async getHouse() {
      const ret = await this.$http.post("/system/getHouse", {
        pageNum: this.searchParams.pagenum,
        pageSize: this.searchParams.pagesize,
      });
      if (ret.data.code !== 200) {
        this.$message.error("获取房屋信息错误");
        return;
      }
      // 所有的数据
      this.houseList = ret.data.data.list;
      this.totalHouse = ret.data.data.total;
    },
    handleSizeChange(val) {
      this.searchParams.pagesize = val;
      if (this.searchParams.name !== "") {
        this.houseList = [];
        this.searchHouse();
      } else {
        this.houseList = [];
        this.getHouse();
      }
    },
    handleCurrentChange(val) {
      this.searchParams.pagenum = val;
      if (this.searchParams.name !== "") {
        this.houseList = [];
        this.searchHouse();
      } else {
        this.houseList = [];
        this.getHouse();
      }
    },
    toDelHouse(house_id) {
      this.$confirm("此房屋将永久删除，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delHouse(house_id);
        })
        .catch(() => {
          this.$messageBox.info("已取消删除");
        });
    },
    async delHouse(house_id) {
      const ret = await this.$http.post("/system/deleteHouse", {
        house_id: house_id,
      });
      if (ret.data.code !== 200) {
        return this.$message.success.error("删除房屋失败");
      }
      this.$message.success("删除房屋成功");
      this.getHouse();
    },
    async changeHousestate(row) {
      // 1：通过审核 0:待审核 2: 审核不通过
      const ret = await this.$http.post("/system/changeHouseState", {
        house_id: row.house_id,
        house_state: row.house_state,
        user_id: row.owner_id,
      });
      if (ret.data.code !== 200) {
        return this.$message.success.error("修改失败");
      }
      this.$message.success("修改成功");
    },
    async searchHouse() {
      this.searchParams.pagenum = 1;
      const ret = await this.$http.post("/system/searchHouse", {
        pageNum: this.searchParams.pagenum,
        pageSize: this.searchParams.pagesize,
        keywords: this.searchParams.name,
      });
      if (ret.data.code !== 200) {
        this.$message.error("获取房屋信息错误");
        return;
      }
      // 所有的数据
      this.houseList = ret.data.data.list;
      this.totalHouse = ret.data.data.total;
    },
  },
  created() {
    this.getHouse();
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 10px;
  margin-bottom: 10px;
}

.main {
  width: 1000px;
  margin-left: -40px;
}
</style>
