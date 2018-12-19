<template>
    <div>
        <v-toolbar class="primary" dark scroll-off-screen scroll-target="#App" fixed app>

            <v-toolbar-side-icon @click="show = true" class="hidden-md-and-up"></v-toolbar-side-icon>
            <router-link class="title pr-4" tag="span" :to="{name: 'home'}">
                <v-toolbar-title>
                    <v-icon class="hidden-sm-and-down">home</v-icon>
                    SeIMS
                </v-toolbar-title>
            </router-link>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat :to="{name: 'browse'}">
                    <v-icon>search</v-icon>
                    Browse
                </v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <login v-if="!$store.state.isUserLoggedIn">
                    <v-btn flat>
                        <v-icon>person</v-icon>
                        Login
                    </v-btn>
                </login>
                <register v-if="!$store.state.isUserLoggedIn">
                    <v-btn flat>
                        <v-icon>person_add</v-icon>
                        Register
                    </v-btn>
                </register>
                <v-btn flat :to="{name: 'myRegistered'}" v-if="$store.state.isUserLoggedIn">
                    <v-icon>
                        bookmarks
                    </v-icon>
                    Registered Semianars
                </v-btn>
                <v-btn flat :to="{name: 'myCreatedSeminar'}"
                       v-if="$store.state.isUserLoggedIn && hasPermissionToCreate">
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
        <navigator :show="show" @hide="show = false"/>
    </div>
</template>

<script>
    import Navigator from '@/components/Navigator'
    import Login from '@/components/Login'
    import Register from '@/components/Register'

    export default {
        data() {
            return {
                show: false
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                this.$router.push({name: 'home'})
            },
        },
        computed: {
            hasPermissionToCreate() {
                const role = this.$store.state.user.role
                return role === 'Seminar Admin' || role === 'Admin'
            }
        },
        components: {
            Login, Register, Navigator
        }
    }
</script>

<style scoped>
    .title {
        cursor: pointer;
    }

    .title:hover {
        color: rgb(167, 167, 167);
    }

    .title:hover .v-icon {
        color: rgb(167, 167, 167);
    }
</style>

