<template>
  <section>
    <h1 class="subtitle is-size-3">Create New Product</h1>
    <form @submit.prevent="submit" class="form">
      <b-field label="Name">
        <b-input v-model="product.name" placeholder="Enter the product name" validation-message="Only letters, numbers and apostrophes are allowed" pattern="^[a-zA-Z 0-9]*$" required></b-input>
      </b-field>

      <b-field label="Price">
        <b-input v-model="product.price" placeholder="Enter the product price" validation-message="Only numbers are allowed" pattern="^\d+$" required></b-input>
      </b-field>

      <b-field label="Image">
        <b-field class="file is-primary" :class="{'has-name': !!file}">
          <b-upload v-model="file" class="file-label">
            <span class="file-cta">
                <b-icon class="file-icon" icon="upload"></b-icon>
                <span class="file-label">Click to upload</span>
            </span>
            <span class="file-name" v-if="file">
                {{ file.name }}
            </span>
          </b-upload>
        </b-field>
      </b-field>

      <b-button native-type="submit" type="is-primary" :loading="loading">Submit</b-button>
    </form>
  </section>
</template>

<script>
import { uuid } from 'vue-uuid'
export default {
  data() {
    return {
      product: {
        name: '',
        price: '',
        image: '',
      },
      file: {},
      loading: false
    }
  },
  methods: {
    async submit() {
      let slug = await this.generateSlug()
      this.loading = true

      await this.$fire.firestore.collection('products').add({
        name: this.product.name,
        price: this.product.price,
        slug: slug
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.loading = false
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        this.loading = false
      });
    },
    generateSlug() {
      let name = this.product.name

      name = name.toLowerCase()

      name = name.replace(/\s/g, "-")

      name = name + "-" + uuid.v4()

      return name
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 1rem;
  margin: 1rem auto;

  width: 400px;

  display: block;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
}
</style>
