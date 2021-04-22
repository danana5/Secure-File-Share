<template>
<v-container>
    <v-card class="mx-auto mt-10" max-width="600">
        <v-container>
            <h2 style="text-align: center; color: #76FF03;">Create an Account</h2>
            <v-divider></v-divider>
            <v-text-field color="#76FF03" class="mt-5" v-model="email" label="Email" outlined>
            </v-text-field>
            <v-text-field color="#76FF03" v-model="password" outlined :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" label="Password" @click:append="show = !show"></v-text-field>
            <v-text-field hide-details color="#76FF03" v-model="password2" outlined :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Retype Password" @click:append="show1 = !show1"></v-text-field>
            <p class="mt-1">Already own an account? <router-link to="/log-in" style="text-decoration-color: #76FF03; color: #76FF03">Log In Here</router-link>
            </p>
            <v-row justify="center" class="mb-1 mt-2">
                <v-btn color="#76FF03" outlined rounded @click="register">
                    Create
                </v-btn>
            </v-row>
        </v-container>
    </v-card>
</v-container>
</template>

<script>
import db from "../firebaseInit"
import firebase from "firebase"
export default {
    data() {
        return {
            email: "",
            password: "",
            password2: "",
            show: false,
            show1: false,
            rememberME: false,
            failed: false,
            loading: false,
            logged: true
        }
    },
    methods: {
        register: function (e) {
            if (this.password == this.password2) {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
                        db.collection("users").add({
                            UserID: user.user.uid,
                            email: user.user.email
                        })
                        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                            .then(u => {
                                    console.log("Logged in as " + u.user.email)
                                    this.$router.push("/dash")
                                },
                                err => {
                                    alert(err.message)
                                    this.loading = false
                                })
                    },
                    err => {
                        alert(err.message)
                    })
                e.preventDefault();
            } else {
                this.failed = true
            }
        }
    }
}
</script>
