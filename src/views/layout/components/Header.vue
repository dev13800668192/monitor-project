<template>
  <div class="head-container ">
    <div class="header-left">
      <showAside :toggle-click="toggleClick" />
      <dropDownmenu />

    </div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- button -->
        <el-row style="margin: 10px;">
          <el-button type="primary" round>实时数据</el-button>
          <el-button type="primary" round>历史数据</el-button>
        </el-row>

        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import showAside from "./showAside";
  import dropDownmenu from "./Dropdownmenu.vue";
  export default {
    // name:'header',
    components: {
      showAside,
      dropDownmenu,
    },
    data() {
      return {
        fullscreen: false,
        name: "linxin",
        message: 2,
        username: "zyh"
      };
    },
    computed: {
      isCollapse: {
        get: function () {
          return this.$store.state.isCollapse;
        },
        set: function (newValue) {
          this.$store.commit("IS_COLLAPSE", newValue);
        }
      }
    },
    methods: {
      toggleClick() {
        this.isCollapse = !this.isCollapse;
      },
      // 用户名下拉菜单选择事件
      logout(command) {
        this.$store.commit('TAGES_LIST', [])
        this.$store.commit('SET_BREAD', ['home'])
        this.$router.push("/login");
      },
      // 全屏事件
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    }
  };

</script>

<style lang="scss" scoped>
  .head-container {
    z-index: 99;
    height: 50px;
    line-height: 50px;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
      0 0 3px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    border-bottom: 1px solid #f0f0f0;
  }

  .header-left {
    float: left;
  }

  .header-right {
    float: right;
    padding-right: 50px;
  }

  .header-user-con {
    display: flex;
    height: 50px;
    align-items: center;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .btn-bell {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    font-size: 24px;
    margin-right: 20px;
    margin-bottom: 15px;
  }

  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: 8px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
  }

  .btn-bell .el-icon-bell {
    color: #666;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;

    // position: absolute;
    // right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-button--primary {
    color: #FFF;
    background-color: #047ee2;
    border-color: #047ee2;
  }

</style>
