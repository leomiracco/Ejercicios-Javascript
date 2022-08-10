export class PokesPaginationView{

  pokemonCardContainer = null;
  pokemonContainer = null;
  containerIdNavigationButtons = null;
  singlePokeContainer = null;
  searchContainerWithNoResults = null;
  errorMessageContainer = null;

  constructor(){
    this.pokemonCardContainer = document.querySelector("#pokemon-id-cards-container");
    this.containerIdNavigationButtons = document.querySelector("#container-id-navigation-buttons");
    this.scrollButtonsContainer = document.querySelector(".scroll-buttons-container");

    this.pokemonContainer = document.createElement("div");
    this.pokemonContainer.setAttribute("class", "pokemon-container");
    this.pokemonContainer.setAttribute("id", "pokemon-id-container");

    this.searchContainerWithNoResults = document.createElement("div");
    this.searchContainerWithNoResults.setAttribute("class", "search-container-with-no-results");
  }

  update(pokemonArray, state){
    if(state === "Pagination"){
      this.cleanHtml();
      if(document.body.contains(document.querySelector("#single-poke-container"))){
        this.singlePokeContainer = document.querySelector("#single-poke-container");
        this.clearPokeSearchView();
      }
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
      
        this.pokemonContainer.appendChild(pokeDataContainer);
      });
      this.containerIdNavigationButtons.style = "display: flex";
      this.pokemonCardContainer.appendChild(this.pokemonContainer);
    }else if(state === "Error"){
      this.cleanHtml();
      this.searchContainerWithNoResults.innerHTML = `
        <h2>La búsqueda no arrojó ningún resultado...</h2>
      `;
      this.pokemonCardContainer.appendChild(this.searchContainerWithNoResults);
      this.scrollButtonsContainer.style = "display: none";
    }
    // this.spinner.style = "display: none";
  }

  cleanHtml() {
    while (this.pokemonContainer.firstChild) {
      this.pokemonContainer.removeChild(this.pokemonContainer.firstChild);
    }
    if(document.body.contains(this.searchContainerWithNoResults)){
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
  clearPokeSearchView(){
    while (this.singlePokeContainer.firstChild) {
      this.singlePokeContainer.removeChild(this.singlePokeContainer.firstChild);
    }
  }
}