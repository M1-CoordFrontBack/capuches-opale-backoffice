<template>
  <div>
    <a class="ml-5 d-flex" href="/">
      <img src="@/assets/svg/logo.svg" alt="logo" title="Accueil" style="width: 94px" class="ml-5 mt-4"/>
    </a>
    <form method="post" @submit.prevent="onFormSubmit">
      <div class="card mx-auto loginFormContainer">
        <div class="card-title text-center formTitle mt-4">Connexion</div>
        <div class="card-body d-flex flex-column mx-auto px-0 justify-content-around w-50">
          <div>
            <div class="formLabel mt-3 mb-1">Identifiant</div>
            <input type="text" v-model="login" name="login" class="form-control formInput mx-auto" required>
            <div v-if="errors['login']" class="mt-1 text-danger formError">{{ errors['login'] }}</div>
          </div>
          <div>
            <div class="formLabel mt-4 mb-1">Mot de passe</div>
            <input type="password" v-model="password" name="password" class="form-control formInput mx-auto"
                   placeholder="••••••••••" required>
            <div v-if="errors['password']" class="mt-1 text-danger formError">{{ errors['password'] }}</div>
          </div>
        </div>
        <button class="btn w-50 mt-4 mx-auto formSubmit" type="submit">Se connecter</button>
        <router-link :to="{ name: 'register'}" class="mx-auto mt-2 small text-dark mb-5 formSubLabel">Créer un compte
        </router-link>
      </div>
    </form>
  </div>
</template>
<script>
import { handleLogin } from "@/utils/services/connection";
import NotificationTemplate from "@/pages/Notifications/NotificationTemplateInscription";

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
        login: false,
        password: false,
      },
      login: null,
      password: null,
      notifications: {
        topCenter: false
      },
      referer: this.$route.query.rf,
    }
  },
  mounted() {
      if (this.referer) {
        this.notifyVue('top', 'right');
      }
  },
  methods: {
    onFormSubmit: function (e) {
      this.errors = [];

      if (this.login.length < 3) {
        this.errors['login'] = "Nom d'utilisateur trop court (3 caractères min)";
      }
      if (this.password.length < 6) {
        this.errors['password'] = "Mot de passe trop court (6 caractères min)";
      }

      if (!this.errors['login'] && !this.errors['password']) {
        handleLogin(this.login, this.password);
      }

      e.preventDefault();
    },
    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        component: NotificationTemplate,
        icon: "tim-icons icon-check-2",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success",
        timeout: 3500
      });
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../../../assets/sass/front-office/pages/Login";
@import "../../../assets/sass/front-office/components/SecurityForm";
</style>
