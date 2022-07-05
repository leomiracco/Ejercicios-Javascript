import { connectionWithApi } from "./js/api_query.js";
import { cleanHtml } from "./js/clean_html.js";
import { validateInputs } from "./js/validate_inputs.js";

export const d = document;
const responseContainer = d.querySelector("#response-container");
const apiKey = import.meta.env.VITE_API_KEY;

const beginning = (e)=>{
  const chooseCountry = d.querySelector("#country");
  const chooseCity = d.querySelector("#city");

  if(e.target.id === "search" && e.keyCode !== 9 || e.keyCode === 13){
    cleanHtml(responseContainer);
    if(validateInputs(chooseCountry, chooseCity)){
      connectionWithApi(chooseCountry.value, chooseCity.value, apiKey);
    }else{
      null;
    }
  }
}

d.addEventListener("DOMContentLoaded", ()=>{
  d.addEventListener("click", beginning);
  d.addEventListener("keyup", beginning);
});