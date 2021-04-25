<template>
<v-container>
    <v-card>
        <div class="pa-3">
            <h1>Your Groups</h1><p><router-link to="/create-group" style="color: #76FF03">Create a New Group</router-link></p>
        </div>
        <v-container>
            <v-layout wrap>
                <div v-for="(group, i) in userGroups" :key="i">
                    <Groups :group="group"></Groups>
                </div>
            </v-layout>
        </v-container>
    </v-card>
</v-container>
</template>

<script>
import db from "../firebaseInit"
import firebase from "firebase"
import Groups from "../components/Groups"
export default {
    components: {
        Groups,
    },
    data() {
        return {
            userGroups: [],
            userID: ""
        }
    },
    created() {
        this.userID = firebase.auth().currentUser.uid
        db.collection('groups').where("users", "array-contains", this.userID).get().then(docs => {
            docs.forEach(doc => {
                const data = {
                    "name": doc.data().name,
                    "id" : doc.id,
                    "users": doc.data().users
                }
                this.userGroups.push(data)
            })
        })
    },
}
</script>
