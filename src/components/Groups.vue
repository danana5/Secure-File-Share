<template>
<v-list-item>
    <v-list-item-icon class="pa-0 mr-2">
        <v-btn :to="`/group/${group.id}`">
            View Group
        </v-btn>
    </v-list-item-icon>
    <v-list-item-content>
        <v-list-item-title>{{group.name}}</v-list-item-title>
        <div v-for="(user, i) in group.users" :key="i">
            <v-list-item-subtitle>{{getEmail(user)}}</v-list-item-subtitle>
        </div>
    </v-list-item-content>
</v-list-item>
</template>

<script>
import db from "../firebaseInit"
export default {
    props: {
        group: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data(){
        return {
            users: []
        }
    },
    created(){
        db.collection("users").get().then(res => {
            res.forEach(doc => {
                const data = {
                    'id' : doc.data().UserID,
                    'email' : doc.data().email
                }
                this.users.push(data)
            })
        })
    },
    methods:{
        getEmail(userID){
            let res = "Unavailable"
            for(let i = 0; i < this.users.length; i++){
                if(this.users[i].id == userID){
                    res = this.users[i].email
                }
            }
            return res
        }
    }
}
</script>

<style>

</style>
