<template>
    <v-card class="ma-3 secondary lighten-2 elevation-5">
        <v-card-title primary-title>
        <h3>{{seminar.title}}</h3>
        </v-card-title>
        <v-card-actions class="secondary lighten-1">
            <v-btn flat color="green" v-if="registered">
                <v-icon>done</v-icon>
                Confirm
            </v-btn>
            <v-btn 
                flat 
                color="cancel" 
                v-if="registered" 
                @click="cancelRegistration(seminar.id)"
            >
                <v-icon>close</v-icon>
                Cancel
            </v-btn>
            <v-btn flat color="edit" v-if="editable">
                <v-icon>edit</v-icon>
                Edit
            </v-btn>
            <v-btn flat color="info" v-if="editable">
                <v-icon>people</v-icon>
                Attendees
            </v-btn>
            <v-spacer></v-spacer>
            <seminar-information-dialog :seminar="seminar">
                <v-btn flat color="info">
                    <v-icon>streetview</v-icon>
                    Info
                </v-btn>
            </seminar-information-dialog>
            <v-btn icon @click="show = !show">
                <v-icon>{{show? 'keyboard_arrow_up': 'keyboard_arrow_down'}}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
            <v-card-text class="secondary lighten-1" v-show="show">
                {{seminar.description}}
            </v-card-text>
        </v-slide-y-transition>
    </v-card>
</template>

<script>
import SeminarInformationDialog from '@/components/SeminarInformationDialog'
import attendeeService from '@/services/attendeeService'

export default {
    props: {
        seminar: {
            type: Object,
            required: true
        },
        registered: {
            type: Boolean,
            default: false
        },
        editable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        async cancelRegistration(seminar) {
            if (!this.registered){
                return
            }
            this.removeFromDatabase(seminar)
            this.$emit('cancel-registration', this.seminar)
        },

        async removeFromDatabase(seminar){
            await attendeeService.cancelRegistration({
                user: this.$store.state.user.username,
                seminar: seminar
            })
        }
    },
    components: {
        SeminarInformationDialog
    }
}
</script>

<style>

</style>
