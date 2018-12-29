
var months = [
    {name:'January',number:'01',art:'1.jpg'},
    {name:'Febuary',number:'02',art:'3.jpg'},
    {name:'March',number:'03',art:'4.jpg'},
    {name:'April',number:'04',art:'5.jpg'},
    {name:'May',number:'05',art:'1.jpg'},
    {name:'June',number:'06',art:'2.jpg'},
    {name:'July',number:'07',art:'3.jpg'},
    {name:'August',number:'08',art:'4.jpg'},
    {name:'September',number:'09',art:'5.jpg'},
    {name:'October',number:'10',art:'1.jpg'},
    {name:'November',number:'11',art:'2.jpg'},
    {name:'December',number:'12',art:'3.jpg'}
]

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

    var monthDays = getDaysInMonth(year,month);

    calenderHtml += "<tr>";
    
    var counter = 0;
    var rowCount = 0;
    for(var i=0;i<42;i++){
        
        
        if(i<monthDays[0].weekDay){
            calenderHtml += "<td>&nbsp;</td>"
        }else if(counter<monthDays.length){
            calenderHtml += "<td align='center'>"+monthDays[counter].monthDay+"</td>"
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
