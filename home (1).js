var schedule = [];

function setUsername()
{
    let username = "alec";

}
let username = "alec";




function add(){
  let randomcolor = Math.floor(Math.random()*4)+1;
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
        console.log("Days:" + day.children[i].children[0].value);
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
    var startnum  = (parseInt(starthr)*60)+(parseInt(tstart[1]));
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
    var endnum  = (parseInt(endhr)*60)+(parseInt(tend[1]));
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
    if(startnum>endnum){
      alert("Please enter a start-time that is earlier than you end-time.");
      return false;
    }
    var k=0;
    while(k<schedule.length){
      var l=0;
      while(l<schedule[k]["days"].length){
        var x=0;
        while(x<classdays.length){
          if(classdays[x]==schedule[k]["days"][l]){
            if(((startnum>=schedule[k]["start"]) && (startnum<=schedule[k]["end"])) || ((endnum>schedule[k]["start"]) && (endnum<schedule[k]["end"]))){
              alert("You have entered an event that conflicts with your current schedule");
              return false;
            }
          }
          x++;
        }
        l++;
      }
      k++;
    }
    schedule.push({
      classname:document.getElementById("classname").value,
      days: classdays,
      time: time,
      color: randomcolor,
      start: startnum,
      end: endnum
    });


    //localStorage.setItem("schedule", schedule);
    document.getElementById("classname").value="";
    refresh();
    saveSchedule();
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
    refresh();
}






































function refresh(){
  var times = [[],[],[],[],[],[],[]];
  var o;
  for(o=0; o<schedule.length; o++){
    var b;
    for(b=0; b<schedule[o]["days"].length; b++){
    if(schedule[o]["days"][b]=="M"){
      times[0].push({
        class: schedule[o]["classname"],
        start: schedule[o]["start"],
        end: schedule[o]["end"],
        color: schedule[o]["color"]
      });
    }
    if(schedule[o]["days"][b]=="T"){
      times[1].push({
        class: schedule[o]["classname"],
        start: schedule[o]["start"],
        end: schedule[o]["end"],
        color: schedule[o]["color"]
      });
    }
    if(schedule[o]["days"][b]=="W"){
      times[2].push({
        class: schedule[o]["classname"],
        start: schedule[o]["start"],
        end: schedule[o]["end"],
        color: schedule[o]["color"]
      });
    }
    if(schedule[o]["days"][b]=="TH"){
      times[3].push({
        class: schedule[o]["classname"],
        start: schedule[o]["start"],
        end: schedule[o]["end"],
        color: schedule[o]["color"]
      });
    }
    if(schedule[o]["days"][b]=="F"){
      times[4].push({
        class: schedule[o]["classname"],
        start: schedule[o]["start"],
        end: schedule[o]["end"],
        color: schedule[o]["color"]
      });
    }
    if(schedule[o]["days"][b]=="S"){
      times[5].push({
        class: schedule[o]["classname"],
        start: schedule[o]["start"],
        end: schedule[o]["end"],
        color: schedule[o]["color"]
      });
    }
    if(schedule[o]["days"][b]=="Su"){
      times[6].push({
        class: schedule[o]["classname"],
        start: schedule[o]["start"],
        end: schedule[o]["end"],
        color: schedule[o]["color"]
      });
  }
}
}










  let clist=document.getElementById('calendar-list');
  while(clist.hasChildNodes()){
    clist.removeChild(clist.lastChild);
  }
  var i=0;
  while(i<schedule.length){
    let newclass=document.createElement('li');
    newclass.innerHTML=schedule[i]["classname"] + "<br/>" +schedule[i]["days"].join(" ") + " | " +schedule[i]["time"].join("-") + "<br/>";
    var b2= document.createElement('button');
    let s2=document.createElement('span');
    s2.innerHTML="Remove from List";
    b2.appendChild(s2);
    b2.addEventListener('click',remove);
    b2.classList.add('button');
    newclass.appendChild(b2);
    clist.appendChild(newclass);
    i++;
  }


  var o;
  for(o=0; o<times.length; o++){
    times[o].sort(function (a,b){
      return a["start"]-b["start"];
    });
  }
  var element = document.getElementById("Monday");
  var last=480;
  var u=0;
  var toAdd='';
  while(u<times[0].length){
    var spaceheight= (((times[0][u]["start"])-last)*(1.95/3));
    var heighte = (times[0][u]["end"]-times[0][u]["start"])*(2.05/3);
    var colore= times[0][u]["color"];
    var classen = times[0][u]["class"];
    var space = '<div class="spacer" style = "height:'+spaceheight+';"></div>';
    var classe= '<div class="event event'+colore+'" style = "height:'+heighte+';"> <div class="calendar-event-desc">'+classen+'</div></div>';
    var full = space+classe;
    var toAdd= toAdd+full;
    last = times[0][u]["end"];
    u++;
  }
  var label= '<div class="day-label">M</div>';

  element.innerHTML=label+toAdd;





  var element = document.getElementById("Tuesday");
  var last=480;
  var u=0;
  var toAdd='';
  while(u<times[1].length){
    var spaceheight= (((times[1][u]["start"])-last)*(1.95/3));
    var heighte = (times[1][u]["end"]-times[1][u]["start"])*(2.05/3);
    var colore= times[1][u]["color"];
    var classen = times[1][u]["class"];
    var space = '<div class="spacer" style = "height:'+spaceheight+';"></div>';
    var classe= '<div class="event event'+colore+'" style = "height:'+heighte+';"> <div class="calendar-event-desc">'+classen+'</div></div>';
    var full = space+classe;
    var toAdd= toAdd+full;
    last = times[1][u]["end"];
    u++;
  }
  var label= '<div class="day-label">T</div>';

  element.innerHTML=label+toAdd;




  var element = document.getElementById("Wednesday");
  var last=480;
  var u=0;
  var toAdd='';
  while(u<times[2].length){
    var spaceheight= (((times[2][u]["start"])-last)*(1.95/3));
    var heighte = (times[2][u]["end"]-times[2][u]["start"])*(2.05/3);
    var colore= times[2][u]["color"];
    var classen = times[2][u]["class"];
    var space = '<div class="spacer" style = "height:'+spaceheight+';"></div>';
    var classe= '<div class="event event'+colore+'" style = "height:'+heighte+';"> <div class="calendar-event-desc">'+classen+'</div></div>';
    var full = space+classe;
    var toAdd= toAdd+full;
    last = times[2][u]["end"];
    u++;
  }
  var label= '<div class="day-label">W</div>';

  element.innerHTML=label+toAdd;




  var element = document.getElementById("Thursday");
  var last=480;
  var u=0;
  var toAdd='';
  while(u<times[3].length){
    var spaceheight= (((times[3][u]["start"])-last)*(1.95/3));
    var heighte = (times[3][u]["end"]-times[3][u]["start"])*(2.05/3);
    var colore= times[3][u]["color"];
    var classen = times[3][u]["class"];
    var space = '<div class="spacer" style = "height:'+spaceheight+';"></div>';
    var classe= '<div class="event event'+colore+'" style = "height:'+heighte+';"> <div class="calendar-event-desc">'+classen+'</div></div>';
    var full = space+classe;
    var toAdd= toAdd+full;
    last = times[3][u]["end"];
    u++;
  }
  var label= '<div class="day-label">TH</div>';

  element.innerHTML=label+toAdd;



  var element = document.getElementById("Friday");
  var last=480;
  var u=0;
  var toAdd='';
  while(u<times[4].length){
    var spaceheight= (((times[4][u]["start"])-last)*(1.95/3));
    var heighte = (times[4][u]["end"]-times[4][u]["start"])*(2.05/3);
    var colore= times[4][u]["color"];
    var classen = times[4][u]["class"];
    var space = '<div class="spacer" style = "height:'+spaceheight+';"></div>';
    var classe= '<div class="event event'+colore+'" style = "height:'+heighte+';"> <div class="calendar-event-desc">'+classen+'</div></div>';
    var full = space+classe;
    var toAdd= toAdd+full;
    last = times[4][u]["end"];
    u++;
  }
  var label= '<div class="day-label">F</div>';

  element.innerHTML=label+toAdd;




  var element = document.getElementById("Saturday");
  var last=480;
  var u=0;
  var toAdd='';
  while(u<times[5].length){
    var spaceheight= (((times[5][u]["start"])-last)*(1.95/3));
    var heighte = (times[5][u]["end"]-times[5][u]["start"])*(2.05/3);
    var colore= times[5][u]["color"];
    var classen = times[5][u]["class"];
    var space = '<div class="spacer" style = "height:'+spaceheight+';"></div>';
    var classe= '<div class="event event'+colore+'" style = "height:'+heighte+';"> <div class="calendar-event-desc">'+classen+'</div></div>';
    var full = space+classe;
    var toAdd= toAdd+full;
    last = times[5][u]["end"];
    u++;
  }
  var label= '<div class="day-label">S</div>';

  element.innerHTML=label+toAdd;




  var element = document.getElementById("Sunday");
  var last=480;
  var u=0;
  var toAdd='';
  while(u<times[6].length){
    var spaceheight= (((times[6][u]["start"])-last)*(1.95/3));
    var heighte = (times[6][u]["end"]-times[6][u]["start"])*(2.05/3);
    var colore= times[6][u]["color"];
    var classen = times[6][u]["class"];
    var space = '<div class="spacer" style = "height:'+spaceheight+';"></div>';
    var classe= '<div class="event event'+colore+'" style = "height:'+heighte+';"> <div class="calendar-event-desc">'+classen+'</div></div>';
    var full = space+classe;
    var toAdd= toAdd+full;
    last = times[6][u]["end"];
    u++;
  }
  var label= '<div class="day-label">SU</div>';

  element.innerHTML=label+toAdd;

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
