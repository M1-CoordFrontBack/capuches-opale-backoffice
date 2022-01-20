<template>
  <div class="header">
    <h4 class="title">Quête</h4>
    <div class="navmenu">
      <span class="menu" @click="showAccountModal = true" data-toggle="modal">Mon compte</span>
      <modal-account :accountModalVisible.sync="showAccountModal"></modal-account>
      <router-link to="/quests" class="menu">Liste des quêtes</router-link>
      <router-link to="/front/create-quest" class="menu"><button>Ajouter une quête</button></router-link>
      <a @click.prevent="logout" href=""><img src="../assets/img/logout.png" alt="logout" /></a>
    </div>
  </div>
</template>
<script>
  import Modal from '@/components/Modal';
  import ModalAccount from './../pages/Profile/ModalAccount.vue';
  import localStorageService from "../services/localStorageService";

  export default {
    components: {
      Modal,
      ModalAccount
    },
    data() {
      return {
        showAccountModal: false,
      };
    },
    methods: {
      logout() {
        localStorageService.clearToken();
        this.$router.push({ name: 'login'});
      }
    },
  };
</script>
<style lang="scss" scoped>
  @import "../assets/sass/back-office/Header";
</style>
