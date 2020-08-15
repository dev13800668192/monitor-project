<template>
  <div class="breadcrumb">
    <el-dropdown>
      <span class="el-dropdown-link">
        客户端IP: {{ip}} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item v-for="(item, index) in devices" v-bind:disabled="item.state=='1'?false:true" :key="index" @click.native="changeIp(item.ip)" >
        <i :class="item.state=='1'?'el-icon-circle-check':'el-icon-circle-close'"></i> {{item.ip}} 
        </el-dropdown-item>
    
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      devices:this.$store.state.devices,
      ip:this.$store.state.ip
    };
  },
  methods: {
    changeIp(param){
      this.ip = param;
      const playload = {
            param: 'ip' ,
            val: param,
          };
      this.$store.commit("initAllDatas",playload)
      console.log(this.$store.state.ip)
    }
  },
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  float: left;
  margin-left: 10px;
}
.el-breadcrumb {
  line-height: 44px;
}
</style>
