<template>
    
    <v-container fluid grid-list-md>
        <v-layout v-if="seminar.author === user.username" row wrap justify-center>
            <v-flex xs12 class="text-xs-center pb-3 overflow-hidden">
                <h1> {{seminar.title}} </h1>
            </v-flex>
            <v-flex xs12 sm2 md2>
                <v-card flat class="pa-3 transparent">
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                    ></v-text-field>
                    <v-select
                        v-model="filter.status"
                        :items="filter.statuses"
                        label="User Status"
                    ></v-select>
                    <v-slider
                        label="Minimum Credit"
                        v-model="filter.minCred"
                        :max="5"
                        thumb-label="always"
                    ></v-slider>
                </v-card>
            </v-flex>
            <v-flex xs12 sm10 md8>
                <v-data-table
                    :headers="headers"
                    :items="showableAttendees"
                    item-key="user"
                    :search="search"
                    class="elevation-4"
                    :loading="!loaded"
                    id="transTable"
                >
                    <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded" id="head">
                            <td>{{ props.item.registeredData.fullname }}</td>
                            <template v-if="!isXS">
                                <td>{{ props.item.registeredData.email }}</td>
                                <td>{{ props.item.registeredData.contactNumber }}</td>
                                <td>{{ props.item.registeredData.company }}</td>
                            </template>
                            <td>{{ props.item.status }}</td>
                            <td>{{ props.item.registeredData.credit }}</td>
                            <td>
                                <v-tooltip bottom>
                                    <v-icon slot="activator" small @click="props.expanded=true;declineAttendee(props.item.user, props.item.seminar)">
                                        delete
                                    </v-icon>
                                    <span>Decline Attendee</span>
                                </v-tooltip>
                            </td>
                        </tr>
                    </template>
                    <template slot="expand" slot-scope="props">
                        <!-- {{props.item}} -->
                        <v-layout justify-center rows>
                            <v-flex sm6 xs12>
                                <attendee-information :attendee="props.item"></attendee-information>
                            </v-flex>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
        <error v-else-if="loaded" code="403" msg="Access Denied"/>
    </v-container>
</template>

<script>
import AttendeeService from '@/services/attendeeService'
import SeminarService from '@/services/seminarService'
import AttendeeInformation from '@/components/AttendeeInformation'
import Error from '@/components/Error'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            attendees: [],
            expanded: [],
            seminar: {},
            search: '',
            filter: {
                statuses: ['All', 'Confirmed', 'Attended'],
                status: 'All',
                minCred: 0
            },
            loaded: false
        }
    },
    methods: {
        async declineAttendee(username, seminarId) {
            await AttendeeService.cancelRegistration(username, seminarId);
            for (let i in this.attendees){
                if (this.attendees[i].user === username)
                    this.attendees.pop(i)
            }
        },
    },
    computed: {
        ...mapState(['route', 'user']),
        showableAttendees(){
            return this.attendees.filter((attendee)=>{
                return (this.filter.status === 'All' || attendee.status === this.filter.status) && attendee.registeredData.credit >= this.filter.minCred
            })
        },
        isXS(){
            if (window.screen.width < 576)
                return true;
        },
        headers(){
            if (this.isXS){
                return [
                    { text: 'Fullname', value: 'registeredData.fullname' },
                    { text: 'Status', value: 'status' },
                    { text: 'Credit', value: 'registeredData.credit' },
                ]
            }
            return [
                { text: 'Fullname', value: 'registeredData.fullname' },
                { text: 'Email', value: 'registeredData.email' },
                { text: 'Contact Number', value: 'registeredData.contactNumber' },
                { text: 'Company', value: 'registeredData.company' },
                { text: 'Status', value: 'status' },
                { text: 'Credit', value: 'registeredData.credit' },
                { text: 'Actions', sortable: false }
            ]
        }
    },
    components: {
        AttendeeInformation, Error
    },
    async mounted(){
        this.loaded = false
        this.attendees = (await AttendeeService.findAllBySeminar(this.route.params.id)).data.filter((attendee)=> {
            return attendee.status !== 'Declined'
        })
        this.seminar = (await SeminarService.findOneById(this.route.params.id)).data
        this.loaded = true
    }
}
</script>

<style>
td, #head, table, tbody, thead, .v-datatable.v-table, .v-datatable__actions {
    /* background-color: rgba(255, 0, 76, 0.2) !important */
    background-color: rgba(255, 255, 255, 0.2) !important
}
.transparent, .v-card.v-card--flat, .v-list {
    background: transparent !important
}
</style>
