export default class Task {
    static nextId = 1;

    constructor(name, description, date, priority, project){
        this.id = Task.nextId++;
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority; 
        this.project = project;
        this.status = "Not Done";
    }
}

export class Project {
    constructor(name, dueDate, priority){
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority; 
        this.status = "Not Done";
    }
}
