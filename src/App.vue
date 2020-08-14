<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { request } from "./network/request";
import axios from "axios";
// import qs from "qs"
axios.defaults.headers.post["Content-Type"] =
  "Content-Type:application/x-www-form-urlencoded; charset=UTF-8";

export default {
  name: "app",
  data() {
    return {
      store: this.$store,
    };
  },
  components: {},
  mounted() {
    this.init(this.$store);
    // this.getAllData(this.$store);
  },
  created() {
    this.initDeviceList(this.$store);
  },
  methods: {
   

    init(store) {
      setTimeout(function () {
        let param = new URLSearchParams();
        param.append("ip", store.state.ip);
        axios
          .post("http://10.0.2.148:8080/api/monitor/client/AllData", param)
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
            console.log(datas);
          });
      }, 500);
    },

    initDeviceList(store) {
      // 请求设备列表
      request({
        url: "/devices/getDevice",
      }).then((res) => {
        const playload = {
          param: "devices",
          val: res.data,
        };
        store.commit("initAllDatas", playload);

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].state == 1) {
            const ip = {
              param: "ip",
              val: res.data[i].ip,
            };
            store.commit("initAllDatas", ip);
            break;
          }
        }
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
