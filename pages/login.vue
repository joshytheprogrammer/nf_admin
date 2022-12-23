<template>
  <div class="login">
    <form @submit.prevent="login">
      <b-field label="Email">
        <b-input type="email" maxlength="30" :disabled="loading" v-model="user.email" required></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" :disabled="loading" v-model="user.password" required password-reveal></b-input>
      </b-field>

      <b-button native-type="submit" type="is-primary" :loading="loading">Submit</b-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        )
        .then((userCredential) => {
          console.log(userCredential.user)
        })
        .catch((error) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Something went wrong - ${error.message}`,
            type: 'is-danger'
          })
        });
      }catch(e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 1rem;
  margin: 1rem auto;

  width: 400px;

  display: block;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);

  @media screen and (max-width: $medium) {
    max-width: 90%;
  }
}
</style>
