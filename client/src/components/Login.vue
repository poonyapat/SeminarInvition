<template>

    <v-dialog
      v-model="dialog"
      width="500"
    >
        <slot slot="activator"/>
        <v-card>
            <v-card-title class="primary headline white--text">
                <v-icon dark>person_</v-icon>
                Login
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
            </v-card-text>
            <span class="red--text"> {{errorMsg}} </span>
            <v-card-actions>
                <v-layout justify-center>
                    <v-btn round class="primary" dark @click="login">Login</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import UserService from "@/services/userService";
import AttendeeService from "@/services/attendeeService";
import SeminarService from "@/services/seminarService"
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: null,
      password: null,
      errorMsg: null,
      dialog: false
    };
  },
  methods: {
    activate() {
      this.dialog = true;
    },
    async login() {
      try {
        this.error = null;
        const response = await UserService.authenticate({
          username: this.username,
          password: this.password
        });
        this.persistedLogin(response.data);
        this.setAttendees((await AttendeeService.findAllByUser(response.data.user.username)).data)
        this.setMySeminars((await SeminarService.findAllByAuthor(response.data.user.username)).data)
        this.username = null;
        this.password = null;
        this.dialog = false;
      } catch (error) {
        console.log(error)
        this.errorMsg = error.response.data.error;
      }
    },
    ...mapActions(["persistedLogin", "setAttendees", 'setMySeminars'])
  }
};
</script>

<style>
</style>
