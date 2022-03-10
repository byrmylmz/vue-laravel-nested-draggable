import Count from './CountItems';

export default class Order{
   
    static orderedItems(boards,newIndex,className){
        let countUpItems=Count.upItems(boards,newIndex);
        let countDownItems=Count.downItems(boards,newIndex);
        //----------------------------------------------
        console.log("Up Item Numbers "+countUpItems);
        console.log("Down Item Numbers "+countDownItems);
        //----------------------------------------------
        
        if(countUpItems < countDownItems){
            //---------------------------------------------------------------
            console.log("Yukardaki itemlari yeniden sirala asagi dokunma. "); 
            //---------------------------------------------------------------
            let boardItem = boards;
            var items=[];
            for (let i = newIndex; i >= 0; i--) {
                boardItem[i].order = boardItem[i + 1].order - 1;
                let idOrder = {id:boardItem[i].id,order:boardItem[i].order}
                items.push(idOrder)
              }
             let result={command:className+'_reorder',items};
             return result;

        }else{
            console.log("Asagidaki itemlari yeniden sirala yukari dokunma. ");
            const boardItem = boards;
            const end = boardItem.length;
            var items=[];
            for (let i = newIndex; i < end; i++) {
                boardItem[i].order = boardItem[i - 1].order + 1;
                let idOrder = {id:boardItem[i].id,order:boardItem[i].order}
                items.push(idOrder)
              }
             let result={command:className+'_reorder',items};
             return result;
        }

    }
}