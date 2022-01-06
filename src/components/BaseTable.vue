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
            <span :class="`${getSpanStyle(item, column)}`" v-if="column.name !== 'status'">
              <!--{{getItemIcon(item, column)}}-->
              <i v-if="typeof item[column.id.toLowerCase()] === 'number'" class="tim-icons icon-coins"></i>
              {{ itemValue(item, column) }}
            </span>

            <select :class="`${getSpanStyle(item, column)}`" @click="$event.stopPropagation()" @change="changeStatus($event, item)" v-if="column.name === 'status'">
              <option v-for="state in listStatus" :value="state" :selected="state === itemValue(item, column)">{{ state }}</option>
            </select>
          </td>
        </slot>
        <span v-if="opened.includes(indexation)" class="c-dropdown-open" />
        <span v-else class="c-dropdown-closed" />
      </tr>
      <tr v-if="opened.includes(indexation)" class="expanded-row">
        <td colspan="2" style="vertical-align: top">
          <b>Description</b><br />
          {{ item.description ? item.description : "N/A" }}
        </td>
        <td style="vertical-align: top">
          <b>Aventuriers</b><br />
          <div v-if="item.aventurers.length">
            <span v-for="a in item.aventurers" :key="a">{{ a }}<br /></span>
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
          Durée estimée : {{ item.duration ? item.duration : "N/A" }}<br />
          Date limite : {{ item.expiration ? item.expiration : "N/A" }}
        </td>
        <td style="vertical-align: top">
          <b>Personnes</b><br />
          <div class="job-level">
            <span class="nbr-badge">{{
              item.persons ? item.persons : "0"
            }}</span>
          </div>
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
    listStatus: {
      type: Array,
      default: () => [],
      description: "Table Status",
      opened: []
    },
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
      return item[column.id.toLowerCase()] !== "undefined";
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
    changeStatus(event, item) {
      item['status'] = event.target.value;
    },
    getSpanStyle(item, column) {
      const value = item[column.id.toLowerCase()];
      if (column.id !== "status") {
        return "entry-title";
      } else {
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
      const value = item[column.id.toLowerCase()];
      if (column.id !== "status") {
        return "";
      } else {
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
      if (column.id === 'reward_gold') {
        return item[column.id.toLowerCase()].toLocaleString();
      }
      return item[column.id.toLowerCase()];
    },
  },
};
</script>
<style></style>
