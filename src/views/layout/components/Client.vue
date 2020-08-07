<template>
  <div class="home">
    <!-- 仪表盘 and 趋势图 -->
    <el-row :gutter="40">
      <!-- 仪表盘 -->
      <el-col :lg="6" :sm="8" :xs="24">
        <div class="main-center clearfix">
          <div id="dashboard" ref="dashboard"></div>
        </div>
      </el-col>

      <!-- 趋势图 -->
      <el-col :lg="14"></el-col>
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
  components: {
    countTo
  },
  data () {
    return {

    };
  },
  mounted () {
    this.SetEchart();
    this.init();
  },
  destroyed () {
    window.onresize = null
  },
  methods: {
    init () {
      //图表自适应
      window.onresize = () => {
        if (this.$refs.dashboard) {
          echarts.init(this.$refs.dashboard).resize();
        }
      };
    },
    SetEchart () {
      let myChart = echarts.init(this.$refs.dashboard);
      let option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
          name: '业务指标',
          type: 'gauge',
          radius: "80%",
          detail: {
            formatter: '{value}%'
          },
          data: [{
            value: 50,
            name: '完成率'
          }]
        }]
      };
      myChart.setOption(option);
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
    height: 350px;
    background: $base-white;
    margin-top: 20px;
    padding-top: 20px;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }

  #dashboard {
    height: 350px;
    background: $base-white;
    margin-top: 20px;
    padding-top: 20px;
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

.dashboard {
  width: 150px;
}
</style>
