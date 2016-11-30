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

/****************关闭按钮的交互效果*******************/

(function(){
    var closeButton=document.querySelector("#close");
    EventUtil.addHandler(closeButton,"mouseenter",function() {
        closeButton.style.setProperty("background-color","#9CCD64");
    });
    EventUtil.addHandler(closeButton,"mouseleave",function() {
        closeButton.style.setProperty("background-color","white");
    });
    
    
    EventUtil.addHandler(closeButton,"click",function(){
        window.parent.document.getElementById("changeDiv").style.display="none";
    })

})();


/***********登陆Ajax*********/

(function(){
    document.getElementById("mylogin").onclick=handleLogin;
    var myLog=document.getElementById("mylogin");
    EventUtil.addHandler(myLog,"click",handleLogin);
    var htr1;
    var inputElements1;
    function handleLogin(event) {
        event=EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
       
        var form1=document.forms["idpwform"];
        
        var formData1="";
        inputElements1=document.getElementsByTagName("input");
        for (var i=0,len=inputElements1.length;i<len;i++) {
            if (inputElements1[i].type!="radio") {
                formData1+=inputElements1[i].name+"="+inputElements1[i].value+"&";
            }
            else{
                if (inputElements1[i].checked) {
                    formData1+=inputElements1[i].name+"="+inputElements1[i].value+"&";
                }
            }
            
        }
        
        htr1=new XMLHttpRequest();
    
        htr1.onreadystatechange=myResponse;
        htr1.open("POST",form1.action,false);
        htr1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//设置请求标头，告诉服务器准备接受哪一种数据格式。
        htr1.send(formData1);
        //alert(htr1);
    }
    
    function myResponse() {
        if (htr1.readyState==4) {
            if ((htr1.status>=200&&htr1.status<300)||htr1.status==304) {
                window.parent.document.getElementById("regi").innerHTML=htr1.responseText;
                window.parent.document.getElementById("changeDiv").style.setProperty("display","none");
                
                var welcomeValue=htr1.responseText;
                localStorage.setItem("welcome",welcomeValue);
                localStorage.setItem("identity",inputElements1[0].value);
                console.log(localStorage.getItem("identity"));
            }
            else{
                alert("unsuccessful");  
            }
            
        }
    }
})();