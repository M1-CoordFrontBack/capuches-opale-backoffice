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
            <span v-if="column.id !== 'status_actuel'" class="entry-title">
              <!--{{getItemIcon(item, column)}}-->
              <i
                v-if="typeof item[column.id.toLowerCase()] === 'number'"
                class="tim-icons icon-coins"
              ></i>
              {{ itemValue(item, column) }}
            </span>

            <div v-else>
              <select
                v-if="assistant"
                :class="`${getStatusStyle(item, column)}`"
                @click="$event.stopPropagation()"
                @change="changeStatus($event, item, column)"
              >
                <option
                  v-for="state in listStatus"
                  :value="state"
                  :selected="state.toLowerCase() === itemValue(item, column)"
                  :key="state"
                >
                  {{ state }}
                </option>
              </select>

              <span
                v-else
                :class="`${getStatusStyle(item, column)} badge-front`"
              >
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
            <span
              v-if="assistant"
              style="
                font-size: 18px;
                line-height: 1;
                cursor: pointer;
                vertical-align: middle;
                font-weight: 400;
              "
              @click="
                searchModalVisible = true;
                searchAdv(item);
              "
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
            <div
              class="modal-content-data"
              style="vertical-align: top; overflow: hidden"
            >
              <select v-model="classeSelected" @change="searchAdv(item)">
                <option
                  v-for="role in listRoles"
                  :value="role.id"
                  :key="role.id"
                >
                  {{ role.name }}
                </option>
              </select>
              <input
                class="searchbar-input"
                type="text"
                v-model="search"
                placeholder="Search"
              />
              <br />
              <ul style="overflow: auto; height: 230px">
                <li v-for="a in searchProd(listAdventurers)" :key="a.id">
                  <table>
                    <tr>
                      <!-- <td style="width: 80px">
                        <img
                          src="@/assets/img/hammer.png"
                          alt="artisan"
                          title="Artisan"
                        />&nbsp;{{ a.levels.artisan }}
                      </td> -->
                      <td>niv. {{ a.classe.exp }}</td>
                      <td>{{ a.prenom }}&nbsp;{{ a.nom }}</td>
                      <td style="text-align: end">
                        <i
                          class="tim-icons icon-double-right"
                          title="Ajouter"
                          v-on:click="addAdv(item, a)"
                        ></i>
                      </td>
                    </tr>
                  </table>
                </li>
              </ul>
            </div>
            <div class="modal-content-data">
              <ul>
                <li v-for="a in item.aventuriers" :key="a.id">
                  <table>
                    <tr>
                      <td style="width: 80px">
                        <!-- <img
                          src="@/assets/img/hammer.png"
                          alt="artisan"
                          title="Artisan"
                        /> -->
                      </td>
                      <td>{{ a.prenom }}&nbsp;{{ a.nom }}</td>
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
          <div v-if="item.aventuriers.length">
            <span v-for="a in item.aventuriers" :key="a.id"
              >{{ a.nom + " " + a.prenom }}<br
            /></span>
          </div>
          <div v-else><span>Aucun</span></div>
        </td>
      </tr>
      <tr v-if="opened.includes(indexation)" class="expanded-row">
        <td style="vertical-align: top">
          <b>Niveau minimum</b><br />
          <div v-if="item.metiers.length">
            <div
              class="job-level"
              v-for="m in item.metiers"
              :key="m.id_requete + '-' + m.id_metier_classe"
            >
              <div>
                <span class="nbr-badge nbr-badge-align">{{
                  m.exp_recommande.toLocaleString()
                }}</span
                ><span class="nbr-title">{{
                  metierName(m.id_metier_classe)
                }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <span>Aucun niveau défini</span>
          </div>
        </td>
        <td style="vertical-align: top">
          <b>Informations</b><br />
          Durée estimée : {{ item.duree ? item.duree : "N/A" }}<br />
          Date limite : {{ item.date_limite ? item.date_limite : "N/A" }}<br />
          Expérience : {{ item.recompense_exp ? item.recompense_exp : "0" }}
        </td>
        <td style="vertical-align: top">
          <b>Personnes</b><br />
          <div class="job-level">
            <span class="nbr-badge">{{
              item.nbr_personne_minimum ? item.nbr_personne_minimum : "0"
            }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import Modal from "@/components/Modal";
import {
  updateStatus,
  getAdventurersByClasse,
  updateAdventurers,
} from "@/utils/services/quests.js";

export default {
  name: "base-table",
  data() {
    return {
      opened: [],
      searchModalVisible: false,
      search: "",
      classeSelected: "1",
      listAdventurers: [],
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
      opened: [],
    },
    listStatus: {
      type: Array,
      default: () => [],
      description: "Table Status",
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
    metierName(id) {
      switch (id) {
        case 1:
          return "Mêlée";
        case 2:
          return "Archer";
        case 3:
          return "Mage";
        case 4:
          return "Artisan";
      }
    },
    log(value) {
      console.log(value);
    },
    changeStatus(event, item, column) {
      updateStatus(item.id, event.target.value.toLowerCase()).then((res) => {
        if (res) {
          item[column.id] = event.target.value;
        }
      });
    },
    searchAdv(item) {
      getAdventurersByClasse(this.classeSelected).then((aventuriers) => {
        this.listAdventurers = this.getAdv(item, aventuriers);
      });
    },
    getAdv(item, adventurers) {
      let index = null;
      item.aventuriers.forEach((aventurier) => {
        index = adventurers.findIndex((a) => a.id == aventurier.id);
        if (index != -1) adventurers.splice(index, 1);
      });
      return adventurers;
    },
    addAdv(item, adventurer) {
      item.aventuriers.push(adventurer);
      let index = this.listAdventurers.findIndex((a) => a.id == adventurer.id);
      if (index != -1) this.listAdventurers.splice(index, 1);
    },
    removeAdv(item, id) {
      let index = item.aventuriers.findIndex((a) => a.id == id);
      if (index != -1) item.aventuriers.splice(index, 1);
      this.searchAdv(item);
    },
    getImg(icon) {
      let images = require.context("../assets/img/", false, /\.png$/);
      return images("./" + icon + ".png");
    },
    getStatusStyle(item, column) {
      if (column.hasOwnProperty("id") && column.id) {
        const value = item[column.id.toLowerCase()];
        if (value) {
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
      }
    },
    getItemIcon(item, column) {
      const value = item[column.id.toLowerCase()];
      if (column.id !== "status_actuel") {
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
      if (column.id === "recompense") {
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
