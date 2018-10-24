<template>
    <v-container fill-height>
      <base-home v-if="!isUserLoggedIn"></base-home>
    </v-container>
</template>

<script>
import BaseHome from '@/components/BaseHome'
import {mapState} from 'vuex'
export default {
  components: {
    BaseHome
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  }
}
</script>
