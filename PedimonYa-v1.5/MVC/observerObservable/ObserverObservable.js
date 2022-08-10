export class ObserverObservable{
  constructor(){
    this.observers = [];
  }

  subscribe(observer){
    this.observers.push(observer);
  }

  unsubscribe(observer){
    this.observers = this.observers.filter((obs)=> obs !== observer);
  }

  notify(data, state){
    this.observers.map((observer)=>{ observer.update(data, state); });
  }
}