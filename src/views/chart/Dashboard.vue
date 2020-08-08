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
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  }
};
</script>	
	
