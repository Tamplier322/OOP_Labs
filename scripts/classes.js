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

    addSubtask(subtask) {
        this.subtaskIds.push(subtask.id);
    }

    getSubtaskById(subtaskId) {
        const subtask = this.subtasks.find(subtask => subtask.id === subtaskId);
        return subtask;
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
    constructor(name, surname, email, login, password) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.login = login;
        this.password = password;
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(project) {
        const index = this.projects.indexOf(project);
        if (index !== -1) {
            this.projects.splice(index, 1);
        }
    }
}

export class Group {
    constructor(name) {
        this.name = name;
        this.members = [];
    }

    static groups = [];

    static getExistingGroups() {
        return Group.groups;
    }

    addMember(user) {
        this.members.push(user);
    }

    hasMember(member) {
        return this.members.includes(member);
    }
}
export const users = [];

export const Priority = {
    IMPORTANT: "Важная",
    URGENT: "Срочная",
    NOT_URGENT: "Несрочная",
    NOT_IMPORTANT: "Неважная"
};
