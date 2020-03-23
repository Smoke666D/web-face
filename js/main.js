var s_sliders;
var s_sinputs;
var checkboxes;
var selectors;
var d_sliders;
var d_sinputs_left;
var d_sinputs_right;

function calcFracLength(x) {
	return (x.toString().indexOf ('.') >= 0) ? (x.toString().split('.').pop().length) : (0);
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function toogleNav() {
	var sb   = document.getElementById("sidebar");
	var cont = document.getElementsByClassName("content-data");
	var i = 0;
	if (sb.classList.contains("active")){
		sb.classList.remove("active");
	} else {
		sb.classList.add("active");
	}
	return;
}

function hideConteny() {
	var contentPages = document.getElementsByClassName("content-data");
	var navItems     = document.getElementsByClassName("navItem");
	for(var i=0;i<navItems.length;i++){
		navItems[i].classList.remove("checked");
	}
	for(var i=0;i<contentPages.length;i++){
		contentPages[i].classList.add("hidden");
	}
	return;
}

function loadContent(id) {
	hideConteny();
	document.getElementById(id).classList.remove("hidden");
	test = document.getElementById("nav-" + id).classList.add("checked");
	return;
}

//******************************************************************************
//******************************************************************************
//******************************************************************************
function showAlert(type,text) {
	document.getElementById('alert-message').classList.remove("alert-danger");
	document.getElementById('alert-message').classList.remove("alert-warning");
	document.getElementById('alert-message').classList.remove("alert-info");
	document.getElementById('alert-message').classList.remove("alert-success");
	document.getElementById('alert-message').classList.remove("alert-secondary");
	document.getElementById('alert-message').classList.remove("alert-primary");
	document.getElementById('alert-message').classList.add(type);
	document.getElementById('alert-text').innerHTML = text;
	document.getElementById('alert-message').classList.add("show");
	return;
}

function closeAlert() {
	document.getElementById('alert-message').classList.remove("show");
	document.getElementById('alert-message').classList.add("fade");
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function sliderInit() {
	var i=0;
	selectors  = document.getElementsByClassName("custom-select");
	checkboxes = document.getElementsByClassName("check-input");
	s_sinputs  = document.getElementsByClassName("s-sinput");
	s_sliders  = document.getElementsByClassName("s-slider");
	d_sliders       = document.getElementsByClassName("d-slider");
	d_sinputs_left  = document.getElementsByClassName("d-sinput-left");
	d_sinputs_right = document.getElementsByClassName("d-sinput-right");
	for(i=0; i<s_sliders.length; i++){
		s_sinputs[i].disabled = true;
		noUiSlider.create(s_sliders[i],{
			start: [20],
			keyboardSupport: false,
			tooltips: true,
			connect: [true, false],
			padding: 0,
			range: {
				'min': 0,
				'max': 100
			}
		})
		s_sliders[i].noUiSlider.on('update', (function() {
			var j=i;
			return function(){
				s_sinputs[j].value = parseFloat(s_sliders[j].noUiSlider.get()).toFixed(calcFracLength(s_sinputs[j].step));
			}
		})() );
		s_sinputs[i].addEventListener('change', (function() {
			var j=i;
			return function(){
	    	s_sliders[j].noUiSlider.set([s_sinputs[j].value]);
			}
		})());
		s_sliders[i].setAttribute('disabled', false);
	}
	//******************
	for (var i=0; i<d_sliders.length; i++){
		noUiSlider.create(d_sliders[i],{
			start: [20, 80],
			keyboardSupport: false,
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
				d_sinputs_left[j].value = parseFloat(d_sliders[j].noUiSlider.get()[0]).toFixed(calcFracLength(d_sinputs_left[j].step));
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
				d_sinputs_right[j].value = parseFloat(d_sliders[j].noUiSlider.get()[1]).toFixed(calcFracLength(d_sinputs_right[j].step));
			}
		})());
		d_sinputs_right[i].addEventListener('change',(function(){
			var j=i;
			return function(){
	    	d_sliders[j].noUiSlider.set([null,d_sinputs_right[j].value]);
			}
		})());
		d_sliders[i].setAttribute('disabled', false);
		d_sinputs_right[i].disabled = true;
		d_sinputs_left[i].disabled = true;
	}
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function powerSliderInit(idActive, idReactive, idApparent, idCosFi, regName){
	for(var i=0;i<dataReg.length;i++){
		if(dataReg[i].name == regName){
			reg = dataReg[i];
		}
	}
	sliderActive   = document.getElementById("s-slider-"+idActive);		// P кВт
	inputActive    = document.getElementById("sinput-"+idActive);			// P кВт
	sliderReactive = document.getElementById("s-slider-"+idReactive);	// Q кВар
	inputReactive  = document.getElementById("sinput-"+idReactive);		// Q кВар
	sliderApparent = document.getElementById("s-slider-"+idApparent);	// S кВА
	inputApparent  = document.getElementById("sinput-"+idApparent);		// S кВА
	sliderCosFi    = document.getElementById("s-slider-"+idCosFi);
	inputCosFi     = document.getElementById("sinput-"+idCosFi);

	inputCosFi.disabled = false;
	sliderCosFi.removeAttribute('disabled');
	inputCosFi.step  = 0.01;
	sliderCosFi.noUiSlider.updateOptions({
		step: 	0.01,
		range: {
			'min': 0,
			'max': 1,
		},
	})

	function powerApparentCalc(p,q){
		return Math.sqrt(p*p+q*q);
	}

	function powerReaCalc(s,e){
		return Math.sqrt(s*s-e*e);
	}

	function coeffPCalc(s,cosfi){
		return s*cosfi;
	}

	function coeffCalc(s,p){
		return p/s;
	}

	function activeUpdate(){
		powActive   = parseInt(sliderActive.noUiSlider.get());
		powApparent = parseInt(sliderApparent.noUiSlider.get());

		if (powActive<=powApparent){
			powReactive = powerReaCalc(powApparent,powActive);
			sliderReactive.noUiSlider.set(powReactive);
			sliderCosFi.noUiSlider.set(powActive/powApparent);
		} else {
			powReactive = 0;
			powActive = powerReaCalc(powApparent,powReactive);
			sliderActive.noUiSlider.set(powActive);
			sliderReactive.noUiSlider.set(0);
			sliderCosFi.noUiSlider.set(powActive/powApparent);
		}
		return;
	}

	function apparentUpdate(){
		powActive   = parseInt(sliderActive.noUiSlider.get());
		powApparent = parseInt(sliderApparent.noUiSlider.get());
		if (powApparent>=powActive){
			powReactive = powerReaCalc(powApparent,powActive);
			sliderReactive.noUiSlider.set(powReactive);
			sliderCosFi.noUiSlider.set(powActive/powApparent);
		} else {
			sliderApparent.noUiSlider.set(powActive);
			sliderReactive.noUiSlider.set(0);
			sliderCosFi.noUiSlider.set(powActive/powApparent);
		}
		return;
	}

	function reactiveUpdate(){
		powApparent = parseInt(sliderApparent.noUiSlider.get());
		powReactive = parseInt(sliderReactive.noUiSlider.get());
		powActive   = powerReaCalc(powApparent,powReactive);

		if (powActive<=powApparent){
			sliderActive.noUiSlider.set(powActive);
			sliderCosFi.noUiSlider.set(powActive/powApparent);
		} else {
			powReactive = powApparent;
			sliderActive.noUiSlider.set(0);
			sliderReactive.noUiSlider.set(powReactive);
			sliderCosFi.noUiSlider.set(powActive/powApparent);
		}
		return;
	}

	function cosFiUpdate(){
		powApparent = parseInt(sliderApparent.noUiSlider.get());
		cosFi       = parseFloat(sliderCosFi.noUiSlider.get());
		powReactive = powApparent*Math.sin(Math.acos(cosFi));
		powActive   = powerReaCalc(powApparent,powReactive);
		if (powActive<=powApparent){
			sliderActive.noUiSlider.set(powActive);
			sliderReactive.noUiSlider.set(powReactive);
		} else {
			powActive = powApparent;
			sliderActive.noUiSlider.set(powActive);
			powReactive = powerReaCalc(powApparent,powActive);
			sliderReactive.noUiSlider.set(powReactive);
			sliderCosFi.noUiSlider.set(powActive/powApparent);
		}
		return;
	}

	activeUpdate();
	reactiveUpdate();

	sliderActive.noUiSlider.on("change",function(){
		activeUpdate();
	});
	inputActive.addEventListener("change",function(){
		activeUpdate();
	});
	sliderReactive.noUiSlider.on("change",function(){
		reactiveUpdate();
	});
	inputReactive.addEventListener("change",function(){
		reactiveUpdate();
	});
	sliderApparent.noUiSlider.on("change",function(){
		apparentUpdate();
	});
	inputApparent.addEventListener("change",function(){
		apparentUpdate();
	})
	sliderCosFi.noUiSlider.on("change",function(){
		cosFiUpdate();
	})
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function slider2InitLimits(id1,id2) {
	slider1 = document.getElementById("s-slider-"+id1);
	slider2 = document.getElementById("s-slider-"+id2);

	input1  = document.getElementById("sinput-"+id1);
	input2  = document.getElementById("sinput-"+id2);

	slider1.noUiSlider.on('change', function(){
		val = parseInt(slider2.noUiSlider.get())
		if (parseInt(slider1.noUiSlider.get()) >= val){
			slider1.noUiSlider.set(val);
		}
	});
	input1.addEventListener('change',function(){
		if (input1.value >= input2.value){
			input1.value = input2.value;
			slider1.noUiSlider.set(input2.value);
		}
	});

	slider2.noUiSlider.on('change', function(){
		val = parseInt(slider2.noUiSlider.get());
		min = parseInt(slider1.noUiSlider.get());
		if (val<=min){
			slider2.noUiSlider.set(min);
		}
	});
	input2.addEventListener('change',function(){
		if (input2.value <= input1.value){
			input2.value = input1.value;
			slider2.noUiSlider.set(input1.value);
		}
	});
	return;
}
function slider4InitLimits(id1,id2,id3,id4) {
	slider1 = document.getElementById("s-slider-"+id1);
	slider2 = document.getElementById("s-slider-"+id2);
	slider3 = document.getElementById("s-slider-"+id3);
	slider4 = document.getElementById("s-slider-"+id4);

	input1  = document.getElementById("sinput-"+id1);
	input2  = document.getElementById("sinput-"+id2);
	input3  = document.getElementById("sinput-"+id3);
	input4  = document.getElementById("sinput-"+id4);

	slider1.noUiSlider.on('change', function(){
		val = parseInt(slider2.noUiSlider.get())
		if (parseInt(slider1.noUiSlider.get()) >= val){
			slider1.noUiSlider.set(val);
		}
	});
	input1.addEventListener('change',function(){
		if (input1.value >= input2.value){
			input1.value = input2.value;
			slider1.noUiSlider.set(input2.value);
		}
	});

	slider2.noUiSlider.on('change', function(){
		val = parseInt(slider2.noUiSlider.get());
		min = parseInt(slider1.noUiSlider.get());
		max = parseInt(slider3.noUiSlider.get());
		if (val<=min){
			slider2.noUiSlider.set(min);
		}
		if (val>=max){
			slider2.noUiSlider.set(max);
		}
	});
	input2.addEventListener('change',function(){
		if (input2.value <= input1.value){
			input2.value = input1.value;
			slider2.noUiSlider.set(input1.value);
		}
		if (input2.value >= input3.value){
			input2.value = input3.value;
			slider2.noUiSlider.set(input3.value);
		}
	});

	slider3.noUiSlider.on('change', function(){
		val = parseInt(slider3.noUiSlider.get());
		min = parseInt(slider2.noUiSlider.get());
		max = parseInt(slider4.noUiSlider.get());
		if (val<=min){
			slider3.noUiSlider.set(min);
		}
		if (val>=max){
			slider3.noUiSlider.set(max);
		}
	});
	input3.addEventListener('change',function(){
		if (input3.value <= input2.value){
			input3.value = input2.value;
			slider3.noUiSlider.set(input2.value);
		}
		if (input3.value >= input4.value){
			input3.value = input4.value;
			slider3.noUiSlider.set(input4.value);
		}
	});

	slider4.noUiSlider.on('change', function(){
		val = parseInt(slider4.noUiSlider.get());
		min = parseInt(slider3.noUiSlider.get());
		if (val<=min){
			slider4.noUiSlider.set(min);
		}
	});
	input4.addEventListener('change',function(){
		if (input4.value <= input3.value){
			input4.value = input3.value;
			slider4.noUiSlider.set(input3.value);
		}
	});
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById("versionSowtware").innerHTML = softwareVersion;
	loadContent("devicePage");
	sliderInit();
	declareInterface();
	powerSliderInit("genRatedActivePowerLevel","genRatedReactivePowerLevel","genRatedApparentPowerLevel","cosFi","genRatedApparentPower");
	//dataUpdate();
	slider4InitLimits("genUnderVoltageAlarmLevel","genUnderVoltagePreAlarmLevel","genOverVoltagePreAlarmLevel","genOverVoltageAlarmLevel");
	slider4InitLimits("genUnderFrequencyAlrmLevel","genUnderFrequencyPreAlrmLevel","genOverFrequencyPreAlrmLevel","genOverFrequencyAlrmLevel");
	slider2InitLimits("mainsUnderVoltageAlarmLevel","mainsOverVoltageAlarmLevel");
	slider2InitLimits("mainsUnderFrequencyAlarmLevel","mainsOverFrequencyAlarmLevel");
	sensorModalInit();
});
//******************************************************************************
//******************************************************************************
//******************************************************************************
