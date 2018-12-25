<template>
    <v-card :class="`ma-3 ${colorClass} lighten-1 elevation-5 text-xs-left`">
        <v-chip :style="`position: absolute; top:-15px; right:0; background-color: ${colorClass2};`">
            Registered {{`${seminar.currentRegistered}/${seminar.maximumAttendees-seminar.maximumReserves}`}}
        </v-chip>
        <v-card-title primary-title :class="`${colorClass} low-op overflow-hidden`">
            <h3>{{seminar.title}}</h3>
            <v-chip :style="`background-color: ${colorClass3};`">
                start: {{firstDate}}
            </v-chip>
            <v-spacer></v-spacer>
            <small>(Created by {{seminar.User.fullname}})</small>
        </v-card-title>
        <v-card-actions>
            <slot />
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
                if (this.today > DateService.lastDate(this.seminar)) {
                    return 'disabled white--text'
                } else {
                    return 'secondary'
                }
            },
            colorClass2() {
                if (this.today > DateService.lastDate(this.seminar)) {
                    return '#AAA'
                } else {
                    return '#FAA'
                }
            },
            colorClass3() {
                if (this.today > DateService.lastDate(this.seminar)) {
                    return '#999'
                } else {
                    return '#F88'
                }
            },
            firstDate() {
                return DateService.firstDate(this.seminar).substring(0, 10).replace('-', '/').replace('-', '/')
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