/***********************跨浏览器的事件处理对象************************/
var EventUtil={
    addHandler:function(element,type,handler){
        if (element.addEventListener) {
            element.addEventListener(type,handler,false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on"+type,handler);
        }
        else{
            element["on"+type]=handler;
        }
    },
    removeHandler:function(element,type,handler){
        if (element.removeEventListener) {
            element.removeEventListener(type,handler,false);
        }
        else if (element.detachEvent) {
            element.detachEvent("on"+type,handler);
        }
        else{
            element["on"+type]=null;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    preventDefault:function(event){
        if (event.preventDefault) {
            event.preventDefault();
        }
        else{
            event.returnValue=false;
        }
    },
    getTarget:function(event){
        return event.target?event.target:event.srcElement;
    },
    stopPropagation:function(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else{
            event.cancelBubble=true;
        }
    },
    addClass:function(element,oneclass){//为元素添加样式表
        if (element.classList) {//仅FireFox3.6+、Chrome支持
            element.classList.add(oneclass);
        }
        else{
            var classNames=element.className.split(/\s+/);
            classNames.push(oneclass);
            element.className=classNames.join(" ");
        }
    },
    removeClass:function(element,oneclass){
        if (element.classList) {
            element.classList.remove(oneclass);
        }
        else{
            var classNames=element.className.split(/\s+/);
            for (var i=0,len=classNames.length;i<len;i++) {
                if (classNames[i]==oneclass) {
                    classNames.splice(i,1);
                    break;
                }
            }
            element.className=classNames.join(" ");
        }
    }
};


/**********************************导航栏 纯手写（也可用bootstrap框架的nav）***************************************/
(function(){
    var navoptions=document.getElementsByClassName("navoption");
    var dropdown=document.getElementsByClassName("dropdown")[0];
    for(var i=0;i<navoptions.length;i++){
        if (i==2) {
            navoptions[i].onmouseenter=chColorShowSub;
            //navoptions[i].onmouseleave=reColorHideSub;
        }
        else{
            navoptions[i].onmouseenter=changeColor;//注意这里不能用onmouseover和onmouseout,因为这样的话其后代元素会单独再触发一遍
            navoptions[i].onmouseleave=recoverColor;
        }
    }
    
    function chColorShowSub(event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        target.style.background='#228B22';
       // dropdown.style.removeProperty('display');//为何不行？？ //dropdown.style.display='none';也不行
        dropdown.style.setProperty("display","block");
      
    }
    
    function changeColor(event){
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        target.style.background='#228B22';
        navoptions[2].style.setProperty("background-color","#9CCD64");
        dropdown.style.setProperty("display","none");
    }
    
    function recoverColor(event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        target.style.removeProperty('background');
       
    }
    
    if (dropdown.style.display!='none') {
        dropdown.onmouseleave=reColorHideSub;//从子菜单移走时，该子菜单消失，母标题恢复非触发颜色
        var dropoptions=document.querySelectorAll(".dropdown>li");
        for(var j=0,len=dropoptions.length;j<len;j++){
            dropoptions[j].onmouseenter=changeSubColor;
            dropoptions[j].onmouseleave=recoverSubColor;
        }
    }
    
    function reColorHideSub(event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        navoptions[2].style.removeProperty('background');
        target.style.setProperty("display","none");
    }
    
    function changeSubColor(event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        target.style.setProperty("background-color","#228B22");
    }
    
    function recoverSubColor(event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        target.style.setProperty("background-color","#9CCD64");
    }
})();

/***************************检测localStorage的welcome*****************************/
EventUtil.addHandler(window,"load",function(){
    if (localStorage.getItem("welcome")) {//已在其他页面登陆，则每个页面都显示用户昵称
        document.getElementById("regi").innerHTML=localStorage.getItem("welcome");
    }
});

EventUtil.addHandler(window,"unload",function(){
    if (localStorage.getItem("welcome")) {
        localStorage.removeItem("welcome");
    }
});
/*
window.onload=function(){
    if (localStorage.getItem("welcome")) {//已在其他页面登陆，则每个页面都显示用户昵称
        document.getElementById("regi").innerHTML=localStorage.getItem("welcome");
    }
}


window.onunload=function(){
    if (localStorage.getItem("welcome")) {
        localStorage.removeItem("welcome");
    }
}*/


/***********************************旋转木马效果**********************************************/

(function(){
    var calButtons=document.querySelectorAll("#myCarButtons button");
    var carBtn=document.getElementById("myCarButtons");//选取按钮的上级div作为事件委托的不具体元素
    var myCalContent=document.getElementById("myCarContent");
    var calContents=new Array();//设置myCalContent的内容数组
    var numBu=calButtons.length;//3个按钮，numBu为3
        
    var count=0;//初始化间隔计时器计时值
    var showCount=document.getElementById("showCount");//在网页上显示计时数字
    var flag=0;//标志是否按下按钮，1为按下，0为未按下
    var start=null;//标记有无已经开启自动播放，若已开启自动播放，则不要再开启第二次
    
    calContents[0]="<a target='_blank' href='../articles/treasureHunt/2/IntroduceofGephi.html'><img src='pic/calContents1.png' alt='calContents0'/></a>";
    calContents[1]="<a target='_blank' href='../articles/treasureHunt/1/Introduce of treasure hunt.html'><img src='pic/calContents2.png' alt='calContents1'/></a>";
    calContents[2]="<img src='pic/calContents3.png' alt='calContents2'/>";
    myCalContent.innerHTML=calContents[0];//初始化旋转木马版块myCalContent的内容
    calButtons[0].style.setProperty("background-color","#9CCD64");//初始化第一个旋转木马按钮为浅绿
    
    /**********自动播放，每隔3000ms按钮变色，同时切换到相应图片****************/
    function changeNowBu() {
        showCount.innerHTML=count;///在网页上显示计时数字

        if (count==0) {
            calButtons[0].style.setProperty("background-color","#9CCD64");
            calButtons[1].style.setProperty("background-color","white");
            calButtons[2].style.setProperty("background-color","white");
            myCalContent.innerHTML=calContents[0];
        }
        else if (count==1) {
            calButtons[0].style.setProperty("background-color","white");
            calButtons[1].style.setProperty("background-color","#9CCD64");
            calButtons[2].style.setProperty("background-color","white");
            myCalContent.innerHTML=calContents[1];
        }
        else if (count==2) {
            calButtons[0].style.setProperty("background-color","white");
            calButtons[1].style.setProperty("background-color","white");
            calButtons[2].style.setProperty("background-color","#9CCD64");
            myCalContent.innerHTML=calContents[2];
        }
        count++;
        if (count==3) {
            count=0;
        }
        if (flag==0) {
            setTimeout(changeNowBu,3000);
        }
    }
    start=setTimeout(changeNowBu,3000);//开启按钮间隔变更函数changeNowBu，changeNowBu中检测flag值决定要不要继续进行下去
                                //此处采用超时调用代替间隔调用
    /****按按钮时出现对应图片********/

    EventUtil.addHandler(carBtn,"click",function(event){//使用事件委托
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
       // var pressedBu=e.target;
        if (target.className=="aniBu") {//只有点到按钮上才有效
            clearTimeout(start);
            flag=1;
            for (var i=0;i<numBu;i++) {//先将所有按钮都处理成白色，浅绿边
                calButtons[i].style.setProperty("background-color","white");
                calButtons[i].style.setProperty("border","thin solid #9CCD64");
            }
            
            var n=target.id.slice(-1);//通过按下的按钮的id得知其是第几个按钮，再对按下的按钮进行相应操作
            myCalContent.innerHTML=calContents[n];
            count=n;
            showCount.innerHTML=count;
            target.style.setProperty("background-color","#9CCD64");
            
            start=setTimeout(function(){
                flag=0;
                changeNowBu();
            },3000);////按下按钮等待3000ms后无其他操作，则将flag重设为0,并再次恢复执行按钮间隔变更函数changeNowBu    
        }
    });
    
})();

/**********************内容排列区域图标:鼠标放上去，会形成一波光晕******************************/
(function () {
    
    var sectionLogos=document.querySelectorAll(".sectionLogo");
   //被z-index遮住的元素鼠标放上去不能感应到该元素？？
    
    //这里不能用事件委托，因为mouseenter,mouseleave不冒泡（其他鼠标事件都冒泡） 
    for(var i=0;i<sectionLogos.length;i++){
        sectionLogos[i].onmouseenter=addWave;//不能用onmouseover,这里虽然父元素和子元素区域重合，但重合部分默认获取的就是子元素了？？
        sectionLogos[i].onmouseleave=deleteWave;
    }

    function addWave(event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        if (target==sectionLogos[0]) {
            EventUtil.addClass(document.querySelector(".back0"),"logoWave");
           //document.querySelector(".back0").classList.add("logoWave");
        }
        else if (target==sectionLogos[1]) {
            EventUtil.addClass(document.querySelector(".back1"),"logoWave");
           //document.querySelector(".back1").classList.add("logoWave");
        }
        else if (target==sectionLogos[2]) {
            EventUtil.addClass(document.querySelector(".back2"),"logoWave");
           //document.querySelector(".back2").classList.add("logoWave");
        }
        
    }
    
    function deleteWave(event){
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        if (target==sectionLogos[0]) {
            EventUtil.removeClass(document.querySelector(".back0"),"logoWave");
            //document.querySelector(".back0").classList.remove("logoWave");
        }
        else if (target==sectionLogos[1]) {
            EventUtil.removeClass(document.querySelector(".back1"),"logoWave");
            //document.querySelector(".back1").classList.remove("logoWave");
        }
        else if (target==sectionLogos[2]) {
            EventUtil.removeClass(document.querySelector(".back2"),"logoWave");
            //document.querySelector(".back2").classList.remove("logoWave");
        }
    }

})();
   

   
/*********************************登录弹窗****************************************/
(function(){
    var regiBlock=document.getElementById("changeDiv");
    var regiButton=document.getElementById("beforeRegi");
    
    EventUtil.addHandler(regiButton,"click",function(){
        regiBlock.style.setProperty("display","block");
    });
    
})();


/***********************点击“阅读更多”跳转到article页面激活相应按钮******************/
(function(){
    var readmoreBtns=document.getElementsByClassName("sectionReadMore");

    for (var i=0,len=readmoreBtns.length;i<len;i++) {
        (function(a){
            EventUtil.addHandler(readmoreBtns[a],"click",function(){
                localStorage.setItem("readGoto","option"+a);
            })
        })(i);
    }
})();

/******************点击导航栏的”精品文章“设置localStorage的readGoto为option0，即从此处进入article页面激活的是新闻资讯*/
(function(){
    var goodArticle=document.getElementById("goodArticle");
    
    EventUtil.addHandler(goodArticle,"click",function(){
        localStorage.setItem("readGoto","option0");
    });
})();

/*******************点击“我要投稿”按钮，检查是否登录，如没有登录，先登录；如已经登录，跳转到“我的工作室”界面***/
(function(){
    var regiBlock=document.getElementById("changeDiv");
    var iWill=document.querySelector(".iWillBu");
    EventUtil.addHandler(iWill,"click",function(){
        if (!(localStorage.getItem("welcome"))) {
            regiBlock.style.setProperty("display","block");
        }
        else{
            localStorage.setItem("myStudioGoto","option0");
            window.open("../myStudio/index/index.html","_blank");
        }
        
    });

})();
