<template>
  <div id="charts" ref="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted () {
    this.drawChart();
  },
  destroyed () {
    window.onresize = null
  },
  methods: {
    drawChart () {
      let myChart = echarts.init(this.$refs.charts);
      let time = []
      let option = {
        title: {
          text: "CPU近5分钟运行状态",
          x: "center",
          textStyle: {
            fontSize: 16
          }
        },
        legend: {
          data: ["CPU占用率"]
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}<br>CPU占用率{c}"
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
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    toDo (item, i) {
      this.$set(this.todulist[i], "checked", item.checked ? false : true);
    }
  }
}
</script>
