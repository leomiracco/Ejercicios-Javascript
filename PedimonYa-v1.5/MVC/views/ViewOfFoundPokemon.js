export class ViewOfFoundPokemon{

  pokemonCardContainer = null;
  singlePokeContainer = null;
  containerIdNavigationButtons = null;
  pokemonContainer = null;
  searchContainerWithNoResults = null;
  errorMessageContainer = null;

  constructor(){
    this.pokemonCardContainer = document.querySelector("#pokemon-id-cards-container");
    this.containerIdNavigationButtons = document.querySelector("#container-id-navigation-buttons");

    this.singlePokeContainer = document.createElement("div");
    this.singlePokeContainer.setAttribute("class", "single-poke-container");
    this.singlePokeContainer.setAttribute("id", "single-poke-container");
  }

  update(pokemonArray, state){
    if(state === "Search"){
      this.pokemonContainer = document.querySelector("#pokemon-id-container");
      if(pokemonArray.length > 0){
        this.cleanHtml();

        pokemonArray.map((pokemon) => {
  
          let name = pokemon.name;
          const capitalLetter = name.split("").find((e)=>e !== undefined).toUpperCase();
          name = name.split("").slice(1);
          name.unshift(capitalLetter);
          name = name.join("");
  
          const pokeDataContainer = document.createElement("div");
          pokeDataContainer.setAttribute("class", "pokemon-data-container");
          pokeDataContainer.setAttribute("id", "pokemon-data-container");
        
          pokeDataContainer.innerHTML = `
            <div class="poke-img-container" id="poke-img-container">
              <img src="${pokemon.img}" class="pokemon-img" alt="Imagen de Pokémon">
            </div>
            <div class="poke-name-container" id="poke-name-container">
              <p class="pokemon-name" id="pokemon-name">${name} #${pokemon.id}</p>
              <p class="pokemon-price" id="pokemon-price">$${pokemon.price}</p>
              <input type="button" value="Agregar al carrito" class="add-to-cart-button" id="${pokemon.name}">
            </div>
          `;
        
          this.singlePokeContainer.appendChild(pokeDataContainer);
        });
        this.containerIdNavigationButtons.style = "display: none";
        this.pokemonCardContainer.appendChild(this.singlePokeContainer);
      }
    }
  }

  cleanHtml(){
    while (this.singlePokeContainer.firstChild) {
      this.singlePokeContainer.removeChild(this.singlePokeContainer.firstChild);
    }
    while (this.pokemonContainer.firstChild) {
        this.pokemonContainer.removeChild(this.pokemonContainer.firstChild);
    }
    if(document.body.contains(document.querySelector(".search-container-with-no-results"))){
      this.searchContainerWithNoResults = document.querySelector(".search-container-with-no-results");
      while (this.searchContainerWithNoResults.firstChild) {
        this.searchContainerWithNoResults.removeChild(this.searchContainerWithNoResults.firstChild);
      }
    }
    if(document.body.contains(document.querySelector("#error-message-container"))){
      this.errorMessageContainer = document.querySelector("#error-message-container");
      while (this.errorMessageContainer.firstChild) {
        this.errorMessageContainer.removeChild(this.errorMessageContainer.firstChild);
      }
    }
  }
}