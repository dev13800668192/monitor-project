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
      let time = [];
      let data =[];
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
          data: time
        },
        yAxis: {
          type: "value"
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
                  color: "#bdb7ff"
                }
              }
            },
            type: "line"
          }
        ]
      };

      setInterval(function () {
          axios.get('http://10.0.2.148:8080/api/monitor/client/cacheData',).then(res=>{
            time.push(res.data[0].updateTime);
            data.push(res.data[0].cpu);
            console.log(time);
            console.log(data);
            myChart.setOption({
              series:[{
                data:data
              }]
            })
          })
        }, 5000);
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
