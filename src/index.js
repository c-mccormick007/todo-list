import _ from 'lodash';
import './style.css'
import Task from './task.js';
import {logData , renderMain, renderTaskInput} from './dom.js'

renderMain();

let taskButton = document.querySelector('.taskbutton');

taskButton.onclick = function() {
  renderTaskInput();
  let noTasks = document.querySelector('.notasks');
  if (!noTasks){
    console.log("there is tasks.")
  }else{
  noTasks.remove();
  }
}
