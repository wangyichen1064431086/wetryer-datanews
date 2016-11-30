var buttons=document.getElementsByTagName("button");
var content=document.getElementById("emailcontent");
var storecontent=document.getElementById("storecontent");
var num=buttons.length;

var cons=new Array(num);//num=6

var peoplenumber=document.getElementById("pnumber");
var gender=document.getElementById("gender").getContext("2d");
var age=document.getElementById("age").getContext("2d");
var ifdonor=document.getElementById("ifdonor").getContext("2d");

var subjectline=document.getElementById("subjectline");

var pnumber=[155,11,7,6,6,4];
var genderline=[50,45,75,70,40,80];

var agemin=[0,10,8,12,25,20];
var agemax=[100,70,55,70,100,73];
var agemean=[65,68,60,65,75,60];

var ifdonorline=[70,60,75,100,100,100];
            
var subjectdata=new Array(num);
           
for(var i=0;i<num;i++){
  if (i==0) {
      cons[i]="You probably don't know Janet from Accokeek, Maryland.\n"+
      "But you two could be having dinner with President Obama together sometime soon.\n"+
      "Janet was the first guest selected for the next Dinner with Barack. And we're counting down the hours until we draw the next name. \n"+
      "The second seat could be yours -- you'll be automatically entered when you donate $XX or whatever you can today.\n"+
      "Janet told us that when she donated $XX last week she was just trying to show her support for the President.\n"+
      "No one ever thinks they'll be picked until they are.\n"+
      "Take the chance. Chip in $XX or more today to be automatically entered:\n"+
      "https://donate.barackobama.com/The-Second-Guest \n"+
      "Thanks,\n"+
      "Julianna\n"+
      "Julianna Smoot Deputy Campaign Manager Obama for America";//Email1
      
      subjectdata[i]="<tr><th>标题</th><th>#Emails</th></tr>"+
      "<tr><td>Janet just found out</td><td style='text-align: right'>151</td></tr>"+
      "<tr><td>Janet from Accokeek</td><td style='text-align: right'>3</td></tr>"+
      "<tr><td>Meet Janet</td><td style='text-align: right'>1</td></tr>";
  }
  else if (i==1) {
    cons[i]="Meet Janet -- a 61-year-old mother and grandmother from Accokeek, Maryland.\n"+
    "Last week, she was a supporter who clicked on an email and made a donation online. Now, she's the first out of four to be selected for dinner with the President.\n"+
    "We're counting down the hours until we pick the next winner -- and it could actually be you.\n"+  
    "Chip in $X or whatever you can to support this campaign, and you'll be automatically entered for the chance to join Janet, President Obama, and two other supporters for dinner sometime soon:\n"+
    "https://donate.barackobama.com/The-Second-Guest\n"+
    "Seriously -- give this a try.\n"+   
    "- Julianna\n"+
    "Julianna Smoot\n"+
    "Deputy Campaign Manager\n"+
    "Obama for America";
    
    subjectdata[i]="<tr><th>标题</th><th>#Emails</th></tr>"+
    "<tr><td>Janet just found out</td><td style='text-align:right'>7</td></tr>"+
    "<tr><td>Will the next seat be yours?</td><td style='text-align: right'>4</td></tr>";
  }
  else if (i==2) {
    cons[i]="\"You're going to have dinner with the President.\"\n"+
    "There are only a handful of people who will ever hear that sentence. And Janet from Accokeek, Maryland, just became one of them.\n"+
    "She learned she's the first guest to be selected for the upcoming dinner the President's having with four supporters.\n"+
    "We're counting down the hours until we pick the next winner. Will you be the next person who will hear that sentence?.\n"+
    "Pitch in $X or whatever you can to help support this campaign today, and you'll be automatically entered for the chance to join President Obama, Janet, and two other supporters for dinner sometime soon.\n"+
    "https://donate.barackobama.com/The-Second-Guest\n"+
    "You must be at least a little curious.\n"+
    "Julianna\n"+
    "Julianna Smoot\n"+
    "Deputy Campaign Manager\n"+
    "Obama for America";
    
    subjectdata[i]="<tr><th>标题</th><th>#Emails</th></tr>"+
    "<tr><td>Janet just found out</td><td style='text-align:right'>6</td></tr>"+
    "<tr><td>You must be at least a little curious</td><td style='text-align: right'>1</td></tr>";
  }
  else if (i==3) {//EMAIL4好使
    cons[i]="You probably don't know Janet from Accokeek, Maryland.\n"+
    "But you two could be having dinner with President Obama together sometime soon.\n"+   
    "Janet was the first guest selected for the next Dinner with Barack. And we're counting down the hours until we draw the next name.\n"+  
    "The second seat could be yours. Make a donation today to be automatically entered -- because you've saved your payment information, all you have to do is click the link below to complete your donation.\n"+
    "QUICK DONATE: $XXX [By clicking here, your saved credit card will be charged immediately.]\n"+                             
    "Or click here to donate another amount.\n"+                               
    "Janet told us that when she donated $XX last week she was just trying to show her support for the President. \n"+                              
    "No one ever thinks they'll be picked until they are. Take the chance. \n"+                               
    "QUICK DONATE: $XXX [By clicking here, your saved credit card will be charged immediately.] \n"+                               
    "Or click here to donate another amount:\n"+                                
    "https://donate.barackobama.com/The-Second-Guest\n"+                               
    "Thanks,\n"+                                
    "Julianna\n"+                                
    "Julianna Smoot\n"+                               
    "Deputy Campaign Manager\n"+                              
    "Obama for America";
    
    subjectdata[i]="<tr><th>标题</th><th>#Emails</th></tr>"+
    "<tr><td>Janet just found out</td><td style='text-align:right'>6</td></tr>";
  }
  else if (i==4) {
    cons[i]="Today we're rolling out a new, super-easy way to donate to this campaign -- and we're asking some of our best supporters to try it out.\n"+
    "Here's how it works: Because you've saved your payment information, all you have to do is click one link to complete your donation. The payment will be processed immediately.\n"+                                
    "Will you give it a try? When you do, you'll also automatically enter for the chance to be a guest at the next Dinner with Barack.\n"+
    "QUICK DONATE: $XX [By clicking here, your saved credit card will be charged immediately.]\n"+
    "Or click here to donate another amount.\n"+
    "Something you should know: For this to work in one click, you have to be logged in at BarackObama.com. If you're not, you'll be asked to enter your password before your payment can be processed.\n"+
    "We're rolling this out for a reason.\n"+
    "Our campaign will be driven by grassroots donations -- millions of Americans giving what they can when they can.\n"+
    "And if we're going to compete with the groups on the other side that are pumping millions into negative ads, we need it to be as easy as possible for anyone to chip in and help decide the outcome of this election.\n"+
    "So let's get this new Quick Donate system off to a strong start: \n"+
    "QUICK DONATE: $XX [By clicking here, your saved credit card will be charged immediately.]\n"+
    "Or click here to donate another amount:\n"+
    "https://donate.barackobama.com/Quick-Donate-Rollout\n"+
    "Julianna\n"+
    "Julianna Smoot\n"+
    "Deputy Campaign Manager \n"+
    "Obama for America";
    
    subjectdata[i]="<tr><th>标题</th><th>#Emails</th></tr>"+
    "<tr><td>Can you try this out?</td><td style='text-align:right'>6</td></tr>";
  }
  else if (i==5) {//EMAIL6好使
    cons[i]="You probably don't know Janet from Accokeek, Maryland.\n"+
    "But you two could be having dinner with President Obama together sometime soon.\n"+
    "Janet was the first guest selected for the next Dinner with Barack. And we're counting down the hours until we draw the next name.\n"+
    "Because of your previous donation, you're still eligible for that drawing -- thanks so much for pitching in.\n"+
    "You should know that if you give another $XX or whatever you can today, you'll be automatically entered again before we choose the next winner.\n"+
    "Janet told us that when she donated $XX last week she was just trying to show her support for the President.\n"+
    "No one ever thinks they'll be picked until they are.\n"+
    "Chip in $XX or more today to be automatically entered again before the second drawing:\n"+
    "https://donate.barackobama.com/The-Second-Guest\n"+
    "Thanks again for your support,\n"+
    "Julianna\n"+
    "Julianna Smoot\n"+
    "Deputy Campaign Manager\n"+
    "Obama for America";
    
    subjectdata[i]="<tr><th>标题</th><th>#Emails</th></tr>"+
    "<tr><td>Janet just found out</td><td style='text-align:right'>4</td></tr>";
  }
}

content.innerHTML=cons[0];//初始化邮件内容
storecontent.innerHTML=cons[0];

peoplenumber.innerHTML=pnumber[0];//初始化统计数据内容
   
gender.fillStyle="yellow";
gender.fillRect(0,0,genderline[0],20);

gender.fillStyle="black";
gender.font="14px sans-serif";
gender.fillText("F",10,15);

gender.fillStyle="green";
gender.fillRect(genderline[0],0,100,20);

gender.fillStyle="black";
gender.font="14px sans-serif";
gender.fillText("M",85,15);

age.fillStyle="rgb(250,250,250)";
age.fillRect(0,0,100,15);
age.fillStyle="lightgrey";
age.fillRect(agemin[0],0,agemax[0],15);

age.stokeStyle="black";
age.lineWidth="2";
age.beginPath();
age.moveTo(agemean[0],0);
age.lineTo(agemean[0],15);
age.stroke();


age.fillStyle="black";
age.font="14px sans-serif";
age.fillText("17",5,25);
age.fillText("74",85,25);


ifdonor.fillStyle="green";
ifdonor.fillRect(0,0,ifdonorline[0],20);

ifdonor.fillStyle="white";
ifdonor.font="14px sans-serif";
ifdonor.fillText("YES",10,15);

ifdonor.fillStyle="red";
ifdonor.fillRect(ifdonorline[0],0,100,20);

ifdonor.fillStyle="white";
ifdonor.font="14px sans-serif";
ifdonor.fillText("NO",85,15);

for(var i=0;i<buttons.length;i++){//为按钮事件绑定函数
    buttons[i].onclick=showemail;
    buttons[i].onmousemove=showchange;
    buttons[i].onmouseout=movechange;
  }

function showemail(e) {
  var pressedbutton=e.target;
  
  for(var i=0;i<buttons.length;i++){
    buttons[i].style.setProperty("background-color","white");//把所有按钮的样式清理为没触发时的样式
    buttons[i].style.setProperty("border","thin solid #B0C4DE");
    
    if (pressedbutton.id=="email"+(i+1)) {
      content.innerHTML=cons[i];//为邮件设置新内容
      storecontent.innerHTML=cons[i];//将新内容存储到storecontent中
      
      peoplenumber.innerHTML=pnumber[i];//为统计数据设置内容
      
      gender.fillStyle="yellow";
      gender.fillRect(0,0,genderline[i],20);//第三个参数为变量 genderline
      
      gender.fillStyle="black";
      gender.font="14px sans-serif";
      gender.fillText("F",10,15);
      
      gender.fillStyle="green";
      gender.fillRect(genderline[i],0,100,20);//第一个参数为变量genderline
      
      gender.fillStyle="black";
      gender.font="14px sans-serif";
      gender.fillText("M",85,15);
      
      age.fillStyle="rgb(250,250,250)";
      age.fillRect(0,0,100,15);
      age.fillStyle="lightgrey";
      age.fillRect(agemin[i],0,agemax[i],15);//第一个参数agemin,第三个参数agemax
      
      age.stokeStyle="black";
      age.lineWidth="2";
      age.beginPath();
      age.moveTo(agemean[i],0);//第一个参数为变量agemean
      age.lineTo(agemean[i],15);//第一个参数为变量agemean
      age.stroke();
      
      
      age.fillStyle="black";
      age.font="14px sans-serif";
      age.fillText("17",5,25);
      age.fillText("74",85,25);
    
      ifdonor.fillStyle="green";
      ifdonor.fillRect(0,0,ifdonorline[i],20);//第三个参数是变量ifdonorline
      
      ifdonor.fillStyle="white";
      ifdonor.font="14px sans-serif";
      ifdonor.fillText("YES",10,15);
      
      ifdonor.fillStyle="red";
      ifdonor.fillRect(ifdonorline[i],0,100,20);//第一个参数是变量ifdonorline
      
      if (ifdonorline[i]!=100) {
        ifdonor.fillStyle="white";
        ifdonor.font="14px sans-serif";
        ifdonor.fillText("NO",85,15);
      }
      
      subjectline.innerHTML=subjectdata[i];
   
    }
  }
  
  pressedbutton.style.setProperty("border-bottom","none");//为触发的按钮设置样式
  pressedbutton.style.setProperty("background-color","#E6E6FA");
}

function showchange(e) {
  var obj1=storecontent.innerHTML;
  for(var i=0;i<buttons.length;i++){
    if (e.target.id=="email"+(i+1)) {
      var obj2=cons[i];
    }
  }
  var compareresult = htmldiff.compare(obj1,obj2);
  content.innerHTML= compareresult;
}

function movechange(e){
  content.innerHTML=storecontent.innerHTML;
}



