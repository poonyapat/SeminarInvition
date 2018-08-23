<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3 class="mb-3">
        <v-toolbar fla dense class="primary darken-1" dark>
            <v-toolbar-title> My Registered Seminars </v-toolbar-title>
        </v-toolbar>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 v-for="(seminar, index) in seminars" :key="index">
            <seminar :seminar="seminar" />
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 v-if="seminars.length === 0">
            <v-card>
                <v-card-title>
                    <h1>Empty</h1>
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
            seminars: []
        }
    },
    components: {
        Seminar
    },
    async mounted(){
        this.seminars = (await SeminarService.findAll()).data
    }
}
</script>

<style scoped>
.v-card__text {
    max-height: 10em;
    overflow: scroll
}
</style>
