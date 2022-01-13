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
              <label>Récompense</label>&nbsp;<span class="error" v-if="rewardError">Récompense requise.</span><br />
              <input type="text" id="reward" v-model="reward" />
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
            <td>
              <label>Commanditaire</label>&nbsp;<span class="error" v-if="clientError">Commanditaire requis.</span><br />
              <input class="client" list="clients" placeholder="Commanditaire" v-model="client" />
              <datalist id="clients">
                <option v-for="client in clients" :key="client.id">{{client.login}}_{{client.firstname}}_{{client.firstname}}</option>
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
  export default {
    data() {
      return {
        titleError: false,
        descriptionError: false,
        rewardError: false,
        estimateDateError: false,
        limitDateError: false,
        numberPeopleError: false,
        clientError: false,
        levelError: false,
        title: null,
        description: null,
        reward: null,
        days: null,
        hours: null,
        date: null,
        numberPeople: null,
        client: null,
        melee: null,
        archer: null,
        mage: null,
        artisan: null,
        clients: [
          {
            id: 1,
            login: 'test',
            firstname: 'test',
            name: 'test'
          },
          {
            id: 2,
            login: 'toto',
            firstname: 'toto',
            name: 'toto'
          },
          {
            id: 3,
            login: 'titi',
            firstname: 'titi',
            name: 'titi'
          }
        ]
      }
    },
    methods: {
      checkForm() {
        if (this.title && this.description && this.reward && (this.days || this.hours) && this.date && this.numberPeople && this.client && (this.melee || this.archer || this.mage || this.artisan)) {
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
        this.estimateDateError = !this.days && !this.hours;
        this.limitDateError = !this.date;
        this.numberPeopleError = !this.numberPeople;
        this.clientError = !this.client;
        this.levelError = !this.melee && !this.archer && !this.mage && !this.artisan;
      }
    }
  }
</script>
