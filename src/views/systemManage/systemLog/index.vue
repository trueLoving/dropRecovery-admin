<template>
  <div class="system-container">
    <div class="filter-container">
      <el-input
        v-model="conditions.user"
        placeholder="用户名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="conditions.method"
        placeholder="请求方法"
        clearable
        style="width:120px"
        class="filter-item"
      >
        <el-option v-for="item in methodOperation" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
    </div>

    <el-table :data="list" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" width="160" align="center">
        <template slot-scope="scope">{{scope.$index+(listQuery.page - 1) * listQuery.limit + 1}}</template>
      </el-table-column>
      <el-table-column prop="user" label="用户" width="160" align="center"></el-table-column>
      <el-table-column prop="method" label="请求方法" width="180" align="center"></el-table-column>
      <el-table-column prop="ip" label="ip地址" width="200" align="center"></el-table-column>
      <el-table-column prop="create_time" width="220" label="请求时间" align="center"></el-table-column>
      <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>
</template>
<script>
import * as api from "@/api/logs";
import tableMixin from "@/mixin/tableMixin";

export default {
  mixins: [tableMixin],
  data() {
    return {
      methodOperation: ["get", "post", "delete", "put"],
      conditions:{
        user:'',
        method:''
      }
    };
  },
  methods: {
    handleFilter() {
      console.log(this.listQuery);
    },
    getList() {
      this.listLoading = true;
      const conditions = this.conditions;
      const listQuery = this.listQuery;
      api.getLogs({conditions,listQuery}).then(res => {
        const data = res.data;
        this.list = data.items;
        this.total = data.total;
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.system {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.filter-container {
  margin: 30px;
}
</style>