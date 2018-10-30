<template>
    <v-layout>
        <v-flex>
            <h1>Error {{code}}:{{msg}}</h1>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        }
    },
}
</script>

<style>

</style>
