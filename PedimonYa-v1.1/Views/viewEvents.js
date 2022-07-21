import { Observable } from "../Subject/observable.js";

export class ViewEvents{
  constructor(){
    // this.observableLoadScreen = new Observable();
    this.observableClickEvent = new Observable();
  }

  start(){
    // this.observableLoadScreen.notify();
  }
  
  event(){
    document.addEventListener("click", (e)=>{
      this.observableClickEvent.notify(e);
    });
  }
}