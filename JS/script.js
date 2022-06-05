{
  const tasks = [];

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="list__item">
          <button class="list__button js-done">${task.done ? "✔" : ""}</button>
            <span
            class="list__content ${task.done ? "markedAsDone" : " "}">
              ${task.content}
            </span>
          <button class="list__button list__button--delete js-delete">🗑️</button>
        </li>
      `
    };
    document.querySelector(".js-list").innerHTML = htmlString;
    deleteTaskButton();
    taskDoneButton();
  };

  const deleteTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const deleteTaskButton = () => {
    const deleteButton = document.querySelectorAll(".js-delete");
    deleteButton.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      })
    })
  };

  const toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done
    render();
  };

  const taskDoneButton = () => {
    const taskDoneButton = document.querySelectorAll(".js-done");
    taskDoneButton.forEach((taskDoneButton, index) => {
      taskDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      })
    })
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
      done: false,
    });
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-input").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
    focusOnInput();
  };

  const focusOnInput = () => {
    const NewTaskBox = document.querySelector(".js-input");
    NewTaskBox.focus();
    NewTaskBox.value = "";
  };

  const init = () => {
    render();
    const formElement = document.querySelector(".js-form");
    formElement.addEventListener("submit", onFormSubmit);
  };

  init();
};