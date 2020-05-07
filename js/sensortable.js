var pointIndex = 0;

var sensorData = {
  //labels: ["0", "10"],
  datasets: [{
    data: [{
      x: 0,
      y: 0,
    },{
      x: 10,
      y: 10,}],
    fill: false,
    backgroundColor: '#f8b739',
    borderColor: '#f8b739',
    pointBorderColor: '#f8b739',
    pointBackgroundColor: '#f8b739',
    pointHitRadius: 30,
    pointHoverRadius: 10,
    showLine: true,
    lineTension: 0,
  }]
};

var chartOptions = {
  legend: {
    display: false,
  },
  dragData: true,
  dragX: true,
  dragDataRound: 2,

  scales: {
    yAxes: [{
      type: 'linear',
      scaleLabel: {
        display: true,
        labelString: 'Бар'
      },
      ticks: {
        max: 10,
        min: 0
      }
    }],
    xAxes: [{
      type: 'linear',
      scaleLabel: {
        display: true,
        labelString: 'xlabel',
      },
      ticks: {
        max: 10,
        min: 0
      }
    }]
  },
  onDrag: function(evt, datasetIndex, index, value) {
    if (index > 0) {
      if (value.x < sensorData.datasets[0].data[index-1].x+0.01){
        sensorData.datasets[0].data[index].x = sensorData.datasets[0].data[index-1].x+0.01
        return false;
      }
    }
    if (index < (sensorData.datasets[0].data.length - 1)) {
      if (value.x > sensorData.datasets[0].data[index+1].x-0.01){
        sensorData.datasets[0].data[index].x = sensorData.datasets[0].data[index+1].x-0.01
        return false;
      }
    }
    pointIndex = index;
    xFild = document.getElementById("chartXedit");
    yFild = document.getElementById("chartYedit");
    apply = document.getElementById("chartApplay");
    apply.disabled = false;
    xFild.disabled = false;
    yFild.disabled = false;
    yFild.value = value.y;
    xFild.value = value.x;
  },
  onClick: function(evt) {
    changeEvent(evt);
  }
};


document.getElementById("chartXedit").addEventListener('change', function() {
  var curVal = parseFloat(self.xFild.value);
  if (curVal > lineChart.options.scales.xAxes[0].ticks.max) {
    self.xFild.value = lineChart.options.scales.xAxes[0].ticks.max;
  }
  if (curVal < lineChart.options.scales.xAxes[0].ticks.min) {
    self.xFild.value = lineChart.options.scales.xAxes[0].ticks.min;
  }
  if (pointIndex > 0){
    if (curVal < sensorData.datasets[0].data[pointIndex-1].x+0.1) {
      self.xFild.value = sensorData.datasets[0].data[pointIndex-1].x+0.1;
    }
  }
  if (pointIndex < (sensorData.datasets[0].data.length - 1)){
    if (curVal > sensorData.datasets[0].data[pointIndex+1].x) {
      self.xFild.value = sensorData.datasets[0].data[pointIndex+1].x;
    }
  }
})
document.getElementById("chartYedit").addEventListener('change', res =  function() {
  if (parseFloat(self.yFild.value) > lineChart.options.scales.yAxes[0].ticks.max) {
    self.yFild.value = lineChart.options.scales.yAxes[0].ticks.max;
  }
  if (parseFloat(self.yFild.value) < lineChart.options.scales.yAxes[0].ticks.min) {
    self.yFild.value = lineChart.options.scales.yAxes[0].ticks.max;
  }
})
document.getElementById("chartApplay").addEventListener('click', function(){
  sensorData.datasets[0].data[pointIndex].x = parseFloat(self.xFild.value);
  sensorData.datasets[0].data[pointIndex].y = parseFloat(self.yFild.value);
  lineChart.update();
})


function changeEvent(evt) {
  var self = this;
  this.element = lineChart.getElementAtEvent(evt);
  this.xFild = document.getElementById("chartXedit");
  this.yFild = document.getElementById("chartYedit");
  this.apply = document.getElementById("chartApplay");
  if(this.element.length > 0)
  {
    pointIndex = self.element[0]._index;
    self.apply.disabled = false;
    self.xFild.disabled = false;
    self.xFild.value = sensorData.datasets[0].data[pointIndex].x;
    self.yFild.disabled = false;
    self.yFild.value = sensorData.datasets[0].data[pointIndex].y;
  }
}

var lineChart = new Chart(sensorChart, {
  type: 'scatter',
  data: sensorData,
  options: chartOptions
});
//******************************************************************************
function newSensorData(name,xmax,ymax,xunit){
  return {
    name:  name,
    xmin:  0,
    xmax:  xmax,
    ymin:  0,
    ymax:  ymax,
    xunit: xunit,
    yunit: "Бар",
    size:  2,
    dots:  [{
      x: 0,
      y: 0,
    },{
      x: xmax,
      y: ymax,
    }]
  }
}

let oilSensorResistance = newSensorData("oilSensorResistance",1500,15,"Ом");
let oilSensorCurrent = newSensorData("oilSensorCurrent",20,15,"мА");
let coolantSensorResistance = newSensorData("coolantSensorResistance",1500,15,"Ом");
let coolantSensorCurrent = newSensorData("coolantSensorCurrent",20,15,"мА");
let fuelSensorResistance = newSensorData("fuelSensorResistance",1500,15,"Ом");
let fuelSensorCurrent = newSensorData("fuelSensorCurrent",20,15,"мА");

var currentChart;
//******************************************************************************
function sensorModalInit(target) {
  switch(target) {
    case 'oil':
      type = document.getElementById("oilPressureSensorType").value - 3;
      if (type == 0) {
        currentChart = oilSensorResistance;
      } else {
        currentChart = oilSensorCurrent;
      }
      break;
    case 'coolant':
      type = document.getElementById("coolantTempSensorType").value - 3;
      if (type == 0) {
        currentChart = coolantSensorResistance;
      } else {
        currentChart = coolantSensorCurrent;
      }
      break;
    case 'fuel':
      type = document.getElementById("fuelLevelSensorType").value - 3;
      if (type == 0) {
        currentChart = fuelSensorResistance;
      } else {
        currentChart = fuelSensorCurrent;
      }
      break;
  }
  document.getElementById("sensorModal").addEventListener("animationstart", function(){
    makeChart(currentChart);
  });
}

function cleanChart(){
  lineChart.data.labels.length = 0;
  lineChart.data.datasets.forEach(function(dataset) {
    dataset.data.length=0;
  });
}

function makeChart(chrtData){
  var i = 0;
  var xFild = document.getElementById("chartXedit");
  xFild.disabled = true;
  xFild.value = null;
  var yFild = document.getElementById("chartYedit");
  yFild.disabled = true;
  yFild.value = null;
  document.getElementById("chartApplay").disabled = true;
  sensorData.labels=[];
  sensorData.datasets[0].data=[];
  lineChart.options.scales.yAxes[0].ticks.max = chrtData.ymax;
  lineChart.options.scales.yAxes[0].ticks.min = chrtData.ymin;
  lineChart.options.scales.xAxes[0].ticks.max = chrtData.xmax;
  lineChart.options.scales.xAxes[0].ticks.min = chrtData.xmin;
  lineChart.options.scales.xAxes[0].scaleLabel.labelString = chrtData.xunit;
  for(i=0;i<chrtData.size;i++){
    sensorData.datasets[0].data.push({
      x: chrtData.dots[i].x,
      y: chrtData.dots[i].y,
    });
  }
  lineChart.update();
  return;
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
function addChartPoint(){
  var dataLen  = sensorData.datasets[0].data.length;
  var xLstVal  = sensorData.datasets[0].data[dataLen-1].x;
  var xpreVal  = sensorData.datasets[0].data[dataLen-2].x;
  var xNewVal  = parseFloat((xpreVal + (xLstVal-xpreVal)/2).toFixed(2));
  var yLstVal  = sensorData.datasets[0].data[dataLen-1].y;
  var yPreVal  = sensorData.datasets[0].data[dataLen-2].y;
  var yNewVal  = parseFloat((yPreVal + (yLstVal-yPreVal)/2).toFixed(2));
  sensorData.datasets[0].data.push({
    x: xLstVal,
    y: yLstVal
  });
  sensorData.datasets[0].data[dataLen-1].x = xNewVal;
  sensorData.datasets[0].data[dataLen-1].y = yNewVal;
  lineChart.update();
  return;
}
//------------------------------------------------------------------------------
function removeChartPoint(){
  var dataLen  = sensorData.datasets[0].data.length;
  if (dataLen > 2) {
    var xLstVal  = sensorData.datasets[0].data[dataLen-1].x;
    var yLstVal  = sensorData.datasets[0].data[dataLen-1].y;
    sensorData.datasets[0].data.pop();
    sensorData.datasets[0].data[dataLen-2].x = xLstVal;
    sensorData.datasets[0].data[dataLen-2].y = yLstVal;
    lineChart.update();
  }
  return;
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
function getVal(name) {
  for(var i=0; i<dataReg.length; i++ ){
    if (dataReg[i].bitMapSize > 0) {
      for (var j=0; j<dataReg[i].bitMapSize; j++) {
        if (dataReg[i].bit[j].name == name) {
          return bitVal(j,dataReg[i]);
        }
      }
    }
  }
}
//------------------------------------------------------------------------------
function fix16Tofloat(fix) {
  return fix/0x00010000;
}
function floatToFix16(float) {
  return parseInt(float*0x00010000);
}
//------------------------------------------------------------------------------
function uploadCharts() {
  function prepareCharts(chart) {
    var dotArr = [];
    if (chart.size>0) {
      for(var i=0;i<chart.size;i++) {
        dotArr.push({
          x: floatToFix16(chart.dots[i].x),
          y: floatToFix16(chart.dots[i].y)
        })
      }
    }
    return {
      "xmin" : floatToFix16(chart.xmin),
      "xmax" : floatToFix16(chart.xmax),
      "ymin" : floatToFix16(chart.ymin),
      "ymax" : floatToFix16(chart.ymax),
      "xunit": encodeURI(chart.xunit),
      "yunit": encodeURI(chart.yunit),
      "size" : chart.size,
      "dots" : dotArr,
    }
  }
  var sel = 0;
  var content = [];
  //---------------- Oil resetence ----------------
  sel = getVal("oilPressureSensorType");
  if (sel == 3) {
    content.push(prepareCharts(oilSensorResistance));
  //----------------- Oil current -----------------
  } else if (sel == 4) {
    content.push(prepareCharts(oilSensorCurrent));
  } else {
    content.push({"data" : 0});
  }
  //-------------- Coolant resetence --------------
  sel = getVal("coolantTempSensorType");
  if (sel == 3) {
    content.push(prepareCharts(coolantSensorResistance));
  //--------------- Coolant current ---------------
  } else if (sel == 4) {
    content.push(prepareCharts(coolantSensorCurrent));
  } else {
    content.push({"data" : 0});
  }
  //---------------- Fuel resetence ---------------
  sel = getVal("fuelLevelSensorType");
  if (sel == 3) {
    content.push(prepareCharts(fuelSensorResistance));
  //----------------- Fuel current ----------------
  } else if (sel == 4) {
    content.push(prepareCharts(fuelSensorCurrent));
  } else {
    content.push({"data" : 0});
  }
  //-----------------------------------------------
  return content;
}
//------------------------------------------------------------------------------
function loadCharts(data) {
  function chartFixToFloat(input,name) {
    let output = newSensorData(
      name,
      fix16Tofloat(input.xmax),
      fix16Tofloat(input.ymax),
      decodeURI(input.xunit));
    output.xmin  = fix16Tofloat(input.xmin);
    output.ymin  = fix16Tofloat(input.ymin);
    output.yunit = decodeURI(input.yunit);
    output.size  = input.size;
    output.dots.length = 0;
    for(var i=0;i<output.size;i++) {
      output.dots.push({
        x: fix16Tofloat(input.dots[i].x),
        y: fix16Tofloat(input.dots[i].y),
      })
    }
    return output;
  }
  //---------------- Oil resetence ----------------
  var sel = 0;
  sel = getVal("oilPressureSensorType");
  if (sel == 3) {
    oilSensorResistance = chartFixToFloat(data[0],"oilSensorResistance");
  //----------------- Oil current -----------------
  } else if (sel == 4) {
    oilSensorCurrent = chartFixToFloat(data[0],"oilSensorCurrent");
  }
  //-------------- Coolant resetence --------------
  sel = getVal("coolantTempSensorType");
  if (sel == 3) {
    coolantSensorResistance = chartFixToFloat(data[1],"coolantSensorResistance");
  //--------------- Coolant current ---------------
  } else if (sel == 4) {
    coolantSensorCurrent = chartFixToFloat(data[1],"coolantSensorCurrent");
  }
  //---------------- Fuel resetence ---------------
  sel = getVal("fuelLevelSensorType");
  if (sel == 3) {
    fuelSensorResistance = chartFixToFloat(data[2],"fuelSensorResistance");
  //----------------- Fuel current ----------------
  } else if (sel == 4) {
    fuelSensorCurrent = chartFixToFloat(data[2],"fuelSensorCurrent");
  }
  //-----------------------------------------------
  return;
}
//------------------------------------------------------------------------------
function saveToCurChart() {
  currentChart.size  = sensorData.datasets[0].data.length;
  currentChart.ymax  = lineChart.options.scales.yAxes[0].ticks.max;
  currentChart.ymin  = lineChart.options.scales.yAxes[0].ticks.min;
  currentChart.xmax  = lineChart.options.scales.xAxes[0].ticks.max;
  currentChart.xmin  = lineChart.options.scales.xAxes[0].ticks.min;
  currentChart.xunit = lineChart.options.scales.xAxes[0].scaleLabel.labelString;
  currentChart.dots.length = 0;
  for(var i=0;i<currentChart.size;i++){
    currentChart.dots.push({
      x: sensorData.datasets[0].data[i].x,
      y: sensorData.datasets[0].data[i].y,
    })
  }
  return;
}

function saveChartData(){
  saveToCurChart();
  let alert = new Alert("alert-success",triIco,"График успешно сохранен.");
  return;
}

function downloadSensorData(){
	function SaveAsFile(t,f,m) {
  	try {
    	var b = new Blob([t],{type:m});
      saveAs(b, f);
    } catch(e) {
    	window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
    }
  }
	saveToCurChart();
	SaveAsFile(JSON.stringify(currentChart),currentChart.name+".JSON","text/plain;charset=utf-8");
}
//------------------------------------------------------------------------------
function uploadSensorData() {
	var newCart;
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		var input = document.createElement("input");
    input.setAttribute("type","file");
		input.addEventListener("change",function() {
			file = input.files[0];
			if (file.type != "application/json") {
        let alert = new Alert("alert-warning",triIco,"Выбран файл с неправильным расширением. Выберете JSON файл");
			} else {
				let reader = new FileReader();
        reader.readAsText(file);
				reader.onload = function() {
					try {
						currentChart = JSON.parse(reader.result);
						makeChart(currentChart);
					} catch(e) {
            let alert = new Alert("alert-warning",triIco,"Неправильный формат файла");
					}
  			};
			}
		});
		input.click();
    return false; // avoiding navigation
	} else {
    let alert = new Alert("alert-warning",triIco,"Браузер не поддерживает загрузку файлов");
	}
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
