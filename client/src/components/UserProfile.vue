<template>
    <v-container>
        <h1>UserProfile</h1>
        <br>
        <v-layout row wrap>
            <v-flex d-flex xs10 offset-xs1>
                <v-flex d-flex>
                    <v-avatar
                        :size="160"
                    >
                        <img src="@/assets/logo.png" alt="imgProfile">
                    </v-avatar>
                </v-flex>
                <v-expansion-panel popout >
                    <v-expansion-panel-content value='true'>
                        <div slot="header"> 
                            <h2>
                                info
                                <v-icon>info</v-icon>
                            </h2>
                        </div>
                        <v-card class="pl-5">
                            <v-card-title>
                                name
                            </v-card-title>
                            <v-card-text>
                                get request
                            </v-card-text>
                        </v-card>
                        <v-card class="pl-5">
                            <v-card-title>
                                gender
                            </v-card-title>
                            <v-card-text>
                                get request
                            </v-card-text>
                        </v-card>
                        <v-card class="pl-5">
                            <v-card-title>
                                age
                            </v-card-title>
                            <v-card-text>
                                get request
                            </v-card-text>
                        </v-card>
                        <v-card class="pl-5">
                            <v-card-title>
                                nationality
                            </v-card-title>
                            <v-card-text>
                                get request
                            </v-card-text>
                        </v-card>
                        <v-card class="pl-5">
                            <v-card-title>
                                email
                            </v-card-title>
                            <v-card-text>
                                get request
                            </v-card-text>
                        </v-card>
                        <v-card class="pl-5">
                            <v-card-title>
                                contactNumber
                            </v-card-title>
                            <v-card-text>
                                get request
                            </v-card-text>
                        </v-card>
                        <v-card class="pl-5">
                            <v-card-title>
                                officeNumber
                            </v-card-title>
                            <v-card-text>
                                get request
                            </v-card-text>
                        </v-card>
                        <v-card class="pl-5">
                            <v-card-title>
                                fax
                            </v-card-title>
                            <v-card-text>
                                get request
                            </v-card-text>
                        </v-card>
                        <v-card class="pl-5">
                            <v-card-title>
                                company
                            </v-card-title>
                            <v-card-text>
                                get request
                            </v-card-text>
                        </v-card>
                        <v-card class="pl-5">
                            <v-card-title>
                                credit
                            </v-card-title>
                            <v-card-text>
                                get request
                            </v-card-text>
                        </v-card>                        
                    </v-expansion-panel-content>
                        
                    <v-expansion-panel-content >
                        <div slot="header"> 
                            <h2>
                                edit
                                <v-icon>edit</v-icon>
                            </h2>
                        </div>
                        <v-card class="pl-5">
                                <v-flex xs10 offset-xs1>
                                    <v-text-field
                                         label="name"
                                          box
                                    ></v-text-field>
                                    <v-text-field
                                         label="gender"
                                          box
                                    ></v-text-field>
                                    <v-text-field
                                         label="age"
                                          box
                                    ></v-text-field>
                                    <v-text-field
                                         label="nationality"
                                          box
                                    ></v-text-field>
                                    <v-text-field
                                         label="email"
                                          box
                                    ></v-text-field>
                                    <v-text-field
                                         label="contactNumber"
                                          box
                                    ></v-text-field>
                                    <v-text-field
                                         label="OfficeNumber"
                                          box
                                    ></v-text-field>
                                    <v-text-field
                                         label="fax"
                                          box
                                    ></v-text-field>
                                    <v-text-field
                                         label="company"
                                          box
                                    ></v-text-field>
                                    <v-text-field
                                         label="credit"
                                          box
                                    ></v-text-field>
                                </v-flex>
                            <v-card-actions>
                                <v-btn >submit</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                show: false
            }
        }
    }
</script>
