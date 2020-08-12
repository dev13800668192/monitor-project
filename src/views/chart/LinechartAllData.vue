<template>
  <div id="charts" ref="charts"></div>
</template>

<script>
import echarts from "echarts";
import { request } from "../../network/request";
export default {
  props: {
    param: String,
  },
  data() {
    return {
      store: this.$store,
    };
  },
  mounted() {
    this.drawChart(this.store, this.param);
    // console.log(this.$store.state.updateTime)
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    drawChart(store, param) {
      let myChart = echarts.init(this.$refs.charts);
      let time = this.$store.state.updateTime
      let data = this.$store.state[param]

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
          name:'%',
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

      myChart.setOption(option);

      setInterval(function () {
        myChart.setOption({
          xAxis: {
            data: store.state.updateTime,
          },
          series: [
            {
              type: "line",
              data: store.state[param],
            },
          ],
        });
      }, 1000);

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    toDo(item, i) {
      this.$set(this.todulist[i], "checked", item.checked ? false : true);
    },
  },
};
</script>
