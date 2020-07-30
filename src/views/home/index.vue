<template>
  <div class="home" v-loading="loading">
    <template v-if="!loading">
      <div class="data-card__list">
        <DataCard title="当日新增会员" :value="newMemberDay"></DataCard>
        <DataCard title="当月新增会员" :value="newMemberMonth"  icon="el-icon-s-order" icon-color="#36a3f7"></DataCard>
        <DataCard title="当日销售额" :value="saleDay + '元'" icon="el-icon-coin" icon-color="#f4516c"></DataCard>
        <DataCard title="当月销售额" :value="saleMonth + '元'" icon="el-icon-s-order" icon-color="#36a3f7"></DataCard>
      </div>
      <div class="charts-wrap">
        <GridChart height="100%" :chartData="consumeTop5month" color="#40c9c6" title="消费前五"></GridChart>
        <GridChart height="100%" :chartData="rechargeTop5month" title="充值前五"></GridChart>
      </div>
    </template>
    
  </div>
</template>

<script>
import GridChart from "./components/GridChart";
import DataCard from "./components/DataCard";
export default {
  data() {
    return {
        newMemberDay:0,//今日新增会员，
        newMemberMonth:0,//月新增
        saleDay:0, //当天收入
        saleMonth:0, //当月收入,
        consumeTop5month:[], //当月消费前5
        rechargeTop5month:[],//当月充值前5
        loading:false
    };
  },
  created(){
  },
  components: {
    GridChart,
    DataCard,
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 1vw;
  height: 100%;
  box-sizing: border-box;
}
.charts-wrap {
  margin-top: 4vh;
  display: flex;
  justify-content: space-between;
  height:70%;
}
.data-card__list {
  display: flex;
  justify-content: space-between;
}
.data-card__list > div + div {
  margin-left: 1vw;
}
</style>