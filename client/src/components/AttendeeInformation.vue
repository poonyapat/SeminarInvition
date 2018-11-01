<template>
    <v-card flat>
        <v-card-text>
            <v-list dense>
                <v-list-tile v-for="(value,attr) in attendee.registeredData" :key="attr">
                    <v-list-tile-content>{{attr}}:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ value}}</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        attendee: {
            type: Object,
            required: true
        },
    },
}
</script>

<style>

</style>
