<template>

    <v-dialog
            v-model="dialog"
            width="500"
    >
        <slot slot="activator"/>
        <v-card>
            <v-card-title class="primary headline white--text">
                <v-icon dark>person_add_</v-icon>
                Register
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false" flat icon dark>
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
                    <v-btn class="primary" dark @click="register">Submit</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
            async register() {
                try {
                    this.error = null
                    if (this.confirmedPassword !== this.password) {
                        this.error = 'confirmed password has to be equal to password'
                        return
                    }
                    await UserService.register({
                        username: this.username,
                        password: this.password
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
