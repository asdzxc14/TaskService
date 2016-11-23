class TaskService implements Observer {
    observerList: ObserverType[];
    taskList: Task[];
    task: Task;
    public constructor() {
        this.observerList = new Array();
        this.taskList = new Array();
        this.addTask("01");
        this.addTask("02");
    }

    onChange() {

    }

    addObserver(observer: Observer, type: string): void {
        this.observerList.push(new ObserverType(observer, type));
    }

    notify(task: Task): void {
        this.observerList.forEach(element => {
            element.observer.onChange(task);
        });
    }

    addTask(id: string) {
        var task: Task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "01":
                var task = new Task("01", "Task 1", "找到NPC2", 0, "npc_0", "npc_1");
                task.status = 1;
                this.taskList.push(task);
                this.notify(task);
                break;

            case "02":
                var task = new Task("02", "Task 2", "击杀10个怪物", 0, "npc_1", "npc_1");
                this.taskList.push(task);
                this.notify(task);
                break;
        }
    }

    canAccept(id: string) {
        var task: Task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "02":
                task.status = 1;
                this.notify(task);
                break;
        }
    }

    accept(id: string): void {
        var task: Task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "01":
                task.status = TaskStatus.DURING;
                this.notify(task);
                break;

            case "02":
                task.status = TaskStatus.DURING;
                this.notify(task);
                break;
            default:
                console.log("Task cannot be found");
        }
    }

    during(id: string) {
        var task: Task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "01":
                this.notify(task);

            case "02":
                this.notify(task);
            default:
        }
    }

    canSubmit(id: string) {
        var task: Task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "02":
                task.status = 3;
                this.notify(task);
                break;
        }
    }

    finish(id: string): ErrorCode {
        var task: Task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "01":
                task.status = 4;
                this.notify(task);
                this.canAccept("02");
                break;

            case "02":
                task.status = 4;
                this.notify(task);
                break;
            default:
                return ErrorCode.TASK_ERROR_UNFIND;
        }
    }

    getTaskByCustomRole(rule: Function, Id: string): Task {
        return rule(this.taskList, Id);
    }

    checkStatus(task: Task, npcId: string, taskPanel: TaskPanel) {
        switch (task.status) {
            case 0:
                switch (task.id) {
                    case "01":
                        this.notify(task);
                        break;
                    case "02":
                        this.notify(task);
                        break;
                }
                break;

            case 1:
                switch (task.id) {
                    case "01":
                        if (task.fromNpcId == npcId) {
                            taskPanel.onChange(task);
                            this.notify(task);
                        }
                        break;

                    case "02":
                        if (task.fromNpcId == npcId) {
                            taskPanel.onChange(task);
                            this.notify(task);
                        }
                        break;
                }
                break;

            case 2:
                switch (task.id) {
                    case "01":
                        if (task.toNpcId == npcId) {

                            task.status = TaskStatus.CAN_SUBMIT;
                            taskPanel.onChange(task);
                            this.notify(task);
                        }
                        break;
                    case "02":
                        if (task.toNpcId == npcId) {
                            this.notify(task);
                        }
                        break;
                }
                break;

            case 3:
                switch (task.id) {
                    case "01":
                        if (task.toNpcId == npcId) {
                            this.notify(task);

                        }

                    case "02":
                        if (task.toNpcId == npcId) {
                            taskPanel.onChange(task);
                            this.notify(task);
                        }
                        break;
                }
                break;

            case 4:
                switch (task.id) {
                    case "01":
                        this.notify(task);
                        break;
                    case "02":
                        this.notify(task);
                        break;
                }
                break;
        }
    }
}

function taskSearch(taskList: Task[], id: string): Task {
    for (var i = 0; i <= taskList.length - 1; i++) {
        if (taskList[i].id == id) {
            return taskList[i];
        }
        else {
            console.log("task named" + id + "can not be found");
        }
    }
}

enum ErrorCode {
    TASK_ERROR_NULL,
    TASK_ERROR_UNFIND
}

class ObserverType {
    observer: Observer;
    type: string;

    constructor(observer: Observer, type: string) {
        this.observer = observer;
        this.type = type;
    }
}