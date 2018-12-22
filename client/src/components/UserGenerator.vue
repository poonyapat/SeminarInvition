<template>
    <!-- <v-card>
        <v-toolbar dark>
            <v-icon>
                people
            </v-icon>
            <v-toolbar-title>
                User Generator
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="$emit('close')" flat icon dark>
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-text-field label="Username" v-model="userData.username"></v-text-field>
            <v-text-field label="Password" type="password" v-model="userData.password"></v-text-field>
            <v-select
                v-model="userData.role"
                :items="roles"
                label="Role"
            ></v-select>
            <p class="error" v-if="error"> {{error}} </p>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-dialog v-model="confirmation" width="500">
                <v-btn slot="activator" dark>Generate</v-btn>
                <v-card>
                    <v-toolbar dark>
                        <v-toolbar-title>
                            Confirmation
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn @click="confirmation = false" flat icon dark>
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field label="Admin Password" type="password" v-model="adminPassword"></v-text-field>
                        <v-btn @click="generate" dark>Confirm</v-btn>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card> -->
    <v-card>
        <v-toolbar dark>
            <v-icon>
                people
            </v-icon>
            <v-toolbar-title>
                User Generator
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="$emit('close')" flat icon dark>
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-stepper v-model="stepper">
            <v-stepper-header class="hidden-xs-only">
                <v-stepper-step step="1">User Data</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2">Admin Credential</v-stepper-step>
            </v-stepper-header>
            <v-stepper-content step="1">
                <v-text-field :rules="[v => !!v.match(/[A-Za-z0-9]{8,32}/) || 'ONLY 8 to 32 characters with lower-case, upper-case or numerics']" label="Username" v-model="userData.username"></v-text-field>
                <v-text-field :rules="[v => v.length >= 8 ||'ONLY 8 to 32 characters']" label="Password" type="password" v-model="userData.password"></v-text-field>
                <v-select
                    v-model="userData.role"
                    :items="roles"
                    label="Role"
                ></v-select>
                <p class="error" v-if="error"> {{error}} </p>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="primary" round @click="stepper = 2" :disabled="!(userData.username.match(/[A-Za-z0-9]{8,32}/)) || userData.password.length < 8">
                        Next
                    </v-btn>
                </v-card-actions>
            </v-stepper-content>
            <v-stepper-content step="2">
                <v-text-field label="Admin Password" type="password" v-model="adminPassword"></v-text-field>
                <p class="error" v-if="cError"> {{cError}} </p>
                <v-card-actions>
                    <v-btn @click="stepper = 1" round dark>Back</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="generate" round dark>Generate</v-btn>
                </v-card-actions>
            </v-stepper-content>
        </v-stepper>
    </v-card>
</template>

<script>
import UserService from '@/services/userService'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            userData: {
                username: '',
                password: '',
                role: 'External User'
            },
            adminPassword: '',
            error: '',
            cError: '',
            roles: ['Admin','Seminar Admin', 'External User'],
            confirmation: false,
            stepper: 1
        }
    },
    methods: {
        async generate() {
            try {
                this.confirmation = false
                await UserService.generateUser({
                    username: this.user.username,
                    password: this.adminPassword
                }, this.userData)
                this.$emit('close')
                this.stepper = 1
                this.cError = this.error =  this.userData.username = this.userData.password = ''
            } catch(error){
                if (error.response.status == '403'){
                    this.cError = error.response.data.error
                    this.error = ''
                }
                else {
                    this.error = error.response.data.error
                    this.cError = ''
                    this.stepper = 1
                }
            }
        }
    },
    computed: {
        ...mapState(['user'])
    }
}
</script>

<style>

</style>
