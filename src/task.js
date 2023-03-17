export default class Task {
    constructor(name, description, date, priority, project){
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority; 
        this.project = project;
        this.status = "Not Done";
    }
}

export class Project {
    constructor(name, description, dueDate, priority){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; 
        this.status = "Not Done";
    }
}
