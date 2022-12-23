<template>
  <div class="app">
    <Nav />
    <Nuxt />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  beforeMount() {
    if(!this.isLoggedIn) {
      this.$router.push('/login')
      return
    }
  }
}
</script>
