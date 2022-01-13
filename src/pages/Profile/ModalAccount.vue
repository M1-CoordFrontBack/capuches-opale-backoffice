<template>
    <modal :show.sync="accountModalVisible"
        class="modal-account"
        id=""
        :centered="false"
        :show-close="true">
        <h1 slot="header">Compte</h1>
        <form @submit="checkForm">
            <div>
                <fieldset>
                <legend>Informations personnelles</legend>
                <div class="form-group">
                    <label>Nom</label>
                    <input class="form-control" :class="errors['lastName'] ? 'is-invalid':''" type="text" placeholder="Nom" v-model="userLastName">
                    <div v-if="errors['lastName']" class="invalid-feedback">
                        {{ errors['lastName'] }}
                    </div>
                </div>
                <div class="form-group">
                    <label>Prénom</label>
                    <input class="form-control" :class="errors['firstName'] ? 'is-invalid':''" type="text" placeholder="Prénom" v-model="userFirstName">
                    <div v-if="errors['firstName']" class="invalid-feedback">
                        {{ errors['firstName'] }}
                    </div>
                </div>
                </fieldset>
                <fieldset>
                <legend>Modifier Mot de passe</legend>
                <div class="form-group">
                    <label>Mot de passe actuel</label>
                    <input class="form-control" type="password" v-model="password">
                </div>
                <div class="form-group">
                    <label>Nouveau mot de passe</label>
                    <input class="form-control" type="password" v-model="newPassword">
                </div>
                <div class="form-group">
                    <label>Confirmer le nouveau mot de passe</label>
                    <input class="form-control" :class="checkConfirmPassword" type="password" v-model="confirmPassword">
                </div>
                </fieldset>
            </div>
            
            <button type="submit" class="btn btn-primary">Enregistrer</button>
        </form>
    </modal>
</template>
<script>
  import { BaseAlert } from '@/components';
  import Modal from '@/components/Modal';
  import NotificationTemplate from '../Notifications/NotificationTemplateModifProfile';

  export default {
    name:"modal-account",
    components: {
      BaseAlert,
      Modal
    },
    props: {
        accountModalVisible: {
            type: Boolean,
            default: () => false,
        }
    },
    computed: {
      checkConfirmPassword() {
        return {'is-invalid': this.confirmPassword && (this.newPassword !== this.confirmPassword)};
      }
    },
    data() {
      return {
        errors: [],
        userLastName:'Gaudin',
        userFirstName:'Marius',
        password:'',
        newPassword:'',
        confirmPassword:''
      };
    },
    methods: {
      checkForm(e) {

        this.errors = [];
        
        if(this.userFirstName && this.userLastName) {
          this.$notify({
            component: NotificationTemplate,
            icon: "tim-icons icon-bell-55",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
            timeout: 1500          
          });
          this.accountModalVisible = false;
          this.$emit('update:accountModalVisible', false);
          return true;
        }
        
        if(!this.userLastName) {
          this.errors["lastName"] = "Le nom est requis";
        }

        if(!this.userFirstName) {
          this.errors["firstName"] = "Le prénom est requis";
        }

        e.preventDefault();
      }
    }
  };
</script>

<style>
</style>
