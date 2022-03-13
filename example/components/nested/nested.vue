<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="boards"
    @add="add(category)"
    @end="end"
  >
    <div class="item-group" :key="board.id" v-for="board in boards">
      <div class="item">{{ board.title }}</div>
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
  data() {
  return {
    start:0,
    stop:0,
    array:[]
    }
  },

  methods: {
    add(category) {
      this.$store.dispatch("nested/moved", true);
      this.$store.dispatch("nested/newCategories", category);
    },

    end: function(evt) {
      let category = this.newCategories;
      let moved = this.moved;
      let result = this.result;
      let boardProps = this.boards;
      let className = "board";
    
      const command = new Items(evt, category, moved, boardProps, className,result);
      command.getItems();

    
      console.log(this.array);
      if(this.start){
        console.log('adedd');
          this.start=1;
      }else{
      this.start=1;
      setTimeout(()=>{
        console.log('dispatch and cleaned');
        this.$store.dispatch("nested/postCommands",this.result)
        this.$store.dispatch("nested/result",[])
        this.start=0;
        },2000)
      }
      
      console.log(this.result);
      
   
    }
  },
  computed: {
    ...mapGetters("nested", ["newCategories", "moved","result"]),
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
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
