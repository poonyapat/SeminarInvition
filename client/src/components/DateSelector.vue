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
                    v-model="dateFormatted"
                    :label="label"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    prepend-icon="event"
                    @blur="date = parseDate(dateFormatted)"
                    readonly
                    clearable
            ></v-text-field>
            <v-date-picker :min="min" :max="max" v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
    </v-flex>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: 'Date'
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
                date: null,
                dateFormatted: null,
                menu1: false,
            }
        },
        watch: {
            date() {
                this.dateFormatted = this.formatDate(this.date)
                this.$emit('selected', this.date)
            },
            value() {
                if (this.value){
                    this.date = this.value.slice(0,10)
                }
            }
        },

        methods: {
            formatDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate(date) {
                if (!date) return null
                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            }
        }
    }
</script>

<style>

</style>
