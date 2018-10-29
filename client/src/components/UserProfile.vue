<template>
    <v-container fill-height grid-list-lg>
        <v-layout>
            <v-flex>
                <v-card class="modal fill-height" dark>
                    <v-toolbar>
                        <v-toolbar-title>
                            {{user.username}}
                        </v-toolbar-title>
                        <v-divider></v-divider>
                        <v-btn round class="edit" v-show="!editing" @click="editing=true">
                            <v-icon>edit</v-icon>
                            Edit
                        </v-btn>
                        <v-btn icon v-show="editing" @click="cancelEditing">
                            <v-icon>cancel</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-container>
                        <template v-for="(contents,key) in profile">
                            <h1 :key="key">{{key}}</h1>
                            <v-text-field v-for="(value,content) in contents" :key="content" :label="content" v-model="profile[key][content]" :disabled="!editing || key === 'Others'">
                            </v-text-field>
                        </template>
                        <v-btn round v-show="editing" @click="save">
                            save
                        </v-btn>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import UserService from '@/services/userService'
export default {
    computed: {
        ...mapState([
            'user', 'token'
        ])
    },
    data() {
        return {
            profile: {},
            editing: false
        }
    },
    methods: {
        ...mapActions([
            'updateUser'
        ]),
        async save() {
            this.editing = false
            this.updateUser({
                fullname: this.profile['General']['Fullname'],
                gender: this.profile['General']['Gender'],
                age: this.profile['General']['Age'],
                nationality: this.profile['General']['Nationality'],
                email: this.profile['Contact']['Email'],
                contactNumber: this.profile['Contact']['Contact Number'],
                company: this.profile['Company Information']['company'],
                officeNumber: this.profile['Company Information']['Office Number'],
                fax: this.profile['Company Information']['Fax'],
            })
            await UserService.update(
                this.user.username,
                (
                    ({fullname, gender, age, nationality, email, contactNumber, company, officeNumber, fax}) => 
                    ({fullname, gender, age, nationality, email, contactNumber, company, officeNumber, fax})
                )(this.user), 
                this.token)
        },
        cancelEditing(){
            this.editing = false
            this.loadProfile()
        },
        loadProfile(){
            this.profile = {
                'General': {
                    'Fullname': this.user.fullname?this.user.fullname:'-',
                    'Gender': this.user.gender?this.user.gender:'-',
                    'Age': this.user.age?this.user.age:'-',
                    'Nationality': this.user.nationality?this.user.nationality:'-'
                },
                'Contact': {
                    'Email': this.user.email?this.user.email:'-',
                    'Contact Number': this.user.contactNumber?this.user.contactNumber:'-'
                },
                'Company Information':{
                    'Company': this.user.company?this.user.company:'-',
                    'Office Number': this.user.officeNumber?this.user.officeNumber:'-',
                    'Fax': this.user.tax?this.user.fax:'-'
                },
                'Others': {
                    'Role': this.user.role?this.user.role:'-',
                    'Credit': this.user.credit?this.user.credit:'-'
                }
            }
        }
    },
    async mounted(){
        this.loadProfile()
    }
}
</script>

<style scoped>
.primary {
    color: #DDDDDD !important;
}

.modal {
    background-color: rgba(0, 0, 0, 0.3) !important;
}
</style>
