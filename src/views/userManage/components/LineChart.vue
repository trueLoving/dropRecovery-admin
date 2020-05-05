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
      default: "400px"
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
          text: "用户一月新增人数",
           x:'center'
        },
        xAxis: {
          type: "category",
          data: ["2020-01", "2020-02", "2020-03", "2020-04", "2020-05", "2020-06", "2020-07"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [30, 60, 90, 34, 90, 30, 20],
            type: 'line'
          }
        ]
      });
    }
  }
};
</script>
