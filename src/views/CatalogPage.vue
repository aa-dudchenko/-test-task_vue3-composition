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


<script>
  import SearchBlock from '@/components/catalog/SearchBlock.vue'
  import ListBlock from '@/components/catalog/ListBlock.vue'
  import PaginationBlock from '@/components/catalog/PaginationBlock.vue'
  import { mapGetters,  mapActions } from 'vuex'

  export default {
    name: 'CatalogPage',

    components: {
      SearchBlock,
      ListBlock,
      PaginationBlock,
    },

    data () {
      return {
        searchQuery: '',

        productsPerPage: 100,
        pageNumber: 1,

        filteredProducts: [],
      }
    },

    watch: {

      searchQuery () {
       this.filterProducts ()
        if (this.searchQuery === '') {
          this.pageNumber = 1
        }
      },

      pageNumber () {
        sessionStorage.setItem('selectedPage', this.pageNumber)
      }
    },

    methods: {
      ...mapActions(['GET_PRODUCTS_FROM_API',]),

      filterProducts () {
        sessionStorage.setItem('searchedByQuery', this.searchQuery)
        if (this.searchQuery !== '') {
          const filterResult =  this.PRODUCTS.filter( product => {
            return product.name.toLowerCase().indexOf(this.searchQuery.trim().toLowerCase()) !== -1
          })
          this.filteredProducts = [...filterResult]
        } else {
          this.filteredProducts = this.PRODUCTS
        }
      },

    },

    computed: {
      ...mapGetters(['PRODUCTS']),

      pages () {
        const availablePages =  Math.ceil (this.filteredProducts.length / this.productsPerPage)
        if (availablePages > 0 && availablePages < this.pageNumber) {
          this.pageNumber = 1
        }
        return availablePages
      },

      paginatedProducts () {
        let from = (this.pageNumber - 1) * this.productsPerPage
        let to = from + this.productsPerPage
        return this.filteredProducts.slice( from, to )
      }
    },

    mounted () {
      this.GET_PRODUCTS_FROM_API()
          .then( response => {
            if(response) {
              console.log('DATA RECEIVED')
            } else { console.log('DATA WAS NOT RECEIVED') }
          })
            .then(() => {
              this.filterProducts()
            })

      const storedSearchQuery = sessionStorage.getItem('searchedByQuery')
      // console.log(storedSearchQuery, storedFilterResult)
      if (storedSearchQuery !== null) {
        this.searchQuery = storedSearchQuery
      }

      const storedPageNumber = sessionStorage.getItem('selectedPage')
      if (storedPageNumber !== null) {
        this.pageNumber = Number(storedPageNumber)
      }

    },

  }
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
