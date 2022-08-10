import { Map } from "./Map.js";
import { StateAddItemFromCart } from "./StateAddItemFromCart.js";
import { StateAddPokeToCart } from "./StateAddPokeToCart.js";
import { StateClearAllItemsInCart } from "./StateClearAllItemsInCart.js";
import { StateNextSheet } from "./StateNextSheet.js";
import { StatePreviousSheet } from "./StatePreviousSheet.js";
import { StateRemoveItemFromCart } from "./StateRemoveItemFromCart.js";
import { StateSearchPokemon } from "./StateSearchPokemon.js";
import { StateSubtractItemFromCart } from "./StateSubtractItemFromCart.js";

export class StatePaginationPokes{
  
  pokemonYa = null;
  queries = null;
  start = null;
  end = null;
  url = null;

  constructor(pokemonYa, queries){
    this.pokemonYa = pokemonYa;
    this.queries = queries;
    this.start = 0;
    this.end = 10;
    this.url = `https://pokeapi.co/api/v2/pokemon?offset=${this.start}&limit=${this.end}`;
  }

  actionToExecute(){
    Map.getInstance().setStart(this.start);
    this.queries.executePaginationQuery(this.url);
  }

  statePagination(){
    this.pokemonYa.actionToExecute();
  }

  stateNextSheet(){
    this.pokemonYa.setState(new StateNextSheet(this.pokemonYa, this.queries));
    this.pokemonYa.actionToExecute();
  }

  statePreviousSheet(){
    this.pokemonYa.setState(new StatePreviousSheet(this.pokemonYa, this.queries));
    this.pokemonYa.actionToExecute();
  }

  statePokeSearch(input){
    this.pokemonYa.setState(new StateSearchPokemon(this.pokemonYa, this.queries));
    this.pokemonYa.actionToExecute(input);
  }

  stateAddPokeToCart(name){
    this.pokemonYa.setState(new StateAddPokeToCart(this.pokemonYa, this.queries));
    this.pokemonYa.actionToExecute(name);
  }

  stateSubtractItemFromCart(id){
    this.pokemonYa.setState(new StateSubtractItemFromCart(this.pokemonYa, this.queries));
    this.pokemonYa.actionToExecute(id);
  }

  stateAddItemFromCart(id){
    this.pokemonYa.setState(new StateAddItemFromCart(this.pokemonYa, this.queries));
    this.pokemonYa.actionToExecute(id);
  }

  stateRemoveItemFromCart(id){
    this.pokemonYa.setState(new StateRemoveItemFromCart(this.pokemonYa, this.queries));
    this.pokemonYa.actionToExecute(id);
  }

  stateClearAllItemsInCart(){
    this.pokemonYa.setState(new StateClearAllItemsInCart(this.pokemonYa, this.queries));
    this.pokemonYa.actionToExecute();
  }
}