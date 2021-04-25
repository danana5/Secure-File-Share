<template>
<v-container>
    <v-card flat>
        <v-container>
            <h1>
                <v-icon size="35" color="#76FF03">mdi-account-group</v-icon> {{ group.name }}
            </h1>
            <v-btn text rounded color="#76FF03" :to="`${this.$route.path}/add`">
                <v-icon>mdi-account-plus</v-icon>Add User
            </v-btn>
            <v-btn text rounded color="#76FF03" :to="`${this.$route.path}/remove`">
                <v-icon>mdi-account-remove</v-icon>Remove User
            </v-btn>
            <v-file-input hide-details class="mt-2" color="#76FF03" v-model="chosenFile" chips :show-size="1000" append-icon="mdi-upload" @click:append="upload()" placeholder="Select File" outlined></v-file-input>
            <v-container>
                <v-list>
                    <h3>Files</h3>
                    <v-list-item v-for="(file, i) in group.files" :key="i" @click="download(file)">
                        <v-list-item-avatar>
                            <v-icon>
                                mdi-file-cloud
                            </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{file}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-container>
        </v-container>
    </v-card>
</v-container>
</template>

<script>
import db from "../firebaseInit"
import firebase from "firebase"
import {Crypt} from "hybrid-crypto-js";
import fileDownload from "js-file-download";
import CryptoJS from "crypto-js";
export default {
    data() {
        return {
            group: {
                name: "",
                users: [],
                files: [],
                id: "",
            },
            chosenFile: null,
            upFile: null,
            path: "",
        };
    },
    created() {
        this.group.id = this.$route.params.group_id
        db.collection("groups")
            .doc(this.group.id)
            .get()
            .then((doc) => {
                this.group.name = doc.data().name
            });
        this.getFiles()
    },
    methods: {
        upload() {
            if (this.chosenFile != null) {
                this.path = `${this.$route.params.group_id}/${this.chosenFile.name}`
                db.collection("groups").doc(this.group.id).get().then(doc => {
                    let pubKey = doc.data().publicKey
                    db.collection("users").where("UserID", "==", firebase.auth().currentUser.uid).get().then(res => {
                        res.forEach(u => {
                            let privKey = u.data().privateKey

                            let password = sessionStorage.getItem("password")
                            let decrypted = CryptoJS.AES.decrypt(privKey, password)
                            let usersPrivateKey = decrypted.toString(CryptoJS.enc.Utf8)

                            let groupPrivKey = u.data()[this.group.id]
                            const crypt = new Crypt()

                            let groupPrivateKey = crypt.decrypt(usersPrivateKey, groupPrivKey)
                            const path = `${this.group.id}/${this.chosenFile.name}`

                            const reader = new FileReader()
                            reader.onload = function(e) {
                                let file = e.target.result
                                let signature = crypt.signature(groupPrivateKey.message, file)
                                let encryptedFile = crypt.encrypt(pubKey, file, signature)
                                firebase.storage().ref().child(path).putString(String(encryptedFile))
                            }
                            reader.readAsDataURL(this.chosenFile)
                            setTimeout(this.getFiles, 3000)
                        })
                    })
                })
            }
        },
        getFiles() {
            firebase.storage().ref().child(this.group.id).listAll().then(res => {
                res.items.forEach(item => {
                    this.group.files.push(item.name)
                })
            })
        },
        download(file){
            db.collection("groups").doc(this.group.id).get().then(doc => {
                let pubKey = doc.data().publicKey
                db.collection("users").where("UserID", "==", firebase.auth().currentUser.uid).get().then(res => {
                    res.forEach(u => {
                        let privKey = u.data().privateKey
                        
                        let password = sessionStorage.getItem("password")
                        let decrypted = CryptoJS.AES.decrypt(privKey, password)
                        let usersPrivateKey = decrypted.toString(CryptoJS.enc.Utf8)

                        let groupPrivKey = u.data()[this.group.id]
                        const crypt = new Crypt()
                        let groupPrivateKey = crypt.decrypt(usersPrivateKey, groupPrivKey)
                        const path = `${this.group.id}/${file}`

                        firebase.storage().ref().child(path).getDownloadURL().then(url => {
                            let req = new XMLHttpRequest()
                            req.responseType = 'blob'

                            req.onload = () => {
                                let blob = req.response
                                const reader = new FileReader()
                                reader.onload = function(e){
                                    const textFile = e.target.result
                                    let decryptedFile = crypt.decrypt(groupPrivateKey.message, atob(textFile.split(",")[1]))
                                    let verified = crypt.verify(pubKey, decryptedFile.signature, decryptedFile.message)
                                    if(!verified){
                                        alert("FUUUCKKK")
                                    } 
                                    else {
                                        let stringResponse = atob(decryptedFile.message.split(",")[1])
                                        fileDownload(stringResponse, file)
                                    }
                                }
                                reader.readAsDataURL(blob)
                            }
                            req.open("GET", url)
                            req.send()
                        })
                    })
                })
            })
        }
    }
};
</script>

<style></style>
