var data = new Array();;

var oilPressureSetup;
var oilPressureAlarmLevel;
var oilPressurePreAlarmLevel;

var coolantTempSetup;
var coolantHightTempAlarmLevel;
var coolantHightTempPreAlarmLevel;
var coolantTempHeaterOffLevel;
var coolantTempHeaterOnLevel;
var coolantTempCoolerOffLevel;
var coolantTempCoolerOnLevel;

var fuelLevelSetup;
var fuelLevelLowAlarmLevel;
var fuelLevelLowAlarmDelay;
var fuelLevelLowPreAlarmLevel;
var fuelLevelLowPreAlarmDelay;
var fuelLevelHightPreAlarmLevel;
var fuelLevelHightPreAlarmDelay;
var fuelLevelHightAlarmLevel;
var fuelLevelHightAlarmDelay;
var fuelPumpOnLevel;
var fuelPumpOffLevel;

var diaSetup;
var diaDelay;
var dibSetup;
var dibDelay;
var dicSetup;
var dicDelay;
var didSetup;
var didDelay;

var doSetup;
var doabType;
var docdType;
var doefType;

var timerMainsTransientDelay;
var timerStartDelay;
var timerCranking;
var timerCrankDelay;
var timerStartupIdleTime;
var timerNominalRPMDelay;
var timerSafetyOnDelay;
var timerWarming;
var timerTransferDelay;
var timerBreakerTripPulse;
var timerBreakerClosePulse;
var timerReturnDelay;
var timerCooling;
var timerCoolingIdle;
var timerSolenoidHold;
var timerFailStopDelay;
var timerGenTransientDelay;

var genSetup;
var genRatedActivePower;
var genRatedReactivePower;
var genRatedApparentPower;
var genRatedFrequency;
var genCurrentPrimary;
var genCurrentFullLoadRating;

var genAlarms;
var genUnderVoltageAlarmLevel;
var genUnderVoltagePreAlarmLevel;
var genOverVoltagePreAlarmLevel;
var genOverVoltageAlarmLevel;

var genUnderFrequencyAlrmLevel;
var genUnderFrequencyPreAlrmLevel;
var genOverFrequencyPreAlrmLevel;
var genOverFrequencyAlrmLevel;

var genOverCurrentThermalProtectionLevel;
var genOverCurrentCutoffLevel;
var genOverCurrentAlarmLevel;
var genOverCurrentAlarmDelay;
var genCurrentOverloadProtectionLevel;
var genCurrentOverloadProtectionDelay;
var genCurrentOverPhaseImbalanceLevel;
var genCurrentOverPhaseImbalanceDelay;

var mainsSetup;

var mainsAlarms;
var mainsUnderVoltageAlarmLevel;
var mainsOverVoltageAlarmLevel;
var mainsUnderFrequencyAlarmLevel;
var mainsOverFrequencyAlarmLevel;

var engineSetup;
var enginePreHeatOn;
var enginePreHeatDuration;
var enginePostHeatOn;
var enginePostHeatDuration;

var crankSetup;
var crankDisconnectgenFreqLevel;
var crankDisconnectOilPressureLevel;
var crankDisconnectChargeAlternatorLevel;

var batteryAlarms;
var batteryUnderVoltageLevel;
var batteryUnderVoltageDelay;
var batteryOverVoltageLevel;
var batteryOverVoltageDelay;
var batteryChargeShutdownLevel;
var batteryChargeShutdownDelay;
var batteryChargeWarningLevel;
var batteryChargeWarningDelay;

var maintenanceAlarms;
var maintenanceAlarmOilEngineRunTime;
var maintenanceAlarmAirEngineRunTime;
var maintenanceAlarmFuelEngineRunTime;
//******************************************************************************
//******************************************************************************
//******************************************************************************
function setDataToBuffer(data){
	data.length = 0;
	for(var i=0;i<102;i++){
		data.push();
	}
	data[1]   = oilPressureSetup;
	data[2]   = oilPressureAlarmLevel;
	data[3]   = oilPressurePreAlarmLevel;

	data[4]   = coolantTempSetup;
	data[5]   = coolantHightTempAlarmLevel;
	data[6]   = coolantHightTempPreAlarmLevel;
	data[7]   = coolantTempHeaterOffLevel;
	data[8]   = coolantTempHeaterOnLevel;
	data[9]   = coolantTempCoolerOffLevel;
	data[10]  = coolantTempCoolerOnLevel;

	data[11]  = fuelLevelSetup;
	data[12]  = fuelLevelLowAlarmLevel;
	data[13]  = fuelLevelLowAlarmDelay;
	data[14]  = fuelLevelLowPreAlarmLevel;
	data[15]  = fuelLevelLowPreAlarmDelay;
	data[16]  = fuelLevelHightPreAlarmLevel;
	data[17]  = fuelLevelHightPreAlarmDelay;
	data[18]  = fuelLevelHightAlarmLevel;
	data[19]  = fuelLevelHightAlarmDelay;
	data[20]  = fuelPumpOnLevel;
	data[21]  = fuelPumpOffLevel;

	data[22]  = diaSetup;
	data[23]  = diaDelay;
	data[24]  = dibSetup;
	data[25]  = dibDelay;
	data[26]  = dicSetup;
	data[27]  = dicDelay;
	data[28]  = didSetup;
	data[29]  = didDelay;

	data[30]  = doSetup;
	data[31]  = doabType;
	data[32]  = docdType;
	data[33]  = doefType;

	data[34]  = timerMainsTransientDelay;
	data[35]  = timerStartDelay;
	data[36]  = timerCranking;
	data[37]  = timerCrankDelay;
	data[38]  = timerStartupIdleTime;
	data[39]  = timerNominalRPMDelay;
	data[40]  = timerSafetyOnDelay;
	data[41]  = timerWarming;
	data[42]  = timerTransferDelay;
	data[43]  = timerBreakerTripPulse;
	data[44]  = timerBreakerClosePulse;
	data[45]  = timerReturnDelay;
	data[46]  = timerCooling;
	data[47]  = timerCoolingIdle;
	data[48]  = timerSolenoidHold;
	data[49]  = timerFailStopDelay;
	data[50]  = timerGenTransientDelay;

	data[51]  = genSetup;
	data[52]  = genRatedActivePower;
	data[53]  = genRatedReactivePower;
	data[54]  = genRatedApparentPower;
	data[55]  = genRatedFrequency;
	data[56]  = genCurrentPrimary;
	data[57]  = genCurrentFullLoadRating;

	data[58]  = genAlarms;
	data[59]  = genUnderVoltageAlarmLevel;
	data[60]  = genUnderVoltagePreAlarmLevel;
	data[61]  = genOverVoltagePreAlarmLevel;
	data[62]  = genOverVoltageAlarmLevel;

	data[63]  = genUnderFrequencyAlrmLevel;
	data[64]  = genUnderFrequencyPreAlrmLevel;
	data[65]  = genOverFrequencyPreAlrmLevel;
	data[66]  = genOverFrequencyAlrmLevel;

	data[67]  = genOverCurrentThermalProtectionLevel;
	data[68]  = genOverCurrentCutoffLevel;
	data[69]  = genOverCurrentAlarmLevel;
	data[70]  = genOverCurrentAlarmDelay;
	data[71]  = genCurrentOverloadProtectionLevel;
	data[72]  = genCurrentOverloadProtectionDelay;
	data[73]  = genCurrentOverPhaseImbalanceLevel;
	data[74]  = genCurrentOverPhaseImbalanceDelay;

	data[75]  = mainsSetup;

	data[76]  = mainsAlarms;
	data[77]  = mainsUnderVoltageAlarmLevel;
	data[78]  = mainsOverVoltageAlarmLevel;
	data[79]  = mainsUnderFrequencyAlarmLevel;
	data[80]  = mainsOverFrequencyAlarmLevel;

	data[81]  = engineSetup;
	data[82]  = enginePreHeatOn;
	data[83]  = enginePreHeatDuration;
	data[84]  = enginePostHeatOn;
	data[85]  = enginePostHeatDuration;

	data[86]  = crankSetup;
	data[87]  = crankDisconnectgenFreqLevel;
	data[88]  = crankDisconnectOilPressureLevel;
	data[89]  = crankDisconnectChargeAlternatorLevel;

	data[90]  = batteryAlarms;
	data[91]  = batteryUnderVoltageLevel;
	data[92]  = batteryUnderVoltageDelay;
	data[93]  = batteryOverVoltageLevel;
	data[94]  = batteryOverVoltageDelay;
	data[95]  = batteryChargeShutdownLevel;
	data[96]  = batteryChargeShutdownDelay;
	data[97]  = batteryChargeWarningLevel;
	data[98]  = batteryChargeWarningDelay;

	data[99]  = maintenanceAlarms;
	data[100] = maintenanceAlarmOilEngineRunTime;
	data[101] = maintenanceAlarmAirEngineRunTime;
	data[102] = maintenanceAlarmFuelEngineRunTime;
}

function getDataFromBuffer(data){
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
	return;
}
function bitVal(n,reg) {
	return (reg.value&reg.bit[n].mask)>>reg.bit[n].shift;
}

function bitWrite(n,reg,val){
	reg.value = (reg.value&(!reg.bit[n].mask))|(val<<reg.bit[n].shift);
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************

function dataUpdate() {
	const reqs = (requests = [], store = [], failback) => {
  	// Check if there are still requests to make
  	if (requests instanceof Array && requests.length > 0) {
    	const xhr = new XMLHttpRequest();
      // Success handling
      xhr.addEventListener('load', (data) => {
      	const status = data.currentTarget.status;
        const response = data.currentTarget.response;
        if (status === 200) {;
        	// add to store
          store.push(JSON.parse(response));
          // remove first request from array of requests
          requests.shift();
          // move on to next request
          return reqs(requests, store, failback);
        } else {
        	if (failback) {
          	failback(`Request Error: ${status}`);
          }
        }
      });
      // Failure handling
      xhr.addEventListener('error', (error) => {
      	if (failback) {
          document.getElementById("i-loading").classList.remove("loading");
        	failback('Something went wrong.');
          alert("Нет связи с сервером");
        }
      });
      xhr.open(requests[0].method, requests[0].url);
      xhr.timeout = 2000;
      xhr.send();
  	} else {
			dataApply(store);
			document.getElementById("i-loading").classList.remove("loading");
      return store;
  	}
	};

	document.getElementById("i-loading").classList.add("loading");
	try{
		restSeq = []
		for ( i=0; i<103; i++ ){
			str = '/configs/' + i;
			restSeq.push({method: 'get', url: str})
		}
		const results = reqs(restSeq, [],	(error) => console.log(error)	);
	} catch {
		alert("Нет связи с сервером")
	}
	return;
}

function dataApply(data){

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

	function checkboxUpdate(ID,reg,n) {
		document.getElementById(ID).checked = bitVal(n,reg);
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
		scl = Math.pow(10,reg.scale)
		input.value = reg.value * scl;
		input.step = scl;
		input.addEventListener('change', function () {
			this.value = parseFloat(this.value).toFixed(f(scl));
		});
		slider.noUiSlider.updateOptions({
			step: 	scl,
			start: [reg.value * scl],
			range: {
				'min': (reg.min * scl),
				'max': (reg.max * scl)
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
		scl = Math.pow(10,regL.scale)
		inputl.value = regL.value * scl;
		inputl.step = scl;
		inputl.addEventListener('change',function(){
			this.value = parseFloat(this.value).toFixed(f(scl));
		})
		inputr.value = regR.value * Math.pow(10,regR.scale);
		inputr.step = regR.scale;
		inputr.addEventListener('change',function(){
			this.value = parseFloat(this.value).toFixed(f(regR.scale));
		})
		slider.noUiSlider.updateOptions({
			start: [regL.value * Math.pow(10,regL.scale), regR.value * Math.pow(10,regR.scale)],
			range: {
				'min': (regL.min * scl),
				'max': (regL.max * scl)
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

	getDataFromBuffer(data);
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
	slider = document.getElementById("s-slider-cosFi");
	input = document.getElementById("sinput-cosFi");
	input.disabled = false;
	slider.removeAttribute('disabled');
	input.step = 0.01;
	input.addEventListener('change', function () {
		this.value = parseFloat(this.value).toFixed(2);
	});
	slider.noUiSlider.updateOptions({
		step: 	0.01,
		start: [0],
		range: {
			'min': 0,
			'max': 1
		}
	})
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
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function dataGrab(){

	function checkboxGrab(id,reg,n){
		input = 0;
		if(document.getElementById(id).checked > 0){
			input = 1;
		}
		bitWrite(n,reg,input);
		return;
	}

	function selectorGrab(id,reg,n){
		bitWrite(n,reg,document.getElementById(id).value);
		return;
	}

	function s_sliderGrab(inputID,reg){
		val = parseFloat(document.getElementById(inputID).value) / Math.pow(10,reg.scale)
		reg.value = parseFloat(val.toFixed(0));
		return;
	}

	function d_sliderGrab(inputlID,inputrID,regL,regR){
		regL.value = parseFloat(document.getElementById(inputlID).value) / Math.pow(10,regL.scale);
		regR.value = parseFloat(document.getElementById(inputrID).value) / Math.pow(10,regR.scale);
		return;
	}

	function radioGrab(r0ID,r1ID,reg,n) {
		if (document.getElementById(r1ID).checked = true){
			bitWrite(n,reg,1);
		} else {
			bitWrite(n,reg,0);
		}
		return;
	}

	// #1
	checkboxGrab('oilPressureSensorType',oilPressureSetup,0);
	checkboxGrab('oilPressureEnbOpenCircuitAlarmEnb',oilPressureSetup,1);
	checkboxGrab('oilPressureAlarmEnb',oilPressureSetup,2);
	s_sliderGrab('sinput-oilPressureAlarmLevel',oilPressureAlarmLevel);
	checkboxGrab('oilPressurePreAlarmEnb',oilPressureSetup,3);
	s_sliderGrab('sinput-oilPressurePreAlarmLevel',oilPressurePreAlarmLevel);
	//#2
	selectorGrab('coolantTempSensorType',coolantTempSetup,0);
	checkboxGrab('coolantTempEnbOpenCircuitAlarm',coolantTempSetup,1);
	checkboxGrab('coolantHightTempAlarmEnb',coolantTempSetup,2);
	s_sliderGrab('sinput-coolantHightTempAlarmLevel',coolantHightTempAlarmLevel);
	checkboxGrab('coolantHightTempPreAlarmEnb',coolantTempSetup,3);
	s_sliderGrab('sinput-coolantHightTempPreAlarmLevel',coolantHightTempPreAlarmLevel);
	checkboxGrab('coolantTempHeaterEnb',coolantTempSetup,4);
	d_sliderGrab('dinput-coolantTempHeaterOffLevel','dinput-coolantTempHeaterOnLevel',coolantTempHeaterOnLevel,coolantTempHeaterOffLevel);
	checkboxGrab('coolantTempCoolerEnb',coolantTempSetup,5);
	d_sliderGrab('dinput-coolantTempCoolerOffLevel','dinput-coolantTempCoolerOnLevel',coolantTempCoolerOnLevel,coolantTempCoolerOffLevel);
	//#3
	selectorGrab('fuelLevelSensorType',fuelLevelSetup,0);
	checkboxGrab('fuelLevelLowAlarmEnb',fuelLevelSetup,1);
	selectorGrab('fuelLevelLowAlarmAction',fuelLevelSetup,2);
	s_sliderGrab('sinput-fuelLevelLowAlarmLevel',fuelLevelLowAlarmLevel);
	s_sliderGrab('sinput-fuelLevelLowAlarmDelay',fuelLevelLowAlarmDelay);
	checkboxGrab('fuelLevelLowPreAlarmEnb',fuelLevelSetup,3);
	s_sliderGrab('sinput-fuelLevelLowPreAlarmLevel',fuelLevelLowPreAlarmLevel);
	s_sliderGrab('sinput-fuelLevelLowPreAlarmDelay',fuelLevelLowPreAlarmDelay);
	checkboxGrab('fuelLevelHightAlarmEnb',fuelLevelSetup,5);
	selectorGrab('fuelLevelHightAlarmAction',fuelLevelSetup,6);
	s_sliderGrab('sinput-fuelLevelHightAlarmLevel',fuelLevelHightAlarmLevel);
	s_sliderGrab('sinput-fuelLevelHightAlarmDelay',fuelLevelHightAlarmDelay);
	checkboxGrab('fuelLevelHightPreAlarmLevelEnb',fuelLevelSetup,4);
	s_sliderGrab('sinput-fuelLevelHightPreAlarmLevel',fuelLevelHightPreAlarmLevel);
	s_sliderGrab('sinput-fuelLevelHightPreAlarmDelay',fuelLevelHightPreAlarmDelay);
	checkboxGrab('fuelPumpEnb',fuelLevelSetup,7);
	d_sliderGrab('dinput-fuelPumpOffLevel','dinput-fuelPumpOnLevel',fuelPumpOnLevel,fuelPumpOffLevel);
	//#4
	selectorGrab('diaFunction',diaSetup,0);
	selectorGrab('diaPolarity',diaSetup,1);
	selectorGrab('diaAction',diaSetup,2);
	selectorGrab('diaArming',diaSetup,3);
	s_sliderGrab('sinput-diaDelay',diaDelay);
	//#5
	selectorGrab('dibFunction',dibSetup,0);
	selectorGrab('dibPolarity',dibSetup,1);
	selectorGrab('dibAction',dibSetup,2);
	selectorGrab('dibArming',dibSetup,3);
	s_sliderGrab('sinput-dibDelay',dibDelay);
	//#6
	selectorGrab('dicFunction',dicSetup,0);
	selectorGrab('dicPolarity',dicSetup,1);
	selectorGrab('dicAction',dicSetup,2);
	selectorGrab('dicArming',dicSetup,3);
	s_sliderGrab('sinput-dicDelay',dicDelay);
	//#7
	selectorGrab('didFunction',didSetup,0);
	selectorGrab('didPolarity',didSetup,1);
	selectorGrab('didAction',didSetup,2);
	selectorGrab('didArming',didSetup,3);
	s_sliderGrab('sinput-didDelay',didDelay);
	//#8
	selectorGrab('doaType',doabType,0);
	radioGrab('DOA_NO','DOA_NC',doSetup,0);
	selectorGrab('dobType',doabType,1);
	radioGrab('DOB_NO','DOB_NC',doSetup,1);
	selectorGrab('docType',docdType,0);
	radioGrab('DOC_NO','DOC_NC',doSetup,2);
	selectorGrab('dodType',docdType,1);
	radioGrab('DOD_NO','DOD_NC',doSetup,3);
	selectorGrab('doeType',doefType,0);
	radioGrab('DOE_NO','DOE_NC',doSetup,4);
	selectorGrab('dofType',doefType,1);
	radioGrab('DOF_NO','DOF_NC',doSetup,5);
	//#9 Timers
	s_sliderGrab('sinput-timerMainsTransientDelay',timerMainsTransientDelay);
	s_sliderGrab('sinput-timerStartDelay',timerStartDelay);
	s_sliderGrab('sinput-timerCranking',timerCranking);
	s_sliderGrab('sinput-timerCrankDelay',timerCrankDelay);
	s_sliderGrab('sinput-timerStartupIdleTime',timerStartupIdleTime);
	s_sliderGrab('sinput-timerNominalRPMDelay',timerNominalRPMDelay);
	s_sliderGrab('sinput-timerSafetyOnDelay',timerSafetyOnDelay);
	s_sliderGrab('sinput-timerWarming',timerWarming);
	s_sliderGrab('sinput-timerTransferDelay',timerTransferDelay);
	s_sliderGrab('sinput-timerBreakerTripPulse',timerBreakerTripPulse);
	s_sliderGrab('sinput-timerBreakerClosePulse',timerBreakerClosePulse);
	s_sliderGrab('sinput-timerReturnDelay',timerReturnDelay);
	s_sliderGrab('sinput-timerCooling',timerCooling);
	s_sliderGrab('sinput-timerCoolingIdle',timerCoolingIdle);
	s_sliderGrab('sinput-timerSolenoidHold',timerSolenoidHold);
	s_sliderGrab('sinput-timerFailStopDelay',timerFailStopDelay);
	s_sliderGrab('sinput-timerGenTransientDelay',timerGenTransientDelay);
	//#10
	checkboxGrab('genPowerGeneratorControlEnb',genSetup,0);
	selectorGrab('genPoles',genSetup,1);
	selectorGrab('genAcSys',genSetup,2);
	s_sliderGrab('sinput-genRatedActivePower',genRatedActivePower);
	s_sliderGrab('sinput-genRatedReactivePower',genRatedReactivePower);
	s_sliderGrab('sinput-genRatedApparentPower',genRatedApparentPower);
	s_sliderGrab('sinput-genRatedFrequency',genRatedFrequency);
	s_sliderGrab('sinput-genCurrentPrimary',genCurrentPrimary);
	s_sliderGrab('sinput-genCurrentFullLoadRating',genCurrentFullLoadRating);
	selectorGrab('genLocationCurrentTransformer',genSetup,3);
	//#11
	checkboxGrab('genUnderVoltageAlarmEnb',genAlarms,0);
	s_sliderGrab('sinput-genUnderVoltageAlarmLevel',genUnderVoltageAlarmLevel);
	checkboxGrab('genUnderVoltagePreAlarmEnb',genAlarms,1);
	s_sliderGrab('sinput-genUnderVoltagePreAlarmLevel',genUnderVoltagePreAlarmLevel);
	s_sliderGrab('sinput-genOverVoltageAlarmLevel',genOverVoltageAlarmLevel);
	checkboxGrab('genOverVoltagePreAlarmEnb',genAlarms,2);
	s_sliderGrab('sinput-genOverVoltagePreAlarmLevel',genOverVoltagePreAlarmLevel);
	//#12
	checkboxGrab('genUnderFrequencyAlrmEnb',genAlarms,3);
	s_sliderGrab('sinput-genUnderFrequencyAlrmLevel',genUnderFrequencyAlrmLevel);
	checkboxGrab('genUnderFrequencyPreAlrmEnb',genAlarms,4);
	s_sliderGrab('sinput-genUnderFrequencyPreAlrmLevel',genUnderFrequencyPreAlrmLevel);
	checkboxGrab('genOverFrequencyPreAlrmEnb',genAlarms,5);
	s_sliderGrab('sinput-genOverFrequencyPreAlrmLevel',genOverFrequencyPreAlrmLevel);
	checkboxGrab('genOverFrequencyAlarmEnb',genAlarms,6);
	s_sliderGrab('sinput-genOverFrequencyAlrmLevel',genOverFrequencyAlrmLevel);
	//#13
	s_sliderGrab('sinput-genOverCurrentThermalProtectionLevel',genOverCurrentThermalProtectionLevel);
	s_sliderGrab('sinput-genOverCurrentCutoffLevel',genOverCurrentCutoffLevel);
	selectorGrab('genCurrentOverAlarmAction',genAlarms,9);
	s_sliderGrab('sinput-genOverCurrentAlarmLevel',genOverCurrentAlarmLevel);
	s_sliderGrab('sinput-genOverCurrentAlarmDelay',genOverCurrentAlarmDelay);
	checkboxGrab('genCurrentOverloadProtectionEnb',genAlarms,7);
	selectorGrab('genCurrentOverloadProtectionAction',genAlarms,10);
	s_sliderGrab('sinput-genCurrentOverloadProtectionLevel',genCurrentOverloadProtectionLevel);
	s_sliderGrab('sinput-genCurrentOverloadProtectionDelay',genCurrentOverloadProtectionDelay);
	checkboxGrab('genCurrentOverPhaseImbalanceEnb',genAlarms,8);
	selectorGrab('genCurrentOverPhaseImbalanceAction',genAlarms,11);
	s_sliderGrab('sinput-genCurrentOverPhaseImbalanceLevel',genCurrentOverPhaseImbalanceLevel);
	s_sliderGrab('sinput-genCurrentOverPhaseImbalanceDelay',genCurrentOverPhaseImbalanceDelay);
	//#14
	checkboxGrab('mainsControl',mainsSetup,0);
	checkboxGrab('mainsPowerOffImmediately',mainsSetup,1);
	selectorGrab('mainAcSys',mainsSetup,2);
	//#15
	checkboxGrab('mainsUnderVoltageAlarm',mainsAlarms,0);
	s_sliderGrab('sinput-mainsUnderVoltageAlarmLevel',mainsUnderVoltageAlarmLevel);
	checkboxGrab('mainsOverVoltageAlarm',mainsAlarms,1);
	s_sliderGrab('sinput-mainsOverVoltageAlarmLevel',mainsOverVoltageAlarmLevel);
	checkboxGrab('mainsUnderFrequencyAlarm',mainsAlarms,2);
	s_sliderGrab('sinput-mainsUnderFrequencyAlarmLevel',mainsUnderFrequencyAlarmLevel);
	checkboxGrab('mainsOverFrequencyAlarm',mainsAlarms,3);
	s_sliderGrab('sinput-mainsOverFrequencyAlarmLevel',mainsOverFrequencyAlarmLevel);
	//#16
	bitWrite(0,engineSetup,document.getElementById('engineStartAttempts').value);
	checkboxGrab('enginePreHeatEnb',engineSetup,1);
	s_sliderGrab('sinput-enginePreHeatOn',enginePreHeatOn);
	s_sliderGrab('sinput-enginePreHeatDuration',enginePreHeatDuration);
	checkboxGrab('enginePostHeatEnb',engineSetup,2);
	s_sliderGrab('sinput-enginePostHeatOn',enginePostHeatOn);
	s_sliderGrab('sinput-enginePostHeatDuration',enginePostHeatDuration);
	//#17
	checkboxGrab('crankDisconnectOilPressure',crankSetup,0);
	checkboxGrab('crankOilPressureCheckOnStart',crankSetup,1);
	s_sliderGrab('sinput-crankDisconnectgenFreqLevel',crankDisconnectgenFreqLevel);
	checkboxGrab('crankDisconnectOilPressureEnb',crankSetup,2);
	s_sliderGrab('sinput-crankDisconnectOilPressureLevel',crankDisconnectOilPressureLevel);
	checkboxGrab('crankDisconnectChargeAlternatorEnb',crankSetup,3);
	s_sliderGrab('sinput-crankDisconnectChargeAlternatorLevel',crankDisconnectChargeAlternatorLevel);
	//#18
	checkboxGrab('batteryUnderVoltageEnb',batteryAlarms,0);
	s_sliderGrab('sinput-batteryUnderVoltageLevel',batteryUnderVoltageLevel);
	s_sliderGrab('sinput-batteryUnderVoltageDelay',batteryUnderVoltageDelay);
	checkboxGrab('batteryOverVoltageEnb',batteryAlarms,1);
	s_sliderGrab('sinput-batteryOverVoltageLevel',batteryOverVoltageLevel);
	s_sliderGrab('sinput-batteryOverVoltageDelay',batteryOverVoltageDelay);
	checkboxGrab('batteryChargeShutdownEnb',batteryAlarms,2);
	s_sliderGrab('sinput-batteryChargeShutdownLevel',batteryChargeShutdownLevel);
	s_sliderGrab('sinput-batteryChargeShutdownDelay',batteryChargeShutdownDelay);
	checkboxGrab('batteryChargeWarningEnb',batteryAlarms,3);
	s_sliderGrab('sinput-batteryChargeWarningLevel',batteryChargeWarningLevel);
	s_sliderGrab('sinput-batteryChargeWarningDelay',batteryChargeWarningDelay);
	//#19
	checkboxGrab('maintenanceAlarmOilEnb',maintenanceAlarms,0);
	selectorGrab('maintenanceAlarmOilAction',maintenanceAlarms,1);
	s_sliderGrab('sinput-maintenanceAlarmOilEngineRunTime',maintenanceAlarmOilEngineRunTime);
	checkboxGrab('maintenanceAlarmAirEnb',maintenanceAlarms,2);
	selectorGrab('maintenanceAlarmAirAction',maintenanceAlarms,3);
	s_sliderGrab('sinput-maintenanceAlarmAirEngineRunTime',maintenanceAlarmAirEngineRunTime);
	checkboxGrab('maintenanceAlarmFuelEnb',maintenanceAlarms,4);
	selectorGrab('maintenanceAlarmFuelAction',maintenanceAlarms,5);
	s_sliderGrab('sinput-maintenanceAlarmFuelEngineRunTime',maintenanceAlarmFuelEngineRunTime);

	setDataToBuffer(data);

  //*******

const reqs = (requests = [], failback) => {
	if (requests instanceof Array && requests.length > 0) {
  	var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			const status = xhr.status;
			if (xhr.readyState == 4 && status == "200") {
				requests.shift();
				return reqs(requests, content, failback);
	  	} else if (failback) {
				failback(`Request Error: ${status}`);
			}
		};
		xhr.addEventListener('error', (error) => {
			if (failback) {
				failback('Something went wrong.');
			}
		});
  	xhr.open(requests[0].method, requests[0].url, true);
  	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  	xhr.send(requests[0].content);
	}
};

restSeq = []
for ( i=1; i<103; i++ ){
	str = '/configs/' + i;
	restSeq.push({
		method: 'PUT',
		url: str,
		content: JSON.stringify(data[i])
	})
}
const results = reqs(restSeq, (error) => console.log(error));

	/*
  var json = JSON.stringify(data[1]);
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", '/configs/1', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.send(json);
  xhr.onload = function () {
    var users = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "201") {
      console.log('Put Ok');
    } else {
      console.log('Put Fail');
    }
  }
*/
  //******

/*
	const reqs = (requests = [], content=[], failback) => {
  	// Check if there are still requests to make
  	if (requests instanceof Array && requests.length > 0) {
    	const xhr = new XMLHttpRequest();
      // Success handling
      xhr.addEventListener('load', (data) => {
      	const status = data.currentTarget.status;
        if (status === 200) {;
          requests.shift();														// remove first request from array of requests
          return reqs(requests, content, failback);		// move on to next request
        } else {
        	if (failback) {
          	failback(`Request Error: ${status}`);
          }
        }
      });
      // Failure handling
      xhr.addEventListener('error', (error) => {
      	if (failback) {
        	failback('Something went wrong.');
        }
      });
      xhr.open(requests[0].method, requests[0].url, true);
			xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhr.send(requests[0].content);
  	} else {
			document.getElementById("i-loading").classList.remove("loading");
      return store;
  	}
	};

	document.getElementById("i-loading").classList.add("loading");

	try{
		restSeq = []
		for ( i=0; i<103; i++ ){
			str = '/configs/' + i;
			restSeq.push({method: 'PUT', url: str, content: JSON.stringify(data[i])})
		}
		const results = reqs(restSeq, [],	(error) => console.log(error)	);
	} catch {
		alert("Нет связи с сервером")
	}
	*/
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
