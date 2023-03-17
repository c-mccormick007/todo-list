import _ from 'lodash';
import './style.css'
import Task from './task.js';
import renderTask from './dom.js'


const navbar = document.getElementById('navbar')

const createTaskButton = document.createElement("button")
createTaskButton.innerHTML = "+";
createTaskButton.className = "taskbutton button";

const createProjectButton = document.createElement("button")
createProjectButton.innerHTML = "+";
createProjectButton.className = "projectbutton button";



navbar.appendChild(createTaskButton)
navbar.appendChild(createProjectButton)

createTaskButton.onclick = function() {
}