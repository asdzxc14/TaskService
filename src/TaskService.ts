interface Strategy {
    selector: Function;
}


class TaskService {


    task01: Task;

    public constructor() {

        this.taskList = new Array();
        this.task01 = new Task("000", "Task000", "Go to NPC_2", TaskStatus.ACCEPTABLE, "npc_0", "npc_1");
        this.taskList.push(this.task01);
    }


    public getTaskByCustomStrategy(strategy: Strategy) {
        return strategy.selector(this.taskList);
    }
    public getTaskByCustomRule(rule: Function) {

    }

    private taskList: Task[] = [];

    public addTask(task: Task) {
        this.taskList.push(task);
    }

    private notify() {

    }

    finish(id: string) {
        console.log("finish" + id);
        let task = this.taskList[id];
        if (!task) {
            return Error;
        }
    }

}


enum ErrorCode {
    SUCCESS,
    ERROR_TASK,
}