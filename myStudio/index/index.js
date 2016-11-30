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
/****************************************文章类型列表*************************************/
var articleOptions=document.querySelectorAll(".articleMenu li");

//Dom污染法

for(var i=0,len=articleOptions.length;i<len;i++){
    articleOptions[i].index=i;
    articleOptions[i].onclick=function(){
      this.style.setProperty("background-color","#9CCD64");
      for(var i=0;i<len;i++){
            if (i!=this.index) {
                articleOptions[i].style.setProperty("background-color","lightgray");
            }
        } 
      
    };
}

/*********************************登录弹窗****************************************/
var regiBlock=document.getElementById("changeDiv");
var regiButton=document.getElementById("beforeRegi");
regiButton.onclick=function(e){
    regiBlock.style.setProperty("display","block");
}

/**************************读取localStorage的readGoto，激活相应按钮，载入相应iframe*******************************/
var readGotoValue=localStorage.getItem("myStudioGoto");
var articleContent=document.getElementById("articleContent");
//两种js的switch语句写法：
if (readGotoValue) {
    switch (readGotoValue) {
        case "option0":
            articleOptions[0].style.setProperty("background-color","#9CCD64");
            articleOptions[1].style.setProperty("background-color","lightgray");
            articleOptions[2].style.setProperty("background-color","lightgray");
            articleContent.src="../writeNewArticle/writeNewArticle.html";
            break;
        case "option1":
            articleOptions[0].style.setProperty("background-color","lightgray");
            articleOptions[1].style.setProperty("background-color","#9CCD64");
            articleOptions[2].style.setProperty("background-color","lightgray");
            articleContent.src="../myArticles/index/index.html";
            break;
        case "option2":
            articleOptions[0].style.setProperty("background-color","lightgray");
            articleOptions[1].style.setProperty("background-color","lightgray");
            articleOptions[2].style.setProperty("background-color","#9CCD64");
            articleContent.src="../myInfo/myInfo.html";
            break;
        default:
            articleOptions[0].style.setProperty("background-color","#9CCD64");
            articleOptions[1].style.setProperty("background-color","lightgray");
            articleOptions[2].style.setProperty("background-color","lightgray");
            articleContent.src="../writeNewArticle/writeNewArticle.html";
    }
}


/******************点击导航栏的”精品文章“设置localStorage的readGoto为option0，即从此处进入article页面激活的是新闻资讯*/
var goodArticle=document.getElementById("goodArticle");
goodArticle.onclick=function(){
    localStorage.setItem("readGoto","option0");
}
