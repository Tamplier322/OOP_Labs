const getWorkersButton = document.getElementById('getWorkersButton');
const getDepartmentsButton = document.getElementById('getDepartmentsButton');
const getTasksButton = document.getElementById('getTasksButton');
const getSubtasksButton = document.getElementById('getSubtasksButton');
const dataContainer1 = document.getElementById('dataContainer1');
const dataContainer2 = document.getElementById('dataContainer2');
const dataContainer3 = document.getElementById('dataContainer3');
const dataContainer4 = document.getElementById('dataContainer4');
let isWorkersLoaded = false;
let isDepartmentsLoaded = false;
let isTasksLoaded = false;
let isSubtasksLoaded = false;

getWorkersButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        data.sort((a, b) => a.id - b.id);
        dataContainer1.innerHTML = '';

        data.forEach(user => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = user.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = user.name;
            row.appendChild(nameCell);

            const surnameCell = document.createElement('td');
            surnameCell.textContent = user.surname;
            row.appendChild(surnameCell);

            const loginCell = document.createElement('td');
            loginCell.textContent = user.login;
            row.appendChild(loginCell);

            const passwordCell = document.createElement('td');
            passwordCell.textContent = user.password;
            row.appendChild(passwordCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            dataContainer1.appendChild(row);
        });
        isWorkersLoaded = true;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});


getDepartmentsButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/projects');
        const data = await response.json();
        data.sort((a, b) => a.id - b.id);
        dataContainer2.innerHTML = '';

        data.forEach((project) => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = project.id;
            row.appendChild(idCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = project.title;
            row.appendChild(titleCell);

            const userIdCell = document.createElement('td');
            userIdCell.textContent = project.user_id;
            row.appendChild(userIdCell);

            dataContainer2.appendChild(row);
        });
        isDepartmentsLoaded = true;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});

getTasksButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const data = await response.json();
        data.sort((a, b) => a.id - b.id);
        dataContainer3.innerHTML = '';

        data.forEach(task => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = task.id;
            row.appendChild(idCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = task.title;
            row.appendChild(titleCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = task.description;
            row.appendChild(descriptionCell);

            const deadlineCell = document.createElement('td');
            deadlineCell.textContent = task.deadline;
            row.appendChild(deadlineCell);

            const typeCell = document.createElement('td');
            typeCell.textContent = task.type;
            row.appendChild(typeCell);

            const priorityCell = document.createElement('td');
            priorityCell.textContent = task.priority;
            row.appendChild(priorityCell);

            const projectIdCell = document.createElement('td');
            projectIdCell.textContent = task.project_id;
            row.appendChild(projectIdCell);

            dataContainer3.appendChild(row);
        });
        isTasksLoaded = true;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});

getSubtasksButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/subtasks');
        const data = await response.json();
        data.sort((a, b) => a.id - b.id);
        dataContainer4.innerHTML = '';

        data.forEach(subtask => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = subtask.id;
            row.appendChild(idCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = subtask.title;
            row.appendChild(titleCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = subtask.description;
            row.appendChild(descriptionCell);

            const deadlineCell = document.createElement('td');
            deadlineCell.textContent = subtask.deadline;
            row.appendChild(deadlineCell);

            const typeCell = document.createElement('td');
            typeCell.textContent = subtask.type;
            row.appendChild(typeCell);

            const priorityCell = document.createElement('td');
            priorityCell.textContent = subtask.priority;
            row.appendChild(priorityCell);

            const subtaskIdCell = document.createElement('td');
            subtaskIdCell.textContent = subtask.task_id;
            row.appendChild(subtaskIdCell);

            dataContainer4.appendChild(row);
        });
        isSubtasksLoaded = true;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});

