var fruitObj = function () {
    this.alive = []; //bool,设置一个布尔值，活动果实或不活动果实
    this.x = [];
    this.y = [];
    this.aneNO = [];//海葵id
    this.l = []; //果实图片，bugl   
    this.spd = []; //果实速度
    this.fruitType = []; //果实类型
    this.orange = new Image();
    this.blue = new Image();

}
fruitObj.prototype.num = 15; //初始果实数量

fruitObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNO[i] = 0;
        this.spd[i] = Math.random() * 0.01 + 0.003; //[0.003,0.02)
        this.fruitType[i] = "";
        this.born(i);

    }
    this.orange.src = "./src/orange.png";
    this.blue.src = "./src/blue.png";
}

fruitObj.prototype.draw = function () {
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i] == true) {
            //定义果实类型
            if (this.fruitType[i] == "blue") {
                var pic = this.blue;
            } else {
                var pic = this.orange;
            }

            //设置上浮和大小
            if (this.l[i] <= 15) { //果实大小半径
                var NO = this.aneNO[i];
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.heady[NO];
                this.l[i] += this.spd[i] * deltaTime; //大小

            } else {
                this.y[i] -= this.spd[i] * 5 * deltaTime; //速度
                //ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

            //重置数量
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }
    }
}
fruitObj.prototype.born = function (i) {
    //果实出生时的海葵的id
    this.aneNO[i] = Math.floor(Math.random() * ane.num);
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if (ran <= 0.3) {
        this.fruitType[i] = "blue";
    } else {
        this.fruitType[i] = "orange";
    }

}

//果实被吃
fruitObj.prototype.dead = function (i) {
    this.alive[i] = false;
}

//果实刷新
function fruitMonitor() {
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) {
            num++;
        }
        if (num < 15) {
            sendFruit();
            return;
        }
    }
}

function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}