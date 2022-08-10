import { StateAddItemFromCart } from "./StateAddItemFromCart.js";
import { StateAddPokeToCart } from "./StateAddPokeToCart.js";
import { StateClearAllItemsInCart } from "./StateClearAllItemsInCart.js";
import { StateNextSheet } from "./StateNextSheet.js";
import { StatePaginationPokes } from "./StatePaginationPokes.js";
import { StatePreviousSheet } from "./StatePreviousSheet.js";
import { StateRemoveItemFromCart } from "./StateRemoveItemFromCart.js";
import { StateSubtractItemFromCart } from "./StateSubtractItemFromCart.js";

export class StateSearchPokemon{

  pokemonYa = null;
  url = null;

  constructor(pokemonYa, queries){
    this.pokemonYa = pokemonYa;
    this.queries = queries;
  }

  actionToExecute(input){
    if(!isNaN(input) && input <= 649){
      this.url = `https://pokeapi.co/api/v2/pokemon/${input}`;
      this.queries.executePokeSearch(this.url);
    }else if(isNaN(input)){
      this.url = `https://pokeapi.co/api/v2/pokemon/${input}`;
      this.queries.executePokeSearch(this.url);
    }
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