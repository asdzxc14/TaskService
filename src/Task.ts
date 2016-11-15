class Task {
    id: string;
    name: string;
    desc: string;
    status: number;
    fromNpcId: string;
    toNpcId: string;
    public constructor(id:string,name:string,desc:string,status:number,fromNpcID:string,toNpcId) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = status;
        this.fromNpcId = fromNpcID;
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
