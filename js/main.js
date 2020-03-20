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
	for(var i=0;i<contentPages.length;i++){
		contentPages[i].classList.add("hidden");
	}
	return;
}

function loadContent(id) {
	hideConteny();
	document.getElementById(id).classList.remove("hidden");
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
function updateTimeSlider(id,reg){
	slider = document.getElementById("s-slider-"+id);
	input  = document.getElementById("sinput-"+id);
	label  = document.getElementById("label-"+id);
	switch(label.textContent) {
		case 'сек':
			if (input.value >= 3602){
				label.textContent = 'ч';
				slider.noUiSlider.updateOptions({
					start: [input.value/3600],
					range: {
						'min': 0,
						'max': reg.max/3600
					}
				})
			} else	if (input.value >= 61){
				label.textContent = 'мин';
				slider.noUiSlider.updateOptions({
					start: [input.value/60],
					range: {
						'min': 0,
						'max': reg.max/60
					}
				})
			}
			break;
		case 'мин':
			if (input.value >= 62){
				label.textContent = 'ч';
				slider.noUiSlider.updateOptions({
					start: [input.value/60],
					range: {
						'min': 0,
						'max': reg.max/3600
					}
				})
			} else if (input.value <= 1) {
				label.textContent = 'сек';
				slider.noUiSlider.updateOptions({
					start: [input.value*60],
					range: {
						'min': 0,
						'max': reg.max
					}
				})
			}
			break;
		case 'ч':
			if (input.value <= 1){
				label.textContent = 'мин';
				slider.noUiSlider.updateOptions({
					start: [input.value*60],
					range: {
						'min': 0,
						'max': reg.max/60
					}
				})
			}
			break;
		default:
			break;
	}
}
function timerSliderTransform(id,reg){
	document.getElementById("s-slider-"+id).noUiSlider.on('change',function(){
		updateTimeSlider(id,reg);
	});
}



function powerSliderInit(idActive, idReactive, idApparent, idCosFi, reg){
	sliderActive   = document.getElementById("s-slider-"+idActive);		// P кВт
	inputActive    = document.getElementById("sinput-"+idActive);			// P кВт
	sliderReactive = document.getElementById("s-slider-"+idReactive);	// Q кВар
	inputReactive  = document.getElementById("sinput-"+idReactive);		// Q кВар
	sliderApparent = document.getElementById("s-slider-"+idApparent);	// S кВА
	inputApparent  = document.getElementById("sinput-"+idApparent);		// S кВА
	sliderCosFi    = document.getElementById("s-slider-"+idCosFi);
	inputCosFi     = document.getElementById("sinput-"+idCosFi);

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
function toggleSelector(selectorID) {
	selector  = document.getElementById(selectorID);
	if (this.checked) {
		selector.disabled = false;
	} else {
		selector.disabled = true;
	}
	return;
}

function enableSslider(sliderID,inputID) {
	document.getElementById(sliderID).removeAttribute('disabled')
	document.getElementById(inputID).disabled = false;
	return;
}

function toggleSslider(sliderID,inputID) {
	slider  = document.getElementById(sliderID);
	input = document.getElementById(inputID);
	if (this.checked) {
		input.disabled = false;
		slider.removeAttribute('disabled');
	} else {
		input.disabled = true;
		slider.setAttribute('disabled', false);
	}
	return;
}

function toggleDslider(sliderID,inputlID,inputrID) {
	slider = document.getElementById(sliderID);
	inputl = document.getElementById(inputlID);
	inputr = document.getElementById(inputrID);
	if (this.checked) {
		inputl.disabled = false;
		inputr.disabled = false;
		slider.removeAttribute('disabled');
	} else {
		inputl.disabled = true;
		inputr.disabled = true;
		slider.setAttribute('disabled', false);
	}
	return;
}

function checkboxInit() {
	//#1
	document.getElementById('oilPressureAlarmEnb').addEventListener('click', function() {
    toggleSslider.call(this, 's-slider-oilPressureAlarmLevel','sinput-oilPressureAlarmLevel');
	});
	document.getElementById('oilPressurePreAlarmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-oilPressurePreAlarmLevel','sinput-oilPressurePreAlarmLevel');
	});
	//#2
	document.getElementById('coolantHightTempAlarmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-coolantHightTempAlarmLevel','sinput-coolantHightTempAlarmLevel');
	});
	document.getElementById('coolantHightTempPreAlarmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-coolantHightTempPreAlarmLevel','sinput-coolantHightTempPreAlarmLevel');
	});
	document.getElementById('coolantTempHeaterEnb').addEventListener('change', function() {
		toggleDslider.call(this, 'd-slider-coolantTempHeaterLevel','dinput-coolantTempHeaterOffLevel','dinput-coolantTempHeaterOnLevel');
	});
	document.getElementById('coolantTempCoolerEnb').addEventListener('change', function() {
		toggleDslider.call(this, 'd-slider-coolantTempCoolerLevel','dinput-coolantTempCoolerOffLevel','dinput-coolantTempCoolerOnLevel');
	});
	//#3
	document.getElementById('fuelLevelLowAlarmEnb').addEventListener('change', function() {
		toggleSelector.call(this, 'fuelLevelLowAlarmAction');
		toggleSslider.call(this, 's-slider-fuelLevelLowAlarmLevel','sinput-fuelLevelLowAlarmLevel');
		toggleSslider.call(this, 's-slider-fuelLevelLowAlarmDelay','sinput-fuelLevelLowAlarmDelay');
	});
	document.getElementById('fuelLevelLowPreAlarmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-fuelLevelLowPreAlarmLevel','sinput-fuelLevelLowPreAlarmLevel');
		toggleSslider.call(this, 's-slider-fuelLevelLowPreAlarmDelay','sinput-fuelLevelLowPreAlarmDelay');
	});
	document.getElementById('fuelLevelHightAlarmEnb').addEventListener('change', function() {
		toggleSelector.call(this, 'fuelLevelHightAlarmAction');
		toggleSslider.call(this, 's-slider-fuelLevelHightAlarmLevel','sinput-fuelLevelHightAlarmLevel');
		toggleSslider.call(this, 's-slider-fuelLevelHightAlarmDelay','sinput-fuelLevelHightAlarmDelay');
	});
	document.getElementById('fuelLevelHightPreAlarmLevelEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-fuelLevelHightPreAlarmLevel','sinput-fuelLevelHightPreAlarmLevel');
		toggleSslider.call(this, 's-slider-fuelLevelHightPreAlarmDelay','sinput-fuelLevelHightPreAlarmDelay');
	});
	document.getElementById('fuelPumpEnb').addEventListener('change', function() {
		toggleDslider.call(this, 'd-slider-fuelPumpOnOffLevel','dinput-fuelPumpOffLevel','dinput-fuelPumpOnLevel');
	});
	//#4
	enableSslider('s-slider-diaDelay','sinput-diaDelay');
	//#5
	enableSslider('s-slider-dibDelay','sinput-dibDelay');
	//#6
	enableSslider('s-slider-dicDelay','sinput-dicDelay');
	//#7
	enableSslider('s-slider-didDelay','sinput-didDelay');
	//#8 DO
	//#9 Timers
	enableSslider('s-slider-timerMainsTransientDelay','sinput-timerMainsTransientDelay');
	enableSslider('s-slider-timerStartDelay','sinput-timerStartDelay');
	enableSslider('s-slider-timerCranking','sinput-timerCranking');
	enableSslider('s-slider-timerCrankDelay','sinput-timerCrankDelay');
	enableSslider('s-slider-timerStartupIdleTime','sinput-timerStartupIdleTime');
	enableSslider('s-slider-timerNominalRPMDelay','sinput-timerNominalRPMDelay');
	enableSslider('s-slider-timerSafetyOnDelay','sinput-timerSafetyOnDelay');
	enableSslider('s-slider-timerWarming','sinput-timerWarming');
	enableSslider('s-slider-timerTransferDelay','sinput-timerTransferDelay');
	enableSslider('s-slider-timerBreakerTripPulse','sinput-timerBreakerTripPulse');
	enableSslider('s-slider-timerBreakerClosePulse','sinput-timerBreakerClosePulse');
	enableSslider('s-slider-timerReturnDelay','sinput-timerReturnDelay');
	enableSslider('s-slider-timerCooling','sinput-timerCooling');
	enableSslider('s-slider-timerCoolingIdle','sinput-timerCoolingIdle');
	enableSslider('s-slider-timerSolenoidHold','sinput-timerSolenoidHold');
	enableSslider('s-slider-timerFailStopDelay','sinput-timerFailStopDelay');
	enableSslider('s-slider-timerGenTransientDelay','sinput-timerGenTransientDelay');
	//#10
	enableSslider('s-slider-genRatedActivePower','sinput-genRatedActivePower');
	enableSslider('s-slider-genRatedReactivePower','sinput-genRatedReactivePower');
	enableSslider('s-slider-genRatedApparentPower','sinput-genRatedApparentPower');
	enableSslider('s-slider-genRatedFrequency','sinput-genRatedFrequency');
	enableSslider('s-slider-genCurrentPrimary','sinput-genCurrentPrimary');
	enableSslider('s-slider-genCurrentFullLoadRating','sinput-genCurrentFullLoadRating');
	document.getElementById('genPowerGeneratorControlEnb').addEventListener('change', function() {
		toggleSelector.call(this, 'genPoles');
		toggleSelector.call(this, 'genAcSys');
	});
	//#11
	document.getElementById('genUnderVoltageAlarmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-genUnderVoltageAlarmLevel','sinput-genUnderVoltageAlarmLevel');
	});
	document.getElementById('genUnderVoltagePreAlarmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-genUnderVoltagePreAlarmLevel','sinput-genUnderVoltagePreAlarmLevel');
	});
	document.getElementById('genOverVoltagePreAlarmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-genOverVoltagePreAlarmLevel','sinput-genOverVoltagePreAlarmLevel');
	});
	enableSslider('s-slider-genOverVoltageAlarmLevel','sinput-genOverVoltageAlarmLevel');
	//#12
	document.getElementById('genUnderFrequencyAlrmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-genUnderFrequencyAlrmLevel','sinput-genUnderFrequencyAlrmLevel');
	});
	document.getElementById('genUnderFrequencyPreAlrmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-genUnderFrequencyPreAlrmLevel','sinput-genUnderFrequencyPreAlrmLevel');
	});
	document.getElementById('genOverFrequencyPreAlrmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-genOverFrequencyPreAlrmLevel','sinput-genOverFrequencyPreAlrmLevel');
	});
	document.getElementById('genOverFrequencyAlarmEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-genOverFrequencyAlrmLevel','sinput-genOverFrequencyAlrmLevel');
	});
	//#13
	enableSslider('s-slider-genOverCurrentThermalProtectionLevel','sinput-genOverCurrentThermalProtectionLevel');
	enableSslider('s-slider-genOverCurrentCutoffLevel','sinput-genOverCurrentCutoffLevel');
	enableSslider('s-slider-genOverCurrentAlarmLevel','sinput-genOverCurrentAlarmLevel');
	enableSslider('s-slider-genOverCurrentAlarmDelay','sinput-genOverCurrentAlarmDelay');
	document.getElementById('genCurrentOverloadProtectionEnb').addEventListener('change', function() {
		toggleSelector.call(this, 'genCurrentOverloadProtectionAction');
		toggleSslider.call(this, 's-slider-genCurrentOverloadProtectionLevel','sinput-genCurrentOverloadProtectionLevel');
		toggleSslider.call(this, 's-slider-genCurrentOverloadProtectionDelay','sinput-genCurrentOverloadProtectionDelay');
	});
	document.getElementById('genCurrentOverPhaseImbalanceEnb').addEventListener('change', function() {
		toggleSelector.call(this, 'genCurrentOverPhaseImbalanceAction');
		toggleSslider.call(this, 's-slider-genCurrentOverPhaseImbalanceLevel','sinput-genCurrentOverPhaseImbalanceLevel');
		toggleSslider.call(this, 's-slider-genCurrentOverPhaseImbalanceDelay','sinput-genCurrentOverPhaseImbalanceDelay');
	});
	//#14
	//#15
	document.getElementById('mainsUnderVoltageAlarm').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-mainsUnderVoltageAlarmLevel','sinput-mainsUnderVoltageAlarmLevel');
	});
	document.getElementById('mainsOverVoltageAlarm').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-mainsOverVoltageAlarmLevel','sinput-mainsOverVoltageAlarmLevel');
	});
	document.getElementById('mainsUnderFrequencyAlarm').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-mainsUnderFrequencyAlarmLevel','sinput-mainsUnderFrequencyAlarmLevel');
	});
	document.getElementById('mainsOverFrequencyAlarm').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-mainsOverFrequencyAlarmLevel','sinput-mainsOverFrequencyAlarmLevel');
	});
	//#16
	document.getElementById('enginePreHeatEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-enginePreHeatOn','sinput-enginePreHeatOn');
		toggleSslider.call(this, 's-slider-enginePreHeatDuration','sinput-enginePreHeatDuration');
	});
	document.getElementById('enginePostHeatEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-enginePostHeatOn','sinput-enginePostHeatOn');
		toggleSslider.call(this, 's-slider-enginePostHeatDuration','sinput-enginePostHeatDuration');
	});
	//#17
	document.getElementById('crankDisconnectOilPressureEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-crankDisconnectOilPressureLevel','sinput-crankDisconnectOilPressureLevel');
	});
	document.getElementById('crankDisconnectChargeAlternatorEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-crankDisconnectChargeAlternatorLevel','sinput-crankDisconnectChargeAlternatorLevel');
	});
	//#18
	document.getElementById('batteryUnderVoltageEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-batteryUnderVoltageLevel','sinput-batteryUnderVoltageLevel');
		toggleSslider.call(this, 's-slider-batteryUnderVoltageDelay','sinput-batteryUnderVoltageDelay');
	});
	document.getElementById('batteryOverVoltageEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-batteryOverVoltageLevel','sinput-batteryOverVoltageLevel');
		toggleSslider.call(this, 's-slider-batteryOverVoltageDelay','sinput-batteryOverVoltageDelay');
	});
	document.getElementById('batteryChargeShutdownEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-batteryChargeShutdownLevel','sinput-batteryChargeShutdownLevel');
		toggleSslider.call(this, 's-slider-batteryChargeShutdownDelay','sinput-batteryChargeShutdownDelay');
	});
	document.getElementById('batteryChargeWarningEnb').addEventListener('change', function() {
		toggleSslider.call(this, 's-slider-batteryChargeWarningLevel','sinput-batteryChargeWarningLevel');
		toggleSslider.call(this, 's-slider-batteryChargeWarningDelay','sinput-batteryChargeWarningDelay');
	});
	//#19
	document.getElementById('maintenanceAlarmOilEnb').addEventListener('change', function() {
		toggleSelector.call(this, 'maintenanceAlarmOilAction');
		toggleSslider.call(this, 's-slider-maintenanceAlarmOilEngineRunTime','sinput-maintenanceAlarmOilEngineRunTime');
	});
	document.getElementById('maintenanceAlarmAirEnb').addEventListener('change', function() {
		toggleSelector.call(this, 'maintenanceAlarmAirAction');
		toggleSslider.call(this, 's-slider-maintenanceAlarmAirEngineRunTime','sinput-maintenanceAlarmAirEngineRunTime');
	});
	document.getElementById('maintenanceAlarmFuelEnb').addEventListener('change', function() {
		toggleSelector.call(this, 'maintenanceAlarmFuelAction');
		toggleSslider.call(this, 's-slider-maintenanceAlarmFuelEngineRunTime','sinput-maintenanceAlarmFuelEngineRunTime');
	});
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function updateAllTimeSliders(){
	updateTimeSlider("fuelLevelLowAlarmDelay",fuelLevelLowAlarmDelay);
	updateTimeSlider("fuelLevelLowPreAlarmDelay",fuelLevelLowPreAlarmDelay);
	updateTimeSlider("fuelLevelHightAlarmDelay",fuelLevelHightAlarmDelay);
	updateTimeSlider("fuelLevelHightPreAlarmDelay",fuelLevelHightPreAlarmDelay);
	updateTimeSlider("diaDelay",diaDelay);
	updateTimeSlider("dibDelay",dibDelay);
	updateTimeSlider("dicDelay",dicDelay);
	updateTimeSlider("didDelay",didDelay);
	updateTimeSlider("timerMainsTransientDelay",timerMainsTransientDelay);
	updateTimeSlider("timerStartDelay",timerStartDelay);
	updateTimeSlider("timerCranking",timerCranking);
	updateTimeSlider("timerCrankDelay",timerCrankDelay);
	updateTimeSlider("timerStartupIdleTime",timerStartupIdleTime);
	updateTimeSlider("timerSafetyOnDelay",timerSafetyOnDelay);
	updateTimeSlider("timerTransferDelay",timerTransferDelay);
	updateTimeSlider("timerBreakerClosePulse",timerBreakerClosePulse);
	updateTimeSlider("timerReturnDelay",timerReturnDelay);
	updateTimeSlider("timerCooling",timerCooling);
	updateTimeSlider("timerCoolingIdle",timerCoolingIdle);
	updateTimeSlider("timerSolenoidHold",timerSolenoidHold);
	updateTimeSlider("timerFailStopDelay",timerFailStopDelay);
	updateTimeSlider("timerGenTransientDelay",timerGenTransientDelay);
	updateTimeSlider("genCurrentOverloadProtectionDelay",genCurrentOverloadProtectionDelay);
	updateTimeSlider("genCurrentOverPhaseImbalanceDelay",genCurrentOverPhaseImbalanceDelay);
	updateTimeSlider("enginePreHeatDuration",enginePreHeatDuration);
	updateTimeSlider("enginePostHeatDuration",enginePostHeatDuration);
	updateTimeSlider("batteryChargeShutdownDelay",batteryChargeShutdownDelay);
	updateTimeSlider("timerNominalRPMDelay",timerNominalRPMDelay);
	updateTimeSlider("timerWarming",timerWarming);
	updateTimeSlider("timerBreakerTripPulse",timerBreakerTripPulse);
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

	//dataUpdate();
	sensorModalInit();
	powerSliderInit("genRatedActivePower","genRatedReactivePower","genRatedApparentPower","cosFi",genRatedApparentPower);
	timerSliderTransform("fuelLevelLowAlarmDelay",fuelLevelLowAlarmDelay);
	timerSliderTransform("fuelLevelLowPreAlarmDelay",fuelLevelLowPreAlarmDelay);
	timerSliderTransform("fuelLevelHightAlarmDelay",fuelLevelHightAlarmDelay);
	timerSliderTransform("fuelLevelHightPreAlarmDelay",fuelLevelHightPreAlarmDelay);
	timerSliderTransform("diaDelay",diaDelay);
	timerSliderTransform("dibDelay",dibDelay);
	timerSliderTransform("dicDelay",dicDelay);
	timerSliderTransform("didDelay",didDelay);
	timerSliderTransform("timerMainsTransientDelay",timerMainsTransientDelay);
	timerSliderTransform("timerStartDelay",timerStartDelay);
	timerSliderTransform("timerCranking",timerCranking);
	timerSliderTransform("timerCrankDelay",timerCrankDelay);
	timerSliderTransform("timerStartupIdleTime",timerStartupIdleTime);
	timerSliderTransform("timerSafetyOnDelay",timerSafetyOnDelay);
	timerSliderTransform("timerTransferDelay",timerTransferDelay);
	timerSliderTransform("timerBreakerClosePulse",timerBreakerClosePulse);
	timerSliderTransform("timerReturnDelay",timerReturnDelay);
	timerSliderTransform("timerCooling",timerCooling);
	timerSliderTransform("timerCoolingIdle",timerCoolingIdle);
	timerSliderTransform("timerSolenoidHold",timerSolenoidHold);
	timerSliderTransform("timerFailStopDelay",timerFailStopDelay);
	timerSliderTransform("timerGenTransientDelay",timerGenTransientDelay);
	timerSliderTransform("genCurrentOverloadProtectionDelay",genCurrentOverloadProtectionDelay);
	timerSliderTransform("genCurrentOverPhaseImbalanceDelay",genCurrentOverPhaseImbalanceDelay);
	timerSliderTransform("enginePreHeatDuration",enginePreHeatDuration);
	timerSliderTransform("enginePostHeatDuration",enginePostHeatDuration);
	timerSliderTransform("batteryChargeShutdownDelay",batteryChargeShutdownDelay);
	timerSliderTransform("timerNominalRPMDelay",timerNominalRPMDelay);
	timerSliderTransform("timerWarming",timerWarming);
	timerSliderTransform("timerBreakerTripPulse",timerBreakerTripPulse);
	slider4InitLimits("genUnderVoltageAlarmLevel","genUnderVoltagePreAlarmLevel","genOverVoltagePreAlarmLevel","genOverVoltageAlarmLevel");
	slider4InitLimits("genUnderFrequencyAlrmLevel","genUnderFrequencyPreAlrmLevel","genOverFrequencyPreAlrmLevel","genOverFrequencyAlrmLevel");
	slider2InitLimits("mainsUnderVoltageAlarmLevel","mainsOverVoltageAlarmLevel");
	slider2InitLimits("mainsUnderFrequencyAlarmLevel","mainsOverFrequencyAlarmLevel");
	checkboxInit();
});
//******************************************************************************
//******************************************************************************
//******************************************************************************
function downloadSensorData(chrtData){

	function SaveAsFile(t,f,m) {
  	try {
    	var b = new Blob([t],{type:m});
      saveAs(b, f);
    } catch(e) {
    	window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
    }
  }

	saveChartData(chrtData);
	SaveAsFile(JSON.stringify(chrtData),"sensorData.JSON","text/plain;charset=utf-8");
}

function uploadSensorData(chrtData) {
	var newCart;
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		var input = document.createElement("input");
    input.setAttribute("type","file");
		input.addEventListener("change",function() {
			file = input.files[0];
			if (file.type != "application/json") {
				showAlert("alert-warning","Выбран файл с неправильным расширением. Выберете JSON файл");
			} else {
				let reader = new FileReader();				reader.readAsText(file);
				reader.onload = function() {
					try {
						newCart = JSON.parse(reader.result);
						makeChart(newCart);
					} catch(e) {
						showAlert("alert-warning","Неправильный формат файла");
					}
  			};
			}
		});
		input.click();
    return false; // avoiding navigation
	} else {
		showAlert("alert-warning","Браузер не поддерживает загрузку файлов");
	}
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
