<template>
  <v-layout row wrap>
    <v-flex xs12 sm10 offset-sm1 md8 offset-md2 v-if="accessible">
      <v-toolbar fla class="primary" dark>
        <v-toolbar-title> {{seminar.title}} - Registration </v-toolbar-title>
      </v-toolbar>
      <v-card class="ma-3 pa-3 low-op">
        <v-card-text v-if="hasBase">
          <h1>{{hasAdditional? "Base Information": "Information"}}</h1>
          <div lg12 v-for="(data, key) in baseInformation" :key="key" class="ma-4">
            <v-radio-group v-if="data.type === 'select'" v-model="data.value" :label="data.label">
              <v-radio v-for="choice in data.choices" :key="choice" :label="choice" :value="choice"></v-radio>
            </v-radio-group>
            <v-select v-else-if="data.type ==='combo'" v-model="data.value" :label="data.label" :items="data.choices"></v-select>
            <date-selector v-else-if="data.type =='date'" :label="data.label" v-model="data.value" :max="maxYear()"></date-selector>
            <v-text-field v-else-if="data.type === 'text'" v-model="data.value" :label="data.label" :mask="data.mask"
              :rules="rules.notNull"></v-text-field>
            <div v-else-if="data.type === 'number' && data.min && data.max">
              <v-text-field type="number" v-model="data.value" style="width: 20%" :label="data.label" :rules="rules.notNull"></v-text-field>
              <v-slider v-if="data.min && data.max" v-model="data.value" :min="data.min" :max="data.max" append-icon="add"
                prepend-icon="remove" @click:append="data.value++" @click:prepend="data.value--" />
            </div>
          </div>
        </v-card-text>
        <v-card-text v-if="hasAdditional">
          <h1>{{hasBase? 'Additional Information': 'Information'}}</h1>
          <div lg12 v-for="(type, key) in requiredData.requiredData" :key="key" class="ma-4">
            <v-text-field v-if="type !== 'boolean'" :label="key" v-model="registeredData[key]" :rules="rules.notNull"
              :type="type === 'number'?'Number':'text'"></v-text-field>
            <v-checkbox :label="key" v-if="type === 'boolean'" v-model="registeredData[key]"></v-checkbox>
          </div>
        </v-card-text>

        <v-alert :value="infoError" type="error">
          {{infoError}}
        </v-alert>
        <v-card-actions justify-center>
          <v-spacer></v-spacer>
          <v-btn round class="success mr-4 mb-4" @click="register()">Register</v-btn>
          <v-btn round class="cancel ml-4 mb-4" :to="{name: 'seminarInformation', params: {id: seminar.id}}" dark>Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
    <error v-else code="403" msg="Access Denied"></error>
  </v-layout>
</template>

<script>
  import SeminarService from "@/services/seminarService";
  import AttendeeService from "@/services/attendeeService";
  import TransactionService from "@/services/transactionService";
  import Error from "@/components/Error"
  import Nationality from "@/Nationality"
  import DateSelector from '@/components/DateSelector'
  import {
    mapState,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        seminar: {
          title: "",
          startTime: "",
          endTime: ""
        },
        registeredData: {},
        requiredData: {
          requiredData: {}
        },
        baseInformation: {
          fullname: {
            label: 'Fullname',
            value: '',
            type: 'text'
          },
          gender: {
            label: 'Gender',
            value: '',
            type: 'select',
            choices: ['Male', 'Female', 'Other']
          },
          birthDate: {
            label: 'Date of Birth',
            value: '',
            type: 'date',
          },
          nationality: {
            label: 'Nationality',
            value: '',
            type: 'combo',
            choices: Nationality
          },
          email: {
            label: 'Email',
            value: '',
            type: 'text'
          },
          contactNumber: {
            label: 'Contact Phone Number',
            value: '',
            type: 'text',
            mask: 'phone'
          },
          company: {
            label: 'Company',
            value: '',
            type: 'text'
          },
          officeNumber: {
            label: 'Office Phone Number',
            value: '',
            type: 'text',
            mask: 'phone'
          },
          fax: {
            label: 'Fax',
            value: '',
            type: 'text',
            mask: 'phone'
          },
        },
        rules: {
          notNull: [v => !!v || 'Require Information'],
        },
        infoError: false,
        today: ''
      }
    },
    computed: {
      ...mapState(["user", "route", "attendees", "mySeminars"]),
      hasAdditional() {
        return Boolean(Object.keys(this.requiredData.requiredData).length)
      },
      hasBase() {
        return this.requiredData.baseInformation
      },
      accessible() {
        return !this.attendees.map(attendee => attendee.seminar).includes(parseInt(this.route.params.id)) &&
          !this.mySeminars.map(seminar => seminar.id).includes(this.route.params.id) &&
          this.seminar.rejectedList && !(this.seminar.rejectedList.includes(this.user.username))
      },
      fullRegisteredData() {
        let res = {}
        for (let attr in this.baseInformation) {
          res[attr] = this.baseInformation[attr].value
        }
        for (let attr in this.registeredData) {
          res[attr] = this.registeredData[attr]
        }
        return res;
      },
      isAbleToRegister() {
        for (let attr in this.baseInformation) {
          if (!this.baseInformation[attr].value) {
            return false
          }
        }
        for (let attr in this.requiredData.requiredData) {
          if (this.requiredData.requiredData[attr] !== 'boolean' && !this.registeredData[attr]) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      ...mapActions(["setAttendees"]),
      maxYear(){
        let maxYear = new Date()
        maxYear.setFullYear(maxYear.getFullYear()-10)
        maxYear = maxYear.toISOString().substring(0,10)
        return maxYear
      },
      async register() {
        if (!this.isAbleToRegister) {
          this.infoError = 'Information is required'
          return
        }
        this.infoError = false
        await AttendeeService.register(
          this.user.username,
          this.seminar.id,
          this.fullRegisteredData
        );
        await TransactionService.create(this.user.username, this.seminar.id, 'register', '')
        this.setAttendees(
          (await AttendeeService.findAllByUser(this.user.username)).data
        );
        this.$router.push({
          name: "myRegistered"
        });
      }
    },
    components: {
      Error, DateSelector
    },
    async mounted() {
      const seminarId = this.route.params.id;
      this.seminar = (await SeminarService.findOneById(seminarId)).data;
      this.requiredData = (await SeminarService.getRequiredData(seminarId)).data;
      if (this.user) {
        for (let index in this.baseInformation) {
          this.baseInformation[index].value = this.user[index]
        }
      }
      if (this.baseInformation.age.value < this.baseInformation.age.min)
        this.baseInformation.age.value = this.baseInformation.age.min
      if (this.baseInformation.age.value > this.baseInformation.age.max)
        this.baseInformation.age.value = this.baseInformation.age.max
      this.today = new Date().toISOString().substring(0, 10)
    }
  };
</script>

<style>
</style>