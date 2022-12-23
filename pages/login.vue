<template>
  <div class="login">
    <b-field label="Email" type="is-danger" message="This email is invalid">
      <b-input type="email" maxlength="30" v-model="user.email"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input type="password" v-model="user.password" password-reveal></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {

    }
  }
}
</script>

<style>

</style>
