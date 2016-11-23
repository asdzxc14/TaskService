class TaskPanel implements Observer {
	panel: egret.DisplayObjectContainer;
	stage: egret.DisplayObjectContainer;

	private npc: NPC;
	private taskService: TaskService;
	private currentTaskId: string;
	private currentTaskStatus: number;

	private backColor = 0xFFFAFA;
	private backGround: egret.Shape;
	private panelX = 290;
	private panelY = 150;
	private panelWidth = 200;
	private panelHeight = 350;

	private taskNameTextField: egret.TextField;
	private taskNameTextFieldText = "任务栏";
	private taskNameTextFieldX = 50;
	private taskNameTextFieldY = 30;
	private taskNameTextFieldWidth = 200;
	private taskNameTextFieldColor = 0xFF0000;

	private taskDescTextField: egret.TextField;
	private taskDescTextFieldText = "任务内容";
	private taskDescTextFieldX = 10;
	private taskDescTextFieldY = 100;
	private taskDescTextFieldWidth = 180;
	private taskDescTextFieldColor = 0xFF0000;

	public button: egret.DisplayObjectContainer;
	public buttonBack: egret.Shape;
	private buttonColor = 0xFF6400;
	private buttonX = 50;
	private buttonY = 200;
	private buttonWidth = 100;
	private buttonHeight = 50;

	public buttonTextField: egret.TextField;
	private buttonTextFieldText = "按钮文字";
	private buttonTextFieldX = this.buttonX + 20;
	private buttonTextFieldY = this.buttonY + 10;
	private buttonTextFieldWidth = 100;
	private buttonTextFieldColor = 0xFFFAFA;

	public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
		this.stage = stage;
		this.taskService = taskService;
		this.panel = new egret.DisplayObjectContainer();
		this.taskNameTextField = new egret.TextField();
		this.taskDescTextField = new egret.TextField();
		this.backGround = new egret.Shape();
		this.button = new egret.DisplayObjectContainer();
		this.buttonBack = new egret.Shape();
		this.buttonTextField = new egret.TextField();
		this.drawPanel();

	}

	private setText() {
		this.taskNameTextField.text = this.taskNameTextFieldText;
		this.taskNameTextField.x = this.taskNameTextFieldX;
		this.taskNameTextField.y = this.taskNameTextFieldY;
		this.taskNameTextField.width = this.taskNameTextFieldWidth;
		this.taskNameTextField.bold = true;
		this.taskNameTextField.textColor = this.taskNameTextFieldColor;

		this.taskDescTextField.text = this.taskDescTextFieldText;
		this.taskDescTextField.x = this.taskDescTextFieldX;
		this.taskDescTextField.y = this.taskDescTextFieldY;
		this.taskDescTextField.width = this.taskDescTextFieldWidth;
		this.taskDescTextField.bold = false;
		this.taskDescTextField.textColor = this.taskDescTextFieldColor;
		this.taskDescTextField.textAlign = egret.HorizontalAlign.CENTER;
	}

	private drawBackGround() {
		this.backGround.graphics.beginFill(this.backColor, 1);
		this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
		this.backGround.graphics.endFill();
	}

	private drawButtonBack() {
		this.buttonBack.graphics.beginFill(this.buttonColor, 1);
		this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
		this.buttonBack.graphics.endFill();
	}

	private setButtonText() {
		this.buttonTextField.text = this.buttonTextFieldText;
		this.buttonTextField.x = this.buttonTextFieldX;
		this.buttonTextField.y = this.buttonTextFieldY;
		this.buttonTextField.width = this.buttonTextFieldWidth;
		this.buttonTextField.bold = false;
		this.buttonTextField.textColor = this.buttonTextFieldColor;
	}

	private drawButton() {
		this.drawButtonBack();
		this.setButtonText();
		this.button.addChild(this.buttonBack);
		this.button.addChild(this.buttonTextField);
	}

	public drawPanel() {
		this.panel.x = this.panelX;
		this.panel.y = this.panelY;
		this.panel.width = this.panelWidth;
		this.panel.height = this.panelHeight;
		this.drawButton();
		this.drawBackGround();
		this.setText();
		this.panel.addChild(this.backGround);
		this.panel.addChild(this.taskNameTextField);
		this.panel.addChild(this.taskDescTextField);
		this.panel.addChild(this.button);
		this.button.touchEnabled = true;
		this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
	}

	private onButtonClick(e: egret.TouchEvent) {
		switch (this.currentTaskStatus) {
			case 0:

			case 1:
				console.log("Accept Button Click");
				console.log("Current Task Id: " + this.currentTaskId);
				this.taskService.accept(this.currentTaskId);
				break;

			case 2:

			case 3:
				console.log("Submit Button Click");
				this.taskService.finish(this.currentTaskId);
				break;
			case 4:

			default:
				console.log("Button Click");
		}
		this.stage.removeChild(this.panel);
	}

	public showPanel() {
		this.stage.addChild(this.panel);
	}

	public removePanel() {
		this.stage.removeChild(this.panel);
	}

	public onChange(task: Task) {
		this.currentTaskId = task.id;
		this.changeTaskText(task.name, task.desc);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;
		this.showPanel();
	}

	private changeTaskText(name: string, desc: string) {
		this.taskNameTextField.text = name;
		this.taskDescTextField.text = desc;
	}

	private changeButton(taskStatus: number) {
		switch (taskStatus) {
			case 0:

			case 1:
				this.buttonTextField.text = "接受";
				break;

			case 2:

			case 3:
				this.buttonTextField.text = "提交";
				break;

			case 4:

			default:
				this.buttonTextField.text = "";
				break;
		}
	}
}

class TaskListPanel implements Observer {
	panel: egret.DisplayObjectContainer;
	stage: egret.DisplayObjectContainer;

	private taskPanel: TaskPanel;
	private taskService: TaskService;
	private currentTaskId: string;
	private currentTaskStatus: number;

    private backGround: egret.Shape;
    private backColor = 0xFFFFFF;
    private panelX = 0;
    private panelY = 0;
    private panelWidth = 200;
    private panelHeight = 300;

    private taskNameTextField: egret.TextField;
    private taskNameTextFieldText = "任务栏";
    private taskNameTextFieldX = 50;
    private taskNameTextFieldY = 30;
    private taskNameTextFieldWidth = 150;
    private taskNameTextFieldColor = 0xFFFFFF;

	private taskDescTextField: egret.TextField;
	private taskDescTextFieldText = "任务内容";
	private taskDescTextFieldX = 10;
	private taskDescTextFieldY = 200;
	private taskDescTextFieldWidth = 180;
	private taskDescTextFieldColor = 0xFFFFFF;

    private taskStateTextField: egret.TextField;
    private taskStateTextFieldText = "";
    private taskStateTextFieldX = 50;
    private taskStateTextFieldY = 100;
    private taskStateTextFieldWidth = 100;
    private taskStateTextFieldColor = 0xFF0000;

	public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
		this.stage = stage;
		this.taskService = taskService;
		this.taskService.addObserver(this, "TaskListPanel");

		this.panel = new egret.DisplayObjectContainer();
		this.taskNameTextField = new egret.TextField();
		this.taskDescTextField = new egret.TextField();
		this.taskStateTextField = new egret.TextField();
		this.backGround = new egret.Shape();
		this.drawPanel();
		//this.getTask();
		this.stage.addChild(this.panel);
	}

	private setText() {
		this.taskNameTextField.text = this.taskNameTextFieldText;
		this.taskNameTextField.x = this.taskNameTextFieldX;
		this.taskNameTextField.y = this.taskNameTextFieldY;
		this.taskNameTextField.width = this.taskNameTextFieldWidth;
		this.taskNameTextField.bold = true;
		this.taskNameTextField.textColor = this.taskNameTextFieldColor;

		this.taskDescTextField.text = this.taskDescTextFieldText;
		this.taskDescTextField.x = this.taskDescTextFieldX;
		this.taskDescTextField.y = this.taskDescTextFieldY;
		this.taskDescTextField.width = this.taskDescTextFieldWidth;
		this.taskDescTextField.bold = false;
		this.taskDescTextField.textColor = this.taskDescTextFieldColor;

        this.taskStateTextField.text = this.taskStateTextFieldText;
        this.taskStateTextField.x = this.taskStateTextFieldX;
        this.taskStateTextField.y = this.taskStateTextFieldY;
        this.taskStateTextField.width = this.taskStateTextFieldWidth;
        this.taskStateTextField.bold = false;
        this.taskStateTextField.textColor = this.taskStateTextFieldColor;
	}

	private drawBackGround() {
        this.backGround.graphics.beginFill(this.backColor, 0.3);
        this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
        this.backGround.graphics.endFill();
    }

	public drawPanel() {
		this.panel.x = this.panelX;
		this.panel.y = this.panelY;
		this.panel.width = this.panelWidth;
		this.panel.height = this.panelHeight;
		this.drawBackGround();
		this.setText();
		this.panel.addChild(this.backGround);
		this.panel.addChild(this.taskNameTextField);
		this.panel.addChild(this.taskDescTextField);
		this.panel.addChild(this.taskStateTextField);
	}

	public showPanel() {
		this.stage.addChild(this.panel);
	}

	public onChange(task: Task) {
		this.currentTaskId = task.id;
		this.changeTaskText(task.name, task.desc);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;
	}

	private changeTaskText(name: string, desc: string) {
		this.taskNameTextField.text = name;
		this.taskDescTextField.text = desc;
	}

	private changeButton(taskStatus: number) {
		switch (taskStatus) {
			case 0:

			case 1:
                this.taskStateTextField.text = "可接受";
                break;

            case 2:
				this.taskStateTextField.text = "未完成";
                break;

            case 3:
                this.taskStateTextField.text = "可提交";
                break;

            case 4:
                this.taskNameTextField.text = "任务栏";
                this.taskDescTextField.text = "";
                this.taskStateTextField.text = "无任务";
                break;
		}
	}
/*
	rule(taskList: Task[], id: string): Task {
		for (var i = 0; i < taskList.length; i++) {
			if (taskList[i].status != TaskStatus.UNACCEPTABLE) {
				console.log(id + " Find Task");
				return taskList[i];
			}
		}
	}

	getTask() {
		var task = this.taskService.getTaskByCustomRole(this.rule, this.id);
		this.onChange(task);
	}
	*/
}

