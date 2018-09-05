<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
            <v-toolbar fla dense class="primary" dark>
                <v-toolbar-title> My Registered Seminars </v-toolbar-title>
            </v-toolbar>
            <seminar 
                v-for="(seminar,index) in registeredSeminars" 
                :key="seminar.id"
                :seminar="seminar"
                :status="attendees[index].status"
                @confirm="confirm(seminar.id)"
                @cancel="cancel(seminar.id)"
            >
                <v-btn 
                    color="success" 
                    flat 
                    :disabled="attendees[index].status === 'Confirmed'" 
                    @click="confirm(seminar.id)"
                >
                    <v-icon>done</v-icon>
                    Confirm
                </v-btn>
                <v-btn 
                    flat 
                    color="cancel"
                    @click="cancel(seminar.id)"
                >
                    <v-icon>close</v-icon>
                    Cancel
                </v-btn>
            </seminar>
            <v-card v-if="registeredSeminars.length === 0">
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

import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            registeredSeminars: [],
            loaded: true
        }
    },
    computed: {
        ...mapState([
            'attendees','token', 'user'
        ])
    },
    components: {
        Seminar
    },
    methods: {
        cancel(seminarId) {
            //remove from db
            AttendeeService.cancelRegistration(this.user.username,seminarId)
            for (let i = 0; i < this.registeredSeminars.length; i++){
                if (this.registeredSeminars[i].id === seminarId){
                    this.registeredSeminars.splice(i,1)
                    this.cancelRegistration(i)
                }
            }
        },
        confirm(seminarId){
            // change status in db
            const confirm = "Confirmed"
            AttendeeService.updateStatus(this.user.username, seminarId, confirm)
            for (let i = 0; i < this.attendees.length; i++){
                if (this.attendees[i].seminar === seminarId){
                    this.updateAttendeeStatus({
                        index: i,
                        status: confirm
                    })
                }
            }
        },
        ...mapActions([
            'setAttendees', 'updateAttendeeStatus', 'cancelRegistration'
        ])
    },
    async mounted(){
        if (!this.token){
            this.$router.push({name: 'home'})
        }
        this.loaded = false
        this.registeredSeminars = []
        for (let i = 0; i < this.attendees.length; i++){
            this.registeredSeminars.push((await SeminarService.findOneById(this.attendees[i].seminar)).data)
        }
        this.loaded = true
    },
    watch: {
        attendees: {
            imidiate: true,
            async handler(attendees){
                this.loaded = false
                this.registeredSeminars = []
                for (let i = 0; i < attendees.length; i++){
                    this.registeredSeminars.push((await SeminarService.findOneById(attendees[i].seminar)).data)
                }
                this.loaded = true
            }
        }
    }

}
</script>

<style scoped>
.v-card__text {
    max-height: 10em;
    overflow: scroll
}
</style>
