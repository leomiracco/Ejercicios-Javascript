export class Observable{
  constructor(){
    this.observers = [];
  }
  subscribe(o){
    this.observers.push(o);
  }
  unsuscribe(o){
    this.observers = this.observers.filter((obs)=>obs != o);
  }
  notify(data){
    if(this.observers.length > 0){
      this.observers.map((observer)=>{
        observer.update(data);
      });
    }
  }
}