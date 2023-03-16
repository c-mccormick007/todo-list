import _ from 'lodash';
import Task from './task.js';

const button = document.createElement("button")
button.innerHTML = "Add Task";

let task = new Task("Have aids", "3/3/23", "Extra high");

const parentElement = document.body

parentElement.appendChild(button)

button.onclick = function() {
  console.log(task.getPriority);
}