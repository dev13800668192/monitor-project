<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import showalldata from "../../chart/ShowAllData";
export default {
  name: "client",
  components: {
    showalldata,
  },
  data() {
    return {
      cacheData: [],
    };
  },methods: {
    toCacheData(){
        this.$router.push('/client/cacheData');
      },
      toAllData(){
        this.$router.push('/client/allData');
      },
  },
};
</script>

