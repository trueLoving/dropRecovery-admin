<template>
  <div class="dashboard-container">
    
    <PanelGroup />

    <el-row >
      <el-col :span="12">
        <BarChart/>
      </el-col>
      <el-col :span="12">
        <PieChart/>
      </el-col>
    </el-row>

    <LineChart/>

  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";

export default {
  name: "Dashboard",
  components: {
    PanelGroup,
    LineChart,
    PieChart,
    BarChart
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    // background-color: rgb(240, 242, 245);
  }
}
</style>
