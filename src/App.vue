<template>
  <v-app>
    <NavBar :online="online"/>
    <v-main style="background:#BDBDBD">
      <router-view></router-view>
    </v-main>
  </v-app> 
</template>

<script>
import NavBar from "./components/NavBar"
import db from "./firebaseInit"
export default {
  name: 'App',
  components:{
    NavBar
  },

  data: () => ({
    online: false,
  }),
  computed:{
    online(){
      this.online = true
      return this.online;
    }
  }
};
</script>
