import { regularExpression } from "../data/regular_expression.js";
import { data } from "../data/pizza_object.js";
import { searchInputById } from "../print/search_input_by_id.js";
import { printPizza } from "../print/print_pizza.js";
import { printError } from "../print/print_error.js";

export const organize = {
  start(){
    (JSON.parse(localStorage.getItem("pizzaObject"))) ? (
      data.localStoragePizzaArray = JSON.parse(localStorage.getItem("pizzaObject")),
      data.pizzaArray = JSON.parse(localStorage.getItem("pizzaObject")) || []
    ) : null;

    data.searching = false;

    data.mainContainer = document.querySelector("#main-container");
    // The reference of the HTML tag inputId is passed to the
    // property of the data object, that is, "data.inputId".
    data.inputId = document.querySelector("#input-id");

    printPizza.start(data.localStoragePizzaArray);
    searchInputById.start();
    printError.start();
  },

  searchingStopped(){
    data.searching = false;
  },

  getMainContainer(){
    return data.mainContainer;
  },

  getSearchResultText(){
    return data.searchResult;
  },

  getInputId(){
    return data.inputId;
  },

  localStorageContent(){
    return (data.localStoragePizzaArray.length === 0 && data.pizzaArray.length === 0) ? true : false;
  },

  validateInputIdForColor(e){
    (e.target.id === "input-id") ? (
      (regularExpression.num.test(e.target.value)) ? searchInputById.render("greenColor") : (
        searchInputById.render("redColor")
        )
    ) : null;
  },

  validateInputIdWithEnter(e){
    data.mainContainer.scrollTo(0,0);

    (e.keyCode === 13 && e.keyCode !== 9 && (regularExpression.num.test(data.inputId.value)) && !data.searching) ? this.checkIdRange(parseInt(data.inputId.value)) : (
      (e.keyCode === 13 && e.keyCode !== 9 && (!regularExpression.num.test(data.inputId.value)) && !data.searching) ? printError.render(data.validationErrorMessage) : null
    );
  },

  validateInputIdWithButton(e){
    data.mainContainer.scrollTo(0,0);

    (e.target.id === "search-button" && e.keyCode !== 9 && e.keyCode !== 13 && (regularExpression.num.test(data.inputId.value)) && !data.searching) ? this.checkIdRange(parseInt(data.inputId.value)) : (
      (e.target.id === "search-button" && e.keyCode !== 9 && e.keyCode !== 13 && (!regularExpression.num.test(data.inputId.value)) && !data.searching) ? printError.render(data.validationErrorMessage) : null
    )
  },
  
  checkIdRange(value){
    (value < this.minIdLimit().id || value > this.maxIdLimit().id) ? (
      this.outOfRangeError = `${data.outOfRangeErrorMessage} ${this.minIdLimit().id} y ${this.maxIdLimit().id}`,
      printError.render(this.outOfRangeError)
      ) : this.findMatch(value)
  },

  findMatch(value){
    printError.deleteMainContainer();

    data.searching = true;
    data.inputId.value = "";
    searchInputById.render("start");

    data.pizzas.map((pizza)=>{
      if(parseInt(value) === pizza.id){
        data.pizzaArray.push(pizza);
        printPizza.render(data.pizzaArray);
        this.addPizzaToArray(data.localStoragePizzaArray, pizza);
      }
    });
  },

  addPizzaToArray(localStoragePizzaArray, pizza){
    if(localStoragePizzaArray.length < 3){
      localStoragePizzaArray.push(pizza);
      this.assignTheArrayOfPizzasToLocalStorage(localStoragePizzaArray);
    }else{
      localStoragePizzaArray.shift();
      localStoragePizzaArray.push(pizza);
      this.assignTheArrayOfPizzasToLocalStorage(localStoragePizzaArray);
    }
  },

  assignTheArrayOfPizzasToLocalStorage(localStoragePizzaArray){
    localStorage.setItem("pizzaObject", JSON.stringify(localStoragePizzaArray));
  },

  // The object whose id number is the minimum is returned.
  minIdLimit(){
    this.idMin = data.pizzas.reduce((min, current)=>{
    return (min.id < current.id) ? min : current;
    });
    return this.idMin;
  },

  // The object whose id number is the maximum is returned.
  maxIdLimit(){
    this.idMax = data.pizzas.reduce((max, current)=>{
    return (max.id > current.id) ? max : current;
    });
    return this.idMax;
  }
};