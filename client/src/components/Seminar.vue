<template>
    <v-card class="ma-3 secondary lighten-2 elevation-5">
        <v-card-title primary-title>
            <h3>{{seminar.title}}</h3>
        </v-card-title>
        <v-card-actions class="secondary lighten-1">
            <slot/>
            <v-spacer></v-spacer>
            <seminar-information-dialog :seminar="seminar" :status="status" @cancel="$emit('cancel')"
                                        @confirm="$emit('confirm')">
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

    export default {
        props: {
            seminar: {
                type: Object,
                required: true
            },
            status: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                show: false
            }
        },
        components: {
            SeminarInformationDialog
        }
    }
</script>

<style>

</style>
