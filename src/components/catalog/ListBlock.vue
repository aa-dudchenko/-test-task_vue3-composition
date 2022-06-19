<template>
  <ul class="list-block">

    <li
        class="list-block__item"
        v-for="(product, index) of paginated_products"
        :key="product.name"
    >
      <router-link
          class="link list-block__item-link"
          :to = "{ name: 'about', params: { pokemon_index: index + 1, name: product.name } }"
      >
        {{ product.name }}
      </router-link>
    </li>

  </ul>
</template>


<script>
  export default {
    props: {
      paginated_products: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>


<style lang="scss">
  @import '../../styles/style.scss';

  .list-block {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 18px 8px;

    &__item {}
    &__link {}


    @media (max-width: 768px) {
      &__item {
        font-size: 20px;
      }
    }

  }

</style>