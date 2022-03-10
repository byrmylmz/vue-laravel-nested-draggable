<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="boards"
    @add="add(category)"
    @end="end"
 >
    <div class="item-group" :key="board.id" v-for="board in boards"  >
        <div class="item" >{{ board.title }} </div>
    </div>
  </draggable>
</template>
<script>
import draggable from "@/vuedraggable";
import { mapGetters } from "vuex";
import Items from "./Modules/Items";

export default {
  name: "nested",
    components: {
      draggable
    },

  methods: {
    add(category){
      this.$store.dispatch("nested/moved", true);
      this.$store.dispatch("nested/newCategories", category);
    },

    end:function(evt){
        let category = this.newCategories;
        let moved = this.moved;
        let boardProps = this.boards;
        let className = 'board';
        
        const command = new Items(evt,category,moved,boardProps,className);
        return command.getItems();
    },
   
  },
  computed: {
     ...mapGetters("nested", ["newCategories","moved"]),
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
      
  },

  props: {
    category: {
      required: false,
      type: Object,
      default: null
    },
  
    boards: {
      required: false,
      type: Array,
      default: null
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

</style>