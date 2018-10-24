<template>
    <v-stepper v-model="stepper" vertical>
        <v-stepper-step :complete="stepper > 1" step="1">
            Seminar Information
        </v-stepper-step>
        <v-stepper-content step="1">
            <v-text-field
                    clearable
                    label="Seminar Title"
                    v-model="info.title"
                    :rules="rules.notNull"
            ></v-text-field>
            <v-textarea
                    clearable
                    label="Seminar Description"
                    v-model="info.description"
                    :rules="rules.notNull"
            >
            </v-textarea>
            <v-text-field
                    label="Maximum Attendees"
                    v-model="info.maximumAttendees"
                    type="number"
                    :rules="rules.notNull"
            >
            </v-text-field>
            <v-btn round color="primary" @click="stepper = 2" :disabled="!completeStep1">
                <v-icon>navigate_next</v-icon>
                Continue
            </v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="stepper > 2" step="2">
            Location & Date Time
        </v-stepper-step>
        <v-stepper-content step="2">
            <v-textarea
                    clearable
                    label="Location"
                    v-model="info.place"
                    :rules="rules.notNull"
            >
            </v-textarea>
            <date-selector label="Start Date" @selected="setStartDate"></date-selector>
            <date-selector label="End Date" @selected="setEndDate"></date-selector>
            <v-btn round color="primary" @click="stepper = 3" :disabled="!completeStep2">
                <v-icon>navigate_next</v-icon>
                Continue
            </v-btn>
            <v-btn round color="cancel" @click="stepper = 1" dark>
                <v-icon>navigate_before</v-icon>
                Back
            </v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="stepper > 3" step="3">
            Attendee's Information Requirement
        </v-stepper-step>
        <v-stepper-content step="3">
            <v-checkbox
                    label="Required Basic Information"
                    v-model="requiredBasicInfo"
            ></v-checkbox>
            <v-layout v-for="(data, index) in requiredData" :key="index" class="tertiary">
                <v-flex xs12 lg5 class="ma-2">
                    <v-text-field label="Name" v-model="data.name"></v-text-field>
                </v-flex>
                <v-flex xs10 lg5 class="ma-2">
                    <v-select :items="types" label="Type" v-model="data.type"></v-select>
                </v-flex>
                <v-flex xs2 lg2>
                    <v-btn icon top>
                        <v-icon color="cancel" @click="removeData(index)">cancel</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12 lg6 class="ma-2">
                    <v-text-field label="Name" v-model="attrName"></v-text-field>
                </v-flex>

                <v-flex xs10 lg5 class="ma-2">
                    <v-select :items="types" label="Type" v-model="attrType"></v-select>
                </v-flex>
                <v-flex xs2 lg2>
                    <v-btn icon @click="addNewAttr" top>
                        <v-icon color="edit">add</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <br>
            <v-btn round color="primary" @click="stepper = 4" :disabled="!completeStep3">
                <v-icon>navigate_next</v-icon>
                Continue
            </v-btn>
            <v-btn round color="cancel" @click="stepper = 2" dark>
                <v-icon>navigate_before</v-icon>
                Back
            </v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="stepper > 4" step="4">
            Contact
        </v-stepper-step>
        <v-stepper-content step="4">
            <v-text-field
                    label="Company"
                    v-model="info.company"
                    type="text"
                    clearable
                    :rules="rules.notNull"
            ></v-text-field>
            <v-text-field
                    label="Contact Number"
                    v-model="info.contactNumber"
                    type="text"
                    clearable
                    mask="phone"
                    :rules="rules.notNull"
            >
            </v-text-field>
            <v-text-field
                    label="Contact Email"
                    v-model="info.contactEmail"
                    type="text"
                    clearable
                    :rules="rules.notNull"
            >
            </v-text-field>
            <v-btn round color="primary" @click="stepper = 5" :disabled="!completeStep4">
                <v-icon>navigate_next</v-icon>
                Continue
            </v-btn>
            <v-btn round color="cancel" @click="stepper = 3" dark>
                <v-icon>navigate_before</v-icon>
                Back
            </v-btn>
        </v-stepper-content>
        <v-stepper-step step="5">
            Confirmation
        </v-stepper-step>
        <v-stepper-content step="5">
            <v-card>
                <v-list class="tertiary">
                    <v-list-tile v-for="(attr, key) in seminarShowableData" :key="key" @click="() => {return}">
                        <v-list-tile-content>
                            <v-list-tile-title> {{key}}</v-list-tile-title>
                            <v-list-tile-sub-title> {{attr}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-group>
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>Attendee's Information Requirement</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-show="requiredBasicInfo" @click="() => {return}">
                            <v-list-tile-content>
                                <v-list-tile-title> {{'*Basic Information*'}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="(data, index) in requiredData" :key="index" @click="() => {return}">
                            <v-list-tile-content>
                                <v-list-tile-title> {{data.name}}</v-list-tile-title>
                                <v-list-tile-sub-title> {{data.type}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                </v-list>
            </v-card>
            <v-btn round color="primary" @click="create">
                <v-icon>done</v-icon>
                Done
            </v-btn>
            <v-btn round color="cancel" @click="stepper = 4" dark>
                <v-icon>navigate_before</v-icon>
                Back
            </v-btn>
        </v-stepper-content>
    </v-stepper>
</template>

<script>
    import DateSelector from '@/components/DateSelector'
    import SeminarService from '@/services/seminarService'
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                info: {
                    title: '',
                    description: '',
                    company: '',
                    place: '',
                    startTime: '',
                    endTime: '',
                    maximumAttendees: 0,
                    contactNumber: '',
                    contactEmail: '',
                },
                requiredData: [],
                stepper: 1,
                attrName: '',
                attrType: '',
                types: ['short-text', 'long-text', 'number', 'boolean'],
                requiredBasicInfo: false,
                rules: {
                    notNull: [v => v.length > 0 || 'Require Information'],
                }
            }
        },
        components: {
            DateSelector
        },
        methods: {
            setStartDate(val) {
                this.info.startTime = val
            },
            setEndDate(val) {
                this.info.endTime = val
            },
            addNewAttr() {
                this.requiredData.push({
                    name: this.attrName,
                    type: this.attrType
                })
                this.attrName = ''
                this.attrType = ''
            },
            removeData(index) {
                this.requiredData.splice(index, 1)
            },
            create(){
                let rd = {}
                for (let index in this.requiredData){
                    rd[this.requiredData[index].name] = this.requiredData[index].type
                }
                SeminarService.create({
                    info: this.info,
                    requiredData: {
                        requiredData: rd,
                        baseInformation: this.requiredBasicInfo
                    },
                    author: this.user.username
                })
                this.$router.push({name: 'home'})
            }
        },
        computed: {
            seminarShowableData() {
                return {
                    'Title': this.info.title,
                    'Description': this.info.description,
                    'Max Attendees': this.info.maximumAttendees,
                    'Location': this.info.place,
                    'Start Date': this.info.startTime,
                    'End Date': this.info.endTime,
                    'Contact Email': this.info.contactEmail,
                    'Contact Number': this.info.contactNumber,
                }
            },
            completeStep1(){
                return this.info.title.length > 0 && this.info.description.length > 0 && this.info.maximumAttendees > 0
            },
            completeStep2(){
                return this.info.place.length > 0 && this.info.startTime.length > 0 && this.info.endTime.length > 0
            },
            completeStep3(){
                return this.requiredData.length > 0 || this.requiredBasicInfo
            },
            completeStep4(){
                return this.info.contactNumber.length > 9 && this.info.contactEmail.match(/.+@.+\..+/)
            },
            ...mapState([
                'user'
            ])
        }
    }
</script>

<style>
    .r-border {
        border: 2px solid red;
        border-radius: 25px;
    }
</style>
