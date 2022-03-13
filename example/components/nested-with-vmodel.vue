<template>
<div>
  <div class="justify-content-between row ">
   
  </div>
  <div class="justify-content-between row ">
    <nested-test class="col-8" v-model="elements" />
    <raw-displayer class="col-4" :title="'Get Data'" :value="elements" />
  </div>
</div>
</template>

<script>
import NestedTest from "./nested/nested-test.vue";
import rawDisplayer from "./infra/raw-displayer.vue";
import { mapGetters } from "vuex";

export default {
  name: "nested-with-vmodel",
  display: "Nested (v-model & vuex)",
  order: 16,
  components: {
    NestedTest,
    rawDisplayer
  },
  created() {
    this.$store.dispatch("nested/getCategories");
    this.$store.dispatch("nested/sync");
  },

  computed: {
    ...mapGetters("nested", ["categories"]),

    elements: {
      get() {
        return this.$store.state.nested.categories;
      },
      set(value) {
        this.$store.dispatch("nested/updateElements", value);
      }
    }
  }
};
</script>
