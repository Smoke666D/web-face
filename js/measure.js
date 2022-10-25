/*----------------------------------------------------------------------------*/
var colorList = [
  '#f8b739',
  '#b739f8',
  '#39f8b7',
  '#f8397a',
  '#397af8',
  '#7af839',
  '#6e3a07',
  '#ccc'
];
var dataChart          = null;
var measureChartStruct = null;
var measureBuffer      = [];
var measurements       = [];
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function DataChartPreset ( color, data, label, dash ) {
  return {
    label:                label,
    data:                 data,
    fill:                 false,
    backgroundColor:      color,
    borderColor:          color,
    pointBorderColor:     color,
    pointBackgroundColor: color,
    pointHitRadius:       30,
    pointHoverRadius:     10,
    showLine:             true,
    lineTension:          0,
    pointRadius:          0,
    borderDash:           dash,
  };
}
/*----------------------------------------------------------------------------*/
function Coordinate ( x, y ) {
  this.x = x;
  this.y = y;
}
function MeasureLine ( label = "none" ) {
  var self      = this;
  this.data     = [];
  this.initDone = false;
  this.label    = label;
  this.min      = null;
  this.max      = null;
  this.start    = null;
  this.end      = null;
  /*----------------------------------------------------------------------------*/
  this.init     = function () {
    if ( self.initDone == false ) {
      self.min   = self.data[0].y;
      self.max   = self.data[0].y;
      self.start = self.data[0].x;
      self.end   = self.data[0].x
      for ( var i=1; i<self.data.length; i++ ) {
        if ( self.data[i].y < self.min ) {
          self.min = self.data[i].y;
        }
        if ( self.data[i].y > self.max ) {
          self.max = self.data[i].y;
        }
        if ( self.data[i].x < self.start ) {
          self.start = self.data[i].x;
        }
        if ( self.data[i].x > self.end ) {
          self.end = self.data[i].x;
        }
      }
      self.initDone = true;
    }
    return;
  }
  this.add = function ( x, y ) {
    self.data.push( new Coordinate( x, y ) );
    return;
  }
  this.clean = function () {
    self.data = [];
  }
  this.get   = function ( n ) {
    return self.data[n];
  }
  return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function MeasureChartType () {
  var self      = this;
  var dataset   = null;
  var options   = null;
  var axePreset = {
    type: 'linear',
    scaleLabel: {
      display:     true,
      labelString: ''
    },
    ticks: {
      max: 10,
      min: 0
    }
  };
  this.data  = null;
  function cleanDataset () {
    dataChart.data.datasets = [];
    return;
  }
  function cleanChart () {
    dataset = {
      datasets: []
    };
    options = {
      legend: {
        display: true,
      },
      dragData: false,
      dragX: false,
      dragDataRound: 2,
      scales: {
        yAxes: [{
          type: 'linear',
          scaleLabel: {
            display: true,
          }}],
        xAxes: [{
          type: 'linear',
          scaleLabel: {
            display:     true,
            labelString: ''
          },
          ticks: {
            max: 10,
            min: 0
          }
        }]
      },
    pan: {
      enabled: false
    },
    zoom: {
      enabled: true,
      drag: true,
      mode: "xy",
      limits: {
        max: 10,
        min: 0.5
      }
    }
    };
    return;
  }
  function addLine ( n, line ) {
    var dash  = [ 0, 0 ];
    var color = '#ccc';
    if ( n >= colorList.length ) {
      dash  = [ 10, 5 ];
      var counter = Math.floor( n / colorList.length );
      color = colorList[ n - ( counter * colorList.length ) ];
    } else {
      color = colorList[n];
    }
    dataChart.data.datasets.push( new DataChartPreset( color, line.data, line.label, dash ) );
    return;
  }
  this.init      = function () {
    cleanChart();
    dataChart = new Chart( measureChart, {
      type:    'scatter',
      data:    dataset,
      options: options
    });
    return;
  }
  this.setData   = function ( data, label ) {
    self.data = data;
    self.setup( label );
    dataChart.update();
    return;
  }
  this.resetZoom = function () {
    dataChart.resetZoom();
    return;
  }
  this.clean     = function () {
    cleanDataset();
    dataChart.update();
    return;
  }
  this.setup     = function ( label ) {
    cleanDataset();
    dataChart.options.scales.xAxes[0].ticks.max              = self.data[0].start;
    dataChart.options.scales.xAxes[0].ticks.min              = self.data[0].end;
    dataChart.options.scales.xAxes[0].scaleLabel.labelString = label;
    for ( var i=0; i<self.data.length; i++ ) {
      addLine( i, self.data[i] );
    }
    return;
  }
  return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function measureClean () {
  measureChartStruct.clean();
  return;
}
/*----------------------------------------------------------------------------*/
function MeasureRecord () {
  var self  = this;
  var time  = null;
  var acc   = 0;
  var data  = [];
  this.makeTime = function () {
    time = new Date( ( GET_LOG_YEAR( acc ) + 2000 ),
                     GET_LOG_MONTH( acc ),
                     GET_LOG_DAY( acc ),
                     GET_LOG_HOUR( acc ),
                     GET_LOG_MIN( acc ),
                     GET_LOG_SEC( acc ) );            
    return;
  }
  this.add = function ( adr, input ) {
    let buffer = parseInt( input ) & 0xFFFFFFFF;
    if ( adr < outputReg.length ) {
      data.push( ( buffer * Math.pow( 10, outputReg[adr].scale )).toFixed( Math.abs( outputReg[adr].scale ) ) );
    } else if ( adr == outputReg.length ) {
      acc |= ( ( buffer & 0xFFFF ) << 16 );
    } else if ( adr == ( outputReg.length + 1 ) ) {
      acc |= buffer & 0xFFFF;
    } else {

    }
    return;
  }
  this.getTime = function () {        
    return time;
  }
  this.get = function ( n ) {
    return( data[n] ); 
  }
  return;
}
function MeasureSet () {
  var self     = this;
  this.time    = null;
  this.legend  = [];
  this.labels  = [];
  this.records = [];
  return;
}
/*----------------------------------------------------------------------------*/
function measureRedraw () {
  let n       = document.getElementById( 'measureList' ).value;
  let dataSet = measurements[n];
  let data    = [];
  for ( var i=0; i<( dataSet.legend.length - 2 ); i++ ) {
    data.push( new MeasureLine() );
  }
  let timeDelta = ( dataSet.records[dataSet.records.length - 1].getTime() - dataSet.records[0].getTime() ) / 1000;
  let timeStep  = timeDelta / ( dataSet.records.length - 1 );
  let label     = 'сек';

  if ( timeStep > 60 ) {
    timeStep  = timeStep / 60;
    label     = 'мин';
    if ( timeStep > 60 ) {
      timeStep = timeStep / 60;
      label    = 'ч';
      if ( timeStep > 24 ) {
        timeStep  = timeStep / 60;
        label     = 'д';
      }
    }
    timeStep = Math.floor( timeStep );
  }
  for ( var i=0; i<dataSet.records.length; i++ ) {
    for ( var j=0; j<( dataSet.legend.length - 2 ); j++ ) {
      data[j].add( ( i * timeStep ), dataSet.records[i].get( j ) );
    }
  }
  for ( var i=0; i<data.length; i++ ) {
    data[i].init();
    data[i].label = dataSet.labels[i];
  }
  measureChartStruct.setData( data, label );
  return;
}
/*----------------------------------------------------------------------------*/
function parseMeasureLines ( lines, callback ) {
  let output  = [];
  let current = 0;
  let legendLength = 0;
  let error   = false;
  for ( var i=0; i<lines.length; i++ ) {
    if ( lines[i].startsWith( '//' ) ) {
      output.push( new MeasureSet() );
      lines[i] = lines[i].slice( 2 );
      current  = output.length - 1;
      let data = lines[i].split( '.' );
      if ( data.length != 6 ) {
        error = true;
        break;
      } else {
        let sub = data[5].split( ' ' );
        if ( sub.length >= 3 ) {
          output[current].time = new Date( ( parseInt( data[0] ) + 2000 ), data[1], data[2], data[3], data[4], sub[0] );
          if ( output[current].time == "Invalid Date" ) {
            error = true;
            break;
          } else {
            for ( var j=1; j<sub.length; j++ ) {
              output[current].legend.push( parseInt( sub[j] ) );
            }
            for ( var j=2; j<output[current].legend.length; j++ ) {
              output[current].labels.push( outputReg[ output[current].legend[j] ].str + ', ' + outputReg[ output[current].legend[j] ].units )
            }
            legendLength = sub.length - 1;
          }
        } else {
          error = true;
          break;
        }
      }
    } else {
      let data = lines[i].split( ' ' );
      if ( data.length == legendLength ) {
        output[current].records.push( new MeasureRecord );
        let last = output[current].records.length - 1;
        for ( var j=0; j<data.length; j++ ) {
          let buf = parseInt( data[j] );
          output[current].records[last].add( output[current].legend[j], buf );
        }
        output[current].records[last].makeTime();
      } else if ( ( data.length == 1 ) && ( data[0] == "" ) ) {
      } else {
        error = true;
        break;
      }
    }
  };
  callback( output, error );
  return;
}
/*----------------------------------------------------------------------------*/
function updateMeasureInterface () {
  let select = document.getElementById( 'measureList' );
  while ( select.options.length > 0 ) {
    select.remove( 0 );
  }
  for ( var i=0; i<measurements.length; i++ ) {
    var opt = document.createElement( 'option' );
    opt.value     = i;
    opt.innerHTML = measurements[i].time.toLocaleString().replace( ',', '' );
    select.appendChild( opt );
  }
  return;
}
/*----------------------------------------------------------------------------*/
function measureLoad () {
  var data      = null;
  var line      = null;
  var lineArray = null;
  if ( window.File && window.FileReader && window.FileList && window.Blob ) {
		var input = document.createElement( "input" );
    input.setAttribute( "type", "file" );
		input.addEventListener( "change", function() {
			file = input.files[0];
			if ( file.type != "text/plain" ) {
        let alert = new Alert( "alert-warning", triIco, "Выбран файл с неправильным расширением. Выберете TXT файл" );
			} else {
				let reader = new FileReader();
        reader.readAsText( file );
				reader.onload = function () {
          parseMeasureLines( reader.result.split( '\n' ), function ( data, error ) {
            if ( error == false ) {
              measurements = data;
              updateMeasureInterface();
              measureRedraw();
            } else {
              let alert = new Alert( "alert-warning", triIco, "Неправильный формат файла" );  
            }
          });
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
/*----------------------------------------------------------------------------*/
function measureChartInit () {
  measureChartStruct = new MeasureChartType();
  measureChartStruct.init();
  return;
}
