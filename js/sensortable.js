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
      if(value.x < sensorData.datasets[0].data[index-1].x+0.01){
        return false;
      }
    }
    if (index < (sensorData.datasets[0].data.length - 1)) {
      if (value.x > sensorData.datasets[0].data[index+1].x-0.01){
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
//******************************************************************************
function sensorModalInit(target) {
  switch(target) {
    case 'oil':
      type = document.getElementById("oilPressureSensorType").value - 3;
      if (type == 0) {
        chrtData = oilSensorResistance;
      } else {
        chrtData = oilSensorCurrent;
      }
      break;
    case 'coolant':
      type = document.getElementById("coolantTempSensorType").value - 3;
      if (type == 0) {
        chrtData = coolantSensorResistance;
      } else {
        chrtData = coolantSensorCurrent;
      }
      break;
    case 'fuel':
      type = document.getElementById("fuelLevelSensorType").value - 3;
      if (type == 0) {
        chrtData = fuelSensorResistance;
      } else {
        chrtData = fuelSensorCurrent;
      }
      break;
  }
  document.getElementById("sensorModal").addEventListener("animationstart", function(){
    makeChart(chrtData);
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
    //sensorData.labels.push(chrtData.dots[i].x.toString());
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
  var xNewVal  = xpreVal + (xLstVal-xpreVal)/2;
  var yLstVal  = sensorData.datasets[0].data[dataLen-1].y;
  var yPreVal  = sensorData.datasets[0].data[dataLen-2].y;
  var yNewVal  = yPreVal + (yLstVal-yPreVal)/2;
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
function saveChartData(chrtData){
  var i = 0;

  chrtData.size = sensorData.labels.length;
  chrtData.ymax = chartOptions.scales.yAxes[0].ticks.max;
  chrtData.ymin = chartOptions.scales.yAxes[0].ticks.min;
  chrtData.dots.length = 0;
  for(i=0;i<chrtData.size;i++){
    chrtData.dots.push({
      x: parseFloat(sensorData.labels[i]),
      y: sensorData.datasets[0].data[i],
    })
  }
  return;
}
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
	SaveAsFile(JSON.stringify(chrtData),chrtData.name+".JSON","text/plain;charset=utf-8");
}
//------------------------------------------------------------------------------
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
				let reader = new FileReader();
        reader.readAsText(file);
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
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
