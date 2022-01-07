<template>
  <div>
    <a class="ml-5" href="/"><img src="@/assets/svg/logo.svg" alt="logo" title="Accueil" style="width: 94px" class=" ml-5 mt-4"/></a>
    <form method="post" @submit.prevent="onFormSubmit">
      <div class="card mx-auto registerFormContainer">
        <div class="card-title text-center formTitle mt-4">Inscription</div>
        <div class="card-body d-flex flex-column mx-auto px-0 justify-content-around w-50">
          <div>
            <div class="formLabel mb-2">Nom</div>
            <input type="text" v-model="name" name="name" class="form-control formInput mx-auto" required>
            <div v-if="errors['name']" class="mt-1 text-danger">{{ errors['name'] }}</div>
          </div>
          <div>
            <div class="formLabel mb-2">Prénom</div>
            <input type="text" v-model="firstName" name="firstName" class="form-control formInput mx-auto" required>
            <div v-if="errors['firstName']" class="mt-1 text-danger">{{ errors['firstName'] }}</div>
          </div>
          <div>
            <div class="formLabel mb-2">Login</div>
            <input type="text" v-model="login" name="login" class="form-control formInput mx-auto" required>
            <div v-if="errors['login']" class="mt-1 text-danger">{{ errors['login'] }}</div>
          </div>
          <div>
            <div class="formLabel mb-2">Mot de passe</div>
            <input type="password" v-model="password" name="password" class="form-control formInput mx-auto" required>
            <div v-if="errors['password']" class="mt-1 text-danger">{{ errors['password'] }}</div>
          </div>
          <div>
            <div class="formLabel mb-2">Confirmation de mot de passe</div>
            <input type="password" v-model="confirmPassword" name="confirmPassword" class="form-control formInput mx-auto" required>
            <div v-if="errors['confirmPassword']" class="mt-1 text-danger">{{ errors['confirmPassword'] }}</div>
          </div>
        </div>
        <button class="btn w-50 mx-auto formSubmit" type="submit">S'inscrire</button>
        <router-link :to="{ name: 'login'}" class="mx-auto mt-2 small text-dark mb-5 formSubLabel">Déja un compte</router-link>
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
<style>

body {
  background-color: white;
}

.registerFormContainer {
  width: 714px;
  height: 823px;
  background: #FDF9FF;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.formTitle {
  font-family: Poppins, serif;
  font-size: 36px;
  line-height: 54px;
  color: #000000;
}

.formSubmit {
  background: #A42CD6;
  border-radius: 8px;
}

.formSubLabel {
  font-size: 12px;
  line-height: 18px;
}

.formInput {
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 5px;
  height: 52px;
  color: #000;
}

.formInput:focus {
  color: #000;
}

.formLabel {
  color: #000;
}

.formSubmit, .formLabel, .formInput {
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
}

</style>
