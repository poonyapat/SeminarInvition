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
        async mounted(){
            if (this.$store.state.user)
                this.setAttendees((await AttendeeService.findAllByUser(this.$store.state.user.username)).data)
        }
    }
</script>

<style src="./theme.css"/>