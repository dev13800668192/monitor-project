<template>
  <div class="aside">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" 
        :collapse="isCollapse"  active-text-color="#bdb7ff" router>
        <template v-for="item in items">
            <el-menu-item :index="item.index" :key="item.index" @click="getType(item.index)">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  export default {
    data() {
      return {
        items:[
        {
          icon: "el-icon-news",
          index: "/client",
          title: "客户端性能监控"
        },
        {
          icon: "el-icon-news",
          index: "/serve",
          title: "服务器性能监控"
        }
        ]
      };
    },
    mounted() {

    },
    computed: {
      onRoutes() {
        console.log(this.$store.state.type)
        return this.$route.path.replace("#/", "");
      },
      ...mapState(["isCollapse"]), //从vuex里面获取菜单是否折叠
    },
    methods: {
      getType(param){
        this.$store.commit('getType',param);
        console.log(this.$store.state.type)
      }
    }
  };

</script>

<style lang="scss" scoped>
  .aside {
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 180px;
      height: 100%;
      text-align: left;
    }

    .el-menu--collapse {
      height: 100%;
    }
  }

</style>
