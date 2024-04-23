<template>
  <div class="marquee-container">
    <div v-if="loggedInUser" class="marquee-text">
      <h2>Chào mừng bạn đến với ứng dụng quản lý mượn sách</h2>
    </div>
  </div>
</template>
  
<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    computed: {
      ...mapGetters(["loggedInUser"]),
    },
  
  };
</script>

<style scoped>

.marquee-container {
  position: fixed; /* Đặt vị trí cố định */
  top: 50%; /* Đặt ở giữa theo chiều dọc */
  left: 50%; /* Đặt ở giữa theo chiều ngang */
  transform: translate(-50%, -50%); /* Dịch chuyển lùi lại 50% của kích thước phần tử */
}

.marquee-text {
  display: inline-block;
  animation: marquee 10s linear infinite;
  white-space: nowrap; /* để ngăn chữ bị ngắt dòng */
}

@keyframes marquee {
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
}
</style>