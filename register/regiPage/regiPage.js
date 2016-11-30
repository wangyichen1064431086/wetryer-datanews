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

/*************************Ajax****************************/
/*
document.getElementById("submit").onclick=handleButtonPress;

var htr;

function handleButtonPress(e) {
    e.preventDefault();
    
    var form=document.getElementById("regiForm");
    
    var formData="";
    var inputElements=document.getElementsByTagName("input");
    for (var i=0;i<inputElements.length;i++) {
        if (inputElements[i].type!="radio") {
            formData+=inputElements[i].name+"="+inputElements[i].value+"&";
        }
        else{
            if (inputElements[i].checked) {
                formData+=inputElements[i].name+"="+inputElements[i].value+"&";
            }
        }
        
    }
    
    htr=new XMLHttpRequest();
    htr.onreadystatechange=handleResponse;
    htr.open("POST",form.action,false);
    htr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//设置请求标头，告诉服务器准备接受哪一种数据格式。
    htr.send(formData);
    //alert(htr);
}

function handleResponse() {
    if (htr.readyState==4) {
        if ((htr.status>=200&&htr.status<300)||htr.status==304) {
            document.getElementById("sectionContent").innerHTML=htr.responseText;
            //alert("successful");
        }
        else{
            document.getElementById("sectionContent").innerHTML="Unsuccessfull: "+htr.status;
        }
        
    }
}
*/
(function(){
    var myform=document.forms[0];
    EventUtil.addHandler(myform,"submit",function(event){
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        EventUtil.preventDefault(event);//阻止submit事件默认行为
        
        var subBtn=document.forms[0].elements["submit"];
        subBtn.disabled=true;//避免重复提交表单
        
        var form=document.forms[0];
        var inputElements=document.getElementsByTagName("input");
        var formArr=new Array();
        for (var i=0,len=inputElements.length;i<len;i++) {
            if (inputElements[i].type!="radio") {
                var t=inputElements[i].name+"="+inputElements[i].value+"&";
                formArr.push(t);
            }
            else{
                if (inputElements[i].checked) {
                     var t=inputElements[i].name+"="+inputElements[i].value+"&";
                    formArr.push(t);
                }
            }
        }
        var formData=formArr.join("");
        var htr=new XMLHttpRequest();
        var sectionContent=document.getElementById("sectionContent");
        htr.onreadystatechange=function(){
            if (htr.readyState==4) {
                if (htr.status>=200&&htr.status<300||htr.status==304) {
                    sectionContent.innerHTML=htr.responseText;//什么错误导致没返回。。
                    console.log(htr.responseText);
                }
            }
            else{
                sectionContent.innerHTML="Unseccessful:"+htr.status;
            }
        }
        htr.open("post",form.action,false);
        htr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        htr.send(formData); 
    })
})();



/*********************************登录弹窗****************************************/
(function(){
    var regiBlock=document.getElementById("changeDiv");
    var regiButton=document.getElementById("beforeRegi");
    
    EventUtil.addHandler(regiButton,"click",function(){
        regiBlock.style.setProperty("display","block");
    });
    
})();