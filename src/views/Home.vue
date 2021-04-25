<template>
	<v-container>
		<v-card flat max-width="1200" class="mx-auto text-center">
			<h1>
				Welcome to
				<v-img
					src="../assets/logo2.png"
					max-width="300"
					position="center center"
					class="mx-auto mb-3"
				></v-img>
			</h1>
			<p>
				Cloudee is a secure cloud storage system which will encrypt and upload your
				files onto the cloud and then decrypt and download you files at your
				request!
				<br />
				This System was created as college project.
				<router-link
					to="/register"
					style="text-decoration-color: #76ff03; color: #76ff03"
					>Create an Account</router-link
				>
				to get started or if you already have an account,
				<router-link
					to="/log-in"
					style="text-decoration-color: #76ff03; color: #76ff03"
					>Log In Here</router-link
				>.
			</p>
			<v-spacer></v-spacer>
			<h4>© Daniel Grace</h4>
		</v-card>
	</v-container>
</template>

<script>
export default {};
</script>

<style>
</style>