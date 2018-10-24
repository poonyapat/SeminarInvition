<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
            <v-toolbar fla class="primary" dark>
                <v-toolbar-title> {{seminar.title}} - Registration </v-toolbar-title>
            </v-toolbar>
            <v-card class="ma-3 pa-3">
                <v-card-text>
                    <div lg12 v-for="(type, key) in requiredData.requiredData" :key="key" class="ma-4">
                        <v-text-field v-if="type !== 'boolean'" :label="key" v-model="registeredData[key]" :type="type === 'number'?'Number':'text'"></v-text-field>
                        <v-checkbox :label="key" v-if="type === 'boolean'" v-model="registeredData[key]"></v-checkbox>
                    </div>
                </v-card-text>
                <v-card-actions justify-center>
                    <v-spacer></v-spacer>
                    <v-btn class="success mr-4 mb-4" @click="register()">Register</v-btn>
                    <v-btn class="cancel ml-4 mb-4" :to="{name: 'seminarInformation', params: {id: seminar.id}}">Cancel</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import SeminarService from "@/services/seminarService";
import AttendeeService from "@/services/attendeeService";
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
      requiredData: {}
    };
  },
  computed: {
    ...mapState(["user"])
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
  async mounted() {
    const seminarId = this.$store.state.route.params.id;
    this.seminar = (await SeminarService.findOneById(seminarId)).data;
    this.requiredData = (await SeminarService.getRequiredData(seminarId)).data;
  }
};
</script>

<style>
</style>
