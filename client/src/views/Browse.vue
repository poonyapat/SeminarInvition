<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
            <v-text-field
                outline
                label="Search"
                v-model="searcher"
                prepend-inner-icon="search"
            >
            </v-text-field>
            <seminar v-for="(seminar, index) in seminars" :key="index" :seminar="seminar" />
            <v-card v-if="seminars.length === 0">
                <v-card-title>
                    <h1 v-if="loaded">0 Seminar Found...</h1>
                    <v-progress-linear v-else :indeterminate="true"></v-progress-linear>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import Seminar from '@/components/Seminar'
import SeminarService from '@/services/seminarService'

const debounce = require('lodash.debounce')

export default {
    data() {
        return {
            seminars: [],
            searcher: null,
            loaded: false
        }
    },
    watch: {
        searcher: debounce(async function(value){
            const route = {
                name: 'browse'
            }
            if (value !== ''){
                route.query = {
                    search: this.searcher
                }
            }
            this.$router.push(route)
        }, 500),
        '$route.query.search': {
            immediate: true,
            async handler (value) {
                this.searcher = value
                this.seminars = (await SeminarService.findAll(value)).data
                this.loaded = true
            }
        },
    },
    components: {
        Seminar
    },
}
</script>

<style scoped>
.v-card__text {
    max-height: 10em;
    overflow: scroll
}
</style>
