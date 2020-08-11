<template>
  <div id="dashboard" ref="dashboard"></div>
</template>

<script>
import echarts from "echarts";

export default {
  props:{
    param:String
  },
  mounted () {
    this.SetEchart(this.param);
    // console.log(this.param)
  },
  destroyed () {
    window.onresize = null
  },
  methods: {
    SetEchart (param) {
      let cpu = this.$store.state.cacheData[this.$store.state.cacheData.length-1][param]
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
            name: param+'占用率'
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
	
