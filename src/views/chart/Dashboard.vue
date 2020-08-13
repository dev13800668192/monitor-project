<template>
  <div id="dashboard" ref="dashboard"></div>
</template>

<script>
import echarts from "echarts";
import { request } from "../../network/request";

export default {
  props: {
    param: String,
  },
  created() {},
  mounted() {
    this.SetEchart(this.param,this.$store);
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    SetEchart(param,store) {
      let cpu = this.$store.state.cacheData[
        this.$store.state.cacheData.length - 1
      ][param];
      console.log(cpu);
      let myChart = echarts.init(this.$refs.dashboard);
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            name: "CPU",
            type: "gauge",
            radius: "80%",
            detail: {
              formatter: "{value}%",
            },
            data: [
              {
                value: cpu,
                name: param + "占用率",
              },
            ],
          },
        ],
      };

      myChart.setOption(option);
      setInterval(function () {
          option.series[0].data[0].value = store.state.cacheData[store.state.cacheData.length-1][param]
          myChart.setOption(option);
      }, 5000);

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>	
	
