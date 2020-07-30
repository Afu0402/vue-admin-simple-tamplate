<template>
  <el-card class="data-card" :style="{width:width}">
    <div class="data-card__wrap">
      <i :class="icon" :style="{fontSize:iconSize,color:iconColor}"></i>
      <div>
        <p class="data-card__title">{{title}}</p>
        <p class="data-card__number">{{value}}</p>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
props:{
    width:{
        type:String,
        default:'100%'
    },
    title:{
        type:String,
        default:"title"
    },
    value:{
        type:[String,Number],
        default:100
    },
    icon:{
        type:String,
        default:'el-icon-s-custom'
    },
    iconSize:{
        type:String,
        default:'80px'
    },
    iconColor:{
        type:String,
        default:'#40c9c6'
    }
}
};
</script>

<style lang="scss" scoped>
.data-card__wrap {
    display: flex;
    justify-content:space-between;
    align-items: center;
    i {
        font-size:80px;
        color:#40c9c6;
    }
}
.data-card__title {
    color:rgba(0,0,0,.45);
    font-size: 18px;
}
.data-card__number {
    color: #666;
    font-size: 20px;
}
</style>