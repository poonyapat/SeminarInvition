<template>
    <v-container>
        <v-layout v-if="seminar" wrap justify-center>
            <v-flex sm12 lg10>
                <v-toolbar flat dark class="primary" >
                    <v-toolbar-title> {{seminar.title}} </v-toolbar-title>
                </v-toolbar>
                <v-card class="low-op pa-2">
                    <v-card-text v-for="(info, key) in showableInfo" :key="key">
                        <h2>{{info.label}}</h2>
                        <div v-if="Array.isArray(info.value)">
                            <p v-for="(v,k) in info.value" :key="k">{{v.label}} : {{v.value}}</p>
                        </div>
                        <p v-else>{{info.value}}</p>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-btn v-if="!user || status === '' && seminar.author !== user.username && seminar.rejectedList && !seminar.rejectedList.includes(user.username)" @click="register(seminar.id)" class="primary">
                                Register
                        </v-btn>
                        <v-btn v-if="status === 'Attended'" class="success" @click="confirm(seminar.id)">
                            Confirm Registration
                        </v-btn>
                        <v-btn v-if="status !== ''" class="cancel" dark @click="cancel(seminar.id)">
                            Cancel Registration
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <error v-else code="404" msg="Seminar is not found" />
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SeminarService from "@/services/seminarService";
import AttendeeService from "@/services/attendeeService";
import Error from '@/components/Error'
export default {
  data() {
    return {
      seminar: {
        title: "",
        startTime: "",
        endTime: "",
        dates: []
      },
      status: ""
    };
  },
  components: {
    Error
  },
  computed: {
    ...mapState(["user", "attendees"]),
    showableInfo(){
        let timeRange =  `${this.seminar.startTime} - ${this.seminar.endTime}`
        let currentAttendees = `${this.seminar.currentRegistered} / ${this.seminar.maximumAttendees}`
        return {
            title: {label: 'Title', value: this.seminar.title},
            description: {label: 'Description', value: this.seminar.description},
            date: {label: 'Date', value: [
              {label: 'Date', value: this.formattedDate}, 
              {label: 'Time', value: timeRange}
            ]},
            place: {label: 'Location', value: this.seminar.place},
            contact: {label: 'Contact', value: [
              {label: 'Email', value: this.seminar.contactEmail}, 
              {label:'Contact Number', value: this.seminar.contactNumber}
            ]},
            attendees: {label: 'Current Attendees', value: currentAttendees}
        }
    },
    formattedDate(){
      return this.seminar.dates.map(date=>date.substring(0,10)).toString()
    }
  },
  methods: {
    formatDate(date) {
      return date.replace("T", " ").slice(0, 10);
    },
    async register(seminarId) {
      this.$router.push({ name: "seminarRegister", params: { id: seminarId } });
    },
    cancel(seminarId) {
      //remove from db
      AttendeeService.cancelRegistration(this.user.username, seminarId);
      for (let i = 0; i < this.attendees.length; i++) {
        if (this.attendees[i].seminar === seminarId) {
          this.cancelRegistration(i);
        }
      }
      this.$router.push({ name: "myRegistered" });
    },
    confirm(seminarId) {
      // change status in db
      const confirm = "Confirmed";
      AttendeeService.updateStatus(this.user.username, seminarId, confirm);
      for (let i = 0; i < this.attendees.length; i++) {
        if (this.attendees[i].seminar === seminarId) {
          this.updateAttendeeStatus({
            index: i,
            status: confirm
          });
        }
      }
      this.$router.push({ name: "myRegistered" });
    },
    ...mapActions([
      "updateAttendeeStatus",
      "cancelRegistration",
      "setAttendees"
    ])
  },
  async mounted() {
    const seminarId = this.$store.state.route.params.id;
    try {
        this.seminar = (await SeminarService.findOneById(seminarId)).data;
    } catch(error){
        this.seminar = null
    }
    for (let i = 0; i < this.attendees.length; i++) {
      if (this.attendees[i].seminar == seminarId) {
        this.status = this.attendees[i].status;
      }
    }
  }
};
</script>

<style scoped>
.v-list-tile {
  transition: all 0.5s ease-in-out;
}

.v-list__tile:hover {
  background-color: #3333332f;
  color: black;
}

.v-list__tile:hover .v-list__tile__title {
  font-weight: 1000;
}

p {
    word-wrap: break-word;
    white-space: pre-wrap;
    margin-bottom: 0;
}

textarea {
    width: 100%;
    height: 100vw;
}
</style>
