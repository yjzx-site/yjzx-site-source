// 标签创建逻辑 
function creatElem (dom, target) {
    
    //图片部分ul标签
    var sliderTop = document.createElement("ul");
    sliderTop.setAttribute("class", "sliderPageTop");

    //小圆点部分ul标签
    var sliderBottom = document.createElement("ul");
    sliderBottom.setAttribute("class", "sliderPageBottom");
    var leng = target.length;
    // 循环创建出个li
    for (var i = 0; i < leng; i++) {

        //图片部分li标签插入图片部分ul标签内
        sliderTop[i] = document.createElement("li"); 
        var div = document.createElement("div");
        div.appendChild(target[i]);
        sliderTop[i].appendChild(div);
        sliderTop.appendChild(sliderTop[i]);

        //小圆点部分li标签插入小圆点部分ul标签内
        sliderBottom[i] = document.createElement("li"); 
        sliderBottom.appendChild(sliderBottom[i]);

    }
    sliderTop[leng] = document.createElement("li");
    var divLast = document.createElement("div");
    divLast.appendChild(target[0]);
    sliderTop[leng].appendChild(divLast);
    sliderTop.appendChild(sliderTop[leng]);

    // 因为n张图的轮播需要5个li来装图片，但小圆点只要4个，所以要删除最后一个
    // sliderBottom.removeChild(sliderBottom.leng);

    // 图片部分ul标签插入div标签里
    dom.appendChild(sliderTop);
    
    
    
    // 在div标签里创建图片两边的按钮span标签并插入
    var buttonLeft = document.createElement("sapn");
    var buttonRight = document.createElement("span");
    dom.appendChild(buttonLeft);
    dom.appendChild(buttonRight)
    buttonLeft.setAttribute("class", "btn btn-left");
    buttonRight.setAttribute("class", "btn btn-right");
    buttonLeft.innerHTML = "&lt";
    buttonRight.innerHTML = "&gt";

    // 小圆点部分的第一个li初始化为选中
    sliderBottom[0].setAttribute("class", "active");
    // 小圆点部分ul标签插入div标签里
    dom.appendChild(sliderBottom);

    // 在head标签里创建style标签并插入
    var style = document.createElement("style");
    
    // 给创建好的标签添加样式逻辑
    // 图片标签样式
    style.innerHTML = "* {padding: 0px; margin: 0px; list-style: none}" + 
        ".wrapper {height: 350px; width: 500px; position: relative; margin: 150px auto; overflow: hidden; border: 1px solid black;}" + 
        ".wrapper .sliderPageTop {position: absolute; height: 350px; top: 0px; left: 0px;}" + 
        ".wrapper .sliderPageTop li {float: left; height: 350px; width: 500px;}" + 
        ".wrapper .sliderPageTop li img{width: 100%; height: 100%;}" + 

        // 按钮span标签样式
        ".wrapper .btn{height: 36px; width: 50px; position: absolute; background-color: black; top: 50%; margin-top: -25px; color: #fff; text-align: center; line-height: 36px; border-radius: 50%; opacity: 0.2; font-size: 25px;}" + 
        ".wrapper .btn:hover{opacity: 0.5;cursor: pointer;}" + 
        ".wrapper .btn-left{left: 20px;}" + 
        ".wrapper .btn-right{right: 20px;}" + 

        // 小圆点部分标签样式
        ".wrapper .sliderPageBottom{position: absolute; height: 10px; left: 50%; margin-left: -45px; bottom: 30px; }" + 
        ".wrapper .sliderPageBottom li{float: left; height: 10px; width: 10px; background-color: #c7c2c2; margin-right: 5px; border-radius: 50%;}" + 
        ".wrapper .sliderPageBottom .active{background-color: #f40;}"; 

   
    
    //根据传入的图片数量的不同，控制ul的宽度足以容纳这些图片
    var liWidth = parseInt(getStyle(sliderTop.children[0], "width"));
    sliderTop.style.width = liWidth * (sliderTop.children.length ) + "px";
    console.log(liWidth);
    // 将样式写好后再将style标签插入，可以省很多效率
    oHead.appendChild(style);
}

var oHead = document.getElementsByTagName("head")[0];
var oDiv = document.getElementById('box');

            // 需要插入的地方
creatElem( oDiv,["img1/link1.jpg", "img1/link2.jpg", "img1/link3.jpg",  "img1/link2.jpg", "img1/link3.jpg", "img1/link4.jpg", "img1/link5.jpg"]);

// 轮播运动逻辑函数
function getStyle(elem, prop) {// 查询计算样式的兼容性方法
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];   
    } else {
        return elem.currentStyle[prop];
    }
}
// 轮播图缓冲运动核心
function startMove(dom, attrObj, callback) {
    // attrObj为需要运动的属性和目标值的一个对象{left: 400, height: 400, opcity: 0.5}
    clearInterval(dom.timer);       //保证同一时间只有一个运动函数执行
    var iSpeed = null,
    // iCur记录attrObj的某一属性的当前值
        iCur = null;
        dom.timer = setInterval(function () {
            var bStop = true;
            for (var attr in attrObj) {
                if (attr === "opacity") {
                    iCur = parseFloat(getStyle(dom, attr)) * 100;
                } else {
                    iCur = parseInt(getStyle(dom, attr));
                }
                iSpeed = (attrObj[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if(attr === "opacity"){
                    dom.style.opacity = (iCur + iSpeed) / 100;
                }else{
                    dom.style[attr] = iCur + iSpeed + "px";
                }
                // 判断如果有一个属性的当前值不等于目标点时，那么不清除定时器
                if(iCur != attrObj[attr]){
                    bStop = false;
                }
            }
            if(bStop){
                clearInterval(dom.timer);
                typeof callback == "function" && callback();
            }
    }, 30);	
}

var oUl = document.getElementsByClassName('sliderPageTop')[0];
var oBottom = document.getElementsByClassName('sliderPageBottom')[0];
var moveWidth = oUl.children[0].offsetWidth;
var btnLeft = document.getElementsByClassName("btn-left")[0];
var btnRight = document.getElementsByClassName("btn-right")[0];
var num = oUl.children.length - 1;
var timer = null;
var child = oBottom.children;
var len = child.length; 
// 给运动函数上锁
var lock = true;
// 小圆点根据index索引进行运动
var index = 0;



// 当点击图片左右两边按钮时
btnLeft.onclick = function () {
    autoMove("<");
}
btnRight.onclick = function () {
    autoMove(">");
}


// 点击图片下面的小圆点时
for (var i = 0; i < len; i ++) {
    (function (myIndex) {
        child[myIndex].onclick = function () {
            // alert(myIndex)  点击到那个小圆点时，就运动到该圆点索引
            lock = false;
            clearTimeout(timer);
            index = myIndex;
            startMove(oUl,{left : - moveWidth * myIndex}, function () {
                lock = true;
                timer = setTimeout(autoMove, 1000);
                changeIndex(index);
            })
        
        }
    }(i))
}


// 运动主函数
function autoMove (direction) {
    if (lock) {
        // 当发生点击事件或默认让图片运动时，立马给运动函数上锁
        lock = false;
        // 防止自动轮播与点击轮播同时存在发生冲突，即当发生点击轮播时，清除自动轮播的定时器，
        // 当自动轮播时该句不发生作用。
        clearTimeout(timer);
        // 默认轮播方向和点击图片右侧的按钮
        if (!direction || direction == ">") {
            index++;
            startMove(oUl, {left : oUl.offsetLeft - moveWidth}, function () {
                if (oUl.offsetLeft == - moveWidth * num){
                    index = 0;
                    oUl.style.left = "0px";
                }
                // 重新开启一个新的自动轮播的定时器
                timer = setTimeout(autoMove, 1000);
                // 当前图片运动到目标点时，进行开锁
                lock = true;
                changeIndex(index);
            })
            
        // 点击图片左侧按钮
        }else if(direction == "<") {
    
            // 当一刷新页面就立即点击左侧按钮时
            if (oUl.offsetLeft == 0){
                oUl.style.left = - moveWidth * num + "px";       //在第一张图片刚要运动前，让整个ul闪到最后一张图片
                index = num;                                     //实时更新小圆点的位置
            }
            index--;
            startMove(oUl, {left : oUl.offsetLeft + moveWidth}, function () {
    
                // 当不写这条语句时，可理解为该自动轮播已转为点击事件轮播
                timer = setTimeout(autoMove, 1000);
                lock = true;
                changeIndex(index);
            })
        }
    }
}


// 小圆点跟随图片运动
function changeIndex (index) {
    var child = oBottom.children;
    var len = child.length; 
    for (var i = 0; i < len; i++) {
        child[i].className = "";
    }
    child[index].className = "active";
}

timer = setTimeout(autoMove, 1000);