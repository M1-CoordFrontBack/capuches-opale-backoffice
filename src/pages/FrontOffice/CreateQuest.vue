<template>
  <div class="modal-create-quest">
    <h1>Ajouter une quête</h1>
    <form>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Titre</label>&nbsp;<span class="error" v-if="titleError">Titre requis.</span><br />
              <input type="text" id="title" v-model="title" />
            </td>
            <td rowspan="4">
              <label>Description</label>&nbsp;<span class="error" v-if="descriptionError">Description requis.</span><br />
              <textarea id="description" v-model="description"></textarea>
            </td>
          </tr>
          <tr>
            <td>
              <label class="reward">Récompense</label>&nbsp;<span class="error" v-if="rewardError">Récompense requise.</span>
              <label>Récompense exp</label>&nbsp;<span class="error" v-if="rewardExpError">Récompense exp requise.</span>
            </td>
          </tr>
          <tr>
            <td>
              <input type="number" id="reward" class="reward" v-model="reward" />
              <input type="number" id="rewardExp" v-model="rewardExp" />
            </td>
          </tr>
          <tr>
            <td>
              <label>Durée estimée</label>&nbsp;<span class="error" v-if="estimateDateError">Date estimée requise..</span><br />
              <input type="number" id="days" class="number" v-model="days" /> jours
              <input type="number" id="hours" class="number" v-model="hours" /> heures
            </td>
          </tr>
          <tr>
            <td>
              <label>Date limite</label>&nbsp;<span class="error" v-if="limitDateError">Date limite requise.</span><br />
              <input type="date" id="date" v-model="date" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="number" id="numberPeople" class="number" v-model="numberPeople" /> Nombre de personnes minimum &nbsp;<span class="error" v-if="numberPeopleError">Nombre de personnes requis.</span><br />
            </td>
            <td v-if="assistant">
              <label>Commanditaire</label>&nbsp;<span class="error" v-if="clientError">Commanditaire requis.</span><br />
              <input class="client" list="clients" placeholder="Commanditaire" v-model="client" @input="onChange" />
              <datalist id="clients">
                <option v-for="client in clients" :data-id="client.id">{{client.name}}</option>
              </datalist>
            </td>
          </tr>
          <tr>
            <td>
              <label>Niveau minimum requis</label>&nbsp;<span class="error" v-if="levelError">Niveau requis.</span><br />
            </td>
          </tr>
          <tr>
            <td>
              <label class="levellabel">Mêlée</label><img alt="Vue logo" src="../../assets/img/sword.png" />
              <label class="levellabel">Archers</label><img alt="Vue logo" src="../../assets/img/bow.png" />
              <label class="levellabel">Mages</label><img alt="Vue logo" src="../../assets/img/wand.png" />
              <label class="levellabel">Artisans</label><img alt="Vue logo" src="../../assets/img/hammer.png" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="number" id="melee" class="number levelinput" v-model="melee"/>
              <input type="number" id="archer" class="number levelinput" v-model="archer"/>
              <input type="number" id="mage" class="number levelinput" v-model="mage"/>
              <input type="number" id="artisan" class="number levelinput" v-model="artisan"/>
            </td>
            <td class="button">
              <button id="add" v-on:click.prevent="checkForm">Ajouter</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/sass/front-office/CreateQuest";
</style>

<script>
  import localStorageService from "@/services/localStorageService";
  import { post } from "@/utils/functions";
  import { getClients } from "@/utils/services/users";
  export default {
    data() {
      return {
        selectedID: "",
        titleError: false,
        descriptionError: false,
        rewardError: false,
        rewardExpError: false,
        estimateDateError: false,
        limitDateError: false,
        numberPeopleError: false,
        clientError: false,
        levelError: false,
        title: null,
        description: null,
        reward: null,
        rewardExp: null,
        days: null,
        hours: null,
        date: null,
        numberPeople: null,
        client: null,
        melee: null,
        archer: null,
        mage: null,
        artisan: null,
        clients: []
      }
    },
    mounted() {
      if(this.assistant) {
        getClients().then(client => {
          this.clients = client;
        });
      }
    },
    computed: {
      assistant() {
        const currentUser = localStorageService.getUser()
        if(currentUser && currentUser.role_id === 3) {
          return true
        }
        return false
      }
    },
    methods: {
      homePage(){
        if (this.assistant){
          this.$router.push({ name: 'quêtes', query: { rf: 'r' }});
        } else {
          this.$router.push({ name: 'front-quests', query: { rf: 'r' }});
        }
      },
      onChange(e) {
        this.getID(e.target.value).then(
          response => (this.selectedID = response)
        );
      },
      async getID(value) {
        let promise = new Promise((resolve, reject) => {
          this.clients.forEach(item => {
            if (item.name === value) resolve(item.id);
          });
        });
        return await promise;
      },
      checkForm() {
        if (!this.assistant) this.client = localStorageService.getUser().id;
        else this.client = this.selectedID;

        if (this.title && this.description && this.reward && this.rewardExp && (this.days || this.hours) && this.date && this.numberPeople && this.client && (this.melee || this.archer || this.mage || this.artisan)) {
          if (!this.days) this.days = 0;
          if (!this.hours) this.hours = 0;
          if (!this.melee) this.melee = 0;
          if (!this.archer) this.archer = 0;
          if (!this.mage) this.mage = 0;
          if (!this.artisan) this.artisan = 0;
        }

        this.titleError = !this.title;
        this.descriptionError = !this.description;
        this.rewardError = !this.reward;
        this.rewardExpError = !this.rewardExp;
        this.estimateDateError = !this.days && !this.hours;
        this.limitDateError = !this.date;
        this.numberPeopleError = !this.numberPeople;
        this.clientError = !this.client;
        this.levelError = !this.melee && !this.archer && !this.mage && !this.artisan;

        if (this.titleError === false &&
          this.descriptionError === false &&
          this.rewardError === false &&
          this.rewardExpError === false &&
          this.estimateDateError === false &&
          this.limitDateError === false &&
          this.numberPeopleError === false &&
          this.clientError === false &&
          this.levelError === false) {
          const time = this.days * 1440 + this.hours * 60;
          const data = {titre: this.title, description: this.description, recompense: this.reward, recompense_exp: this.rewardExp, duree: time, date_limite: this.date, nbr_personne_minimum: this.numberPeople, id_client: this.client,
            metiers: [
              {
                id_metier_classe: 1,
                exp_recommande: this.melee
              },
              {
                id_metier_classe: 2,
                exp_recommande: this.archer
              },
              {
                id_metier_classe: 3,
                exp_recommande: this.mage
              },
              {
                id_metier_classe: 4,
                exp_recommande: this.artisan
              }
            ]};
          post('https://quiet-fortress-49850.herokuapp.com/api/requete', data);
          this.homePage();
        }
      }
    }
  }
</script>
