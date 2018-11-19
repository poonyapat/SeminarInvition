<template>
    <v-dialog width="500" fill-height scrollable v-model="dialog">
        <v-btn round slot="activator">
            <v-icon>person_add_disabled</v-icon>
            Rejected List
        </v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">Rejected Attendees</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-list>
                    <v-list-tile v-for="username in rejectedList" :key="username">
                        
                        <v-list-tile-content>
                            <v-list-tile-title>{{username}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action @click="$emit('remove', username)">
                            <v-btn icon>
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-text-field label="Username" v-model="username"></v-text-field>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon>
                                <v-icon @click="add">add</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        rejectedList: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            dialog: false,
            username: ''
        }
    },
    methods: {
        add() {
            this.$emit('add',this.username)
            this.username = ''
        }
    },
}
</script>

<style>

</style>
