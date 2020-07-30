<template>
  <div class="layout">
    <SideBar ref="sidebar"></SideBar>
    <div class="layout-main" :style="{'margin-left':margin}">
      <NavBar @close-side-bar="handleCloseSidebar" />
      <section class="app-main">
          <keep-alive :exclude="['PayRecord']">
            <router-view></router-view>
          </keep-alive>
      </section>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBar";
import NavBar from "./Navbar";
export default {
  components: {
    SideBar,
    NavBar
  },
  methods:{
    handleCloseSidebar(){
      this.$refs.sidebar.isCollapse = !this.$refs.sidebar.isCollapse;
      if( this.$refs.sidebar.isCollapse) {
        this.margin = "64px";
      } else {
        this.margin = "200px";
      }
    }
  },
  data(){
    return {
      margin:"200px",
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  // display: flex;
}
.layout-main {
  height: 100%;
  overflow: auto;
  transition: margin .3s;
}
.app-main {
    height:calc(100% - 50px);
    width:100%;
}
</style>