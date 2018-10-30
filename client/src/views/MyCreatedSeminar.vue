<template>
    <v-container fluid>
        <v-layout row wrap v-if="accessible">
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
                <v-toolbar fla dense class="primary" dark>
                    <v-toolbar-title> My Created Seminars </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn 
                        round
                        class="primary" 
                        :to="{name: 'seminarCreation'}"
                    >
                        <v-icon>add</v-icon>
                        New Seminar
                    </v-btn>
                </v-toolbar>
                <seminar v-for="(seminar, index) in seminars" :key="index" :seminar="seminar">
                    <v-btn round flat color="edit" >
                        <v-icon>edit</v-icon>
                        Edit
                    </v-btn>
                    <v-btn round flat color="info">
                        <v-icon>people</v-icon>
                        Attendees
                    </v-btn>
                </seminar>
                <v-card v-if="seminars.length === 0" class="low-op">
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
import Seminar from '@/components/Seminar'
import Error from '@/components/Error'
import SeminarService from '@/services/seminarService'
import { mapState } from 'vuex';
export default {
    data() {
        return {
            loaded: false,
            seminars: []
        }
    },
    components: {
        Seminar,Error
    },
    computed: {
        ...mapState([
            'user', 'attendees', 'route'
        ]),
        accessible(){
            return this.user && (this.user.role == 'Internal User' || this.user.role == 'Admin')
        }
    },
    async mounted(){
        this.loaded = false
        if (!this.user)
            this.seminars = []
        else
            this.seminars = (await SeminarService.findAllByAuthor(this.user.username)).data
        this.loaded = true
    },
    wacth: {
        attendees: async ()=> {
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
