import { connectionWithApi } from "./api_query.js";
import { cleanHtml } from "./clean_html.js";
import { validateInputs } from "./validate_inputs.js";

export const d = document;
const responseContainer = d.querySelector("#response-container");

const beginning = (e)=>{
  const chooseCountry = d.querySelector("#country");
  const chooseCity = d.querySelector("#city");
  const apiKey = `2cb3d5541c4c31d5bfe0350669a0ec61
  `;

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