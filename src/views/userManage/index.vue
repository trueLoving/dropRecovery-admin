<template>
  <div class="user-container">
    <el-button type="primary" size="mini" style="float:right">add user</el-button>
    <el-table :data="tableData" style="width: 100%" v-loading="listLoading">
      <el-table-column label="username" prop="username" align="center"></el-table-column>
      <el-table-column label="name" prop="name" align="center"></el-table-column>
      <el-table-column label="role" prop="role" align="center"></el-table-column>
      <el-table-column label="locked" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.locked==1?'success':'danger'"
          >{{ scope.row.locked | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="action">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">Delete</el-button>
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
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  components: {
    Pagination
  },
  data() {
    return {
      listLoading: false,
      tableData: [],
      search: "123123",
      total: 4000,
      listQuery: {
        page: 1,
        limit: 10
      }
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "normal",
        0: "locked"
      };
      return statusMap[status];
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getList() {
      this.listLoading = true;
      userApi
        .getUserByPage(this.listQuery)
        .then(res => {
          this.total = res.data.data.total;
          this.tableData = res.data.data.records;
          this.listLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.listLoading = false;
        });
    }
  },
  created() {
    // this.getList();
  }
};
</script>
<style lang="scss" scoped>
.user {
  &-container {
    margin: 30px;
  }
}
</style>