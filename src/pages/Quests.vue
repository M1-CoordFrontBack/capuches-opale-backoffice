<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title">
        <div class="table-responsive">
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            :listStatus="table1.listStatus"
            :tableAdventurers="[]"
            :listRoles="table1.listRoles"
            :assistant="true"
            thead-classes="text-primary"
          >
          </base-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import NotificationTemplate from "@/pages/Notifications/NotificationTemplateCreateQuest";
import { getQuests } from "@/utils/services/quests.js"

const tableColumns = [
  { name: "Titre", width: "55%", id: "titre" },
  { name: "Récompense", width: "30%", id: "recompense" },
  { name: "État", width: "15%", id: "status_actuel" },
  { name: "", width: "3%", id: "collapse" },
];

const listRoles = [
  {
    id: 1,
    name: "Artisan",
    icon: "hammer",
  },
  {
    id: 2,
    name: "Mêlée",
    icon: "sword",
  },
  {
    id: 3,
    name: "Archer",
    icon: "bow",
  },
  {
    id: 4,
    name: "Mage",
    icon: "wand",
  },
];

const tableStatus = [
  "Proposée",
  "En cours",
  "Validée",
  "Réussie",
  "Refusée",
  "Echouée"
];

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      table1: {
        title: "Liste des quêtes",
        columns: [...tableColumns],
        data: [],
        listRoles: [...listRoles],
        listStatus: [...tableStatus]
      },
      referer: this.$route.query.rf,
      notifications: {
        topCenter: false
      }
    };
  }, 
  mounted() {
    if (this.referer) {
      this.notifyVue('top', 'right');
    }

    getQuests().then(data => {
      this.table1.data = data;
    });
  },
  methods: {
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
  }
};
</script>
