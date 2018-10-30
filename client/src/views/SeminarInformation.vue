<template>
    <v-container fluid>
        <v-layout v-if="seminar" wrap justify-center>
            <v-flex sm12 lg10>
                <v-toolbar fla class="primary" dark>
                    <v-toolbar-title> {{seminar.title}} </v-toolbar-title>
                </v-toolbar>
                <v-list class="ma-3 low-op" dark three-line>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Title</v-list-tile-title>
                            <v-list-tile-sub-title> {{seminar.title}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Description</v-list-tile-title>
                            <v-list-tile-sub-title> {{seminar.description}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Date</v-list-tile-title>
                            <v-list-tile-sub-title
                                    v-if="formatDate(seminar.startTime) !== formatDate(seminar.endTime)">
                                Start Date : {{formatDate(seminar.startTime)}} <br>
                                End Date : {{formatDate(seminar.endTime)}}
                            </v-list-tile-sub-title>
                            <v-list-tile-sub-title v-else>
                                {{formatDate(seminar.startTime)}}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Place</v-list-tile-title>
                            <v-list-tile-sub-title> {{seminar.place}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Contact</v-list-tile-title>
                            <v-list-tile-sub-title>
                                Email : {{seminar.contactEmail}} <br>
                                Phone : {{seminar.contactNumber}}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                Current Attendees : {{seminar.currentRegistered}} / {{seminar.maximumAttendees}}
                            </v-list-tile-title>

                            <v-list-tile-sub-title>
                                <v-btn v-if="!user || status === '' && seminar.author !== user.username" @click="register(seminar.id)"
                                        class="primary">
                                        Register
                                </v-btn>
                                <v-btn v-if="status === 'Attended'" class="success" @click="confirm(seminar.id)">
                                    Confirm Registration
                                </v-btn>
                                <v-btn v-if="status !== ''" class="cancel" dark @click="cancel(seminar.id)">Cancel
                                    Registration
                                </v-btn>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
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
        endTime: ""
      },
      status: ""
    };
  },
  components: {
    Error
  },
  computed: {
    ...mapState(["user", "attendees"])
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
</style>
