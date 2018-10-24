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
            ></v-text-field>
            <v-date-picker :min="min" v-model="date" no-title @input="menu1 = false"></v-date-picker>
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
                default: '2001-01-01'
            }
        },
        data() {
            return {
                date: null,
                dateFormatted: null,
                menu1: false,
            }
        },
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
            }
        },

        watch: {
            date() {
                this.dateFormatted = this.formatDate(this.date)
                this.$emit('selected', this.date)
            },
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
