export const validateJson = (json)=>{
  return (json.main === undefined) ? false : true;
}