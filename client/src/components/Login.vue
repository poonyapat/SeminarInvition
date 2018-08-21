<template>
    <dialog-button>
        <span slot="caption">
            <v-icon>person</v-icon>
            Login
        </span>
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
export default {
    data() {
        return {
            usename: null,
            password: null
        }
    },
    methods: {
        cancel() {
            
        }
    },
    components: {
        DialogButton
    }
}
</script>

<style>

</style>
