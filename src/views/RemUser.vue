<template>
  <v-container>
      <v-card flat>
          <v-container>
              <h1>Remove User From {{group.name}}</h1>
              <v-list>
                  <v-list-item v-for="(user, i) in group.users" :key="i" @click="removeUser(user)">
                      <v-list-item-content>
                          <v-list-item-title>
                              {{getEmail(user)}}
                          </v-list-item-title>
                      </v-list-item-content>
                  </v-list-item>
              </v-list>
          </v-container>
      </v-card>
  </v-container>
</template>

<script>
import db from "../firebaseInit"
export default {
    data(){
        return {
            group: {},
            users: []
        }
    },
    created(){
        const id = this.$route.params.group_id
        db.collection("groups").doc(id).get().then(res => {
            this.group = res.data()
        })
        db.collection("users").get().then(res => {
            res.forEach(u => {
                this.users.push(u.data())
            })
        })
    },
    methods:{
        getEmail(userID) {
            let res = "User Unavailable"
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].UserID == userID) {
                    res = this.users[i].email
                }
            }
            return res
        },
        removeUser(user){
            let newUsers = []
            for(let i = 0; i < this.group.users.length; i++){
                if(this.group.users[i] != user){
                    newUsers.push(this.group.users[i])
                }
            }
            const id = this.$route.params.group_id
            db.collection("groups").doc(id).update({
                name: this.group.name,
                users: newUsers
            })
            this.$router.push("/group/" + id)
        }
    }
}
</script>

<style>

</style>