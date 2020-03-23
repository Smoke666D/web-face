//******************************************************************************
function bitVal(n,reg) {
	return (reg.value&reg.bit[n].mask)>>reg.bit[n].shift;
}

function bitWrite(n,reg,val){
	reg.value = (reg.value & (~reg.bit[n].mask)) | (val<<reg.bit[n].shift);
	return;
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


		return;
	}

	this.grab = function() {
		bitWrite(this.bitNum,dataReg[this.regNum],this.object.value);
		return;
	}

	this.init();
	if(this.object){
		this.update();
	}
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
		this.sw = 0;
		this.enable = 1;
		return;
	}

	this.update = function() {
		if(bitVal(this.bitNum,dataReg[this.regNum]) == 0) {
			this.objectNO.checked = true;
		} else {
			this.objectNC.checked = true;
		}
		return;
	}

	this.grab = function() {
		if(this.objectNC.checked = true) {
			bitWrite(this.bitNum,dataReg[this.regNum],1);
		} else {
			bitWrite(this.bitNum,dataReg[this.regNum],0);
		}
		return;
	}

	this.init();
	if((this.objectNO)&&(this.objectNC)){
		this.update();
	}
}
//******************************************************************************
function Slider(name) {
	var self = this;
	this.name = name;

	this.getData = function() {
		for (var i=0; i<dataReg.length; i++ ){
			if (dataReg[i].name == name)
			{
				this.regNum = i;
			}
		}
		return;
	}

	this.init = function() {
		this.getData();
		this.slider = document.getElementById("s-slider-" + this.name);
		this.input  = document.getElementById("sinput-" + this.name);
		swName = this.name.replace("Level", "")
		swName = this.name.replace("Time", "")
		swName = swName.replace("Delay", "")
		swName = swName.replace("On","");
		swName = swName.replace("Off","");
		this.sw = new Switch(swName + "Enb")
		if (this.sw.object){
			this.enable = this.sw.getVal();
			this.sw.object.addEventListener('click', function() {
				if(this.checked) {
					self.input.disabled = false;
					self.slider.removeAttribute('disabled');
				} else {
					self.input.disabled = true;
					self.slider.setAttribute('disabled', false);
				}
			});
		} else {
			this.enable = 1;
		}
		if ((this.name.endsWith("Delay")) || (this.name.startsWith("timer"))) {
			this.label  = document.getElementById("label-" + this.name);
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

	this.update = function() {
		reg = dataReg[this.regNum];
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

	this.grab = function() {
		this.calcScale();
		val = parseFloat(this.input.value) / Math.pow(10,dataReg[this.regNum].scale)
		dataReg[this.regNum].value = parseFloat(val.toFixed(0));
		return;
	}

	this.init();
	if ((this.slider)&&(this.input)) {
		this.update();
	}
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
var slidersArray = [];
var switcherArray = [];
var selectorArray = [];
var radioArray = [];

function declareSliders() {
	for(var i=0; i<dataReg.length; i++) {
		str = dataReg[i].name
		if (str.endsWith("Level") || str.endsWith("Delay") || str.startsWith("timer") || str.endsWith("Time")) {
			slidersArray.push(new Slider(dataReg[i].name));
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
	declareSwitches();
	declareSelects();
	declareRadio();
	return;
}

function updateInterface() {
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
	updateAllTimeSliders();
	return;
}

function grabInterface() {
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
	bitWrite(0,engineSetup,document.getElementById('engineStartAttempts').value);
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function dataUpdate() {
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
						showAlert("alert-danger","Нет связи с сервером");
	        }
	      });
	      xhr.open(requests[0].method, requests[0].url);
	      xhr.timeout = 2000;
	      xhr.send();
	  	} else {
				//***********************
				dataReg = store[0];
				updateInterface();
				//**********************
				document.getElementById("i-loading").classList.remove("loading");
	      return store;
	  	}
		};
		restSeq = []
		restSeq.push({method: 'get', url: '/configs/'})
		const results = reqs(restSeq, [],	function(error) { console.log(error)	});
	} catch(e) {
		showAlert("alert-danger","Нет связи с сервером");
	}
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function dataGrab(){
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
						showAlert("alert-danger","Ошибка передачи данных");
					}
				});
	  		xhr.open(requests[0].method, requests[0].url, true);
	  		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	  		xhr.send(requests[0].content);
			} else {
				showAlert("alert-success","Прибор успешно сконфигурирован");
			}
		};
		restSeq = []
		for ( i=1; i<103; i++ ) {
			restSeq.push({
				method:  'PUT',
				url:     '/configs/' + i,
				content: JSON.stringify(dataReg[i])
		})}
		const results = reqs(restSeq, function(error) { console.log(error) });
	} catch(e) {
		showAlert("alert-danger","Нет связи с сервером");
	}
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
