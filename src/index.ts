import { v4 as uuidV4 } from "uuid";

type Task = { id: string; title: string; completed: boolean; createdAt: Date }; //set custom type, set types of all key-value pairs in the task object

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks() //when defining array in ts, type goes in front of []
tasks.forEach(addListItem)

form?.addEventListener("submit", (e) => {
    //if form is submitted (basically if add button is clicked). e means event
    e.preventDefault(); //default action for a form is refreshing the page, we want to prevent this

    //question mark before chaining operator - optional chaining. means if value isnt valid/doesnt exist, automatically return undefined
    if (input?.value == "" || input?.value == null) return; //check if submit box is empty

    const newTask: Task = { //create "task" (to do list item)
        id: uuidV4(), //assign unique id to task
        title: input.value, //name of task
        completed: false, //whether task is completed - checkbox
        createdAt: new Date(), //date task was created
    };
    tasks.push(newTask) //add task to array

    addListItem(newTask); //add task to the list visually
    input.value = ""; //clear the input box when you hit add
});

function addListItem(task: Task) { //function for adding task to the list
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked 
        console.log(tasks)
        saveTasks() //save function
    })
    checkbox.checked = task.completed
    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);
}

function saveTasks() { //save tasks to local storage
    localStorage.setItem("TASKS",JSON.stringify(tasks))
}

function loadTasks(): Task[] { //load tasks from local storage if theyre in local storage
    const taskJSON = localStorage.getItem("TASKS");
    if (taskJSON == null) return []
    return JSON.parse(taskJSON)
}