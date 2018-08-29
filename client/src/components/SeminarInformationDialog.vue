<template>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
        <slot slot="activator"></slot>
        <v-card class="layout-sub-1">
            <v-toolbar dark color="primary" fixed>
                <v-btn icon dark @click.native="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title> {{seminar.title}} </v-toolbar-title>
            </v-toolbar>
            <v-layout wrap class="mt-5" justify-center>
                <v-flex sm12 lg10>
                    <v-list class="content-2" three-line>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>Title</v-list-tile-title>
                                <v-list-tile-sub-title> {{seminar.title}} </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>Description</v-list-tile-title>
                                <v-list-tile-sub-title> {{seminar.description}} </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>Date</v-list-tile-title>
                                <v-list-tile-sub-title v-if="formatDate(seminar.startTime) !== formatDate(seminar.endTime)">
                                    Start Date : {{formatDate(seminar.startTime)}} <br>
                                    End Date : {{formatDate(seminar.endTime)}}
                                </v-list-tile-sub-title>
                                <v-list-tile-sub-title v-else>
                                    {{formatDate(seminar.startTime)}}
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>Place</v-list-tile-title>
                                <v-list-tile-sub-title> {{seminar.place}} </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>Contact</v-list-tile-title>
                                <v-list-tile-sub-title>
                                    Email : {{seminar.contactEmail}} <br>
                                    Phone : {{seminar.contactNumber}}
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    Current Attendees : {{seminar.currentRegistered}} / {{seminar.maximumAttendees}}
                                </v-list-tile-title>
                                
                                <v-list-tile-sub-title>
                                    <v-btn v-if="status === ''" class="primary">Register</v-btn>
                                    <v-btn v-if="status === 'Attended'" class="success" @click="$emit('confirm')">Confirm Registration</v-btn>
                                    <v-btn v-if="status !== ''" class="cancel" dark @click="$emit('cancel')">Cancel Registration</v-btn>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
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
        status: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        formatDate(date) {
            return date.replace('T', ' ').slice(0,10)
        },
    },
}
</script>

<style>

.v-list-tile {
    transition: all 0.5s ease-in-out;
}

.v-list__tile:hover {
    background-color: #3333332f;
    color: black;
}

.v-list__tile:hover .v-list__tile__title {
    font-weight: 1000;
}
</style>
