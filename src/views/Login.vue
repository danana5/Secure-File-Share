<template>
	<v-container>
		<v-card class="mx-auto mt-10" max-width="600">
			<v-container>
				<h2 style="text-align: center; color: #76ff03">Log In</h2>
				<v-divider></v-divider>
				<v-text-field
					color="#76FF03"
					class="mt-5"
					v-model="email"
					label="Email"
					outlined
				>
				</v-text-field>
				<v-text-field
					hide-details
					color="#76FF03"
					v-model="password"
					outlined
					:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
					:type="show ? 'text' : 'password'"
					label="Password"
					@click:append="show = !show"
				></v-text-field>
				<v-checkbox
					v-model="rememberME"
					label="Stay Logged in?"
					color="#76FF03"
				></v-checkbox>
				<p class="mt-1">
					Don't have an account?
					<router-link
						to="/register"
						style="text-decoration-color: #76ff03; color: #76ff03"
						>Create one here!</router-link
					>
				</p>
				<v-row justify="center" class="mb-1">
					<v-btn color="#76FF03" outlined rounded @click="login"> Login </v-btn>
				</v-row>
			</v-container>
		</v-card>
		<v-dialog v-model="failed" max-width="400">
			<v-card max-width="400">
				<v-container>
					<h1>Error!</h1>
					{{ errorMsg }}
				</v-container>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import firebase from "firebase"
export default {
	data() {
		return {
			email: "",
			password: "",
			show: false,
			rememberME: false,
			failed: false,
			loading: false,
			logged: true,
			errorMsg: ""
		}
	},
	methods: {
		login() {
			this.loading = true
			if (this.rememberME) {
				firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
				firebase.auth().signInWithEmailAndPassword(this.email, this.password)
					.then(user => {
						sessionStorage.setItem("password", this.password)
						console.log("Logged in as " + user.user.email)
						this.$router.push("/dash")
						this.loading = false
						this.logged = false
					},
						err => {
							this.errorMsg = err.message
							this.failed = true
							this.loading = false
						})
			} else {
				firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
				firebase.auth().signInWithEmailAndPassword(this.email, this.password)
					.then(user => {
						sessionStorage.setItem("password", this.password)
						console.log("Logged in as " + user.user.email)
						this.$router.push("/dash")
						this.loading = false
						this.logged = false
					},
						err => {
							this.errorMsg = err.message
							this.failed = true
							this.loading = false
						})
			}
		}
	}
}
</script>
