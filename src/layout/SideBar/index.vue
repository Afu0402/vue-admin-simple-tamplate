<template>
  <div class="side-bar">
    <el-menu :default-active="activeMenu"  class="el-menu-vertical-demo" router :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText">
        <template v-for="(item,index) in MenuList" :item="item">
            <Item  :key="index" :item="item" v-if="!item.hidden"></Item>
        </template>
    </el-menu>
    <!-- <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu> -->
    <div>

    </div>
  </div>
</template>

<script>
import variables from "@/styles/variables.scss";
import { routes } from "@/route/index.js";
import Item from "./Item";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  components: {
    Item,
  },
  computed: {
    variables() {
      return variables;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    MenuList() {
      return routes;
    },
  },
};
</script>

<style lang="scss">
.side-bar {
  overflow: hidden;
  height: 100%;
  display: inline-block;
  position: fixed;
  left:0;
  top:0;
  bottom:0;
  z-index: 20001;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>