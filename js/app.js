
function getImage(name){
    return "images/"+name
}

var months = [
    {name:'January',number:'01',art:getImage('1.jpg')},
    {name:'Febuary',number:'02',art:getImage('3.jpg')},
    {name:'March',number:'03',art:getImage('4.jpg')},
    {name:'April',number:'04',art:getImage('5.jpg')},
    {name:'May',number:'05',art:getImage('1.jpg')},
    {name:'June',number:'06',art:getImage('2.jpg')},
    {name:'July',number:'07',art:getImage('3.jpg')},
    {name:'August',number:'08',art:getImage('4.jpg')},
    {name:'September',number:'09',art:getImage('5.jpg')},
    {name:'October',number:'10',art:getImage('1.jpg')},
    {name:'November',number:'11',art:getImage('2.jpg')},
    {name:'December',number:'12',art:getImage('3.jpg')}
]

var events = {
    "January":[{startDate:2,endDate:3,color:"#016CC2"}],
    "Febuary":[],
    "March":[{startDate:21,endDate:23,color:"#4a4e4d"}],
    "April":[],
    "May":[{startDate:15,endDate:17,color:"#0e9aa7"}],
    "June":[],
    "July":[],
    "August":[{startDate:8,endDate:13,color:"#3da4ab"}],
    "September":[],
    "October":[{startDate:2,endDate:2,color:"#f6cd61 "}],
    "November":[{startDate:2,endDate:5,color:"#fe8a71"}],
    "December":[]
}

var weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(year,month){
    var daysCount = new Date(year,month+1,0).getDate()
    var days = [];

    for(var i=1;i<=daysCount;i++){
        days.push({
            weekDay:new Date(year,month,i).getDay(),
            monthDay:new Date(year,month,i).getDate()
        })
    }

    return days;
}



function getCalendarForMonth(weekDays,year,month){
    var calenderHtml = "<tr>";    
    for(var i=0;i<weekDays.length;i++){
        calenderHtml += "<th>"+weekDays[i]+"</th>";
    }
    calenderHtml += "</tr>";

    var currentMonth = months[month];
    var monthDays = getDaysInMonth(year,month);
    var monthEvents = events[currentMonth.name]

    calenderHtml += "<tr>";
    
    var counter = 0;
    var rowCount = 0;

    function fallsWithinEvent(day){
        for (var i=0;i<monthEvents.length;i++){
            var event = monthEvents[i];        
            if(day>=event.startDate && day<=event.endDate){
                return {event:event,state:true}
            }            
        }

        return {state:false}
    }
    
    for(var i=0;i<42;i++){
                
        if(i<monthDays[0].weekDay){
            calenderHtml += "<td>&nbsp;</td>"
        }else if(counter<monthDays.length){
            var id = currentMonth.name+monthDays[counter].monthDay

            //falls within event
            var event = fallsWithinEvent(monthDays[counter].monthDay)
            
            if(event.state){                
                calenderHtml += "<td align='center'>"
                calenderHtml += "<div id='"+id+"' class='event' style='background:"+event.event.color+"'>"
                calenderHtml += monthDays[counter].monthDay+"</div></td>"
                calenderHtml += "</div></td>"
            }else{
                calenderHtml += "<td align='center'><div id='"+id+"'>"+monthDays[counter].monthDay+"</div></td>"
            }

            
            counter++;
        }else{
            calenderHtml += "<td>&nbsp;</td>"
        }
        
        rowCount++;
        if(rowCount==7){
            calenderHtml += "</tr><tr>"
            rowCount = 0;
        }
        
    }
    calenderHtml += "</tr>";
    
    
    return calenderHtml;
}

function getCalendarHtml(year,months,title=""){

    var calenderHtml = "<h1>"+year+"</h1>";
    calenderHtml += "<div class='title'>"+title+"</div>"
    calenderHtml += "<ul>"
    
    for(var i=0;i<months.length;i++){
        var month = months[i];
        calenderHtml += '<li>';
        calenderHtml += '<img class="topImage" src="'+month.art+'">'
        calenderHtml += '<span class="monthNumber">'+month.number+'</span><br>'
        calenderHtml += '<span class="monthName">'+month.name+'</span><br>'
        calenderHtml += '<div class = "calendar">'
        calenderHtml += '<table>'
        calenderHtml += getCalendarForMonth(weekDays,year,i)
        calenderHtml += '</table>'
        calenderHtml += '</div>'
        calenderHtml += '</li>';
    }

    calenderHtml += "</ul>"      
    
    return calenderHtml;
}

window.onload = function(){
    document.getElementById("body").innerHTML = getCalendarHtml(2019,months,"Calendar")
}