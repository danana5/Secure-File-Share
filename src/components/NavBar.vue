<template>
<v-app-bar app color="#187789" extension-height="7" extended>
    <v-app-bar-nav-icon color="#76FF03" class="mt-2"></v-app-bar-nav-icon>
    <v-app-bar-title>
        <router-link to="/dash"><v-img src="@/assets/logo2.png" >
        </v-img></router-link>
    </v-app-bar-title>
    <v-spacer></v-spacer>

    <div v-if="online" class="mt-2">
        <h3 style="color:#76FF03">online <v-icon color="white">mdi-wifi</v-icon>
        </h3>
    </div>
    <div v-else class="mt-2">
        <h3 style="color:#76FF03">offline <v-icon color="white">mdi-wifi-off</v-icon>
        </h3>
    </div>
    <div v-if="loggedIn" class="ml-2 mt-2">
        <h4 style="color:#76FF03">{{user}}</h4>
    </div>

    <div v-if="loggedIn">
        <v-btn class="ml-2 mt-2" rounded dark @click="logout()" color="#76FF03">
            Log Out <v-icon>mdi-logout</v-icon>
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
        loggedIn: {
            type: Boolean,
            default: function () {
                return {}
            }
        },
        user: {
            type: String,
            default: function () {
                return {}
            }
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push(`/log-in`)
            })
        }
    }
}
</script>

<style>

</style>
