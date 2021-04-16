<template>
  <v-app>
    <v-app-bar app color="#203f6b" dense>
      <v-app-bar-title>
        <div class="text--lime-green">cloudee</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-main style="background:#0D47A1">
      <router-view></router-view>
    </v-main>
  </v-app> 
</template>

<script>

export default {
  name: 'App',


  data: () => ({
    //
  }),
};
</script>
