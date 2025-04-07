const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => editTodo(span);

  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";
  delBtn.onclick = () => li.remove();

  li.append(span, editBtn, delBtn);
  todoList.appendChild(li);
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
