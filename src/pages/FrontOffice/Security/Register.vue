<template>
  <div>
    <a class="ml-5 d-flex" href="/">
      <img src="@/assets/svg/logo.svg" alt="logo" title="Accueil" style="width: 94px" class="ml-5 mt-4"/>
    </a>
    <form method="post" @submit.prevent="onFormSubmit">
      <div class="card mx-auto registerFormContainer">
        <div class="card-title text-center formTitle my-3 mb-0">Inscription</div>
        <div class="card-body d-flex flex-column mx-auto p-0 justify-content-around w-50">
          <div>
            <div class="formLabel">Nom</div>
            <input type="text" v-model="name" name="name" class="form-control formInput mx-auto" required>
            <div v-if="errors['name']" class="mt-1 text-danger formError">{{ errors['name'] }}</div>
          </div>
          <div>
            <div class="formLabel mt-3">Prénom</div>
            <input type="text" v-model="firstName" name="firstName" class="form-control formInput mx-auto" required>
            <div v-if="errors['firstName']" class="mt-1 text-danger formError">{{ errors['firstName'] }}</div>
          </div>
          <div>
            <div class="formLabel mt-3">Login</div>
            <input type="text" v-model="login" name="login" class="form-control formInput mx-auto" required>
            <div v-if="errors['login']" class="mt-1 text-danger formError">{{ errors['login'] }}</div>
          </div>
          <div>
            <div class="formLabel mt-3">Mot de passe</div>
            <input type="password" v-model="password" name="password" class="form-control formInput mx-auto" required>
            <div v-if="errors['password']" class="mt-1 text-danger formError">{{ errors['password'] }}</div>
          </div>
          <div class="mb-3">
            <div class="formLabel mt-3">Confirmation de mot de passe</div>
            <input type="password" v-model="confirmPassword" name="confirmPassword" class="form-control formInput mx-auto" required>
            <div v-if="errors['confirmPassword']" class="mt-1 text-danger formError">{{ errors['confirmPassword'] }}</div>
          </div>
        </div>
        <button class="btn w-50 mx-auto formSubmit mt-3" type="submit">S'inscrire</button>
        <router-link :to="{ name: 'login'}" class="mx-auto mt-2 small text-dark mb-4 formSubLabel">Déja un compte</router-link>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      errors: {
        name: false,
        firstName: false,
        login: false,
        password: false,
        confirmPassword: false,
      },
      name: null,
      firstName: null,
      login: null,
      password: null,
      confirmPassword: null,
    }
  },
  methods: {
    onFormSubmit: function (e) {
      this.errors = [];

      if (this.name.length < 2) {
        this.errors['name'] = "Nom invalide (2 lettres min)";
      }
      if (this.firstName.length < 2) {
        this.errors['firstName'] = "Prénom invalide (2 lettres min)";
      }
      if (this.login.length < 3) {
        this.errors['login'] = "Nom d'utilisateur trop court (3 caractères min)";
      }
      if (this.password.length < 6) {
        this.errors['password'] = "Mot de passe trop court (6 caractères min)";
        this.password = null;
        this.confirmPassword = null;
      } else if (this.confirmPassword !== this.password) {
        this.errors['confirmPassword'] = "Les mots de passe ne correspondent pas";
        this.password = null;
        this.confirmPassword = null;
      }

      if (!this.errors['name'] && !this.errors['firstName'] && !this.errors['login'] && !this.errors['password'] && !this.errors['confirmPassword']) {
        console.log(this.name, this.firstName, this.login, this.password, this.confirmPassword);
      }

      e.preventDefault();
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../../../assets/sass/front-office/pages/Register";
@import "../../../assets/sass/front-office/components/SecurityForm";
</style>
