<template>
<v-app-bar app color="#187789" extension-height="7" extended>
    <v-app-bar-nav-icon color="#76FF03" class="mt-2"></v-app-bar-nav-icon>
    <v-app-bar-title>
        <v-img src="@/assets/logo.png" class="mt-4">
        </v-img>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <div v-if="online">
        <h3 style="color:#76FF03">online <v-icon>mdi-wifi</v-icon>
        </h3>
    </div>
    <div v-else>
        <h3 style="color:#76FF03">offline <v-icon>mdi-wifi-off</v-icon>
        </h3>
    </div>

    <div v-if="loggedIn">
        <v-btn class="ml-2" rounded outlined @click="logout()" color="#76FF03">
            Log Out<v-icon>mdi-logout</v-icon>
        </v-btn>
    </div>
</v-app-bar>
</template>

<script>
import firebase from "firebase"
export default {
    name: "NavBar",
    props: {
        online: {
            type: Boolean,
            default: function () {
                return {}
            }
        },
        loggedIn:{
            type: Boolean,
            default: function(){
                return{}
            }
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.loggedIn = false
                this.$router.push(`/login`)
            })
        }
    }
}
</script>

<style>

</style>
