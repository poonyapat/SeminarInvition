<template>
    <v-container fluid>
        <v-layout row wrap v-if="this.token">
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
                <v-toolbar fla dense class="primary" dark>
                    <v-toolbar-title> My Registered Seminars </v-toolbar-title>
                </v-toolbar>
                <template v-for="(seminar,index) in registeredSeminars">
                    <h1 style="z-index:20;top:75px; position:absolute" :key="index" v-if="attendee(seminar.id).isVIP">VIP</h1>
                    <seminar :key="seminar.id" :seminar="seminar" :status="attendee(seminar.id).status" @confirm="confirm(seminar.id)"
                        @cancel="cancel(seminar.id)">
                        <v-btn color="success" flat round :disabled="attendee(seminar.id).status === 'Confirmed' || attendee(seminar.id).status === 'Alternative' || !actionable(seminar)"
                            @click="confirm(seminar.id)" :icon="isXS">
                            <v-icon>done</v-icon>
                            <span class="hidden-xs-only">
                                Confirm
                            </span>
                        </v-btn>
                        <confirm-dialog :disabled="!actionable(seminar)" title="Cancel Registration" text="Are you sure that you are going to cancel this seminar registration"
                            @confirm="cancel(seminar.id)">
                            <v-btn flat round color="cancel" :disabled="!actionable(seminar)" :icon="isXS">
                                <v-icon>close</v-icon>
                                <span class="hidden-xs-only">
                                    Cancel
                                </span>
                            </v-btn>
                        </confirm-dialog>
                        <v-dialog width='250' v-if="!hideQRCode(seminar)">
                            <v-btn slot="activator" flat round :icon="isXS">
                                <span v-html="icon('qrcode')"></span>
                                <span class="hidden-xs-only">
                                    QR code
                                </span>
                            </v-btn>
                            <v-card>
                                <div v-html="qrcode(seminar.id)"></div>
                                <v-card-actions>
                                    <div>{{seminar.title}} [{{firstDate(seminar)}}]</div>
                                    <a :download="`${seminar.title} [${firstDate(seminar)}].jpg`" style="text-decoration: none"
                                        :href="qrcodeSrc(seminar.id)">
                                        <v-btn icon>
                                            <v-icon>vertical_align_bottom</v-icon>
                                        </v-btn>
                                    </a>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </seminar>
                </template>
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
    import TransactionService from '@/services/transactionService'
    import Error from '@/components/Error'
    import qrcode from 'qrcode-generator'
    import Icon from '@/services/icon'
    import ConfirmDialog from '@/components/ConfirmDialog'
    import DateService from '@/services/dateService'
    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                registeredSeminars: [],
                loaded: true,
                today: ''
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
            attendee(seminarId){
                for (let i in this.attendees){
                    if (this.attendees[i].seminar === seminarId){
                        return this.attendees[i]
                    }
                }
            },
            qrcode(seminar) {
                var qr = qrcode(0, 'Q')
                qr.addData(`${window.location.origin}/seminar/${seminar}/confirm/${this.user.username}`)
                qr.make()
                return qr.createImgTag().replace('width="90" height="90"', 'width="200" height="200"')
            },
            qrcodeSrc(seminar) {
                var qr = qrcode(0, 'Q')
                qr.addData(`${window.location.origin}/seminar/${seminar}/confirm/${this.user.username}`)
                qr.make()
                return qr.createDataURL()
            },
            async cancel(seminarId) {
                //remove from db
                await AttendeeService.cancelRegistration(this.user.username, seminarId)
                await TransactionService.create(this.user.username, seminarId, 'cancel', '')
                for (let i = 0; i < this.registeredSeminars.length; i++) {
                    if (this.registeredSeminars[i].id === seminarId) {
                        this.registeredSeminars.splice(i, 1)
                        this.cancelRegistration(i)
                    }
                }
            },
            async confirm(seminarId) {
                // change status in db
                const confirm = "Confirmed"
                await AttendeeService.updateStatus(this.user.username, seminarId, confirm)
                for (let i = 0; i < this.attendees.length; i++) {
                    if (this.attendees[i].seminar === seminarId) {
                        this.updateAttendeeStatus({
                            index: i,
                            status: confirm
                        })
                    }
                }
            },
            actionable(seminar) {
                let firstDate = new Date(DateService.firstDate(seminar))
                firstDate.setDate(firstDate.getDate() - 3)
                return this.today < firstDate.toISOString()
            },
            hideQRCode(seminar) {
                let lastDate = new Date(DateService.lastDate(seminar))
                return this.today > lastDate.toISOString()
            },
            icon(name) {
                return Icon.iconTag(name)
            },
            ...mapActions([
                'setAttendees', 'updateAttendeeStatus', 'cancelRegistration'
            ]),
            firstDate(seminar) {
                return DateService.firstDate(seminar).substring(0, 10)
            }
        },
        async mounted() {
            this.loaded = false
            if (this.attendees.length > 0) {
                this.registeredSeminars = (await SeminarService.findAllByIds(this.attendees.map(attendee =>
                    attendee.seminar))).data
            }
            this.today = new Date().toISOString()
            this.loaded = true
        },
        watch: {
            attendees: {
                imidiate: true,
                async handler(attendees) {
                    this.loaded = false
                    if (this.attendees.length > 0) {
                        this.registeredSeminars = (await SeminarService.findAllByIds(this.attendees.map(attendee =>
                            attendee.seminar))).data
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