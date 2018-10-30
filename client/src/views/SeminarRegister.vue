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
                      <v-text-field v-else-if="data.type === 'text'" v-model="data.value" :label="data.label" :mask="data.mask"></v-text-field>
                      <div v-else-if="data.type === 'number' && data.min && data.max">
                        <v-text-field type="number" v-model="data.value" style="width: 20%" :label="data.label"></v-text-field>
                        <v-slider  
                          v-if="data.min && data.max"
                          v-model="data.value" 
                          :min="data.min" 
                          :max="data.max" 
                          append-icon="add"
                          prepend-icon="remove"
                          @click:append="data.value++"
                          @click:prepend="data.value--"
                        />
                      </div>
                    </div>
                </v-card-text>
                <v-card-text v-if="hasAdditional">
                    <h1>{{hasBase? 'Additional Information': 'Information'}}</h1>
                    <div lg12 v-for="(type, key) in requiredData.requiredData" :key="key" class="ma-4">
                        <v-text-field v-if="type !== 'boolean'" :label="key" v-model="registeredData[key]" :type="type === 'number'?'Number':'text'"></v-text-field>
                        <v-checkbox :label="key" v-if="type === 'boolean'" v-model="registeredData[key]"></v-checkbox>
                    </div>
                </v-card-text>
                <v-card-actions justify-center>
                    <v-spacer></v-spacer>
                    <v-btn class="success mr-4 mb-4" @click="register()">Register</v-btn>
                    <v-btn class="cancel ml-4 mb-4" :to="{name: 'seminarInformation', params: {id: seminar.id}}" dark>Cancel</v-btn>
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
import Error from "@/components/Error"
import { mapState, mapActions } from "vuex";
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
        fullname: {label: 'Full name', value: '', type: 'text'},
        gender: {label: 'Gender', value: '', type: 'select', choices: ['Male', 'Female', 'Others']},
        age: {label: 'Age', value: 15, type: 'number', min: 15, max: 100},
        nationality: {label: 'Nationality', value: '', type: 'text'},
        email: {label: 'Email', value: '', type: 'text'},
        contactNumber: {label: 'Contact Number', value: '', type: 'text', mask: 'phone'},
        company: {label: 'Company', value: '', type: 'text'},
        officeNumber: {label: 'Office Number', value: '', type: 'text', mask: 'phone'},
        fax: {label: 'Fax', value: '', type: 'text', mask: 'phone'},
      }
    };
  },
  computed: {
    ...mapState(["user", "route", "attendees"]),
    hasAdditional(){
      return Boolean(Object.keys(this.requiredData.requiredData).length)
    },
    hasBase(){
      return this.requiredData.baseInformation
    },
    accessible(){
      return !this.attendees.map(attendee => attendee.seminar).includes(parseInt(this.route.params.id))
    }
  },
  methods: {
    ...mapActions(["setAttendees"]),
    async register() {
      await AttendeeService.register(
        this.user.username,
        this.seminar.id,
        JSON.parse(JSON.stringify(this.registeredData))
      );
      this.setAttendees(
        (await AttendeeService.findAllByUser(this.user.username)).data
      );
      this.$router.push({ name: "myRegistered" });
    }
  },
  components: {
    Error
  },
  async mounted() {
    const seminarId = this.route.params.id;
    this.seminar = (await SeminarService.findOneById(seminarId)).data;
    this.requiredData = (await SeminarService.getRequiredData(seminarId)).data;
    for (let index in this.baseInformation){
      this.baseInformation[index].value = this.user[index]
    }
    if (this.baseInformation.age.value < this.baseInformation.age.min)
      this.baseInformation.age.value = this.baseInformation.age.min
    if (this.baseInformation.age.value > this.baseInformation.age.max)
      this.baseInformation.age.value = this.baseInformation.age.max
  }
};
</script>

<style>
</style>
