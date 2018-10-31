<template>
    <v-layout>
        <v-flex>
            <v-card class="low-op fill-height">
                <v-toolbar dark>
                    <v-toolbar-title>
                        {{user.username}} Profile
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
                    <div v-for="(contents,key) in profile" :key="key">
                        <h1 v-if="!editing || key !== 'Others'">{{key}}</h1>
                        <div v-if="editing">
                            <div v-for="(content, index) in contents" :key="index">
                                <v-text-field v-if="content.type === 'text'" 
                                    :key="index" 
                                    :label="content.label" 
                                    v-model="profile[key][index].value" 
                                    :readonly="!editing || key === 'Others'" 
                                    :clearable="editing && key !== 'Others'"
                                    :mask="content.mask">
                                </v-text-field>
                                <v-radio-group v-else-if="content.type === 'select'" :key="index" v-model="content.value" :label="content.label">
                                    <v-radio v-for="choice in content.choices" :key="choice" :label="choice" :value="choice"></v-radio>
                                </v-radio-group>
                                <div v-else-if="content.type === 'number'">
                                    <v-text-field type="number" v-model="content.value" style="width: 20%" :label="content.label"></v-text-field>
                                    <v-slider
                                        v-model="content.value" 
                                        :min="content.min" 
                                        :max="content.max" 
                                        append-icon="add"
                                        prepend-icon="remove"
                                        @click:append="content.value++"
                                        @click:prepend="content.value--"
                                    />
                                </div>
                            </div>
                        </div>
                        <v-text-field v-else v-for="(content, index) in contents" :key="index" :label="content.label" v-model="profile[key][index].value" readonly :mask="content.mask">
                        </v-text-field>
                    </div>
                    <v-btn round v-show="editing" @click="save">
                        save
                    </v-btn>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
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
            let info = {}
            Object.values(this.profile).map(e=>Object.keys(e).map(attr=>e[attr].type?info[attr]=e[attr].value:0))
            this.updateUser(info)
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
                    fullname: {label: 'Fullname', value: this.user.fullname?this.user.fullname:'-', type:'text'},
                    gender: {label: 'Gender', value: this.user.gender?this.user.gender:'-', type:'select', choices: ['Male', 'Female', 'Other']},
                    age: {label: 'Age', value: this.user.age?this.user.age:'-', type:'number', max: 120},
                    nationality: {label: 'Nationality', value: this.user.nationality?this.user.nationality:'-', type:'text'}
                },
                'Contact': {
                    email: {label: 'Email', value: this.user.email?this.user.email:'-', type:'text'},
                    contactNumber: {label: 'Contact Number', value: this.user.contactNumber?this.user.contactNumber:'-', type:'text', mask:'phone'},
                },
                'Company Information': {
                    company: {label: 'Company', value: this.user.company?this.user.company:'-', type:'text'},
                    officeNumber: {label: 'Office Number', value: this.user.officeNumber?this.user.officeNumber:'-', type:'text', mask:'phone'},
                    fax: {label: 'Fax', value: this.user.fax?this.user.fax:'-', type:'text', mask:'phone'},
                },
                'Others': {
                    role: {label: 'Role', value: this.user.role?this.user.role:'-'},
                    credit: {label: 'Credit', value:this.user.credit?this.user.credit:'-'}
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
</style>
