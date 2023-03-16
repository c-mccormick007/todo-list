export default class Task {
    constructor(name, date, priority){
        this._name = name;
        this._date = date;
        this._priority = priority; 
    }

   get getName(){
    return this._name;
   }
   get getDate(){
    return this._date;
   }
   get getPriority(){
    return this._priority;
   }

   
}