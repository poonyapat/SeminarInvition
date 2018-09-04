<template>
    <v-navigation-drawer
            v-model="showNav"
            fixed
            temporary
    >
        <v-toolbar flat class="secondary">
            <v-list class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="https://png.icons8.com/ios/1600/circled-s-filled.png" alt="">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <h1>SeIMS</h1>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile avatar :to="{name: 'browse'}">
                <v-list-tile-avatar>
                    <v-icon>search</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <h3>
                            Browse
                        </h3>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar v-if="isUserLoggedIn" :to="{name: 'myRegistered'}">
                <v-list-tile-avatar>
                    <v-icon>bookmarks</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <h3>
                            My Registered Seminars
                        </h3>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar v-if="isUserLoggedIn && hasPermissionToCreate" :to="{name: 'myCreatedSeminar'}">
                <v-list-tile-avatar>
                    <v-icon>storage</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <h3>
                            My Created Seminars
                        </h3>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <login v-if="!isUserLoggedIn">
                <v-list-tile avatar @click="()=>{}">
                    <v-list-tile-avatar>
                        <v-icon>person</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-content>
                            <h3>
                                Login
                            </h3>
                        </v-list-tile-content>
                    </v-list-tile-content>
                </v-list-tile>
            </login>
            <Register v-if="!isUserLoggedIn">
                <v-list-tile avatar @click="()=>{}">
                    <v-list-tile-avatar>
                        <v-icon>person_add</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <h3>
                                Register
                            </h3>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </Register>
            <v-list-tile avatar v-if="isUserLoggedIn" @click="logout">
                <v-list-tile-avatar>
                    <v-icon>logout</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <h3>
                            Log out
                        </h3>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import Login from '@/components/Login'
    import Register from '@/components/Register'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                showNav: false
            }
        },
        components: {
            Login, Register
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                this.$router.push({name: 'home'})
            },
        },
        mounted() {
            this.showNav = this.show;
        },
        computed: {
            ...mapState([
                'isUserLoggedIn', 'user'
            ]),
            hasPermissionToCreate() {
                return this.user && (this.user.role === 'Internal User' || this.user.role === 'Admin')
            }
        },
        watch: {
            showNav(val) {
                if (!val)
                    this.$emit('hide')
            },
            show(val) {
                this.showNav = val
            }
        }
    }
</script>

<style>

</style>
