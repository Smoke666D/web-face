const CHART_DOTS_SIZE = 128;
const xAxisType = {
  "resestive" : 0,
  "current"   : 1,
};
const yAxisType = {
  "oil"     : 0,
  "coolant" : 1,
  "fuel"    : 2,
};
var chartList  = [];
var pointIndex = 0;
var lineChart  = null;
var sensorData = {
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

function changeEvent ( evt ) {
  var self     = this;
  this.element = lineChart.getElementAtEvent( evt );
  this.xFild   = document.getElementById( "chartXedit"  );
  this.yFild   = document.getElementById( "chartYedit"  );
  this.apply   = document.getElementById( "chartApplay" );
  if ( this.element.length > 0 )
  {
    pointIndex          = self.element[0]._index;
    self.apply.disabled = false;
    self.xFild.disabled = false;
    self.xFild.value    = sensorData.datasets[0].data[pointIndex].x;
    self.yFild.disabled = false;
    self.yFild.value    = sensorData.datasets[0].data[pointIndex].y;
  }
  return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************
function ChartData () {
  this.x     = new AxisAtrib();
  this.y     = new AxisAtrib();
  this.xType = 0;
  this.yType = 0;
  this.size  = 0;
  this.dots  = [];

  this.clean          = function () {
    this.dots = [];
    for ( var i=0; i<CHART_DOTS_SIZE; i++ ) {
      let dot = new ChartDotData();
      this.dots.push( dot );
    }
    return;
  }
  this.setData        = function ( chart ) {
    if ( chart.size < CHART_DOTS_SIZE ) {
      this.size  = chart.size;
    } else {
      this.size = CHART_DOTS_SIZE;
    }
    return;
  }
  this.setDot         = function ( adr, dot ) {
    this.dots[adr].x = fix16Tofloat( dot.x );
    this.dots[adr].y = fix16Tofloat( dot.y );
    return;
  }
  this.setDef         = function () {
    this.clean();
    this.size = 2;
    this.dots[0].x = this.x.min;
    this.dots[0].y = this.y.min;
    this.dots[1].x = this.x.max;
    this.dots[1].y = this.y.max;
  }
  this.getTypeFromReg = function ( n ) {
    switch ( n ) {
      case 0:
        dataRegNum = 8;
        break;
      case 1:
        dataRegNum = 11;
        break;
      case 2:
        dataRegNum = 19;
        break;
    }
    if ( bitVal( 0, dataReg[dataRegNum] ) == 4 ) {
      this.xType = xAxisType.current;
    } else {
      this.xType = xAxisType.resestive;
    }
  }
  this.init           = function ( xType = this.xType, yType = this.yType ) {
    let reInit = 0;
    if ( this.xType != xType ) {
      reInit = 1;
    }
    this.xType = xType;
    this.yType = yType;
    switch ( this.xType ) {
      case xAxisType.resestive:
        this.x.min  = 0;
        this.x.max  = 1500;
        this.x.unit = "Ом";
        break;
      case xAxisType.current:
        this.x.min  = 0;
        this.x.max  = 20;
        this.x.unit = "мА";
        break;
    }
    switch ( this.yType ) {
      case yAxisType.oil:
        this.y.min  = 0;
        this.y.max  = 2;
        this.y.unit = "Бар";
        break;
      case yAxisType.coolant:
        this.y.min  = 0;
        this.y.max  = 250;
        this.y.unit = "С";
      break;
      case yAxisType.fuel:
        this.y.min  = 0;
        this.y.max  = 100;
        this.y.unit = "%";
        break;
    }
    if ( reInit == 1 ) {
      this.setDef();
    } else {
      for ( var i=0; i<this.size; i++ ) {
        if ( this.dots[i].x < this.x.min ) {
          this.dots[i].x = this.x.min;
        }
        if ( this.dots[i].x > this.x.max ) {
          this.dots[i].x = this.x.max;
        }
        if ( this.dots[i].y < this.y.min ) {
          this.dots[i].y = this.y.min;
        }
        if ( this.dots[i].y > this.y.max ) {
          this.dots[i].y = this.y.max;
        }
      }
    }
  }
  return;
}
function ChartDotData () {
  this.x = 0;
  this.y = 0;
  return;
}
function AxisAtrib () {
  this.min  = 0;
  this.max  = 1;
  this.unit = " ";
  return;
}

function declareChartList () {
  chartList = [];
  for ( var i=0; i<3; i++ ) {
    chartList.push( new ChartData() );
    chartList[i].clean();
  }
  chartList[0].init( xAxisType.resestive, yAxisType.oil );
  chartList[0].setDef();
  chartList[1].init( xAxisType.resestive, yAxisType.coolant );
  chartList[1].setDef();
  chartList[2].init( xAxisType.resestive, yAxisType.fuel );
  chartList[2].setDef();
  return;
}
var currentChart;
//******************************************************************************
function sensorModalInit ( target ) {
  switch( target ) {
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
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------
function fix16Tofloat ( fix ) {
  return fix / 0x00010000;
}
function floatToFix16 ( float ) {
  return parseInt( float * 0x00010000 );
}
//------------------------------------------------------------------------------
function uploadCharts () {
  var res = chartList;
  for ( var i=0; i<res.length; i++ ) {
    for( var j=0; j<res[i].size; j++ ) {
      res[i].dots[j].x = floatToFix16( res[i].dots[j].x );
      res[i].dots[j].y = floatToFix16( res[i].dots[j].y );
    }
  }
  return res;
}
//------------------------------------------------------------------------------
function loadCharts ( data ) {
  function chartFixToFloat ( input, name ) {
    let output = newSensorData(
      name,
      fix16Tofloat( input.xmax ),
      fix16Tofloat( input.ymax ),
      decodeURI( input.xunit ),
      decodeURI( input.yunit ) );
    output.xmin  = fix16Tofloat( input.xmin );
    output.ymin  = fix16Tofloat( input.ymin );
    output.yunit = decodeURI( input.yunit );
    output.size  = input.size;
    output.dots.length = 0;
    for ( var i=0; i<output.size; i++ ) {
      output.dots.push( {
        x: fix16Tofloat( input.dots[i].x ),
        y: fix16Tofloat( input.dots[i].y ),
      })
    }
    return output;
  }
  //---------------- Oil resetence ----------------
  var sel = getVal( "oilPressureSensorType" );
  if ( sel == 3 ) {
    oilSensorResistance = chartFixToFloat( data[0], "oilSensorResistance" );
  //----------------- Oil current -----------------
  } else if ( sel == 4 ) {
    oilSensorCurrent = chartFixToFloat( data[0], "oilSensorCurrent" );
  }
  //-------------- Coolant resetence --------------
  sel = getVal( "coolantTempSensorType" );
  if ( sel == 3 ) {
    coolantSensorResistance = chartFixToFloat( data[1], "coolantSensorResistance" );
  //--------------- Coolant current ---------------
  } else if ( sel == 4 ) {
    coolantSensorCurrent = chartFixToFloat( data[1], "coolantSensorCurrent" );
  }
  //---------------- Fuel resetence ---------------
  sel = getVal( "fuelLevelSensorType" );
  if ( sel == 3 ) {
    fuelSensorResistance = chartFixToFloat( data[2], "fuelSensorResistance" );
  //----------------- Fuel current ----------------
  } else if ( sel == 4 ) {
    fuelSensorCurrent = chartFixToFloat( data[2], "fuelSensorCurrent" );
  }
  //-----------------------------------------------
  return;
}
//------------------------------------------------------------------------------
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
  let alert = new Alert( "alert-success", triIco, "График успешно сохранен." );
  return;
}

function downloadSensorData () {
	function SaveAsFile ( t, file, m ) {
  	try {
    	var blob = new Blob( [t], { type: m } );
      saveAs( blob, file );
    } catch( e ) {
    	window.open( ( "data:" + m + "," + encodeURIComponent( t ) ), '_blank', '' );
    }
    return;
  }
	saveToCurChart();
	SaveAsFile( JSON.stringify( currentChart ), ( currentChart.name + ".JSON" ), "text/plain;charset=utf-8" );
  return;
}
//------------------------------------------------------------------------------
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
						currentChart = JSON.parse( reader.result );
						makeChart( currentChart );
					} catch( e ) {
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
