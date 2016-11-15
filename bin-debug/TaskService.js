var TaskService = (function () {
    function TaskService() {
        this.observerList = new Array();
        this.taskList = new Array();
        this.task = new Task("01", "Task01", "Go to NPC_2", TaskStatus.ACCEPTABLE, "npc_0", "npc_1");
        this.taskList.push(this.task);
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.addObserver = function (observer, type) {
        this.observerList.push(new ObserverWithType(observer, type));
    };
    p.accept = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                console.log("Find Task: " + this.taskList[i].id);
                this.taskList[i].status = TaskStatus.CAN_SUBMIT;
                this.notifyNPC(this.taskList[i]);
                return ErrorCode.SUCCESS;
            }
            else if (i == this.taskList.length - 1) {
                return ErrorCode.ERROR_TASK;
            }
        }
    };
    p.finish = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.SUBMITTED;
                this.notifyNPC(this.taskList[i]);
                return ErrorCode.SUCCESS;
            }
            else if (i == this.taskList.length - 1) {
                return ErrorCode.ERROR_TASK;
            }
        }
    };
    p.getTaskByCustomRole = function (rule, Id) {
        return rule(this.taskList, Id);
    };
    p.notifyTaskPanel = function (task) {
        for (var i = 0; i < this.observerList.length; i++) {
            if (this.observerList[i].type == "TaskPanel") {
                this.observerList[i].observer.onChange(task);
            }
        }
    };
    p.notifyNPC = function (task) {
        for (var i = 0; i < this.observerList.length; i++) {
            console.log("Type:" + this.observerList[i].type);
            if (this.observerList[i].type == "NPC") {
                console.log("Find NPC");
                this.observerList[i].observer.onChange(task);
            }
        }
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
var ObserverWithType = (function () {
    function ObserverWithType(observer, type) {
        this.observer = observer;
        this.type = type;
    }
    var d = __define,c=ObserverWithType,p=c.prototype;
    return ObserverWithType;
}());
egret.registerClass(ObserverWithType,'ObserverWithType');
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["ERROR_TASK"] = 1] = "ERROR_TASK";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=TaskService.js.map