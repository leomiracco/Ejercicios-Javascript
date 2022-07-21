export class WritenView{
  constructor(){
    this.pokemonCardContainer = document.querySelector("#pokemon-id-cards-container");
  
    this.pokemonsContainer = document.createElement("div");
    this.pokemonsContainer.setAttribute("class", "pokemons-container");
    this.pokemonsContainer.setAttribute("id", "pokemon-id-container");

  }

  start(data){
  }

  render(pokemonArray){
    this.cleanHtml();
    pokemonArray.map((pokemon) => {
      const pokemonsImgContainer = document.createElement("div");
      pokemonsImgContainer.setAttribute("class", "pokemons-img-container");
    
      pokemonsImgContainer.innerHTML = `
        <img src="${pokemon.img}" class="pokemon-img" alt="Imagen de Pokémon">
        <p class="pokemon-name">${pokemon.name}</p>
      `;
    
      this.pokemonsContainer.appendChild(pokemonsImgContainer);
      });
  
      this.pokemonCardContainer.firstChild ? this.pokemonCardContainer.insertBefore(this.pokemonsContainer, this.pokemonCardContainer.firstChild) : this.pokemonCardContainer.appendChild(this.pokemonsContainer);
  
      // this.spinner.style = "display: none";
  
      // this.observableEndsSearch.notify();
  }

  cleanHtml() {
    while (this.pokemonsContainer.firstChild) {
      this.pokemonsContainer.removeChild(this.pokemonsContainer.firstChild);
    }
  }
}