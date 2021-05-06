<template>
  <div class="w-100 MainHeaferpage">
    <div class="container headerpage py-3 d-none d-md-block">
      <div class="row mx-5 headerpage__row">
        <router-link
          exact="true"
          to="/"
          class="col-2 col-lg-3 headerpage__col3 d-flex align-items-center"
        >
          <img
            class="w-100"
            src="https://storage.googleapis.com/fe-production/icon_vxr_full.svg"
          />
        </router-link>
        <div
          class="col-10 col-lg-9 headerpage__col9 d-flex align-items-center justify-content-end"
        >
          <p class="mb-0 pr-2 text-nowrap">Ưu đãi lớn</p>
          <p class="mb-0 pr-2 text-nowrap">xe Limousine</p>
          <p class="mb-0 pr-2 text-nowrap">Quản Lý vé</p>
          <div class="col9__a">
            <a class="tagA a_left">HotLine</a>

            <router-link
              exact="true"
              to="/signin"
              class="tagA a_right"
              v-if="profile == null"
            >
              <a class="">Đăng nhập</a>
            </router-link>

            <button v-else class="tagA a_right" @click="handleLogin">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="headerpage__Responsive py-3 d-block d-md-none">
      <div
        class="mx-5 d-flex align-items-center justify-content-between headerpage__content"
      >
        <div
          style="cursor: pointer"
          class="content_click d-flex align-items-center"
          @click="handleShowmenu"
        >
          <i class="fas fa-bars"></i>
        </div>
        <div class="w-25">
          <img
            class="w-100"
            src="https://storage.googleapis.com/fe-production/images/header/logo_vxr_white.svg"
          />
        </div>
        <div class="d-flex align-items-center">
          <router-link
            exact="true"
            to="/signin"
            class="tagA a_right"
            v-if="profile == null"
          >
            <a class="text-white">Đăng nhập</a>
          </router-link>

          <button v-else class="tagA a_right" @click="handleLogin">
            Login
          </button>
        </div>
      </div>
    </div>
    <div class="w-100 hideMenu" :class="{ Showmenu: stateMenu }">
      <div class="Showmenu__content" style="background: white">
        <p href="#">Trang Chủ</p>
        <p>Ưu đãi lớn</p>
        <p>phần mềm nhà xe</p>
        <p>Vé xe rẻ block</p>
        <div class="lineSpace"></div>
        <p>Quản lý vé</p>
        <p>Tra cứu đơn hàng</p>
        <p>phần mềm đại lý</p>
        <p>câu hỏi thường gặp</p>
        <p>Quy chế</p>
        <p>Chính sách bảo mật thông tin</p>
      </div>
    </div>
  </div>
</template>

<script>
import { A_FETCH_PROFILE, A_REMOVE_PROFILE } from "../store/profile/constant";
import { mapGetters } from "vuex";
import { A_SIGN_OUT } from "../store/login/constant";
export default {
  data() {
    return {
      stateMenu: false,
    };
  },
  computed: {
    ...mapGetters(["profile"]),
  },
  methods: {
    handleShowmenu() {
      this.stateMenu = !this.stateMenu;
    },
    handleLogin() {
      // console.log(this.getterProfile);
      this.$store.dispatch(A_SIGN_OUT);
      this.$store.dispatch(A_REMOVE_PROFILE);
    },
    mounted() {
      if (localStorage.getItem("token")) {
        this.$store.dispatch(A_FETCH_PROFILE);
      }
    },
  },
};
</script>

<style>
.headerpage {
  max-width: 980px;
  margin: auto;
}
.headerpage .headerpage__row .headerpage__col9 p {
  /* min-height: 60px; */
  margin-left: 20px;
  color: #484848;
  font-size: 14px;
}
.headerpage .headerpage__row .headerpage__col9 .col9__a .a_left {
  font-size: 14px;
  line-height: 60px;
  font-weight: 500;
  border: 1px solid rgb(192, 192, 192);
  padding: 8px;
  border-radius: 2px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  cursor: pointer;
  border-radius: 5px;
}
.headerpage .headerpage__row .headerpage__col9 .col9__a .a_left:hover {
  background: #cfcccc;
  transition: all 0.3s;
}
.headerpage .headerpage__row .headerpage__col9 .col9__a .a_right {
  padding: 5px 8px;
  margin-left: 10px;
  background-color: rgb(0, 96, 196);
  color: #007bff;
  text-decoration: none;
  color: #fff;
  /* background-color: #1890ff; */
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  /* color: #212529; */
  text-align: left;
  line-height: 1.5;
  /* position: relative; */
  /* display: inline-block; */
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}
.headerpage .headerpage__row .headerpage__col9 .col9__a .a_right:hover {
  background: rgb(226, 204, 204);
  opacity: 0.9;
  transition: all 0.4s;
}
.headerpage__Responsive {
  width: 100%;
  background: blue;
}
.lineSpace {
  color: rgba(0, 0, 0, 0.65);
  background: #e8e8e8;
  width: 100%;
  height: 1px;
  margin: 20px 0;
}
.MainHeaferpage {
  position: relative;
}
.hideMenu {
  position: absolute;
  transform: translateX(-100%);
}
.Showmenu {
  position: absolute;
  top: 110%;
  left: -25px;
  width: 100%;
  height: 1500px;
  padding-left: 5%;
  transform: translateX(0);
  transition: all 0.7s;
  z-index: 100;
}
.Showmenu .Showmenu__content {
  width: 110%;
  height: 100vh;
}
</style>