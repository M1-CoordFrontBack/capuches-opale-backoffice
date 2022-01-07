<template>
  <div class="header">
    <router-link to="/"><img src="../../assets/svg/logo.svg" alt="logo"/></router-link>
    <div class="navmenu">
      <router-link to="/" class="menu">Mon compte</router-link>
      <router-link to="/" class="menu">Liste des quêtes</router-link>
      <router-link to="/create-quest" class="menu"><button>Ajouter une quête</button></router-link>
      <router-link to="/"><img src="../../assets/img/logout.png" alt="logout" /></router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/sass/front-office/Header";
</style>
