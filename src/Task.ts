class Task implements TaskCondition {
    id: string;
    name: string;
    desc: string;
    status: number;
    fromNpcId: string;
    toNpcId: string;
    private condition: TaskCondition;

    onAccept(task) {
    }

    onSubmit(task) {
    }

    private checkStatus() {
    }

    public constructor(id: string, name: string, desc: string, status: number, fromNpcId: string, toNpcId) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = status;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;
    }
}

enum TaskStatus {
    UNACCEPTABLE = 0,
    ACCEPTABLE = 1,
    DURING = 2,
    CAN_SUBMIT = 3,
    SUBMITTED = 4
}
