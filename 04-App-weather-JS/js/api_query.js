import { cleanHtml } from "./clean_html.js";
import { printToHtml, printErrorInHtml } from "./print_ to_html.js";
import { validateJson } from "./validate_json.js";

const spinner = document.querySelector("#loading");
const responseContainer = document.querySelector("#response-container");

export const connectionWithApi = async (country, city, apiKey)=>{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

  try {
    spinner.style.display = "block";

    const promiseObject = await fetch(url);
    const objectTransformedToJson = await promiseObject.json();

    (validateJson(objectTransformedToJson)) ? printToHtml(objectTransformedToJson) : (
      cleanHtml(responseContainer),
      printErrorInHtml(`La ciudad no se encuentra o está mal escrita.`));

    spinner.style.display = "none";

  } catch (error) {
    cleanHtml(responseContainer);
    printErrorInHtml(`ocurrió el siguiente error: ${error}`);
  }
}

// const consultaAsync = async () => {
//   try {
//     spinner.style.display = "block";
//     const resultado = await fetch(url);
//     const resulJson = await resultado.json();
//     // mostrarDatos(resulJson);
//     spinner.style.display = "none";
//     console.log(resulJson);
//     // console.log("seguimos");
//   } catch (error) {
//     console.log(error);
//   }
// };