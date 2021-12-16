var formEl = document.querySelector ("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var tasks = [];

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// set new values
taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;

// loop through tasks array and task object with new content
for (var i = 0; i < tasks.length; i++) {
  if (tasks[i].id === parseInt(taskId)) {
    tasks[i].name = taskName;
    tasks[i].type = taskType;
  }
  
};

saveTasks()

  

alert("Task Updated!");
formEl.removeAttribute("data-task-id");
document.querySelector("#save-task").textContent = "Add Task";
  };

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
  type: taskTypeInput,
  status: "to do"
}

  var isEdit = formEl.hasAttribute("data-task-id");

// PUT THIS BELOW `var isEdit = ...` in `taskFormHandler()`

// has data attribute, so get task id and call function to complete edit process
if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } 
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
  
    createTaskEl(taskDataObj);
  }
};
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
  listItemEl.appendChild(taskActionsEl);

  switch (taskDataObj.status) {
    case "to do":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
      tasksToDoEl.append(listItemEl);
      break;
    case "in progress":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
      tasksInProgressEl.append(listItemEl);
      break;
    case "completed":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
      tasksCompletedEl.append(listItemEl);
      break;
    default:
      console.log("Something went wrong!");
  }

taskDataObj.id = taskIdCounter;

tasks.push(taskDataObj);

saveTasks()
  

//increase task counter for next unique ID
taskIdCounter++;


};

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

    // create new array to hold updated list of tasks
var updatedTaskArr = [];

// loop through current tasks
for (var i = 0; i < tasks.length; i++) {
  // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
  if (tasks[i].id == parseInt(taskId)) {
    updatedTaskArr.push(tasks[i]);
  }
}

// reassign tasks array to be the same as updatedTaskArr
tasks = updatedTaskArr;

saveTasks()
  

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

  var taskStatusChangeHandler = function(event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // update task's in tasks array
for (var i = 0; i < tasks.length; i++) {
  console.log(tasks);
  if (tasks[i].id === parseInt(taskId)) {
    tasks[i].status = statusValue;
  }
}
saveTasks()

};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


//Gets task items from localStorage.

var loadTasks = function() {
  //set savedTasks variable
 var savedTasks = localStorage.getItem("tasks");
  console.log(savedTasks)

if(savedTasks === "Null"){
  return false;
}
console.log("Saved tasks found!");
  // else, load up saved tasks

  // parse into array of objects
  savedTasks = JSON.parse(savedTasks);
  console.log(savedTasks)

  // loop through savedTasks array
  for (var i = 0; i < savedTasks.length; i++) {
    // pass each task object into the `createTaskEl()` function
    createTaskEl(savedTasks[i]);
  }
};





//Iterates through a tasks array and creates task elements on the page from it.

pageContentEl.addEventListener( "click", taskButtonHandler);


pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();