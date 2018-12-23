<template>
    <v-container fluid>
        <v-layout row wrap v-if="accessible">
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
                <v-toolbar fla dense class="primary" dark>
                    <v-toolbar-title> My Created Seminars </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn round flat class="primary" :to="{name: 'seminarCreation'}">
                        <v-icon>add</v-icon>
                        New Seminar
                    </v-btn>
                </v-toolbar>
                <v-card style="background: rgba(255,255,255,0.5)">
                    <v-card-text>
                        <date-selector label="Start Date" v-model="minDate" :max="maxDate" style="display: inline-block;width: 40%"></date-selector>
                        <date-selector label="End Date" v-model="maxDate" :min="minDate" style="display: inline-block; width: 40%"></date-selector>
                        <v-btn class="primary" @click="update" round>Search</v-btn>
                    </v-card-text>
                </v-card>
                <seminar v-for="(seminar, index) in showedSeminars" :key="index" :seminar="seminar">
                    <v-btn round flat color="edit" :to="{name: 'seminarEditor', params: {id: seminar.id}}" :disabled="!editable(seminar)">
                        <v-icon>edit</v-icon>
                        <span class="hidden-xs-only">
                            Edit
                        </span>
                    </v-btn>
                    <v-btn round flat color="info" :to="{name: 'attendeesInformation', params: {id: seminar.id}}">
                        <v-icon>people</v-icon>
                        <span class="hidden-xs-only">
                            Attendees
                        </span>
                    </v-btn>
                </seminar>
                <v-card v-if="showedSeminars.length === 0" class="low-op">
                    <v-card-title>
                        <h1 v-if="loaded">0 Created Seminar Found...</h1>
                        <v-progress-linear v-else :indeterminate="true" color="primary"></v-progress-linear>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <error v-else code="403" msg="Access Denied" />
    </v-container>
</template>

<script>
    import DateSelector from '@/components/DateSelector'
    import Seminar from '@/components/Seminar'
    import Error from '@/components/Error'
    import SeminarService from '@/services/seminarService'
    import {
        mapState
    } from 'vuex';
    import DateService from '@/services/dateService'
    export default {
        data() {
            return {
                loaded: false,
                seminars: [],
                today: '',
                minDate: '',
                maxDate: '',
                showedSeminars: []
            }
        },
        components: {
            Seminar,
            Error,
            DateSelector
        },
        computed: {
            ...mapState([
                'user', 'attendees', 'route', 'mySeminars'
            ]),
            accessible() {
                return this.user && (this.user.role == 'Seminar Admin' || this.user.role == 'Admin')
            },
        },
        async mounted() {
            this.loaded = false
            if (!this.user)
                this.seminars = []
            else
                this.seminars = (await SeminarService.findAllByAuthor(this.user.username)).data
            this.showedSeminars = this.seminars
            this.today = new Date().toISOString()
            this.loaded = true
        },
        methods: {
            editable(seminar) {
                let firstDate = new Date(DateService.firstDate(seminar))
                firstDate.setDate(firstDate.getDate() - 3)
                return this.today < firstDate.toISOString()
            },
            update(){
                this.showedSeminars = []
                for (let i in this.seminars){
                    let firstDate = DateService.firstDate(this.seminars[i])
                    if ((!this.minDate || firstDate.substring(0,10) >= this.minDate.substring(0,10)) && (!this.maxDate || firstDate.substring(0,10) <= this.maxDate.substring(0,10))){
                        this.showedSeminars.push(this.seminars[i])
                    }
                }
            }
        },
        wacth: {
            mySeminars: async () => {
                this.loaded = false
                if (!this.user)
                    this.seminars = []
                else
                    this.seminars = (await SeminarService.findAllByAuthor(this.user.username)).data
                this.loaded = true
            },
        }
    }
</script>

<style>

</style>