<template>
    <v-container fill-height>
      <base-home v-if="!isUserLoggedIn"></base-home>
      <user-profile v-else></user-profile>
    </v-container>
</template>

<script>
import BaseHome from '@/components/BaseHome'
import UserProfile from '@/components/UserProfile'
import {mapState} from 'vuex'
export default {
  components: {
    BaseHome, UserProfile
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  }
}
</script>
