<template>
  <div class="navbar">
    <div class="left">
      <i class="el-icon-s-fold close-btn" @click="closeSidebar"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="right">
      <el-dropdown>
      			<el-avatar :src="userPng"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="onExit">退出</el-dropdown-item>
          <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import userImg from "@/assets/user.png";
export default {
  data() {
    return {
      levelList: []
    };
  },
  watch: {
    $route() {
      this.getBreadList();
    }
  },
  created() {
    this.getBreadList();
  },
  computed: {
    userPng() {
      return userImg;
    }
  },
  methods: {
    closeSidebar(){
      this.$emit('close-side-bar')
    },
    onExit(){
      this.$store.dispatch('user/logout').then(res => {
        this.$router.replace('/login')
      });
    },
    getBreadList() {
      this.levelList = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 1vw;
}
.close-btn {
  font-size: 20px;
  margin-right: 40px;
  cursor: pointer;
}
.left,
.right {
  display: flex;
  align-items: center;
}
</style>