<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
            <v-toolbar fla dense class="primary" dark>
                <v-toolbar-title> My Registered Seminars </v-toolbar-title>
            </v-toolbar>
            <seminar v-for="(seminar, index) in seminars" :key="index" :seminar="seminar" registered @cancel-registration="remove"/>
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
        remove(seminar) {
            const index = this.seminars.indexOf(seminar);
            if (index > -1)
                this.seminars.splice(index,1)
        }
    },
    async mounted(){
        if (!this.$store.state.token){
            this.$router.push({name: 'home'})
        }
        this.seminars = (await SeminarService.findAllByAttendeeUsername(this.$store.state.user.username)).data
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
