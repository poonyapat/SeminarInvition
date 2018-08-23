<template>
    <v-card class="ma-2 secondary lighten-2">
        <v-card-title primary-title>
        <h3>{{seminar.title}}</h3>
        </v-card-title>
        <v-card-actions class="secondary lighten-1">
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
                {{seminar.description}}
            </v-card-text>
        </v-slide-y-transition>
    </v-card>
</template>

<script>
export default {
    props: {
        seminar: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            show: false
        }
    },
}
</script>

<style>

</style>
