<template>
  <el-dialog title="通知详情" :visible.sync="dialogFormVisible" width="60%">
    <el-form :model="notice">
      <el-form-item label="接收者" :label-width="formLabelWidth">
        <el-select v-model="notice.receiver" placeholder="请选择接收者">
          <el-option v-for="item in receivers" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="通知内容" :label-width="formLabelWidth">
        <vue-editor v-model="notice.content" :editorToolbar="customToolbar"></vue-editor>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="submit">发送</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { VueEditor } from "vue2-editor";
import * as api from "@/api/notice";

export default {
  inject: ["reload"],
  name: "NoticeDialog",
  components: {
    VueEditor
  },
  data() {
    return {
      update: false,
      notice: {
        receiver: "",
        content: "<h1>hello world</h1>"
      },
      receivers: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
    };
  },
  methods: {
    openDialog(notice = {}, update = false) {
      this.notice = notice;
      this.update = update;
      this.dialogFormVisible = true;
    },
    closeDialog() {
      this.dialogFormVisible = false;
    },
    submit() {
      if (this.update) {
        api.modifyNotice(this.notice).then(res => {
          this.$message.success('更新成功');
          this.reload();
      
        });
      } else {
        api.deleteNotice(this.notice).then(res => {
          this.$message.success('发送成功');
          this.reload();
        });
      }
    }
  },
  mounted() {
    api.getReceivers().then(res => {
      this.receivers = res.data;
    });
  }
};
</script>

<style>
</style>