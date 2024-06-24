
/* Main JS file
    the main file is the core for all pages and make
    any change for all, you can handle all the project
    by use it.
*/


function classOperation(elementID,className, operation) {
    const el  = document.querySelector(elementID);
    if(operation == 'add') {
        el.classList.add(className);
    } else if(operation == 'toggle') {
        el.classList.toggle(className);
    } else if(operation == 'remove') {
        el.classList.remove(className);
    }
}