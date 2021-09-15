<template>
  <div class="home">
    <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" 
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <h1 class="text-h1 font-weight-thin mb-4">Contacts</h1>
        <h3 class="text-h6 font-weight-thin mb-4"><i>By Nikola Đurović</i></h3>
        <br><br>
        <h2 class="text-h4 font-weight-thin mb-4" v-if="!this.$store.getters.getLogin">
          Please <a href="http://localhost:9000/login" style="color:white"><b>Sign in</b></a> to access your contacts
        </h2>
        <h2 class="text-h4 font-weight-thin mb-4" v-if="this.$store.getters.getLogin">
          Welcome {{this.$store.getters.getUsername}}
        </h2>
        
        
      </v-col>
    </v-row>
  </v-parallax>
    <HelloWorld msg="Default Boilerplate Template" v-if="this.$store.getters.getLogin"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>