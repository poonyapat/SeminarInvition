<template>
    <v-btn @click="activate" flat>
        <v-icon>person_add</v-icon>
        Register
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <v-card>
                <v-card-title class="deep-purple lighten-1 headline white--text">
                    <v-icon>person_add_</v-icon>
                    Register
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false" flat icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>
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
                    <v-text-field
                        type="password"
                        label="Confirmed Password"
                        v-model="confirmedPassword"
                    ></v-text-field>
                    <span v-html="error" class="red--text"/>
                </v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn class="deep-purple lighten-1" dark @click="register">Submit</v-btn>
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
            confirmedPassword: null,
            error: null,
            dialog: false
        }
    },
    methods: {
        activate() {
            this.dialog = true;
        },
        async register(){
            try {
                this.error = null
                if (this.confirmedPassword !== this.password){
                    this.error = 'confirmed password has to be equal to password'
                    return
                }
                await UserService.register({
                    username: this.username,
                    password: this.password,
                    role: 'External User'
                })
                this.dialog = false

            } catch (error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>

<style>

</style>
