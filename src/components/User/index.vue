<template>
  <router-link
    exact
    to="/signin"
    class="text-decoration-none btn"
    v-if="getterProfile === null"
  >
    <div class="d-flex align-items-center btn-sign-content">
      <i class="far fa-user mr-1"></i>
      <span class="d-md-block">Đăng nhập</span>
    </div>
  </router-link>
  <div v-else class="btn-group">
    <div
      class="btn-dropdown"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <!-- <img class="avatar" :src="getterProfile.avatar" alt="avartar.png" /> -->
    </div>
    <div class="dropdown-menu dropdown-menu-right">
      <button class="dropdown-item" type="button" @click="handleLogin">
        Login
      </button>
    </div>
  </div>
</template>

<script>
import {
  A_FETCH_PROFILE,
  A_REMOVE_PROFILE,
} from "../../store/profile/constant";
import { mapGetters } from "vuex";
import { A_SIGN_OUT } from "../../store/login/constant";
export default {
  computed: {
    ...mapGetters(["getterProfile"]),
  },
  methods: {
    handleLogin() {
      console.log(this.getterProfile);
      this.$store.dispatch(A_SIGN_OUT);
      this.$store.dispatch(A_REMOVE_PROFILE);
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$store.dispatch(A_FETCH_PROFILE);
    }
  },
};
</script>

<style scoped>
.btn-dropdown {
  cursor: pointer;
}
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.btn-sign-content {
  color: white;
}
</style>