<template>
  <div class="user-container">
    用户管理
  </div>
</template>

<script>

import * as api from '@/api/users';

export default {

  mounted(){
    api.getUsers().then((res)=>{
      console.log(res);
    })
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