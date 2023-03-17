import Task from "./task";

const TASKARRAY = []

export function renderMain(){

const body = document.body;
const navbar = document.getElementById('navbar')

const createTaskButton = document.createElement("button")
createTaskButton.innerHTML = "+";
createTaskButton.className = "taskbutton button";

const createProjectButton = document.createElement("button")
createProjectButton.innerHTML = "+";
createProjectButton.className = "projectbutton button";



navbar.appendChild(createTaskButton)
navbar.appendChild(createProjectButton)


}

export function renderTaskInput(){
    console.log("click")
    const overlay = document.createElement("div")

    overlay.className = "overlay";
    document.body.appendChild(overlay);
    createTaskForm()
}

export function renderTask(task){
    const taskElement = document.createElement('li');
    taskElement.textContent = `Name: ${task.name}`
    document.body.appendChild(taskElement);
}

export function createTaskForm() {
    const form = document.createElement('form');
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'Enter task name';
    form.appendChild(nameInput);
  
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.name = 'description';
    descriptionInput.placeholder = 'Enter task description';
    form.appendChild(descriptionInput);
  
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';
    form.appendChild(dateInput);
  
    const prioritySelect = document.createElement('select');
    prioritySelect.name = 'priority';
  
    const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];
    for (let option of priorityOptions) {
      const priorityOption = document.createElement('option');
      priorityOption.value = option;
      priorityOption.text = option;
      prioritySelect.appendChild(priorityOption);
    }
    form.appendChild(prioritySelect);
  
    const projectSelect = document.createElement('select');
    projectSelect.name = 'project';
  
    const projectOptions = ['Project A', 'Project B', 'Project C'];
    for (let option of projectOptions) {
      const projectOption = document.createElement('option');
      projectOption.value = option;
      projectOption.text = option;
      projectSelect.appendChild(projectOption);
    }
    form.appendChild(projectSelect);
  
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Create Task';
    form.appendChild(submitButton);

    form.className = "form";
    
    document.body.appendChild(form);
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const task = new Task(nameInput.value, descriptionInput.value, dateInput.value, prioritySelect.value,projectSelect.value)
    /*  const task = {
        name: nameInput.value,
        description: descriptionInput.value,
        date: dateInput.value,
        priority: prioritySelect.value,
        project: projectSelect.value,
      }; */
    
      console.log(task);
      TASKARRAY.push(task);
      const inputs = form.querySelectorAll('input:not([type="submit"])');
      inputs.forEach(input => (input.value = ""));
    });
  }

