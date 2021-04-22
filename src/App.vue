<template>
<v-app>
    <NavBar :online="online" :loggedIn="loggedIn" :user="user"/>
    <v-main style="background:#BDBDBD">
        <router-view></router-view>
    </v-main>
</v-app>
</template>

<script>
import NavBar from "./components/NavBar"
import firebase from "firebase"
import db from "./firebaseInit"
export default {
    name: 'App',
    components: {
        NavBar
    },
    data: () => ({
        online: false,
        loggedIn: false,
        user: ""
    }),
    watch: {
        $route() {
            if(firebase.auth().currentUser){
                this.loggedIn = true
                this.user = firebase.auth().currentUser.email
            }
            else{
                this.loggedIn = false
                this.user = ""
            }
        }
    },
    mounted() {
      console.log(db)
        if (db != null) {
            this.online = true
        } else {
            this.online = false
        }
        return this.online;
    }
};
</script>
