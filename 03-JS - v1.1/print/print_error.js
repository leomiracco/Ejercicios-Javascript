import { organize } from "../organize/organize.js";

export const printError = {
  
  start(){
    this.wrongContainerId = document.createElement("div");
    this.wrongContainerId.setAttribute("class", "wrong-id-container-disabled");
    this.wrongContainerId.classList.replace("wrong-id-container-disabled", "wrong-container-id");
  },
  
  render(error){
    this.deleteMainContainer();

    this.wrongContainerId.innerHTML = `
      <p class="wrong-id">${error}</p>
    `;
    
    (organize.getMainContainer().firstChild) ? organize.getMainContainer().insertBefore(this.wrongContainerId, organize.getMainContainer().firstChild) : organize.getMainContainer().appendChild(this.wrongContainerId);
  },

  deleteMainContainer(){
    while(this.wrongContainerId.firstChild){
      this.wrongContainerId.removeChild(this.wrongContainerId.firstChild);
    };
  }
}