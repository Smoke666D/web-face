const remote = require('electron').remote;
//******************************************************************************
function bitVal(n,reg) {
	return (reg.value&reg.bit[n].mask)>>reg.bit[n].shift;
}

function bitWrite(n,reg,val){
	reg.value = (reg.value & (~reg.bit[n].mask)) | (val<<reg.bit[n].shift);
	return;
}
//******************************************************************************
function StrLine(name) {
	var self  = this;
	this.name = name;

	this.getData = function() {
		for (var i=0; i<dataReg.length; i++ ) {
			if (dataReg[i].name == name)
			{
				this.regNum = i;
			}
		}
		return;
	}
	this.init    = function() {
		this.object = document.getElementById(name);
		this.getData();
		return;
	}
	this.update  = function() {
		var text = "";
		reg = dataReg[this.regNum];
		for (var i=0; i<reg.len; i++) {
			text += reg.value[i];
		}
		this.object.value = text;
		return;
	}
	this.grab    = function() {
		var text = this.object.value;
		for (var i=0; i<dataReg[this.regNum].len; i++) {
			dataReg[this.regNum].value[i] = text.charAt(i);
		}
		return;
	}

	this.init();
	this.update();
}
//******************************************************************************
function Switch(name) {
	this.name = name;

	this.getData = function() {
		for(var i=0; i<dataReg.length; i++ ){
			if (dataReg[i].bitMapSize > 0) {
				for (var j=0; j<dataReg[i].bitMapSize; j++) {
					if (dataReg[i].bit[j].name == this.name) {
						this.regNum = i;
						this.bitNum = j
					}
				}
			}
		}
		return;
	}

	this.getVal = function() {
		return bitVal(this.bitNum, dataReg[this.regNum]);
	}

	this.setVal = function(input) {
		bitWrite(this.bitNum, dataReg[this.regNum],input)
		return;
	}

	this.init = function() {
		this.object = document.getElementById(name);
		this.getData();
		return;
	}

	this.update = function() {
		this.object.checked = this.getVal();
		return;
	}

	this.grab = function() {
		if(this.object.checked > 0){
			this.setVal(1);
		} else {
			this.setVal(0);
		}
		return;
	}

	this.init();
	return;
}
//******************************************************************************
function Select(name) {
	var self = this;
	this.name = name;

	this.getData = function() {
		for(var i=0; i<dataReg.length; i++ ){
			if (dataReg[i].bitMapSize > 0) {
				for (var j=0; j<dataReg[i].bitMapSize; j++) {
					if (dataReg[i].bit[j].name == this.name) {
						this.regNum = i;
						this.bitNum = j
					}
				}
			}
		}
		return;
	}

	this.getVal = function() {
		return this.object.value;
	}

	this.init = function() {
		this.getData();
		this.object = document.getElementById(this.name);
		swName = this.name.replace("Action", "") + "Enb";
		this.sw = new Switch(swName);
		if (this.sw.object){
			this.enable = this.sw.getVal();
			this.sw.object.addEventListener('click', function() {
				if (this.checked) {
					self.object.disabled = false;
				} else {
					self.object.disabled = true;
				}
			});
		} else {
			this.enable = 1;
		}
		if (name.endsWith("SensorType")) {
			this.object.addEventListener('change', function() {
				if (self.object.value > 2) {
					self.button.disabled = false;
				} else {
					self.button.disabled = true;
				}
			})
		}
		return;
	}

	this.update = function() {
		if (this.object != null)
		{
			this.object.value = bitVal(this.bitNum,dataReg[this.regNum]);
			if (this.enable == 1){
				this.object.disabled = false;
			} else {
				this.object.disabled = true;
			}
			if(name.endsWith("SensorType")){
				this.button = document.getElementById(this.name.replace("Type","")+"Setup");
				if (this.object.value > 2) {
					this.button.disabled = false;
				} else {
					this.button.disabled = true;
				}
			}
		}
		return;
	}

	this.grab = function() {
		if (this.object != null) {
			bitWrite(this.bitNum,dataReg[this.regNum],this.object.value);
		}
		return;
	}

	this.init();
	if(this.object){
		this.update();
	}
	return;
}
//******************************************************************************
function Radio(name) {
	this.name = name;
	this.getData = function() {
		for(var i=0; i<dataReg.length; i++ ){
			if (dataReg[i].bitMapSize > 0) {
				for (var j=0; j<dataReg[i].bitMapSize; j++) {
					if (dataReg[i].bit[j].name == (this.name)) {
						this.regNum = i;
						this.bitNum = j
					}
				}
			}
		}
		return;
	}
	this.init = function() {
		this.getData();
		this.objectNO = document.getElementById(this.name.replace("NOC","") + "NO");
		this.objectNC = document.getElementById(this.name.replace("NOC","") + "NC");
		this.sw = null;
		this.enable = 1;
		return;
	}
	this.update = function() {
		if((this.objectNO)&&(this.objectNC)){
			if(bitVal(this.bitNum,dataReg[this.regNum]) == 0) {
				this.objectNO.checked = true;
			} else {
				this.objectNC.checked = true;
			}
		}
		return;
	}
	this.grab = function() {
		if((this.objectNO)&&(this.objectNC)){
			if(this.objectNC.checked == true) {
				bitWrite(this.bitNum,dataReg[this.regNum],1);
			} else {
				bitWrite(this.bitNum,dataReg[this.regNum],0);
			}
		}
		return;
	}
	this.init();
	if((this.objectNO)&&(this.objectNC)){
		this.update();
	}
	return;
}
//******************************************************************************
function Slider(name,preInit) {
	var self = this;
	this.name      = name;
	/*--------------------------------------------------------------------------*/
	this.getData   = function() {
		for (var i=0; i<dataReg.length; i++ ){
			if (dataReg[i].name == name)
			{
				this.regNum = i;
			}
		}
		return;
	}
	this.setUnits  = function(units) {
		dataReg[this.regNum].units = units;
		return;
	}
	this.setScale  = function(scale) {
		dataReg[this.regNum].scale = scale;
		return;
	}
	this.init      = function() {
		this.getData();
		this.slider = document.getElementById("s-slider-" + this.name);
		this.input  = document.getElementById("sinput-" + this.name);
		this.label  = document.getElementById("label-" + this.name);
		var swName = this.name;
		if(this.name.endsWith("Level")) {
			swName = swName.substring(0, swName.length - 5);
		}
		if(this.name.endsWith("Time")) {
			swName = swName.substring(0, swName.length - 4);
		}
		if(this.name.endsWith("Delay")) {
			swName = swName.substring(0, swName.length - 5);
		}
		swName = swName.replace("On","");
		swName = swName.replace("Off","");
		this.sw = new Switch(swName + "Enb")
		if (this.sw.object){
			self.enable = this.sw.getVal();
			this.sw.object.addEventListener('click', function() {
				if(this.checked) {
					self.enable = 1
					self.input.disabled = false;
					self.slider.removeAttribute('disabled');
				} else {
					self.enable = 0
					self.input.disabled = true;
					self.slider.setAttribute('disabled', false);
				}
			});
		} else {
			this.enable = 1;
		}
		if ((this.name.endsWith("Delay")) || (this.name.startsWith("timer"))) {
			this.slider.noUiSlider.on('change',function(){
				switch(self.label.textContent) {
					case 'сек':
						if (self.input.value >= 3602){
							this.scale = 0.1;
							self.input.step  = 0.1;
							self.label.textContent = 'ч';
							self.slider.noUiSlider.updateOptions({
								step: 	0.1,
								start: [self.input.value/3600],
								range: {
									'min': 0,
									'max': dataReg[self.regNum].max/3600
								}
							})
						} else	if (self.input.value >= 61){
							this.scale = 0.1;
							self.input.step  = 0.1;
							self.label.textContent = 'мин';
							self.slider.noUiSlider.updateOptions({
								step: 	0.1,
								start: [self.input.value/60],
								range: {
									'min': 0,
									'max': dataReg[self.regNum].max/60
								}
							})
						}
						break;
					case 'мин':
						if (self.input.value >= 62){
							this.scale = 0.1;
							self.input.step  = 0.1;
							self.label.textContent = 'ч';
							self.slider.noUiSlider.updateOptions({
								step: 	0.1,
								start: [self.input.value/60],
								range: {
									'min': 0,
									'max': dataReg[self.regNum].max/3600
								}
							})
						} else if (self.input.value <= 1) {
							self.calcScale();
							self.input.step  = self.scale;
							self.label.textContent = 'сек';
							self.slider.noUiSlider.updateOptions({
								step: 	this.scale,
								start: [self.input.value*60],
								range: {
									'min': 0,
									'max': dataReg[self.regNum].max
								}
							})
						}
						break;
					case 'ч':
						if (self.input.value <= 1){
							this.scale = 0.1;
							self.input.step  = 0.1;
							self.label.textContent = 'мин';
							self.slider.noUiSlider.updateOptions({
								step: 	0.1,
								start: [self.input.value*60],
								range: {
									'min': 0,
									'max': dataReg[self.regNum].max/60
								}
							})
						}
						break;
					default:
						break;
				}
			});
		}
		return;
	}
	this.calcScale = function() {
		this.scl = Math.pow(10,dataReg[this.regNum].scale);
		return;
	}
	this.update    = function() {
		reg = dataReg[this.regNum];
		this.label.textContent = reg.units;

		if (this.enable == 1){
			this.input.disabled = false;
			this.slider.removeAttribute('disabled');
		} else {
			this.input.disabled = true;
			this.slider.setAttribute('disabled', false);
		}
		this.calcScale();
		this.input.value = reg.value * this.scl;
		this.input.step  = this.scl;
		this.input.addEventListener('change', function() {
			this.value = parseFloat(this.value).toFixed(calcFracLength(this.scl));
		});
		this.slider.noUiSlider.updateOptions({
			step: 	this.scl,
			start: [reg.value * this.scl],
			range: {
				'min': (reg.min * this.scl),
				'max': (reg.max * this.scl)
			}
		})
		return;
	}
	this.grab      = function() {
		this.calcScale();
		val = parseFloat(this.input.value) / Math.pow(10,dataReg[this.regNum].scale)
		dataReg[this.regNum].value = parseFloat(val.toFixed(0));
		return;
	}
	/*--------------------------------------------------------------------------*/
	this.init();
	if ((this.slider)&&(this.input)) {
		this.update();
	}
	/*--------------------------------------------------------------------------*/
	return;
}
//******************************************************************************
function cosFiUpdate(){
	slider = document.getElementById("s-slider-cosFi");
	input = document.getElementById("sinput-cosFi");
	input.disabled = false;
	slider.removeAttribute('disabled');
	input.step = 0.01;
	input.addEventListener('change', function() {
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
	return;
}
//******************************************************************************
function updateVersions() {
	var counter = 0;
	var major = 0;
	var minor = 0;
	for(var i=0;i<dataReg.length;i++) {
		if ( dataReg[i].name == "versionController" ) {
			major = Math.trunc(dataReg[i].value/1000);
			minor = dataReg[i].value -  major*1000;
			document.getElementById("versionController").textContent = major + '.' + minor;
			counter++;
		}
		if ( dataReg[i].name == "versionFirmware" ) {
			major = Math.trunc(dataReg[i].value/1000);
			minor = dataReg[i].value -  major*1000;
			document.getElementById("versionFirmware").textContent = major + '.' + minor;
			counter++;
		}
		if ( dataReg[i].name == "serialNumber" ) {
			document.getElementById("SerialNumber").textContent = "";
			for(var j=0;j<dataReg[i].len;j++) {
				document.getElementById("SerialNumber").textContent += (((dataReg[i].value[j]) >> 8) & 0xFF) + ':' + ((dataReg[i].value[j]) & 0xFF);
				if (j < (dataReg[i].len - 1)) {
					document.getElementById("SerialNumber").textContent += ':';
				}
			}
			counter++;
		}
		if (counter == 3) {
			break;
		}
	}
	return;
}
//******************************************************************************
var stringLineArray = [];
var slidersArray = [];
var switcherArray = [];
var selectorArray = [];
var radioArray = [];

function declareStrings() {
	for ( var i=0; i<dataReg.length; i++ ) {
		str = dataReg[i].name;
		if ( str.endsWith("Message") ) {
			stringLineArray.push(new StrLine(dataReg[i].name));
		}
	}
	return;
}

function declareSliders() {
	for ( var i=0; i<dataReg.length; i++ ) {
		str = dataReg[i].name;
		if (str.endsWith("Level") || str.endsWith("Delay") || str.startsWith("timer") || str.endsWith("Time")) {
			slidersArray.push(new Slider(dataReg[i].name,1));
		}
	}
	return;
}

function declareSwitches() {
	var l = 0;
	for(var i=0; i<dataReg.length; i++) {
		if (dataReg[i].bitMapSize > 0) {
			for(var j=0; j<dataReg[i].bitMapSize; j++) {
				if (dataReg[i].bit[j].name.endsWith("Enb") ) {
					switcherArray.push(new Switch(dataReg[i].bit[j].name));
					switcherArray[l].update();
					l++;
				}
			}
		}
	}
	return;
}

function declareSelects() {
	for(var i=0; i<dataReg.length; i++) {
		if (dataReg[i].bitMapSize > 0) {
			for(var j=0; j<dataReg[i].bitMapSize; j++) {
				if((dataReg[i].bit[j].max > 1) ||
					 (dataReg[i].bit[j].name.endsWith("Action")) ||
					 (dataReg[i].bit[j].name.endsWith("Type")) ||
					 (dataReg[i].bit[j].name.endsWith("Function")) ||
					 (dataReg[i].bit[j].name.endsWith("Polarity")) ||
					 (dataReg[i].bit[j].name.endsWith("Arming")) ) {
					selectorArray.push(new Select(dataReg[i].bit[j].name));
				}
			}
		}
	}
	return;
}

function declareRadio() {
	for(var i=0; i<dataReg.length; i++) {
		if (dataReg[i].bitMapSize > 0) {
			for(var j=0; j<dataReg[i].bitMapSize; j++) {
				if(dataReg[i].bit[j].name.endsWith("NOC")){
					radioArray.push(new Radio(dataReg[i].bit[j].name));
				}
			}
		}
	}
	return;
}

function declareInterface() {
	declareSliders();
	declareStrings();
	declareSwitches();
	declareSelects();
	declareRadio();
	return;
}

function updateInterface() {
	for(var i=0; i<stringLineArray.length; i++) {
		stringLineArray[i].update();
	}
	for(var i=0; i<slidersArray.length; i++) {
		slidersArray[i].update();
	}
	for(var i=0; i<switcherArray.length; i++) {
		switcherArray[i].update();
	}
	for(var i=0; i<selectorArray.length; i++) {
		selectorArray[i].update();
	}
	for(var i=0; i<radioArray.length; i++) {
		radioArray[i].update();
	}
	cosFiUpdate();
	updateVersions();
	return;
}

function grabInterface() {
	for(var i=0; i<stringLineArray.length; i++) {
		stringLineArray[i].grab();
	}
	for(var i=0; i<slidersArray.length; i++) {
		slidersArray[i].grab();
	}
	for(var i=0; i<switcherArray.length; i++) {
		switcherArray[i].grab();
	}
	for(var i=0; i<selectorArray.length; i++) {
		selectorArray[i].grab();
	}
	for(var i=0; i<radioArray.length; i++) {
		radioArray[i].grab();
	}
	for(var i=0;i<dataReg.length;i++){
		if (dataReg[i].name == "engineSetup")
		{
		  bitWrite(0,dataReg[i],document.getElementById('engineStartAttempts').value);
		}
	}
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function ascii_to_hexa(str) {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++)
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
}

function ethDataUpdate( callback ) {
	document.getElementById("i-loading").classList.add("loading");
	try{
		const reqs = function(requests, store, failback) {
			if (requests instanceof Array && requests.length > 0) {
				const xhr = new XMLHttpRequest();
				xhr.addEventListener('load', function(data) {
					const status = data.currentTarget.status;
					const response = data.currentTarget.response;
					if (status === 200) {
						store.push(JSON.parse(response));
						requests.shift();
						return reqs(requests, store, failback);
					}
				});
				xhr.addEventListener('error', function(error) {
					if (failback) {
						document.getElementById("i-loading").classList.remove("loading");
						failback('Something went wrong.');
						let alert = new Alert("alert-danger",triIco,"Нет связи с сервером");
					}
				});
				xhr.ontimeout = function() {
					xhr.abort();
					let alert = new Alert("alert-danger",triIco,"Нет связи с сервером");
					document.getElementById("i-loading").classList.remove("loading");
					callback();
				}
				xhr.open(requests[0].method, requests[0].url);
				xhr.timeout = 2000;
				xhr.send();
			} else {
				copyDataReg(store[0]);
				updateInterface();
				loadCharts(store[1]);
				setSuccessConnection();
				let alert = new Alert("alert-success",triIco,"Данные успешно обновленны");
				document.getElementById("i-loading").classList.remove("loading");
				return store;
			}
		};
		restSeq = []
		ipAdr  = document.getElementById("input-ipaddress").value;
		extUrl = "";
		if (ipAdr.length > 0) {
			extUrl = "http://" + ipAdr;
		}
		restSeq.push({method: 'get', url: (extUrl+'/configs/')});
		restSeq.push({method: 'get', url: (extUrl+'/charts/')});
		const results = reqs(restSeq, [],	function(error) { console.log(error)	});
	} catch(e) {
		let alert = new Alert("alert-danger",triIco,"Нет связи с сервером");
		return 0;
	}
	return 0;
}
//******************************************************************************
function copyDataReg(data) {
	for (var i=0; i<data.length; i++ ) {
		for (var j=0; j<dataReg.length; j++ ) {
			if( (data[i].adr == dataReg[j].adr) && (data[i].page == dataReg[j].page)) {
				if (dataReg[j].type == 'S') {
					dataReg[j].value = [];
					for (var k=0; k<dataReg[j].len; k++) {
						dataReg[j].value.push( decodeURI(data[i].value[k]) );
					}
				} else {
					dataReg[j].value = data[i].value;
				}
				dataReg[j].scale = data[i].scale;
				dataReg[j].units = decodeURI(data[i].units);
			}
		}
	}
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function dataGrab(callback){
	grabInterface();
  try {
		const reqs = function(requests = [], failback) {
			if (requests instanceof Array && requests.length > 0) {
	  		var xhr = new XMLHttpRequest();
				xhr.onload = function() {
					const status = xhr.status;
					if (xhr.readyState == 4 && status == "200") {
						requests.shift();
						return reqs(requests, content, failback);
		  		}
				};
				xhr.addEventListener('error', function(error) {
					if (failback) {
						let alert = new Alert("alert-danger",triIco,"Ошибка передачи данных");
					}
				});
				xhr.ontimeout = function() {
					xhr.abort();
					let alert = new Alert("alert-danger",triIco,"Нет связи с сервером");
					callback();
				}
	  		xhr.open(requests[0].method, requests[0].url, true);
				xhr.timeout = 2000;
	  		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	  		xhr.send(requests[0].content);
			} else {
				setSuccessConnection();
				let alert = new Alert("alert-success",triIco,"Прибор успешно сконфигурирован");
			}
		};
		//--------------------------------------------------------------------------
		restSeq = []
		ipAdr  = document.getElementById("input-ipaddress").value;
		extUrl = "";
		if (ipAdr.length > 0) {
			extUrl = "http://" + ipAdr;
		}
		for ( i=0; i<103; i++ ) {
			if (dataReg[i].adr == 30) {
				console.log(JSON.stringify(pasteDataReg(dataReg[i])));
			}
			if (dataReg[i].rw == "rw"){
				restSeq.push({
					method:  'PUT',
					url:     extUrl + '/configs/' + i,
					content: JSON.stringify(pasteDataReg(dataReg[i]))
		})}}
		var chartContent = uploadCharts();
		for ( i=0; i<3; i++) {
			restSeq.push({
				method:  'PUT',
				url:     extUrl + '/charts/' + i,
				content: JSON.stringify(chartContent[i])
		})}
		const results = reqs(restSeq, function(error) { console.log(error) });
	} catch(e) {
		let alert = new Alert("alert-danger",triIco,"Нет связи с сервером");
	}
	return;
}
//******************************************************************************
function pasteDataReg(data) {
	var bitArr = [];
	var value  = 0;
	if (data.bitMapSize > 0) {
		for (var i=0;i<data.bitMapSize;i++) {
			bitArr.push({
				mask  : data.bit[i].mask,
				min   : data.bit[i].min,
				max   : data.bit[i].max,
				shift : data.bit[i].shift,
			})
		}
	}
	if (data.type == 'S') {
		value = [];
		for (var i=0; i<data.len; i++) {
			if (data.value[i] == "") {
				value.push("%20");
			} else {
				value.push(encodeURI(data.value[i]));
			}
		}
	} else {
		value = data.value;
	}
	return {
		page  : data.page,
		adr   : data.adr,
		value : value,
		scale : data.scale,
		min   : data.min,
		max   : data.max,
		units : encodeURI(data.units),
		type  : encodeURI(data.type),
		len   : data.len,
		bitMapSize : data.bitMapSize,
		bit   : bitArr,
	};
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
