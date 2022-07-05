import { Observable } from "../Subject/observable.js";

export class Model {
  constructor() {
    this.pokemonArray = [];
    this.url = `https://pokeapi.co/api/v2/pokemon`;
    this.objectTransformedToJson = {};
    this.searching = false;
    
    this.chargePokemonEvent = new Observable();
    this.cleanHtmlEvent = new Observable();
    this.eventShowSpinner = new Observable();
  }

  eventHandler(data) {
    if (data.e.target.matches("#container-id-forward-button *") && this.objectTransformedToJson.next && !this.searching) {
      this.searching = true;
      this.cleanHtmlEvent.notify();
      this.url = `${this.objectTransformedToJson.next}`;
      this.pokemonArray = [];
      this.getPokemon(data);
    } else if (
      data.e.target.matches("#container-id-back-button *") && this.objectTransformedToJson.previous && !this.searching) {
      this.searching = true;
      this.cleanHtmlEvent.notify();
      this.url = `${this.objectTransformedToJson.previous}`;
      this.pokemonArray = [];
      this.getPokemon(data);
    }
  }

  async getPokemon() {
    this.eventShowSpinner.notify();

    try {
      const promiseObject = await fetch(this.url);
      this.objectTransformedToJson = await promiseObject.json();
      
      if (!promiseObject.ok) {
        throw { status: 404 };
      } else {

        for (let i = 0; i < this.objectTransformedToJson.results.length; i++) {
          const object = await fetch(this.objectTransformedToJson.results[i].url);
          const pokemon = await object.json();

          try {
            if (!object.ok) {
              throw { status: 404 };
            } else {
              this.pokemonArray.push({img: pokemon.sprites.other.dream_world.front_default, name: pokemon.name});
            }
          } catch (error) {
            console.log(
              "Ha ocurrido un error, NO se pueden mostrar las imgánes de los Pokémons."
            );
          }
        }
        if(this.pokemonArray.length > 0){
          this.chargePokemonEvent.notify(this.pokemonArray);
        }
      }
    } catch (error) {
      console.log("Ha ocurrido un error, NO se pueden acceder a los Pokémons.");
    }
  }

  endsSearch(){
    this.searching = false;
  }
}