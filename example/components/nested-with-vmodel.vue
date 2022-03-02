<template>
<div class="">
    <div class="justify-content-between row">
      <button type="button" @click="getArray" class="btn btn-primary mb-5">Get Data</button>
      <button type="button" @click="sendArray1" class="btn btn-primary mb-5">Send Data 1</button>
      <button type="button" @click="sendArray2" class="btn btn-primary mb-5">Send Data 2</button>
    </div>


  <div class="justify-content-between row mb-5">
    <nested-test class="col-8" v-model="elements" />
    <nested-test class="col-8" v-model="data1" />
    <nested-test class="col-8" v-model="data2" />
  </div>

  <div class="justify-content-between row">
    <raw-displayer class="col-4" :title="'Get Data'" :value="elements" />
    <raw-displayer class="col-4" :title="'data 1'" :value="data1" />
    <raw-displayer class="col-4" :title="'data 2'" :value="data2" />
  </div>

</div>
</template>

<script>
import NestedTest from "./nested/nested-test.vue";
import rawDisplayer from "./infra/raw-displayer.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "nested-with-vmodel",
  display: "Nested (v-model & vuex)",

  order: 16,

  components: {
    NestedTest,
    rawDisplayer
  },

  created(){
    this.$store.dispatch("nested/getCategories");
  },
    
  computed: {
    ...mapGetters("nested",["categories"]),
    data1(){
      return this.$store.state.nested.data1;
    },
    data2(){
      return this.$store.state.nested.data2;
    },

    elements: {
      get() {
        return this.$store.state.nested.categories;
      },
      set(value) {
        this.$store.dispatch("nested/updateElements", value);
      }
      
    }
  },
  
  methods: {
    sendArray1(){
      this.$store.dispatch("nested/postCategories",this.$store.state.nested.data1);
      console.log(this.$store.state.nested.data1)
    },
    sendArray2(){
       this.$store.dispatch("nested/postCategories",this.$store.state.nested.data2);
      console.log(this.$store.state.nested.data2)
    },
    getArray(){
       this.$store.dispatch("nested/getCategories");
    }
  }
};
</script>
