<template>
  <section>
    <h1 class="subtitle is-size-3">Create New Product</h1>
    <div class="form">
      <b-field label="Name">
        <b-input v-model="product.name" placeholder="Enter the product name"></b-input>
      </b-field>

      <b-field label="Price">
        <b-input v-model="product.price" placeholder="Enter the product price"></b-input>
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
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: '',
        price: '',
        image: '',
        slug: ''
      },
      file: {}
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 1rem;
  .form {
    // padding: 0 1rem;
  }
}
</style>
