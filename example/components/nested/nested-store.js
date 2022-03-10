import Vuex from "vuex";
import Vue from "vue";
import CategoriesService from "../services/CategoriesService";

Vue.use(Vuex);

export const nested = {
  namespaced: true,
  state: {
    newCategories:'',
    moved:false,
    categories: [],
  
  },

  mutations: {
    updateElements: (state, payload) => {
      console.log("nested-store.js / mutations/ updateElements");
      state.categories = payload;
    },

    categories: (state, payload) => {
      state.categories = payload;
    },

    newCategories:(state, payload)=>{
      state.newCategories=payload;
    },
    moved:(state,payload)=>{
      state.moved=payload;
    },
    
  },

  actions: {
    updateElements: ({ commit }, payload) => {
      console.log("nested-store.js / actions/ updateElements");
      commit("updateElements", payload);
    },

    postCommands: ({ commit }, payload) => {
      CategoriesService.postCommands(payload).then((response) => {
        console.log("nested-store.js / actions/ postCommands");
      });
    },

    getCategories({ commit }) {
      CategoriesService.getCategories().then(response => {
        commit("categories", response.data.data.categories);
      });
    },
    newCategories:({commit},payload)=>{
     commit("newCategories",payload)
    },
    moved:({commit},payload)=>{
     commit("moved",payload)
    },
  },

  getters: {
    categories: state => {
      return state.categories;
    },
    newCategories: state => {
      return state.newCategories;
    },
    moved: state => {
      return state.moved;
    }
  }
};
