const cards = document.querySelectorAll('.card');
const projectInfo = document.getElementById('projectInfoTab');
const closeTab = document.getElementById('closeTab');
const addProject = document.getElementById('addProjectBtn')
const form = document.getElementById('newFormTab')
const closeForm = document.getElementById('closeNewForm')
const projectShow = document.getElementById('projectInfo');
const dt = new Date();
const datetime = document.getElementById('datetime');
datetime.innerHTML = dt.toLocaleDateString();

cards.forEach(card => {
    card.addEventListener('click', openProject)
});

function openProject() {
    projectInfo.style.width = "100%";
    let project = this.getElementsByTagName('h3')[0].innerHTML;
    console.log(projectsLibrary[project])
    renderTab(projectsLibrary[project]);
}

closeTab.addEventListener('click', closeProject);

function closeProject() {
    projectInfo.style.width = "0";
}

addProject.addEventListener('click', openForm);

function openForm() {
    form.style.width = "100%";
}

closeForm.addEventListener('click', closeProjectTab)

function closeProjectTab() {
    form.style.width = "0%";
}



class Project {


    constructor(form) {
        this.title = form.ptitle.value;
        this.description = form.pdescription.value;
        this.dueDate = form.pdueDate.value;
        this.priority = form.priority.value;
    }

    todoList = {};

    addTodoList(value, description) {
        
        this.todoList[value] = description;
    }

    removeTodoList(key) {
        delete this.todoList[key];
    }

}

let projectsLibrary = {};

function update(form) {
    createProject(form);
    updateLibrary();
    closeProjectTab();  
    return false;
}

function updateLibrary() {
    row.textContent = "";
    for (let project in projectsLibrary) {
        renderCard(projectsLibrary[project]);
    };
}


function createProject(form) {
    projectsLibrary[form.ptitle.value] = new Project(form);
}

function renderCard(project) {

    const col = document.createElement('div');
    col.className = "column";
    const card = document.createElement('div');
    card.className = "card";
    const button = document.createElement('button');
    button.className = "closebtn";
    button.textContent = "X";
    const h3 = document.createElement('h3');
    h3.textContent = project.title;
    const tasks = document.createElement('p');
    tasks.textContent = Object.keys(project.todoList).length + " tasks to do!";
    const priority = document.createElement('p');
    priority.textContent = project.todoList[0];

    const row = document.getElementById('row');
    row.appendChild(col);
    col.appendChild(card);
    card.appendChild(button);
    card.appendChild(h3);
    card.appendChild(tasks);
    card.appendChild(priority);

    card.addEventListener('click', openProject)

}

function renderTab(project){
projectShow.textContent = "";


    const h2 = document.createElement('h2');
    h2.id = "projectTitle"
    const p = document.createElement('p');
    const ul = document.createElement('ul');
    const addTask = document.createElement('button');
    

    h2.textContent = project.title;
    p.textContent = Object.keys(project.todoList).length + " tasks to do!";
    for(let todo in project.todoList) {
        const li = document.createElement('li');
        li.textContent = todo + ': ' + project.todoList[todo];
        li.addEventListener('click', function(){
            delete project.todoList[todo];
            updateLibrary();
            renderTab(project);
        })
        ul.appendChild(li)
    }
    addTask.textContent = "Add new Task!";

    //addTask.addEventListener('click', function(){
        
    //});

    projectShow.appendChild(h2);
    projectShow.appendChild(p)
    projectShow.appendChild(ul);
    projectShow.appendChild(addTask);
};

function addNewTask(form){
    const projectTitle = document.getElementById('projectTitle').innerHTML;
    const project = projectsLibrary[projectTitle];
    const task = form.task.value;
    const description = form.description.value;
    project.todoList[task] = description;
    renderTab(project);
    updateLibrary();
    return false;
}

