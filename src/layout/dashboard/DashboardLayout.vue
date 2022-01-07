<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/quests" :name="$t('sidebar.quests')" icon="tim-icons icon-paper"/>
<!--        <sidebar-link hidden to="/users" :name="$t('sidebar.co_users')" icon="tim-icons icon-single-02"/>-->
<!--        <sidebar-link hidden to="/planning" :name="$t('sidebar.co_planning')" icon="tim-icons icon-calendar-60"/>-->
<!--        <sidebar-link hidden to="/equipment" :name="$t('sidebar.co_equipment')" icon="tim-icons icon-cart"/>-->
<!--        <sidebar-link hidden to="/consumable" :name="$t('sidebar.co_consumable')" icon="tim-icons icon-molecule-40"/>-->
<!--        <sidebar-link hidden to="/finance" :name="$t('sidebar.co_finance')" icon="tim-icons icon-coins"/>-->
        <!--<hr />
        <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-paper"/>
        <sidebar-link to="/icons" :name="$t('sidebar.icons')" icon="tim-icons icon-atom"/>
        <sidebar-link to="/notifications" :name="$t('sidebar.notifications')" icon="tim-icons icon-bell-55"/>
        <sidebar-link to="/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/table-list" :name="$t('sidebar.tableList')" icon="tim-icons icon-puzzle-10"/>
        <sidebar-link to="/typography" :name="$t('sidebar.typography')" icon="tim-icons icon-align-center"/>
        <sidebar-link to="/dashboard?enableRTL=true" :name="$t('sidebar.rtlSupport')" icon="tim-icons icon-world"/>-->
      </template>
    </side-bar>
    <div class="main-panel">
      <Header />

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../../assets/sass/black-dashboard.scss";
</style>
<script>
import Header from "../../components/Header";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    Header,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
