class TaskService {
    observerList: Observer[];
    taskList: Task[];
    task: Task;

    public constructor() {
        this.observerList = new Array();
        this.taskList = new Array();
        this.task = new Task("01", "Task01", "Go to NPC_2", TaskStatus.ACCEPTABLE, "npc_0", "npc_1");
        this.taskList.push(this.task);
    }

    addObserver(observer: Observer, type: string): void {
        this.observerList.push(observer);
    }

    notify(task: Task) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(task);
        }
    }

    accept(id: string): number {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                console.log("Find Task: " + this.taskList[i].id);
                this.taskList[i].status = TaskStatus.CAN_SUBMIT;
                this.notify(this.taskList[i]);
                return ErrorCode.SUCCESS;
            } else if (i == this.taskList.length - 1) {
                console.log("Cannot find Task");
                return ErrorCode.ERROR_TASK;
            }
        }
    }

	public canFinish(id: string) {
		var task: Task;
		task = taskSearch(this.taskList, id);
		switch (id) {
			case "002":
				task.status = 3;
				this.notify(task);
				break;
		}
	}

   	finish(id: string): number {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.SUBMITTED;
                this.notify(this.taskList[i]);
                return ErrorCode.SUCCESS;
            } else if (i == this.taskList.length - 1) {
                return ErrorCode.ERROR_TASK;
            }
        }
    }

    getTaskByCustomRole(rule: Function, id: string): Task {
        return rule(this.taskList, id);
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

class ObserverWithType {
    observer: Observer;
    type: string;

    constructor(observer: Observer, type: string) {
        this.observer = observer;
        this.type = type;
    }
}

enum ErrorCode {
    SUCCESS = 0,
    ERROR_TASK = 1,
}