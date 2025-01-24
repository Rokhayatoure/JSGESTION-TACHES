const API_URL = "http://localhost:3000/tasks"; // URL du JSON Server
const taskTableBody = document.getElementById("task-table-body");
const addTaskForm = document.getElementById("add-task-modal-form");
const taskSearch = document.getElementById("task-search");
const taskFilter = document.getElementById("task-filter");

let tasks = [];

// Récupérer les tâches depuis le serveur
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erreur lors de la récupération des tâches !");
        tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Erreur :", error.message);
        alert("Impossible de récupérer les tâches !");
    }
}

// Afficher les tâches dans le tableau
function renderTasks(tasks) {
    taskTableBody.innerHTML = ""; // Vider le tableau avant de le remplir

    tasks.forEach(task => {
        const row = document.createElement("tr");
        row.className = "border-t";
        row.dataset.taskId = task.id;

        // Case à cocher
        const checkboxCell = document.createElement("td");
        checkboxCell.className = "px-3 py-2";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "h-3 w-3";
        checkbox.checked = task.completed;
        checkboxCell.appendChild(checkbox);

        checkbox.addEventListener("click", () => {
            LineTo(checkbox, taskNameCell);
            updateTaskStatus(task.id, checkbox.checked);
        });

        // Nom de la tâche
        const taskNameCell = document.createElement("td");
        taskNameCell.className = "px-3 py-2";
        taskNameCell.textContent = task.name || "Nom manquant";
        if (task.completed) {
            taskNameCell.style.textDecoration = "line-through";
        }

        // Boutons Modifier et Supprimer
        const actionsCell = document.createElement("td");
        actionsCell.className = "px-3 py-2 flex space-x-2";

        const modifyButton = document.createElement("button");
        modifyButton.className = "text-blue-600 hover:underline text-xs flex items-center";
        modifyButton.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
        modifyButton.setAttribute("onclick", `editTask(${task.id}, '${task.name}')`);

        const deleteButton = document.createElement("button");
        deleteButton.className = "text-red-600 hover:underline text-xs flex items-center";
        deleteButton.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        actionsCell.appendChild(modifyButton);
        actionsCell.appendChild(deleteButton);

        // Ajouter les cellules dans la ligne
        row.appendChild(checkboxCell);
        row.appendChild(taskNameCell);
        row.appendChild(actionsCell);

        // Ajouter la ligne au tableau
        taskTableBody.appendChild(row);
    });
}

// Mettre à jour le statut d'une tâche
async function updateTaskStatus(taskId, completed) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed }),
        });
        if (!response.ok) throw new Error("Erreur lors de la mise à jour !");
    } catch (error) {
        console.error("Erreur de mise à jour :", error.message);
    }
}

// Supprimer une tâche
async function deleteTask(taskId) {
    try {
        const confirmation = confirm("Voulez-vous vraiment supprimer cette tâche ?");
        if (!confirmation) return;

        const response = await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erreur lors de la suppression !");
        fetchTasks(); // Rafraîchir la liste des tâches
    } catch (error) {
        console.error("Erreur de suppression :", error.message);
        alert("Impossible de supprimer la tâche !");
    }
}

// Ajouter une tâche
addTaskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const taskName = addTaskForm.querySelector("#task-name").value.trim();
    if (!taskName) return;

    const newTask = { name: taskName, completed: false };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout !");
        fetchTasks();
        addTaskForm.reset();
    } catch (error) {
        console.error("Erreur d'ajout :", error.message);
        alert("Impossible d'ajouter la tâche !");
    }
});

// Filtrer les tâches
taskSearch.addEventListener("input", filterTasks);
taskFilter.addEventListener("change", filterTasks);

function filterTasks() {
    let filteredTasks = tasks;

    const searchQuery = taskSearch.value.toLowerCase();
    if (searchQuery) {
        filteredTasks = filteredTasks.filter(task => task.name.toLowerCase().includes(searchQuery));
    }

    const filterValue = taskFilter.value;
    if (filterValue === "selected") {
        filteredTasks = filteredTasks.filter(task => task.completed);
    } else if (filterValue === "unselected") {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    renderTasks(filteredTasks);
}

// Appliquer ou supprimer le soulignement
function LineTo(checkbox, taskCell) {
    taskCell.style.textDecoration = checkbox.checked ? "line-through" : "none";
}

// Initialiser
fetchTasks();
