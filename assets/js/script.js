var formEl = document.querySelector ("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");



var taskFormHandler = function() {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
if (!taskNameInput || !taskTypeInput) {
window.alert("Task cannot be blank");
return false;
}
formEl.reset();
// package up data as an object
    var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  


  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
}
var createTaskEl = function(taskDataObj){
    var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// Add task ID as a custom attributes// 
listItemEl.setAttribute("Data-task-id",taskIdCounter);

// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
listItemEl.appendChild(taskInfoEl);

var taskActionsEl = createTaskActions(taskIdCounter);

listItemEl.appendChild(taskActionsEl)
// add entire list item to page
tasksToDoEl.appendChild(listItemEl);

//increase task counter for next unique ID
taskIdCounter++;

}

var createTaskActions = function(taskId) {
    //Creating button container
var actioncontainerEl = document.createElement("div");
actioncontainerEl.className = "task-actions";
    // Creating edit buttton
var editButtonEl = document.createElement("button");
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id" , taskId);
// append edit buton
actioncontainerEl.appendChild(editButtonEl);
//create delete buttom
var deleteButtonEl = document.createElement("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);
//append delete button
actioncontainerEl.appendChild(deleteButtonEl);
// creating select dropdown
var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name","status-change");
statusSelectEl.setAttribute("data-task-id", taskId);
// append to div
actioncontainerEl.appendChild(statusSelectEl);
// create option array
var statusChoices = ["To Do", "In Progress", "Completed"];

for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
statusOptionEl.textContent = statusChoices[i];
statusOptionEl.setAttribute("value", statusChoices[i]);
   // append to select
   statusSelectEl.appendChild(statusOptionEl);
}

return actioncontainerEl;

};

formEl.addEventListener("submit", taskFormHandler);
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function(taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");


  //get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;


document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
document.querySelector("#save-task").textContent = "Save Task";
formEl.setAttribute("data-task-id", taskId);

};

// other logic...
var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
  
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
  };
  
pageContentEl.addEventListener( "click", taskButtonHandler);