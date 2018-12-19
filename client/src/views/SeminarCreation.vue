<template>
    <v-container fluid>
        <v-layout row wrap v-if="accessible">
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
                <v-toolbar fla dense class="primary" dark>
                    <v-toolbar-title> Create Seminar </v-toolbar-title>
                </v-toolbar>
                <seminar-creation-stepper class="mt-3" @submit-form="create"/>
            </v-flex>
        </v-layout>
        <error v-else code="403" msg="Access Denied"/>
    </v-container>
</template>

<script>
import SeminarCreationStepper from '@/components/SeminarCreationStepper'
import Error from '@/components/Error'
import {mapState, mapActions} from 'vuex'
import SeminarService from '@/services/seminarService'
export default {
    components: {
        SeminarCreationStepper, Error
    },
    computed: {
        ...mapState(['user']),
        accessible(){
            return this.user.role && (this.user.role == 'Seminar Admin' || this.user.role == 'Admin')
        }
    },
    methods: {
        ...mapActions(['setMySeminars']),
        async create(requiredData, info, requiredBasicInfo){
            let rd = {}
            for (let index in requiredData){
                rd[requiredData[index].name] = requiredData[index].type
            }
            await SeminarService.create({
                info: info,
                requiredData: {
                    requiredData: rd,
                    baseInformation: requiredBasicInfo
                },
                author: this.user.username
            })
            this.setMySeminars(
                (await SeminarService.findAllByAuthor(this.user.username)).data
            )
            this.$router.push({name: 'myCreatedSeminar'})
        }
    },
}
</script>

<style>

</style>
