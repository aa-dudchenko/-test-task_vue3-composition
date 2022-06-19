<template>
  <div class="catalog-page">
    
    <h1 class="catalog-page__title"> Pokemon - info </h1>

    <div class="catalog-page__search">
      <search-block
        :search_query = "searchQuery"
        @changedSearchQuery = "searchQuery = $event"
      />
    </div>

    <div class="catalog-page__list">
      <div class="container">
        <h1 class="title catalog-page__list-title"> Pokemon's: </h1>
        <list-block :paginated_products = "paginatedProducts" />
      </div>
    </div>

    <div class="catalog-page__pagination">
      <pagination-block
        :pages = "pages"
        :page_number = "pageNumber"
        @changedPageNumber = "pageNumber = $event"
      />
    </div>

  </div>
</template>


<script setup>
  import { ref } from "@vue/reactivity";
  import { computed, onMounted, watch, defineAsyncComponent } from "@vue/runtime-core";
  import { useStore } from 'vuex'

  const SearchBlock = defineAsyncComponent(() => import('@/components/catalog/SearchBlock.vue'))
  const ListBlock = defineAsyncComponent(() => import('@/components/catalog/ListBlock.vue'))
  const PaginationBlock = defineAsyncComponent(() => import('@/components/catalog/PaginationBlock.vue'))

  const store = useStore()

  const searchQuery = ref('')
  const productsPerPage = ref(100)
  const pageNumber = ref(1)
  const filteredProducts = ref([])


  watch(searchQuery, () => {
    filterProducts ()
    if (searchQuery.value === '') {
      pageNumber.value = 1
    }
  })

  watch(pageNumber, () => {
    sessionStorage.setItem('selectedPage', pageNumber.value)
  })

  const PRODUCTS = computed(() => store.getters.PRODUCTS)

  const pages = computed(() => {
    const availablePages =  Math.ceil (filteredProducts.value.length / productsPerPage.value)
    if (availablePages > 0 && availablePages < pageNumber.value) {
      pageNumber.value = 1
    }
    return availablePages
  })

  const paginatedProducts = computed(() => {
    let from = (pageNumber.value - 1) * productsPerPage.value
    let to = from + productsPerPage.value
    return filteredProducts.value.slice( from, to )
  })


  function filterProducts () {
    sessionStorage.setItem('searchedByQuery', searchQuery.value)
    if (searchQuery.value !== '') {
      const filterResult =   PRODUCTS.value.filter( product => {
        return product.name.toLowerCase().indexOf(searchQuery.value.trim().toLowerCase()) !== -1
    })
      filteredProducts.value = [...filterResult]
    } else {
      filteredProducts.value =  PRODUCTS.value
    }
  }


  onMounted (() =>  {
    store.dispatch('GET_PRODUCTS_FROM_API')
      .then( response => {
        if(response) {
          console.log('DATA RECEIVED')
        } else { console.log('DATA WAS NOT RECEIVED') }
      })
        .then(() => {
          filterProducts()
        })

  const storedSearchQuery = sessionStorage.getItem('searchedByQuery')
    if (storedSearchQuery !== null) {
      searchQuery.value = storedSearchQuery
    }

  const storedPageNumber = sessionStorage.getItem('selectedPage')
    if (storedPageNumber !== null) {
      pageNumber.value = Number(storedPageNumber)
    }
})
</script>


<style lang="scss">
  @import '../styles/style.scss';

  .catalog-page {

    &__title {
      margin: $mrg-mini 0 $mrg-big;
      color: $clr-dark;
      text-align: center;
      font-size: 50px;
      @include text-shadow($clr-white)
    }

    &__search {
      margin-bottom: $mrg-mini;
    }

    &__list {
      margin-bottom: $mrg-big;
    }

    &__list-title {
      margin-bottom: $mrg-big;
    }

  }
  
</style>
