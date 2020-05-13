<template>
  <div class="activity-detail-container">
    <div class="page-header-container">
      <el-page-header @back="goBack" content="活动详情"></el-page-header>
    </div>

    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="user.title"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="开始日期"
            v-model="user.start_time"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="结束日期"
            v-model="user.end_time"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动状态">
        <el-radio-group v-model="user.status">
          <el-radio label="筹备中"></el-radio>
          <el-radio label="已上线"></el-radio>
          <el-radio label="已下线"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动描述">
        <el-input type="textarea" v-model="user.des"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" style="float:right" size="mini" round>保存</el-button>
      </el-form-item>
    </el-form>

    <h2>优惠券</h2>

    <div class="toolbar">
      <el-button
        type="primary"
        round
        size="mini"
        style="float:right"
        @click="$refs.CouponDialog.openDialog()"
      >添加</el-button>
    </div>

    <el-table :data="user.coupon" style="width: 100%">
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">{{scope.$index}}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="150" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" width="150" align="center"></el-table-column>
      <el-table-column prop="start_time" label="开始时间" align="center"></el-table-column>
      <el-table-column prop="end_time" label="结束时间" align="center"></el-table-column>
      <el-table-column prop="des" label="描述" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            round
            size="mini"
            icon="el-icon-edit"
            @click="handleCouponUpdate(scope.row)"
          >更新</el-button>
          <el-button
            type="danger"
            round
            size="mini"
            icon="el-icon-delete"
            @click="handleCouponDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <CouponDialog ref="CouponDialog" />
  </div>
</template>

<script>
import CouponDialog from "./components/CouponDialog";
import * as api from "@/api/activity";

export default {
  inject: ["reload"],
  components: {
    CouponDialog
  },
  data() {
    return {
      user: {
        title: "",
        start_time: "",
        end_time: "",
        des: "",
        status: "",
        coupon: []
      },
      update: false
    };
  },
  methods: {
    goBack(){
      this.$router.back();
    },
    submit() {
      api.modifyActivity(this.user).then(res => {
        this.$message.success("更新成功");
        this.$router.push({ path: "/projectManage/activityManage" });
      });
    },
    handleCouponUpdate(coupon) {
      const c = JSON.parse(JSON.stringify(coupon));
      this.$refs.CouponDialog.openDialog(c, true);
    },
    handleCouponDelete(id) {
      this.$confirm("此操作将永久删除该优惠券, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          // TODO api request
          this.$router.push({ path: "/projectManage/activityManage" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCouponAdd(coupon) {
      this.user.coupon.push(coupon);
    }
  },
  mounted() {
    const { user, update } = this.$route.query;
    this.update = update;
    if (this.update) {
      this.user = user;
    }
  }
};
</script>

<style scoped>
.activity-detail-container {
  width: 66vw;
  padding: 30px;
  margin: 0 auto;
}
.page-header-container {
  border: 1px solid white;
  margin: 30px auto;
}
</style>