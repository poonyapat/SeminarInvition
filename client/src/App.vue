<template>
    <v-app class="secondary" id="app">
        <page-header/>
        <main class="mt-5 pt-5">
            <v-container fluid>
                <router-view/>
            </v-container>
        </main>
    </v-app>
</template>

<script>
    import PageHeader from '@/components/PageHeader'
    import {mapActions} from 'vuex'
    import AttendeeService from '@/services/attendeeService'
    export default {
        components: {
            PageHeader
        },
        methods: {
            ...mapActions([
                'setAttendees'
            ])
        },
        async beforeCreate(){
            console.log(this.user)
            this.setAttendees((await AttendeeService.findAllByUser(this.$store.state.user.username)).data)
            console.log(this.$store.state.attendees)
        }
    }
</script>

<style src="./theme.css"/>