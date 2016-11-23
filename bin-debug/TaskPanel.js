var TaskPanel = (function () {
    function TaskPanel(stage, taskService) {
        this.backColor = 0xFFFAFA;
        this.panelX = 290;
        this.panelY = 150;
        this.panelWidth = 200;
        this.panelHeight = 350;
        this.taskNameTextFieldText = "任务栏";
        this.taskNameTextFieldX = 50;
        this.taskNameTextFieldY = 30;
        this.taskNameTextFieldWidth = 200;
        this.taskNameTextFieldColor = 0xFF0000;
        this.taskDescTextFieldText = "任务内容";
        this.taskDescTextFieldX = 10;
        this.taskDescTextFieldY = 100;
        this.taskDescTextFieldWidth = 180;
        this.taskDescTextFieldColor = 0xFF0000;
        this.buttonColor = 0xFF6400;
        this.buttonX = 50;
        this.buttonY = 200;
        this.buttonWidth = 100;
        this.buttonHeight = 50;
        this.buttonTextFieldText = "按钮文字";
        this.buttonTextFieldX = this.buttonX + 20;
        this.buttonTextFieldY = this.buttonY + 10;
        this.buttonTextFieldWidth = 100;
        this.buttonTextFieldColor = 0xFFFAFA;
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
    var d = __define,c=TaskPanel,p=c.prototype;
    p.setText = function () {
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
    };
    p.drawBackGround = function () {
        this.backGround.graphics.beginFill(this.backColor, 1);
        this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
        this.backGround.graphics.endFill();
    };
    p.drawButtonBack = function () {
        this.buttonBack.graphics.beginFill(this.buttonColor, 1);
        this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.buttonBack.graphics.endFill();
    };
    p.setButtonText = function () {
        this.buttonTextField.text = this.buttonTextFieldText;
        this.buttonTextField.x = this.buttonTextFieldX;
        this.buttonTextField.y = this.buttonTextFieldY;
        this.buttonTextField.width = this.buttonTextFieldWidth;
        this.buttonTextField.bold = false;
        this.buttonTextField.textColor = this.buttonTextFieldColor;
    };
    p.drawButton = function () {
        this.drawButtonBack();
        this.setButtonText();
        this.button.addChild(this.buttonBack);
        this.button.addChild(this.buttonTextField);
    };
    p.drawPanel = function () {
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
    };
    p.onButtonClick = function (e) {
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
    };
    p.showPanel = function () {
        this.stage.addChild(this.panel);
    };
    p.removePanel = function () {
        this.stage.removeChild(this.panel);
    };
    p.onChange = function (task) {
        this.currentTaskId = task.id;
        this.changeTaskText(task.name, task.desc);
        this.changeButton(task.status);
        this.currentTaskStatus = task.status;
        this.showPanel();
    };
    p.changeTaskText = function (name, desc) {
        this.taskNameTextField.text = name;
        this.taskDescTextField.text = desc;
    };
    p.changeButton = function (taskStatus) {
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
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var TaskListPanel = (function () {
    function TaskListPanel(stage, taskService) {
        this.id = "TaskPanel";
        this.backColor = 0xFFFFFF;
        this.panelX = 0;
        this.panelY = 0;
        this.panelWidth = 200;
        this.panelHeight = 300;
        this.taskNameTextFieldText = "任务栏";
        this.taskNameTextFieldX = 50;
        this.taskNameTextFieldY = 30;
        this.taskNameTextFieldWidth = 150;
        this.taskNameTextFieldColor = 0xFFFFFF;
        this.taskDescTextFieldText = "任务内容";
        this.taskDescTextFieldX = 10;
        this.taskDescTextFieldY = 200;
        this.taskDescTextFieldWidth = 180;
        this.taskDescTextFieldColor = 0xFFFFFF;
        this.taskStateTextFieldText = "";
        this.taskStateTextFieldX = 50;
        this.taskStateTextFieldY = 100;
        this.taskStateTextFieldWidth = 100;
        this.taskStateTextFieldColor = 0xFF0000;
        this.stage = stage;
        this.taskService = taskService;
        this.taskService.addObserver(this, "TaskListPanel");
        this.panel = new egret.DisplayObjectContainer();
        this.taskNameTextField = new egret.TextField();
        this.taskDescTextField = new egret.TextField();
        this.taskStateTextField = new egret.TextField();
        this.backGround = new egret.Shape();
        this.drawPanel();
        this.getTask();
        this.stage.addChild(this.panel);
    }
    var d = __define,c=TaskListPanel,p=c.prototype;
    p.setText = function () {
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
    };
    p.drawBackGround = function () {
        this.backGround.graphics.beginFill(this.backColor, 0.3);
        this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
        this.backGround.graphics.endFill();
    };
    p.drawPanel = function () {
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
    };
    p.showPanel = function () {
        this.stage.addChild(this.panel);
    };
    p.onChange = function (task) {
        this.currentTaskId = task.id;
        this.changeTaskText(task.name, task.desc);
        this.changeButton(task.status);
        this.currentTaskStatus = task.status;
    };
    p.changeTaskText = function (name, desc) {
        this.taskNameTextField.text = name;
        this.taskDescTextField.text = desc;
    };
    p.changeButton = function (taskStatus) {
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
    };
    p.rule = function (taskList, id) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status != TaskStatus.UNACCEPTABLE) {
                console.log(id + " Find Task");
                return taskList[i];
            }
        }
    };
    p.getTask = function () {
        var task = this.taskService.getTaskByCustomRole(this.rule, this.id);
        this.onChange(task);
    };
    return TaskListPanel;
}());
egret.registerClass(TaskListPanel,'TaskListPanel');
//# sourceMappingURL=TaskPanel.js.map