<template>
</template>

<script>
export default {
  name: "NoticeDialog",
  data() {
    return {
      update: false,
      notice: {
        receiver: "",
        content: ""
      }
    };
  },
  methods: {
    openDialog(notice = {}, update = false) {},
    closeDialog() {}
  }
};
</script>

<style>
</style>