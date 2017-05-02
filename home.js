var schedule = [];

function setUsername()
{
    let username = "alec";
    
}
let username = "alec";

function add(){
    let newVar = document.getElementById("classname").value;
    console.log(newVar);
    if(document.getElementById("classname").value == "")
        {
            console.log("empty");
            alert("Please name your event.");
            return false;
            //return false;
            //break;
        }
    else{
        
        console.log("filled out");
        console.log("see: " + document.getElementById("classname").value);
    }
    
    
    var classdays=[];
    var time=[];
    let day=document.getElementById("days");
    for(var i=0; i<day.children.length; i++){
      if(day.children[i].children[0].checked==true){
        classdays.push(day.children[i].children[0].value);
        day.children[i].children[0].checked=false;
      }
    }
    if(classdays.length == 0)
        {
            alert("Please select at least one day.");
            return false;
        }
    var tstart=document.getElementById("start-time").value.split(':');
    var starthr=tstart[0];
    let start=document.getElementById("start-time").value;
    if(starthr<12){
          time.push(start + " AM");
    }
    else{
      var newhr=starthr-12;
      var t=[newhr,tstart[1]];
      start=t.join(':');
      time.push(start+ " PM");
    }
    var tend=document.getElementById("end-time").value.split(':');
    var endhr=tend[0];
    let end=document.getElementById("end-time").value;
    if(endhr<12){
      time.push(end + " AM");
    }
    else{
      var newhr=endhr-12;
      var t=[newhr,tend[1]];
      end=t.join(':');
      time.push(end+ " PM");
    }
    schedule.push({
      classname:document.getElementById("classname").value,
      days: classdays,
      time: time
    });
    //localStorage.setItem("schedule", schedule);
    document.getElementById("classname").value="";
    makeModel();
    saveSchedule();
  }

function makeModel(){
    let clist=document.getElementById('calendar-list');
      let newclass=document.createElement('li');
      newclass.innerHTML=schedule[schedule.length-1]["classname"] + "<br/>" +schedule[schedule.length-1]["days"].join(" ") + " | " +schedule[schedule.length-1]["time"].join("-") + "<br/>";
      let b1= document.createElement('button');
      var b2= document.createElement('button');
      let s1=document.createElement('span');
      let s2=document.createElement('span');
      s1.innerHTML="Add to calendar";
      s2.innerHTML="Remove from List";
      b1.appendChild(s1);
      b2.appendChild(s2);
//      b1.addEventListener('click', addToCalendar);
      b1.classList.add('button');
      b2.addEventListener('click',remove);
      b2.classList.add('button');
      newclass.appendChild(b1);
      newclass.appendChild(b2);
      clist.appendChild(newclass);

}

function remove(){
    let item=this.parentNode;
    let list=item.parentNode;
    let text= item.innerHTML;
    var classname=text.split("<br>");
    for(var i =0; i<schedule.length;i++){
      if(schedule[i]["classname"]==classname[0]){
        schedule.splice(i,1);
        break;
      }
    }
    //slocalStorage.setItem("schedule", schedule);
    list.removeChild(item);
    saveSchedule();
}

function refresh(){
  let clist=document.getElementById('calendar-list');
  var i=0;
  while(i<schedule.length){
    let newclass=document.createElement('li');
    newclass.innerHTML=schedule[i]["classname"] + "<br/>" +schedule[i]["days"].join(" ") + " | " +schedule[i]["time"].join("-") + "<br/>";
    let b1= document.createElement('button');
    var b2= document.createElement('button');
    let s1=document.createElement('span');
    let s2=document.createElement('span');
    s1.innerHTML="Add to calendar";
    s2.innerHTML="Remove from List";
    b1.appendChild(s1);
    b2.appendChild(s2);
//      b1.addEventListener('click', addToCalendar);
    b1.classList.add('button');
    b2.addEventListener('click',remove);
    b2.classList.add('button');
    newclass.appendChild(b1);
    newclass.appendChild(b2);
    clist.appendChild(newclass);
    i++;
  }
}

function checkform()
{
    if (document.classname.field.value == '') {
                    alert("Please enter a good name for your event.");

	return false;
        }
    if(document.getElementById("classname").value == '')
        {
            alert("Please enter a name for your event.");
            return false;
        }
    console.log(document.getElementById("classname").value);
    add();
}
    
function saveSchedule(){
    var sch = JSON.stringify(schedule);
    localStorage.setItem(username, sch);
}

function getSchedule(){
    schedule = JSON.parse(localStorage.getItem(username));
    if(!schedule){
      schedule=[];
    }
    else{
      refresh();
    }
}


getSchedule();


