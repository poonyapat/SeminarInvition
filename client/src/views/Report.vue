<template>
    <v-container fluid style="position: fixed; background-color: white; top: 0%; z-index: 100;overflow-y: scroll;"
        fill-height>
        <v-layout justify-center id="content">
            <v-flex lg6 md8 sm10 xs12>
                <h1 class="text-xs-center"> {{seminar.title}} </h1>
                <br>
                <p>
                    <b>Date: </b> {{stringDates}}
                    <b>Time: </b> {{seminar.startTime}} - {{seminar.endTime}}
                </p>
                <p><b>Held by: </b> {{author.company}} </p>
                <p><b>Localtion: </b> {{seminar.place}} </p>
                <p style="text-indent: 50px;">{{seminar.description}}</p>
                <p><b>Number of Attendees: </b> {{normalAttendees.length}} people <b>Number of Reserves: </b>
                    {{reservedAttendees.length}} people</p>
                <p><b>Number of VIP seats: </b> {{seminar.maximumReserves}} seats</p>
                <br>
                <p><b>VIP Attendees: </b></p>
                <table style="width: 100%">
                    <tr>
                        <th style="width: 30%;">Name</th>
                        <th style="width: 25%;">Contact Phone Number</th>
                        <th style="width: 20%">Company</th>
                    </tr>
                    <tr v-for="attendee in vipAttendees" :key="attendee.user">
                        <td style="width: 30%;">{{attendee.registeredData.fullname}}</td>
                        <td style="width: 25%;">{{attendee.registeredData.contactNumber}}</td>
                        <td style="width: 20%;">{{attendee.registeredData.company}}</td>
                    </tr>
                    <tr v-if="!vipAttendees.length">
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table>
                <br>
                <p><b>Normal Attendees:</b></p>
                <table style="width: 100%">
                    <tr>
                        <th style="width: 30%;">Name</th>
                        <th style="width: 25%;">Contact Phone Number</th>
                        <th style="width: 20%">Company</th>
                        <th>Credit</th>
                        <th>Is Present?</th>
                    </tr>
                    <tr v-for="attendee in normalAttendees" :key="attendee.user">
                        <td style="width: 30%;">{{attendee.registeredData.fullname}}</td>
                        <td style="width: 25%;">{{attendee.registeredData.contactNumber}}</td>
                        <td style="width: 20%;">{{attendee.registeredData.company}}</td>
                        <td>{{attendee.registeredData.credit}}</td>
                        <td>{{isPresent(attendee)}}</td>
                    </tr>
                    <tr v-if="!normalAttendees.length">
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table>
                <br>
                <p><b>Reserved Attendees:</b></p>
                <table style="width: 100%">
                    <tr>
                        <th style="width: 30%;">Name</th>
                        <th style="width: 25%;">Contact Phone Number</th>
                        <th style="width: 20%">Company</th>
                        <th>Credit</th>
                        <th>Is Present?</th>
                    </tr>
                    <tr v-for="attendee in reservedAttendees" :key="attendee.user">
                        <td style="width: 30%;">{{attendee.registeredData.fullname}}</td>
                        <td style="width: 25%;">{{attendee.registeredData.contactNumber}}</td>
                        <td style="width: 20%;">{{attendee.registeredData.company}}</td>
                        <td>{{attendee.registeredData.credit}}</td>
                        <td>{{isPresent(attendee)}}</td>
                    </tr>
                    <tr v-if="!reservedAttendees.length">
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table>
                <br>
                <!-- <p><b>Rejected Attendees: </b></p>
                <table style="width: 100%">
                    <tr>
                        <th style="width: 30%;">Name</th>
                        <th style="width: 25%;">Contact Phone Number</th>
                        <th style="width: 20%">Company</th>
                        <th>Credit</th>
                    </tr>
                    <tr v-for="attendee in rejectedAttendees" :key="attendee.user">
                        <td style="width: 30%;">{{attendee.fullname}}</td>
                        <td style="width: 25%;">{{attendee.contactNumber}}</td>
                        <td style="width: 20%;">{{attendee.company}}</td>
                        <td>{{attendee.credit}}</td>
                    </tr>
                    <tr v-if="!rejectedAttendees.length">
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table>
                <br> -->
                <p><b>Total number of Attendees attended:</b> {{attendedAttendees}} people</p>
                <p><b>Total number of Attendees attended partially:</b> {{partialAttendedAttendees}} people</p>
                <p><b>Total number of Reserved Attendees attended:</b> {{attendedReserves}} people</p>
                <p><b>Total number of Reserved Attendees attended partially:</b> {{partialAttendedReserves}} people</p>
            </v-flex>
            <v-btn style="position: fixed; right: 2em; top: 0" dark round id="button" large @click="download">
                <v-icon>arrow_downward</v-icon>
                download
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    import SeminarService from '@/services/seminarService'
    import UserService from '@/services/userService'
    import AttendeeService from '@/services/attendeeService'
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'Report',
        data() {
            return {
                seminar: {},
                author: {},
                normalAttendees: [],
                reservedAttendees: [],
                rejectedAttendees: [],
                vipAttendees: []
            }
        },
        computed: {
            ...mapState(['route']),
            stringDates() {
                if (!this.seminar.dates) return ''
                return this.seminar.dates.map(date => new Date(date).toLocaleDateString()).toString()
            },
            attendedAttendees() {
                return this.normalAttendees.filter(attendee => attendee.present === this.seminar.dates.length).length
            },
            partialAttendedAttendees() {
                return this.normalAttendees.filter(attendee => attendee.present < this.seminar.dates.length && !!attendee.present).length
            },
            attendedReserves() {
                return this.reservedAttendees.filter(attendee => attendee.present === this.seminar.dates.length).length
            },
            partialAttendedReserves() {
                return this.reservedAttendees.filter(attendee => attendee.present < this.seminar.dates.length && !!attendee.present).length
            },
        },
        async mounted() {
            this.seminar = (await SeminarService.findOneById(this.route.params.seminar)).data
            this.author = (await UserService.findOneByUsername(this.seminar.author)).data
            const attendees = (await AttendeeService.findAllBySeminar(this.seminar.id)).data
            this.normalAttendees = []
            this.reservedAttendees = []
            for (let i = 0; i < attendees.length; i++) {
                if (attendees[i].isVIP){
                    this.vipAttendees.push(attendees[i])
                } else if (attendees[i].status === 'Alternative') {
                    this.reservedAttendees.push(attendees[i])
                } else {
                    this.normalAttendees.push(attendees[i])
                }
            }
            this.rejectedAttendees = (await UserService.findAll({
                usernames: this.seminar.rejectedList,
                attributes: ['fullname', 'contactNumber', 'company', 'credit']
            })).data
        },
        methods: {
            download() {
                document.getElementById('button').style.display = 'none'
                window.print();
                document.getElementById('button').style.display = ''
            },
            isPresent(attendee) {
                if (attendee.present == 1) {
                    return 'Some Days'
                }
                if (attendee.present == 2) {
                    return 'Yes'
                }
                return 'No'
            }
        },
    }
</script>

<style scoped>
    th,
    td {
        border-bottom: 1px solid #ddd;
        text-align: left
    }

    table {
        border-spacing: 0px;
    }
</style>