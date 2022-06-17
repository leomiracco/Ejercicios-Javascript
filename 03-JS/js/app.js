import { ingredientesPizza } from "./obj.js";

const d = document;
const inputId = d.querySelector("#id");
const mainContainer = d.querySelector("#main-container");
const titleContainer = d.querySelector("#title-container");
const ingredientContainer = d.querySelector("#ingredient-container");
const pizzaImageContainer = d.querySelector("#pizza-image-container");
const imagePizza = d.querySelector("#img-pizza");
const wrongContainerId = d.querySelector("#wrong-container-id");
const spinner = d.querySelector("#loading");

const regularExpression = {num: /^\d{1,3}$/};

// Clean the html, if there was something before.
const removeOldHtmlData = (mainContainer)=>{
  while(mainContainer.firstChild){
    mainContainer.removeChild(mainContainer.firstChild);
  }
}

// The object whose id number is the maximum is returned.
const idMax = ingredientesPizza.reduce((max, current)=>{
  return (max.id > current.id) ? max : current;
});

// The object whose id number is the minimum is returned.
const idMin = ingredientesPizza.reduce((max, current)=>{
  return (max.id < current.id) ? max : current;
});

// Html message when "Id" is out of range (1-6).
const writeWrongIdInTheHtml = (errorMessage)=>{
  removeOldHtmlData(mainContainer);
  
  wrongContainerId.classList.replace("wrong-id-container-disabled", "wrong-container-id");
  wrongContainerId.innerHTML = `
  <p class="wrong-id">${errorMessage}</p>
  `;
  
  mainContainer.appendChild(wrongContainerId);
}

const formatPizzaName = (nombre)=>{
  const accents = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
  return (nombre.split("").map((letra)=> accents[letra] || letra).join(''));
}

const printPizzaImageInHml = (nombre)=>{
  pizzaImageContainer.classList.replace("disable-pizza-image-container", "pizza-image-container");

  console.time("loop");
  const nombreFactorizado = formatPizzaName(nombre.toLowerCase());
  imagePizza.src = `./assets/img/${nombreFactorizado}.jpg`;

  mainContainer.appendChild(pizzaImageContainer);
  console.timeEnd("loop");
}

// Insert all the ingredients in a container to later display it in the DOM.
const insertIngredients = (ingredientes, ingredientContainer)=>{
  const unorderedList = d.createElement("ul");
  ingredientes.map((ingred)=>{
    const list = d.createElement("li");
    list.textContent = `${ingred}`;
    unorderedList.appendChild(list);
  });
  ingredientContainer.appendChild(unorderedList);
}

const writeIngredientListInHtml = (ingredientes)=>{
  ingredientContainer.classList.replace("ingredient-container-disable", "ingredient-container");
  
  ingredientContainer.innerHTML = `
  <h2 class="title-ingredients">Los ingredientes son:</h2>
  `;
  
  insertIngredients(ingredientes, ingredientContainer);
  mainContainer.appendChild(ingredientContainer);
}

const writeNameAndPriceInHtml = (id, nombre, precio)=>{
  titleContainer.classList.replace("title-container-disabled", "title-container");
  titleContainer.innerHTML = `
  <h2>La Pizza: <span>${nombre}</span></h2>
  <h4>Precio: <span>$${precio}</span</h4>
  <h4>Id: <span>#${id}</span></h4>
  `;
  
  mainContainer.appendChild(titleContainer);
}

const timerLoading = (id, nombre, precio, ingredientes)=>{
  spinner.style.display = "block";
  setTimeout(()=>{
    spinner.style.display = "none";
    writeNameAndPriceInHtml(id, nombre, precio);
    writeIngredientListInHtml(ingredientes);
    printPizzaImageInHml(nombre);
  }, 1000);
}

const wrongEntry = (causeOfError)=>{
  let wrongId = "";
  if(causeOfError === "emptyWrongId"){
    wrongId = `El casillero no puede quedar vacío. Y el Id admite solo números naturales.`;
    writeWrongIdInTheHtml(wrongId);
  }else{
    wrongId = `El Id esta fuera de rango. El rango debe estar comprendido entre (${idMin.id} y ${idMax.id} inclusive)`;
    writeWrongIdInTheHtml(wrongId);
  }
};

// It is searched if the "id" introduced in the input corresponds to some "id" of the pizzas.
const getObject = (inputValue)=>{
  ingredientesPizza.filter((pizza)=>{
    const {id, nombre, precio, ingredientes} = pizza;
    (parseInt(inputValue) === id) ? (
      removeOldHtmlData(mainContainer),
      timerLoading(id, nombre, precio, ingredientes)
      ): null;
  });
}

// This function that will validate us if the "id" entered in the input is correct is called.
const captureIdNumber = (inputValue)=>{
  (inputValue < idMin.id || inputValue > idMax.id) ? wrongEntry("outOfRange") : (
    getObject(inputValue)
    )
}

const validation = (inputValue)=>{
  return regularExpression.num.test(inputValue);
}

const paintingInput = (objInput)=>{
  objInput.style.fontWeight = "bold";
  objInput.style.color = "white";
  (validation(inputId.value)) ? (
    objInput.style.background = "hsl(120, 87%, 35%)"
    ) : objInput.style.background = "hsl(0, 80%, 61%)"
}

const entering = (e)=>{
  (e.target.id === "id") ? paintingInput(inputId) : null

  if((e.target.id === "search" || e.keyCode === 13) && validation(inputId.value) && e.keyCode !== 9){
    paintingInput(inputId);
    captureIdNumber(inputId.value);
  }else if(!validation(inputId.value) && (e.target.id === "search" || e.keyCode === 13) && e.keyCode !== 9){
    wrongEntry("emptyWrongId");
  }
}

const starting = ()=>{
  inputId.setAttribute("min", idMin.id);
  inputId.setAttribute("max", idMax.id);
}

// When absolutely the entire document has been loaded, the script is started.
d.addEventListener("DOMContentLoaded", ()=>{
  starting();
  d.addEventListener("click", entering);
  // en el keydown JS no alcanza a capturar el valor del input.
  d.addEventListener("keyup", entering);
});