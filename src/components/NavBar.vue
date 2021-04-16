<template>
<v-app-bar app color="#187789" extension-height="7" extended>
    <v-app-bar-nav-icon color="#76FF03" class="mt-2"></v-app-bar-nav-icon>
    <v-app-bar-title>
        <v-img src="@/assets/logo.png" class="mt-4">
        </v-img>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <h1 v-if="online">online</h1>
</v-app-bar>
</template>

<script>
export default {
    name: "NavBar",
    props: [online]
}
</script>

<style>

</style>
