<template>
  <div class="pagination-block">

      <div
          class="pagination-block__page"
          v-for="page in pages"
          :key="page"
          :class="{'pagination-block__page_active': page === page_number}"
          @click="pageClick(page)"
      >
        {{ page }}
      </div>

  </div>
</template>


<script setup>
  const emits = defineEmits(['changedPageNumber'])

  defineProps({
     pages: {
        type: Number,
      },
      page_number: {
        type: Number,
      }
  })

  function pageClick(page) {
    emits('changedPageNumber', page)
  }
</script>


<style lang="scss">
 
  .pagination-block {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;

    &__page {
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 18px;
      border: 0.5px solid $clr-white;
      border-radius: 5px;
      cursor: pointer;

      min-width: 30px;
      height: 30px;

      &:hover {
        transition: all .3s;
        background-color: $clr-blue;
      }

      &_active {
        background-color: $clr-blue;
      }
    }

  }

</style>