var aneObj = function () {
    //start point, control point,end point
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];//振幅
    this.alpha = 0; //正弦角度
}

aneObj.prototype.num = 65;


//海葵位置
aneObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20; //每段距离一棵
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
}


//画海葵
aneObj.prototype.draw = function () {
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha); //[-1 , 1]

    ctx2.save(); //ctx2.save();和ctx2.restore();  告诉画布，在这两个API之间的样式定义只在这一段之间起作用
    ctx2.globalAlpha = 0.8; //透明
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round"; //弧形结尾
    ctx2.strokeStyle = "#3b154e"; //strokeStyle一定要在stroke之前，先给颜色再涂
    for (var i = 0; i < this.num; i++) {
        //使用到的API：beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha透明度
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);

        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]); //海葵高度
        ctx2.stroke();
    }
    ctx2.restore();
}