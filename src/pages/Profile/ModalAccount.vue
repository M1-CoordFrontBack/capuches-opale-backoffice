<template>
  <modal
    :show.sync="accountModalVisible"
    class="modal-account"
    id=""
    :centered="false"
    :show-close="true"
    v-on:close="closeModal"
  >
    <h1 slot="header">Compte</h1>
    <form @submit="checkForm">
      <div>
        <fieldset>
          <legend>Informations personnelles</legend>
          <div class="form-group">
            <label>Nom</label>
            <input
              class="form-control"
              :class="errors['lastName'] ? 'is-invalid' : ''"
              type="text"
              placeholder="Nom"
              v-model="userLastName"
            />
            <div v-if="errors['lastName']" class="invalid-feedback">
              {{ errors["lastName"] }}
            </div>
          </div>
          <div class="form-group">
            <label>Prénom</label>
            <input
              class="form-control"
              :class="errors['firstName'] ? 'is-invalid' : ''"
              type="text"
              placeholder="Prénom"
              v-model="userFirstName"
            />
            <div v-if="errors['firstName']" class="invalid-feedback">
              {{ errors["firstName"] }}
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Modifier Mot de passe</legend>
          <div class="form-group">
            <label>Nouveau mot de passe</label>
            <input class="form-control" type="password" v-model="newPassword" />
            <div v-if="errors['newPassword']" class="invalid-feedback">
              {{ errors["newPassword"] }}
            </div>
          </div>
          <div class="form-group">
            <label>Confirmer le nouveau mot de passe</label>
            <input
              class="form-control"
              :class="checkConfirmPassword"
              type="password"
              v-model="confirmPassword"
            />
            <div v-if="errors['confirmPassword']" class="invalid-feedback">
              {{ errors["confirmPassword"] }}
            </div>
          </div>
        </fieldset>
      </div>

      <button type="submit" class="btn btn-primary">Enregistrer</button>
    </form>
  </modal>
</template>
<script>
import { BaseAlert } from "@/components";
import Modal from "@/components/Modal";
import NotificationTemplate from "../Notifications/NotificationTemplateModifProfile";
import { updateUser, getCurrentUser } from "../../utils/services/users";

export default {
  name: "modal-account",
  components: {
    BaseAlert,
    Modal,
  },
  props: {
    accountModalVisible: Boolean,
  },
  computed: {
    checkConfirmPassword() {
      return {
        "is-invalid":
          this.confirmPassword && this.newPassword !== this.confirmPassword,
      };
    },
  },
  data() {
    return {
      errors: [],
      userLastName: null,
      userFirstName: null,
      newPassword: null,
      confirmPassword: null,
    };
  },
  mounted() {
    getCurrentUser().then((user) => {
      this.userLastName = user.nom;
      this.userFirstName = user.prenom;
    });
  },
  methods: {
    closeModal() {
      this.newPassword = "";
      this.confirmPassword = "";
      this.$emit("update:accountModalVisible", false);
    },
    checkForm(e) {
      this.errors = [];

      console.log(this.newPassword.length);
      if (this.newPassword && this.newPassword.length < 6) {
        this.errors["newPassword"] =
          "le mot de passe doit contenir au moins 6 caractères";
      }

      if (this.newPassword !== this.confirmPassword) {
        this.errors["confirmPassword"] = "Le mot de passe est invalide";
      }

      if (!this.userLastName) {
        this.errors["lastName"] = "Le nom est requis";
      }

      if (!this.userFirstName) {
        this.errors["firstName"] = "Le prénom est requis";
      }

      if (
        !this.errors["newPassword"] &&
        !this.errors["confirmPassword"] &&
        !this.errors["lastName"] &&
        !this.errors["firstName"]
      ) {
        updateUser(this.newPassword, this.userFirstName, this.userLastName);

        this.$notify({
          component: NotificationTemplate,
          icon: "tim-icons icon-bell-55",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
          timeout: 1500,
        });

        this.closeModal();

        return true;
      }

      e.preventDefault();
    },
  },
};
</script>

<style></style>
