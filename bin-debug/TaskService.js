var TaskService = (function () {
    function TaskService() {
        this.taskList = [];
        this.taskList = new Array();
        this.task01 = new Task("000", "Task000", "Go to NPC_2", TaskStatus.ACCEPTABLE, "npc_0", "npc_1");
        this.taskList.push(this.task01);
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.getTaskByCustomStrategy = function (strategy) {
        return strategy.selector(this.taskList);
    };
    p.getTaskByCustomRule = function (rule) {
    };
    p.addTask = function (task) {
        this.taskList.push(task);
    };
    p.notify = function () {
    };
    p.finish = function (id) {
        console.log("finish" + id);
        var task = this.taskList[id];
        if (!task) {
            return Error;
        }
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["ERROR_TASK"] = 1] = "ERROR_TASK";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=TaskService.js.map