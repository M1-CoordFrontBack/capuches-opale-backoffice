<template>
  <div class="header">
    <h4 class="title">Quête</h4>
    <div class="navmenu">
      <span class="menu" @click="showAccountModal = true" data-toggle="modal"
        >Mon compte</span
      >
      <modal-account
        :accountModalVisible.sync="showAccountModal"
      ></modal-account>
      <a @click.prevent="homePage" href="" class="menu">Liste des quêtes</a>
      <router-link to="/front/create-quest" class="menu"
        ><button>Ajouter une quête</button></router-link
      >
      <a @click.prevent="logout" href=""
        ><img src="../assets/img/logout.png" alt="logout"
      /></a>
    </div>
  </div>
</template>
<script>
import Modal from "@/components/Modal";
import ModalAccount from "./../pages/Profile/ModalAccount.vue";
import localStorageService from "../services/localStorageService";

export default {
  components: {
    Modal,
    ModalAccount,
  },
  data() {
    return {
      showAccountModal: false,
    };
  },
  methods: {
    logout() {
      localStorageService.clearToken();
      this.$router.push({ name: "login" });
    },
    homePage() {
      if (this.assistant) {
        this.$router.push({ name: "quêtes" });
      } else {
        this.$router.push({ name: "front-quests" });
      }
    },
  },
  computed: {
    assistant() {
      const currentUser = localStorageService.getUser();
      if (currentUser && currentUser.role_id === 3) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/back-office/Header";
</style>
