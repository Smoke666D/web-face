var s_sliders;
var s_sinputs;
var checkboxes;
var selectors;
var d_sliders;
var d_sinputs_left;
var d_sinputs_right;

const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
//******************************************************************************
//******************************************************************************
//******************************************************************************
function bitVal(n,reg) {
	return (reg.value&reg.bit[n].mask)>>reg.bit[n].shift;
}

function checkboxUpdate(ID,reg,n) {
	document.getElementById(ID).checked = bitVal(n,reg);
	return;
}

function selectorUpdate(ID,reg,n,dis){
	sel = document.getElementById(ID);
	sel.value = bitVal(n,reg);
	if (dis==1){
		document.getElementById(ID).disabled = false;
	} else {
			sel.disabled = true;
	}
	return;
}

function s_sliderUpdate(sliderID,inputID,reg,dis){
	slider = document.getElementById(sliderID);
	input = document.getElementById(inputID);
	if (dis == 1){
		input.disabled = false;
		slider.removeAttribute('disabled');
	}	else {
		input.disabled = true;
		slider.setAttribute('disabled', false);
	}
	input.value = reg.value;
	input.step = reg.scale;
	input.addEventListener('change', function () {
		this.value = parseFloat(this.value).toFixed(f(reg.scale));
	});
	slider.noUiSlider.updateOptions({
		step: 	reg.scale,
		start: [reg.value],
		range: {
			'min': reg.min,
			'max': reg.max
		}
	})
	return;
}

function d_sliderUpdate(sliderID,inputlID,inputrID,regL,regR,dis){
	slider = document.getElementById(sliderID);
	inputl = document.getElementById(inputlID);
	inputr = document.getElementById(inputrID);
	if (dis==1){
		inputl.disabled = false;
		inputr.disabled = false;
		slider.removeAttribute('disabled');
	}	else {
		inputl.disabled = true;
		inputr.disabled = true;
		slider.setAttribute('disabled', false);
	}
	inputl.value = regL.value;
	inputl.step = regL.scale;
	inputl.addEventListener('change',function(){
		this.value = parseFloat(this.value).toFixed(f(regL.scale));
	})
	inputr.value = regR.value;
	inputr.step = regR.scale;
	inputr.addEventListener('change',function(){
		this.value = parseFloat(this.value).toFixed(f(regR.scale));
	})
	slider.noUiSlider.updateOptions({
		start: [regL.value, regR.value],
		range: {
			'min': regL.min,
			'max': regL.max
		}
	})
	return;
}

function radioUpdate(r0ID,r1ID,state) {
	r0 = document.getElementById(r0ID);
	r1 = document.getElementById(r1ID);
	if (state==0) {
		r0.checked = true;
	} else {
		r1.checked = true;
	}
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function dataUpdate() {
/*
	var xhr = new XMLHttpRequest();
	xhr.open("GET","http://10.130.2.25/configs/0",true);
	xhr.onload = function (){
		alert(xhr.responseText);
	}
	xhr.send(null);
	*/
	document.getElementById("i-loading").classList.add("loading");
	oilPressureSetup = data[1];
	oilPressureAlarmLevel = data[2];
	oilPressurePreAlarmLevel = data[3];

	coolantTempSetup = data[4];
	coolantHightTempAlarmLevel = data[5];
	coolantHightTempPreAlarmLevel = data[6];
	coolantTempHeaterOffLevel = data[7];
	coolantTempHeaterOnLevel = data[8];
	coolantTempCoolerOffLevel = data[9];
	coolantTempCoolerOnLevel = data[10];

	fuelLevelSetup = data[11];
	fuelLevelLowAlarmLevel = data[12];
	fuelLevelLowAlarmDelay = data[13];
	fuelLevelLowPreAlarmLevel = data[14];
	fuelLevelLowPreAlarmDelay = data[15];
	fuelLevelHightPreAlarmLevel = data[16];
	fuelLevelHightPreAlarmDelay = data[17];
	fuelLevelHightAlarmLevel = data[18];
	fuelLevelHightAlarmDelay = data[19];
	fuelPumpOnLevel = data[20];
	fuelPumpOffLevel = data[21];

	diaSetup = data[22];
	diaDelay = data[23];
	dibSetup = data[24];
	dibDelay = data[25];
	dicSetup = data[26];
	dicDelay = data[27];
	didSetup = data[28];
	didDelay = data[29];

	doSetup  = data[30];
	doabType = data[31];
	docdType = data[32];
	doefType = data[33];

	timerMainsTransientDelay = data[34];
	timerStartDelay = data[35];
	timerCranking = data[36];
	timerCrankDelay = data[37];
	timerStartupIdleTime = data[38];
	timerNominalRPMDelay = data[39];
	timerSafetyOnDelay = data[40];
	timerWarming = data[41];
	timerTransferDelay = data[42];
	timerBreakerTripPulse = data[43];
	timerBreakerClosePulse = data[44];
	timerReturnDelay = data[45];
	timerCooling = data[46];
	timerCoolingIdle = data[47];
	timerSolenoidHold = data[48];
	timerFailStopDelay = data[49];
	timerGenTransientDelay = data[50];

	genSetup = data[51];
	genRatedActivePower = data[52];
	genRatedReactivePower = data[53];
	genRatedApparentPower = data[54];
	genRatedFrequency = data[55];
	genCurrentPrimary = data[56];
	genCurrentFullLoadRating = data[57];

	genAlarms = data[58];
	genUnderVoltageAlarmLevel = data[59];
	genUnderVoltagePreAlarmLevel = data[60];
	genOverVoltagePreAlarmLevel = data[61];
	genOverVoltageAlarmLevel = data[62];

	genUnderFrequencyAlrmLevel = data[63];
	genUnderFrequencyPreAlrmLevel = data[64];
	genOverFrequencyPreAlrmLevel = data[65];
	genOverFrequencyAlrmLevel = data[66];

	genOverCurrentThermalProtectionLevel = data[67];
	genOverCurrentCutoffLevel = data[68];
	genOverCurrentAlarmLevel = data[69];
	genOverCurrentAlarmDelay = data[70];
	genCurrentOverloadProtectionLevel = data[71];
	genCurrentOverloadProtectionDelay = data[72];
	genCurrentOverPhaseImbalanceLevel = data[73];
	genCurrentOverPhaseImbalanceDelay = data[74];

	mainsSetup = data[75];

	mainsAlarms = data[76];
	mainsUnderVoltageAlarmLevel = data[77];
	mainsOverVoltageAlarmLevel = data[78];
	mainsUnderFrequencyAlarmLevel = data[79];
	mainsOverFrequencyAlarmLevel = data[80];

	engineSetup = data[81];
	enginePreHeatOn = data[82];
	enginePreHeatDuration = data[83];
	enginePostHeatOn = data[84];
	enginePostHeatDuration = data[85];

	crankSetup = data[86];
	crankDisconnectgenFreqLevel = data[87];
	crankDisconnectOilPressureLevel = data[88];
	crankDisconnectChargeAlternatorLevel = data[89];

	batteryAlarms = data[90];
	batteryUnderVoltageLevel = data[91];
	batteryUnderVoltageDelay = data[92];
	batteryOverVoltageLevel = data[93];
	batteryOverVoltageDelay = data[94];
	batteryChargeShutdownLevel = data[95];
	batteryChargeShutdownDelay = data[96];
	batteryChargeWarningLevel = data[97];
	batteryChargeWarningDelay = data[98];

	maintenanceAlarms = data[99];
	maintenanceAlarmOilEngineRunTime = data[100];
	maintenanceAlarmAirEngineRunTime = data[101];
	maintenanceAlarmFuelEngineRunTime = data[102];


	// #1
	selectorUpdate('oilPressureSensorType',oilPressureSetup,0,1);
	checkboxUpdate('oilPressureEnbOpenCircuitAlarmEnb',oilPressureSetup,1);
	checkboxUpdate('oilPressureAlarmEnb',oilPressureSetup,2);
	s_sliderUpdate('s-slider-oilPressureAlarmLevel','sinput-oilPressureAlarmLevel',oilPressureAlarmLevel,bitVal(2,oilPressureSetup));
	checkboxUpdate('oilPressurePreAlarmEnb',oilPressureSetup,3);
	s_sliderUpdate('s-slider-oilPressurePreAlarmLevel','sinput-oilPressurePreAlarmLevel',oilPressurePreAlarmLevel,bitVal(3,oilPressureSetup));
	//#2
	selectorUpdate('coolantTempSensorType',coolantTempSetup,0,1);
	checkboxUpdate('coolantTempEnbOpenCircuitAlarm',coolantTempSetup,1);
	checkboxUpdate('coolantHightTempAlarmEnb',coolantTempSetup,2);
	s_sliderUpdate('s-slider-coolantHightTempAlarmLevel','sinput-coolantHightTempAlarmLevel',coolantHightTempAlarmLevel,bitVal(2,coolantTempSetup));
	checkboxUpdate('coolantHightTempPreAlarmEnb',coolantTempSetup,3);
	s_sliderUpdate('s-slider-coolantHightTempPreAlarmLevel','sinput-coolantHightTempPreAlarmLevel',coolantHightTempPreAlarmLevel,bitVal(3,coolantTempSetup));
	checkboxUpdate('coolantTempHeaterEnb',coolantTempSetup,4);
	d_sliderUpdate('d-slider-coolantTempHeaterLevel','dinput-coolantTempHeaterOffLevel','dinput-coolantTempHeaterOnLevel',coolantTempHeaterOnLevel,coolantTempHeaterOffLevel,bitVal(4,coolantTempSetup))
	checkboxUpdate('coolantTempCoolerEnb',coolantTempSetup,5);
	d_sliderUpdate('d-slider-coolantTempCoolerLevel','dinput-coolantTempCoolerOffLevel','dinput-coolantTempCoolerOnLevel',coolantTempCoolerOnLevel,coolantTempCoolerOffLevel,bitVal(5,coolantTempSetup))
	//#3
	selectorUpdate('fuelLevelSensorType',fuelLevelSetup,0,1);
	checkboxUpdate('fuelLevelLowAlarmEnb',fuelLevelSetup,1);
	selectorUpdate('fuelLevelLowAlarmAction',fuelLevelSetup,2,bitVal(1,fuelLevelSetup));
	s_sliderUpdate('s-slider-fuelLevelLowAlarmLevel','sinput-fuelLevelLowAlarmLevel',fuelLevelLowAlarmLevel,bitVal(1,fuelLevelSetup));
	s_sliderUpdate('s-slider-fuelLevelLowAlarmDelay','sinput-fuelLevelLowAlarmDelay',fuelLevelLowAlarmDelay,bitVal(1,fuelLevelSetup));
	checkboxUpdate('fuelLevelLowPreAlarmEnb',fuelLevelSetup,3);
	s_sliderUpdate('s-slider-fuelLevelLowPreAlarmLevel','sinput-fuelLevelLowPreAlarmLevel',fuelLevelLowPreAlarmLevel,bitVal(3,fuelLevelSetup));
	s_sliderUpdate('s-slider-fuelLevelLowPreAlarmDelay','sinput-fuelLevelLowPreAlarmDelay',fuelLevelLowPreAlarmDelay,bitVal(3,fuelLevelSetup));
	checkboxUpdate('fuelLevelHightAlarmEnb',fuelLevelSetup,5);
	selectorUpdate('fuelLevelHightAlarmAction',fuelLevelSetup,6,bitVal(5,fuelLevelSetup));
	s_sliderUpdate('s-slider-fuelLevelHightAlarmLevel','sinput-fuelLevelHightAlarmLevel',fuelLevelHightAlarmLevel,bitVal(5,fuelLevelSetup));
	s_sliderUpdate('s-slider-fuelLevelHightAlarmDelay','sinput-fuelLevelHightAlarmDelay',fuelLevelHightAlarmDelay,bitVal(5,fuelLevelSetup));
	checkboxUpdate('fuelLevelHightPreAlarmLevelEnb',fuelLevelSetup,4);
	s_sliderUpdate('s-slider-fuelLevelHightPreAlarmLevel','sinput-fuelLevelHightPreAlarmLevel',fuelLevelHightPreAlarmLevel,bitVal(4,fuelLevelSetup));
	s_sliderUpdate('s-slider-fuelLevelHightPreAlarmDelay','sinput-fuelLevelHightPreAlarmDelay',fuelLevelHightPreAlarmDelay,bitVal(4,fuelLevelSetup));
	checkboxUpdate('fuelPumpEnb',fuelLevelSetup,7);
	d_sliderUpdate('d-slider-fuelPumpOnOffLevel','dinput-fuelPumpOffLevel','dinput-fuelPumpOnLevel',fuelPumpOnLevel,fuelPumpOffLevel,bitVal(7,fuelLevelSetup))
	//#4
	selectorUpdate('diaFunction',diaSetup,0,1);
	selectorUpdate('diaPolarity',diaSetup,1,1);
	selectorUpdate('diaAction',diaSetup,2,1);
	selectorUpdate('diaArming',diaSetup,3,1);
	s_sliderUpdate('s-slider-diaDelay','sinput-diaDelay',diaDelay,1);
	//#5
	selectorUpdate('dibFunction',dibSetup,0,1);
	selectorUpdate('dibPolarity',dibSetup,1,1);
	selectorUpdate('dibAction',dibSetup,2,1);
	selectorUpdate('dibArming',dibSetup,3,1);
	s_sliderUpdate('s-slider-dibDelay','sinput-dibDelay',dibDelay,1);
	//#6
	selectorUpdate('dicFunction',dicSetup,0,1);
	selectorUpdate('dicPolarity',dicSetup,1,1);
	selectorUpdate('dicAction',dicSetup,2,1);
	selectorUpdate('dicArming',dicSetup,3,1);
	s_sliderUpdate('s-slider-dicDelay','sinput-dicDelay',dicDelay,1);
	//#7
	selectorUpdate('didFunction',didSetup,0,1);
	selectorUpdate('didPolarity',didSetup,1,1);
	selectorUpdate('didAction',didSetup,2,1);
	selectorUpdate('didArming',didSetup,3,1);
	s_sliderUpdate('s-slider-didDelay','sinput-didDelay',didDelay,1);
	//#8
	selectorUpdate('doaType',doabType,0,1);
	radioUpdate('DOA_NO','DOA_NC',bitVal(0,doSetup));
	selectorUpdate('dobType',doabType,1,1);
	radioUpdate('DOB_NO','DOB_NC',bitVal(1,doSetup));
	selectorUpdate('docType',docdType,0,1);
	radioUpdate('DOC_NO','DOC_NC',bitVal(2,doSetup));
	selectorUpdate('dodType',docdType,1,1);
	radioUpdate('DOD_NO','DOD_NC',bitVal(3,doSetup));
	selectorUpdate('doeType',doefType,0,1);
	radioUpdate('DOE_NO','DOE_NC',bitVal(4,doSetup));
	selectorUpdate('dofType',doefType,1,1);
	radioUpdate('DOF_NO','DOF_NC',bitVal(5,doSetup));
	//#9 Timers
	s_sliderUpdate('s-slider-timerMainsTransientDelay','sinput-timerMainsTransientDelay',timerMainsTransientDelay,1);
	s_sliderUpdate('s-slider-timerStartDelay','sinput-timerStartDelay',timerStartDelay,1);
	s_sliderUpdate('s-slider-timerCranking','sinput-timerCranking',timerCranking,1);
	s_sliderUpdate('s-slider-timerCrankDelay','sinput-timerCrankDelay',timerCrankDelay,1);
	s_sliderUpdate('s-slider-timerStartupIdleTime','sinput-timerStartupIdleTime',timerStartupIdleTime,1);
	s_sliderUpdate('s-slider-timerNominalRPMDelay','sinput-timerNominalRPMDelay',timerNominalRPMDelay,1);
	s_sliderUpdate('s-slider-timerSafetyOnDelay','sinput-timerSafetyOnDelay',timerSafetyOnDelay,1);
	s_sliderUpdate('s-slider-timerWarming','sinput-timerWarming',timerWarming,1);
	s_sliderUpdate('s-slider-timerTransferDelay','sinput-timerTransferDelay',timerTransferDelay,1);
	s_sliderUpdate('s-slider-timerBreakerTripPulse','sinput-timerBreakerTripPulse',timerBreakerTripPulse,1);
	s_sliderUpdate('s-slider-timerBreakerClosePulse','sinput-timerBreakerClosePulse',timerBreakerClosePulse,1);
	s_sliderUpdate('s-slider-timerReturnDelay','sinput-timerReturnDelay',timerReturnDelay,1);
	s_sliderUpdate('s-slider-timerCooling','sinput-timerCooling',timerCooling,1);
	s_sliderUpdate('s-slider-timerCoolingIdle','sinput-timerCoolingIdle',timerCoolingIdle,1);
	s_sliderUpdate('s-slider-timerSolenoidHold','sinput-timerSolenoidHold',timerSolenoidHold,1);
	s_sliderUpdate('s-slider-timerFailStopDelay','sinput-timerFailStopDelay',timerFailStopDelay,1);
	s_sliderUpdate('s-slider-timerGenTransientDelay','sinput-timerGenTransientDelay',timerGenTransientDelay,1);
	//#10
	checkboxUpdate('genPowerGeneratorControlEnb',genSetup,0);
	selectorUpdate('genPoles',genSetup,1,bitVal(0,genSetup));
	selectorUpdate('genAcSys',genSetup,2,bitVal(0,genSetup));
	s_sliderUpdate('s-slider-genRatedActivePower','sinput-genRatedActivePower',genRatedActivePower,1);
	s_sliderUpdate('s-slider-genRatedReactivePower','sinput-genRatedReactivePower',genRatedReactivePower,1);
	s_sliderUpdate('s-slider-genRatedApparentPower','sinput-genRatedApparentPower',genRatedApparentPower,1);
	s_sliderUpdate('s-slider-genRatedFrequency','sinput-genRatedFrequency',genRatedFrequency,1);
	s_sliderUpdate('s-slider-genCurrentPrimary','sinput-genCurrentPrimary',genCurrentPrimary,1);
	s_sliderUpdate('s-slider-genCurrentFullLoadRating','sinput-genCurrentFullLoadRating',genCurrentFullLoadRating,1);
	selectorUpdate('genLocationCurrentTransformer',genSetup,3,1);
	//#11
	checkboxUpdate('genUnderVoltageAlarmEnb',genAlarms,0);
	s_sliderUpdate('s-slider-genUnderVoltageAlarmLevel','sinput-genUnderVoltageAlarmLevel',genUnderVoltageAlarmLevel,bitVal(0,genAlarms));
	checkboxUpdate('genUnderVoltagePreAlarmEnb',genAlarms,1);
	s_sliderUpdate('s-slider-genUnderVoltagePreAlarmLevel','sinput-genUnderVoltagePreAlarmLevel',genUnderVoltagePreAlarmLevel,bitVal(1,genAlarms));
	s_sliderUpdate('s-slider-genOverVoltageAlarmLevel','sinput-genOverVoltageAlarmLevel',genOverVoltageAlarmLevel,1);
	checkboxUpdate('genOverVoltagePreAlarmEnb',genAlarms,2);
	s_sliderUpdate('s-slider-genOverVoltagePreAlarmLevel','sinput-genOverVoltagePreAlarmLevel',genOverVoltagePreAlarmLevel,bitVal(2,genAlarms));
	//#12
	checkboxUpdate('genUnderFrequencyAlrmEnb',genAlarms,3);
	s_sliderUpdate('s-slider-genUnderFrequencyAlrmLevel','sinput-genUnderFrequencyAlrmLevel',genUnderFrequencyAlrmLevel,bitVal(3,genAlarms));
	checkboxUpdate('genUnderFrequencyPreAlrmEnb',genAlarms,4);
	s_sliderUpdate('s-slider-genUnderFrequencyPreAlrmLevel','sinput-genUnderFrequencyPreAlrmLevel',genUnderFrequencyPreAlrmLevel,bitVal(4,genAlarms));
	checkboxUpdate('genOverFrequencyPreAlrmEnb',genAlarms,5);
	s_sliderUpdate('s-slider-genOverFrequencyPreAlrmLevel','sinput-genOverFrequencyPreAlrmLevel',genOverFrequencyPreAlrmLevel,bitVal(5,genAlarms));
	checkboxUpdate('genOverFrequencyAlarmEnb',genAlarms,6);
	s_sliderUpdate('s-slider-genOverFrequencyAlrmLevel','sinput-genOverFrequencyAlrmLevel',genOverFrequencyAlrmLevel,bitVal(6,genAlarms));
	//#13
	s_sliderUpdate('s-slider-genOverCurrentThermalProtectionLevel','sinput-genOverCurrentThermalProtectionLevel',genOverCurrentThermalProtectionLevel,1);
	s_sliderUpdate('s-slider-genOverCurrentCutoffLevel','sinput-genOverCurrentCutoffLevel',genOverCurrentCutoffLevel,1);
	selectorUpdate('genCurrentOverAlarmAction',genAlarms,9,1);
	s_sliderUpdate('s-slider-genOverCurrentAlarmLevel','sinput-genOverCurrentAlarmLevel',genOverCurrentAlarmLevel,1);
	s_sliderUpdate('s-slider-genOverCurrentAlarmDelay','sinput-genOverCurrentAlarmDelay',genOverCurrentAlarmDelay,1);
	checkboxUpdate('genCurrentOverloadProtectionEnb',genAlarms,7);
	selectorUpdate('genCurrentOverloadProtectionAction',genAlarms,10,bitVal(7,genAlarms));
	s_sliderUpdate('s-slider-genCurrentOverloadProtectionLevel','sinput-genCurrentOverloadProtectionLevel',genCurrentOverloadProtectionLevel,bitVal(7,genAlarms));
	s_sliderUpdate('s-slider-genCurrentOverloadProtectionDelay','sinput-genCurrentOverloadProtectionDelay',genCurrentOverloadProtectionDelay,bitVal(7,genAlarms));
	checkboxUpdate('genCurrentOverPhaseImbalanceEnb',genAlarms,8);
	selectorUpdate('genCurrentOverPhaseImbalanceAction',genAlarms,11,bitVal(8,genAlarms));
	s_sliderUpdate('s-slider-genCurrentOverPhaseImbalanceLevel','sinput-genCurrentOverPhaseImbalanceLevel',genCurrentOverPhaseImbalanceLevel,bitVal(8,genAlarms));
	s_sliderUpdate('s-slider-genCurrentOverPhaseImbalanceDelay','sinput-genCurrentOverPhaseImbalanceDelay',genCurrentOverPhaseImbalanceDelay,bitVal(8,genAlarms));
	//#14
	checkboxUpdate('mainsControl',mainsSetup,0);
	checkboxUpdate('mainsPowerOffImmediately',mainsSetup,1);
	selectorUpdate('mainAcSys',mainsSetup,2,1);
	//#15
	checkboxUpdate('mainsUnderVoltageAlarm',mainsAlarms,0);
	s_sliderUpdate('s-slider-mainsUnderVoltageAlarmLevel','sinput-mainsUnderVoltageAlarmLevel',mainsUnderVoltageAlarmLevel,bitVal(0,mainsAlarms));
	checkboxUpdate('mainsOverVoltageAlarm',mainsAlarms,1);
	s_sliderUpdate('s-slider-mainsOverVoltageAlarmLevel','sinput-mainsOverVoltageAlarmLevel',mainsOverVoltageAlarmLevel,bitVal(1,mainsAlarms));
	checkboxUpdate('mainsUnderFrequencyAlarm',mainsAlarms,2);
	s_sliderUpdate('s-slider-mainsUnderFrequencyAlarmLevel','sinput-mainsUnderFrequencyAlarmLevel',mainsUnderFrequencyAlarmLevel,bitVal(2,mainsAlarms));
	checkboxUpdate('mainsOverFrequencyAlarm',mainsAlarms,3);
	s_sliderUpdate('s-slider-mainsOverFrequencyAlarmLevel','sinput-mainsOverFrequencyAlarmLevel',mainsOverFrequencyAlarmLevel,bitVal(3,mainsAlarms));
	//#16
	document.getElementById('engineStartAttempts').value = bitVal(0,engineSetup);
	checkboxUpdate('enginePreHeatEnb',engineSetup,1);
	s_sliderUpdate('s-slider-enginePreHeatOn','sinput-enginePreHeatOn',enginePreHeatOn,bitVal(1,engineSetup));
	s_sliderUpdate('s-slider-enginePreHeatDuration','sinput-enginePreHeatDuration',enginePreHeatDuration,bitVal(1,engineSetup));
	checkboxUpdate('enginePostHeatEnb',engineSetup,2);
	s_sliderUpdate('s-slider-enginePostHeatOn','sinput-enginePostHeatOn',enginePostHeatOn,bitVal(2,engineSetup));
	s_sliderUpdate('s-slider-enginePostHeatDuration','sinput-enginePostHeatDuration',enginePostHeatDuration,bitVal(2,engineSetup));
	//#17
	checkboxUpdate('crankDisconnectOilPressure',crankSetup,0);
	checkboxUpdate('crankOilPressureCheckOnStart',crankSetup,1);
	s_sliderUpdate('s-slider-crankDisconnectgenFreqLevel','sinput-crankDisconnectgenFreqLevel',crankDisconnectgenFreqLevel,1);
	checkboxUpdate('crankDisconnectOilPressureEnb',crankSetup,2);
	s_sliderUpdate('s-slider-crankDisconnectOilPressureLevel','sinput-crankDisconnectOilPressureLevel',crankDisconnectOilPressureLevel,bitVal(2,crankSetup));
	checkboxUpdate('crankDisconnectChargeAlternatorEnb',crankSetup,3);
	s_sliderUpdate('s-slider-crankDisconnectChargeAlternatorLevel','sinput-crankDisconnectChargeAlternatorLevel',crankDisconnectChargeAlternatorLevel,bitVal(3,crankSetup));
	//#18
	checkboxUpdate('batteryUnderVoltageEnb',batteryAlarms,0);
	s_sliderUpdate('s-slider-batteryUnderVoltageLevel','sinput-batteryUnderVoltageLevel',batteryUnderVoltageLevel,bitVal(0,batteryAlarms));
	s_sliderUpdate('s-slider-batteryUnderVoltageDelay','sinput-batteryUnderVoltageDelay',batteryUnderVoltageDelay,bitVal(0,batteryAlarms));
	checkboxUpdate('batteryOverVoltageEnb',batteryAlarms,1);
	s_sliderUpdate('s-slider-batteryOverVoltageLevel','sinput-batteryOverVoltageLevel',batteryOverVoltageLevel,bitVal(1,batteryAlarms));
	s_sliderUpdate('s-slider-batteryOverVoltageDelay','sinput-batteryOverVoltageDelay',batteryOverVoltageDelay,bitVal(1,batteryAlarms));
	checkboxUpdate('batteryChargeShutdownEnb',batteryAlarms,2);
	s_sliderUpdate('s-slider-batteryChargeShutdownLevel','sinput-batteryChargeShutdownLevel',batteryChargeShutdownLevel,bitVal(2,batteryAlarms));
	s_sliderUpdate('s-slider-batteryChargeShutdownDelay','sinput-batteryChargeShutdownDelay',batteryChargeShutdownDelay,bitVal(2,batteryAlarms));
	checkboxUpdate('batteryChargeWarningEnb',batteryAlarms,3);
	s_sliderUpdate('s-slider-batteryChargeWarningLevel','sinput-batteryChargeWarningLevel',batteryChargeWarningLevel,bitVal(3,batteryAlarms));
	s_sliderUpdate('s-slider-batteryChargeWarningDelay','sinput-batteryChargeWarningDelay',batteryChargeWarningDelay,bitVal(3,batteryAlarms));
	//#19
	checkboxUpdate('maintenanceAlarmOilEnb',maintenanceAlarms,0);
	selectorUpdate('maintenanceAlarmOilAction',maintenanceAlarms,1,bitVal(0,maintenanceAlarms));
	s_sliderUpdate('s-slider-maintenanceAlarmOilEngineRunTime','sinput-maintenanceAlarmOilEngineRunTime',maintenanceAlarmOilEngineRunTime,bitVal(0,maintenanceAlarms));
	checkboxUpdate('maintenanceAlarmAirEnb',maintenanceAlarms,2);
	selectorUpdate('maintenanceAlarmAirAction',maintenanceAlarms,3,bitVal(2,maintenanceAlarms));
	s_sliderUpdate('s-slider-maintenanceAlarmAirEngineRunTime','sinput-maintenanceAlarmAirEngineRunTime',maintenanceAlarmAirEngineRunTime,bitVal(2,maintenanceAlarms));
	checkboxUpdate('maintenanceAlarmFuelEnb',maintenanceAlarms,4);
	selectorUpdate('maintenanceAlarmFuelAction',maintenanceAlarms,5,bitVal(4,maintenanceAlarms));
	s_sliderUpdate('s-slider-maintenanceAlarmFuelEngineRunTime','sinput-maintenanceAlarmFuelEngineRunTime',maintenanceAlarmFuelEngineRunTime,bitVal(4,maintenanceAlarms));

	updateAllTimeSliders();
	document.getElementById("i-loading").classList.remove("loading");
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
	return;
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
		s_sliders[i].noUiSlider.on('update', (function () {
			var j=i;
			return function(){
				s_sinputs[j].value = parseFloat(s_sliders[j].noUiSlider.get()).toFixed(f(s_sinputs[j].step));
			}
		})() );
		s_sinputs[i].addEventListener('change', (function () {
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
				d_sinputs_left[j].value = parseFloat(d_sliders[j].noUiSlider.get()[0]).toFixed(f(d_sinputs_left[j].step));
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
				d_sinputs_right[j].value = parseFloat(d_sliders[j].noUiSlider.get()[1]).toFixed(f(d_sinputs_right[j].step));
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
		if(parseInt(slider1.noUiSlider.get()) >= val){
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
		if(val<=min){
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
		if(parseInt(slider1.noUiSlider.get()) >= val){
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
		if(val<=min){
			slider2.noUiSlider.set(min);
		}
		if(val>=max){
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
		if(val<=min){
			slider3.noUiSlider.set(min);
		}
		if(val>=max){
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
		if(val<=min){
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
	document.getElementById('oilPressureAlarmEnb').addEventListener('click', function () {
    toggleSslider.call(this, 's-slider-oilPressureAlarmLevel','sinput-oilPressureAlarmLevel');
	});
	document.getElementById('oilPressurePreAlarmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-oilPressurePreAlarmLevel','sinput-oilPressurePreAlarmLevel');
	});
	//#2
	document.getElementById('coolantHightTempAlarmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-coolantHightTempAlarmLevel','sinput-coolantHightTempAlarmLevel');
	});
	document.getElementById('coolantHightTempPreAlarmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-coolantHightTempPreAlarmLevel','sinput-coolantHightTempPreAlarmLevel');
	});
	document.getElementById('coolantTempHeaterEnb').addEventListener('change', function () {
		toggleDslider.call(this, 'd-slider-coolantTempHeaterLevel','dinput-coolantTempHeaterOffLevel','dinput-coolantTempHeaterOnLevel');
	});
	document.getElementById('coolantTempCoolerEnb').addEventListener('change', function () {
		toggleDslider.call(this, 'd-slider-coolantTempCoolerLevel','dinput-coolantTempCoolerOffLevel','dinput-coolantTempCoolerOnLevel');
	});
	//#3
	document.getElementById('fuelLevelLowAlarmEnb').addEventListener('change', function () {
		toggleSelector.call(this, 'fuelLevelLowAlarmAction');
		toggleSslider.call(this, 's-slider-fuelLevelLowAlarmLevel','sinput-fuelLevelLowAlarmLevel');
		toggleSslider.call(this, 's-slider-fuelLevelLowAlarmDelay','sinput-fuelLevelLowAlarmDelay');
	});
	document.getElementById('fuelLevelLowPreAlarmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-fuelLevelLowPreAlarmLevel','sinput-fuelLevelLowPreAlarmLevel');
		toggleSslider.call(this, 's-slider-fuelLevelLowPreAlarmDelay','sinput-fuelLevelLowPreAlarmDelay');
	});
	document.getElementById('fuelLevelHightAlarmEnb').addEventListener('change', function () {
		toggleSelector.call(this, 'fuelLevelHightAlarmAction');
		toggleSslider.call(this, 's-slider-fuelLevelHightAlarmLevel','sinput-fuelLevelHightAlarmLevel');
		toggleSslider.call(this, 's-slider-fuelLevelHightAlarmDelay','sinput-fuelLevelHightAlarmDelay');
	});
	document.getElementById('fuelLevelHightPreAlarmLevelEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-fuelLevelHightPreAlarmLevel','sinput-fuelLevelHightPreAlarmLevel');
		toggleSslider.call(this, 's-slider-fuelLevelHightPreAlarmDelay','sinput-fuelLevelHightPreAlarmDelay');
	});
	document.getElementById('fuelPumpEnb').addEventListener('change', function () {
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
	document.getElementById('genPowerGeneratorControlEnb').addEventListener('change', function () {
		toggleSelector.call(this, 'genPoles');
		toggleSelector.call(this, 'genAcSys');
	});
	//#11
	document.getElementById('genUnderVoltageAlarmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-genUnderVoltageAlarmLevel','sinput-genUnderVoltageAlarmLevel');
	});
	document.getElementById('genUnderVoltagePreAlarmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-genUnderVoltagePreAlarmLevel','sinput-genUnderVoltagePreAlarmLevel');
	});
	document.getElementById('genOverVoltagePreAlarmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-genOverVoltagePreAlarmLevel','sinput-genOverVoltagePreAlarmLevel');
	});
	enableSslider('s-slider-genOverVoltageAlarmLevel','sinput-genOverVoltageAlarmLevel');
	//#12
	document.getElementById('genUnderFrequencyAlrmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-genUnderFrequencyAlrmLevel','sinput-genUnderFrequencyAlrmLevel');
	});
	document.getElementById('genUnderFrequencyPreAlrmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-genUnderFrequencyPreAlrmLevel','sinput-genUnderFrequencyPreAlrmLevel');
	});
	document.getElementById('genOverFrequencyPreAlrmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-genOverFrequencyPreAlrmLevel','sinput-genOverFrequencyPreAlrmLevel');
	});
	document.getElementById('genOverFrequencyAlarmEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-genOverFrequencyAlrmLevel','sinput-genOverFrequencyAlrmLevel');
	});
	//#13
	enableSslider('s-slider-genOverCurrentThermalProtectionLevel','sinput-genOverCurrentThermalProtectionLevel');
	enableSslider('s-slider-genOverCurrentCutoffLevel','sinput-genOverCurrentCutoffLevel');
	enableSslider('s-slider-genOverCurrentAlarmLevel','sinput-genOverCurrentAlarmLevel');
	enableSslider('s-slider-genOverCurrentAlarmDelay','sinput-genOverCurrentAlarmDelay');
	document.getElementById('genCurrentOverloadProtectionEnb').addEventListener('change', function () {
		toggleSelector.call(this, 'genCurrentOverloadProtectionAction');
		toggleSslider.call(this, 's-slider-genCurrentOverloadProtectionLevel','sinput-genCurrentOverloadProtectionLevel');
		toggleSslider.call(this, 's-slider-genCurrentOverloadProtectionDelay','sinput-genCurrentOverloadProtectionDelay');
	});
	document.getElementById('genCurrentOverPhaseImbalanceEnb').addEventListener('change', function () {
		toggleSelector.call(this, 'genCurrentOverPhaseImbalanceAction');
		toggleSslider.call(this, 's-slider-genCurrentOverPhaseImbalanceLevel','sinput-genCurrentOverPhaseImbalanceLevel');
		toggleSslider.call(this, 's-slider-genCurrentOverPhaseImbalanceDelay','sinput-genCurrentOverPhaseImbalanceDelay');
	});
	//#14
	//#15
	document.getElementById('mainsUnderVoltageAlarm').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-mainsUnderVoltageAlarmLevel','sinput-mainsUnderVoltageAlarmLevel');
	});
	document.getElementById('mainsOverVoltageAlarm').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-mainsOverVoltageAlarmLevel','sinput-mainsOverVoltageAlarmLevel');
	});
	document.getElementById('mainsUnderFrequencyAlarm').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-mainsUnderFrequencyAlarmLevel','sinput-mainsUnderFrequencyAlarmLevel');
	});
	document.getElementById('mainsOverFrequencyAlarm').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-mainsOverFrequencyAlarmLevel','sinput-mainsOverFrequencyAlarmLevel');
	});
	//#16
	document.getElementById('enginePreHeatEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-enginePreHeatOn','sinput-enginePreHeatOn');
		toggleSslider.call(this, 's-slider-enginePreHeatDuration','sinput-enginePreHeatDuration');
	});
	document.getElementById('enginePostHeatEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-enginePostHeatOn','sinput-enginePostHeatOn');
		toggleSslider.call(this, 's-slider-enginePostHeatDuration','sinput-enginePostHeatDuration');
	});
	//#17
	document.getElementById('crankDisconnectOilPressureEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-crankDisconnectOilPressureLevel','sinput-crankDisconnectOilPressureLevel');
	});
	document.getElementById('crankDisconnectChargeAlternatorEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-crankDisconnectChargeAlternatorLevel','sinput-crankDisconnectChargeAlternatorLevel');
	});
	//#18
	document.getElementById('batteryUnderVoltageEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-batteryUnderVoltageLevel','sinput-batteryUnderVoltageLevel');
		toggleSslider.call(this, 's-slider-batteryUnderVoltageDelay','sinput-batteryUnderVoltageDelay');
	});
	document.getElementById('batteryOverVoltageEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-batteryOverVoltageLevel','sinput-batteryOverVoltageLevel');
		toggleSslider.call(this, 's-slider-batteryOverVoltageDelay','sinput-batteryOverVoltageDelay');
	});
	document.getElementById('batteryChargeShutdownEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-batteryChargeShutdownLevel','sinput-batteryChargeShutdownLevel');
		toggleSslider.call(this, 's-slider-batteryChargeShutdownDelay','sinput-batteryChargeShutdownDelay');
	});
	document.getElementById('batteryChargeWarningEnb').addEventListener('change', function () {
		toggleSslider.call(this, 's-slider-batteryChargeWarningLevel','sinput-batteryChargeWarningLevel');
		toggleSslider.call(this, 's-slider-batteryChargeWarningDelay','sinput-batteryChargeWarningDelay');
	});
	//#19
	document.getElementById('maintenanceAlarmOilEnb').addEventListener('change', function () {
		toggleSelector.call(this, 'maintenanceAlarmOilAction');
		toggleSslider.call(this, 's-slider-maintenanceAlarmOilEngineRunTime','sinput-maintenanceAlarmOilEngineRunTime');
	});
	document.getElementById('maintenanceAlarmAirEnb').addEventListener('change', function () {
		toggleSelector.call(this, 'maintenanceAlarmAirAction');
		toggleSslider.call(this, 's-slider-maintenanceAlarmAirEngineRunTime','sinput-maintenanceAlarmAirEngineRunTime');
	});
	document.getElementById('maintenanceAlarmFuelEnb').addEventListener('change', function () {
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
	loadContent("oilPressPage");
	sliderInit();
	dataUpdate();
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
