<template>
  <div>
    <div class="top">
      <el-date-picker
        v-model="value"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-button style="margin-left:10px;" @click="update(store)">查询</el-button>
    </div>
    <div v-for="(param, index) in params" :key="index">
      <div class="home">
        <el-row :gutter="20" type="flex" justify="center">
          <!-- 趋势图 -->
          <el-col :lg="24">
            <LinechartAllData v-bind:param="param"></LinechartAllData>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 数字滚动插件
import countTo from "vue-count-to";
//引入echarts 插件
import echarts from "echarts";

import dashboard from "./Dashboard";

import LinechartAllData from "./LinechartAllData";

import axios from "axios";
axios.defaults.headers.post["Content-Type"] =
  "Content-Type:application/x-www-form-urlencoded; charset=UTF-8";

export default {
  name: "showalldata",
  components: {
    countTo,
    LinechartAllData,
  },
  data () {
    return {
      store: this.$store,
      params: ["cpu", "gpu", "memory", "fps", "hardDisk", "io"],
      pickerOptions: {
        shortcuts: [],
      },
      value: "",
    };
  },
  destroyed () {
    console.log("allData destiry");
  },
  created () {
    this.update(this.$store)
    console.log(this.$store.state.cpu)
  },
  mounted () {
    console.log("fu mouted:" + this.$store.state.cpu)
    // this.getAllData(this.store,this.params);

  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit("changePath", from.path);
    next();
    // ...
  },
  methods: {

    update (store) {
      let param = new URLSearchParams();
      param.append("ip", store.state.ip);
      console.log(this.value);
      if (this.value != null) {
        param.append("minTime", this.value[0]);
        param.append("maxTime", this.value[1]);
      }

      axios
        .post("http://localhost:8080/api/monitor/client/AllData", param)
        .then((res) => {
          // console.log(res);
          let datas = res.data[0];
          let param = [
            "cpu",
            "gpu",
            "memory",
            "fps",
            "hardDisk",
            "io",
            "updateTime",
          ];
          for (var i = 0; i < param.length; i++) {
            const playload = {
              param: param[i],
              val: datas[param[i]],
            };
            store.commit("initAllDatas", playload);
            console.log("111：" + store.state.cpu)
          }
          // console.log;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.top {
  padding: 0px;
  margin-right: 40px;
  right: 0;
  position: absolute;
  float: right;
  z-index: 99999;
  text-align: right;
}
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

  .chart {
    background: #ededed;
    padding: 20px;
    margin: 0 auto;
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

.dashboard {
  width: 150px;
}
</style>

