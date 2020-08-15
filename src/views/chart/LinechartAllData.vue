<template>
  <div id="charts" ref="charts"></div>
</template>

<script>
import echarts from "echarts";
import { request } from "../../network/request";
import { mapGetters } from 'vuex'
import axios from "axios";
axios.defaults.headers.post["Content-Type"] =
  "Content-Type:application/x-www-form-urlencoded; charset=UTF-8";
export default {
  props: {
    param: String
  },
  data() {
    return {
      store: this.$store,
    };
  },
  mounted() {
    // this.getAllData(this.$store)
    console.log(this.$store.state.cpu)
      this.drawChart(this.store, this.param)
  },
  computed: {
    
    updateData() {
      return this.$store.state.updateTime;
    }
  },
  watch: {
    updateData(newData, oldData){
      this.drawChart(this.store, this.param);
    }
  },
  updated() {

    
  },
  beforeDestroy() {
    let dcharts = echarts.getInstanceByDom(this.$refs.charts)
        if (dcharts) {
            dcharts.clear();
            dcharts.dispose();
        }

  },
  destroyed() {
    console.log("===========================================");
    window.onresize = null;
  },
  methods: {
    drawChart(store, param) {
      let myChart = echarts.getInstanceByDom(this.$refs.charts);
      if (!myChart) {
        myChart = echarts.init(this.$refs.charts, "light");
      }
      myChart.clear();
      let time = store.state.updateTime;
      let data = store.state[param];

      console.log("============"+time)

      let option = {
        title: {
          text: param + "历史状态数据",
          x: "center",
          textStyle: {
            fontSize: 16,
          },
        },
        legend: {
          data: [param + "占用率"],
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}<br>" + param + "占用率 {c}% ",
        },
        xAxis: {
          type: "category",
          data: time,
          boundaryGap: false,
          splitLine: {
            show: true,
          },
        },
        yAxis: {
          type: "value",
          max: 100, //设置最大值
          min: 0, //设置最小值
          interval: 20, //设置刻度间距
          name: "%",
          splitLine: {
            show: true,
          },
        },
        series: [
          {
            data: data,
            itemStyle: {
              normal: {
                //折点颜色
                color: "#bdb7ff",
                //折线颜色
                lineStyle: {
                  color: "#bdb7ff",
                },
              },
            },
            type: "line",
            areaStyle: {},
          },
        ],
      };
      // myChart.clear();
      myChart.setOption(option);
      // let timer = setInterval(function () {
      //   clearInterval(timer);
      //   // myChart.clear();
      //   myChart.setOption({
      //     xAxis: {
      //       data: store.state.updateTime,
      //     },
      //     series: [
      //       {
      //         type: "line",
      //         data: store.state[param],
      //       },
      //     ],
      //   });
      // }, 5000000);

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getAllData(store) {
      let param = new URLSearchParams();
      param.append("ip", store.state.ip);
      axios
        .post("http://10.0.2.148:8087/api/monitor/client/AllData", param)
        .then((res) => {
          console.log(res);
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
          }
        });
    },

    toDo(item, i) {
      this.$set(this.todulist[i], "checked", item.checked ? false : true);
    },
  },
};
</script>
