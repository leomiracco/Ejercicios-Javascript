export class InitialState{
  constructor(controller){
    this.controller = controller;
    this.observableStartLoad = controller.observableUpdatePokes;
    this.previousState = controller.state;

    // this.url = `https://pokeapi.co/api/v2/pokemon`;
    this.objectTransformedToJson = {};
    this.pokemonArray = [];
    this.pokemonStartArray = [];
    this.start = 0;
    this.end = 10;
    this.url = `https://pokeapi.co/api/v2/pokemon?offset=${this.start}&limit=${this.end}`;
    this.state = "initialState";

    this.getPokemon();
  }

 //*****************************************/
  changeToNextState(){
    this.start += 10;
    this.url = `https://pokeapi.co/api/v2/pokemon?offset=${this.start}&limit=${this.end}`;
    if(this.objectTransformedToJson.next){
      this.pokemonArray = [];
      this.getPokemon();
    }
  }

  changeToBackState(){
    this.start -= 10;
    this.url = `https://pokeapi.co/api/v2/pokemon?offset=${this.start}&limit=${this.end}`;
    if(this.objectTransformedToJson.previous){
      this.pokemonArray = [];
      this.getPokemon();
    }
  }
 //*****************************************/

   async getPokemon() {
    
    // this.eventShowSpinner.notify();
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
          // this.pokemonStartArray = this.pokemonArray;
          // this.pokemonStartArray = this.pokemonStartArray.filter((poke, i)=>i < 10);
          this.observableStartLoad.notify(this.pokemonArray);
        }
      }
    } catch (error) {
      console.log("Ha ocurrido un error, NO se pueden acceder a los Pokémons.");
    }
  }
}