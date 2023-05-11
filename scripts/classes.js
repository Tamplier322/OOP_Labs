export class Task {
    constructor(title, description, deadline, priority) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.completed = false;
        this.priority = priority;
    }

    complete() {
        this.completed = true;
    }

    edit(newTitle, newDescription, newDeadline) {
        this.title = newTitle;
        this.description = newDescription;
        this.deadline = newDeadline;
    }
}

export const Priority = {
    IMPORTANT: "Важная",
    URGENT: "Срочная",
    NOT_URGENT: "Несрочная",
    NOT_IMPORTANT: "Неважная"
};


export class Project {
    constructor(name, comment = "No comment") {
        this.name = name;
        this.comment = comment;
        this.tasks = [];
        this.comments = []
    }

    addComment(comment) {
        this.comments.push(comment)
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