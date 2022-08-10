export class ErrorMessageView{

  errorMessageContainer;

  constructor(){
    this.errorMessageContainer = document.querySelector("#error-message-container");
  }

  update(errorMessage, state){
    if(state === "Error"){
      this.errorMessageContainer.innerHTML = `
        <p class="errorMessage">${errorMessage}</p>
      `;
    }
  }
}