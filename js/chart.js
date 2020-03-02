var speedCanvas = document.getElementById("speedChart");
var sensorData = {
  labels: ["0", "10"],
  datasets: [{
    data: [0, 10],
    fill: false,
    borderColor: '#f8b739',
    pointBorderColor: '#f8b739',
    pointBackgroundColor: '#f8b739',
    pointHitRadius: 30,
    pointHoverRadius: 10,
    lineTension: 0,
  }]
};

var chartOptions = {
  legend: {
    display: false,
  },
  dragData: true,
  scales: {
    yAxes: [{
      ticks: {
        max: 25,
        min: 0
      }
    }]
  },
};

var lineChart = new Chart(sensorChart, {
  type: 'line',
  data: sensorData,
  options: chartOptions
});
//******************************************************************************
var sensorChartData = {
  "xmin": 0,
  "xmax": 240,
  "ymin": 0,
  "ymax": 15,
  "xunit": "Ohm",
  "yunit": "Bar",
  "size": 2,
  "dots":[{
      "x": 0,
      "y": 0,
    },{
      "x": 240,
      "y": 15,
    }]
};
//******************************************************************************
function sensorModalInit(){
  document.getElementById("sensorModal").addEventListener("animationstart", function(){
    makeChart(sensorChartData);
  });
}

function cleanChart(){
  lineChart.data.labels.length = 0;
  lineChart.data.datasets.forEach((dataset) => {
    dataset.data.length=0;
  });
}

function makeChart(chrtData){
  var i = 0;
  sensorData.labels=[];
  sensorData.datasets[0].data=[];
  chartOptions.scales.yAxes[0].ticks.max = chrtData.ymax;
  chartOptions.scales.yAxes[0].ticks.min = chrtData.ymin;
  for(i=0;i<chrtData.size;i++){
    sensorData.labels.push(chrtData.dots[i].x.toString());
    sensorData.datasets[0].data.push(chrtData.dots[i].y);
  }
  lineChart.update();
  return;
}

function addChartPoint(){
  var lebLen = lineChart.data.labels.length;
  var labMax = parseInt(lineChart.data.labels[lebLen-1]);
  var labMin = parseInt(lineChart.data.labels[0]);
  var stp = ((labMax-labMin)/(lebLen)).toFixed(1);
  var oldVal = lineChart.data.datasets[0].data[lebLen-1];
  var preVal = lineChart.data.datasets[0].data[lebLen-2];
  var newVal = preVal + ((oldVal-preVal)/2);
  lineChart.data.labels.push(labMax.toString());
  for(var i=0;i<lebLen;i++){
    lineChart.data.labels[i]=(i*stp).toFixed(1).toString();
  }
  lineChart.data.datasets.forEach((dataset) => {
    dataset.data.push(oldVal);
  });
  lineChart.data.datasets[0].data[lebLen-1] = newVal;
  lineChart.update();
  return;
}

function removeChartPoint(){
  var lebLen = lineChart.data.labels.length;
  if (lebLen>2){
    var labMax = parseInt(lineChart.data.labels[lebLen-1]);
    var labMin = parseInt(lineChart.data.labels[0]);
    var stp = (labMax-labMin)/(lebLen-2);
    var oldVal = lineChart.data.datasets[0].data[lebLen-1];
    for(var i=0;i<(lebLen-1);i++){
      lineChart.data.labels[i]=(i*stp).toFixed(1).toString();
    }
    lineChart.data.labels.pop();
    lineChart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    lineChart.data.datasets[0].data[lebLen-2] = oldVal;
    lineChart.update();
  }
  return;
}

function saveChartData(chrtData){
  var i = 0;

  chrtData.size = sensorData.labels.length;
  chrtData.ymax = chartOptions.scales.yAxes[0].ticks.max;
  chrtData.ymin = chartOptions.scales.yAxes[0].ticks.min;
  chrtData.dots.length = 0;
  for(i=0;i<chrtData.size;i++){
    chrtData.dots.push({
      "x": parseFloat(sensorData.labels[i]),
      "y": sensorData.datasets[0].data[i],
    })
  }
  console.log(chrtData);
  return;
}
