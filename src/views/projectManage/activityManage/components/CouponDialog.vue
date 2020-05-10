<template>
  <div>
    <el-dialog title="优惠券详情" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="coupon" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="coupon.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="coupon.type">
            <el-radio label="无门槛券"></el-radio>
            <el-radio label="满减券"></el-radio>
            <el-radio label="折扣券"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="coupon.start_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="结束日期"
              v-model="coupon.end_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="coupon.des"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      coupon: {
        title: "",
        type: "",
        start_time: "",
        end_time: "",
        des: ""
      },
      toUpdate: false
    };
  },
  methods: {
    openDialog(coupon = {}, toUpdate = false) {
      this.toUpdate = toUpdate;
      this.coupon = coupon;
      this.dialogFormVisible = true;
    },
    closeDialog() {
      this.dialogFormVisible = false;
    },
    add() {
      // todo api request
      this.$message.success('添加成功');
      this.$router.push({ path: "/projectManage/activityManage" });
    },
    update() {
      // todo api request
      this.$message.success('更新成功');
      this.$router.push({ path: "/projectManage/activityManage" });
    },
    submit() {
      this.toUpdate ? this.update() : this.add();
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style>
</style>