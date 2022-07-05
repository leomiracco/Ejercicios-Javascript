import { printErrorInHtml } from "./print_ to_html.js";

export const validateInputs = (chooseCountry, chooseCity)=>{

  if(chooseCountry.value.length === 0 && chooseCity.value.length === 0){
    printErrorInHtml("Debe elegir un País y una Ciudad.");
    return false;
  }else if(chooseCountry.value.length === 0){
    printErrorInHtml("Debe elegir un País.");
    return false;
  }else if(chooseCity.value.length === 0){
    printErrorInHtml("Debe elegír una Ciudad, el campo no puede quedar vacío.");
    return false;
  }else{
    return true;
  }
}