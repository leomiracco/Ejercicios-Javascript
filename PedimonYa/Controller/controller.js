import { Model } from "../Model/model.js";
import { View } from "../View/view.js";

export class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();

    this.view.observable.subscribe(() => {
      this.model.getPokemon();
    });

    this.view.secondObservable.subscribe((data) => {
      this.model.eventHandler(data);
    });

    this.view.observableEndsSearch.subscribe(() => {
      this.model.endsSearch();
    });

    this.model.chargePokemonEvent.subscribe((data) => {
      this.view.showPokemonOnPageLoad(data);
    });

    this.model.cleanHtmlEvent.subscribe(() => {
      this.view.cleanHtml();
    });

    this.model.eventShowSpinner.subscribe(() => {
      this.view.showSpinner();
    });
  }

  run() {
    this.view.render();
  }
}