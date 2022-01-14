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
            <span v-if="column.id !== 'status'" class="entry-title">
              <!--{{getItemIcon(item, column)}}-->
              <i
                v-if="typeof item[column.id.toLowerCase()] === 'number'"
                class="tim-icons icon-coins"
              ></i>
              {{ itemValue(item, column) }}
            </span>

            <div v-else>
              <select v-if="assistant"
              :class="`${getStatusStyle(item, column)}`"
              @click="$event.stopPropagation()"
              @change="changeStatus($event, item, column)"
              >
                <option
                  v-for="state in listStatus"
                  :value="state"
                  :selected="state === itemValue(item, column)"
                  :key="state"
                >
                  {{ state }}
                </option>
              </select>

              <span v-else :class="`${getStatusStyle(item, column)} badge-front`">
                {{ itemValue(item, column) }}
              </span>
            </div>
            
          </td>
          <td>

        <span v-if="opened.includes(indexation)" class="c-dropdown-open" />
        <span v-else class="c-dropdown-closed" />
          </td>
        </slot>
      </tr>
      <tr v-if="opened.includes(indexation)" class="expanded-row">
        <td colspan="2" style="vertical-align: top">
          <b>Description</b><br />
          {{ item.description ? item.description : "N/A" }}
        </td>
        <td style="vertical-align: top">
          <b
            >Aventuriers
            <span v-if="assistant"
              style="
                font-size: 18px;
                line-height: 1;
                cursor: pointer;
                vertical-align: middle;
                font-weight: 400;
              "
              @click="searchModalVisible = true"
              ><i
                class="tim-icons icon-pencil"
                style="
                  text-decoration: underline;
                  font-size: 12px;
                  vertical-align: top;
                "
              ></i></span></b
          ><br />
          <modal
            :show.sync="searchModalVisible"
            class="modal-adv"
            id="advModal"
            :centered="false"
            :show-close="true"
          >
            <div class="modal-content-data" style="vertical-align: top">
              <!--<select>
              <option
                v-for="role in listRoles"
                :value="role.name"
                :key="role.id"
              >
                <img :src="getImg(role.icon)" v-bind:alt="role.icon">
              </option>
            </select>-->
              <input
                class="searchbar-input"
                type="text"
                v-model="search"
                placeholder="Search"
              />
              <br />
              <ul>
                <li v-for="a in searchProd(listAdventurers)" :key="a.id">
                  <table v-if="!item.aventurers.includes(a.id)">
                    <tr>
                      <td style="width: 80px">
                        <img
                          src="@/assets/img/hammer.png"
                          alt="artisan"
                          title="Artisan"
                        />&nbsp;{{ a.levels.artisan }}
                      </td>
                      <td>{{ a.name.first }}&nbsp;{{ a.name.last }}</td>
                      <td style="text-align: end">
                        <i
                          class="tim-icons icon-double-right"
                          title="Ajouter"
                          v-on:click="addAdv(item, a.id)"
                        ></i>
                      </td>
                    </tr>
                  </table>
                  <span v-else />
                </li>
              </ul>
            </div>
            <div class="modal-content-data">
              <ul>
                <li v-for="a in listAdventurers" :key="a.id">
                  <table v-if="item.aventurers.includes(a.id)">
                    <tr>
                      <td style="width: 80px">
                        <img
                          src="@/assets/img/hammer.png"
                          alt="artisan"
                          title="Artisan"
                        />&nbsp;{{ a.levels.artisan }}
                      </td>
                      <td>{{ a.name.first }}&nbsp;{{ a.name.last }}</td>
                      <td style="text-align: end">
                        <i
                          class="tim-icons icon-simple-remove"
                          title="Retirer"
                          v-on:click="removeAdv(item, a.id)"
                        ></i>
                      </td>
                    </tr>
                  </table>
                </li>
              </ul>
            </div>
          </modal>
          <div v-if="item.aventurers.length">
            <span v-for="a in item.aventurers" :key="a"
              >{{ getAdvName(listAdventurers, a) }}<br
            /></span>
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
          Date limite : {{ item.expiration ? item.expiration : "N/A" }}<br />
          Expérience : {{ item.reward_exp ? item.reward_exp : "0" }}
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
import Modal from "@/components/Modal";

export default {
  name: "base-table",
  data() {
    return {
      opened: [],
      searchModalVisible: false,
      search: "",
    };
  },
  components: {
    Modal,
  },
  props: {
    assistant: {
      type: Boolean,
      default: () => false,
      description: "assistant",
      opened: []
    },
    listStatus: {
      type: Array,
      default: () => [],
      description: "Table Status",
      opened: [],
    },
    listAdventurers: {
      type: Array,
      default: () => [],
      description: "Table Adventurers",
      opened: [],
    },
    listRoles: {
      type: Array,
      default: () => [],
      description: "Table Roles",
      opened: [],
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
    changeStatus(event, item, column) {
      item[column.id] = event.target.value;
    },
    addAdv(item, id) {
      console.log(item);
      console.log(id);
      console.log("to implement");
    },
    removeAdv(item, id) {
      console.log("to implement");
    },
    getImg(icon) {
      let images = require.context('../assets/img/', false, /\.png$/)
      return images('./' + icon + ".png")
    },
    getStatusStyle(item, column) {
      const value = item[column.id.toLowerCase()];
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
    getAdvName(listAdventurers, id) {
      let name = "";
      listAdventurers.find((obj) => {
        if (obj.id === id) {
          name = obj.name.first + " " + obj.name.last;
        }
      });
      return name;
    },
    itemValue(item, column) {
      if (column.id === "reward_gold") {
        return item[column.id.toLowerCase()].toLocaleString();
      }
      return item[column.id.toLowerCase()];
    },
    searchProd(listAdventurers) {
      let se = [];
      if (this.search !== "") {
        se = this.listAdventurers.filter(
          (p) =>
            p.name.first.toLowerCase().includes(this.search.toLowerCase()) ||
            p.name.last.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        se = listAdventurers;
      }
      return se;
    },
  },
};
</script>
<style></style>
