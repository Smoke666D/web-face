//******************************************************************************
//******************************************************************************
//******************************************************************************
function getConfig(n) {
/*
	var xhr = new XMLHttpRequest();
	xhr.open("GET","http://10.130.2.25/configs/0",true);
	xhr.onload = function (){
		alert(xhr.responseText);
	}
	xhr.send(null);
	*/
	var moduleSetup      = JSON.parse('{"page": 0,"adr": 0,"scale": 1,"value": 3,"min": 0,"max": 3,"units": "   ","type": "U","len": 1,"bitMapSize": 2,"bit": [{"mask": 1,"shift": 0,"min": 0,"max": 1},{"mask": 2,"shift": 1,"min": 0,"max": 1}]}');
	var oilPressureSetup = JSON.parse('{"page": 0,"adr": 1,"scale": 1,"value": 36,"min": 0,"max": 63,"units": "   ","type": "U","len": 1,"bitMapSize": 3,"bit": [{"mask": 1,"shift": 0,"min": 0,"max": 1},{"mask": 30,"shift": 1,"min": 0,"max": 11},{"mask": 32,"shift": 5,"min": 0,"max": 1}]}');
	console.log(moduleSetup);
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function toogleNav() {
	var sb = document.getElementById("sidebar")
	if (sb.classList.contains("active")){
		sb.classList.remove("active");
	} else {
		sb.classList.add("active");
	}
}
function hideConteny() {
	var contentPages = document.getElementsByClassName("content-data");
	for(var i=0;i<contentPages.length;i++){
		contentPages[i].classList.remove("is-shown");

	}
	return;
}
function loadContent(id) {
	hideConteny();
	document.getElementById(id).classList.add("is-shown");
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function sliderInit() {
	var i=0;
	var s_sinputs = document.getElementsByClassName("s-sinput");
	var s_sliders = document.getElementsByClassName("s-slider");
	for(i=0; i<s_sliders.length; i++){
		noUiSlider.create(s_sliders[i],{
			start: [20],
			tooltips: true,
			connect: [true, false],
			padding: 0,
			range: {
				'min': 0,
				'max': 100
			}
		})
		s_sliders[i].noUiSlider.on('update', (function () {
			var j=i;
			return function(){
				s_sinputs[j].value = s_sliders[j].noUiSlider.get();
			}
		})() );
		s_sinputs[i].addEventListener('change', (function () {
			var j=i;
			return function(){
	    	s_sliders[j].noUiSlider.set([s_sinputs[j].value]);
			}
		})());
	}
	var d_sliders       = document.getElementsByClassName("d-slider");
	var d_sinputs_left  = document.getElementsByClassName("d-sinput-left");
	var d_sinputs_right = document.getElementsByClassName("d-sinput-right");
	for (var i=0; i<d_sliders.length; i++){
		noUiSlider.create(d_sliders[i],{
			start: [20, 80],
			tooltips: true,
		  connect: true,
			padding: 0,
		  range: {
		  	'min': 0,
		    'max': 100
			}
		})
		d_sliders[i].noUiSlider.on('update',(function(){
			var j=i;
			return function(){
				d_sinputs_left[j].value=d_sliders[j].noUiSlider.get()[0];
			}
		})());
		d_sinputs_left[i].addEventListener('change',(function(){
			var j=i;
			return function(){
	    	d_sliders[j].noUiSlider.set([d_sinputs_left[j].value,null]);
			}
		})());
		d_sliders[i].noUiSlider.on('update',(function(){
			var j=i;
			return function(){
				d_sinputs_right[j].value=d_sliders[j].noUiSlider.get()[1];
			}
		})());
		d_sinputs_right[i].addEventListener('change',(function(){
			var j=i;
			return function(){
	    	d_sliders[j].noUiSlider.set([null,d_sinputs_right[j].value]);
			}
		})());
	}
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
document.addEventListener("DOMContentLoaded", function(event) {
	loadContent("oilPressPage");
	sliderInit();
});
