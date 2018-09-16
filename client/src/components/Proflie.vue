<template>
<div>
  <v-card height="200px">
    <v-bottom-nav
      :active.sync="bottomNav"
      :color="color"
      :value="true"
      absolute
    >
      <v-btn dark id="proflie"  v-on:click= "clickProflie">
        <span>Proflie</span>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn dark id="edit" v-on:click= "clickEdit">
        <span>Edit</span>
        <v-icon>edit</v-icon>
      </v-btn>

      <v-btn dark id="my-seminar" v-on:click= "clickSeminar">
        <span>My seminar</span>
        <v-icon>storage</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
  <v-card>
      <div v-if="showProflie">
        <p v-for="item in items" :key = "item.suject">{{ item.subject }}  : {{ item.info }}</p>
      </div>
      <div v-else-if="showEdit">
          <p>Go to Edit Proflie Page</p>
      </div>
      <div v-else-if="showSeminar">
          <p>Display seminar that registed</p>
      </div>
  </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 0,
      showProflie: true,
      showEdit: false,
      showSeminar: false,
      items: [
        {subject: 'fullname', info: 'phongsit'},
        {subject: 'gender', info: 'male'},
        {subject: 'age', info: '2'},
        {subject: 'nationality', info: 'thai 1/2'},
        {subject: 'email', info: 'kenny'},
        {subject: 'contactNumber', info: '555'},
        {subject: 'officeNumber', info: '1'},
        {subject: 'fax', info: '99999'},
        {subject: 'company', info: 'KU'},
        {subject: 'credit', info: 'good i guess'}
      ]
    }
  },
  methods: {
    clickProflie: function () {
      this.showProflie = true
      this.showEdit = false
      this.showSeminar = false
    },
    clickEdit: function () {
      this.showProflie = false
      this.showEdit = true
      this.showSeminar = true
    },
    clickSeminar: function () {
      this.showProflie = false
      this.showEdit = false
      this.showSeminar = true
    }
  },
  computed: {
    color () {
      switch (this.bottomNav) {
        case 0: return 'blue-grey'
        case 1: return 'teal'
        case 2: return 'brown'
        case 3: return 'indigo'
      }
    }
  }

}
</script>
