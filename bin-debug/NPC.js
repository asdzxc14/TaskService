var npcImage = {
    npc_0: "NPC1_png",
    npc_1: "NPC2_png",
    ACCEPTABLEimage: "ACCEPTABLE_png",
    DURINGimage: "DURING_png",
    CAN_SUBMITimage: "CAN_SUBMIT_png",
};
var NPC = (function () {
    function NPC(npcId, npcName, taskService) {
        this.tileSize = 64;
        this.emojiX = 200;
        this.emojiY = 400;
        this.npcStageWidth = 64;
        this.npcStageHeight = 64;
        this.npcStage = new egret.DisplayObjectContainer();
        this.npcStageShape = new egret.Shape();
        this.emoji = new egret.Bitmap();
        this.npcId = npcId;
        this.npcName = npcName;
        this.taskService = taskService;
        this.taskService.addObserver(this, "NPC");
        this.taskNoneState = new TaskNoneState(this);
        this.taskAvilableState = new TaskAvilableState(this);
        this.taskCanSubmitState = new TaskCanSubmitState(this);
        this.taskStateMachine = new StateMachine(this.taskNoneState);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.getTask = function () {
        this.task = this.taskService.getTaskByCustomRole(this.rule, this.npcId);
        console.log("This Task State: " + this.task.status);
        this.checkState();
    };
    p.setemoji = function () {
        this.emoji.texture = RES.getRes(npcImage.npc_0);
        this.emoji.x = this.emojiX;
        this.emoji.y = this.emojiY;
        this.emoji.width = this.tileSize;
        this.emoji.height = this.tileSize;
    };
    p.setNpc = function (npcX, npcY) {
        this.npcStageX = npcX;
        this.npcStageY = npcY;
        this.setemoji();
    };
    p.drawNpcShape = function () {
        this.npcStageShape.graphics.drawRect(0, 0, this.npcStageWidth, this.npcStageHeight);
        this.npcStageShape.graphics.endFill();
    };
    p.drawNpc = function () {
        this.drawNpcShape();
        this.npcStage.x = this.npcStageX;
        this.npcStage.y = this.npcStageY;
        this.npcStage.width = this.npcStageWidth;
        this.npcStage.height = this.npcStageHeight;
        this.npcStage.addChild(this.npcStageShape);
        this.npcStage.addChild(this.emoji);
        this.emoji.touchEnabled = true;
        this.emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNpcClick, this);
    };
    p.checkState = function () {
        switch (this.task.status) {
            case 0:
            case 1:
                if (this.task.fromNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskAvilableState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case 2:
            case 3:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskCanSubmitState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case 4:
                this.taskStateMachine.changeState(this.taskNoneState);
                break;
        }
    };
    p.onChange = function (task) {
        this.task = task;
        this.checkState();
    };
    ///////////////////
    p.onNpcClick = function (e) {
        if (this.task.status == TaskStatus.ACCEPTABLE && this.task.fromNpcId == this.npcId) {
            this.taskService.notifyTaskPanel(this.task);
        }
        else if (this.task.status == TaskStatus.CAN_SUBMIT && this.task.toNpcId == this.npcId) {
            this.taskService.notifyTaskPanel(this.task);
        }
    };
    p.rule = function (taskList, npcId) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].fromNpcId == npcId || taskList[i].toNpcId == npcId) {
                console.log("Find");
                return taskList[i];
            }
        }
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map