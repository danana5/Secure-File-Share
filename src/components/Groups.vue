<template>
<v-card flat max-width="300" class="mr-5" outlined>
    <v-flex wrap>
        <v-list-item>
            <v-list-item-icon>
                <v-icon color="#76FF03" v-if="group.users.length > 2">mdi-account-group</v-icon>
                <v-icon color="#76FF03" v-else-if="group.users.length > 1">mdi-account-multiple</v-icon>
                <v-icon color="#76FF03" v-else>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title class="ml-6"><strong>{{group.name}}</strong></v-list-item-title>
                <v-flex max-height="10">
                    <v-expansion-panels class="mt-2" flat>
                        <v-expansion-panel>
                            <v-expansion-panel-header>{{group.users.length}} Users
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <div v-for="(user, i) in group.users" :key="i" class="overflow-y-auto">
                                    <v-list-item-subtitle>{{getEmail(user)}}</v-list-item-subtitle>
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-flex>
                <v-btn :to="`/group/${group.id}`" rounded text outlined color="#76FF03" class="mt-2">
                    <span style="color: #76FF03">View Group</span>
                </v-btn>
            </v-list-item-content>
        </v-list-item>
    </v-flex>
</v-card>
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
    data() {
        return {
            users: []
        }
    },
    created() {
        db.collection("users").get().then(res => {
            res.forEach(doc => {
                const data = {
                    'id': doc.data().UserID,
                    'email': doc.data().email
                }
                this.users.push(data)
            })
        })
    },
    methods: {
        getEmail(userID) {
            let res = "User Unavailable"
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id == userID) {
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
