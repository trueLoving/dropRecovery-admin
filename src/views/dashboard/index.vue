<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from './admin'

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  },
  data(){
    return {
      currentRole: 'adminDashboard'
    }
  },
  components:{
    adminDashboard
  }
};
</script>
