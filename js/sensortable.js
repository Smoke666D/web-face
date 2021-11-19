/*----------------------------------------------------------------------------*/
const CHART_DOTS_SIZE = 32;
const xAxisType       = {
  "resestive" : 0,
  "current"   : 1,
};
const yAxisType       = {
  "oil"     : 0,
  "coolant" : 1,
  "fuel"    : 2,
};
/*----------------------------------------------------------------------------*/
var chartList    = [];
var pointIndex   = 0;
var lineChart    = null;
var sensorData   = {
  datasets: [{
    data: [{
      x: 0,
      y: 0,
    },{
      x: 10,
      y: 10,}],
    fill:                 false,
    backgroundColor:      '#f8b739',
    borderColor:          '#f8b739',
    pointBorderColor:     '#f8b739',
    pointBackgroundColor: '#f8b739',
    pointHitRadius:       30,
    pointHoverRadius:     10,
    showLine:             true,
    lineTension:          0,
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
  onDrag: function( evt, datasetIndex, index, value ) {
    if ( index > 0 ) {
      if ( value.x < ( sensorData.datasets[0].data[index-1].x + 0.01 ) ) {
        sensorData.datasets[0].data[index].x = sensorData.datasets[0].data[index-1].x + 0.01;
        return false;
      }
    }
    if ( index < ( sensorData.datasets[0].data.length - 1 ) ) {
      if ( value.x > ( sensorData.datasets[0].data[index + 1].x - 0.01 ) ) {
        sensorData.datasets[0].data[index].x = sensorData.datasets[0].data[index+1].x - 0.01;
        return false;
      }
    }
    pointIndex     = index;
    xFild          = document.getElementById("chartXedit");
    yFild          = document.getElementById("chartYedit");
    apply          = document.getElementById("chartApplay");
    apply.disabled = false;
    xFild.disabled = false;
    yFild.disabled = false;
    yFild.value    = value.y;
    xFild.value    = value.x;
  },
  onClick: function ( evt ) {
    changeEvent( evt );
  }
};
/*----------------------------------------------------------------------------*/
var currentChart = null;
/*----------------------------------------------------------------------------*/
function chartInit () {
    lineChart = new Chart( sensorChart, {
    type:    'scatter',
    data:    sensorData,
    options: chartOptions
  });
  document.getElementById( "chartXedit" ).addEventListener( 'change', function () {
    var curVal = parseFloat( self.xFild.value );
    if ( curVal > lineChart.options.scales.xAxes[0].ticks.max ) {
      self.xFild.value = lineChart.options.scales.xAxes[0].ticks.max;
    }
    if ( curVal < lineChart.options.scales.xAxes[0].ticks.min ) {
      self.xFild.value = lineChart.options.scales.xAxes[0].ticks.min;
    }
    if ( pointIndex > 0 ) {
      if ( curVal < ( sensorData.datasets[0].data[pointIndex-1].x + 0.1 ) ) {
        self.xFild.value = sensorData.datasets[0].data[pointIndex-1].x + 0.1;
      }
    }
    if ( pointIndex < ( sensorData.datasets[0].data.length - 1 ) ) {
      if ( curVal > sensorData.datasets[0].data[pointIndex+1].x ) {
        self.xFild.value = sensorData.datasets[0].data[pointIndex+1].x;
      }
    }
  });
  document.getElementById( "chartYedit" ).addEventListener( 'change', res = function () {
    if ( parseFloat( self.yFild.value ) > lineChart.options.scales.yAxes[0].ticks.max ) {
      self.yFild.value = lineChart.options.scales.yAxes[0].ticks.max;
    }
    if ( parseFloat( self.yFild.value ) < lineChart.options.scales.yAxes[0].ticks.min ) {
      self.yFild.value = lineChart.options.scales.yAxes[0].ticks.max;
    }
  });
  document.getElementById( "chartApplay" ).addEventListener( 'click', function () {
    sensorData.datasets[0].data[pointIndex].x = parseFloat( self.xFild.value );
    sensorData.datasets[0].data[pointIndex].y = parseFloat( self.yFild.value );
    lineChart.update();
  });
  return;
}
/*----------------------------------------------------------------------------*/
function changeEvent ( evt ) {
  var self     = this;
  this.element = lineChart.getElementAtEvent( evt );
  this.xFild   = document.getElementById( "chartXedit"  );
  this.yFild   = document.getElementById( "chartYedit"  );
  this.apply   = document.getElementById( "chartApplay" );
  if ( this.element.length > 0 ) {
    pointIndex          = self.element[0]._index;
    self.apply.disabled = false;
    self.xFild.disabled = false;
    self.xFild.value    = sensorData.datasets[0].data[pointIndex].x;
    self.yFild.disabled = false;
    self.yFild.value    = sensorData.datasets[0].data[pointIndex].y;
  }
  return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function ChartDotData () {
  self.x = 0;
  self.y = 0;
  return;
}
function AxisAtrib () {
  this.min  = 0;
  this.max  = 1;
  this.unit = " ";
  return;
}
function ChartData () {
  var self   = this;
  this.x     = new AxisAtrib();
  this.y     = new AxisAtrib();
  this.xType = 0;
  this.yType = 0;
  this.size  = 0;
  this.dots  = [];
  function searchRegAdr ( name ) {
    res = dataReg.length;
    for ( var i=0; i<dataReg.length; i++ ) {
      if ( dataReg[i].name == name ) {
        res = dataReg[i].adr;
        break;
      }
    }
    return res;
  }
  this.clean          = function () {
    self.dots = [];
    for ( var i=0; i<CHART_DOTS_SIZE; i++ ) {
      let dot = new ChartDotData();
      self.dots.push( dot );
    }
    return;
  }
  this.copy           = function ( buffer ) {
    self.clean();
    self.setData( buffer );
    for ( var i=0; i<self.size; i++ ) {
      self.writeDot( i, buffer.dots[i] );
    }
    return;
  }
  this.setData        = function ( chart ) {
    if ( chart.size < CHART_DOTS_SIZE ) {
      self.size  = chart.size;
    } else {
      self.size = CHART_DOTS_SIZE;
    }
    return;
  }
  this.writeDot       = function ( adr, dot ) {
    self.dots[adr].x = dot.x;
    self.dots[adr].y = dot.y;
    return;
  }
  this.setDot         = function ( adr, dot ) {
    self.dots[adr].x = fix16Tofloat( dot.x );
    self.dots[adr].y = fix16Tofloat( dot.y );
    return;
  }
  this.setDef         = function () {
    self.clean();
    self.size = 2;
    self.dots[0].x = self.x.min;
    self.dots[0].y = self.y.min;
    self.dots[1].x = self.x.max;
    self.dots[1].y = self.y.max;
  }
  this.getTypeFromReg = function ( n ) {
    switch ( n ) {
      case 0:
        dataRegNum = searchRegAdr( "oilPressureSetup" );
        break;
      case 1:
        dataRegNum = searchRegAdr( "coolantTempSetup" );
        break;
      case 2:
        dataRegNum = searchRegAdr( "fuelLevelSetup" );
        break;
    }
    if ( bitVal( 0, dataReg[dataRegNum] ) == 4 ) {
      this.xType = xAxisType.current;
    } else {
      this.xType = xAxisType.resestive;
    }
  }
  this.init           = function ( xType = self.xType, yType = self.yType ) {
    let reInit = 0;
    if ( self.xType != xType ) {
      reInit = 1;
    }
    self.xType = xType;
    self.yType = yType;
    switch ( self.xType ) {
      case xAxisType.resestive:
        self.x.min  = 0;
        self.x.max  = 1500;
        self.x.unit = "Ом";
        break;
      case xAxisType.current:
        self.x.min  = 0;
        self.x.max  = 20;
        self.x.unit = "мА";
        break;
    }
    switch ( self.yType ) {
      case yAxisType.oil:
        self.y.min  = 0;
        self.y.max  = 15;
        self.y.unit = "Бар";
        break;
      case yAxisType.coolant:
        self.y.min  = 0;
        self.y.max  = 250;
        self.y.unit = "С";
      break;
      case yAxisType.fuel:
        self.y.min  = 0;
        self.y.max  = 100;
        self.y.unit = "%";
        break;
    }
    if ( reInit == 1 ) {
      self.setDef();
    } else {
      for ( var i=0; i<self.size; i++ ) {
        if ( self.dots[i].x < self.x.min ) {
          self.dots[i].x = self.x.min;
        }
        if ( self.dots[i].x > self.x.max ) {
          self.dots[i].x = self.x.max;
        }
        if ( self.dots[i].y < self.y.min ) {
          self.dots[i].y = self.y.min;
        }
        if ( self.dots[i].y > self.y.max ) {
          self.dots[i].y = self.y.max;
        }
      }
    }
  }
  return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function declareChartList () {
  chartList = [];
  for ( var i=0; i<3; i++ ) {
    chartList.push( new ChartData() );
    chartList[i].clean();
  }
  chartList[yAxisType.oil].init( xAxisType.resestive, yAxisType.oil );
  chartList[yAxisType.oil].setDef();
  chartList[yAxisType.coolant].init( xAxisType.resestive, yAxisType.coolant );
  chartList[yAxisType.coolant].setDef();
  chartList[yAxisType.fuel].init( xAxisType.resestive, yAxisType.fuel );
  chartList[yAxisType.fuel].setDef();
  return;
}
function sensorModalInit ( target ) {
  switch ( target ) {
    case 'oil':
      type = document.getElementById( "oilPressureSensorType" ).value - 3;
      if ( type == 0 ) {
        chartList[0].init( xType = xAxisType.resestive );
        currentChart = chartList[0];
      } else {
        chartList[0].init( xType = xAxisType.current );
        currentChart = chartList[0];
      }
      break;
    case 'coolant':
      type = document.getElementById( "coolantTempSensorType" ).value - 3;
      if ( type == 0 ) {
        chartList[1].init( xType = xAxisType.resestive );
        currentChart = chartList[1];
      } else {
        chartList[1].init( xType = xAxisType.current );
        currentChart = chartList[1];
      }
      break;
    case 'fuel':
      type = document.getElementById( "fuelLevelSensorType" ).value - 3;
      if ( type == 0 ) {
        chartList[1].init( xType = xAxisType.resestive );
        currentChart = chartList[2];
      } else {
        chartList[2].init( xType = xAxisType.current );
        currentChart = chartList[2];
      }
      break;
  }
  makeChart( currentChart );
  document.getElementById( "sensorModal" ).addEventListener( "animationstart", function () {
    makeChart( currentChart );
  });
  return;
}
function cleanChart () {
  lineChart.data.labels.length = 0;
  lineChart.data.datasets.forEach( function ( dataset ) {
    dataset.data.length = 0;
    return;
  });
  return;
}
function makeChart ( chrtData ) {
  var i = 0;
  var xFild      = document.getElementById( "chartXedit" );
  xFild.disabled = true;
  xFild.value    = null;
  var yFild      = document.getElementById( "chartYedit" );
  yFild.disabled = true;
  yFild.value    = null;
  document.getElementById( "chartApplay" ).disabled = true;
  sensorData.labels                                        = [];
  sensorData.datasets[0].data                              = [];
  lineChart.options.scales.yAxes[0].ticks.max              = chrtData.y.max;
  lineChart.options.scales.yAxes[0].ticks.min              = chrtData.y.min;
  lineChart.options.scales.xAxes[0].ticks.max              = chrtData.x.max;
  lineChart.options.scales.xAxes[0].ticks.min              = chrtData.x.min;
  lineChart.options.scales.xAxes[0].scaleLabel.labelString = chrtData.x.unit;
  lineChart.options.scales.yAxes[0].scaleLabel.labelString = chrtData.y.unit;
  for ( i=0; i<chrtData.size; i++ ) {
    sensorData.datasets[0].data.push({
      x: chrtData.dots[i].x,
      y: chrtData.dots[i].y,
    });
  }
  lineChart.update();
  return;
}
function addChartPoint () {
  var dataLen  = sensorData.datasets[0].data.length;
  var xLstVal  = sensorData.datasets[0].data[dataLen - 1].x;
  var xpreVal  = sensorData.datasets[0].data[dataLen - 2].x;
  var xNewVal  = parseFloat( ( xpreVal + ( xLstVal - xpreVal ) / 2 ).toFixed( 2 ) );
  var yLstVal  = sensorData.datasets[0].data[dataLen - 1].y;
  var yPreVal  = sensorData.datasets[0].data[dataLen - 2].y;
  var yNewVal  = parseFloat( ( yPreVal + ( yLstVal - yPreVal ) / 2 ).toFixed( 2 ) );
  sensorData.datasets[0].data.push({
    x: xLstVal,
    y: yLstVal
  });
  sensorData.datasets[0].data[dataLen - 1].x = xNewVal;
  sensorData.datasets[0].data[dataLen - 1].y = yNewVal;
  lineChart.update();
  return;
}
function removeChartPoint () {
  var dataLen  = sensorData.datasets[0].data.length;
  if (dataLen > 2) {
    var xLstVal  = sensorData.datasets[0].data[dataLen - 1].x;
    var yLstVal  = sensorData.datasets[0].data[dataLen - 1].y;
    sensorData.datasets[0].data.pop();
    sensorData.datasets[0].data[dataLen - 2].x = xLstVal;
    sensorData.datasets[0].data[dataLen - 2].y = yLstVal;
    lineChart.update();
  }
  return;
}
function getVal ( name ) {
  for ( var i=0; i<dataReg.length; i++ ) {
    if ( dataReg[i].bitMapSize > 0 ) {
      for ( var j=0; j<dataReg[i].bitMapSize; j++ ) {
        if ( dataReg[i].bit[j].name == name ) {
          return bitVal( j, dataReg[i] );
        }
      }
    }
  }
  return;
}
function fix16Tofloat ( fix ) {
  return fix / 0x00010000;
}
function floatToFix16 ( float ) {
  return parseInt( float * 0x00010000 );
}
function uploadCharts () {
  var res = [];
  function ChartTransferData () {
    this.size = 0;
    this.dots = [];
  }
  for ( var i=0; i<chartList.length; i++ ) {
    res.push( new ChartTransferData() );
    res[i].size = chartList[i].size;
    for ( var j=0; j<res[i].size; j++ ) {
      let dot = new ChartDotData();
      dot.x = floatToFix16( chartList[i].dots[j].x );
      dot.y = floatToFix16( chartList[i].dots[j].y );
      res[i].dots.push( dot );
    }
  }
  return res;
}
function loadCharts ( data ) {
  function chartParsing ( input ) {
    let output   = new ChartData();
    output.size  = input.size;
    output.xType = input.xType;
    output.yType = input.yType;
    for ( var i=0; i<input.size; i++ ) {
      output.dots.push( new ChartDotData() );
      output.dots[i].x = fix16Tofloat( input.dots[i].x );
      output.dots[i].y = fix16Tofloat( input.dots[i].y );
    }
    output.init();
    return output;
  }

  for ( var i=0; i<data.length; i++ ) {
    let chart = chartParsing( data[i] );
    chartList[chart.yType] = chart;
  }

  return;
}
function saveToCurChart () {
  currentChart.size  = sensorData.datasets[0].data.length;
  currentChart.clean();
  for ( var i=0; i<currentChart.size; i++ ) {
    currentChart.dots[i].x = sensorData.datasets[0].data[i].x;
    currentChart.dots[i].y = sensorData.datasets[0].data[i].y;
  }
  return;
}
function saveChartData () {
  saveToCurChart();
  let alert = new Alert( "alert-success", okIco, "График успешно сохранен." );
  return;
}
function downloadSensorData () {
	function SaveAsFile ( t, file, m ) {
  	try {
    	var blob = new Blob( [t], { type: m } );
      saveAs( blob, file );
    } catch( e ) {
    	window.open( ( "data:" + m + "," + encodeURIComponent( t ) ), '_blank', '' );
      let alert = new Alert( "alert-warning", triIco, "Ошибка записи грфика в файл" );
    }
    return;
  }
	saveToCurChart();
  let name   = currentChart.name + ".json";
  if ( electronApp > 0 ) {
    name += ".json";
  }
	SaveAsFile( JSON.stringify( currentChart ), name, "application/json;charset=utf-8" );
  return;
}
function uploadSensorData () {
	var newCart;
	if ( window.File && window.FileReader && window.FileList && window.Blob ) {
		var input = document.createElement( "input" );
    input.setAttribute( "type", "file" );
		input.addEventListener( "change", function() {
			file = input.files[0];
			if ( file.type != "application/json" ) {
        let alert = new Alert( "alert-warning", triIco, "Выбран файл с неправильным расширением. Выберете JSON файл" );
			} else {
				let reader = new FileReader();
        reader.readAsText( file );
				reader.onload = function() {
					try {
            let buffer = new ChartData();
            buffer = JSON.parse( reader.result );
            currentChart.copy( buffer );
						makeChart( currentChart );
					} catch ( e ) {
            let alert = new Alert( "alert-warning", triIco, "Неправильный формат файла" );
					}
  			};
			}
		});
		input.click();
    return false; // avoiding navigation
	} else {
    let alert = new Alert( "alert-warning", triIco, "Браузер не поддерживает загрузку файлов" );
	}
  return;
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
module.exports.ChartData       = ChartData;
module.exports.ChartDotData    = ChartDotData;
module.exports.CHART_DOTS_SIZE = CHART_DOTS_SIZE;
module.exports.chartList       = chartList;
