<template>
  <section>
    <h1 class="subtitle is-size-3">Create New Product</h1>
    <form @submit.prevent="submit" class="form">
      <b-field label="Name">
        <b-input v-model="product.name" placeholder="Enter the product name" validation-message="Only letters, numbers and apostrophes are allowed" pattern="^[a-zA-Z 0-9]*$" :disabled="loading" required></b-input>
      </b-field>

      <b-field label="Price">
        <b-input v-model="product.price" placeholder="Enter the product price" validation-message="Only numbers are allowed" pattern="^\d+$" :disabled="loading" required></b-input>
      </b-field>

      <b-field label="Image">
        <b-field class="file is-primary" :class="{'has-name': !!file}">
          <b-upload v-model="file" accept=".jpg, .JPG, .png, .PNG, .jpeg, .JPEG" class="file-label" validation-message="Only jpg, jpeg and png are allowed" :disabled="loading" required>
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
      // https://neasfashion.demo.joshytheprogrammer.com/shop/
      this.loading = true
      let slug = await this.generateSlug()
      await this.upload()

      await this.$fire.firestore.collection('products').add({
        name: this.product.name,
        price: this.product.price,
        image: this.product.image,
        slug: slug
      })
      .then((docRef) => {
        this.$buefy.toast.open({
          duration: 10000,
          message: `Document created successfully with ID - ${docRef.id} -  <a style="color: white;" href="http://localhost:3000/shop/${slug}" target="_blank" >View</a> `,
          type: 'is-success'
        })

        this.$router.push('/')
      })
      .catch((error) => {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went wrong - ${error}`,
          type: 'is-danger'
        })

        this.loading = false
      })
    },
    async upload() {
      let ref = await this.$fire.storage.ref().child('Products/'+this.file.name)

      await ref.put(this.file)
      .then(() => {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Upload successful',
          type: 'is-success'
        })
      })
      .catch((error) => {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went wrong - ${error}`,
          type: 'is-danger'
        })
      })

      await ref.getDownloadURL()
      .then((url) => {
        this.product.image = url
      })
      .catch((error) => {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something went wrong - ${error.code}`,
          type: 'is-danger'
        })
      })

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
