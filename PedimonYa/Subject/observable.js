export class Observable{
  constructor(){
    this.observers = [];
  }

  subscribe(observer){
    this.observers.push(observer);
  }

  unsubscribe(observer){
    this.observers = this.observers.filter((obs)=> obs !== observer);
  }

  notify(data){
    this.observers.map((observer)=>{ observer(data); });
  }
}