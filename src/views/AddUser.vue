<template>
  <v-container>
      <v-card flat>
          <v-container>
              <h1>Add User to {{group.name}}</h1>
              <v-list>
                  <v-list-item v-for="(user, i) in users" :key="i" @click="addUser(user.UserID)">
                      <v-list-item-content>
                          <v-list-item-title>
                              {{user.email}}
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
        db.collection("users").get().then(res2 => {
            res2.forEach(user => {
                for(let i = 0; i < this.group.users.length; i++){
                    if(user.data().UserID == this.group.users[i]){
                        break
                    }
                    if(i == this.group.users.length-1){
                        this.users.push(user.data())
                    }
                }
            })
        })
    },
    methods:  {
        addUser(user){
            const id = this.$route.params.group_id
            this.group.users.push(user)
            db.collection("groups").doc(id).update(this.group)
            this.$router.push("/group/" + id)
        }
    }
}
</script>

<style>

</style>