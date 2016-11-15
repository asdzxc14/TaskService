class TaskNoneState implements State {
	private npc:NPC;

	constructor(npc:NPC) {
		this.npc = npc;
	}

	onEnter() {
		console.log("Enter Task None State");
	}

	onExit() {
		console.log("Exit Task None State");
	}
}

class TaskAvilableState implements State {
	private npc:NPC;

	taskSign:egret.Shape;
	taskSighX = 64;
	taskSighY = 64;
	taskSighWidth = 64;
	taskSighHeight = 64;

	constructor(npc:NPC) {
		this.npc = npc;
		this.taskSign = new egret.Shape();
		
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

	drawTaskSign(){
		this.taskSign.x = this.taskSighX;
		this.taskSign.y = this.taskSighY;
		this.taskSign.width = this.taskSighWidth;
		this.taskSign.height = this.taskSighHeight;


	}

}

class TaskSubmitState implements State {

	private npc:NPC;

	taskSigh:egret.Shape;
	taskSighX = 64;
	taskSighY = 64;
	taskSighWidth = 64;
	taskSighHeight = 64;

	constructor(npc:NPC) {
		this.npc = npc;
		this.taskSigh = new egret.Shape();		

	}

	onEnter() {
        this.drawTaskSign();		
		this.npc.npcStage.addChild(this.taskSigh);
		console.log("Enter Task Submit State");

	}

	onExit() {
		this.npc.npcStage.removeChild(this.taskSigh);
		console.log("Exit Task Submit State");

	}

	drawTaskSign(){
        this.taskSigh.x = this.taskSighX;
		this.taskSigh.y = this.taskSighY;
		this.taskSigh.width = this.taskSighWidth;
		this.taskSigh.height = this.taskSighHeight;

	}

}