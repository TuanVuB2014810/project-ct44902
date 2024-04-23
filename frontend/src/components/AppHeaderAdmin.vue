<template>
  <nav v-if="loggedInUser" class="navbar navbar-expand navbar-dark bg-dark">
    
    <div class="mr-auto navbar-nav ml-5 px-5">
      <li class="nav-item">
        <router-link :to="{ name: 'nxb' }" class="nav-link text-light">
          <i class="fas fa-address-book"></i> Nhà xuất bản
        </router-link>
      </li>
      <li class="mx-3">
        <router-link :to="{ name: 'sach.admin' }" class="nav-link text-light">
          <i class="fa-solid fa-book" style="color: #ffffff;"></i> Sách
        </router-link>
      </li>
      <li class="mx-3">
        <router-link :to="{ name: 'docgia.admin' }" class="nav-link text-light">
          <i class="fa-solid fa-book" style="color: #ffffff;"></i> Đọc giả
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'muonsach.admin' }" class="nav-link text-light">
          <i class="fas fa-exchange-alt" style="color: #ffffff;"></i> Theo dõi mượn trả
        </router-link>
      </li>
    </div>

    <div class="navbar-nav ml-auto">
      <li class="nav-item" v-if="loggedInUser && loggedInUser.role === 'admin'">
        <div class="d-flex align-items-center text-light">
          {{ loggedInUser.username }}
          <button @click="handleLogout" class="btn btn-link nav-link text-light ml-2">
            <i class="fa-solid fa-arrow-right-from-bracket" style="color: #ffffff;"></i> Đăng xuất
          </button>
        </div>
      </li>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push({ name: "login.admin" });
    },
  },
};
</script>
