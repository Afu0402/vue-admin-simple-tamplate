<template>
  <div class="sidebar-item">
    <template v-if="item.children && item.children.length > 1">
      <el-submenu :index="item.path" popper-append-to-body>
				<template slot="title">
					<i :class="resolveIcon(item)"></i>
          <span slot="title">{{resolveTitle(item)}}</span>
				</template>
         <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="item.path"
        />
      </el-submenu>
    </template>
    <el-menu-item :index="resolvePath(item)" v-else >
				<i :class="resolveIcon(item)"></i>
        <span slot="title">{{resolveTitle(item)}}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "sidebar-item",
  props: {
    item: Object,
    basePath:{
      type:String,
      default:''
    }
  },
  methods: {
    resolvePath(item,child) {
      if (item.children && item.children.length === 1) {
				if(item.path.trim() === '/') {
      	  return item.path  + item.children[0].path;
				}
        return item.path + '/' + item.children[0].path;
      }
      return `${this.basePath}/${item.path}`;
    },
    resolveIcon(item) {
      let icon = "";
      if (item.children && item.children.length === 1) {
				let firstChild = item.children[0];
				icon = firstChild.meta && firstChild.meta.icon ? firstChild.meta.icon : '';
      } else {
        icon = item.meta && item.meta.icon ?  item.meta.icon : '';
      }
      return icon;
    },
    resolveTitle(item) {
      let title = "";
      if (item.children && item.children.length === 1) {
				let firstChild = item.children[0];
				title = firstChild.meta && firstChild.meta.title ? firstChild.meta.title : '';
      } else {
        title = item.meta && item.meta.title ?  item.meta.title : '';
      }
      return title;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>