<template>
    <v-stepper v-model="stepper" vertical>
        <v-stepper-step :complete="stepper > 1" step="1">
            Seminar Information
        </v-stepper-step>
        <v-stepper-content step="1">
            <v-text-field
                clearable
                label="Seminar Title"
                v-model="seminarData.title"
            ></v-text-field>
            <v-textarea
                clearable
                label="Seminar Description"
                v-model="seminarData.description"
            >
            </v-textarea>
            <v-text-field
                label="Maximum Attendees"
                v-model="seminarData.maxAttendees"
                type="number"
            >
            </v-text-field>
            <v-btn color="primary" @click="stepper = 2">
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
                v-model="seminarData.location"
            >
            </v-textarea>
            <date-selector label="Start Date" @selected="setStartDate"></date-selector>
            <date-selector label="End Date" @selected="setEndDate"></date-selector>
            <v-btn color="primary" @click="stepper = 3">
                <v-icon>navigate_next</v-icon>
                Continue
            </v-btn>
            <v-btn color="cancel" @click="stepper = 1" dark>
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
            <v-btn color="primary" @click="stepper = 4">
                <v-icon>navigate_next</v-icon>
                Continue
            </v-btn>
            <v-btn color="cancel" @click="stepper = 2" dark>
                <v-icon>navigate_before</v-icon>
                Back
            </v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="stepper > 4" step="4">
            Contact
        </v-stepper-step>
        <v-stepper-content step="4">
            <v-text-field
                label="Contact Number"
                v-model="seminarData.contactNumber"
                type="text"
                clearable
            >
            </v-text-field>
            <v-text-field
                label="Contact Email"
                v-model="seminarData.contactEmail"
                type="text"
                clearable
            >
            </v-text-field>
            <v-btn color="primary" @click="stepper = 5">
                <v-icon>navigate_next</v-icon>
                Continue
            </v-btn>
            <v-btn color="cancel" @click="stepper = 3" dark>
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
                            <v-list-tile-title> {{key}} </v-list-tile-title>
                            <v-list-tile-sub-title> {{attr}} </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-group>
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>Attendee's Information Requirement </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-show="requiredBasicInfo" @click="() => {return}">
                            <v-list-tile-content>
                                <v-list-tile-title> {{'*Basic Information*'}} </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="(data, index) in requiredData" :key="index" @click="() => {return}">
                            <v-list-tile-content>
                                <v-list-tile-title> {{data.name}} </v-list-tile-title>
                                <v-list-tile-sub-title> {{data.type}} </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                </v-list>
            </v-card>
            <v-btn color="primary" @click="stepper = 1">
                <v-icon>done</v-icon>
                Done
            </v-btn>
            <v-btn color="cancel" @click="stepper = 4" dark>
                <v-icon>navigate_before</v-icon>
                Back
            </v-btn>
        </v-stepper-content>
    </v-stepper>
</template>

<script>
import DateSelector from '@/components/DateSelector'
export default {
    data() {
        return {
            seminarData: {
                title: '',
                description: '',
                maxAttendees: 0,
                location: '',
                startDate: '',
                endDate: '',
                contactEmail: '',
                contactNumber: '',
            },
            requiredData: [],
            stepper: 1,
            attrName: '',
            attrType: '',
            types: ['short-text', 'long-text', 'number'],
            requiredBasicInfo: false
        }
    },
    components: {
        DateSelector
    },
    methods: {
        setStartDate(val){
            this.seminarData.startDate = val
        },
        setEndDate(val){
            this.seminarData.endDate = val
        },
        addNewAttr(){
            this.requiredData.push({
                name: this.attrName,
                type: this.attrType
            })
            this.attrName = ''
            this.attrType = ''
        },
        removeData(index){
            this.requiredData.splice(index, 1)
        }
    },
    computed: {
        seminarShowableData(){
            return {
                'Title': this.seminarData.title,
                'Description': this.seminarData.description,
                'Max Attendees': this.seminarData.maxAttendees,
                'Location': this.seminarData.location,
                'Start Date': this.seminarData.startDate,
                'End Date': this.seminarData.endDate,
                'Contact Email': this.seminarData.contactEmail,
                'Contact Number': this.seminarData.contactNumber,
            }
        }
    }
}
</script>

<style>
.r-border {
    border: 2px solid red;
    border-radius: 25px;
}
</style>
