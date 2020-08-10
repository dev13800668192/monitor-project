<template>
  <div id="dashboard" ref="dashboard"></div>
</template>

<script>
import echarts from "echarts";

export default {
  mounted () {
    this.SetEchart();
  },
  destroyed () {
    window.onresize = null
  },
  methods: {
    SetEchart () {
      let cpu = this.$store.state.cacheData[this.$store.state.cacheData.length-1].cpu
      let myChart = echarts.init(this.$refs.dashboard);
      let option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
          name: 'CPU',
          type: 'gauge',
          radius: "80%",
          detail: {
            formatter: '{value}%'
          },
          data: [{
            value: cpu,
            name: 'CPU占用率'
          }]
        }]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  }
};
</script>	
	
