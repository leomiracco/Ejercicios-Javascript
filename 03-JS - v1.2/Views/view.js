import { Observer } from "../Subject/observer.js";

export class View extends Observer{
  constructor(controller){
    super();
    this.controller = controller;
    this.idInput = document.querySelector("#id-input");
    this.textInput = document.querySelector("#text-input");
    this.searchButton = document.querySelector("#search-button");

    document.addEventListener("keyup", controller);
    // this.searchButton.addEventListener("click", controller);
    document.addEventListener("click", controller);

    this.controller.model.subscribe(this);
    this.idInput.style = "color: white; background-color: hsl(40, 10%, 5%, 0.9)";
    this.mainContainer = document.querySelector("#main-container");
    this.wrongContainerId = document.createElement("div");
    this.wrongContainerId.setAttribute("class", "wrong-id-container-disabled");
    this.controller.modelChange = false;
    this.loadingContainer = document.querySelector("#loading");

    if(this.controller.getLocalStorage.length > 0){
      this.beforePrintingThePizza(this.controller.getLocalStorage, this.controller.updateViewProperty);
    }

    // this.loadingContainer.style = "display: block";
  }
  update(model){
    // tenemos que ordenar de mayor a menor porque imprimo de atrás para adelante.
    
    this.controller.updateViewProperty = true;

    const {searching, mainContainer, pizzaArray, localStoragePizzaArray, inputId, validationErrorMessage, outOfRangeErrorMessage, searchResult, bothFields, pizzaNameNotFound, bothInputsCannotBeLeftEmpty, pizzas} = this.controller.modelData.data;
    const {regularExpression} = this.controller.modelData;
    
    if(model.target.id === "id-input"){
      this.changeInputBackgroundColor(this.idInput.value, regularExpression);
    }
    
    if(model.target.id === "text-input"){
      this.changeTextInputBackgroundColor(this.textInput.value, regularExpression);
    }
    
    // All pizzas are displayed.
    if(model.target.id === "show-all-pizzas"){
      this.storePizzaInArray(pizzas);
      this.beforePrintingThePizza(pizzas, this.controller.updateViewProperty);
    }

    // Lowest priced pizza shown.
    if(model.target.id === "show-lowest-price-pizza"){
      const min = pizzas.reduce((min, next)=>{
        return (min.precio < next.precio) ? min : next;
      });
      pizzaArray.push(min);
      this.beforePrintingThePizza(pizzaArray, this.controller.updateViewProperty);
      this.addPizzaToLocalStorage(min, localStoragePizzaArray);
    }

    if((model.keyCode === 13 || model.target.id === "search-button") && model.keyCode !== 9 && this.idInput.value.length > 0 && this.textInput.value.length > 0 && !searching){
      this.errorMessage(bothFields);
    }else if((model.keyCode === 13 || model.target.id === "search-button") && model.keyCode !== 9 && this.idInput.value.length > 0 && this.textInput.value.length === 0 && !searching && regularExpression.num.test(this.idInput.value)){
      this.controller.modelChange = true;
      this.checkIdRange(parseInt(this.idInput.value), pizzas, outOfRangeErrorMessage, localStoragePizzaArray, pizzaArray);
      this.changeInputBackgroundColor(this.idInput.value, regularExpression);
    }else if((model.keyCode === 13 || model.target.id === "search-button") && model.keyCode !== 9 && this.idInput.value.length > 0 && this.textInput.value.length === 0 && !searching && !regularExpression.num.test(this.idInput.value)){
      this.errorMessage(validationErrorMessage);
    }else if((model.keyCode === 13 || model.target.id === "search-button") && model.keyCode !== 9 && this.idInput.value.length === 0 && this.textInput.value.length > 0 && !searching && regularExpression.text.test(this.textInput.value)){
      this.controller.modelChange = true;
      this.findMatchesByPizzaName(this.textInput.value, pizzas, pizzaArray, localStoragePizzaArray, pizzaNameNotFound);
      this.changeTextInputBackgroundColor(this.textInput.value, regularExpression);
    }else if((model.keyCode === 13 || model.target.id === "search-button") && model.keyCode !== 9 && this.idInput.value.length === 0 && this.textInput.value.length === 0 && !searching){
      this.errorMessage(bothInputsCannotBeLeftEmpty);
    }
  }

  //***********************************************************************/
  //********************** IMPORTANTE!!!  *************************************************/
  //***********************************************************************/}
  
  // Acá se puede utilizar el doble filter, antes obvio preguntamos si ambos inputs
  // son distinto de cero:

  // filtrarPorId(idValue, pizza){
  //  return (idValue.length > 0) ? parseInt(idValue) === pizza.id : pizza;
  // }

  // filtrarPorText(textValue, pizza){
  //  return (textValue.length > 0) ? textValue.toLowerCase() === pizza.nombre.replace("-", " ").toLowerCase() : pizza;
  // }

  // findMatchesByPizzaName(textValue, pizzas, pizzaArray, localStoragePizzaArray, pizzaNameNotFound){
  //  const pizzaResult = pizzas.filter(filtrarPorText(textValue, pizza)).filter(filtrarPorId(idValue, pizza));
  //  if(pizzaResult.length > 0){
  //    pizzaArray.push(pizzaResult[0]);
  //    this.beforePrintingThePizza(pizzaArray, this.controller.updateViewProperty);
  //    this.addPizzaToLocalStorage(pizzaResult[0], localStoragePizzaArray);
  //    this.idInput.value = "";
  //    this.textInput.value = "";
  //  }else{
  //    this.errorMessage(pizzaIdNameNotFound);
  //  }
  // }

  //***********************************************************************/
  //***********************************************************************/
  //***********************************************************************/

  findMatchesByPizzaName(textValue, pizzas, pizzaArray, localStoragePizzaArray, pizzaNameNotFound){
    const formattedText = textValue.toLowerCase();
    const pizzaResult = pizzas.filter((pizza)=>pizza.nombre.replace("-", " ").toLowerCase() === formattedText);
    if(pizzaResult.length > 0){
      pizzaArray.push(pizzaResult[0]);
      this.beforePrintingThePizza(pizzaArray, this.controller.updateViewProperty);
      this.addPizzaToLocalStorage(pizzaResult[0], localStoragePizzaArray);
      this.textInput.value = "";
    }else{
      this.errorMessage(pizzaNameNotFound);
    }
  }

  checkIdRange(value, pizzas, outOfRangeErrorMessage, localStoragePizzaArray, pizzaArray){
    if(value < this.minIdLimit(pizzas).id || value > this.maxIdLimit(pizzas).id){
      outOfRangeErrorMessage += ` ${this.minIdLimit(pizzas).id} y ${this.maxIdLimit(pizzas).id}`;
      this.mainContainer.scrollTo(0,0);
      this.errorMessage(outOfRangeErrorMessage);
    }else{
      this.cleanHtmlErrorMessage();
      const pizzaResult = pizzas.filter((pizza)=> pizza.id === value);
      pizzaArray.push(pizzaResult[0]);
      this.beforePrintingThePizza(pizzaArray, this.controller.updateViewProperty);
      this.addPizzaToLocalStorage(pizzaResult[0], localStoragePizzaArray);
      this.idInput.value = "";
    }
  }

  storePizzaInArray(pizzas){
    // The pizzas are ordered by id from highest
    // to lowest, since when printing them in
    // html it is always inserted above the previous one.
    const lengthOfArray = pizzas.length;
    let max = {};
    for (let i = 0; i < lengthOfArray - 1; i++) {
      for (let y = 0; y < lengthOfArray - 1; y++) {
        if(pizzas[y].id < pizzas[y+1].id){
          max = pizzas[y+1];
          pizzas[y+1] = pizzas[y];
          pizzas[y] = max;
        }
      }
    }
    pizzas = pizzas.slice(-3);
    localStorage.setItem("pizzaObject", JSON.stringify(pizzas));
  }

  beforePrintingThePizza(pizzaArray, updateViewProperty){
    this.cleanHtmlErrorMessage();
    if(updateViewProperty){
      this.loadingContainer.style = "display: block";
      setTimeout(()=>{
        this.loadingContainer.style = "display: none";
        this.printPizza(pizzaArray);
      }, 2000);
    }else{
      this.printPizza(pizzaArray);
    }
  }

  printPizza(pizzaArray){
    this.mainContainer.scrollTo(0,0);

    this.cleanMainContainer();
    pizzaArray.map((pizza)=>{
      this.pizzaContainer = document.createElement("div");
      this.pizzaContainer.setAttribute("class", "pizza-container-disabled");
      this.pizzaContainer.classList.replace("pizza-container-disabled", "pizza-container");

      this.pizzaInformationContainer = document.createElement("div");
      this.pizzaInformationContainer.setAttribute("class", "title-container-disabled");
      this.pizzaInformationContainer.classList.replace("title-container-disabled", "title-container");

      this.pizzaInformationContainer.innerHTML = `
        <h2><span>${pizza.nombre}</span></h2>
        <h4>Id: <span>#${pizza.id}</span></h4>
        <h4>Precio: <span>$${pizza.precio}</span</h4>
      `;
      this.pizzaContainer.appendChild(this.pizzaInformationContainer);

      this.pizzaIngredientsContainer = document.createElement("div");
      this.pizzaIngredientsContainer.setAttribute("class", "ingredient-container-disable");
      this.pizzaIngredientsContainer.classList.replace("ingredient-container-disable", "ingredient-container");
        
      this.pizzaIngredientsContainer.innerHTML = `
        <h2 class="ingredients-title">Los ingredientes son: </h2>
      `;
      this.pizzaIngredientsContainer.appendChild(this.getIngredientsList(pizza));
      this.pizzaContainer.appendChild(this.pizzaIngredientsContainer);

      this.pizzaImgContainer = document.createElement("div");
      this.pizzaImgContainer.setAttribute("class", "disable-pizza-image-container");

      this.pizzaImgContainer.classList.replace("disable-pizza-image-container", "pizza-image-container");
      this.pizzaImgContainer.innerHTML = `
        <img id="img-pizza" src="${pizza.imgSrc}" alt="Imagen de Pizza">
      `;
      this.pizzaContainer.appendChild(this.pizzaImgContainer);

      (this.mainContainer.firstChild) ? this.mainContainer.insertBefore(this.pizzaContainer, this.mainContainer.firstChild) : this.mainContainer.appendChild(this.pizzaContainer);
      this.controller.modelChange = false;
    });
  }

  addPizzaToLocalStorage(pizza, localStoragePizzaArray){
    if(localStoragePizzaArray.length < 3){
      localStoragePizzaArray.push(pizza);
      localStorage.setItem("pizzaObject", JSON.stringify(localStoragePizzaArray));
    }else{
      localStoragePizzaArray.shift();
      localStoragePizzaArray.push(pizza);
      localStorage.setItem("pizzaObject", JSON.stringify(localStoragePizzaArray));
    }
  } 

  getIngredientsList(pizza){
    this.ulLabel = document.createElement("ul");
    pizza.ingredientes.map((ingred)=>{
      this.liLabel = document.createElement("li");
      this.liLabel.textContent = ingred;
      this.ulLabel.appendChild(this.liLabel);
    });
    return this.ulLabel;
  }

  changeInputBackgroundColor(value, regularExpression){
    if(regularExpression.num.test(value)){
      this.idInput.style = "color: white; background-color: hsl(120, 87%, 35%)";
    }else{
      this.idInput.style = "color: white; background-color: hsl(345, 96%, 50%)";
    }
  }

  changeTextInputBackgroundColor(value, regularExpression){
    if(regularExpression.text.test(value)){
      this.textInput.style = "color: white; background-color: hsl(120, 87%, 35%)";
    }else{
      this.textInput.style = "color: white; background-color: hsl(345, 96%, 50%)";
    }
  }

  errorMessage(error){
    this.mainContainer.scrollTo(0,0);
    this.wrongContainerId.classList.replace("wrong-id-container-disabled", "wrong-container-id");
    this.wrongContainerId.innerHTML = `
      <p>${error}</p>
    `;

    if(this.mainContainer.firstChild){
      this.mainContainer.insertBefore(this.wrongContainerId, this.mainContainer.firstChild);
    }else{
      this.mainContainer.appendChild(this.wrongContainerId);
    }
    this.controller.modelChange = false;
  }

  cleanHtmlErrorMessage(){
    this.wrongContainerId.classList.replace("wrong-container-id", "wrong-id-container-disabled");
    while(this.wrongContainerId.firstChild){
      this.wrongContainerId.removeChild(this.wrongContainerId.firstChild);
    }
  }

  cleanMainContainer(){
    while(this.mainContainer.firstChild){
      this.mainContainer.removeChild(this.mainContainer.firstChild);
    }
  }

  minIdLimit(pizzas){
    this.idMin = pizzas.reduce((min, current)=>{
    return (min.id < current.id) ? min : current;
    });
    return this.idMin;
  }

  maxIdLimit(pizzas){
    this.idMax = pizzas.reduce((max, current)=>{
    return (max.id > current.id) ? max : current;
    });
    return this.idMax;
  }
}