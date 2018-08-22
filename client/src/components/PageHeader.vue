<template>
    <v-toolbar class="deep-purple lighten-1" dark>
        <v-toolbar-title>
            <router-link class="title" tag="span" :to="{name: 'home'}">
                <v-icon>home</v-icon>
                SeIMS
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <login v-if="!$store.state.isUserLoggedIn"></login>
            <register v-if="!$store.state.isUserLoggedIn"></register>
            <v-btn flat :to="{name: 'about'}" v-if="$store.state.isUserLoggedIn">
                <v-icon>
                    bookmarks
                </v-icon>
                My Registered
            </v-btn>
            <v-btn flat v-if="$store.state.isUserLoggedIn">
                <v-icon>
                    storage
                </v-icon>
                My Seminar
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

