<template>
  <div class="notice-container">
    <div class="filter-container">
      <el-input
        v-model="conditions.receiver"
        placeholder="接收者名字"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="conditions.status"
        placeholder="通知状态"
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
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">{{scope.$index+(listQuery.page - 1) * listQuery.limit + 1}}</template>
      </el-table-column>
      <el-table-column prop="receiver" label="接收者" width="200" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="200" align="center"></el-table-column>
      <el-table-column prop="status" width="220" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status=='未读'?'danger':'success'">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" align="center" width="620"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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

    <NoticeDialog ref="noticeDialog" />
  </div>
</template>

<script>
import * as api from "@/api/notice";
import tableMixin from "@/mixin/tableMixin";
import NoticeDialog from "./components/NoticeDialog";

export default {
  inject: ["reload"],
  mixins: [tableMixin],
  components: {
    NoticeDialog
  },
  data() {
    return {
      conditions: {
        status: "",
        receiver: ""
      },
      statusOperation: ["已读", "未读"]
    };
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.getList();
    },
    handleUpdate(notice) {
      const n = JSON.parse(JSON.stringify(notice));
      this.$refs.noticeDialog.openDialog(n, true);
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该通知, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteNotice(id).then(res => {
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
    handleAdd() {
      this.$refs.noticeDialog.openDialog();
    },
    getList() {
      this.listLoading = true;
      const conditions = this.conditions;
      const listQuery = this.listQuery;
      api.getNotices({ conditions, listQuery }).then(res => {
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
.notice {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>