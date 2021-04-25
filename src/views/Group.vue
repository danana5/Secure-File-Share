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
                    <v-list-item v-for="(file, i) in group.files" :key="i">
                        <v-list-item-avatar>
                            <v-icon>
                                mdi-file
                            </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{file.name}}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{file.size}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-container>
        </v-container>
    </v-card>
</v-container>
</template>

<script>
import db from "../firebaseInit";
import firebase from "firebase"
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
                firebase.storage().ref().child(this.path).put(this.chosenFile).then(() => {
                    this.group.files = []
                    this.getFiles()
                })
            }
        },
        getFiles() {
            let path = this.$route.params.group_id
            firebase.storage().ref().child(path).listAll().then(res => {
                res.items.forEach(item => {
                    this.group.files.push(item)
                    console.log(this.group.files)
                })
            })
        },
    }
};
</script>

<style></style>
