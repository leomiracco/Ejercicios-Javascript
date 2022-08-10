import { Map } from "./Map.js";
import { StateAddItemFromCart } from "./StateAddItemFromCart.js";
import { StateClearAllItemsInCart } from "./StateClearAllItemsInCart.js";
import { StateNextSheet } from "./StateNextSheet.js";
import { StatePaginationPokes } from "./StatePaginationPokes.js";
import { StatePreviousSheet } from "./StatePreviousSheet.js";
import { StateRemoveItemFromCart } from "./StateRemoveItemFromCart.js";
import { StateSearchPokemon } from "./StateSearchPokemon.js";
import { StateSubtractItemFromCart } from "./StateSubtractItemFromCart.js";

export class StateAddPokeToCart{

  pokemonYa = null;
  queries = null;
  poke = null;

  constructor(pokemonYa, queries){
    this.pokemonYa = pokemonYa;
    this.queries = queries;
  }

  actionToExecute(name){
    this.poke = Map.getInstance().getSelectedPoke(name);
    if(this.poke !== null){
      Map.getInstance().addCartPokesArray(this.poke);
      // Map.getInstance().setLocalStorage();
      return Map.getInstance().getCartPokesArray();
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
    this.pokemonYa.setState(new StateSearchPokemon(this.pokemonYa, this.queries));
    this.pokemonYa.actionToExecute(input);
  }

  stateAddPokeToCart(name){
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