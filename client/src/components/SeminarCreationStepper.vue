<template>
    <v-stepper v-model="stepper" vertical>
        <v-stepper-step :complete="stepper > 1" step="1">
            Seminar Information
        </v-stepper-step>
        <v-stepper-content step="1">
            <v-card class="secondary mb5" height="200">

            </v-card>
            <v-btn color="primary" @click="stepper = 2">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="stepper > 2" step="2">
            Place & Date Time
        </v-stepper-step>
        <v-stepper-content step="2">
            <v-card class="secondary mb5" height="200">

            </v-card>
            <v-btn color="primary" @click="stepper = 3">Continue</v-btn>
            <v-btn color="cancel" @click="stepper = 1" dark>Back</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="stepper > 3" step="3">
            Attendee's Information Requirement
        </v-stepper-step>
        <v-stepper-content step="3">
            <v-card class="secondary mb5" height="200">

            </v-card>
            <v-btn color="primary" @click="stepper = 4">Continue</v-btn>
            <v-btn color="cancel" @click="stepper = 2" dark>Back</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="stepper > 4" step="4">
            Contact
        </v-stepper-step>
        <v-stepper-content step="4">
            <v-card class="secondary mb5" height="200">

            </v-card>
            <v-btn color="primary" @click="stepper = 1">Done</v-btn>
            <v-btn color="cancel" @click="stepper = 3" dark>Back</v-btn>
        </v-stepper-content>
    </v-stepper>
</template>

<script>
export default {
data() {
    return {
        stepper: 1
    }
},
}
</script>

<style>

</style>
