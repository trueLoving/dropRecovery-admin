<template>
  <div class="user-container">
    <div class="filter-container">
      <el-input
        v-model="conditions.username"
        placeholder="用户名"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table :data="list" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" width="160" align="center">
        <template slot-scope="scope">{{scope.$index+(listQuery.page - 1) * listQuery.limit + 1}}</template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="160" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="200" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="220" align="center"></el-table-column>
      <el-table-column prop="openId" label="openId" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            round
            size="mini"
            icon="el-icon-edit"
            @click="openDialog(scope.row)"
          >更新</el-button>
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

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="用户名" label-width="140px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="140px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="140px">
          <el-input v-model="user.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="openId" label-width="140px">
          <el-input v-model="user.openId" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <div class="chart">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card" style="margin:20px;">
            <BarChart />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" style="margin:20px;">
            <LineChart />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";

import * as api from "@/api/users";
import tableMixin from "@/mixin/tableMixin";

export default {
  inject: ["reload"],
  components: {
    LineChart,
    BarChart
  },
  mixins: [tableMixin],
  data() {
    return {
      dialogFormVisible: false,
      user: {
        username: "",
        phone: "",
        openId: "",
        email: ""
      },
      conditions: {
        username: "",
        phone: ""
      }
    };
  },
  methods: {
    handleDelete(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteUser(id).then(res => {
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
    openDialog(user) {
      this.dialogFormVisible = true;
      this.user = JSON.parse(JSON.stringify(user));
    },
    handleUpdate(user) {
      api
        .modifyUser(user)
        .then(_ => {
          this.$message.success("更新成功");
          this.reload();
        })
        .catch(err => {
          this.$message.error(err.toString());
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      const conditions = this.conditions;
      const listQuery = this.listQuery;
      api.getUsers({ conditions, listQuery }).then(res => {
        // console.log(res);
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
.filter-container {
  padding: 0 40px;
}
.user {
  &-container {
    margin: 30px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>