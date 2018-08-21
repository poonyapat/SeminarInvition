<template>
    <v-btn @click="activate" flat>
        <slot name="caption"/>
        <v-dialog
        v-model="dialog"
        width="500"
        >
        
        <v-card>
            <v-card-title class="deep-purple lighten-1 headline white--text">
                <slot name="caption"/>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false" flat icon>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <slot/>
        </v-card>
        </v-dialog>    
    </v-btn>
</template>

<script>
export default {
  props: {
    caption: {
      type: String,
      required: true
    },
  },
data() {
    return {
        dialog: false
    }
},
methods: {
    activate() {
        this.dialog = true;
    }
},
}
</script>

<style>
</style>
