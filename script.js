const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const filterSelect = document.getElementById("filter");

let todos = []; // Track todos in an array for filtering purposes

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  const todo = {
    text: text,
    status: 'pending', // Default status is 'pending'
  };

  todos.push(todo);
  renderTodos();
  todoInput.value = "";
}

function editTodo(span) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;
  span.replaceWith(input);
  input.focus();

  input.onblur = () => {
    span.textContent = input.value.trim() || "Untitled";
    input.replaceWith(span);
  };
}

function toggleCompletion(todoItem) {
  todoItem.classList.toggle('completed');
  const todoIndex = Array.from(todoList.children).indexOf(todoItem);
  todos[todoIndex].status = todoItem.classList.contains('completed') ? 'completed' : 'pending';
}

function deleteTodo(todoItem) {
  const todoIndex = Array.from(todoList.children).indexOf(todoItem);
  todos.splice(todoIndex, 1);
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = ""; // Clear the list
  const filteredTodos = filterTodos();

  filteredTodos.forEach(todo => {
    const li = document.createElement("li");
    if (todo.status === 'completed') li.classList.add('completed');

    const span = document.createElement("span");
    span.textContent = todo.text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editTodo(span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => deleteTodo(li);

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = todo.status === 'pending' ? "✅" : "❌";
    toggleBtn.onclick = () => toggleCompletion(li);

    li.append(span, toggleBtn, editBtn, delBtn);
    todoList.appendChild(li);
  });
}

function applyFilter() {
  renderTodos();
}

function filterTodos() {
  const filterValue = filterSelect.value;
  if (filterValue === 'all') {
    return todos;
  }
  return todos.filter(todo => todo.status === filterValue);
}
