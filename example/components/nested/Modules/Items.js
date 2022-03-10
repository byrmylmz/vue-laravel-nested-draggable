import Order from './OrderItems';
import store from "../../../store";

export default class Items{
    evt;
    category;
    moved;
    boards;
    className;
    constructor(evt,category,moved,boards,className){
        this.evt = evt;
        this.category = category;
        this.moved =moved;
        this.boards=boards;
        this.className=className;
    }
    getItems(){
        var resultArray = [];
        if(this.moved){
            const firstFeed = {
                command:this.className+'_moved',
                items:{
                    item_id:this.evt.item._underlying_vm_.id,
                    category_id:this.category.id
                }}

            resultArray.push(firstFeed);

            const secondFeed = Order.orderedItems(this.category.boards,this.evt.newIndex,this.className);
            
            resultArray.push(secondFeed);
            store.dispatch("nested/moved", false);
            store.dispatch("nested/postCommands",resultArray);
            console.log(resultArray);
            
            
        }else{
            
            const firstFeed = Order.orderedItems(this.boards,this.evt.newIndex,this.className);
            resultArray.push(firstFeed);
            store.dispatch("nested/postCommands",resultArray);
            console.log(resultArray);
        }
       

    }

   

}