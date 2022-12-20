<template>
  <section>
    <b-table
      :loading="loading"
      :data="data"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :pagination-rounded="isPaginationRounded"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="user.first_name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      :page-input="hasInput"
      :pagination-order="paginationOrder"
      :page-input-position="inputPosition"
      :debounce-page-input="inputDebounce">

      <b-table-column field="id" label="ID" width="40" sortable numeric v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="name" label="Name" sortable v-slot="props">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column field="image" label="Image" sortable v-slot="props">
        {{ props.row.image }}
      </b-table-column>

      <b-table-column field="price" label="Price" sortable centered v-slot="props">
        {{ props.row.price }}
      </b-table-column>

    </b-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      loading: false,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 5,
      hasInput: false,
      paginationOrder: '',
      inputPosition: '',
      inputDebounce: ''
    }
  },
  async mounted() {
    try {
      this.loading = true
      await this.$fire.firestore.collection('products').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.data.push({id: doc.id, image: doc.data().image, name: doc.data().name, price: doc.data().price, slug: doc.data().slug})
        })
        this.loading = false
      })
    } catch (error) {
      thus.loading = false
      this.$buefy.toast.open({
        duration: 5000,
        message: `Something went wrong - ${error}`,
        type: 'is-danger'
      })
    }
  }
}
</script>
