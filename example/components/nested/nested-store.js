import Vuex from "vuex";
import Vue from "vue";
import CategoriesService from "../services/CategoriesService";

Vue.use(Vuex);

export const nested = {
  namespaced: true,
  state: {
    categories:[],
    elements: [
      {
        id: 1,
        name: "Shrek",
        elements: []
      },
      {
        id: 2,
        name: "Fiona",
        elements: [
          {
            id: 4,
            name: "Lord Farquad",
            elements: []
          },
          {
            id: 5,
            name: "Prince Charming",
            elements: []
          }
        ]
      },
      {
        id: 3,
        name: "Donkey",
        elements: []
      }
    ],
    data1:
    [
      {
        id: 1,
        title: "Category1",
        order:1,
        boards: [
          {id:1,title:'board1',order:1,category_id:1},
          {id:2,title:'board2',order:2,category_id:1}
        ]
      },
      {
        id: 2,
        title: "Category2",
        order:2,
        boards: [
         
        ]
      }
    ],
    data2: 
    [
      {
        id: 1,
        title: "Category1",
        order:1,
        boards: [
          
        ]
      },
      {
        id: 2,
        title: "Category2",
        order:2,
        boards: [
          {id:1,title:'board1',order:1,category_id:2},
          {id:2,title:'board2',order:2,category_id:2}
        ]
      }
    ],
  },

  mutations: {
    updateElements: (state, payload) => {
      console.log('updateElement Mutation')
      state.categories = payload;
    },

    categories:(state,payload)=>{
      state.categories=payload;
    }
  },

  actions: {
    updateElements: ({ commit }, payload) => {
      console.log('action update element')
       commit("updateElements", payload);
     },

    postCategories: ({ commit }, payload) => {
     CategoriesService.postCategories(payload)
      .then(()=>{
        console.log('postCategories Action');
        commit("updateElements", payload);
      })
     },
    
    getCategories({commit},){
      CategoriesService.getCategories()
      .then((response)=>{
        commit("categories",response.data.data.categories)
      })
      
    }
  },

  getters:{
    categories:(state)=>{
      return state.categories;
    }
  }

};
