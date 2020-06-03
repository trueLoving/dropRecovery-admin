<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <ul class="user-info">
              <li>
                <div style="height: 100%">
                  <svg-icon icon-class="login" />登录账号
                  <div class="user-right">{{ user.username }}</div>
                </div>
              </li>
              <li>
                <svg-icon icon-class="user1" />用户昵称
                <div class="user-right">{{ user.nickName }}</div>
              </li>
              <li>
                <svg-icon icon-class="phone" />手机号码
                <div class="user-right">{{ user.phone }}</div>
              </li>
              <li>
                <svg-icon icon-class="email" />用户邮箱
                <div class="user-right">{{ user.email }}</div>
              </li>
              <li>
                <svg-icon icon-class="anq" />安全设置
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true">修改密码</a>
                  <a @click="$refs.email.dialog = true">修改邮箱</a>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import updatePass from './center/updatePass'
// import updateEmail from './center/updateEmail'
// import { getToken } from '@/utils/auth'
// import store from '@/store'
// import { isvalidPhone } from '@/utils/validate'
// import { parseTime } from '@/utils/index'
// import crud from '@/mixins/crud'
// import { editUser } from '@/api/system/user'
import Avatar from "@/assets/404_images/404.png";
export default {
  name: "PersonCenter",
  data() {
    // 自定义验证
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };
    return {
      Avatar: Avatar,
      activeName: "first",
      saveLoading: false,
      headers: {
        // Authorization: getToken()
      },
      form: {},
      user: {
          username:'admin',
          nickName:'admin',
          phone:13652456955,
          email:'test@gmail.com'
      },
      rules: {
        nickName: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        phone: [{ required: true, trigger: "blur", validator: validPhone }]
      }
    };
  },
  methods: {
    parseTime() {},
    handleClick(tab, event) {
      if (tab.name === "second") {
        this.init();
      }
    },
    beforeInit() {
      this.url = "api/logs/user";
      return true;
    },
    handleSuccess(response, file, fileList) {
      this.$notify({
        title: "头像修改成功",
        type: "success",
        duration: 2500
      });
      store.dispatch("GetInfo").then(() => {});
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message);
      this.$notify({
        title: msg.message,
        type: "error",
        duration: 2500
      });
    },
    doSubmit() {
      if (this.$refs["form"]) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.saveLoading = true;
            editUser(this.form)
              .then(() => {
                this.editSuccessNotify();
                store.dispatch("GetInfo").then(() => {});
                this.saveLoading = false;
              })
              .catch(() => {
                this.saveLoading = false;
              });
          }
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.avatar-uploader-icon {
  font-size: 28px;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 50%;
}
.user-info {
  padding-left: 0;
  list-style: none;
  li {
    border-bottom: 1px solid #f0f3f4;
    padding: 11px 0;
    font-size: 13px;
  }
  .user-right {
    float: right;

    a {
      color: #317ef3;
    }
  }
}
</style>