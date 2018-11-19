<template>
    <v-dialog v-model="dialog" width="500" class="inline-block">
        <slot slot="activator" />
        <v-card>
            <v-toolbar v-if="title" flat class="primary" dark>
                <v-toolbar-title>
                    {{title}}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon @click="dialog = false">close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                {{text}}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn round class="primary" @click="$emit('confirm');dialog=false">Confirm</v-btn>
                <v-btn round class="error" v-if="cancellable" @click="$emit('cancel');dialog=false">Cancel</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            cancellable: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                require: true
            },
            title: String
        },
        data() {
            return {
                dialog: false
            }
        },
    }
</script>

<style>
</style>