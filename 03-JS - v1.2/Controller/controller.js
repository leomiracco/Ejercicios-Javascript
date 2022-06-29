export class Controller{
  constructor(model){
    this.model = model;
  }
  // EVENTLISTENER INTERFACE
  handleEvent(e){
    e.stopPropagation();
    switch (e.type) {
      case "keyup":
        this.handleInput(e);
        break;
      case "click":
        this.handleInput(e);
        break;
      default:
      console.log(e.target);
    }
  }

  get modelData(){
    return this.model;
  }

  get getLocalStorage(){
    return this.model.data.localStoragePizzaArray;
  }

  get getPizzaArray(){
    return this.model.data.pizzaArray;
  }

  get updateViewProperty(){
    return this.model.data.updateView;
  }

  set addPizzaToArray(pizza){
    this.model.data.pizzaArray.push(pizza);
  }

  set updateViewProperty(value){
    this.model.data.updateView = value;
  }

  // get modelData2(){
  //   return this.model.data.searching;
  // }

  // get inputValue(){
  //   return this.model.data.inputValue;
  // }

  set modelChange(value){
    this.model.data.searching = value;
  }

  // set saveInputValue(value){
  //   this.model.data.inputValue = value;
  // }

  //CHANGE THE MODEL
  handleInput(e) {
   
    // this.model.notify(this.model);
    this.model.notify(e);
  }
}