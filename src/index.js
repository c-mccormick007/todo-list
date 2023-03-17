import _ from 'lodash';
import './style.css'
import Task from './task.js';
import {renderTask , renderMain, renderTaskInput} from './dom.js'

renderMain();

let taskButton = document.querySelector('.taskbutton');

taskButton.onclick = function() {
  renderTaskInput();
}
