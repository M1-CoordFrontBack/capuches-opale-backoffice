<template>
  <nav class="navbar navbar-expand-lg navbar-absolute"
       :class="{'bg-white': showMenu, 'navbar-transparent': !showMenu}">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline" :class="{toggled: $sidebar.showSidebar}">
          <button type="button"
                  class="navbar-toggler"
                  aria-label="Navbar toggle button"
                  @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="#pablo">{{routeName}}</a>
      </div>
      <button class="navbar-toggler" type="button"
              @click="toggleMenu"
              data-toggle="collapse"
              data-target="#navigation"
              aria-controls="navigation-index"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <collapse-transition>
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
            <div class="search-bar input-group" @click="accountModalVisible = true">
              <button class="btn btn-link" data-toggle="modal" data-target="">
                mon compte
              </button>
            </div>
            <modal :show.sync="accountModalVisible"
                   class="modal-account"
                   id=""
                   :centered="false"
                   :show-close="true">
                  <h1 slot="header">Compte</h1>
                  <form @submit="checkForm">
                    <div>
                      <fieldset>
                        <legend>Information personnel</legend>
                        <div class="form-group">
                          <label>Nom</label>
                          <input class="form-control" type="text" placeholder="Nom" v-model="userLastName">
                        </div>
                        <div class="form-group">
                          <label>Prénom</label>
                          <input class="form-control" type="text" placeholder="Prénom" v-model="userFirstName">
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
                    
                    <ul v-if="errors.length" class="errors">
                      <li v-for="error in errors">{{ error }}</li>
                    </ul>
                    
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                  </form>
                  
            </modal>
            <div class="search-bar input-group">
              <button class="btn btn-link" id="search-button">
                <i class="tim-icons icon-button-power"></i>
              </button>
            </div>
          </ul>
        </div>
      </collapse-transition>
      
    </div>
  </nav>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions';
  import Modal from '@/components/Modal';
  import { BaseAlert } from '@/components';
  import NotificationTemplate from '../../pages/Notifications/NotificationTemplateModifProfile';

  export default {
    components: {
      CollapseTransition,
      Modal,
      BaseAlert
    },
    computed: {
      checkConfirmPassword() {
        return {'is-invalid': this.confirmPassword && (this.newPassword !== this.confirmPassword)};
      },
      routeName() {
        const { name } = this.$route;
        return this.capitalizeFirstLetter(name);
      },
      isRTL() {
        return this.$rtl.isRTL;
      }
    },
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        accountModalVisible: false,
        searchQuery: '',
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
            horizontalAlign: 'center',
            verticalAlign: 'top',
            type: "success",
            timeout: 1500          
          });
          this.accountModalVisible = false;
          return true;
        }
        
        if(!this.userLastName) {
          this.errors.push('Le nom est requis');
        }

        if(!this.userFirstName) {
          this.errors.push('Le prénom est requis');
        }

        e.preventDefault();
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications;
      },
      closeDropDown() {
        this.activeNotifications = false;
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    }
  };
</script>
<style>
</style>
