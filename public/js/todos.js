let todos = [];

function addTodo() {
  const id=document.getElementById("todoId").value;
  const task = document.getElementById("task").value;
  const priority = document.getElementById("priority").value;
  if (task === "") return;

  // Check for duplicate task with same priority
  const duplicate = todos.find(
    (todo) => todo.task.toLowerCase() === task.toLowerCase() && todo.priority === priority && todo.id != id
  );
  if (duplicate) {
    alert("A task with the same name and priority already exists!");
    return;
  }
  if(id!=""){
    const todo=todos.find((todo)=>todo.id==id);
    todo.task=task;
    todo.priority=priority;
    todo.striked=false;
  }else{
    const todo = {
    id: new Date().getTime(),
    task: task,
    priority: priority,
    striked: false,
  };
  todos.push(todo);
}
document.getElementById("task").value="";
document.getElementById("todoId").value="";
  renderTodos();
}
function deleteTodo(id){
todos=todos.filter((todo)=>todo.id!=id);
renderTodos();
}
function editTodo(id){
const todo=todos.find((todo)=>todo.id==id);
document.getElementById("todoId").value=todo.id;
document.getElementById("task").value=todo.task;
document.getElementById("priority").value=todo.priority;
}
function strikethrough(id){
const changed=todos.find((todo)=>todo.id==id);
todos=todos.filter((todo)=>todo.id!=id);
changed.striked=changed.striked?false:true;
todos.push(changed);
renderTodos();
}
function renderTodos() {
  const tbody = document.getElementById("todosList"); 
  const priorityOrder = {
    "high": 1,
    "medium": 2,
    "low": 3
  };

  // Sort todos: first by striked status, then by priority
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.striked !== b.striked) {
      return a.striked ? 1 : -1; // striked goes to the bottom
    }
    return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
  });
  let strTodos = "";
  sortedTodos.forEach((todo) => {
    if(todo.striked){
      strTodos+=`<tr>
      <td class="d-none">${todo.id}</td>
      <td><del>${todo.task}</del></td>
      <td><button type="button" class="btn btn-light" onclick="strikethrough(${todo.id})">Unmark</button></td>
      </tr>`;
    }
    else{
    strTodos += `<tr>
            <td class="d-none">${todo.id}</td>
            <td>${todo.task}</td>
            <td>${todo.priority}</td>
            <td><button type="button" class="btn btn-warning" onclick="editTodo(${todo.id})">Update</button></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteTodo(${todo.id})">Delete</button></td>
            <td><button type="button" class="btn btn-light" onclick="strikethrough(${todo.id})">Mark complete</button></td>
        </tr>`;
    }
  });
  tbody.innerHTML = strTodos;
}
