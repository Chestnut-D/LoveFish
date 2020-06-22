var can1;
var can2;

var ctx1;
var ctx2;

//定义背景尺寸
var canWidth;
var canHeight;

var lastTime;
var daltaTime;

var bgPic = new Image();

//定义海葵
var ane;

//定义果实
var fruit;

var mom;
var baby;

//鼠标
var mx;
var my;

//鱼、尾、眼、
var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var data;

var wave;
var halo;

var dust;
var dustPic = [];

//主入口
document.body.onload = game;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

function init() {
    //获得canvas.getContext
    can1 = document.getElementById("canvas1"); //fishes，dust，ui，circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById("canvas2"); //background,ane,fruites
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove', onMouseMove, false);

    bgPic.src = "./src/background.jpg"; //获取图片背景路径

    //获取背景宽高
    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init(); //初始化

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    //鼠标
    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    //小鱼尾巴的虚拟帧
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png";
    }

    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }

    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    for (var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i + ".png";
    }

    for (var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }

    data = new dataObj();
    for (var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOra[i].src = "./src/bigSwim" + i + ".png"
        momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png"
    }
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";

    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();

    for (var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png"
    }
    dust = new dustObj();
    dust.init();


}


//帧，画,循环
function gameloop() {
    window.requestAnimationFrame(gameloop); //当前绘制完成之后，会根据机器性能，来绘制下一帧。而setInterval，setTimeout()则是设置固定的绘制时间
    //fps会不固定

    var now = Date.now();
    deltaTime = now - lastTime; //deltaTime，每两帧之间的时间间隔，保证动作连贯
    lastTime = now;
    if (deltaTime > 40) {
        deltaTime = 40; //固定时间间隔最大值
    }

    drawBackground(); //绘制背景
    ane.draw(); //绘制的海葵也要放到循环里

    fruitMonitor(); //重置果实
    fruit.draw(); //绘制果实

    ctx1.clearRect(0, 0, canWidth, canHeight); //清除上一帧画的东西，再画，线条会清楚些
    mom.draw(); //大鱼
    momFruitsCollision(); //果实被吃
    momBabyCollision();

    baby.draw(); //小鱼

    data.draw(); //分值

    wave.draw();
    halo.draw();

    dust.draw();


}

//鼠标
function onMouseMove(e) {
    //offSetX：鼠标指针位置相对于触发事件的对象的X坐标，以元素盒子模型的内容区域的左上角为参考点，如果有border，可能出现负值
    //layerX:鼠标相对于当前坐标系的X坐标，即如果触发元素没有设置绝对定位或相对定位，以页面为参考点；如果有，将改变参考系坐标，从触发元素盒子模型的border区域的左上角为参考点
    //当触发元素设置1了绝对定位或者相对定位后，offSetX和layerX几乎相等，唯一不同的是，一个从border为参考点，一个以内容为参考点
    if (!data.gameOver) {
        if (e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
            // console.log(mx, my);//打印鼠标坐标
        }
    }

}