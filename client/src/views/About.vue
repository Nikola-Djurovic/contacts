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
    >Log in
    </v-btn>
    <v-btn @click="clear">
      Register
    </v-btn>
  </form>
</template>
<script>
/* eslint-disable */
  import { validationMixin } from 'vuelidate'
  import { required, maxLength} from 'vuelidate/lib/validators'
  

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
        const response = await fetch("http://localhost:9000/api/login",{
          method: "Post",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            username: this.name,
            hashedpassword: this.password
          })
        });
        const {token} = await response.json();
        //this.$store.setToken(token);
        if(token != null)
        {
        this.$store.commit('setToken',token);
        this.$store.commit('setLogin',true);
        }
        else
        {
          alert("Bad login credentials");
        }
      },
    
      clear () {
        
      },
    },
  }
</script>