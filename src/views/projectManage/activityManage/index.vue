<template>
  <div class="activity-container">
    <div class="toolbar">
      <el-select
        v-model="conditions.status"
        placeholder="通知状态"
        clearable
        style="width:120px"
        class="filter-item"
      >
        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button
        type="primary"
        round
        size="mini"
        style="float:right"
        @click="$router.push({path:'./activityManage/activityDetail'})"
      >添加</el-button>
    </div>

    <el-table :data="list" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" width="160" align="center">
        <template slot-scope="scope">{{scope.$index+(listQuery.page - 1) * listQuery.limit + 1}}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="200" align="center"></el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="200" align="center"></el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="220" align="center"></el-table-column>
      <el-table-column prop="status" width="220" label="状态" align="center"></el-table-column>
      <el-table-column prop="des" label="描述" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            round
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >详情</el-button>
          <el-button
            type="danger"
            round
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-card class="box-card" style="margin:20px;">
      <BarChart />
    </el-card>
    
  </div>
</template>

<script>
import * as api from "@/api/activity";
import tableMixin from "@/mixin/tableMixin";
import BarChart from "./components/BarChart";

export default {
  inject: ["reload"],
  mixins: [tableMixin],
  components: {
    BarChart
  },
  data() {
    return {
      conditions: {
        status: ""
      },
      statusOptions: ["已下线", "已上线", "筹备中"]
    };
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.getList();
    },
    handleUpdate(user) {
      this.$router.push({
        path: "./activityManage/activityDetail",
        query: { user, update: true }
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteActivity(id).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.reload();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getList() {
      this.listLoading = true;
      const conditions = this.conditions;
      const listQuery = this.listQuery;
      api.getActivities({ conditions, listQuery }).then(res => {
        const data = res.data;
        this.list = data.items;
        this.total = data.total;
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.activity {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>