<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Username"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      hint="At least 8 characters"
      label="Password"
      required
      :type="false ? 'text' : 'password'"
    ></v-text-field>
    <v-btn
      class="mr-4"
      @click="submit"
    >Login
    </v-btn>
    <v-btn @click="register">
      Register
    </v-btn>
  </form>
</template>
<script>
/* eslint-disable */
  import { validationMixin } from 'vuelidate'
  import { required, maxLength} from 'vuelidate/lib/validators'
  const axios = require('axios');
  var sha256 = require('js-sha256');
  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      
      
    },

    data: () => ({
      name: '',
      password: '',
      select: null,
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Username must be at most 10 characters long')
        !this.$v.name.required && errors.push('Username is required.')
        return errors
      },
      
    },

    methods: {
      async submit () {
        if(this.password.length<4)
        {
          alert("Password needs to be at least 4 characters long")
        }
        else{
        const response = await fetch("http://localhost:9000/api/login",{
          method: "Post",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            username: this.name,
            hashedpassword: sha256(this.password)
          })
        });
        const {token,ownerId} = await response.json();
        console.log(ownerId);
        //this.$store.setToken(token);
        if(token != null)
        {
        this.$store.commit('setToken',token);
        this.$store.commit('setLogin',true);
        this.$store.commit('setOwnerId',ownerId);
        this.$store.commit('setUsername',this.name);
        this.$router.push('/');
        }
        else
        {
          alert("Bad login credentials");
        }
        }
      },
    
      async register () {
        if(this.password.length<4)
        {
          alert("Password needs to be at least 4 characters long")
        }
        else
        {
        var pass = sha256(this.password);
        var str
        axios.post("http://localhost:9000/api/login/register",{
          username: this.name,
          hashedpassword: pass,
          ownerId: Date.now()
        });
        alert("Registratin success. Please try to sign in.");
        }
      },
    },
  }
</script>