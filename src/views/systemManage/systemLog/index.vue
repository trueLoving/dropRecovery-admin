<template>
  <div class="system-container">
    <h1>系统管理</h1>
    <div class="system-text">系统日志</div>
  </div>
</template>
<script>

import * as api from '@/api/logs'

export default {

  mounted(){
    api.getLogs().then((res)=>{
      console.log(res);
    })
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