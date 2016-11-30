/**********************保存文章的Ajax********************************/
document.getElementById("save").onclick=handleButtonPress;

var htr;

var identityValue=localStorage.getItem("identity");
console.log(identityValue);
document.cookie=encodeURIComponent("identity")+"="+encodeURIComponent(identityValue);

function handleButtonPress(e) {
    e.preventDefault();
    
    var form=document.getElementById("writeMyArticle");
    
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
    
    var mainText=document.getElementsByTagName("textarea")[0];
    formData+=mainText.name+"="+mainText.value+"&";


    htr=new XMLHttpRequest();
    htr.onreadystatechange=handleResponse;
    htr.open("POST",form.action,false);
    htr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//设置请求标头，告诉服务器准备接受哪一种数据格式。
    htr.send(formData);
}

function handleResponse() {
    if (htr.readyState==4) {
        if ((htr.status>=200&&htr.status<300)||htr.status==304) {
            document.getElementsByTagName("body")[0].innerHTML=htr.responseText;
        }
        else{
            document.getElementsByTagName("body")[0].innerHTML="Unsuccessfull: "+htr.status;
        }
        
    }
}

//要通过n登录后服务器nodejs给客户端发送cookie，然后提交文章时再把cookie发送过去，然后服务器nodejs通过判断cookie来添加到相应的用户数据库。