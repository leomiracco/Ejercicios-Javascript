import { PokemonYa } from "../models/PokemonYa.js";
import { Map } from "../models/Map.js";
import { MainView } from "../views/MainView.js";
import { PokeCartView } from "../views/PokeCartView.js";

export class Controller{

  pokemonYa = null;
  mainView = null;
  pokeCartView = null;

  constructor() {
    this.mainView = new MainView(this);
    this.pokeCartView = new PokeCartView();
    this.pokemonYa = new PokemonYa(this, this.mainView, this.pokeCartView);
    
    if(JSON.parse(localStorage.getItem("pokemons")) !== null){
      if(JSON.parse(localStorage.getItem("pokemons")).length > 0){
        Map.getInstance().setCartPokesArray();
        this.pokeCartView.update(JSON.parse(localStorage.getItem("pokemons")), "Cart");
      }
    }
  }

  validateState(e){
    Map.getInstance().inWhatState(e, this.pokemonYa, this.mainView.getInputSearchPokemon(), this.errorMessageView);
    this.mainView.cleanInputSearchPokemon();
    
    if(Map.getInstance().getStart() === 0){
      this.mainView.hideBackButton();
    }else{
      this.mainView.showBackButton();
    }
    if(e.target.matches(".logo-shoppingCart")){
      this.mainView.showShoppingCartMenu();
    }
  }
}