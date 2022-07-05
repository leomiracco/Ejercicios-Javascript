import { Observable } from "../Subject/observable.js";

export class View {
  constructor() {
    this.observable = new Observable();
    this.secondObservable = new Observable();
    this.observableEndsSearch = new Observable();

  }
  
  render() {
    this.pokemonCardContainer = document.querySelector("#pokemon-id-cards-container");
  
    this.pokemonsContainer = document.createElement("div");
    this.pokemonsContainer.setAttribute("class", "pokemons-container");
    this.pokemonsContainer.setAttribute("id", "pokemon-id-container");
  
    this.spinner = document.querySelector("#loading");

    this.observable.notify();
    document.addEventListener("click", (e) => {this.secondObservable.notify({ e: e, spinner: this.spinner }); });
  }
  
  showPokemonOnPageLoad(pokemonArray) {

    // for (let i = 0; i < pokemonArray.length; i++) {
    //   if(i < 10){
    //     const pokemonsImgContainer = document.createElement("div");
    //       pokemonsImgContainer.setAttribute("class", "pokemons-img-container");
    
    //       pokemonsImgContainer.innerHTML = `
    //         <img src="${pokemonArray[i].img}" class="pokemon-img" alt="Imagen de Pokémon">
    //         <p class="pokemon-name">${pokemonArray[i].name}</p>
    //       `;
    
    //       this.pokemonsContainer.appendChild(pokemonsImgContainer); 

    //   }
      
    // }

    pokemonArray.map((pokemon, i) => {
      if(i < 10){
        const pokemonsImgContainer = document.createElement("div");
        pokemonsImgContainer.setAttribute("class", "pokemons-img-container");
  
        pokemonsImgContainer.innerHTML = `
          <img src="${pokemon.img}" class="pokemon-img" alt="Imagen de Pokémon">
          <p class="pokemon-name">${pokemon.name}</p>
        `;
  
        this.pokemonsContainer.appendChild(pokemonsImgContainer);

      }
    });

    this.pokemonCardContainer.firstChild ? this.pokemonCardContainer.insertBefore(this.pokemonsContainer, this.pokemonCardContainer.firstChild) : this.pokemonCardContainer.appendChild(this.pokemonsContainer);

    this.spinner.style = "display: none";

    this.observableEndsSearch.notify();
  }

  showSpinner() {
    this.spinner.style = "display: block";
  }

  cleanHtml() {
    while (this.pokemonsContainer.firstChild) {
      this.pokemonsContainer.removeChild(this.pokemonsContainer.firstChild);
    }
  }
}
