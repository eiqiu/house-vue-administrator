<!--
 * @FileDescription: 描述
 * @Author: house-team
 * @Date: 2022/5/24
 * @LastEditors:
 * @LastEditTime: 2022/5/24
 -->
<template>
  <div>
    <!-- 2.为Echarts准备一个Dom -->
    <el-card>
      <el-row>
        <el-col :span="16">
          <div id="main" style="width: 1000px; height: 600px"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "Echarts",
  async mounted() {
    let myChart = echarts.init(document.getElementById("main"));
    let houseList;
    await this.$http
      .post("http://localhost:8089/house/getHouse", {
        categoryID: 2,
        pageNum: 1,
        pageSize: 10,
      })
      .then((res) => {
        houseList = res.data.data.list;
      });
    let house_name = [];
    let click_num = [];
    for (var i = 0; i < houseList.length; i++) {
      house_name.push(houseList[i].house_title);
      click_num.push(houseList[i].click_num);
    }
    console.log(houseList);
    let option = {
      title: {
        text: "馨家租房后台数据",
      },
      legend: {
        data: ["点击量"],
      },
      toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            type: ["stack", "tiled"],
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2,
          },
        },
      },
      tooltip: {},
      // x 下标
      xAxis: {
        data: house_name,
        splitLine: {
          show: false,
        },
      },
      // y轴坐标
      yAxis: {},
      series: [
        {
          name: "点击量",
          type: "bar",
          data: click_num,
        },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function (idx) {
        return idx * 5;
      },
    };
    myChart.setOption(option);
  },
};
</script>

<style scoped></style>
