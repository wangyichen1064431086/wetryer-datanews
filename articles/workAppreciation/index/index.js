/*
var iframe=window.parent.document.getElementById("articleContent")
function initIframeHeight(){
    console.log("Done");
    var height=document.defaultView.getComputedStyle(iframe,null).height;//heightΪcss��Ϊiframe���õĸ߶�
    var realHeight=iframe.contentDocument.body.scrollHeight;
    console.log("iframe's realHeight:"+realHeight);
    
    if(realHeight < height){
        iframe.height=height;
    }
    else{
        iframe.height=realHeight;
    }
}

document.body.onclick=initIframeHeight;
*/