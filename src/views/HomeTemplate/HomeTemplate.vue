<template>
  <div>
    <NavbarHome />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import NavbarHome from "../../components/NavbarHome";
import Footer from "../../components/Footer";
export default {
  components: {
    NavbarHome,
    Footer,
  },
};
</script>

<style>
</style>