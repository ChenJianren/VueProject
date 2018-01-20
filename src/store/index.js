import Vue from "vue"

export default {
  state: {
    shopping: {}
  },
  getters: {
    shoppingSum(state) {
      return Object.values(state.shopping).reduce((sum, v) => sum + v, 0);
    }
  },
  mutations: {
    modifyShopping(state, { id, count }) {
      Vue.set(state.shopping, id, count);
    }
  }
}