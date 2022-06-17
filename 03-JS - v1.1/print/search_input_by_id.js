import { organize } from "../organize/organize.js";

export const searchInputById = {
  start(){
    organize.getInputId().focus();
    document.addEventListener("click", this.IdEntryWithButton);

    document.addEventListener("keyup", (e)=>{
      this.inputIdColor(e);
      this.inputIdWithEnter(e);
    });

    this.render("start");
  },
  
  render(color){  
    (color === "start") ? organize.getInputId().style = "color: white; background-color: hsl(40, 10%, 5%, 0.9)" : (
      (color === "greenColor") ? organize.getInputId().style = "color: white; background-color: hsl(120, 87%, 35%)" : (
        organize.getInputId().style = "color: white; background-color: hsl(0, 80%, 61%)"
      )
    )
  },

  inputIdColor(e){
    organize.validateInputIdForColor(e);
  },
  
  inputIdWithEnter(e){
    organize.validateInputIdWithEnter(e);
  },

  IdEntryWithButton(e){
    organize.validateInputIdWithButton(e);
  },
}