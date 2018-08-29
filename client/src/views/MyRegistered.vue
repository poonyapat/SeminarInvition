<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
            <v-toolbar fla dense class="primary" dark>
                <v-toolbar-title> My Registered Seminars </v-toolbar-title>
            </v-toolbar>
            <seminar 
                v-for="attendee in seminars" 
                :key="attendee.seminar.id"
                :seminar="attendee.seminar"
                :status="attendee.status"
                @confirm="confirm(attendee)"
                @cancel="cancel(attendee)"
            >
                <v-btn 
                    color="success" 
                    flat 
                    :disabled="attendee.status === 'Confirmed'" 
                    @click="confirm(attendee)"
                >
                    <v-icon>done</v-icon>
                    Confirm
                </v-btn>
                <v-btn 
                    flat 
                    color="cancel"
                    @click="cancel(attendee)"
                >
                    <v-icon>close</v-icon>
                    Cancel
                </v-btn>
            </seminar>
            <v-card v-if="seminars.length === 0">
                <v-card-title>
                    <h1 v-if="loaded">0 Registered Seminar Found...</h1>
                    <v-progress-linear v-else :indeterminate="true" color="primary"></v-progress-linear>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import Seminar from '@/components/Seminar'
import SeminarService from '@/services/seminarService'
import AttendeeService from '@/services/attendeeService'

export default {
    data() {
        return {
            seminars: [],
            loaded: false
        }
    },
    components: {
        Seminar
    },
    methods: {
        cancel(attendee) {
            //remove from db
            AttendeeService.cancelRegistration({
                user: this.$store.state.user.username,
                seminar: attendee.seminar.id
            })
            // remove from ui
            const index = this.seminars.indexOf(attendee)
            if (index > -1){
                this.seminars.splice(index,1)
            }
        },
        confirm(attendee){
            // change status in db
            AttendeeService.updateStatus({
                user: this.$store.state.user.username,
                seminar: attendee.seminar.id
            }, "Confirmed")
            // change status for ui
            attendee.status = "Confirmed"
        }
    },
    async mounted(){
        if (!this.$store.state.token){
            this.$router.push({name: 'home'})
        }
        let attendees = (await AttendeeService.findAllByUser(this.$store.state.user.username)).data
        for (let i = 0; i < attendees.length; i++){
            this.seminars.push({
                status: attendees[i].status,
                seminar: (await SeminarService.findOneById(attendees[i].seminar)).data
            })
        }
        this.loaded = true
    }
}
</script>

<style scoped>
.v-card__text {
    max-height: 10em;
    overflow: scroll
}
</style>
