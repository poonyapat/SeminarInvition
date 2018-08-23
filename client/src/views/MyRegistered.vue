<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
            <v-toolbar fla dense class="primary" dark>
                <v-toolbar-title> My Registered Seminars </v-toolbar-title>
            </v-toolbar>
            <seminar v-for="(seminar, index) in seminars" :key="index" :seminar="seminar" />
            <v-card v-if="seminars.length === 0">
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
        console.log(this.$store.state.user.username)
        this.seminars = (await SeminarService.findAllByAttendeeUsername({user: this.$store.state.user.username})).data
    }
}
</script>

<style scoped>
.v-card__text {
    max-height: 10em;
    overflow: scroll
}
</style>
