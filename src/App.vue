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
    // this.getAllData(this.store,this.params);
  },
  created() {
    request({
      url: "/client/cacheData",
    }).then((res) => {
      let data = res.data;
      this.$store.commit("initCacheData", data);
    });

    axios
      .post("http://10.0.2.148:8087/api/monitor/client/AllData")
      .then((res) => {
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
          this.$store.commit("initAllDatas", playload);
          console.log(datas[param[i]]);
        }
      });
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
