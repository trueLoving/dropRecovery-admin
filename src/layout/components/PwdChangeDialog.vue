<template>
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="40%">
    <el-form :model="form" status-icon ref="form" label-width="100px" :rules="rules" size="mini">
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input type="password" v-model="form.oldPwd" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="form.newPwd" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="form.checkPwd" autocomplete="off" show-password></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog();reset('form')">取 消</el-button>
      <el-button type="primary" @click="closeDialog();submit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  inject:['reload'],
  data() {
    const checkPwdVal = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPwd: "",
        newPwd: "",
        checkPwd: ""
      },
      rules: {
        oldPwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        checkPwd: [{ validator: checkPwdVal, trigger: "blur" }]
      },
      dialogFormVisible: false
    };
  },
  methods: {
    openDialog() {
      this.dialogFormVisible = true;
    },
    closeDialog() {
      this.dialogFormVisible = false;
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message.success('提交成功');
          // ajax请求
          this.reload();
        } else {
          this.$message.error('输入结果不符合要求');
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>