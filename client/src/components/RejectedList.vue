<template>
    <v-dialog width="600" fill-height scrollable v-model="dialog">
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
                    <v-list-tile v-for="user in showableRejectedList" :key="user.username">

                        <v-list-tile-content>
                            <v-list-tile-title>{{`${user.username}(${user.fullname} from ${user.company})`}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action @click="$emit('remove', user.username)">
                            <v-btn icon>
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    <!-- <v-list-tile>
                        <v-list-tile-content>
                            <v-text-field label="Username" v-model="username"></v-text-field>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon>
                                <v-icon @click="add">add</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile> -->
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import UserService from '@/services/userService'
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
                username: '',
                showableRejectedList: []
            }
        },
        methods: {
            add() {
                this.$emit('add', this.username)
                this.username = ''
            }
        },
        async mounted() {
            this.showableRejectedList = (await UserService.findAll({
                usernames: this.rejectedList,
                attributes: ['username','fullname', 'company']
            })).data
        },
        watch: {
            async rejectedList(){
                this.showableRejectedList = (await UserService.findAll({
                usernames: this.rejectedList,
                attributes: ['username','fullname', 'company']
            })).data
            }
        }
    }
</script>

<style>

</style>