import { Map } from "./Map.js";
import { StateAddItemFromCart } from "./StateAddItemFromCart.js";
import { StateAddPokeToCart } from "./StateAddPokeToCart.js";
import { StateClearAllItemsInCart } from "./StateClearAllItemsInCart.js";
import { StateNextSheet } from "./StateNextSheet.js";
import { StatePaginationPokes } from "./StatePaginationPokes.js";
import { StatePreviousSheet } from "./StatePreviousSheet.js";
import { StateRemoveItemFromCart } from "./StateRemoveItemFromCart.js";
import { StateSearchPokemon } from "./StateSearchPokemon.js";

export class StateSubtractItemFromCart{

  pokemonYa = null;
  queries = null;

  constructor(pokemonYa, queries){
    this.pokemonYa = pokemonYa;
    this.queries = queries;
  }

  actionToExecute(id){
    return Map.getInstance().subtractItemFromCart(id);
  }

  statePagination(){
    this.pokemonYa.setState(new StatePaginationPokes(this.pokemonYa, this.queries));
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