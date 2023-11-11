//@ts-check
import {update} from './ssr.js';

// define functions
let beforeUpdate = ()=>{};
let afterUpdate = ()=>{};

// Main div
let mainDiv = document.createElement('div');
mainDiv.id = 'mainDiv';
document.body.appendChild(mainDiv);



// Start of code



// End of code
export { beforeUpdate, afterUpdate };
update();