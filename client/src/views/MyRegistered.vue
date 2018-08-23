<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3 class="mb-3">
        <v-toolbar fla dense class="primary" dark>
            <v-toolbar-title> My Registered Seminars </v-toolbar-title>
        </v-toolbar>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-card-title primary-title>
                <h3>Header</h3>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat color="green">
                        <v-icon>done</v-icon>
                        Confirm
                    </v-btn>
                    <v-btn flat color="red">
                        <v-icon>close</v-icon>
                        Cancel
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat color="orange">
                        <v-icon>streetview</v-icon>
                        View
                    </v-btn>
                    <v-btn icon @click="show = !show">
                        <v-icon>{{show? 'keyboard_arrow_up': 'keyboard_arrow_down'}}</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-slide-y-transition>
                    <v-card-text v-show="show" >
                        I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                    </v-card-text>
                </v-slide-y-transition>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    },
}
</script>

<style scoped>
.v-card__text {
    max-height: 10em;
    overflow: scroll
}
</style>
