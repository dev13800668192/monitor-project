<template>
  <div id="app">
    <router-view></router-view>
    <div>{{$store.state.cacheData}}</div>
  </div>
</template>

<script>
  import {request} from './network/request';
  export default {
    name: 'app',
    data() {
      return {
      }
    },
    components: {},
    created() {
      request({
          url: '/client/cacheData'
        }).then(res=>{
          let data = res.data;
          this.$store.commit('initCacheData',data);
        })
    },
    methods: {
        
    },
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
