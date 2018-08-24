<template>
    <v-card class="ma-3 secondary lighten-2 elevation-5">
        <v-card-title primary-title>
        <h3>{{seminar.title}}</h3>
        </v-card-title>
        <v-card-actions class="secondary lighten-1">
            <template v-if="registered">
                <v-btn flat color="green">
                    <v-icon>done</v-icon>
                    Confirm
                </v-btn>
                <v-btn flat color="red">
                    <v-icon>close</v-icon>
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
            </template>
            <v-btn flat color="orange">
                <v-icon>streetview</v-icon>
                View
            </v-btn>
            <v-spacer v-if="!registered"></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{show? 'keyboard_arrow_up': 'keyboard_arrow_down'}}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
            <v-card-text class="secondary lighten-1" v-show="show">
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
        registered: {
            type: Boolean,
            default: false
        }
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
