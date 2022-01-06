<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <base-table :data="table1.data"
                        :columns="table1.columns"
                        thead-classes="text-primary">
            </base-table>
          </div>
        </card>
      </div>

    </div>
</template>
<script>
import { BaseTable } from "@/components";
const tableColumns = [
  {"name": "titre", "width": "55%"},
  {"name": "récompense", "width": "30%"},
  {"name": "état", "width": "15%"}
];
const tableData = [
  {
    id: 1,
    titre: "Acheter du lait",
    récompense: "$23",
    état: "Proposée",
    durée: "3 jours",
    nombre: "3",
    aventuriers: ['Camille', 'Marius', 'Maël'],
    description: "J'aimerais beaucoup acheter du lait pour pouvoir faire un mugcake",
    niv: {
      artisan: "2",
      melee: "0",
      archer: "0",
      mage: "22"
    }
  },
  {
    id: 2,
    titre: "Sauver un chaton",
    récompense: "$41",
    état: "En cours",
    durée: "",
    nombre: 0,
    aventuriers: [],
    description: ""
  },
  {
    id: 3,
    titre: "Relever le pouvoir d'achat des Français",
    récompense: "$23.000.000",
    état: "Echouée",
    durée: "",
    nombre: 0,
    aventuriers: [],
    description: ""
  },
  {
    id: 4,
    titre: "Tuer un dragon",
    récompense: "$2",
    état: "Validée",
    durée: "",
    nombre: 0,
    aventuriers: [],
    description: ""
  },
  {
    id: 5,
    titre: "Acheter de l'hyxdroxichloroquine",
    récompense: "$135",
    état: "Réussie",
    durée: "",
    nombre: 0,
    aventuriers: [],
    description: ""
  },
  {
    id: 6,
    titre: "Lorem ipsum",
    récompense: "$120",
    état: "Refusée",
    durée: "",
    nombre: 0,
    aventuriers: [],
    description: ""
  }
];

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      table1: {
        title: "Liste des quêtes",
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
  }
};
</script>
<style>
</style>
