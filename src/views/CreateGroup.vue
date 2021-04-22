<template>
<v-container>
    <v-card class="mx-auto mt-10" max-width="1000" tile :disabled="loading" :loading="loading">
        <v-card-title>
            New Night Sheet
        </v-card-title>
        <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="groupName" :rules="nameRules" label="Group Name" placeholder="Group Name" required clearable>
                </v-text-field>
                <v-btn class="white--text mr-4" color="red darken-3" outlined rounded text to="`/dash`">
                    Cancel
                </v-btn>
                <v-btn class="white--text" color="blue darken-3" outlined :disabled="!valid" rounded text @click="createGroup()">
                    Create Group
                </v-btn>
            </v-form>
        </v-container>
    </v-card>
</v-container>
</template>

<script>
import db from '../firebaseInit'
import firebase from "firebase"
export default {
    data() {
        return {
            valid: true,
            groupName: null,
            tasks: false,
            menu: false,
            loading: false,
            groupUsers: [],
            nameRules: [
                v => !!v || 'Name is required',
            ],
        }
    },
    methods: {
        createGroup() {
            if (this.$refs.form.validate()) {
                this.loading = true
                let user = firebase.auth().currentUser.uid
                this.groupUsers.push(user)
                db.collection("groups").add({
                    name: this.groupName,
                    users: this.groupUsers
                })
                this.loading = false
                this.$router.push(`/dash`)
            }
        }
    }
}
</script>

<style>

</style>
