<template>
    <v-card :class="`ma-3 ${colorClass} lighten-1 elevation-5 text-xs-left`" >
        <v-card-title primary-title :class="`${colorClass} low-op overflow-hidden`">
            <h3>{{seminar.title}}</h3>
            <v-spacer></v-spacer>
            <small>(Created by {{seminar.User.fullname}})</small>
        </v-card-title>
        <v-card-actions>
            <slot/>
            <v-spacer></v-spacer>
            <v-btn round flat color="info" :to="{name: 'seminarInformation', params: {id: seminar.id}}">
                <v-icon>streetview</v-icon>
                Info
            </v-btn>
            <v-btn icon @click="show = !show">
                <v-icon>{{show? 'keyboard_arrow_up': 'keyboard_arrow_down'}}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
            <v-card-text :class="`${colorClass} lighten-1`" v-show="show">
                <p class="description ma-0 pa-0">
                    {{seminar.description}}
                </p>
            </v-card-text>
        </v-slide-y-transition>
    </v-card>
</template>

<script>
    import DateService from '@/services/dateService'
    export default {
        props: {
            seminar: {
                type: Object,
                required: true
            },
            status: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                show: false,
                today: ''
            }
        },
        mounted() {
            this.today = new Date().toISOString()
        },
        computed: {
            colorClass() {
                if (this.today > DateService.lastDate(this.seminar)){
                    return 'disabled white--text'
                }
                else {
                    return 'secondary'
                }
            }
        },
    }
</script>

<style scoped>
.description {
    word-wrap: break-word;
    white-space: pre-wrap;
}
</style>
