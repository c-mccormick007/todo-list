import _ from 'lodash';
import Task from './task.js';
import renderTask from './dom.js'

const button = document.createElement("button")
button.innerHTML = "Add Task";

let taskTest = new Task("Get this project done", "Work on todo project", "3/3/23", "Extra high");

const parentElement = document.body

parentElement.appendChild(button)

button.onclick = function() {
 
  renderTask(taskTest)
}