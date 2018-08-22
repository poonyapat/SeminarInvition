<template>
    <dialog-button icon="person" caption="Login">
        <v-card-text>
            <v-text-field
                label="Username"
                v-model="username"
            ></v-text-field>
            <v-text-field
                label="Password"
                v-model="password"
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-layout justify-center>
                <v-btn class="deep-purple lighten-1" dark>Submit</v-btn>
            </v-layout>
        </v-card-actions>
    </dialog-button>
</template>

<script>
import DialogButton from '@/components/global/DialogButton'
import UserService from '@/services/userService'

export default {
    data() {
        return {
            username: null,
            password: null
        }
    },
    methods: {
        login(){
            UserService.authenticate({
                username: this.username,
                password: this.password
            })
        }
    },
    components: {
        DialogButton
    }
}
</script>

<style>

</style>
