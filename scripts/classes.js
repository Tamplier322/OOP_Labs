import { checkNull } from "./funcs.js";
export class Task {
    constructor(title, description, deadline, priority, type) {
        this.title = title;
        this.type = type;
        this.description = description;
        this.deadline = deadline;
        this.completed = false;
        this.priority = priority;
        this.subtasks = [];
        this.comments = [];
    }

    complete() {
        this.completed = true;
    }

    edit(newTitle, newDescription, newDeadline) {
        this.title = newTitle;
        this.description = newDescription;
        this.deadline = newDeadline;
    }

    addSubtasks() {
        let addSubtask = confirm("Хотите ли добавить подзадачу?");
        while (addSubtask) {
            const subtaskTitle = prompt(`Введите название подзадачи:`);
            checkNull(subtaskTitle)
            const subtask = new Subtask(subtaskTitle, '', '', '', '', [], '', '');
            const setSubtaskTime = confirm("Хотите ли установить время для подзадачи?");
            checkNull(setSubtaskTime)
            if (setSubtaskTime) {
                const subtaskTime = prompt("Введите время для подзадачи:");
                checkNull(subtaskTime)
                subtask.dueDate = subtaskTime;
            }
            else {
                subtask.dueDate = this.deadline;
            }
            const setSubtaskDescription = confirm("Хотите ли добавить описание для подзадачи?");
            checkNull(setSubtaskDescription)
            if (setSubtaskDescription) {
                const subtaskDescription = prompt("Введите описание для подзадачи:");
                checkNull(subtaskDescription)
                subtask.description = subtaskDescription;
            }
            else {
                subtask.description = this.description;
            }
            subtask.type = this.type;
            this.subtasks.push(subtask);
            addSubtask = confirm("Хотите ли добавить еще подзадачу?");
        }
        console.log(`Подзадачи для задачи "${this.title}" успешно добавлены!`);
    }

    removeSubtask(subtaskIndex) {
        if (subtaskIndex < 0 || subtaskIndex >= this.subtasks.length) {
            console.log("Неверный ввод");
            return;
        }
        const removedSubtask = this.subtasks.splice(subtaskIndex, 1)[0];
        console.log(`Подзадача "${removedSubtask.title}" успешно удалена из задачи "${this.title}"`);
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    removeComment(commentIndex) {
        this.comments.splice(commentIndex, 1);
    }
}


export class Subtask extends Task {
    constructor(title, description, deadline, priority, completed, subtasks, dueDate, type) {
        super(title, description, deadline, priority, completed, subtasks, type);
        this.completed = false;
        this.description = description;
        this.dueDate = dueDate;
        this.type = type;
        this.comments = [];
    }

    complete() {
        this.completed = true;
    }


    addComment(comment) {
        this.comments.push(comment);
    }

    removeComment(commentIndex) {
        this.comments.splice(commentIndex, 1);
    }
}

export class Comment {
    constructor(author, text, dateAdded) {
        this.author = author;
        this.text = text;
        this.dateAdded = dateAdded;
    }
}


export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.comments = []
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    removeComment(commentIndex) {
        this.comments.splice(commentIndex, 1);
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        const index = this.tasks.indexOf(task);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

    removeComment(commentIndex) {
        if (commentIndex >= 0 && commentIndex < this.comments.length) {
            this.comments.splice(commentIndex, 1);
        }
    }
}

export class User {
    constructor(name) {
        this.name = name;
        this.projects = [];
    }

    createProject(name) {
        const project = new Project(name);
        this.projects.push(project);
    }

    removeProject(project) {
        const index = this.projects.indexOf(project);
        if (index !== -1) {
            this.projects.splice(index, 1);
        }
    }

    displayProjects() {
        console.log(`Проекты пользователя ${this.name}:`);
        this.projects.forEach((project, projectIndex) => {
            console.log(`${this.name} ${projectIndex}: ${project.name}, comment - ${project.comment}`);
        });
    }

    displayTasks(projectIndex) {
        const project = this.projects[projectIndex];
        console.log(`Задачи в проекте "${project.name}":`);
        project.tasks.forEach((task) => {
            const status = task.completed ? 'Завершено' : 'Ожидает выполнения';
            console.log(`${this.name}: ${task.title}, ${status}, ${task.priority}`);
        });
    }
}
export const users = [];

export const Priority = {
    IMPORTANT: "Важная",
    URGENT: "Срочная",
    NOT_URGENT: "Несрочная",
    NOT_IMPORTANT: "Неважная"
};
