<template>
  <v-container>
    <v-card
      class="mx-auto mt-10"
      max-width="1000"
      tile
      :disabled="loading"
      :loading="loading"
    >
      <v-card-title> Create Group </v-card-title>
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="groupName"
            color="#76FF03"
            :rules="nameRules"
            label="Group Name"
            placeholder="Group Name"
            required
            clearable
          >
          </v-text-field>
          <v-btn
            class="white--text mr-4"
            color="red darken-3"
            outlined
            rounded
            to="/dash"
          >
            Cancel
          </v-btn>
          <v-btn
            color="#76FF03"
            outlined
            :disabled="!valid"
            rounded
            @click="createGroup()"
          >
            Create Group
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import db from "../firebaseInit";
import firebase from "firebase";
import { RSA, Crypt } from "hybrid-crypto-js";
export default {
  data() {
    return {
      valid: true,
      groupName: null,
      tasks: false,
      menu: false,
      loading: false,
      groupUsers: [],
      nameRules: [(v) => !!v || "Name is required"],
    };
  },
  methods: {
    createGroup() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let user = firebase.auth().currentUser;
        this.groupUsers.push(user.uid);
        const rsa = new RSA();
        rsa.generateKeyPair(this.newGroup);
      }
    },
    newGroup(keyPair) {
      let user = firebase.auth().currentUser;
      let privKey = keyPair.privateKey;
      let pubKey = keyPair.publicKey;

      const newGroup = {
        name: this.groupName,
        users: this.groupUsers,
        publicKey: pubKey,
      };
      db.collection("groups")
        .add(newGroup)
        .then((doc) => {
          db.collection("users")
            .where("email", "==", user.email)
            .get()
            .then((res) => {
              res.forEach((u) => {
                const crypt = new Crypt();
                let encryptedKey = crypt.encrypt(
                  u.data().publicKey,
                  String(privKey)
                );
                db.collection("users")
                  .doc(u.id)
                  .update({
                    [doc.id]: String(encryptedKey),
                  });
                this.loading = false;
                this.$router.push("/group/" + doc.id);
              });
            });
        });
    },
  },
};
</script>

<style>
</style>
