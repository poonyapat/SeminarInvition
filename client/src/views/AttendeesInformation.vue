<template>

    <v-container fluid grid-list-md>
        <v-layout v-if="seminar.author === user.username" row wrap justify-center>
            <v-flex xs12 class="text-xs-center pb-3 overflow-hidden">
                <h1> {{seminar.title}} </h1>
            </v-flex>
            <v-flex xs12 sm2 md2>
                <v-card flat class="pa-3 transparent">
                    <v-text-field v-model="search" append-icon="search" label="Search"></v-text-field>
                    <v-select v-model="filter.status" :items="filter.statuses" label="User Status"></v-select>
                    <v-slider label="Minimum Credit" v-model="filter.minCred" :max="5" thumb-label="always"></v-slider>
                    <rejected-list :rejected-list="seminar.rejectedList" @remove="removeFromRejectedList" @add="addToRejectedList"></rejected-list>
                    <v-btn :to="{name: 'report', params: {seminar: seminar.id}}" round dark>report</v-btn>
                </v-card>
            </v-flex>
            <v-flex xs12 sm10 md8>
                <h2>Normal Attendees</h2>
                <v-data-table :headers="headers" :items="showableAttendees" item-key="user" :search="search" class="elevation-4"
                    :loading="!loaded" id="transTable">
                    <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded" id="head" :style="color(props.item.present)">
                            <td>{{ props.item.registeredData.fullname }}</td>
                            <template v-if="!isXS">
                                <td>{{ props.item.registeredData.email }}</td>
                                <td>{{ props.item.registeredData.contactNumber }}</td>
                                <td>{{ props.item.registeredData.company }}</td>
                            </template>
                            <td>{{ props.item.status !== 'Alternative'? props.item.status: 'Reserved' }}</td>
                            <td>{{ props.item.registeredData.credit }}</td>
                            <td>
                                <v-layout>
                                    <v-dialog width="400" style="display: inline-block">
                                        <v-tooltip bottom v-if="!props.item.present && today < firstDate" slot="activator">
                                            <v-icon slot="activator" small>
                                                delete
                                            </v-icon>
                                            <span>Reject Attendee</span>
                                        </v-tooltip>
                                        <v-card>
                                            <v-toolbar dark>
                                                <v-toolbar-title>Confirm Rejection</v-toolbar-title>
                                            </v-toolbar>
                                            <v-card-text>
                                                Press confirm to reject "{{props.item.registeredData.fullname}}" from
                                                seminar
                                                <v-text-field label="Reason for rejection*" :rules="[v=> !!v || 'required reason']"
                                                    v-model="reason"></v-text-field>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn round dark @click="rejectAttendee(props.item.user, props.item.seminar)">confirm</v-btn>
                                                <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-dialog width="400" v-model="showConfirm">
                                        <v-tooltip bottom v-if="!props.item.present && today < firstDate" slot="activator">
                                            <v-icon slot="activator" small>
                                                how_to_reg
                                            </v-icon>
                                            <span>Promote to VIP</span>
                                        </v-tooltip>
                                        <v-card>
                                            <v-toolbar dark>
                                                <v-toolbar-title>Confirm Promoting to VIP</v-toolbar-title>
                                            </v-toolbar>
                                            <v-card-text>
                                                Press confirm to promote "{{props.item.registeredData.fullname}}" to
                                                VIP
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn round dark @click="showConfirm=false;grantVIP(props.item.user, props.item.seminar); loadData()">confirm</v-btn>
                                                <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-layout>
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
            <v-flex offset-sm1 offset-md2 xs12 sm10 md8>
                <h2>VIP attendees</h2>
                <v-data-table :headers="headers2" :items="showableVipAttendees" item-key="user" :search="search" class="elevation-4"
                    :loading="!loaded" id="transTable">
                    <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded" id="head">
                            <td>{{ props.item.registeredData.fullname }}</td>
                            <td>{{ props.item.registeredData.email }}</td>
                            <td>{{ props.item.registeredData.contactNumber }}</td>
                            <td>{{ props.item.registeredData.company }}</td>
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
        <error v-else-if="loaded" code="403" msg="Access Denied" />
    </v-container>
</template>

<script>
    import AttendeeService from '@/services/attendeeService'
    import TransactionService from '@/services/transactionService'
    import SeminarService from '@/services/seminarService'
    import AttendeeInformation from '@/components/AttendeeInformation'
    import RejectedList from '@/components/RejectedList'
    import Error from '@/components/Error'
    import {
        mapState
    } from 'vuex'
    import DateService from '@/services/dateService'
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
                today: '',
                loaded: false,
                reason: '',
                showConfirm: false
            }
        },
        methods: {
            async rejectAttendee(username, seminarId) {
                await AttendeeService.rejectAttendee(username, seminarId);
                await TransactionService.create(username, seminarId, 'reject', this.reason)
                for (let i in this.attendees) {
                    if (this.attendees[i].user === username)
                        this.attendees.pop(i)
                }
                this.seminar.rejectedList.push(username)
                this.reason = ""
            },
            async grantVIP(username, seminarId) {
                if (this.seminar.maximumReserves <= this.showableVipAttendees.length){
                    alert("unable to promote this attendee, VIP seats are full")
                    return
                }
                await AttendeeService.grantVIP(username, seminarId)
            this.loadData()
            },
            async removeFromRejectedList(username) {
                for (let i in this.seminar.rejectedList) {
                    if (this.seminar.rejectedList[i] === username) this.seminar.rejectedList.splice(i, 1)
                }
                await SeminarService.update({
                    id: this.seminar.id,
                    info: {
                        rejectedList: this.seminar.rejectedList
                    }
                })
            },
            async addToRejectedList(username) {
                this.seminar.rejectedList.push(username)
                await SeminarService.update({
                    id: this.seminar.id,
                    info: {
                        rejectedList: this.seminar.rejectedList
                    }
                })
            },
            color(present) {
                if (present >= this.seminar.dates.length) {
                    return 'background-color: #66CC55'
                } else if (present > 0) {
                    return 'background-color: #FF0'
                } else if (this.today > this.lastDate) {
                    return 'background-color: #880000; color: white'
                } else {
                    return 'background-color: white'
                }
            },
            async loadData(){
                this.loaded = false
                this.attendees = (await AttendeeService.findAllBySeminar(this.route.params.id)).data
                this.seminar = (await SeminarService.findOneById(this.route.params.id)).data
                this.today = new Date().toISOString()
                this.loaded = true
            }
        },
        computed: {
            ...mapState(['route', 'user']),
            showableAttendees() {
                return this.attendees.filter((attendee) => {
                    return (this.filter.status === 'All' || attendee.status === this.filter.status) && attendee
                        .registeredData.credit >= this.filter.minCred && !attendee.isVIP
                })
            },
            showableVipAttendees() {
                return this.attendees.filter((attendee) => {
                    return (this.filter.status === 'All' || attendee.status === this.filter.status) && attendee
                        .registeredData.credit >= this.filter.minCred && attendee.isVIP
                })
            },
            isXS() {
                if (window.screen.width < 576)
                    return true;
            },
            headers() {
                if (this.isXS) {
                    return [{
                            text: 'Fullname',
                            value: 'registeredData.fullname'
                        },
                        {
                            text: 'Status',
                            value: 'status'
                        },
                        {
                            text: 'Credit',
                            value: 'registeredData.credit'
                        },
                    ]
                }
                return [{
                        text: 'Fullname',
                        value: 'registeredData.fullname'
                    },
                    {
                        text: 'Email',
                        value: 'registeredData.email'
                    },
                    {
                        text: 'Contact Phone Number',
                        value: 'registeredData.contactNumber'
                    },
                    {
                        text: 'Company',
                        value: 'registeredData.company'
                    },
                    {
                        text: 'Status',
                        value: 'status'
                    },
                    {
                        text: 'Credit',
                        value: 'registeredData.credit'
                    },
                    {
                        text: 'Actions',
                        sortable: false
                    }
                ]
            },
            headers2() {
                return [{
                        text: 'Fullname',
                        value: 'registeredData.fullname'
                    },
                    {
                        text: 'Email',
                        value: 'registeredData.email'
                    },
                    {
                        text: 'Contact Phone Number',
                        value: 'registeredData.contactNumber'
                    },
                    {
                        text: 'Company',
                        value: 'registeredData.company'
                    },
                ]
            },
            lastDate() {
                return DateService.lastDate(this.seminar)
            },
            firstDate() {
                return DateService.firstDate(this.seminar)
            }
        },
        components: {
            AttendeeInformation,
            Error,
            RejectedList
        },
        mounted() {
            this.loadData()
        }
    }
</script>

<style>
    /* td, #head, table, tbody, thead, .v-datatable.v-table, .v-datatable__actions {
    background-color: rgba(255, 0, 76, 0.2) !important,
    background-color: rgba(255, 255, 255, 0.2) !important
}
.transparent, .v-card.v-card--flat, .v-list {
    background: transparent !important
} */
</style>