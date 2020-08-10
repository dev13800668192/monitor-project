<template>
  <div id="linecharts" ref="linecharts"></div>
</template>

<script>
  import echarts from "echarts";
  import axios from 'axios'
  export default {
    mounted() {
      this.drawChart();
    },
    destroyed() {
      window.onresize = null
    },
    methods: {
      drawChart() {
        let myChart = echarts.init(this.$refs.linecharts);
        const data = [];
        let option = {
          title: {
            text: '动态数据 + 时间坐标轴'
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          },
          series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
          }]
        };

        setInterval(function () {
          axios.get('http://10.0.2.148:8080/api/monitor/client/cacheData',).then(res=>{
            data.push([new Date(res.data[0].updateTime),res.data[0].cpu]);
            myChart.setOption({
              series:[{
                data:data
              }]
            })
          })
        }, 5000);
        // 使用刚指定的配置项和数据显示图表。
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      },
      toDo(item, i) {
        this.$set(this.todulist[i], "checked", item.checked ? false : true);
      },

    }
  }

</script>
