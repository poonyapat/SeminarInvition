<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
            <v-toolbar fla dense class="primary" dark>
                <v-toolbar-title> My Created Seminars </v-toolbar-title>
            </v-toolbar>
            <seminar v-for="(seminar, index) in seminars" :key="index" :seminar="seminar" editable/>
            <v-card v-if="seminars.length === 0">
                <v-card-title>
                    <h1 v-if="loaded">0 Created Seminar Found...</h1>
                    <v-progress-linear v-else :indeterminate="true" color="primary"></v-progress-linear>
                </v-card-title>
            </v-card>
        </v-flex>
        <v-btn fixed right fab bottom large icon class="primary" :to="{name: 'seminarCreation'}"><v-icon>add</v-icon></v-btn>
    </v-layout>
</template>

<script>
import Seminar from '@/components/Seminar'
import SeminarService from '@/services/seminarService'
export default {
    data() {
        return {
            loaded: false,
            seminars: []
        }
    },
    components: {
        Seminar
    },
    async mounted(){
        const state = this.$store.state
        if (!state.user.role || ( state.user.role !== 'Internal User' && state.user.role !== 'Admin')){
            this.$router.push({name: 'home'})
        }
        this.seminars = (await SeminarService.findAllByAuthor( this.$store.state.user.username)).data
        this.loaded = true
    }
}
</script>

<style>

</style>
