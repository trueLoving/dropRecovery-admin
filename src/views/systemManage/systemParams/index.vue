<template>
  <div class="system-container">
    <div class="system-text">
      <el-table :data="list" style="width: 100%">
      <el-table-column label="序号" width="160" align="center">
        <template slot-scope="scope">{{scope.$index}}</template>
      </el-table-column>
      <el-table-column prop="key" label="键名" width="180" align="center"></el-table-column>
      <el-table-column prop="value" label="键值" width="200" align="center"></el-table-column>
      <el-table-column prop="name" label="参数名" width="210" align="center"></el-table-column>
      <el-table-column prop="set_time" label="设置时间" width="225" align="center"></el-table-column>
      <el-table-column prop="remarks" label="备注"  width="225" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="scope.row.flag=!scope.row.flag" size="mini" :type="scope.row.flag?'danger':'success'">
            {{scope.row.flag?'禁用':'启动'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          key: "password",
          value: "123qwe",
          name: "密码",
          remarks: "nothing....",
          set_time: "2020-01-01 12:00:00",
          flag: true
        },
        {
          id: 2,
          key: "token_sk",
          value: "1qsw12wwq12312",
          name: "token密钥",
          remarks: "nothing....",
          set_time: "2020-01-01 12:00:00",
          flag: false
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.system {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>