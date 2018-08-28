<template>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
        <slot slot="activator"></slot>
        <v-card>
            <v-toolbar dark color="primary" fixed>
                <v-btn icon dark @click.native="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title> {{seminar.title}} </v-toolbar-title>
            </v-toolbar>
            <v-layout wrap class="mt-5">
                <v-flex md12 xs12 class="layout-main-1">
                    <v-card class="layout-sub-1 ma-2 elevation-10">
                        <v-card-title>
                            <h3 class="header-1">
                                Description
                            </h3>
                        </v-card-title>
                        <v-card-text>
                            {{seminar.description}}
                        </v-card-text>
                    </v-card>
                    <v-card class="layout-sub-1 ma-2 elevation-10">
                        <v-card-title>
                            <h3 class="header-1">
                                Place
                            </h3>
                        </v-card-title>
                        <v-card-text>
                            {{seminar.place}}
                        </v-card-text>
                    </v-card>
                    <v-card class="layout-sub-1 ma-2 elevation-10">
                        <v-card-title>
                            <h3 class="header-1">
                                Date & Time
                            </h3>
                        </v-card-title>
                        <v-card-text v-if="formatDate(seminar.startTime) !== formatDate(seminar.endTime)">
                            <p> Start Date : {{formatDate(seminar.startTime)}} </p>
                            <p> End Date : {{formatDate(seminar.endTime)}} </p>
                        </v-card-text>
                        <v-card-text v-else>
                            <p>Date : {{formatDate(seminar.startTime)}}</p>
                        </v-card-text>
                    </v-card>
                    <v-card class="ma-2 layout-sub-1 elevation-10">
                        <v-card-title>
                            <h3 class="header-1">Contact</h3>
                        </v-card-title>
                        <v-card-text>
                            <p>Phone : {{seminar.contactNumber}}</p>
                            <p>Email : {{seminar.contactEmail}}</p>
                        </v-card-text>
                    </v-card>
                    <v-card class="ma-2 layout-sub-1 elevation-10">
                        <v-card-title>
                            <h3 class="header-1">
                                Current Attendees : {{seminar.currentRegistered}} / {{seminar.maximumAttendees}}
                            </h3>
                        </v-card-title>
                        <v-card-text>
                            <v-btn class="primary">Register</v-btn>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        seminar: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        formatDate(date) {
            return date.replace('T', ' ').slice(0,10)
        }
    },
}
</script>

<style>

</style>
