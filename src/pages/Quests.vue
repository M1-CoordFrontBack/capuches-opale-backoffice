<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title">
        <div class="table-responsive">
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            :listStatus="table1.listStatus"
            :listAdventurers="table1.listAdventurers"
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
import { getQuests } from "@/utils/services/quests.js"

const tableColumns = [
  { name: "Titre", width: "55%", id: "titre" },
  { name: "Récompense", width: "30%", id: "recompense" },
  { name: "État", width: "15%", id: "status_actuel" },
  { name: "", width: "3%", id: "collapse" },
];

const tableAdventurers = [
  {
    id: 1,
    name: {
      first: "Camille",
      last: "LeBuffle",
    },
    levels: {
      artisan: "2",
      melee: "0",
      archer: "0",
      mage: "22",
    },
  },
  {
    id: 2,
    name: {
      first: "Marius",
      last: "LeMarsouin",
    },
    levels: {
      artisan: "6",
      melee: "1",
      archer: "42",
      mage: "17",
    },
  },
  {
    id: 3,
    name: {
      first: "Yann",
      last: "Lantilope",
    },
    levels: {
      artisan: "7",
      melee: "4",
      archer: "2",
      mage: "19",
    },
  },
  {
    id: 4,
    name: {
      first: "Mael",
      last: "LePingouin",
    },
    levels: {
      artisan: "0",
      melee: "0",
      archer: "0",
      mage: "-1",
    },
  },
  {
    id: 5,
    name: {
      first: "Florian",
      last: "LePangolin",
    },
    levels: {
      artisan: "90",
      melee: "280",
      archer: "32",
      mage: "140",
    },
  },
  {
    id: 6,
    name: {
      first: "Bastien",
      last: "Lautruche",
    },
    levels: {
      artisan: "9",
      melee: "20",
      archer: "4",
      mage: "923",
    },
  },
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
        listAdventurers: [...tableAdventurers],
        listRoles: [...listRoles],
        listStatus: [...tableStatus]
      },
    };
  },
  mounted() {
    getQuests().then(data => {
      this.table1.data = data;
    });
  }
};
</script>
