var momObj = function () {
    this.x;
    this.y;
    this.angle;
    //this.bigEye = new Image();
    //this.bigBody = new Image();
    //this.bigTail = new Image();

    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;

    this.momBodyCount = 0;
}
momObj.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    //this.bigEye.src = "./src/bigEye0.png"
    //this.bigBody.src = "./src/bigSwim0.png"
    //this.bigTail.src = "./src/bigTail0.png"
}
momObj.prototype.draw = function () {

    //lerp x,y; 大鱼：目标值，当前值，百分比；跟着鼠标坐标走
    this.x = lerpDistance(mx, this.x, 0.9);
    this.y = lerpDistance(my, this.y, 0.9);

    //计算坐标差，实现转身; delta angle,Math.atan2(y,x)
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI,PI

    //lerp angle,趋向于鼠标的角度
    this.angle = lerpAngle(beta, this.angle, 0.3);

    //tail
    this.momTailTimer += deltaTime;
    if(this.momTailTimer > 50){
        this.momTailCount = (this.momTailCount + 1) % 7;
        this.momTailTimer %= 50;
    }

    //Eye
    this.momEyeTimer += deltaTime;
    if(this.momEyeTimer > this.momEyeInterval){
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momTailTimer %= this.momEyeInterval;
        if(this.momEyeCount == 0){
            this.momEyeInterval = Math.random() * 1500 + 2000;
        }else{
            this.momEyeInterval = 200;
        }
    }


    ctx1.save();
    ctx1.translate(this.x, this.y);
    //旋转画布，实现转向
    ctx1.rotate(this.angle);

    var momBodyCount = this.momBodyCount;
    if(data.double == 1){
        ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
    }else{
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);
    }
    var momEyeCount = this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
    var momTailCount = this.momTailCount;
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
    ctx1.restore();
}