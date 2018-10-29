<template>
    <v-layout align-center>
        <v-flex class="white--text">
          <h3 class="display-3">Welcome to the <span class="display-4">SeIMS</span> </h3>

          <span class="subheading">SeIMS [Seminar Invitation Management System] help you to register and manage your registered seminars. 
            <br> This application is the intermediary between you and organizer.</span>

          <v-divider class="my-3"></v-divider>

          <v-layout align-center>
            <login>
              <v-btn class="primary" round large>Login</v-btn>
            </login>
            <span>or</span>
            <register>
              <v-btn class="primary" round large>Register</v-btn>
            </register>
          </v-layout>
        </v-flex>
      </v-layout>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'
export default {
  components: {
    Login, Register
  }
}
</script>

<style>

</style>
