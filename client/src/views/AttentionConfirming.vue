<template>
    <div v-if="loaded && !error" style="text-align: center">
        <h1>Seminar : {{this.$route.params.seminar}}</h1>
        <h1>Username : {{this.$route.params.username}}</h1>
        <h1>Status : 
            <span style="color:green">Confirmed</span>
        </h1>
    </div>
    <div v-else-if="error" style="text-align: center">
        <h1>{{error}}</h1>
    </div>
    <v-progress-linear v-else :indeterminate="true"></v-progress-linear>
</template>

<script>
    import AttendeeService from '@/services/attendeeService'
    import TransactionService from '@/services/transactionService'
    export default {
        data() {
            return {
                loaded: false,
                error: false
            }
        },
        async mounted() {
            try {
                await AttendeeService.present(this.$route.params.username, this.$route.params.seminar)
                await TransactionService.create(this.$route.params.username, this.$route.params.seminar, 'present', `${this.$route.params.username} is present at ${new Date().toISOString()}`)
            } catch(error){
                this.error = `Error [${error.response.status}] : ${error.response.data.error}`
            }
            this.loaded = true
        },
    }
</script>

<style>

</style>