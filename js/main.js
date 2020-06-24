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
var connectionType = 'usb';
var electronApp = 1;
/*----------------------------------------------------------------------------*/
function connectClick() {
	var btn     = document.getElementById("modalConnect-button");
	var modal   = document.getElementById("connectionModal");
	var body    = document.getElementsByTagName("body")[0];
	var wrapper = document.getElementById("wrapper");

	modal.classList.add("show");
	modal.style.display = "block";
	body.classList.add("modal-open");
	wrapper.innerHTML = wrapper.innerHTML + '<div id="backdrop" class="modal-backdrop show"></div>';
	return;
}
/*----------------------------------------------------------------------------*/
function connectModalClose() {
	var modal    = document.getElementById("connectionModal");
	var body     = document.getElementsByTagName("body")[0];
	var backdrop = document.getElementById("backdrop");
	modal.classList.remove("show");
	modal.style.display = "none";
	body.classList.remove("modal-open");
	backdrop.remove();
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function navbarToogling() {
	genSw = document.getElementById("genPowerGeneratorControlEnb");
	netSw = document.getElementById("mainsControlEnb");

  function generatorToogle() {
		genPages = document.getElementById("genCollapse");
		if ( genSw.checked == false ) {
  		genPages.classList.add("hide");
		} else {
			genPages.classList.remove("hide");
		}
	}
	function networkToogle() {
		netPages = document.getElementById("netCollapse");
		if ( netSw.checked == false ) {
			netPages.classList.add("hide");
		} else {
			netPages.classList.remove("hide");
		}
	}

	genSw.addEventListener("change", function() {
		generatorToogle();
	});
	netSw.addEventListener("change", function() {
		networkToogle();
	});

	networkToogle();
	generatorToogle();
}

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

function setConnect(input) {
  var usbButton = document.getElementById("usb-button");
  var ethButton = document.getElementById("eth-button");
	var ipInput   = document.getElementById("input-ipaddress");
  if (input == 'eth') {
		connectionType = 'eth';
    usbButton.classList.remove("btn-success");
    ethButton.classList.remove("btn-secondary");
    usbButton.classList.add("btn-secondary");
    ethButton.classList.add("btn-success");
		ipInput.disabled = false;
  } else if (input == 'usb') {
		connectionType = 'usb';
    ethButton.classList.remove("btn-success");
    usbButton.classList.remove("btn-secondary");
    ethButton.classList.add("btn-secondary");
    usbButton.classList.add("btn-success");
		ipInput.disabled = true;
  }
	return;
}

function setSuccessConnection() {
	if (electronApp == 1){
		var obj = document.getElementById("modalConnect-button");
		if ( !(obj.classList.contains("btn-success")) ) {
			obj.classList.remove("btn-primary");
			obj.classList.add("btn-success");
		}
		document.getElementById("refreshData-button").disabled = false;
		document.getElementById("uploadData-button").disabled = false;
	}
	return;
}

function resetSuccessConnection() {
	if (electronApp == 1) {
		var obj = document.getElementById("modalConnect-button");
		if ( obj.classList.contains("btn-success") ) {
			obj.classList.remove("btn-success");
			obj.classList.add("btn-primary");
		}
		document.getElementById("refreshData-button").disabled = true;
		document.getElementById("uploadData-button").disabled = true;
	}
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
function oilScaleInit() {
	var self = this;
	this.object = document.getElementById("oilScale");
	this.label  = document.getElementById("oilScaleString");
	self.slider0 = new Slider("oilPressurePreAlarmLevel",0);
	self.slider1 = new Slider("oilPressureAlarmLevel",0);
	self.slider2 = new Slider("crankDisconnectOilPressureLevel",0);

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
function diInit(letter) {
	function setDisabled() {
		var funct    = document.getElementById("di"+letter+"Function")
		var polarity = document.getElementById("di"+letter+"Polarity");
		var action   = document.getElementById("di"+letter+"Action");
		var arming   = document.getElementById("di"+letter+"Arming");
		var input    = document.getElementById("sinput-di"+letter+"Delay");
		var slider   = document.getElementById("s-slider-di"+letter+"Delay");
		var message  = document.getElementById("di" + letter + "Message");
		if ( funct.value == 0 ) {
			polarity.disabled = true;
			action.disabled = true;
			arming.disabled = true;
			message.disabled = true;
			input.disabled = true;
			slider.setAttribute('disabled', true);
		} else if ( funct.value == 1 ) {
			polarity.disabled = false;
			action.disabled = false;
			arming.disabled = false;
			message.disabled = false;
			input.disabled = false;
			slider.removeAttribute('disabled');
	  } else {
			polarity.disabled = false;
			action.disabled = true;
			arming.disabled = true;
			message.disabled = true;
			input.disabled = false;
			slider.removeAttribute('disabled');
		}
		return;
	}

	setDisabled();
	document.getElementById("di"+letter+"Function").addEventListener('change', function() {
		setDisabled();
	});
	return;
}

function doInit(letter) {
	function setDisabled() {
		var no = document.getElementById("do"+letter+"NO");
		var nc = document.getElementById("do"+letter+"NC");
		var type = document.getElementById("do"+letter+"Type");
		if ( type.value == 0 ) {
			no.disabled = true;
			nc.disabled = true;
		} else {
			no.disabled = false;
			nc.disabled = false;
		}
		return;
	}
	setDisabled();
	document.getElementById("do"+letter+"Type").addEventListener('change', function() {
		setDisabled();
	});
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function ainInit(master,checkers,slaves) {
	function setDisabled() {
		if ( document.getElementById(master).value == 0 ) {
			for ( var i=0; i<checkers.length; i++ ) {
				document.getElementById(checkers[i]).disabled = true;
				document.getElementById(checkers[i]).checked = false;
			}
			for ( var i=0; i<slaves.length; i++ ) {
				var slave = document.getElementById(slaves[i]);
				if ( slaves[i].search('slider') != -1 ) {
					slave.setAttribute('disabled', false);
				} else {
					slave.disabled = true;
				}
			}
		} else {
			for ( var i=0; i<checkers.length; i++ ) {
				document.getElementById(checkers[i]).disabled = false;
			}
		}
	}

	setDisabled();
	document.getElementById(master).addEventListener('change',function(){
		setDisabled();
	});
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
	try {
		if ( electronApp == 1 ){
			document.getElementById("refreshData-button").disabled = true;
			document.getElementById("uploadData-button").disabled = true;
		}
		document.getElementById("versionSowtware").innerHTML = softwareVersion;
		loadContent("devicePage");
		sliderInit();
		declareInterface();
		oilScaleInit();
		diInit('a');
		diInit('b');
		diInit('c');
		diInit('d');
		doInit('c');
		doInit('d');
		doInit('e');
		doInit('f');

		ainInit('oilPressureSensorType',['oilPressureOpenCircuitAlarmEnb','oilPressureAlarmEnb','oilPressurePreAlarmEnb'],['sinput-oilPressureAlarmLevel','s-slider-oilPressureAlarmLevel','sinput-oilPressurePreAlarmLevel','s-slider-oilPressurePreAlarmLevel']);
		ainInit('coolantTempSensorType',['coolantTempOpenCircuitAlarmEnb','coolantHightTempAlarmEnb','coolantHightTempPreAlarmEnb','coolantTempHeaterEnb','coolantTempCoolerEnb'],['sinput-coolantHightTempAlarmLevel','s-slider-coolantHightTempAlarmLevel','sinput-coolantHightTempPreAlarmLevel','s-slider-coolantHightTempPreAlarmLevel','sinput-coolantTempHeaterOnLevel','s-slider-coolantTempHeaterOnLevel','sinput-coolantTempHeaterOffLevel','s-slider-coolantTempHeaterOffLevel','sinput-coolantTempCoolerOffLevel','s-slider-coolantTempCoolerOffLevel','sinput-coolantTempCoolerOnLevel','s-slider-coolantTempCoolerOnLevel']);
		ainInit('fuelLevelSensorType',['fuelLevelLowAlarmEnb','fuelLevelLowPreAlarmEnb','fuelLevelHightAlarmEnb','fuelLevelHightPreAlarmEnb','fuelPumpEnb'],['fuelLevelLowAlarmAction','sinput-fuelLevelLowAlarmLevel','s-slider-fuelLevelLowAlarmLevel','sinput-fuelLevelLowAlarmDelay','s-slider-fuelLevelLowAlarmDelay','sinput-fuelLevelLowPreAlarmLevel','s-slider-fuelLevelLowPreAlarmLevel','sinput-fuelLevelLowPreAlarmDelay','s-slider-fuelLevelLowPreAlarmDelay','fuelLevelHightAlarmAction','sinput-fuelLevelHightAlarmLevel','s-slider-fuelLevelHightAlarmLevel','sinput-fuelLevelHightAlarmDelay','s-slider-fuelLevelHightAlarmDelay','sinput-fuelLevelHightPreAlarmLevel','s-slider-fuelLevelHightPreAlarmLevel','sinput-fuelLevelHightPreAlarmDelay','s-slider-fuelLevelHightPreAlarmDelay','sinput-fuelPumpOffLevel','s-slider-fuelPumpOffLevel','sinput-fuelPumpOnLevel','s-slider-fuelPumpOnLevel']);
		powerSliderInit("genRatedActivePowerLevel","genRatedReactivePowerLevel","genRatedApparentPowerLevel","cosFi","genRatedApparentPower");
		if (electronApp == 0) {
			ethDataUpdate(function(){return;});
		}
		checkSettings();
		navbarToogling();
		updateVersions();
		const genVoltageLims = new slider4InitLimits("genUnderVoltageAlarmLevel","genUnderVoltagePreAlarmLevel","genOverVoltagePreAlarmLevel","genOverVoltageAlarmLevel");
		const genFreqLims = new slider4InitLimits("genUnderFrequencyAlarmLevel","genUnderFrequencyPreAlarmLevel","genOverFrequencyPreAlarmLevel","genOverFrequencyAlarmLevel");
		const mainsVoltageLims = new slider2InitLimits("mainsUnderVoltageAlarmLevel","mainsOverVoltageAlarmLevel");
		const mainsFreqLims = new slider2InitLimits("mainsUnderFrequencyAlarmLevel","mainsOverFrequencyAlarmLevel");

		return;
	} catch {
		return;
	}
});
//******************************************************************************
//******************************************************************************
//******************************************************************************
module.exports.electronApp = electronApp;
module.exports.setSuccessConnection = setSuccessConnection;
module.exports.resetSuccessConnection = resetSuccessConnection;
module.exports.connectionType = connectionType;
