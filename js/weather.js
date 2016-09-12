//wait until doc is ready then..
$(document).ready(function() {
		
		var url = "https://api.forecast.io/forecast/494ba7474fcda09abe182ff80f673b5c/-32.0569,115.7439?units=si";
			
		$.get(url, function(data){
				console.log(data); // log the data (remove when finished)!! 
				
				
		var now = new Date(data.currently.time*1000); // create a Date object with time data from API. Change from secs to millisecs.			
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // set days
				
		var day = days [now.getDay()]; // current day
				
		var time = $('<h1>').text(day + " " + now.toLocaleDateString({weekday: 'long'}) + ' | ' + now.toLocaleTimeString({hour12: false})); // current time
				
				
			$("#currently").append(time); // add time to #currently div
				
			var h = $("<h2>").text("Currently | " +  data.currently.summary ); //current date summary
				$("#currently").append(h); // add to #currently div
									
			var t = $("<h2>").html("Temperature |  " +  Math.round(data.currently.temperature) + "&deg;C" ); //current temp
				$("#currently").append(t); // add to #currently div
				
			var icon = $("<h2>").html(data.currently.icon); //current temp
				$("#currently").append(icons); // add icon to #currently div
				
			var icons = data.currently.icon; //access the font icons

					if (icons =="clear-day") {
						$("i.wi.wi-day-sunny").css("display", "inline");

					} else if (icons =="clear-night"){
						$("i.wi.wi-night-clear").css("display", "inline");

					} else if (icons =="cloudy"){
						$("i.wi.wi-cloudy").css("display", "inline");

					} else if (icons =="fog"){
						$("i.wi.wi-fog").css("display", "inline");

					} else if (icons =="partlycloudynight"){
						$("i.wi.wi-night-alt-cloudy").css("display", "inline");

					} else if (icons =="partlycloudyday"){
						$("i.wi.wi-day-cloudy").css("display", "inline");

					} else if (icons =="rain"){
						$("i.wi.wi-rain").css("display", "inline");

					} else if (icons =="sleet"){
						$("i.wi.wi-sleet").css("display", "inline");
						
					} else if (icons =="snow"){
						$("i.wi.wi-snow").css("display", "inline");

					} else if (icons =="sunny"){
						$("i.wi.wi-hot").css("display", "inline");

					}

					
				
				// forecast data
				// loop though data
								
				for (var i = 0; i < data.daily.data.length; i++) { 
			    	var forecast = data.daily.data[i]; //the data for one day of forecast in variable 
					
					var list = $("<ul>");
					
					var date = new Date(forecast.time*1000); // get the forecast data time and convert to date
					
				
					if (i === 0) { //if it's today
							list.append("<li>Today</li>");
						} else if ( i === 1 ) { //if it's tomorrow
							list.append("<li>Tomorrow</li>");
						} else {
							list.append("<li>" + days[date.getDay()] + "</li>"); // say what day it is
						}
									
					list.append("<li>" + date.toDateString() + "</li>");
					list.append("<li>" + "OUTLOOK | " + forecast.summary + "</li>");
					
					var temprange = $("<li class='temprange'>");
					
					var tempbar = $("<div class='tempbar'>");
					tempbar.append("<span class='mintemp'>Lowest Temperature | " + Math.round(forecast.temperatureMin) +  "&deg;C</span>");//create span and min temp inside				
					tempbar.append("<span class='maxtemp'>Highest Temperature | " + Math.round(forecast.temperatureMax) +"&deg;C</span>");//create span and maxtemp inside
					
					//var tempstart = -5; //start value of temp scale
					//var tempscale = 20; //20px per degree
					var mintemp = Math.round(forecast.temperatureMin); // store min temp
					var maxtemp = Math.round(forecast.temperatureMax); // store max temp
					
										
//////icon.css(); // or add class using JQ
					
					temprange.append(tempbar); // put bar inside temprange
					list.append(temprange); //put temprange inside list
										
					// add td with f info
					// append the tr to the table
					$("#weekly-fc").append(list);
					
			    
			};
				
			});
		});