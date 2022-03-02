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

<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="list"
    :value="value"
    :move="checkMove"
    @input="emitter"
    @change="change"
  >
    <div class="item-group" :key="el.id" v-for="el in realValue">
      <div class="item">{{ el.title }}</div>
      <bayram class="item-sub" :list="el.boards"   />
    </div>
  </draggable>
</template>

<script>
import draggable from "@/vuedraggable";
export default {
  name: "bayram",
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },

    change(){
    const categories = this.$store.state.nested.categories;
      categories.map((item,index)=>{
        item.order=index+1;
        if(item.boards !== ''){
         item.boards.map((board,index)=>{
           board.order=index+1;
           board.category_id=item.id;
          console.log(board.title);
         })
          }
      })
            this.$store.dispatch("nested/postCategories",categories);

    },

     checkMove: function(e) {
     //window.console.log("Future index: " + e.relatedContext.component);
    }
  },
  components: {
    draggable
  },

  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    }
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    }
  }
};
</script>
