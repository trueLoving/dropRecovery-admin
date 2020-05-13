<template>
  <div class="reject-container">
    <div class="filter-container">
      <el-input
        v-model="conditions.type"
        placeholder="废品类型"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="conditions.is_remainder"
        placeholder="售罄状态"
        clearable
        style="width:120px"
        class="filter-item"
      >
        <el-option v-for="item in statusOperation" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" @click="handleAdd" style="float:right" round>添加</el-button>
    </div>
    <el-table :data="list" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" width="120" align="center">
        <template slot-scope="scope">{{scope.$index+(listQuery.page - 1) * listQuery.limit + 1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="废品名称" width="140" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" width="120" align="center"></el-table-column>
      <el-table-column prop="recall_price" label="回收单价(￥)" width="160" align="center"></el-table-column>
      <el-table-column prop="amount" width="180" label="总数" align="center"></el-table-column>
      <el-table-column prop="sold" label="已售数" align="center" width="140"></el-table-column>
      <el-table-column prop="is_remainder" label="是否售罄" align="center" width="140"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="220">
        <template slot-scope="{row}">
          <el-button
            type="primary"
            round
            size="mini"
            icon="el-icon-edit"
            @click="hanldeUpdate(row)"
          >更新</el-button>
          <el-button
            type="danger"
            round
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(row.id)"
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
  inject:['reload'],
  mixins: [tableMixin],
  data() {
    return {
      conditions: {
        type: "",
        is_remainder: ""
      },
      statusOperation: ["已售罄", "未售罄"]
    };
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.getList();
    },
    handleUpdate(reject) {},
    handleAdd() {},
    handleDelete(id) {
      this.$confirm("此操作将永久删除该废品相关信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteReject(id).then(res => {
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