class TaskNoneState implements State {
	private npc: NPC;

	constructor(npc: NPC) {
		this.npc = npc;
	}

	onEnter() {

	}

	onExit() {

	}
}

class TaskAvilableState implements State {
	private npc: NPC;

	taskSign: egret.Bitmap;
	taskSignX = 200;
	taskSignY = 336;
	taskSignWidth = 64;
	taskSignHeight = 64;

	constructor(npc: NPC) {
		this.npc = npc;
		this.taskSign = new egret.Bitmap();
	}

	onEnter() {
        this.drawTaskSign();
		this.npc.npcStage.addChild(this.taskSign);
		console.log("Enter Task Avilable State");
	}

	onExit() {
		this.npc.npcStage.removeChild(this.taskSign);
		console.log("Exit Task Avilable State");
	}

	drawTaskSign() {
		this.taskSign.x = this.taskSignX;
		this.taskSign.y = this.taskSignY;
		this.taskSign.width = this.taskSignWidth;
		this.taskSign.height = this.taskSignHeight;
		this.taskSign.texture = RES.getRes(npcImage.ACCEPTABLEimage);
	}
}

class TaskCanSubmitState implements State {
	private npc: NPC;

	taskSign: egret.Bitmap;
	taskSignX = 200;
	taskSignY = 336;
	taskSignWidth = 64;
	taskSignHeight = 64;

	constructor(npc: NPC) {
		this.npc = npc;
		this.taskSign = new egret.Bitmap();
	}

	onEnter() {
        this.drawTaskSign();
		this.npc.npcStage.addChild(this.taskSign);
		console.log("Enter Task Submit State");
	}

	onExit() {
		this.npc.npcStage.removeChild(this.taskSign);
		console.log("Exit Task Submit State");
	}

	drawTaskSign() {
        this.taskSign.x = this.taskSignX;
		this.taskSign.y = this.taskSignY;
		this.taskSign.width = this.taskSignWidth;
		this.taskSign.height = this.taskSignHeight;
		this.taskSign.texture = RES.getRes(npcImage.CAN_SUBMITimage);
	}
}