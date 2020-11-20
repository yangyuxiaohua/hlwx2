<template>
  <div id="configWrapper">
    <div class="configLeft">
      <div class="menuScaling">
        <img src="../../assets/images/menu.png" alt="">
        <i class="el-icon-back cp" v-show="showLeft" @click="showMenu(1)"></i>
        <i class="el-icon-right cp" v-show="showRight" @click="showMenu(-1)"></i>
      </div>
      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" :collapse="isCollapse" text-color='#fff'>
        <el-submenu index="1" v-for="(item,index) in menus" :key="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.tit}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="i.path" v-for="(i,ind) in item.children" :key="ind">{{i.text}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item> -->
      </el-menu>
    </div>
    <div class="configRight">
      <div class="headerNav"></div>
      <div class="rightContainer">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem } from '@/utils/local.js'
export default {
  data() {
    return {
      isCollapse: false,
      showLeft: true,
      showRight: false,
      menus: [],
      defaultActive:''
    };
  },
  mounted() {
    let menu = getItem('menu')
    this.menus = menu;
    this.defaultActive = this.menus[0].children[0].path;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    showMenu() {
      console.log(11111);
      this.showLeft = !this.showLeft;
      this.showRight = !this.showRight;
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less">
#configWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .configLeft {
    // flex: 0 0 255px;
    background-color: #072d48;
    .menuScaling {
      padding: 10px 20px 10px 25px;
      display: flex;
      justify-content: space-between;
      color: #ffffff;
      font-size: 18px;
      img {
        width: 18px;
        height: 18px;
      }
    }
    .el-menu {
      background-color: #072d48 !important;
      border: none;
      // min-width: 255px;
      .el-menu-item.is-active {
        background-color: #1890ff !important;
        color: #fff;
      }
      .el-menu-item:hover {
        background-color: #1890ff !important;
      }
      .el-submenu__title:hover {
        background-color: #1890ff !important;
      }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 255px;
    }
  }
  .configRight {
    flex: 1;
    display: flex;
    flex-direction: column;
    .headerNav {
      flex: 0 0 50px;
      border-bottom: 1px solid #f2f2f2;
    }
    .rightContainer {
      flex: 1;
    }
  }
  .cp {
    cursor: pointer;
  }
}
</style>