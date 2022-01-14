<template>
  <div>
    <div class="container-fluid">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss">
  body {
    font-family: Poppins, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000000;
    background-color: #ffffff;
  }

</style>
<script>
  import Header from "../../components/FrontOffice/Header";
  import CreateQuest from "../../pages/FrontOffice/CreateQuest";
  export default {
  components: {
    Header,
    CreateQuest
  }
};
</script>
