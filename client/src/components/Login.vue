<template>
    <dialog-button icon="person" caption="Login">
        <v-card-text>
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
                <v-btn class="deep-purple lighten-1" dark @click="login">Submit</v-btn>
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
            password: null,
            errorMsg: null
        }
    },
    methods: {
        async login(){
            try {
                const response = await UserService.authenticate({
                    username: this.username,
                    password: this.password
                })
                this.$store.dispatch('persistedLogin', response.data.token, response.data.user)
            } catch(error){
                this.errorMsg = error.response.data.error
            }
        }
    },
    components: {
        DialogButton
    }
}
</script>

<style>

</style>
