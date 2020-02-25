var s_sliders;
var s_sinputs;
var checkboxes;
var selectors;
var d_sliders;
var d_sinputs_left;
var d_sinputs_right;
//******************************************************************************
//******************************************************************************
//******************************************************************************
function bitVal(reg,n) {
	return (reg.value&reg.bit[n].mask)>>reg.bit[n].shift;
	return;
}

function checkboxUpdate(num,reg,n) {
	checkboxes[num].checked = bitVal(reg,n);
	return;
}

function selectorUpdate(num,reg,n){
	selectors[num].value = bitVal(reg,n);
	return;
}

function s_sliderUpdate(num,reg){
	s_sinputs[num].value = reg.value;
	s_sliders[num].noUiSlider.updateOptions({
		start: [reg.value],
		range: {
			'min': reg.min,
			'max': reg.max
		}
	})
	return;
}

function d_sliderUpdate(num,regL,regR){
	//d_sinputs_left[num].value = regL.value;

	d_sliders[num].noUiSlider.updateOptions({
		start: [regL.value, regR.value],
		range: {
			'min': regL.min,
			'max': regL.max
		}
	})
	//d_sinputs_right[num].value = regL.value;
	console.log(regL.value);
	console.log(regR.value);
	return;
}
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
	// #1
	selectorUpdate(0,data[1],0);
	checkboxUpdate(0,data[1],1);
	checkboxUpdate(1,data[1],2);
	s_sliderUpdate(0,data[2]);
	checkboxUpdate(2,data[1],3);
	s_sliderUpdate(1,data[3]);
	//#2
	selectorUpdate(1,data[4],0);
	checkboxUpdate(3,data[4],1);			// Активировать сигнал размыкания цепи
	checkboxUpdate(4,data[4],2);			// Сигнал тревоги
	s_sliderUpdate(2,data[5]);
	checkboxUpdate(5,data[4],3);			// Предварительный сигнал тревоги
	s_sliderUpdate(3,data[6]);
	checkboxUpdate(6,data[4],4);			// Управление нагревателем охлаждающей жидкости
	d_sliderUpdate(0,data[8],data[7])
	checkboxUpdate(7,data[4],5);			// Управление охлаждателем охлаждающей жидкости
	d_sliderUpdate(1,data[10],data[9])
	//#3
	selectorUpdate(2,data[11],0);

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
	selectors  = document.getElementsByClassName("custom-select");
	checkboxes = document.getElementsByClassName("form-check-input");
	s_sinputs  = document.getElementsByClassName("s-sinput");
	s_sliders  = document.getElementsByClassName("s-slider");
	d_sliders       = document.getElementsByClassName("d-slider");
	d_sinputs_left  = document.getElementsByClassName("d-sinput-left");
	d_sinputs_right = document.getElementsByClassName("d-sinput-right");
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
	//******************
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
