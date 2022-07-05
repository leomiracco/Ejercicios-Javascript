import { cleanHtml } from "./clean_html.js";
import { kelvinToCelsius } from "./kelvin_to_celsius.js";

const d = document;

const responseContainer = d.querySelector("#response-container");

const showForFiveSec = (responseContainer, tempP, tempMinP, tempMaxP, feelsLikeP, humidityP)=>{
  responseContainer.appendChild(tempP);
  responseContainer.appendChild(tempMinP);
  responseContainer.appendChild(tempMaxP);
  responseContainer.appendChild(feelsLikeP);
  responseContainer.appendChild(humidityP);
  setTimeout(()=>{
    cleanHtml(responseContainer)
  }, 5000);
}

export const printToHtml = (json)=>{
  const { main: {temp, temp_min, temp_max, feels_like, humidity}, weather: [{icon, description}]} = json;

  const tempP = d.createElement("p");
  tempP.setAttribute("class", "temp-p");
  tempP.setAttribute("id", "temp-p");
  
  tempP.textContent = `La temperatura actual es de: ${kelvinToCelsius(temp)}°C`;
  //----------------------------------------------
  const tempMinP = d.createElement("p");
  tempMinP.setAttribute("class", "temp-min-p");
  tempMinP.setAttribute("id", "temp-min-p");
  
  tempMinP.textContent = `La temperatura mínima es de: ${kelvinToCelsius(temp_min)}°C`;
  //----------------------------------------------
  const tempMaxP = d.createElement("p");
  tempMaxP.setAttribute("class", "temp-max-p");
  tempMaxP.setAttribute("id", "temp-max-p");
  
  tempMaxP.textContent = `La temperatura máxima es de: ${kelvinToCelsius(temp_max)}°C`;
  //----------------------------------------------
  const feelsLikeP = d.createElement("p");
  feelsLikeP.setAttribute("class", "feels-like-p");
  feelsLikeP.setAttribute("id", "feels-like-p");
  
  feelsLikeP.textContent = `La sensación térmica es de: ${kelvinToCelsius(feels_like)}°C`;
  //----------------------------------------------
  const humidityP = d.createElement("p");
  humidityP.setAttribute("class", "humidity-p");
  humidityP.setAttribute("id", "humidity-p");
  
  humidityP.textContent = `La humedad es de: ${humidity}%`;
  //-----------------------------
  showForFiveSec(responseContainer, tempP, tempMinP, tempMaxP, feelsLikeP, humidityP);
}

export const printErrorInHtml = (text)=>{
  const errorP = d.createElement("p");
  errorP.setAttribute("class", "error-p");
  errorP.setAttribute("id", "error-p");
  errorP.textContent = text;

  responseContainer.appendChild(errorP);

  errorP.style = "background-color:red; color: white; width: 100rem; text-align: center; border-radius: 10px;";
}