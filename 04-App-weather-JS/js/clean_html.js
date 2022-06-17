export const cleanHtml = (responseContainer)=>{
  while (responseContainer.firstChild){
    responseContainer.removeChild(responseContainer.firstChild);
  }
}