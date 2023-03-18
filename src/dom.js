import { remove } from "lodash";
import Task from "./task";


let TASKARRAY = []

export function renderMain(){
  

const body = document.body;
const navbar = document.getElementById('navbar')
const tasks = document.getElementById('taskcontainer')



if (JSON.parse(localStorage.getItem('TASKARRAY')) == null){
    console.log("INIT STORAGE...");
    const noTasks = document.createElement("div");
    noTasks.innerHTML = "You have not made any tasks yet. Click the blue plus to create one now!"
    noTasks.className = "notasks";
    tasks.appendChild(noTasks);
}else{
    const taskData = JSON.parse(localStorage.getItem('TASKARRAY'));

    for (let i = 0; i < taskData.length; i++){
        const task = new Task(taskData[i].name, taskData[i].description, taskData[i].date, taskData[i].priority, taskData[i].project)
        TASKARRAY.push(task)
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
      console.log(i)
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
  
    const projectOptions = ["Projects not available yet."];
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
    
      TASKARRAY.push(task);
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

export function logData(){

    const currentTasks = document.getElementById('taskcontainer')
    currentTasks.innerHTML = '';


    const tasks = document.getElementById('taskcontainer')

    for (let i = 0; i < TASKARRAY.length; i++){
        const task = document.createElement('div')
        task.className = `task`;
        task.setAttribute('id', `${TASKARRAY[i].id}`)
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
        tasks.appendChild(task);
    }
}

