import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    products: []
  },
  getters: {
    PRODUCTS (state) {
      return state.products;
    },
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: ( state, products ) => {
      state.products = products
    }
  },
  actions: {
    async GET_PRODUCTS_FROM_API ({commit}) {
      try {
        const products = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126');
        commit ('SET_PRODUCTS_TO_STATE', products.data.results);
        return products.data.results;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  modules: {
  }
})
