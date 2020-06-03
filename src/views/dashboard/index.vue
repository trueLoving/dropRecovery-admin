<template>
  <div class="dashboard-container">
    <el-card class="box-card" style="margin:20px;">
      <PanelGroup />
    </el-card>

    <el-row>
      <el-col :span="12">
        <el-card class="box-card" style="margin:20px;">
          <BarChart />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="margin:20px;">
          <PieChart />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="box-card" style="margin:20px;">
      <LineChart />
    </el-card>
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
  }
}
</style>
