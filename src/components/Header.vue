<template>
  <div class="header">
    <h4 class="title">Quête</h4>
    <div class="navmenu">
      <router-link to="/" class="menu">Mon compte</router-link>
      <router-link to="/" class="menu">Liste des quêtes</router-link>
      <router-link to="/create-quest" class="menu"><button>Ajouter une quête</button></router-link>
      <router-link to="/"><img src="../assets/img/logout.png" alt="logout" /></router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/sass/back-office/Header";
</style>
