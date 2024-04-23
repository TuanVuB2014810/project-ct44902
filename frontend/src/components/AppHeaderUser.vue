<template>
    <nav class="navbar navbar-expand navbar-dark bg-primary">
        <div class="mr-auto navbar-nav ml-5 px-5">
            <li class="nav-item">
                <router-link :to="{ name: 'sach.user' }" class="nav-link text-light">
                    Sách
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'muonsach.user' }" class="nav-link text-light">
                    Mượn sách
                    <i class="fas fa-list"></i>
                </router-link>
            </li>
        </div>

        <div class="navbar-nav mr-5 px-4">
            <li class="nav-item">
                <div v-if="loggedInUser && loggedInUser.role === 'user'" class="nav-item">
                    <div class="d-flex align-items-center text-light">
                        {{ loggedInUser.username }}
                        <button @click="handleLogout" class="btn btn-link nav-link text-light ml-2">
                        <i class="fa-solid fa-arrow-right-from-bracket" style="color: #ffffff;"></i> Đăng xuất
                        </button>
                    </div>
                </div>
                <div v-else class="nav-item">
                    <router-link :to="{ name: 'login.user' }" class="nav-link text-light">
                         Đăng nhập
                    </router-link>
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
      this.$router.push({ name: "login.user" });
    },
  },
};
</script>