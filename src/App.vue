<template>
  <div id="app">
    <router-view></router-view>
    <div>{{$store.state.cacheData}}</div>
  </div>
</template>

<script>
import { request } from "./network/request";
import axios from "axios";
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
    this.initData(this.$store);
    this.initDeviceList();
    this.getAllData(this.store);
  },
  methods: {
    getAllData(store) {
      setInterval(function () {
        this.initData(store);
      }, 50000);
    },
    initData(store) {
      axios
        .post("http://10.0.2.148:8087/api/monitor/client/AllData", {
          ip: store.state.ip,
        })
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
    initDeviceList() {
      // 请求设备列表
      request({
        url: "/devices/getDevice",
      }).then((res) => {
        const playload = {
          param: "devices",
          val: res.data,
        };
        this.$store.commit("initAllDatas", playload);

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].state == 1) {
            const ip = {
              param: "ip",
              val: res.data[i].ip,
            };
            this.$store.commit("initAllDatas", ip);
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
