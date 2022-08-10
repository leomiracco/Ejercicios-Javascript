import { PokesPaginationView } from "../views/PokesPaginationView.js";
import { StatePaginationPokes } from "./StatePaginationPokes.js";
import { Queries } from "./Queries.js";
import { ViewOfFoundPokemon } from "../views/ViewOfFoundPokemon.js";
import { ObserverObservable } from "../observerObservable/ObserverObservable.js";
import { ErrorMessageView } from "../views/ErrorMessageView.js";

export class PokemonYa extends ObserverObservable{

  controller = null;
  mainView = null;
  pokesPaginationView = null;
  viewOfFoundPokemon = null;
  pokeCartView = null;
  errorMessageView = null;
  state = null;
  queries = null;
  response = null;

  constructor(controller, mainView, pokeCartView){
    super();
    this.controller = controller;
    this.mainView = mainView;
    this.pokeCartView = pokeCartView;
    this.pokesPaginationView = new PokesPaginationView();
    this.viewOfFoundPokemon = new ViewOfFoundPokemon();
    this.errorMessageView = new ErrorMessageView();
    this.queries = new Queries(this.pokesPaginationView, this.viewOfFoundPokemon, this.errorMessageView, this.mainView);
    this.state = new StatePaginationPokes(this, this.queries);

    this.subscribe(this.pokeCartView);
    this.state.actionToExecute();
    this.mainView.hideBackButton();
    this.mainView.hideContainerToIndicateItemsInTheCart();
    this.pokeCartView.startingScreen();
  }

  setState(state){
    this.state = state;
  }

  actionToExecute(data){
    this.response = this.state.actionToExecute(data);
    if(this.response !== null && this.response !== undefined){
      this.notify(this.response, "Cart");
    }
  }

  statePagination(){
    this.state.statePagination();
  }

  stateNextSheet(){
    this.state.stateNextSheet();
  }

  statePreviousSheet(){
    this.state.statePreviousSheet();
  }

  statePokeSearch(input){
    this.state.statePokeSearch(input);
  }

  stateAddPokeToCart(name){
    this.state.stateAddPokeToCart(name);
  }

  stateSubtractItemFromCart(id){
    this.state.stateSubtractItemFromCart(id);
  }

  stateAddItemFromCart(id){
    this.state.stateAddItemFromCart(id);
  }

  stateRemoveItemFromCart(id){
    this.state.stateRemoveItemFromCart(id);
  }

  stateClearAllItemsInCart(){
    this.state.stateClearAllItemsInCart();
  }
}