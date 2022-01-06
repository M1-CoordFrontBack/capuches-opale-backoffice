<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns">
          <th v-for="column in columns" :key="column.name">
            {{ column.name }}
          </th>
        </slot>
      </tr>
    </thead>

    <!--
      <tr @click="toggle(row.id)" :class="{ opened: opened.includes(row.id) }">
        <td>{{ row.name }}</td>
        <td>{{ row.handle }}</td>
      </tr>
      <tr v-if="opened.includes(row.id)">
        <td colspan="2">ON!</td>
      </tr>

    -->

    <tbody
      :class="tbodyClasses"
      v-for="(item, indexation) in data"
      :key="indexation"
    >
      <tr @click="toggle(indexation)">
        <slot :row="item">
          <td
            v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, column)"
            :width="`${column.width}`"
          >
            <span :class="`${getSpanStyle(item, column)}`">
              <!--{{getItemIcon(item, column)}}-->
              {{ itemValue(item, column) }}
            </span>
          </td>
        </slot>
      </tr>
      <tr v-if="opened.includes(indexation)" class="expanded-row">
        <td colspan="2" style="vertical-align: top">
          <b>Description</b><br />
          {{ item.description ? item.description : "N/A" }}
        </td>
        <!--<td style="vertical-align: top">
          <b>Informations</b><br />
          Durée estimée : {{ item.durée ? item.durée : "N/A" }}<br />
          Nombre de personnes : {{ item.nombre ? item.nombre : "N/A" }}
        </td>-->
        <td style="vertical-align: top">
          <b>Aventuriers</b><br />
          <div v-if="item.aventuriers.length">
            <span v-for="a in item.aventuriers" :key="a">{{ a }}<br /></span>
          </div>
          <div v-else><span>Aucun</span></div>
        </td>
      </tr>
      <tr v-if="opened.includes(indexation)" class="expanded-row">
        <td style="vertical-align: top">
          <b>Niveau minimum</b><br />
          <div class="job-level">
            <span class="nbr-badge nbr-badge-align">{{
              item.niv.artisan ? item.niv.artisan : "N/A"
            }}</span
            ><span class="nbr-title">Artisans</span>
          </div>
          <div class="job-level">
            <span class="nbr-badge nbr-badge-align">{{
              item.niv.melee ? item.niv.melee : "N/A"
            }}</span
            ><span class="nbr-title">Mêlée</span>
          </div>
          <div class="job-level">
            <span class="nbr-badge nbr-badge-align">{{
              item.niv.archer ? item.niv.archer : "N/A"
            }}</span
            ><span class="nbr-title">Archers</span>
          </div>
          <div class="job-level">
            <span class="nbr-badge nbr-badge-align">{{
              item.niv.mage ? item.niv.mage : "N/A"
            }}</span
            ><span class="nbr-title">Mages</span>
          </div>
        </td>
        <td style="vertical-align: top">
          <b>Informations</b><br />
          Durée estimée : {{ item.durée ? item.durée : "N/A" }}<br />
          Date limite : {{ item.date ? item.date : "N/A" }}
        </td>
        <td style="vertical-align: top">
          <b>Personnes</b><br />
          <div class="job-level"><span class="nbr-badge">{{ item.nombre ? item.nombre : "N/A" }}</span></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "base-table",
  data() {
    return {
      opened: [],
    };
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: "Table columns",
      opened: [],
    },
    data: {
      type: Array,
      default: () => [],
      description: "Table data",
      opened: [],
    },
    type: {
      type: String, // striped | hover
      default: "",
      description: "Whether table is striped or hover type",
      opened: [],
    },
    theadClasses: {
      type: String,
      default: "",
      description: "<thead> css classes",
    },
    tbodyClasses: {
      type: String,
      default: "",
      description: "<tbody> css classes",
    },
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    },
  },
  methods: {
    hasValue(item, column) {
      return item[column.name.toLowerCase()] !== "undefined";
    },
    toggle(id) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id);
      }
    },
    log(value) {
      console.log(value);
    },
    getSpanStyle(item, column) {
      const value = item[column.name.toLowerCase()];
      if (column.name !== "état") {
        return "entry-title";
      } else {
        console.log(value);
        switch (value.toLowerCase()) {
          case "validée":
            return "badge badge-cyan";
          case "en cours":
            return "badge badge-yellow";
          case "réussie":
            return "badge badge-lime";
          case "echouée":
            return "badge badge-red";
          case "refusée":
            return "badge badge-red-full";
          default:
            return "badge";
        }
      }
    },
    getItemIcon(item, column) {
      const value = item[column.name.toLowerCase()];
      if (column.name !== "état") {
        return "";
      } else {
        console.log(value);
        switch (value.toLowerCase()) {
          case "validée":
            return "$";
          case "en cours":
            return "€";
          case "réussie":
            return "&";
          case "echouée":
            return "%";
          default:
            return "=";
        }
      }
    },
    itemValue(item, column) {
      return item[column.name.toLowerCase()];
    },
  },
};
</script>
<style></style>
