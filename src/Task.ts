class Task {

    private _id: string;
    public _name: string;
    public _status: TaskStatus;
    public desc: string;

    public get id(): string {
        return this._id;
    }

    public get status(): TaskStatus {
        return this._status;
    }

    public set status(value: TaskStatus) {
        this._status = value;
    }
}


enum ErrorCode {
    SUCCESS,
    ERROR_TASK,
    
}

enum TaskStatus {
    UNACCEPTABLE,
    ACCEPTABLE,
    DURING,
    CAN_SUBMIT,
    SUBMITTED
}
