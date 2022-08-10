import { ObserverObservable } from "../observerObservable/ObserverObservable.js";
import { Map } from "./Map.js";

export class Queries extends ObserverObservable{

  objectJson = null;
  promiseObject = null;
  secondPromiseObject = null;
  pokemonItem = null;
  pokesPaginationView = null;
  viewOfFoundPokemon = null;
  errorMessageView = null;
  errorMessage = null;
  mainView = null;

  constructor(pokesPaginationView, viewOfFoundPokemon, errorMessageView, mainView){
    super();
    this.pokesPaginationView = pokesPaginationView;
    this.viewOfFoundPokemon = viewOfFoundPokemon;
    this.errorMessageView = errorMessageView;
    this.mainView = mainView;
    this.subscribe(this.pokesPaginationView);
    this.subscribe(this.viewOfFoundPokemon);
    this.subscribe(this.errorMessageView);
  }

  async executePaginationQuery(url){
    this.mainView.spinnerOn();
    Map.getInstance().setSearchProcess(true);
    Map.getInstance().emptyPokemonArray();
    try {
      this.promiseObject = await fetch(url);
      this.objectJson = await this.promiseObject.json();
  
      if (!this.promiseObject.ok) {
        throw { status: 404 };
      } else {
        for (let i = 0; i < this.objectJson.results.length; i++) {
          try {
            this.secondPromiseObject = await fetch(this.objectJson.results[i].url);
            this.pokemonItem = await this.secondPromiseObject.json();
  
            if (!this.secondPromiseObject.ok) {
              throw { status: 404 };
            } else {
              Map.getInstance().addPokemonToArray({name: this.pokemonItem.name, img: this.pokemonItem.sprites.other.dream_world.front_default, id: this.pokemonItem.id, price: this.getRandomPrice(), amount: 1});
  
            }
          } catch (error) {
            this.errorMessage = "Ha ocurrido un error, NO se pueden mostrar las imgánes de los Pokémons.";
            this.mainView.spinnerOff();
            this.notify(this.errorMessage, "Error");
          }
        }
      }
    } catch (error) {
      this.errorMessage = "Ha ocurrido un error, NO se pueden acceder a los Pokémons.";
      this.mainView.spinnerOff();
      this.notify(this.errorMessage, "Error");
    }
    this.mainView.spinnerOff();
    this.notify(Map.getInstance().getPokemonArray(), "Pagination");
    Map.getInstance().setSearchProcess(false);
    Map.getInstance().setObjectJson(this.objectJson);
  }

  async executePokeSearch(url) {
    this.mainView.spinnerOn();
    Map.getInstance().setSearchProcess(true);
    Map.getInstance().emptyPokemonArray();
    try {
      this.promiseObject = await fetch(url);
      this.objectJson = await this.promiseObject.json();

      if (!this.promiseObject.ok) {
        throw { status: 404 };
      } else {
        Map.getInstance().addPokemonToArray({name: this.objectJson.name, img: this.objectJson.sprites.other.dream_world.front_default, id: this.objectJson.id, price: this.getRandomPrice(), amount: 1});
      }
    } catch (error) {
      this.errorMessage = "Cerciorate de estar ingresando un Id (del 1 al 649) o un nombre correcto.";
      this.mainView.spinnerOff();
      this.notify(this.errorMessage, "Error");
    }
    this.mainView.spinnerOff();
    this.notify(Map.getInstance().getPokemonArray(), "Search");
    Map.getInstance().setSearchProcess(false);
  }

  getErrorMessage(){
    return this.errorMessage;
  }

  getRandomPrice(){
    const min = 950;
    const max = 3750;
    return Math.ceil(Math.random() * (max - min) + min);
  }
}