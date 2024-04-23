<template>
    <div class="login-wrapper">
      <div class="login-container d-flex justify-content-center align-items-center">
        <form class="login-form" @submit.prevent="login">
          <h4 class="text-center my-2 text-primary">Đăng nhập</h4>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Tên người dùng" v-model="docgia.username" />
          </div>
  
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Mật khẩu" v-model="docgia.password" />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Đăng nhập</button>
          <p class="error-message text-center" v-if="error">{{ error }}</p>
        </form>
      </div>
    </div>
</template>
  
  <script>
  import { mapActions } from 'vuex';
  import DocgiaService from "@/services/user.service"
  
  export default {
    data() {
      return {
        docgia: { username: '', password: '' },
        error: '',
      };
    },
    methods: {
      ...mapActions(['setLoggedInUser']),
      async login() {
        try {
          console.log(`Thông tin đăng nhập người dùng`);
          console.log(this.docgia);
          const response = await DocgiaService.login(this.docgia);
          console.log("Kết quả trả về");
          console.log(response);
          if (response.status === "success") {
            console.log("Đăng nhập người dùng");
            localStorage.setItem('loggedInUser', JSON.stringify({ username: response.user.TEN, id: response.user._id, role: "user" }));
            this.setLoggedInUser({ username: response.user.TEN, id: response.user._id, role: "user" });
            console.log('loggedInUser:', this.loggedInUser);
            this.$router.push('/sach');
          } else {
            this.error = 'Tên đăng nhập hoặc mật khẩu không chính xác.';
          }
        } catch (error) {
          this.error = 'Đăng nhập không thành công! Vui lòng thử lại sau.';
        }
      }
    },
    created() {
      // Kiểm tra nếu có thông tin đăng nhập trong local storage khi component được tạo
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        this.setLoggedInUser(JSON.parse(loggedInUser));
      }
    }
  };
  </script>
  
<style scoped>
  .login-wrapper {
    margin-top: 150px;
  }
  
 
  .login-form {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 20px;
    border-radius: 5px;
    width: 450px; /* Đặt chiều rộng cho form */
  }
  
  .error-message {
    color: red;
  }
  </style>

  