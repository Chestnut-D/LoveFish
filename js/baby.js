var babyObj = function () {
    this.x;
    this.y;
    this.angle; //鼠标的角度
    //this.babyEye = new Image();
    //this.babyBody = new Image();
    //this.babyTail = new Image();

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

}
babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 - 50;
    this.angle = 0;
    //this.babyEye.src = "./src/babyEye0.png"
    //this.babyBody.src = "./src/babyFade0.png"
    //this.babyTail.src = "./src/babyTail0.png"
}
babyObj.prototype.draw = function () {

    //lerp x,y; 小鱼：目标值，当前值，百分比；跟着大鱼坐标走
    this.x = lerpDistance(mom.x, this.x, 0.95);
    this.y = lerpDistance(mom.y, this.y, 0.95);

    //计算坐标差，实现转身; delta angle,Math.atan2(y,x)正切; 跟着大鱼转身
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-PI,PI

    //lerp angle,趋向于鼠标的角度
    this.angle = lerpAngle(beta, this.angle, 0.5);

    //baby tail count
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8; //取模，实现循环
        this.babyTailTimer %= 50; //复原计时器
    }
    //baby eye
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyTailTimer %= this.babyEyeInterval;
        if (this.babyEyeCount == 0) {
            this.babyEyeInterval = Math.random() * 1500 + 2000; //[0,1),后面单位ms
        }else{
            this.babyEyeInterval = 200;
        }
    }

    //baby body
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19){
            this.babyBodyCount = 19;
            //game over
            data.gameOver = true;
        }
    }

    ctx1.save();

    ctx1.translate(this.x, this.y); //转移原点到x，y
    ctx1.rotate(this.angle); //旋转画布，实现转向

    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 25, -babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5); //设置图片中心就是当前原点

    ctx1.restore();
}