import _ from 'lodash';
import './style.css'
import Task from './task.js';
import {createProjectForm, logData , renderMain, renderProject, renderTaskInput} from './dom.js'

renderMain();

let taskButton = document.querySelector('.taskbutton');
let projectButton = document.querySelector('.projectbutton')

taskButton.onclick = function() {
  renderTaskInput();
  let noTasks = document.querySelector('.notasks');
  if (!noTasks){
    console.log("there is tasks.")
  }else{
  noTasks.remove();
  }
}

projectButton.onclick = function() {
  createProjectForm();
}
