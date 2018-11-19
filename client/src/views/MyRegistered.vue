<template>
    <v-container fluid>
        <v-layout row wrap v-if="this.token">
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
                <v-toolbar fla dense class="primary" dark>
                    <v-toolbar-title> My Registered Seminars </v-toolbar-title>
                </v-toolbar>
                <seminar v-for="(seminar,index) in registeredSeminars" :key="seminar.id" :seminar="seminar" :status="attendees[index].status"
                    @confirm="confirm(seminar.id)" @cancel="cancel(seminar.id)">
                    <v-btn color="success" flat round :disabled="attendees[index].status === 'Confirmed'" @click="confirm(seminar.id)"
                        :icon="isXS">
                        <v-icon>done</v-icon>

                        <span class="hidden-xs-only">
                            Confirm
                        </span>
                    </v-btn>
                    <confirm-dialog title="Cancel Registration" text="Are you sure that you are going to cancel this seminar registration"
                        @confirm="cancel(seminar.id)">
                        <v-btn flat round color="cancel" :icon="isXS">
                            <v-icon>close</v-icon>
                            <span class="hidden-xs-only">
                                Cancel
                            </span>
                        </v-btn>
                    </confirm-dialog>
                    <v-dialog width='120'>
                        <v-btn slot="activator" flat round :icon="isXS">
                            <span v-html="icon('qrcode')"></span>
                            <span class="hidden-xs-only">
                                QR code
                            </span>
                        </v-btn>
                        <v-card>
                            <div v-html="qrcode(seminar.id)"></div>
                            <v-card-actions>
                                <a download="custom-filename.jpg" style="text-decoration: none" :href="qrcodeSrc(seminar.id)">
                                    <v-btn icon><v-icon>vertical_align_bottom</v-icon></v-btn>
                                </a>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </seminar>
                <v-card v-if="registeredSeminars.length === 0" class="low-op">
                    <v-card-title>
                        <h1 v-if="loaded">0 Registered Seminar Found...</h1>
                        <v-progress-linear v-else :indeterminate="true" color="primary"></v-progress-linear>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <error v-else code="403" msg="Access Denied" />
    </v-container>
</template>

<script>
    import Seminar from '@/components/Seminar'
    import SeminarService from '@/services/seminarService'
    import AttendeeService from '@/services/attendeeService'
    import Error from '@/components/Error'
    import qrcode from 'qrcode-generator'
    import Icon from '@/services/icon'
    import ConfirmDialog from '@/components/ConfirmDialog'

    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                registeredSeminars: [],
                loaded: true
            }
        },
        computed: {
            ...mapState([
                'attendees', 'token', 'user'
            ]),
            isXS() {
                if (window.screen.width < 576)
                    return true;
                return false;
            },
        },
        components: {
            Seminar,
            Error,
            ConfirmDialog
        },
        methods: {
            qrcode(seminar) {
                var qr = qrcode(0, 'Q')
                qr.addData('http://localhost:8080/seminar/' + seminar + '/confirm/' + this.user.username)
                qr.make()
                return qr.createImgTag().replace('width="90" height="90"', 'width="120" height="120"')
            },
            qrcodeSrc(seminar){
                var qr = qrcode(0, 'Q')
                qr.addData('http://localhost:8080/seminar/' + seminar + '/confirm/' + this.user.username)
                qr.make()
                return qr.createDataURL()
            },
            cancel(seminarId) {
                //remove from db
                AttendeeService.cancelRegistration(this.user.username, seminarId)
                for (let i = 0; i < this.registeredSeminars.length; i++) {
                    if (this.registeredSeminars[i].id === seminarId) {
                        this.registeredSeminars.splice(i, 1)
                        this.cancelRegistration(i)
                    }
                }
            },
            confirm(seminarId) {
                // change status in db
                const confirm = "Confirmed"
                AttendeeService.updateStatus(this.user.username, seminarId, confirm)
                for (let i = 0; i < this.attendees.length; i++) {
                    if (this.attendees[i].seminar === seminarId) {
                        this.updateAttendeeStatus({
                            index: i,
                            status: confirm
                        })
                    }
                }
            },
            icon(name) {
                return Icon.iconTag(name)
            },
            ...mapActions([
                'setAttendees', 'updateAttendeeStatus', 'cancelRegistration'
            ]),
        },
        async mounted() {
            this.loaded = false
            this.registeredSeminars = []
            for (let i = 0; i < this.attendees.length; i++) {
                this.registeredSeminars.push((await SeminarService.findOneById(this.attendees[i].seminar)).data)
            }
            this.loaded = true
        },
        watch: {
            attendees: {
                imidiate: true,
                async handler(attendees) {
                    this.loaded = false
                    this.registeredSeminars = []
                    for (let i = 0; i < attendees.length; i++) {
                        this.registeredSeminars.push((await SeminarService.findOneById(attendees[i].seminar)).data)
                    }
                    this.loaded = true
                }
            }
        }

    }
</script>

<style scoped>
    .v-card__text {
        max-height: 10em;
        overflow: scroll;
    }
    /* .icon {
  background-image: url('../assets/qrcode_scan.png');
  height: 16px;
  width: 16px;
  display: block;
} */
</style>