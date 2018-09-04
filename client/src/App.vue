<template>
    <v-app class="secondary" id="app">
        <page-header/>
        <main class="mt-5 pt-5">
            <v-container fluid>
                <router-view/>
            </v-container>
        </main>
    </v-app>
</template>

<script>
    import PageHeader from '@/components/PageHeader'

    export default {
        components: {
            PageHeader
        }
    }
</script>

<style src="./theme.css"/>