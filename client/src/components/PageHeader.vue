<template>
    <v-toolbar class="primary" dark>
        <v-toolbar-title class="pr-4">
            <router-link class="title" tag="span" :to="{name: 'home'}">
                <v-icon>home</v-icon>
                SeIMS
            </router-link>
        </v-toolbar-title>
        <v-toolbar-items>
            <v-btn flat :to="{name: 'browse'}">
                <v-icon>search</v-icon>
                Browse
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <login v-if="!$store.state.isUserLoggedIn"></login>
            <register v-if="!$store.state.isUserLoggedIn"></register>
            <v-btn flat :to="{name: 'myRegistered'}" v-if="$store.state.isUserLoggedIn">
                <v-icon>
                    bookmarks
                </v-icon>
                Registered Semianars
            </v-btn>
            <v-btn flat :to="{name: 'myCreatedSeminar'}" v-if="$store.state.isUserLoggedIn && hasPermissionToCreate">
                <v-icon>
                    storage
                </v-icon>
                My Seminars
            </v-btn>
            <v-btn flat @click="logout" v-if="$store.state.isUserLoggedIn">
                <v-icon>
                    logout
                </v-icon>
                Log out
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    import Login from '@/components/Login'
    import Register from '@/components/Register'
    export default {
        data() {
            return {
                iconColor: null,
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                this.$router.push({name: 'home'})
            },
        },
        computed: {
            hasPermissionToCreate(){
                const role = this.$store.state.user.role
                return role === 'Internal User' || role === 'Admin'
            }
        },
        components: {
            Login, Register
        }
    }
</script>

<style scoped>
.title {
    cursor: pointer;
}

.title:hover {
    color: rgb(40, 6, 75);
}

.title:hover .v-icon {
    color: rgb(40, 6, 75);
}
</style>

