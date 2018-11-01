<template>
    <v-container fluid>
        <v-layout row wrap justify-center>
            <v-flex xs12 sm10 md8 lg6 text-xs-center>
                <v-text-field
                    clearable
                    outline
                    label="Search"
                    v-model="searcher"
                    prepend-inner-icon="search"
                >
                </v-text-field>
                <v-pagination
                v-if="seminars.length"
                v-model="page"
                :length="maxPage"
                :total-visible="7"
                round
                ></v-pagination>
                <seminar v-for="(seminar, index) in seminars" :key="index" :seminar="seminar" />
                <v-pagination
                v-if="seminars.length"
                v-model="page"
                :length="maxPage"
                :total-visible="7"
                round
                ></v-pagination>
                <v-card v-if="!seminars.length" class="low-op">
                    <v-card-title>
                        <h1 v-if="loaded">0 Seminar Found...</h1>
                        <v-progress-linear v-else :indeterminate="true"></v-progress-linear>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
            loaded: false,
            page: 1,
            maxPage: 1
        }
    },
    mounted(){
        this.$router.push({name: 'browse', query: {page: this.page}})
    },
    watch: {
        searcher: debounce(async function(value){
            const route = {
                name: 'browse',
                query: {
                    page: 1
                }
            }
            if (value !== ''){
                route.query = {
                    search: value,
                    page: 1
                }
            }
            this.$router.push(route)
        }, 500),
        page: function(value){
            const route = {
                name: 'browse',
                query: {
                    page: value
                }
            }
            if (this.searcher !== ''){
                route.query = {
                    search: this.searcher,
                    page: value
                }
            }
            this.$router.push(route)
        },
        '$route.query.search': {
            immediate: true,
            async handler (value) {
                this.searcher = value
                let temp = (await SeminarService.findAll({search:value, page:this.page})).data
                this.seminars = temp.rows;
                this.maxPage = Math.ceil(temp.count/10)
                this.loaded = true
            }
        },
        '$route.query.page': {
            immediate: true,
            async handler (value) {
                this.page = parseInt(value)
                if (!this.page)
                    return
                let temp = (await SeminarService.findAll({search:this.search, page:value})).data
                this.seminars = temp.rows;
                this.maxPage = Math.ceil(temp.count/10)
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
