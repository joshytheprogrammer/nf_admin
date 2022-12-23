<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/#' }">
        <span class="title has-text-primary">Neas Fashion</span>
      </b-navbar-item>
  </template>
  <template #end>
    <b-navbar-item href="/#">
      Home
    </b-navbar-item>
    <b-navbar-dropdown label="Create">
      <b-navbar-item href="/create/product">
        Product
      </b-navbar-item>
      <b-navbar-item href="/create/category">
        Category
      </b-navbar-item>
    </b-navbar-dropdown>
    <b-navbar-item href="/#" @click.prevent="logout">
      Logout
    </b-navbar-item>
  </template>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut()
        .then(() => {
          this.$buefy.toast.open({
            duration: 10000,
            message: 'Logout successful',
            type: 'is-success'
          })
        })
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>
