<template>
    
    <v-container fluid grid-list-md>
        <v-layout row wrap justify-center>
            <v-flex xs12 class="text-xs-center pb-3">
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
                >
                    <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                            <td>{{ props.item.registeredData.fullname }}</td>
                            <td>{{ props.item.registeredData.email }}</td>
                            <td>{{ props.item.registeredData.contactNumber }}</td>
                            <td>{{ props.item.registeredData.company }}</td>
                            <td>{{ props.item.status }}</td>
                            <td>{{ props.item.registeredData.credit }}</td>
                            <td>
                                <v-tooltip bottom>
                                    <v-icon slot="activator" small @click="declineAttendee(props.item.user, props.item.seminar)">
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
    </v-container>
</template>

<script>
import AttendeeService from '@/services/attendeeService'
import SeminarService from '@/services/seminarService'
import AttendeeInformation from '@/components/AttendeeInformation'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            headers: [
                { text: 'Fullname', value: 'registeredData.fullname' },
                { text: 'Email', value: 'registeredData.email' },
                { text: 'Contact Number', value: 'registeredData.contactNumber' },
                { text: 'Company', value: 'registeredData.company' },
                { text: 'Status', value: 'status' },
                { text: 'Credit', value: 'registeredData.credit' },
                { text: 'Actions' }
            ],
            attendees: [],
            expanded: [],
            seminar: {},
            search: '',
            filter: {
                statuses: ['All', 'Confirmed', 'Attended'],
                status: 'All',
                minCred: 0
            }
        }
    },
    methods: {
        declineAttendee(username, seminarId) {
            console.log(username, seminarId)   
        }
    },
    computed: {
        ...mapState(['route']),
        showableAttendees(){
            return this.attendees.filter((attendee)=>{
                return (this.filter.status === 'All' || attendee.status === this.filter.status) && attendee.registeredData.credit >= this.filter.minCred
            })
        }
    },
    components: {
        AttendeeInformation
    },
    async mounted(){
        this.attendees = (await AttendeeService.findAllBySeminar(this.route.params.id)).data
        this.seminar = (await SeminarService.findOneById(this.route.params.id)).data
    }
}
</script>

<style scoped>
td {
    background-color: rgba(255, 0, 76, 0.2) !important
}
</style>
