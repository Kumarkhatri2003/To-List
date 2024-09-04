const taskinput = document.getElementById("task");
const addbtn = document.getElementById("add");
const tasklist = document.getElementsByClassName("task-list")[0];

window.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

addbtn.addEventListener('click', () => {
  if (taskinput.value.trim() !== "") {
    const newtask = document.createElement('li'); // Create a new list item

    // Create a new checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; // Set the checkbox type
    checkbox.style.display = 'none'; // Hide the original checkbox

    // Create a custom checkbox
    const customCheckbox = document.createElement('span');
    customCheckbox.className = 'custom-checkbox';

    // Add event listener to handle checkbox change
    customCheckbox.addEventListener('click', () => {
      if (checkbox.checked) {
        checkbox.checked = false; // Uncheck the original checkbox
        customCheckbox.classList.remove('checked'); // Unmark the custom checkbox
        newtask.classList.remove('completed'); // Unmark task as completed
      } else {
        checkbox.checked = true; // Check the original checkbox
        customCheckbox.classList.add('checked'); // Mark the custom checkbox
        newtask.classList.add('completed'); // Mark task as completed
      }
      SaveTasksToLocalStorage();
    });

    // Create a remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    // Add event listener to handle task removal
    removeBtn.addEventListener('click', () => {
      tasklist.removeChild(newtask); // Remove the task from the list
      SaveTasksToLocalStorage();
    });

    newtask.appendChild(checkbox); // Add the hidden checkbox to the list item
    newtask.appendChild(customCheckbox); // Add the custom checkbox to the list item
    newtask.appendChild(document.createTextNode(taskinput.value)); // Add the task text to the list item
    newtask.appendChild(removeBtn); // Add the remove button to the list item
    tasklist.appendChild(newtask); // Add the new task to the task list
    taskinput.value = ''; // Clear the input field

    SaveTasksToLocalStorage(); // Ensure this is called after adding a new task
  } else {
    alert("No task added. Please enter a task."); // Alert if input is empty
  }
});

// Function to save tasks to local storage
function SaveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll(".task-list li").forEach((taskItem) => {
    const text = taskItem.childNodes[2].textContent.trim();
    const completed = taskItem.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const newtask = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.display = 'none';

    const customCheckbox = document.createElement('span');
    customCheckbox.className = 'custom-checkbox';
    if (task.completed) {
      checkbox.checked = true;
      customCheckbox.classList.add('checked');
      newtask.classList.add('completed');
    }

    customCheckbox.addEventListener('click', () => {
      if (checkbox.checked) {
        checkbox.checked = false;
        customCheckbox.classList.remove('checked');
        newtask.classList.remove('completed');
      } else {
        checkbox.checked = true;
        customCheckbox.classList.add('checked');
        newtask.classList.add('completed');
      }
      SaveTasksToLocalStorage();
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      tasklist.removeChild(newtask);
      SaveTasksToLocalStorage();
    });

    newtask.appendChild(checkbox);
    newtask.appendChild(customCheckbox);
    newtask.appendChild(document.createTextNode(task.text));
    newtask.appendChild(removeBtn);
    tasklist.appendChild(newtask);
  });
}
