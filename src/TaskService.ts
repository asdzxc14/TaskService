interface Strategy {
    selector: Function;
}


class TaskService {
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
