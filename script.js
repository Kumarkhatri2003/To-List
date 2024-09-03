const taskinput = document.getElementById("task");
const addbtn = document.getElementById("add");
const tasklist = document.getElementsByClassName("task-list")[0];

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
    });

    // Create a remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';

    // Add event listener to handle task removal
    removeBtn.addEventListener('click', () => {
      tasklist.removeChild(newtask); // Remove the task from the list
    });

    newtask.appendChild(checkbox); // Add the hidden checkbox to the list item
    newtask.appendChild(customCheckbox); // Add the custom checkbox to the list item
    newtask.appendChild(document.createTextNode(taskinput.value)); // Add the task text to the list item
    newtask.appendChild(removeBtn); // Add the remove button to the list item
    tasklist.appendChild(newtask); // Add the new task to the task list
    taskinput.value = ''; // Clear the input field
  } else {
    alert("No task added. Please enter a task."); // Alert if input is empty
  }
});