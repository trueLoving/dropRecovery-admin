<template>
  <div class="trade-container">
    <div class="filter-container">
      <el-input
        v-model="conditions.total"
        placeholder="交易金额"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="conditions.status"
        placeholder="交易状态"
        clearable
        style="width:120px"
        class="filter-item"
      >
        <el-option v-for="item in statusOperation" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table :data="list" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">{{scope.$index+(listQuery.page - 1) * listQuery.limit + 1}}</template>
      </el-table-column>
      <el-table-column prop="tradeSend" label="交易者1" width="100" align="center"></el-table-column>
      <el-table-column prop="tradeReceiver" label="交易者2" width="100" align="center"></el-table-column>
      <el-table-column prop="total" label="交易金额(￥)" width="130" align="center"></el-table-column>
      <el-table-column prop="status" width="160" label="状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center" width="120"></el-table-column>
      <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="{row}">
          <el-button
            type="danger"
            round
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(row.id)"
          >删除记录</el-button>
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
    
    <LineChart/>

  </div>
</template>

<script>
import * as api from "@/api/trade";
import tableMixin from "@/mixin/tableMixin";
import LineChart from "./components/LineChart";

export default {
  inject: ["reload"],
  mixins: [tableMixin],
  components:{
    LineChart
  },
  data() {
    return {
      conditions: {
        status: "",
        total: ""
      },
      statusOperation: ["进行中", "失败", "成功"]
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        进行中: "primary",
        失败: "danger",
        成功: "success"
      };
      return statusMap[status];
    }
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.getList();
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该交易记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteTrade(id).then(res => {
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
      api.getTrades({ conditions, listQuery }).then(res => {
        console.log(res);
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
.trade {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>