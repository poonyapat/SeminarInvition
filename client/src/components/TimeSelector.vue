<template>
    <v-flex xs12 sm6>
        <v-menu
                ref="menu1"
                :close-on-content-click="false"
                v-model="menu1"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
        >
            <v-text-field
                    slot="activator"
                    v-model="time"
                    :label="label"
                    hint="HH:MM format"
                    persistent-hint
                    prepend-icon="event"
                    readonly
                    clearable
            ></v-text-field>
            <v-time-picker format="24hr" :min="min" :max="max" :allowedMinutes="m => m%5===0" v-model="time" @input="menu1 = false"></v-time-picker>
        </v-menu>
    </v-flex>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: 'time'
            },
            min: {
                type: String,
                default: ''
            },
            max: {
                type: String,
                default: ''
            },
            value: {
                type: String
            }
        },
        data() {
            return {
                time: null,
                timeFormatted: null,
                menu1: false,
            }
        },
        watch: {
            time() {
                this.$emit('input', this.time)
            },
            value() {
                if (this.value){
                    this.time = this.value
                }
            }
        },
    }
</script>

<style>

</style>
