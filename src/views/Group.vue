<template>
  <v-container>
    <v-card>
      <v-container>
        <h1>{{group.name}}</h1>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import db from "../firebaseInit"
export default {
  data(){
    return{
      group: {
        "name": "",
        "users" : []
      }
    }
  },
  created(){
    const groupID = this.$route.params.group_id
    console.log(groupID)
    db.collection("groups").doc(groupID).get().then(doc =>{
      this.group.name = doc.data().name
    })
  }
}
</script>

<style>

</style>