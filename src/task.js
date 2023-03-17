export default class Task {
    constructor(name, description, date, priority){
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority; 
        this.status = "Not Done";
    }

  /* get getName(){
    return this._name;
   }
   get getDate(){
    return this._date;
   }
   get getPriority(){
    return this._priority;
   }
   get getDescription(){
    return this._description;
   }
   get getStatus(){
    return this._status;
   } */
}
