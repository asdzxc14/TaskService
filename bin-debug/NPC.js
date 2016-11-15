var npcImage = {
    npc_0: "NPC1_png",
    npc_1: "NPC2_png",
    ACCEPTABLEimage: "ACCEPTABLE_png",
    DURINGimage: "DURING_png",
    CCAN_SUBMITimage: "CAN_SUBMIT_png",
};
var NPC = (function () {
    function NPC(npcId, npcName) {
        this.tileSize = 64;
        this.emojiX = 0;
        this.emojiY = 64;
        this.npcStageWidth = 64;
        this.npcStageHeight = 128;
        this.npcStage = new egret.DisplayObjectContainer();
        this.npcStageShape = new egret.Shape();
        this.emoji = new egret.Bitmap();
        this.npcId = npcId;
        this.npcName = npcName;
    }
    var d = __define,c=NPC,p=c.prototype;
    p.setemoji = function () {
        this.emoji.texture = RES.getRes(npcImage.npc_0);
        this.emoji.x = this.emojiX;
        this.emoji.y = this.emojiY;
        this.emoji.width = this.tileSize;
        this.emoji.height = this.tileSize;
    };
    p.setNpc = function (npcX, npcY, npcColor) {
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
    };
    p.onChange = function (task) {
        this.task = task;
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map