export class Map{

  static instance = null;
  pokemonArray = [];
  searchProcess = false;
  objectJson = null;
  start = null;
  cartPokesArray = [];
  filteredArray = null;
  totalToPay = 0;

  static getInstance(){
    if(!!Map.instance){
      return Map.instance;
    }else{
      return Map.instance = new Map();
    }
  }

  setLocalStorage(){
    localStorage.setItem("pokemons", JSON.stringify(this.cartPokesArray));
  }

  getTotalToPay(){
    this.totalToPay = 0;
    this.cartPokesArray.map((poke)=>{
      this.totalToPay += poke.price * poke.amount;
    });
    return this.totalToPay;
  }

  addPokemonToArray(pokemonArray){
    this.pokemonArray.push(pokemonArray);
  }

  getPokemonArray(){
    return this.pokemonArray;
  }

  emptyPokemonArray(){
    this.pokemonArray.length = 0;
  }

  emptyCartPokesArray(){
    this.cartPokesArray.map((poke)=>{
      poke.amount = 1;
    });
    localStorage.clear();
    return this.cartPokesArray.length = 0;
  }

  getSelectedPoke(name){
    let poke = null;
    for (let i = 0; i < this.pokemonArray.length; i++) {
      if(this.pokemonArray[i].name === name){
        poke = this.pokemonArray[i];
        break;
      }else{
        poke = null;
      }
    }
    return poke;
  }

  addCartPokesArray(cartPokesArray){
    if(this.cartPokesArray.length > 0){
      this.filteredArray = this.cartPokesArray.filter((poke)=>poke.id === cartPokesArray.id);
      if(this.filteredArray.length > 0){
        this.filteredArray.map((poke)=>{
          poke.amount++;
          localStorage.clear();
          this.setLocalStorage();
        });
      }else{
        this.cartPokesArray.push(cartPokesArray);
        localStorage.clear();
        this.setLocalStorage();
      }
    }else{
      this.cartPokesArray.push(cartPokesArray);
      localStorage.clear();
      this.setLocalStorage();
    }
  }

  subtractItemFromCart(id){
    this.filteredArray = this.cartPokesArray.filter((poke)=>poke.id === parseInt(id));
    if(this.filteredArray.length > 0){
      this.filteredArray.map((poke)=>{
        if(poke.amount > 1){
          poke.amount--;
          localStorage.clear();
          this.setLocalStorage();
        }
      });
    }
    return this.cartPokesArray;
  }

  addItemFromCart(id){
    this.filteredArray = this.cartPokesArray.filter((poke)=>poke.id === parseInt(id));
    if(this.filteredArray.length > 0){
      this.filteredArray.map((poke)=>{
        poke.amount++;
        localStorage.clear();
        this.setLocalStorage();
      });
    }
    return this.cartPokesArray;
  }

  removeItemFromCart(id){
    this.cartPokesArray = this.cartPokesArray.filter((poke)=>poke.id !== parseInt(id));
    localStorage.clear();
    if(this.cartPokesArray.length > 0){
      this.setLocalStorage();
    }
    return this.cartPokesArray;
  }

  getCartPokesArray(){
    return this.cartPokesArray;
  }

  setCartPokesArray(){
    this.cartPokesArray = JSON.parse(localStorage.getItem("pokemons"));
  }

  setSearchProcess(boolean){
    this.searchProcess = boolean;
  }

  setObjectJson(objectJson){
    this.objectJson = objectJson;
  }

  getObjectJson(){
    return this.objectJson;
  }

  setStart(start){
    this.start = start;
  }

  getStart(){
    return this.start;
  }

  inWhatState(e, pokemon, input, errorMessageView){
    if(e.target.matches("#container-id-forward-button *") && !this.searchProcess){
      pokemon.stateNextSheet();
    }
    if(e.target.matches("#container-id-back-button *") && !this.searchProcess){
      pokemon.statePreviousSheet();
    }
    if(e.target.matches("#pagination-view-button") && !this.searchProcess){
      pokemon.statePagination();
    }
    if(e.target.matches("#button-search-pokemon") && !this.searchProcess){
      pokemon.statePokeSearch(input.toLowerCase().trim());
    }
    if(e.target.matches(".add-to-cart-button")){
      pokemon.stateAddPokeToCart(e.target.id);
    }
    if(e.target.matches(".subtract-item")){
      pokemon.stateSubtractItemFromCart(e.target.id);
    }
    if(e.target.matches(".add-article")){
      pokemon.stateAddItemFromCart(e.target.id);
    }
    if(e.target.matches(".remove-item")){
      pokemon.stateRemoveItemFromCart(e.target.id);
    }
    if(e.target.matches("#empty-cart")){
      pokemon.stateClearAllItemsInCart();
    }
  }
}