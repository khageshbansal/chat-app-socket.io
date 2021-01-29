var msg_box=document.querySelector(".msg-box");
var people_online=document.querySelector(".online");
var user_input=document.querySelector(".input");
var form=document.getElementById("submit_form");
var msg_box=document.querySelector(".msg-box");


function appending(msg_data,position)
{
    var span = document.createElement("span");
    span.innerText = msg_data;
    span.classList.add("msg");
    span.classList.add(position);
    msg_box.appendChild(span);
}


var socket = io();

 var name=prompt("Enter your name");
 
socket.emit("new-user-joined", name);

socket.on('user-name', data=> {
    let toappend=` ${data.name} joined chat`
    appending(toappend, "middle");
    
    people_online.innerText=data.online;
  });
  

  form.addEventListener('submit', (e)=>{
     e.preventDefault;
     if(user_input.value!=""){
     appending(`you: ${user_input.value}`, "right");
     socket.emit('send', user_input.value);
     user_input.value="";
    scroll();
    }
 })

 socket.on("msg-data",data=>{
    appending(`${data.name} : ${data.msg}`, "left");
  });

  socket.on("disconnection",data=>{
    appending(`${data.name} left the Chat`, "middle");
   
    people_online.innerText=data.online;
  });

 

function scroll(){
 msg_box.scrollTop=msg_box.scrollHeight;
}
  
