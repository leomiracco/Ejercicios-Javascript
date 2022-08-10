import { Map } from "../models/Map.js";

export class PokeCartView{

  containerShoppingCartMenu = null;
  cartMenuTitleContainer = null;
  containerOfTheTotalToPay = null;
  pokeContainerInCart = null;
  emptyCartContainer = null;
  indicateItemsInCart = null;
  containerToIndicateItemsInTheCart = null;
  totalAmount = 0;

  constructor(){
    this.containerShoppingCartMenu = document.querySelector(".container-shopping-cart");
    this.containerToIndicateItemsInTheCart = document.querySelector(".container-to-indicate-items-in-the-cart");
    this.indicateItemsInCart = document.querySelector("#indicate-items-in-cart");

    this.cartMenuTitleContainer = document.createElement("div");
    this.cartMenuTitleContainer.setAttribute("class", "");
    this.cartMenuTitleContainer.setAttribute("id", "");

    this.containerOfTheTotalToPay = document.createElement("div");
    this.containerOfTheTotalToPay.setAttribute("class", "");
    this.containerOfTheTotalToPay.setAttribute("id", "");
  }

  update(pokemones, state){
    if(state === "Cart"){
      this.cleanHtml();
      if(pokemones.length > 0){
        this.totalAmount = 0;
        pokemones.map((poke)=>{
  
          let name = poke.name;
          const capitalLetter = name.split("").find((e)=>e !== undefined).toUpperCase();
          name = name.split("").slice(1);
          name.unshift(capitalLetter);
          name = name.join("");
  
  
          this.cartMenuTitleContainer.innerHTML = `
            <div>
              <p class="" id="">Tus productos:</p>
            </div> 
          `;
  
          this.pokeContainerInCart = document.createElement("div");
          this.pokeContainerInCart.setAttribute("class", "poke-container-in-cart");
          this.pokeContainerInCart.setAttribute("id", "poke-container-in-cart");
  
          this.pokeContainerInCart.innerHTML += `
            <div>
              <img src="${poke.img}" class="pokemon-img" alt="Imagen de Pokémon">
            </div>
            <div class="poke-name-container" id="poke-name-container">
              <p class="pokemon-name" id="pokemon-name">${name}</p>
              <p class="pokemon-name" id="pokemon-name">$${poke.price}</p>
            </div>
            <div>
              <input type="button" value="-" class="subtract-item" id="${poke.id}">
              <span class="number-of-items">${poke.amount}</span>
              <input type="button" value="+" class="add-article" id="${poke.id}">
              <input type="button" value="X" class="remove-item" id="${poke.id}">
            </div>
          `;
  
          this.containerOfTheTotalToPay.innerHTML = `
            <div>
              <p class="total-to-pay" id="total-to-pay">Total: $${this.totalAmount += poke.price * poke.amount}</p>
            </div>
            <div>
              <input type="button" value="Ir a pagar" class="go-to-pay-button" id="go-to-pay-button">
            </div>
            <div>
              <input type="button" value="Vaciar Carrito" class="empty-cart" id="empty-cart">
            </div>
          `;

          this.containerShoppingCartMenu.appendChild(this.pokeContainerInCart);
        });
        if(this.containerShoppingCartMenu.firstChild){
          this.containerShoppingCartMenu.insertBefore(this.cartMenuTitleContainer, this.containerShoppingCartMenu.firstChild)
        }else{
          this.containerShoppingCartMenu.appendChild(this.cartMenuTitleContainer);
        }
  
        this.containerShoppingCartMenu.appendChild(this.containerOfTheTotalToPay);

        // Number of cart items...
        this.containerToIndicateItemsInTheCart.style = "display: flex";
        this.indicateItemsInCart.textContent = `${Map.getInstance().getCartPokesArray().length}`;

      }else{
        this.emptyCartContainer = document.createElement("div");

        this.emptyCartContainer.innerHTML = `
          <h1>El Carrito esta vacío!</h1>
        `;

        this.containerShoppingCartMenu.appendChild(this.emptyCartContainer);

        // Reset number of items in cart
        this.containerToIndicateItemsInTheCart.style = "display: none";
        this.indicateItemsInCart.textContent = ``;
      }
    }
  }

  startingScreen(){
    this.emptyCartContainer = document.createElement("div");

    this.emptyCartContainer.innerHTML = `
      <h1>El Carrito esta vacío!</h1>
    `;

    this.containerShoppingCartMenu.appendChild(this.emptyCartContainer);
  }

  cleanHtml() {
    while (this.containerShoppingCartMenu.firstChild) {
      this.containerShoppingCartMenu.removeChild(this.containerShoppingCartMenu.firstChild);
    }
  }
}