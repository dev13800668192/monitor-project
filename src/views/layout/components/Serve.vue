<template>
  <div class="home">
    <el-row :gutter="40">
      <el-col :lg="5" :sm="8" :xs="24">
      <div></div>
      </el-col>
      <el-col :lg="19" :sm="16" :xs="24">
        <div id="charts" ref="charts"></div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
// 数字滚动插件
import countTo from "vue-count-to";
//引入echarts 插件
import echarts from "echarts";
export default {
  name: "client",
  components: { countTo },
  data() {
    return {
      user: {
        startVal: 0,
        endVal: 10951
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      todulist: [
        {
          checked: true,
          todo: "学习"
        },
        {
          checked: true,
          todo: "吃饭"
        },
        {
          checked: false,
          todo: "睡觉"
        },
        {
          checked: true,
          todo: "看电视"
        },
        {
          checked: true,
          todo: "打篮球"
        }
      ]
    };
  },
  mounted() {
    this.drawChart();
    this.init();
  },
  destroyed(){
    window.onresize=null
  },
  methods: {
    init() {
      //图表自适应
      window.onresize = () => {
        if (this.$refs.charts) {
          echarts.init(this.$refs.charts).resize();
        }
      };
    },
    drawChart() {
      let myChart = echarts.init(this.$refs.charts);
      let option = {
        title: {
          text: "一周访问量",
          x: "center",
          textStyle: {
            fontSize: 16
          }
        },
        legend: {
          data: ["访问量"]
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}<br>访问量{c}"
        },
        xAxis: {
          type: "category",
          data: ["04-02", "04-03", "04-03", "04-04", "04-05", "04-06", "04-07"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            itemStyle: {
              normal: {
                //折点颜色
                color: "#bdb7ff",
                //折线颜色
                lineStyle: {
                  color: "#bdb7ff"
                }
              }
            },
            type: "line"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    toDo(item, i) {
      this.$set(this.todulist[i], "checked", item.checked ? false : true);
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  padding: 40px;
  background: $base-gray1;
  .bg-white {
    background: $base-white;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    cursor: pointer;
    .icons {
      text-align: left;
      width: 86px;
      height: 86px;
      margin: 10px;
      padding: 13px;
      transition: 0.3s ease-in-out;
      border-radius: 3px;
      &:hover {
        background: $base-bule1;
        .icon-yonghu {
          color: $base-white;
        }
      }
      .iconfont {
        font-size: 60px;
      }
      .icon-yonghu {
        font-size: 60px;
        color: $base-bule1;
      }
    }
    .icons1 {
      &:hover {
        background: $base-ye;
        .icon-xiaoxi {
          color: $base-white;
        }
      }
      .icon-xiaoxi {
        color: $base-ye;
      }
    }
    .icons2 {
      &:hover {
        background: $base-green;
        .icon-liuliang {
          color: $base-white;
        }
      }
      .icon-liuliang {
        color: $base-green;
      }
    }
    .icons3 {
      &:hover {
        background: $base-pink;
        .icon-yanjing {
          color: $base-white;
        }
      }
      .icon-yanjing {
        color: $base-pink;
      }
    }
    .icons-right {
      font-size: 24px;
      margin-top: 16px;
      margin-right: 16px;
      li {
        margin: 10px 0;
      }
    }
    .chain {
      color: rgba(0, 0, 0, 0.45);
      font-size: 18px;
    }
  }
  .main-center {
    width: 100%;
    margin-top: 20px;
  }
  .center-left {
    width: 100%;
    text-align: center;
    background: $base-white;
    font-size: 16px;
    color: $base-666;
    padding-bottom: 60px;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    .accout {
      text-align: left;
      margin: 20px;
    }
    .tou {
      margin-bottom: 20px;
      img {
        width: 85px;
        height: 85px;
        border-radius: 50%;
      }
      span {
        line-height: 25px;
      }
    }
    .mobile,
    .time {
      line-height: 30px;
    }
  }
  #charts {
    // width: 100%;
    height: 426px;
    background: $base-white;
    margin-top: 20px;
    padding-top: 20px;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }
  .users {
    margin-top: 20px;
  }
  .todulist {
    background: $base-white;
    margin-top: 20px;
    .item {
      line-height: 46px;
      border-bottom: 1px solid #ededed;
      text-align: left;
      padding-left: 40px;
      cursor: pointer;
      font-size: 16px;
    }
    .done {
      text-decoration: line-through;
      color: gray;
    }
  }
}
</style>

