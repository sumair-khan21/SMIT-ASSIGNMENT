const supabaseUrl = "https://vmcveofukestnfhmkbcr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtY3Zlb2Z1a2VzdG5maG1rYmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2ODgzNDMsImV4cCI6MjA2OTI2NDM0M30.MJ-cpe6IGG5wAG9lQleKb8jBKkB3CSNYp91L8B4NvfA";

const client = supabase.createClient(supabaseUrl, supabaseKey);

let submitBtn = document.getElementById("submit");
let todoList = document.getElementById("todo_list");
let inputField = document.getElementById("data");
let editingId = null;

submitBtn.addEventListener("click", async () => {
  const todoText = inputField.value.trim();
  if (!todoText){
    // alert("Please enter a todo item.");
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Please enter a todo item.",
});
    return;
  }

  if (editingId) {
    // UPDATE
    const { error } = await client
      .from("todo")
      .update({ todo_text: todoText })
      .eq("id", editingId);

    if (error) {
      console.error("Update Error:", error.message);
      return;
    }

    // alert("Todo updated successfully!");
    Swal.fire({
//   title: "Good job!",
  text: "Todo updated successfully!",
  icon: "success"
});
// wapas insert mood mai chale jata hy
    editingId = null;
    submitBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Launch';
  } else {
    // INSERT
    const { error } = await client.from("todo").insert({ todo_text: todoText });

    if (error) {
      console.error("Insert Error:", error.message);
      return;
    }

    // alert("Todo added successfully!");
        Swal.fire({
//   title: "Good job!",
  text: "Todo added successfully!",
  icon: "success"
});

  }

  inputField.value = "";
  show();
});

// Show all todos
async function show() {
  const { data, error } = await client.from("todo").select("*");
  if (error) {
    console.error("Fetch Error:", error.message);
    return;
  }

  todoList.innerHTML = "";

  if (data.length === 0) {
    todoList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-clipboard-list"></i>
                        <h3>Ready for Launch</h3>
                        <p>Your mission control is empty. Add your first task to begin!</p>
                    </div>`;
    return;
  }

  data.forEach((todo) => {
    todoList.innerHTML += `
                    <li>
                        <div class="todo-text">${todo.todo_text}</div>
                        <div class="todo-actions">
                            <button class="edit-btn" onclick="editTodo(${todo.id})">
                                <i class="fas fa-edit"></i>
                                Modify
                            </button>
                            <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                                <i class="fas fa-trash-alt"></i>
                                Remove
                            </button>
                        </div>
                    </li>`;
  });
}

// Delete todo
async function deleteTodo(id) {
  const { error } = await client.from("todo").delete().eq("id", id);
  if (error) {
    console.error("Delete Error:", error.message);
    return;
  }
//   alert("Todo deleted");
    Swal.fire({
        icon: "success",
        title: "Todo deleted successfully!",
        showConfirmButton: false,
        timer: 1500
    });

  show();
}

// Edit todo
async function editTodo(id) {
  const { data, error } = await client
    .from("todo")
    .select("todo_text")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Edit Error:", error.message);
    return;
  }

  inputField.value = data.todo_text;
  editingId = id;
  submitBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Update';
}

show(); // Initial load
