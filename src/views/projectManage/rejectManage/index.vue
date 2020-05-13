<template>
  <div class="reject-container">
    <el-table :data="list" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">{{scope.$index+(listQuery.page - 1) * listQuery.limit + 1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="废品名称" width="120" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" width="100" align="center"></el-table-column>
      <el-table-column prop="recall_price" label="回收单价(￥)" width="150" align="center"></el-table-column>
      <el-table-column prop="amount" width="160" label="总数" align="center"></el-table-column>
      <el-table-column prop="sold" label="已售数" align="center" width="120"></el-table-column>
      <el-table-column prop="is_remainder" label="是否售罄" align="center" width="120"></el-table-column> 
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
    <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="{row}">
          <el-button
            type="primary"
            round
            size="mini"
            icon="el-icon-edit"
          >更新</el-button>
          <el-button
            type="danger"
            round
            size="mini"
            icon="el-icon-delete"
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
  </div>
</template>

<script>
import * as api from "@/api/reject";
import tableMixin from "@/mixin/tableMixin";

export default {
  mixins: [tableMixin],
  data() {
    return {
      conditions: {
        type: "",
        is_remainder: ""
      }
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      const conditions = this.conditions;
      const listQuery = this.listQuery;
      api.getRejects({ conditions, listQuery }).then(res => {
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
.reject {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>