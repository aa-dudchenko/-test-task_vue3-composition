<template>
  <div class="search-block">
    <div class="container search-block__container">

      <form
          class="search-block__form" action=""
          @click = "openSearch"
          :class="{ 'search-block__form_active': isActive || searchQuery.length > 0}"
      >
        <input
            class="search-block__input"
            type="search"
            v-on:input = "changeSearchQuery"
            v-model = "searchQuery"
        >
        <svg class="search-block__icon" viewBox="0 0 26 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"/></svg>
      </form>

    </div>
  </div>
</template>


<script setup>
  import { watchEffect } from "@vue/runtime-core"
  import { ref } from "@vue/reactivity";

  const emits = defineEmits ( ['changedSearchQuery'] )

  const props = defineProps ( {
    search_query: String
  } )

  const isActive = ref( false )
  const searchQuery = ref( '' )

  function openSearch () {
    isActive.value = !isActive.value
  }

  function changeSearchQuery() {
    emits('changedSearchQuery', searchQuery.value)
  }

  watchEffect( () =>  searchQuery.value = props.search_query )
</script>


<style lang="scss">
  
  .search-block {

    &__container {
      display: flex;
      justify-content: center;
    }
    
    &__form {
      position: relative;
      transition: all 1s;
      width: 50px;
      height: 50px;
      background: $clr-white;
      box-sizing: border-box;
      border-radius: 25px;
      border: 4px solid $clr-white;
      padding: 5px;

      &:hover,
      &_active {
        width: 250px;
        cursor: pointer;
      }

      &:hover .search-block__input,
      &_active .search-block__input {
         display: block;
      }

      &:hover .search-block__icon,
      &_active .search-block__icon {
        background: $clr-dark;
        color: $clr-white;
        fill: $clr-white;
      }
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 42.5px;
      line-height: 30px;
      outline: 0;
      border: 0;
      display: none;
      border-radius: 20px;
      padding: 0 20px;
    }

    &__icon {
      box-sizing: border-box;
      padding: 10px;
      width: 42.5px;
      height: 42.5px;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 50%;
      color: $clr-dark;
      text-align: center;
      font-size: 1.1em;
      transition: all 1s;
    }

  }

</style>

