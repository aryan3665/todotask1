const input = document.getElementById("todoinput");
const addtask = document.getElementById("addTask");
const list = document.getElementById("taskList");

let tasks = [];

addtask.addEventListener("click", function () {
    const tasktext = input.value.trim();
    if (tasktext === "") return;

    const newtask = {
        id: Date.now(),
        text: tasktext,
        completed: false
    };

    tasks.push(newtask);
    input.value = "";

    console.log(tasks);
    renderTask(newtask); // Pass the correct object
});

function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if(task.completed)li.classList.add('completed');
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete">Delete</button>
    `;

   
   li.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON')return;
    task.completed=!task.completed
    li.classList.toggle('completed');
    saveTasks();
   })


   li.querySelector('button').addEventListener('click',(e)=>{
    e.stopPropagation();
    tasks=tasks.filter(t=>t.id!==task.id)
    li.remove();
    saveTasks();
   })

    list.appendChild(li);
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}