<template>
  <div class="header">
    <h4 class="title">Quête</h4>
    <div class="navmenu">
      <span class="menu" @click="showAccountModal = true" data-toggle="modal">mon compte</span>
      <modal-account :accountModalVisible.sync="showAccountModal"></modal-account>
      <router-link to="/" class="menu">Liste des quêtes</router-link>
      <router-link to="/create-quest" class="menu"><button>Ajouter une quête</button></router-link>
      <router-link to="/"><img src="../assets/img/logout.png" alt="logout" /></router-link>
    </div>
  </div>
</template>
<script>
  import Modal from '@/components/Modal';
  import ModalAccount from './../pages/Profile/ModalAccount.vue';

  export default {
    components: {
      Modal,
      ModalAccount
    },
    data() {
      return {
        showAccountModal: false,
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import "../assets/sass/back-office/Header";
</style>
