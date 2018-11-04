<template>
    <v-app id="app" class="main">
        <page-header/>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
    import PageHeader from '@/components/PageHeader'
    import {mapState,mapActions} from 'vuex'
    import AttendeeService from '@/services/attendeeService'
    import SeminarService from '@/services/seminarService'
    export default {
        components: {
            PageHeader
        },
        methods: {
            ...mapActions([
                'setAttendees', 'setMySeminars'
            ])
        },
        computed: {
            ...mapState([
                'user'
            ])
        },
        async mounted(){
            if (this.user){
                this.setAttendees((await AttendeeService.findAllByUser(this.user.username)).data)
                this.setMySeminars((await SeminarService.findAllByAuthor(this.user.username)).data)
            }
        }
    }
</script>

<style src="./theme.css"/>