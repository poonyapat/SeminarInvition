<template>
    <v-card class="low-op">
        <v-toolbar dark>
            <v-toolbar-title>
                Administrator's Controller
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <h1>User Controller</h1>
            
            <v-bottom-sheet v-model="showSheet" class="hidden-sm-and-up">
                <v-btn
                    slot="activator"
                    dark
                >
                    Generate User 
                </v-btn>
                <user-generator @close="showSheet = false"></user-generator>
            </v-bottom-sheet>
            <v-dialog class="hidden-xs-only" v-model="showDialog" width="60%" >
                <v-btn
                    slot="activator"
                    dark
                >Generate User</v-btn>
                <user-generator @close="showDialog = false"></user-generator>
            </v-dialog>
        </v-card-text>
    </v-card>
</template>

<script>
import UserGenerator from '@/components/UserGenerator'
export default {
    data() {
        return {
            showSheet: false,
            showDialog: false
        }
    },
    components: {
        UserGenerator
    }
}
</script>

<style>

</style>
