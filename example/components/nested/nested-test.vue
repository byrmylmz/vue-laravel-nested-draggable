<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :value="value"
    @input="emitter"
    @end="end"
  >
    <div class="item-group" :key="category.id" v-for="category in value">
      <div class="item">{{ category.title }}</div>
      <nested class="item-sub" :boards="category.boards" :category="category" />
    </div>
  </draggable>
</template>
<script>
import draggable from "@/vuedraggable";
import Nested from "./nested.vue";
import Order from "./Modules/OrderItems";

export default {
  name: "nested-test",
  components: {
    draggable,
    Nested
  },

  props: {
    /**
     * if you use v-model="elements" in parent component.
     * You will get the value props.
     * and it will be sync two way as it v-model.
     * Normally we can do this opearation with props one way parent to child.
     * But v-model supply us two way data binding.
     * https://stackoverflow.com/a/47137462/13946201
     */
    value: {
      required: false,
      type: Array,
      default: null
    }
  },

  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },

  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    end: function(evt) {
      let index = evt.newIndex;
      let categories = this.value;
      let className = "category";

      let category = Order.orderedItems(categories, index, className);
      var resultArray = [];
      resultArray.push(category);
      this.$store.dispatch("nested/postCommands", resultArray);
    }
  }
};
</script>

<style scoped>
.item-container {
  max-width: 20rem;
  margin: 0;
}

.item {
  padding: 1rem;
  border: solid black 1px;
  background-color: #fefefe;
}
.item-sub {
  margin: 0 0 0 1rem;
}
</style>
