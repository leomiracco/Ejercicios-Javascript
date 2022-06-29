import { Observable } from "../Subject/observable.js";
import { data } from "./pizza_object.js";
import { regularExpression } from "./regular_expression.js"

export class Model extends Observable{
  constructor(){
    super();
    this.data = data;
    this.regularExpression = regularExpression;
    if(JSON.parse(localStorage.getItem("pizzaObject"))){
      this.data.localStoragePizzaArray = JSON.parse(localStorage.getItem("pizzaObject"));
      this.data.pizzaArray = JSON.parse(localStorage.getItem("pizzaObject"));
    }
  }
}