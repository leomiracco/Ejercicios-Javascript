import { organize } from "../organize/organize.js";

export const printPizza = {
  start(localStoragePizzaArray){
    this.loadingContainer = document.querySelector("#loading");

    this.startMessageContainer = document.createElement("div"),
    this.startMessageContainer.setAttribute("class", "container-start-title-off"),

    this.render(localStoragePizzaArray);
  },

  render(PizzaArray){
    if(organize.localStorageContent()){
      this.startMessageContainer.classList.replace("container-start-title-off", "container-start-title-on");
      this.startMessageContainer.innerHTML = `
        <h2>${organize.getSearchResultText()}</h2>
      `;
      organize.getMainContainer().appendChild(this.startMessageContainer);
    }else{
      this.loadingContainer.style = "display: block";
      setTimeout(()=>{
        this.loadingContainer.style = "display: none";
        this.deleteMainContainer();
        PizzaArray.map((pizza)=>{
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

          (organize.getMainContainer().firstChild) ? organize.getMainContainer().insertBefore(this.pizzaContainer, organize.getMainContainer().firstChild) : organize.getMainContainer().appendChild(this.pizzaContainer);
          organize.searchingStopped();
        });
      }, 2000);
    };
  },

  getIngredientsList(pizza){
    this.ulLabel = document.createElement("ul");
    pizza.ingredientes.map((ingred)=>{
      this.liLabel = document.createElement("li");
      this.liLabel.textContent = ingred;
      this.ulLabel.appendChild(this.liLabel);
    });
    return this.ulLabel;
  },
 
  deleteMainContainer(){
    while(organize.getMainContainer().firstChild){
      organize.getMainContainer().removeChild(organize.getMainContainer().firstChild);
    }
  }
}