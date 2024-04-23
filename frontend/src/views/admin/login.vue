<template>
  <div class="login-container">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Tên đăng nhập:</label>
        <input type="text" id="username" v-model="nhanvien.username">
      </div>
      <div>
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" autocomplete="current-password" v-model="nhanvien.password">
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import nhanvienService from "@/services/nhanvien.service"

export default {
  data() {
    return {
      nhanvien: { username: '', password: '' },
      error: '',
    };
  },
  methods: {
    ...mapActions(['setLoggedInUser']),
    async login() {
      try {
        const response = await nhanvienService.login(this.nhanvien);
        if (response.status === "success") {
          console.log('response:', response);

          localStorage.setItem('loggedInUser', JSON.stringify({ username: response.user.HOTENNV, id: response.user._id ,role:"admin"}));
          this.setLoggedInUser({ username: response.user.HOTENNV, id: response.user._id, role: "admin" });
          
          this.$router.push('/quanly');
        } else {
          this.error = 'Tên đăng nhập hoặc mật khẩu không chính xác.';
        }
      } catch (error) {
        this.error = 'ăng nhập không thành công! Vui lòng thử lại sau.';
      }
    }
  },
  created() {
    // Kiểm tra nếu có thông tin đăng nhập trong local storage khi component được tạo
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.$store.dispatch('setLoggedInUser', JSON.parse(loggedInUser));
    }
  }
};
</script>

<style>
/* Thêm CSS để có nền màu xám */
body {
  background-color: #f0f0f0; /* Màu xám nhạt */
}

/* Thay đổi CSS cho container chính */
.login-container {
  max-width: 400px;
  margin: 10% auto; /* Để giữ khung đăng nhập ở giữa màn hình */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Style cho tiêu đề */
.login-container h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Style cho input và label */
.login-container label {
  display: block;
  margin-bottom: 10px;
  color: #666;
}

.login-container input[type="text"],
.login-container input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

/* Style cho nút đăng nhập */
.login-container button[type="submit"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

/* Style cho thông báo lỗi */
.login-container p {
  margin-top: 10px;
  color: #ff0000;
  text-align: center;
}
</style>