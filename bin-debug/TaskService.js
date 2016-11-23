var TaskService = (function () {
    function TaskService() {
        this.observerList = new Array();
        this.taskList = new Array();
        this.addTask("01");
        this.addTask("02");
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.onChange = function () {
    };
    p.addObserver = function (observer, type) {
        this.observerList.push(new ObserverType(observer, type));
    };
    p.notify = function (task) {
        this.observerList.forEach(function (element) {
            element.observer.onChange(task);
        });
    };
    p.addTask = function (id) {
        var task;
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
    };
    p.canAccept = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "02":
                task.status = 1;
                this.notify(task);
                break;
        }
    };
    p.accept = function (id) {
        var task;
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
    };
    p.during = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "01":
                this.notify(task);
            case "02":
                this.notify(task);
            default:
        }
    };
    p.canSubmit = function (id) {
        var task;
        task = taskSearch(this.taskList, id);
        switch (id) {
            case "02":
                task.status = 3;
                this.notify(task);
                break;
        }
    };
    p.finish = function (id) {
        var task;
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
    };
    p.getTaskByCustomRole = function (rule, Id) {
        return rule(this.taskList, Id);
    };
    p.checkStatus = function (task, npcId, taskPanel) {
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
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService',["Observer"]);
function taskSearch(taskList, id) {
    for (var i = 0; i <= taskList.length - 1; i++) {
        if (taskList[i].id == id) {
            return taskList[i];
        }
        else {
            console.log("task named" + id + "can not be found");
        }
    }
}
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["TASK_ERROR_NULL"] = 0] = "TASK_ERROR_NULL";
    ErrorCode[ErrorCode["TASK_ERROR_UNFIND"] = 1] = "TASK_ERROR_UNFIND";
})(ErrorCode || (ErrorCode = {}));
var ObserverType = (function () {
    function ObserverType(observer, type) {
        this.observer = observer;
        this.type = type;
    }
    var d = __define,c=ObserverType,p=c.prototype;
    return ObserverType;
}());
egret.registerClass(ObserverType,'ObserverType');
//# sourceMappingURL=TaskService.js.map