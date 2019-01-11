//Global Varibales
var patient_id="";
var pat_fname="";
var pat_lname="";
var gender2="";
var dobstr2="";


var baseurl="https://sapphire-demo.meliorix.com/cipfhir3/baseDstu3/";
//https://sapphire-demo.meliorix.com/cipfhir3/baseDstu3/  
//var baseurl ="http://hapi.fhir.org/baseDstu3/";
var taskId,proId,proName,patId,patName;	
var tscore;

var Series1 = [];


function chartOld() {
	var myWindow = window.open("", "MsgWindow", "width=1400,height=1200");
	myWindow.document.body.style.height ="800px";
	myWindow.document.body.style.width ="1200px";

//	myWindow.document.getElementsByTagName('title').innerHTML = "PRO Graph";
	console.log(Series1);
	Highcharts.chart(myWindow.document.body, {
		title: {
			text: 'Patient Reported Outcomes'
		},
		subtitle: {
			text: ''
		},
		yAxis: {
			tickInterval: 10,
			title: {
				text:'<p style=\" font-sixe: 16px\;\"><b>t-score</b></p>'
			},
			min:0,
			max:100
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				pointStart: 2017
			}
		},
		series: Series1,
		responsive: {
			rules: [{
				condition: {
					maxWidth: 800,
					maxHeight: 900,    
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}
	});
}

function chart() {
	nv.addGraph(function() {
		//chartdata = [{"key":"Program 1","values":[["1990",6428.59],["1991",7079.34],["1992",4014.61],["1993",4000.77],["1994",4005.34],["1995",4182.21],["1996",4034.73],["1997",5891.87],["1998",475.89],["1999",4039.58],["2000",4000],["2001",5030.29],["2002",4000.03],["2003",4000.43],["2004",4821.92],["2005",12575.87],["2006",4000],["2007",4027.99],["2008",4800],["2009",5087.42],["2010",6584.68],["2011",4000],["2012",4600],["2013",4000],["2014",29458.22],["2015",4068.58],["2016",4700.01],["2017",4000.12],["2018",4000],["2019",4003.91],["2020",8756.47],["2021",4000],["2022",4000],["2023",4000],["2024",4500],["2025",4264.9],["2026",4222.05],["2027",4039.94],["2028",4619.64],["2029",4050],["2030",4500.34],["2031",4279.83],["2032",4000],["2033",4506.69],["2034",4000],["2035",4500],["2036",4500],["2037",4500],["2038",4000],["2039",4000],["2040",4600],["2041",4500],["2042",4000],["2043",4625.18],["2044",4600],["2045",4050],["2046",4000],["2047",4000.11],["2048",4600],["2049",4050.04],["2050",4000.19]]},{"key":"City32","values":[["1990",6428.59],["1991",7079.34],["1992",4014.61],["1993",400.77],["1994",4005.34],["1995",4182.21],["1996",4034.73],["1997",5891.87],["1998",4735.89],["1999",4039.58],["2000",4000],["2001",5030.29],["2002",4000.03],["2003",4000.43],["2004",4321.92],["2005",12575.87],["2006",4000],["2007",4027.99],["2008",4000],["2009",5087.42],["2010",6584.68],["2011",4000],["2012",4000],["2013",4000],["2014",29458.22],["2015",4068.58],["2016",4000.01],["2017",4000.12],["2018",4000],["2019",4003.91],["2020",8956.47],["2021",4000],["2022",4000],["2023",4000],["2024",4000],["2025",4264.9],["2026",4222.05],["2027",4039.94],["2028",4019.64],["2029",4000],["2030",4000.34],["2031",4279.83],["2032",4000],["2033",4006.69],["2034",4000],["2035",4000],["2036",4000],["2037",4000],["2038",4000],["2039",4000],["2040",4000],["2041",4000],["2042",4000],["2043",4627.18],["2044",4000],["2045",4000],["2046",4000],["2047",4000.11],["2048",4000],["2049",4000.04],["2050",4000.19]]}];
		chartdata = Series1;
		//window.open('https://192.168.0.37/smart-on-fhir/example-smart-app/src/views/provider/index3.html', '_blank');
		var modal = document.getElementById('chartmodal');
		modal.style.display = "block";
		
		console.log("chartdata ========1==>>",chartdata);
		var chart = nv.models.lineChart()
		.x(function(d) { return d[0] })
		.y(function(d) { return d[1] }) 
		.color(d3.scale.category10().range())
		.useInteractiveGuideline(true);


		d3.select('#chart svg')
		.datum(chartdata)
		.call(chart);

		//TODO: Figure out a good way to do this automatically
		nv.utils.windowResize(chart.update);

		
		return chart;
	});
	
}

function order_func() {

	var e = document.getElementById("selectform");
	var sformoid = e.options[e.selectedIndex].value;
	var sformname = e.options[e.selectedIndex].text;
	alert("FormOID : " + sformoid);
	alert("FormName : " + sformname);	
	var date1 =new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
	console.log(date1);
	console.log("patid :  " + window.patient_id);
	console.log("fname : " + window.pat_fname);
	console.log("lname : " + window.pat_lname);	
	var prdata = "{\n\t\"resourceType\": \"ProcedureRequest\",\n\t\"status\": \"active\",\n\t\"intent\": \"order\",\n\t\"category\": [{\n\t\t\"coding\": [{\n\t\t\t\"system\": \"http://snomed.info/sct\",\n\t\t\t\"code\": \"386053000\",\n\t\t\t\"display\": \"Evaluation procedure (procedure)\"\n\t\t}],\n\t\t\"text\": \"Evaluation\"\n\t}],\n\t\"code\": {\n\t\t\"coding\": [{\n\t\t\t\"system\": \"http://loinc.org\",\n\t\t\t\"code\": \""+sformoid+"\",\n\t\t\t\"display\": \""+sformname+"\"\n\t\t}],\n\t\t\"text\": \""+sformname+"\"\n\t},\n\t\"occurrenceDateTime\": \""+date1+"\",\n\t\"subject\": {\n\t\t\"display\": \""+pat_fname+" "+pat_lname+"\",\n        \"reference\": \"http://hl7.org/fhir/sid/us-ssn/Patient/"+patient_id+"\"\n\t}\n} \n"


	var settings = {
			"async": true,
			"crossDomain": true,
			"url": baseurl+"ProcedureRequest",
			"method": "POST",
			"headers": {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache"
			},
			"processData": false,
			"data": prdata
	}
	$.ajax(settings).done(function (response) {
		console.log("pro-test");
		console.log(response);
		orderStatus();
	});

}



var form_oid=[];
var form_name=[];

var Server = "https://mss.fsm.northwestern.edu/AC_API";
var FormOID = "96FE494D-F176-4EFB-A473-2AB406610626";  // Sample form -- replace with your FormOID
var promisUID="001";

function callback1(data){
	//console.log(data);

}
function listForms() {
	$.ajax({
		//url: Server + "/2014-01/Forms/.json",
		url: Server + "/2018-10/Questionnaire?_Summary",
		cache: false,
		type: "GET",
		// data: "",
		dataType: "json",
		beforeSend: function(xhr) {
			var username = "2F984419-5008-4E42-8210-68592B418233";
			var pass = "21A673E8-9498-4DC2-AAB6-07395029A778";
			//var Token = "MkY5ODQ0MTktNTAwOC00RTQyLTgyMTAtNjg1OTJCNDE4MjMzOjIxQTY3M0U4LTk0OTgtNERDMi1BQUI2LTA3Mzk1MDI5QTc3OA==";

			var base64 = btoa(username + ":" + pass);
			xhr.setRequestHeader("Authorization", "Basic " + base64);
		},
		success: function(data) { 

			console.log(data);
			var container = document.getElementById("Content");
			var forms = data.entry;
			console.log(data.entry);
			var select = document.getElementById("selectform"); 

			//console.log("all forms"+forms);
			for (var i=0; i < forms.length; i++) {
				form_oid[i]=forms[i].resource.id;
				form_name[i]=forms[i].resource.title;
				var opt = forms[i].resource.title;
				var val = forms[i].resource.id;
				var el = document.createElement("option");
				el.textContent = opt;
				el.value = val;
				select.appendChild(el);
			}

		},

		error: function(jqXHR, textStatus, errorThrown) {
			document.write(jqXHR.responseText + ':' + textStatus + ':' + errorThrown);
		}
	});
}
function formDetails(FormOID) {
	$.ajax({
		url: Server + "/2014-01/Forms/" + FormOID + ".json",
		cache: false,
		type: "POST",
		data: "",
		dataType: "json",
		beforeSend: function(xhr) {
			var Reg = "2807BB48-28D3-4FFA-823A-F5E7EBF7E52D";
			var Token = "A0159F7B-E971-46E6-B62D-7A6085F53F19";

			var base64 = btoa(Reg + ":" + Token);
			xhr.setRequestHeader("Authorization", "Basic " + base64);
		},
		success: function(data) {
			//console.log(data);			



		},

		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR.responseText + ':' + textStatus + ':' + errorThrown);
		}
	})
}





function prorecommend() {	
	patient_id="";
	gender2="";
	dobstr2="";
	var recdata= "{\n   \"hook\" : \"patient-view\",\n   \"hookInstance\" : \"d1577c69-dfbe-44ad-ba6d-3e05e953b2ea\",\n   \"fhirServer\" : \"https://54.202.74.232:80/cip-fhir3/baseDstu3\",\n   \"user\" : \"Practitioner/"+practitioner_id+"\",\n   \"patient\": \""+patient_id+"\",\n   \"context\" : {\n       \"patientId\" : \""+patient_id+"\"\n   },\n   \"prefetch\" : {\n      \"patient\" : {\n         \"resourceType\" : \"Patient\",\n         \"gender\" : \""+gender2+"\",\n         \"birthDate\" : \""+dobstr2+"\",\n         \"id\" : \""+patient_id+"\",\n         \"active\" : true\n      }\n   }\n}";			

	var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://sapphire-demo.meliorix.com/cds-hook-api/api/v1/cds-services/pro-recommend",
			"method": "POST",
			"headers": {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache",
				"Postman-Token": "35410d6a-12f4-4145-9655-db99cdaa0e90"
			},
			"processData": false,
			"data": recdata
	}
	$.ajax(settings).done(function (response) {
		//console.log(response);

		jQuery(response).each(function(i, item){

			console.log(item.cards)
			jQuery(item.cards).each(function(j, item){
				var $t1 = item.summary;
				var $t2 = item.detail;
				var $t3 = item.source.label;
				var $t4;
				jQuery(item.suggestions).each(function(k, item){
					$t4 = item.label;

				})
				jQuery(item.links).each(function(l, item){
					$t5 = item.label;
					$t6 = item.url;

				})

				$("#docview-article").append("<div class='panel panel-default'>	<div id='rec' class='panel-body'><b style='color:#0079BE;font-size: 16px;'>"+$t1 + "</b></br>"+ "<I style='font-size: 12px;'>Source: <span style='color:blue;font-size: 12px;'>"+$t3 + "</span></I></br></br>"+$t2+"</br><button class='button button4' type='button' onclick='alert('Test!')'>"+ $t4+"</button></br><a href='"+$t6+"'>"+$t5+"</a></div> </div>")

				$("rec").append("<b>"+$t1+"</b>");
				$("rec").append("</br>");$("rec").append("</br>");
				$("rec").append($t2);
				$("rec").append("</br>");$("rec").append("</br>");$("rec").append("</br>");

			})

		})
	});

}


var res_score1;	
var res_score2;			
function orderStatus() {
	// Pros to be completed

	var settings31 = {
			"async": false,
			"crossDomain": false,
			"url": baseurl+"ProcedureRequest?subject=http://hl7.org/fhir/sid/us-ssn/Patient/"+patID+"&intent=order&status=active",
			"cache" : false,
			"method": "GET",
			"headers": {
				"Cache-Control": "no-cache"
			}
	}
	$.ajax(settings31).done(function (response) {
		console.log(response);
		document.getElementById('t02').innerHTML="";
		console.log(patID);
		var str="";

		str = str +"<tr><th>Event Date Time</th><th>PROs Ordered</th><th>Status</th> <th>Results</th> <th>Ref Range</th> </tr>";



		jQuery(response.entry).each(function(i, item){
			console.log(item.resource.code.text);
			console.log(item.resource.id);
			console.log(item.resource.occurrenceDateTime);

			var msec = Date.parse(item.resource.occurrenceDateTime);
			var d = new Date(msec);
			var date1 = d.toLocaleString("en-US"); 


			var proname1 = item.resource.code.text;
			if (proname1.match(/Please/g)!="Please")
			{
				str = str +"<tr><td>" +date1+"</td>";
				str = str +"<td>"+proname1 +"</td>";
				str = str +"<td>Ordered</td><td> -- </td><td> -- </td> </tr>";	
			}
		});		
		document.getElementById('t02').innerHTML += str;
	});
//	Pros completed

	var settings32 = {
			"async": false,
			"crossDomain": false,
			"url": baseurl+"ProcedureRequest?subject=https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/"+patID+"&intent=order",
			"cache" : false,
			"method": "GET",
			"headers": {
				"Cache-Control": "no-cache"
			}
	}
	$.ajax(settings32).done(function (response) {
		console.log("Completed");
		console.log(response);
		var str="";

		jQuery(response.entry).each(function(i, item){
			console.log(item.resource.code.text);
			console.log(item.resource.id);
			console.log(item.resource.occurrenceDateTime);

			var settings1 = {
					"async": false,
					"crossDomain": false,
					"url": baseurl+"Observation?based-on=ProcedureRequest/"+item.resource.id,
					"cache" : false,  
					"method": "GET",
					"headers": {
						"Cache-Control": "no-cache"
					}
			}
			$.ajax(settings1).done(function (response) {
				//console.log(response);
				jQuery(response.entry).each(function(i, item){
					console.log(item.resource.valueQuantity.value);
					res_score2 = item.resource.valueQuantity.value;
					res_score1= res_score2.toPrecision(3);
				});
			});	

			var msec = Date.parse(item.resource.occurrenceDateTime);
			var d = new Date(msec);
			var date1 = d.toLocaleString("en-US"); 


			var proname1 = item.resource.code.text;
			var score = parseFloat(res_score1);

			var flag="";

			var value = ["0",score];
			
			for(i=0;i<Series1.length;i++)
			{
				if (proname1 == Series1[i].key){
					
					Series1[i].values.push(value);
					
					flag="Y";	
				}
			}

			if (flag !="Y")
			{
				let temp ={
						key  : proname1,
						values : [value] };

				Series1.push(temp);
			}
			flag="";   

			str = str +"<tr><td>" +date1+"</td>";
			str = str +"<td>"+proname1 +"</td>";
			str = str +"<td>Completed</td>";
			str = str +"<td><a href =\'#\' onclick=\'chart();return false;'>"+res_score1+"</a></td><td> 1 - 100</td> </tr>";

		});

		document.getElementById('t02').innerHTML += str;
	});
}


listForms();
formDetails(FormOID);
prorecommend();


//Flow for the patient app



var global_asmtOID;
var datefin;
var Server = "https://www.assessmentcenter.net/ac_api";
var ItemResponseOID = "";   
var Response = "";  
var assessmentOID;	
var FormOID;		
//var FormOID ="80C5D4A3-FC1F-4C1B-B07E-10B796CF8105";



function assignValues(task_Id,pro_Id,pro_Name,pat_Name)
{
	console.log(task_Id);
	console.log(pro_Id);
	console.log(pro_Name);
	console.log(pat_Name);
	console.log(patID);					

	taskId = task_Id;
	proId = pro_Id;
	proName = pro_Name;
	patId = patID;					
	patName = pat_Name;
}


var temp= document.getElementById("pro-name");
function writeProname(proname)
{

	temp.innerHTML = proname;


}



function startTask(taskId){
	var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://sapphire-demo.meliorix.com/dev/cds-hook-api/api/v1/cds-task/"+taskId+"/start",
			"method": "POST",
			"headers": {
				"userId": patID,
				"Cache-Control": "no-cache",
				"Postman-Token": "db0f09f2-afff-45ff-9a20-1d2d05bea38c"
			}
	}
	$.ajax(settings).done(function (response) {
		console.log(response);
		console.log("task started");
	});		
}

function completeProcess(taskId,proId,proName,patId,patName){

	var date1 =new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
	var settings = {
			"async": true,
			"crossDomain": true,
			"url": baseurl+"ProcedureRequest/"+taskId,
			"method": "PUT",
			"headers": {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache"
			},
			"processData": false,
			"data": "{\n\t\"resourceType\": \"ProcedureRequest\",\n\t\"id\": \""+taskId+"\",\n\t\"status\": \"completed\",\n\t\"intent\": \"order\",\n\t\"category\": [{\n\t\t\"coding\": [{\n\t\t\t\"system\": \"http://snomed.info/sct\",\n\t\t\t\"code\": \"386053000\",\n\t\t\t\"display\": \"Evaluation procedure (procedure)\"\n\t\t}],\n\t\t\"text\": \"Evaluation\"\n\t}],\n\t\"code\": {\n\t\t\"coding\": [{\n\t\t\t\"system\": \"http://loinc.org\",\n\t\t\t\"code\": \""+proId+"\",\n\t\t\t\"display\": \""+proName+"\"\n\t\t}],\n\t\t\"text\": \""+proName+"\"\n\t},\n\t\"occurrenceDateTime\": \""+date1+"\",\n\t\"subject\": {\n\t\t\"display\": \""+patName+"\",\n        \"reference\": \"https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/"+patId+"\"\n\t}\n} \n"
	}
	$.ajax(settings).done(function (response) {
		console.log(response);
	});
}


function postScore(taskId,proId,proName,patId,patName,tscore){
	var date1 =new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
	var settings = {
			"async": true,
			"crossDomain": true,
			"url": baseurl+"Observation",
			"method": "POST",
			"headers": {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache"
			},
			"processData": false,
			"data": "{\n\t\"resourceType\": \"Observation\",\n\t\"status\": \"final\",\n\t\"code\": {\n    \t\"coding\": [\n    \t\t{\n        \t\t\"system\": \"http://loinc.org\",\n\t\t        \"code\": \"77580-9\",\n\t\t        \"display\": \""+proName+" T-score\"\n    \t\t}\n    \t]\n\t},\n\t\"category\": [{\n    \t\"coding\": [{\n        \t\"system\": \"http://hl7.org/fhir/observation-category\",\n        \t\"code\": \"survey\",\n        \t\"display\": \"Survey\"\n        }]\n    }],\n\t\"subject\": {\n\t\t\"display\": \""+patName+"\",\n        \"reference\": \"https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/"+patId+"\"\n\t},\n\t\"effectiveDateTime\": \""+date1+"\",\n\t\"issued\": \""+date1+"\",\n\t\"performer\": [\n    \t{\n\t\t\t\"display\": \""+patName+"\",\n        \t\"reference\": \"https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/"+patId+"\"\n\t    }\n\t],\n\t\"valueQuantity\": {\n    \t\"value\": "+tscore+"\n     \n\t},\n\n\t\"basedOn\":\t{\n\t\t\"reference\": \"ProcedureRequest/"+taskId+"\"\n\t}\n} \n"
	}
	$.ajax(settings).done(function (response) {
		console.log(response);
	});


}


function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}	


function displayList(){
	var settings3 = {
			"async": true,
			"crossDomain": true,
			"url": baseurl+"ProcedureRequest?subject=http://hl7.org/fhir/sid/us-ssn/Patient/"+patID+"&intent=order&status=active",
			"method": "GET"
	}
	$.ajax(settings3).done(function (response) {
		console.log(response);
		// console.log(response.entry);

		var str="";

		str = str+ "<div class=\'row\'>	<div id=\'new\' class=\'col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12\'></br>";
		str = str+ "<P style=\'margin-left:1em; text-align: left; padding: 10px; \'><b>List of Questionnaires available for you</b></P>	</div></div>";

		str = str+ "<div id=\'tabhead\' class=\'row\' style=\'text-align: left; font-weight: bold; padding-top: 20px; \'>";
		str = str+ "<div class=\'col-4 col-lg-4 col-md-4 col-sm-4 col-sm-offset-1 col-xs-4 \'>Questionnaire</div>";
		str = str+ "<div class=\'col-2 col-lg-2 col-md-2 col-sm-2 col-sm-offset-1 col-xs-4 \'>Due Date</div>";
		str = str+"<div class=\'col-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 \'>Status</div></div>";	

		jQuery(response.entry).each(function(i, item){

			var date = new Date(item.resource.occurrenceDateTime);

			var pro_id= item.resource.code.coding[0].code;
			var pro_name= item.resource.code.coding[0].display;
			var task_id= item.resource.id;
			var pat_name= item.resource.subject.display;						



			var date1 = addDays(date, 3);
			//console.log(date1);
			var date2=((date1.getMonth() + 1) + '/' + date1.getDate() + '/' +  date1.getFullYear());
			//console.log(date2);

			var temp = item.resource.subject.reference;
			var pat_id= temp.substr(-7); 		

			if (task_id!=null && pro_name.match(/Please/g)!="Please"){

				str = str + "<div class=\'row\'  style=\'text-align: left; padding-top: 20px; font-size: 14px;\'>";

				str = str + "<div class=\'col-4 col-lg-4 col-md-4 col-sm-4 col-sm-offset-1 col-xs-4\' style=\'text-align: left; font-size: 18px;\'>"+pro_name+"</div>"
				str = str + "<div class=\'col-2 col-lg-2 col-md-2 col-sm-2 col-sm-offset-1 col-xs-4\'>"+date2+"</div>";
				str = str + "<div class=\'col-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 \'><button id=\""+task_id+"\" class=\'button button6\' type=\'button\' onclick=\' assignValues(\"" +task_id+ "\",\"" +pro_id+ "\",\"" +pro_name+ "\", \"" +pat_name+ "\"); callasmt(\""+pro_id+"\"); writeProname(\""+pro_name+"\"); displayQ(); this.disabled=true; \'>Start</button></div></div>";
			}


		});
		document.getElementById("list").innerHTML = str;
	});

}




function displayQ(){

	$('#Ques').show();
	window.location.hash = '#Ques'; 

	document.getElementById('list').style.display = 'none';
//	document.getElementById('fav').style.display = 'none';
}

//Important small functions



//Everytime the user selects an answer for a question from the options, we call getResponse function to store the response 
//Call rec function repeatedly which in turn calls the renderscreen funtion with stored response parameters , until the datefinished variable is not null
function getResponse(res1,res2)
{
//	console.log(res1);
//	console.log(res2);
	ItemResponseOID = res2;   
	Response = res1;   
	rec();
}


function rec(){
	if (datefin== '') 
	{
		renderScreen(assessmentOID);
	}
}	


//Just to hide the PRO list when the Questionnaire is displayed
function displist()
{
	//completeProcess();
	window.location.reload(false);
	//displayList();
	document.getElementById('Content').style.display = 'none';
	document.getElementById('header1').style.display = 'none';
	document.getElementById('list').style.display = 'block';
}







//Function to call the assessmentcenter starting an Assessement API to get the assessmentOID
function startAssessment(FormOID) {
	var tmp =null;
	$.ajax({
		url: Server + "/2014-01/Assessments/" + FormOID + ".json",
		cache: false,
		async: false,
		type: "POST",
		data: "UID=01" ,
		dataType: "json",
		beforeSend: function(xhr) {
			var Reg = "2807BB48-28D3-4FFA-823A-F5E7EBF7E52D";
			var Token = "A0159F7B-E971-46E6-B62D-7A6085F53F19";

			var base64 = btoa(Reg + ":" + Token);
			xhr.setRequestHeader("Authorization", "Basic " + base64);
		},

		success: function(data) {

			global_asmtOID=data.OID;
			tmp = data.OID;

		},

		error: function(jqXHR, textStatus, errorThrown) {
			document.write(jqXHR.responseText + ':' + textStatus + ':' + errorThrown);
		}
	})
	return tmp;
}



//Function to call the assessmentcenter scoring API to return the theta(T-score) json
function displayScore(assessmentOID) {
	//console.log(assessmentOID);
	$.ajax({
		url:  "https://www.assessmentcenter.net/ac_api/2014-01/Results/" + assessmentOID + ".json",
		cache: false,
		async:false,
		type: "POST",
		data: "",
		dataType: "json",
		beforeSend: function(xhr) {
			var Reg = "2807BB48-28D3-4FFA-823A-F5E7EBF7E52D";
			var Token = "A0159F7B-E971-46E6-B62D-7A6085F53F19";

			var base64 = btoa(Reg + ":" + Token);
			xhr.setRequestHeader("Authorization", "Basic " + base64);
		},
		success: function(data) { 
			console.log(data);
			var data1=data.Items;
			var data2=data1[0];

			var key;
			for (key in data2) {
				if (data2.hasOwnProperty(key)) {
					console.log(key + " = " + data2[key]);
				}
			}  


			console.log(data.Theta);
			var T_Score = data.Theta * 10 + 50.0;
			console.log("T-Score : " + T_Score);
			tscore=T_Score;
			postScore(taskId,proId,proName,patId,patName,tscore);
		},

		error: function(jqXHR, textStatus, errorThrown) {
			console.log('displayScore:' + jqXHR.responseText + ':' + textStatus + ':' + errorThrown);
		}
	})
}


function renderScreen(asmtOID) { 
	var tmp1 =null;

	var postedData ="";

	if (ItemResponseOID != "") {
		postedData ="ItemResponseOID=" + ItemResponseOID + "&Response=" + Response ;
	}		



	$.ajax({
		url: "https://www.assessmentcenter.net/ac_api/2014-01/Participants/"+asmtOID+".json",

		cache: false,
		type: "POST",
		async:false,
		data: postedData,
		dataType: "json",

		beforeSend: function (xhr) {
			var Reg = "2807BB48-28D3-4FFA-823A-F5E7EBF7E52D";
			var Token = "A0159F7B-E971-46E6-B62D-7A6085F53F19";

			var base64 = btoa(Reg + ":" + Token);
			xhr.setRequestHeader("Authorization", "Basic " + base64);
		},
		success: function (data) {
			tmp1=data.DateFinished;
			if (data.DateFinished != '') {
				completeProcess(taskId,proId,proName,patId,patName);	
				displayScore(assessmentOID);
				document.getElementById("Content").innerHTML = "You have finished the assessment.<br /> Thank you ! <div style=\'height: 50px\' ><button type=\'button\' class='button button6'  onclick=displist() > Back </button></div>";
				return
			}
			var screen = "";
			var HasBitWiseValues = false;
			var HasMultipleItems = false;
			if (data.Items.length > 1) {
				HasMultipleItems = true;
			}


			if (!HasMultipleItems) {
				for (var i = 0; i < data.Items.length; i++) {
					for (var j = 0; j < data.Items[i].Elements.length; j++) {
						if (typeof (data.Items[i].Elements[j].Map) == 'undefined') {
							screen = screen + "<div class='row'><div id='question' class='col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12' style=\'height: 30px\' >" + data.Items[i].Elements[j].Description + "</br></div></div></br></br>"
						} else {
							for (var k = 0; k < data.Items[i].Elements[j].Map.length; k++) {
								switch (data.Items[i].Elements[j].Map[k].Description) {
								case "INFORMATIONAL":
									screen = screen + "<div style=\'height: 50px\' ><input type=\'button\' class='btn-submit' id=\'" + data.Items[i].Elements[j].Map[k].Value + "\' name=\'" + data.Items[i].Elements[j].Map[k].ItemResponseOID + "\' value=\'" + "Save" + "\' onclick=getResponse('" + data.Items[i].Elements[j].Map[k].Value+"'\,'"+data.Items[i].Elements[j].Map[k].ItemResponseOID +"') />" + "</div>";
									break;
								case "TEXT":
									screen = screen + "<div style=\'height: 50px\' ><input type=\'text\'  id=\'" + data.Items[i].Elements[j].Map[k].Value + "\' name=\'" + data.Items[i].Elements[j].Map[k].ItemResponseOID + "\' value=\'" + data.Items[i].Elements[j].Map[k].Description + "\' />" + "</div>";
									screen = screen + "<div style=\'height: 50px\' ><input type=\'button\' class='btn-submit' id=\'" + "btnSave" + "\' name=\'" + "btnSave" + "\' value=\'" + "Save" + "\' onclick=getResponse('" + data.Items[i].Elements[j].Map[k].Value+"'\,'" + data.Items[i].Elements[j].Map[k].ItemResponseOID+"') />" + "</div>";
									break;
								default:
									ItemResponseOID = data.Items[i].Elements[j].Map[k].ItemResponseOID;
								Response = data.Items[i].Elements[j].Map[k].Value;
								if (data.Items[i].Elements[j].Map[k].DataType == "bitwise") {
									HasBitWiseValues = true;
									screen = screen + "<div style=\'height: 20px\' ><input type=\'checkbox\' id=\'" + data.Items[i].Elements[j].Map[k].ItemResponseOID + "\' name=\'" + data.Items[i].FormItemOID + "\' value=\'" + data.Items[i].Elements[j].Map[k].Value + "\' onclick=addResponse(this) />" + data.Items[i].Elements[j].Map[k].Description + "</div>";
								} else {
									screen = screen + "<div style=\'height: 50px\' ><input type=\'button\' class='btn-submit' id=\'" + data.Items[i].Elements[j].Map[k].Value + "\' name=\'" + data.Items[i].Elements[j].Map[k].ItemResponseOID + "\' value=\'" + data.Items[i].Elements[j].Map[k].Description + "\' onclick=getResponse('" + data.Items[i].Elements[j].Map[k].Value+"'\,'"+data.Items[i].Elements[j].Map[k].ItemResponseOID+"') />" + "</div>";
								}
								}
							}
							//screen = screen + "<div style=\'height: 50px\' ><input type=\'button\' class='btn-submit' id=\'" + '00000000-0000-0000-0000-000000000000' + "\' name=\'" + '00000000-0000-0000-0000-000000000000' + "\' value=\'" + 'SKIP' + "\' onclick=getResponse('" + '00000000-0000-0000-0000-000000000000+","+00000000-0000-0000-0000-000000000000' + "') />" + "</div>";
						}
					}
					if (HasBitWiseValues) {
						screen = screen + "<div class='row'><div style=\'height: 50px\' ><input type=\'text\'  id=\'" + data.Items[i].FormItemOID + "\' name=\'" + data.Items[i].FormItemOID + "\' value=\'0\' />" + "</div></div>";
					}
				}
			} else {
				/* Stem (e.g., "Thinking about how your illness...") */
				screen += "<div style=\'height: 50px; text-align: bottom\'>" + data.Items[0].Elements[0].Description + "</div>";
				/* Question */
				screen += "<div style=\'height: 40px; font-style: italic\'>" + data.Items[0].Elements[1].Description + "</div>";
				screen += "<table>";
				/* "How true was this before/since your illness?" */
				screen += "<tr>";
				screen += "<td width=\'50%\'><div style=\'height: 20px\'>" + data.Items[1].Elements[1].Description + "</div></td>";
				screen += "<td width=\'10px\'></td>";
				screen += "<td><div style=\'height: 20px\'>" + data.Items[2].Elements[1].Description + "</div></td>";
				screen += "</tr>";
				/* Answers */
				theQuestion = data.Items[0].FormItemOID;
				for (var i = 0; i < 5; i++) {
					screen += "<tr>";
					screen += "<td><div style=\'height: 50px\'><input type=\'button\' class=\'btn-submit\' id=\'" + data.Items[1].Elements[2].Map[i].FormItemOID + "\' name=\'" + data.Items[1].Elements[2].Map[i].Value + "\' value=\'" + data.Items[1].Elements[2].Map[i].Description + "\' onclick=getResponseMultiple(this) />" + "</div>";
					screen += "<td width=\'10px\'></td>";
					screen += "<td><div style=\'height: 50px\'><input type=\'button\' class=\'btn-submit\' id=\'" + data.Items[2].Elements[2].Map[i].FormItemOID + "\' name=\'" + data.Items[2].Elements[2].Map[i].Value + "\' value=\'" + data.Items[2].Elements[2].Map[i].Description + "\' onclick=getResponseMultiple(this) />" + "</div>";
					screen += "</tr>"
				}
				screen += "<tr><td colspan=\'3\' style=\'height: 70px; text-align: center; vertical-align: bottom\'><div><input type=\'button\' class='btn-submit' id=\'btnSave\' name=\'btnSave\' value=\'Save\' onclick=getResponseSave()></div></td></tr>";
				screen += "</table>";
			}
			document.getElementById("Content").innerHTML = screen;
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log('renderScreen: ' + jqXHR.responseText + ':' + textStatus + ':' + errorThrown);
		}
	})

	return tmp1;
}							

//displayList();						
//APIs to administer the assessmentcenter forms

function callasmt(FormOID){


	assessmentOID = startAssessment(FormOID);
	datefin=renderScreen(assessmentOID);

}



