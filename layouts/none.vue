<template>
  <div class="app">
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
  mounted() {
    if(!this.isLoggedIn) {
      this.$router.push('/login')
      return
    }

    if(this.isLoggedIn) {
      this.$router.push('/')
      return
    }
  }
}
</script>
