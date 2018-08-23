<template>
    <v-btn @click="activate" flat>
        <v-icon>person</v-icon>
        Login
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <v-card>
                <v-card-title class="primary headline white--text">
                    <v-icon>person_</v-icon>
                    Login
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false" flat icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text >
                    <v-text-field
                        label="Username"
                        v-model="username"
                    ></v-text-field>
                    <v-text-field
                        type="password"
                        label="Password"
                        v-model="password"
                    ></v-text-field>
                </v-card-text>
                <span class="red--text"> {{errorMsg}} </span>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn class="primary" dark @click="login">Submit</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>    
    </v-btn>
</template>

<script>
import UserService from '@/services/userService'

export default {
    data() {
        return {
            username: null,
            password: null,
            errorMsg: null,
            dialog: false
        }
    },
    methods: {
        activate() {
            this.dialog = true;
        },
        async login(){
            try {
                this.error = null
                const response = await UserService.authenticate({
                    username: this.username,
                    password: this.password
                })
                this.$store.dispatch('persistedLogin', response.data)
                this.username = null
                this.password = null
                this.dialog = false
            } catch(error){
                this.errorMsg = error.response.data.error
            }
        }
    }
}
</script>

<style>

</style>
