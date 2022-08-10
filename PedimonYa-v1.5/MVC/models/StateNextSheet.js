import { Map } from "./Map.js";
import { StateAddItemFromCart } from "./StateAddItemFromCart.js";
import { StateAddPokeToCart } from "./StateAddPokeToCart.js";
import { StateClearAllItemsInCart } from "./StateClearAllItemsInCart.js";
import { StatePaginationPokes } from "./StatePaginationPokes.js";
import { StatePreviousSheet } from "./StatePreviousSheet.js";
import { StateRemoveItemFromCart } from "./StateRemoveItemFromCart.js";
import { StateSearchPokemon } from "./StateSearchPokemon.js";
import { StateSubtractItemFromCart } from "./StateSubtractItemFromCart.js";

export class StateNextSheet{

  pokemonYa = null;
  queries = null;
  start = null;
  url = null;

  constructor(pokemonYa, queries){
    this.pokemonYa = pokemonYa;
    this.queries = queries;
  }

  actionToExecute(){
    if(Map.getInstance().getObjectJson().next !== null){
      this.start = Map.getInstance().getStart() + 10;
      Map.getInstance().setStart(this.start);
      this.url = `https://pokeapi.co/api/v2/pokemon?offset=${this.start}&limit=10`;
      this.queries.executePaginationQuery(this.url);
    }
  }

  statePagination(){
    this.pokemonYa.setState(new StatePaginationPokes(this.pokemonYa, this.queries));
    this.pokemonYa.actionToExecute();
  }

  stateNextSheet(){
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