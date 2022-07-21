import { InitialState } from "../Models/stateGetInfo.js";
import { Observable } from "../Subject/observable.js";
import { ViewEvents } from "../Views/viewEvents.js";
import { WritenView } from "../Views/writenView.js";

export class Controller {
  constructor() {
    this.viewEvents = new ViewEvents();
    this.writeView = new WritenView();
    this.observableUpdatePokes = new Observable();

    this.state = new InitialState(this);

    this.viewEvents.observableClickEvent.subscribe((e)=>{
      this.validateState(e, this.state);
    });
    
    this.state.observableStartLoad.subscribe((data) => {
      this.writeView.render(data);
    });
  }

  setState(state){
    this.state = state;
  }

  validateState(e, state){
    if(e.target.matches("#container-id-forward-button *")){
      state.changeToNextState();
    }
    if(e.target.matches("#container-id-back-button *")){
      state.changeToBackState();
    }
  }

  run() {
    this.viewEvents.start();
    this.viewEvents.event();
  }
}