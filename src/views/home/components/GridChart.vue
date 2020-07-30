<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
import {debounce} from '@/tools/index.js'
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require("echarts/theme/macarons"); // echarts theme
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      default:null
    },
    color:{
      type:String,
      default:"#3398DB" //#40c9c6
    },
    title:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.handleResize);
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.handleResize = debounce(() => {
        console.log(this.chart)
        this.chart && this.chart.resize();
      },100)
      window.addEventListener('resize', this.handleResize)
      this.setOptions(this.chartData);
    },
    setOptions(data) {
      let items = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      let values = [100,200,300,500,500,600,700];
      if(this.data) {
        items = data.map(item => item.true_name);
        values = data.map(item => item.purchase_fee);
      }
      
      this.chart.setOption({
        title: {
          text: this.title,
          textStyle:{
            color:'#000'
          }
        },
        color: [this.color],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "2%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data:items,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            barWidth: "60%",
            data: values
          }
        ]
      });
    }
  }
};
</script>
