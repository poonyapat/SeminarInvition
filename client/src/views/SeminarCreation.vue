<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
            <v-toolbar fla dense class="primary" dark>
                <v-toolbar-title> Create Seminar </v-toolbar-title>
            </v-toolbar>
            <seminar-creation-stepper class="mt-3"/>
        </v-flex>
    </v-layout>
</template>

<script>
import SeminarCreationStepper from '@/components/SeminarCreationStepper'

export default {
    components: {
        SeminarCreationStepper
    }
}
</script>

<style>

</style>
