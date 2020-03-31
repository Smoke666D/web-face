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
window.addEventListener("load", function() { window. scrollTo(0, 0); });
document.addEventListener("touchmove", function(e) { e.preventDefault() });
//******************************************************************************
//******************************************************************************
//******************************************************************************
function toogleNav() {
	var sb   = document.getElementById("sidebar");
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
	document.getElementById("nav-" + id).classList.add("checked");
	var sb = document.getElementById("sidebar");
	if (window.matchMedia("(max-width: 991.98px)").matches) {
		sb.classList.remove("active");
		sidebarDone = 0;
	}
	return;
}

var sidebarDone = 0;
document.getElementById("content").addEventListener('click', function() {
	var sb = document.getElementById("sidebar");
	if (!sb.classList.contains("active")) {
		sidebarDone = 0;
	}
	if ((window.matchMedia("(max-width: 991.98px)").matches) && (sb.classList.contains("active")) && (sidebarDone == 1) )  {
 		sb.classList.remove("active");
		sidebarDone = 0;
}});
document.getElementById("sidebar").addEventListener('transitionend', function() {
	var sb = document.getElementById("sidebar");
	if ((window.matchMedia("(max-width: 991.98px)").matches) && (sb.classList.contains("active"))) {
		sidebarDone = 1;
}});
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
function oilScaleInit() {
	var self = this;
	this.object = document.getElementById("oilScale");
	this.label  = document.getElementById("oilScaleString");
	self.slider0 = new Slider("oilPressurePreAlarmLevel");
	self.slider1 = new Slider("oilPressureAlarmLevel");
	self.slider2 = new Slider("crankDisconnectOilPressureLevel");

	function calcOilScale() {
		self.slider0.grab();
		self.slider1.grab();
		self.slider2.grab();
		if(self.object.checked) {
			self.label.textContent = "КПа"
			self.slider0.setUnits("КПа");
			self.slider1.setUnits("КПа");
			self.slider2.setUnits("КПа");
			self.slider0.setScale(1);
			self.slider1.setScale(1);
			self.slider2.setScale(1);
		} else {
			self.label.textContent = "Бар"
			self.slider0.setUnits("Бар");
			self.slider1.setUnits("Бар");
			self.slider2.setUnits("Бар");

			self.slider0.setScale(-1);
			self.slider1.setScale(-1);
			self.slider2.setScale(-1);
		}
		self.slider0.update();
		self.slider1.update();
		self.slider2.update();
	}


	this.object.addEventListener('change', function(){
		calcOilScale()
	})
	calcOilScale();
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function slider2InitLimits(id1,id2) {
	var self = this;
	this.slider1 = document.getElementById("s-slider-"+id1);
	this.slider2 = document.getElementById("s-slider-"+id2);

	this.input1  = document.getElementById("sinput-"+id1);
	this.input2  = document.getElementById("sinput-"+id2);

	this.slider1.noUiSlider.on('change', function(){
		val = parseFloat(self.slider2.noUiSlider.get())
		if (parseFloat(self.slider1.noUiSlider.get()) >= val){
			self.slider1.noUiSlider.set(val);
		}
	});
	this.input1.addEventListener('change',function(){
		if (self.input1.value >= self.input2.value){
			self.input1.value = self.input2.value;
			self.slider1.noUiSlider.set(input2.value);
		}
	});

	this.slider2.noUiSlider.on('change', function(){
		val = parseFloat(self.slider2.noUiSlider.get());
		min = parseFloat(self.slider1.noUiSlider.get());
		if (val<=min){
			self.slider2.noUiSlider.set(min);
		}
	});
	this.input2.addEventListener('change',function(){
		if (self.input2.value <= self.input1.value){
			self.input2.value = self.input1.value;
			self.slider2.noUiSlider.set(input1.value);
		}
	});
	return;
}

function slider4InitLimits(id1,id2,id3,id4) {
	var self = this;
	this.slider1 = document.getElementById("s-slider-"+id1);
	this.slider2 = document.getElementById("s-slider-"+id2);
	this.slider3 = document.getElementById("s-slider-"+id3);
	this.slider4 = document.getElementById("s-slider-"+id4);

	this.input1  = document.getElementById("sinput-"+id1);
	this.input2  = document.getElementById("sinput-"+id2);
	this.input3  = document.getElementById("sinput-"+id3);
	this.input4  = document.getElementById("sinput-"+id4);

	this.slider1.noUiSlider.on('change', function(){
		val = parseFloat(self.slider2.noUiSlider.get())
		if (parseFloat(self.slider1.noUiSlider.get()) >= val){
			self.slider1.noUiSlider.set(val);
		}
	});
	this.input1.addEventListener('change',function(){
		if (self.input1.value >= self.input2.value){
			self.input1.value = self.input2.value;
			self.slider1.noUiSlider.set(self.input2.value);
		}
	});

	this.slider2.noUiSlider.on('change', function(){
		val = parseFloat(self.slider2.noUiSlider.get());
		min = parseFloat(self.slider1.noUiSlider.get());
		max = parseFloat(self.slider3.noUiSlider.get());
		if (val<=min){
			self.slider2.noUiSlider.set(min);
		}
		if (val>=max){
			self.slider2.noUiSlider.set(max);
		}
	});
	this.input2.addEventListener('change',function(){
		if (self.input2.value <= self.input1.value){
			self.input2.input2.value = self.input1.value;
			self.slider2.noUiSlider.set(self.input1.value);
		}
		if (self.input2.value >= self.input3.value){
			self.input2.value = self.input3.value;
			self.slider2.noUiSlider.set(input3.value);
		}
	});

	this.slider3.noUiSlider.on('change', function(){
		val = parseFloat(self.slider3.noUiSlider.get());
		min = parseFloat(self.slider2.noUiSlider.get());
		max = parseFloat(self.slider4.noUiSlider.get());
		if (val<=min){
			self.slider3.noUiSlider.set(min);
		}
		if (val>=max){
			self.slider3.noUiSlider.set(max);
		}
	});
	this.input3.addEventListener('change',function(){
		if (self.input3.value <= self.input2.value){
			self.input3.value = self.input2.value;
			self.slider3.noUiSlider.set(self.input2.value);
		}
		if (self.input3.value >= self.input4.value){
			self.input3.value = self.input4.value;
			self.slider3.noUiSlider.set(self.input4.value);
		}
	});

	this.slider4.noUiSlider.on('change', function(){
		val = parseFloat(self.slider4.noUiSlider.get());
		min = parseFloat(self.slider3.noUiSlider.get());
		if (val<=min){
			self.slider4.noUiSlider.set(min);
		}
	});
	this.input4.addEventListener('change',function(){
		if (self.input4.value <= self.input3.value){
			self.input4.value = self.input3.value;
			self.slider4.noUiSlider.set(input3.value);
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
	oilScaleInit();
	powerSliderInit("genRatedActivePowerLevel","genRatedReactivePowerLevel","genRatedApparentPowerLevel","cosFi","genRatedApparentPower");
	dataUpdate();

	updateVersions();

	const genVoltageLims = new slider4InitLimits("genUnderVoltageAlarmLevel","genUnderVoltagePreAlarmLevel","genOverVoltagePreAlarmLevel","genOverVoltageAlarmLevel");
	const genFreqLims = new slider4InitLimits("genUnderFrequencyAlarmLevel","genUnderFrequencyPreAlarmLevel","genOverFrequencyPreAlarmLevel","genOverFrequencyAlarmLevel");
	const mainsVoltageLims = new slider2InitLimits("mainsUnderVoltageAlarmLevel","mainsOverVoltageAlarmLevel");
	const mainsFreqLims = new slider2InitLimits("mainsUnderFrequencyAlarmLevel","mainsOverFrequencyAlarmLevel");
});
//******************************************************************************
//******************************************************************************
//******************************************************************************
