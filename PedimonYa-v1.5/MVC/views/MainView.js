export class MainView{

  controller = null;
  inputSearchPokemon = null;
  containerIdBackButton = null;
  containerShoppingCartMenu = null;
  numberOfItems = null;
  containerToIndicateItemsInTheCart = null;

  constructor(controller){
    this.controller = controller;

    this.inputSearchPokemon = document.querySelector("#input-search-pokemon");
    this.containerIdBackButton = document.querySelector("#container-id-back-button");
    this.containerShoppingCartMenu = document.querySelector(".container-shopping-cart");
    this.containerToIndicateItemsInTheCart = document.querySelector(".container-to-indicate-items-in-the-cart");
    this.spinner = document.querySelector("#loading");

    this.event();
  }

  event(){
    document.addEventListener("click", (e)=>{
      this.controller.validateState(e);
    });
  }

  spinnerOn(){
    this.spinner.style = "display: block";
  }

  spinnerOff(){
    this.spinner.style = "display: none";
  }

  getInputSearchPokemon(){
    return this.inputSearchPokemon.value;
  }

  cleanInputSearchPokemon(){
    this.inputSearchPokemon.value = "";
  }

  hideBackButton(){
    this.containerIdBackButton.style = "display: none";
  }

  showBackButton(){
    this.containerIdBackButton.style = "display: block";
  }

  showShoppingCartMenu(){
    this.containerShoppingCartMenu.classList.toggle("csc-is-active");
  }

  hideContainerToIndicateItemsInTheCart(){
    this.containerToIndicateItemsInTheCart.style = "display: none";
  }
}