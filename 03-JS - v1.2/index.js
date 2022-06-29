import { Controller } from "./Controller/controller.js";
import { Model } from "./Model/model.js";
import { View } from "./Views/view.js";

const main = ()=>{
  let model = new Model();
  let controller = new Controller(model);
  let view = new View(controller);
}

document.addEventListener("DOMContentLoaded", main);