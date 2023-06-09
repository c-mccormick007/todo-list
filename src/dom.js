import { remove } from "lodash";
import Task from "./task";
import {Project} from "./task";


let TASKARRAY = []
let PROJECTARRAY = []

export function renderMain(){
  

const body = document.body;
const navbar = document.getElementById('navbar')
const tasks = document.getElementById('taskcontainer')



if (JSON.parse(localStorage.getItem('TASKARRAY')) == null){
  console.log("INIT STORAGE.");
  makeDefaultProject();
}else{
let check = JSON.parse(localStorage.getItem('TASKARRAY'));
length = check.length;
}

if (JSON.parse(localStorage.getItem('TASKARRAY')) == null){
    console.log("INIT STORAGE...");
    const noTasks = document.createElement("div");
    noTasks.innerHTML = "You have not made any tasks yet. Click the blue plus to create one now!"
    noTasks.className = "notasks";
    tasks.appendChild(noTasks);
}else if (length === 0 && JSON.parse(localStorage.getItem('TASKARRAY')) !== null){
  
  const noTasks = document.createElement("div");
  const projectData = JSON.parse(localStorage.getItem('PROJECTARRAY'));

    for (let j = 0; j < projectData.length; j++){
      const project = new Project(projectData[j].name, projectData[j].dueDate, projectData[j].priority)
      PROJECTARRAY.push(project);
    }
  logData()
  noTasks.innerHTML = "You have completed all your tasks! Click the blue + to add more."
  noTasks.className = "notasks";
  tasks.appendChild(noTasks);
}
else{
    const taskData = JSON.parse(localStorage.getItem('TASKARRAY'));
    for (let i = 0; i < taskData.length; i++){
    const projectData = JSON.parse(localStorage.getItem('PROJECTARRAY'));

    for (let j = 0; j < projectData.length; j++){
      const project = new Project(projectData[j].name, projectData[j].dueDate, projectData[j].priority)
      PROJECTARRAY.push(project);
    }
    
      
        const task = new Task(taskData[i].name, taskData[i].description, taskData[i].date, taskData[i].priority, taskData[i].project)
        TASKARRAY.push(task);
        logData();
    }
}




const createTaskButton = document.createElement("button")
createTaskButton.innerHTML = "+";
createTaskButton.className = "taskbutton button";

const createProjectButton = document.createElement("button")
createProjectButton.innerHTML = "+";
createProjectButton.className = "projectbutton button";



navbar.appendChild(createTaskButton)
navbar.appendChild(createProjectButton)

makeTaskButtons();

}

export function makeDefaultProject(){
  let newProj = new Project("Default Project", "", "Low")
  PROJECTARRAY.push(newProj)
  localStorage.setItem('PROJECTARRAY', JSON.stringify(PROJECTARRAY))
}

export function makeTaskButtons(){
  let task = document.body.querySelectorAll('.task');
  task.forEach(task => {
    task.addEventListener("click", function() {
      const div = this.closest('.task');
      const id = div.getAttribute('id');
      toggleDescription(id)
    });
  });
}

export function toggleDescription(taskId) {
  const task = document.getElementById(taskId);
  const descriptionDiv = task.querySelector('.description');
  const doneBtn = task.querySelector('.donebutton');

  if (descriptionDiv) {
    descriptionDiv.remove();
    doneBtn.remove();
  } else {
    let arrayIndex = getIndexById(TASKARRAY, taskId)
    const description = TASKARRAY[arrayIndex].description;
    const descriptionDiv = document.createElement("div");
    const doneButton = document.createElement('button');
    doneButton.innerHTML = "Finish";
    doneButton.classList = "donebutton";
    descriptionDiv.innerHTML = description;
    descriptionDiv.className = "description";
    task.appendChild(descriptionDiv);
    task.appendChild(doneButton);

    doneButton.addEventListener("click", onDoneButtonClick);
  }
}

export function getIndexById(arr, id){
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === Number(id)) {
      return i;
    }
  }
  return -1;
}

export function onDoneButtonClick(event){
    const task = event.target.closest('.task');
    const id = task.getAttribute('id');
    const index = getIndexById(TASKARRAY, id)

    event.stopPropagation();
    task.remove();
    TASKARRAY.splice(index, 1);

    localStorage.setItem('TASKARRAY', JSON.stringify(TASKARRAY))
    if (TASKARRAY.length === 0 && JSON.parse(localStorage.getItem('TASKARRAY')) !== null){
  
      const noTasks = document.createElement("div");
      noTasks.innerHTML = "You have completed all your tasks! Click the blue + to add more."
      noTasks.className = "notasks";
      document.getElementById('taskcontainer').appendChild(noTasks);
    }
}

export function renderTaskInput(){
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

export function createProjectForm() {
  const overlay = document.createElement("div")

  overlay.className = "overlay";
  document.body.appendChild(overlay);
  
  const form = document.createElement('form');
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'Enter project name';
    nameInput.required = true;
    form.appendChild(nameInput);
  
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';
    nameInput.required = true;
    form.appendChild(dateInput);
  
    const prioritySelect = document.createElement('select');
    prioritySelect.name = 'priority';
  
    const priorityOptions = ['Low', 'Medium', 'High'];
    for (let option of priorityOptions) {
      const priorityOption = document.createElement('option');
      priorityOption.value = option;
      priorityOption.text = option;
      prioritySelect.appendChild(priorityOption);
    }
    form.appendChild(prioritySelect);
  
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Create Project';
    submitButton.classList = "submit";
    form.appendChild(submitButton);

    form.className = "form";
    
    document.body.appendChild(form);
  
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const project = new Project(nameInput.value, dateInput.value, prioritySelect.value)

        PROJECTARRAY.push(project);
        const inputs = form.querySelectorAll('input:not([type="submit"])');
        inputs.forEach(input => (input.value = ""));
        localStorage.setItem('PROJECTARRAY', JSON.stringify(PROJECTARRAY))
        
        const overlay = document.querySelector('.overlay');
        form.remove();
        overlay.remove();
        
        logData();
        makeTaskButtons();
        
    });
}

export function createTaskForm() {
    const form = document.createElement('form');
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'Enter task name';
    nameInput.required = true;
    form.appendChild(nameInput);
  
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.name = 'description';
    descriptionInput.placeholder = 'Enter task description';
    descriptionInput.required = true;
    form.appendChild(descriptionInput);
  
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';
    nameInput.required = true;
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
    
    const projectOptions = [];

    for (let i = 0; i < PROJECTARRAY.length; i++){
      projectOptions.push(PROJECTARRAY[i].name)
    }

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
    submitButton.classList = "submit";
    form.appendChild(submitButton);

    form.className = "form";
    
    document.body.appendChild(form);
  
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const task = new Task(nameInput.value, descriptionInput.value, dateInput.value, prioritySelect.value,projectSelect.value)

        TASKARRAY.push(task);
        let projID = getProjectId(projectSelect.value)
        const inputs = form.querySelectorAll('input:not([type="submit"])');
        inputs.forEach(input => (input.value = ""));
        localStorage.setItem('TASKARRAY', JSON.stringify(TASKARRAY))
        
        const overlay = document.querySelector('.overlay');
        form.remove();
        overlay.remove();
        
        logData();
        makeTaskButtons();
        
    });
  }

export function orderByUrgency(arr){
  const urgencyObj = {
    "Urgent": 1,
    "High": 2,
    "Medium": 3,
    "Low": 4
  };

  const taskUrgencyPairs = arr.map(task => ({
    task: task,
    urgency: urgencyObj[task.priority]
  }));

  
  taskUrgencyPairs.sort((a, b) => a.urgency - b.urgency);
  let result = taskUrgencyPairs.map(pair => pair.task);
  return result
}

export function renderProject(){

  PROJECTARRAY = orderByUrgency(PROJECTARRAY)
  const taskContainer = document.getElementById('taskcontainer')
  for (let i = 0; i < PROJECTARRAY.length; i++){
    const project = document.createElement('div')
    project.className = `project`;
    project.setAttribute('id', `${PROJECTARRAY[i].id}`)
    if (PROJECTARRAY[i].priority === "Urgent"){
      project.className += ' urgent';
    }else if (PROJECTARRAY[i].priority === "High"){
      project.className += ' high';
    }else if (PROJECTARRAY[i].priority === "Medium"){
      project.className += ' medium';
    }
    const nameDiv = document.createElement('div');
    nameDiv.className = 'taskname';
    nameDiv.innerHTML = `${PROJECTARRAY[i].name}`
    const dateDiv = document.createElement('div');
    nameDiv.innerHTML = `${PROJECTARRAY[i].name}`
    project.appendChild(nameDiv);
    taskContainer.appendChild(project)

}
}


export function logData(){

    const currentTasks = document.getElementById('taskcontainer')
    currentTasks.innerHTML = '';


    const tasks = document.getElementById('taskcontainer')
    
    TASKARRAY = orderByUrgency(TASKARRAY);
    
    renderProject();

    for (let i = 0; i < TASKARRAY.length; i++){
      console.log(TASKARRAY[i].project)
        let currentProject = getProjectId(TASKARRAY[i].project)
        console.log(currentProject)
        let currentProjectDiv = document.getElementById(currentProject);
        console.log(currentProjectDiv);
        const task = document.createElement('div')
        task.className = `task`;
        task.setAttribute('id', `${TASKARRAY[i].id}`)
        if (TASKARRAY[i].priority === "Urgent"){
          task.className += ' urgent';
        }else if (TASKARRAY[i].priority === "High"){
          task.className += ' high';
        }else if (TASKARRAY[i].priority === "Medium"){
          task.className += ' medium';
        }
        const nameDiv = document.createElement('div');
        nameDiv.className = 'taskname';
        nameDiv.innerHTML = `${TASKARRAY[i].name}`
        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        let date = new Date(TASKARRAY[i].date);
        let formattedDate = date.toLocaleDateString('en-US');
        dateDiv.innerHTML = `${formattedDate}`
        nameDiv.innerHTML = `${TASKARRAY[i].name}`
        task.appendChild(nameDiv);
        task.appendChild(dateDiv);
        currentProjectDiv.appendChild(task);
    }
}

export function getProjectId(name){
  console.log(PROJECTARRAY)
  for (let i = 0; i < PROJECTARRAY.length; i++) {
    if (PROJECTARRAY[i].name === name) {
      return PROJECTARRAY[i].id;
    }
  }
  return null
}