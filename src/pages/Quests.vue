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
const tableStatus = [
  "Proposée",
  "En cours",
  "Validée",
  "Réussie",
  "Refusée",
  "Echouée",
];
const tableColumns = [
  { name: "Titre", width: "55%", id: "title" },
  { name: "Récompense", width: "30%", id: "reward_gold" },
  { name: "État", width: "15%", id: "status" },
  { name: "", width: "3%", id: "collapse" },
];
const tableData = [
  {
    id: 1,
    title: "Acheter du lait",
    reward_gold: 23,
    reward_exp: 200,
    status: "Proposée",
    duration: "3 jours",
    expiration: "01/04/22",
    persons: 3,
    aventurers: [1,3,4],
    description:
      "J'aimerais beaucoup aller acheter du lait pour pouvoir réaliser un mugcake au chocolat !",
    niv: {
      artisan: "2",
      melee: "0",
      archer: "0",
      mage: "22",
    },
  },
  {
    id: 2,
    title: "Sauver un chaton",
    reward_gold: 10,
    reward_exp: 20,
    status: "En cours",
    duration: "",
    expiration: "01/03/22",
    persons: 0,
    aventurers: [1,5],
    description: "",
    niv: {
      artisan: "2",
      melee: "0",
      archer: "0",
      mage: "22",
    },
  },
  {
    id: 3,
    title: "Relever le pouvoir d'achat des Français",
    reward_gold: 23000000,
    reward_exp: 2,
    status: "Echouée",
    duration: "",
    expiration: "01/03/22",
    persons: 0,
    aventurers: [],
    description: "",
    niv: {
      artisan: "2",
      melee: "0",
      archer: "0",
      mage: "22",
    },
  },
  {
    id: 4,
    title: "Tuer un dragon",
    reward_gold: 2,
    reward_exp: 0,
    status: "Validée",
    duration: "",
    expiration: "01/03/22",
    persons: 0,
    aventurers: [],
    description: "",
    niv: {
      artisan: "2",
      melee: "0",
      archer: "0",
      mage: "22",
    },
  },
  {
    id: 5,
    title: "Acheter de l'hyxdroxichloroquine",
    reward_gold: 135,
    reward_exp: 0,
    status: "Réussie",
    duration: "",
    expiration: "01/03/22",
    persons: 0,
    aventurers: [],
    description: "",
    niv: {
      artisan: "2",
      melee: "0",
      archer: "0",
      mage: "22",
    },
  },
  {
    id: 6,
    title: "Lorem ipsum",
    reward_gold: 120,
    reward_exp: 12,
    status: "Refusée",
    duration: "",
    expiration: "01/03/22",
    persons: 0,
    aventurers: [],
    description: "",
    niv: {
      artisan: "2",
      melee: "0",
      archer: "0",
      mage: "22",
    },
  },
];

const tableAdventurers = [
  {
    id: 1,
    name: {
      first: "Camille",
      last: "LeBuffle"
    },
    levels: {
      artisan: "2",
      melee: "0",
      archer: "0",
      mage: "22",
    }
  },
  {
    id: 2,
    name: {
      first: "Marius",
      last: "LeMarsouin"
    },
    levels: {
      artisan: "6",
      melee: "1",
      archer: "42",
      mage: "17",
    }
  },
  {
    id: 3,
    name: {
      first: "Yann",
      last: "Lantilope"
    },
    levels: {
      artisan: "7",
      melee: "4",
      archer: "2",
      mage: "19",
    }
  },
  {
    id: 4,
    name: {
      first: "Mael",
      last: "LePingouin"
    },
    levels: {
      artisan: "0",
      melee: "0",
      archer: "0",
      mage: "-1",
    }
  },
  {
    id: 5,
    name: {
      first: "Florian",
      last: "LePangolin"
    },
    levels: {
      artisan: "90",
      melee: "280",
      archer: "32",
      mage: "140",
    }
  },
  {
    id: 6,
    name: {
      first: "Bastien",
      last: "Lautruche"
    },
    levels: {
      artisan: "9",
      melee: "20",
      archer: "4",
      mage: "923",
    }
  }
];

const listRoles = [
  {
    id: 1,
    name: "Artisan",
    icon: "hammer"
  },
  {
    id: 2,
    name: "Mêlée",
    icon: "sword"
  },
  {
    id: 3,
    name: "Archer",
    icon: "bow"
  },
  {
    id: 4,
    name: "Mage",
    icon: "wand"
  }
]

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      table1: {
        title: "Liste des quêtes",
        columns: [...tableColumns],
        data: [...tableData],
        listStatus: [...tableStatus],
        listAdventurers: [...tableAdventurers],
        listRoles: [...listRoles]
      },
    };
  },
};
</script>
<style></style>
