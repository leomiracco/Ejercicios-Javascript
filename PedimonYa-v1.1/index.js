import { Controller } from "./Controller/controller.js";

const app = new Controller();

document.addEventListener("DOMContentLoaded", () => {
  app.run();
});