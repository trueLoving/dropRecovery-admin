<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
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
      default: "500px"
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
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        title: {
          text: "近一周订单，用户，销售额增长曲线图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["用户", "订单", "销售额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "用户",
            type: "line",
            stack: "总量",
            data: [20, 32, 11, 14, 9, 23, 21]
          },
          {
            name: "订单",
            type: "line",
            stack: "总量",
            data: [22, 18, 19, 23, 29, 33, 31]
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            data: [15, 23, 21, 15, 10, 33, 10]
          }
        ]
      });
    }
  }
};
</script>
