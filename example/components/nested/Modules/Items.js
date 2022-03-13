import Order from "./OrderItems";
import store from "../../../store";

export default class Items {
  evt;
  category;
  moved;
  boards;
  className;
  result;
  constructor(evt, category, moved, boards, className,result) {
    this.evt = evt;
    this.category = category;
    this.moved = moved;
    this.boards = boards;
    this.className = className;
    this.result = result;
  }
  getItems() {
    //console.log(this.result);
    
    if (this.moved) {
      const firstFeed = {
        type: this.className + "_moved",
        items: {
          item_id: this.evt.item._underlying_vm_.id,
          category_id: this.category.id
        }
      };

      this.result.push(firstFeed);


      const secondFeed = Order.orderedItems(
        this.category.boards,
        this.evt.newIndex,
        this.className
      );

      this.result.push(secondFeed);

      store.dispatch("nested/moved", false);
      store.dispatch("nested/result",this.result)

       // console.log(this.result);

      
    } else {
      const firstFeed = Order.orderedItems(
        this.boards,
        this.evt.newIndex,
        this.className
      );
      this.result.push(firstFeed);
      // store.dispatch("nested/postCommands", this.result);
      // console.log(this.result);
    }
  }
  
}
