export default class Count {
  static upItems(boards, newIndex) {
    let newBoards = boards.slice(0, newIndex);
    let numberOfItems = newBoards.length;
    return numberOfItems;
  }
  static downItems(boards, newIndex) {
    let newBoards = boards.slice(newIndex + 1);
    let numberOfItems = newBoards.length;
    return numberOfItems;
  }
}
