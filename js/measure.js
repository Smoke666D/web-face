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
function AxeChartPreset ( max, min, label) {
  return {
    type: 'linear',
    scaleLabel: {
      display:     true,
      labelString: label
    }
  };
}
/*----------------------------------------------------------------------------*/
function MeasureLine ( scale, label ) {
  var self      = this;
  this.initDone = false;
  this.data     = [];
  this.label    = label;
  this.min      = 0;
  this.max      = 0;
  /*----------------------------------------------------------------------------*/
  this.init     = function ( data ) {
    if ( data != undefined ) {
      this.data = data;
    }
    if ( this.initDone == false ) {
      this.min = data[0] * Math.pow( 10, scale )
      for ( var i=0; i<data.length; i++ ) {
        data[i] = data[i] * Math.pow( 10, scale );
        if ( data[i] < this.min ) {
          this.min = data[i];
        }
        if ( data[i] > this.max ) {
          this.max = data[i];
        }
      }
      this.initDone = true;
    }
    return;
  }
  return;
}
/*----------------------------------------------------------------------------*/
function MeasureType ( step ) {
  var self      = this;
  this.initDone = false;
  this.step     = step;
  this.line     = [];
  this.label    = 'сек';
  this.max      = 0;
  this.calcStep = function () {
    if ( this.step > 60 ) {
      this.step  = this.step / 60;
      this.label = 'мин';
      if ( this.step > 60 ) {
        this.step  = this.step / 60;
        this.label = 'ч';
        if ( this.step > 24 ) {
          this.step  = this.step / 60;
          this.label = 'д';
        }
      }
      this.step = Math.floor( this.step );
    }
  }
  this.init     = function () {
    if ( this.initDone == false ) {
      if ( this.line.length > 0 ) {
        this.max = this.line[0].data.length * step;
      }
      this.initDone = true;
    }
    return;
  }
  this.addLine  = function ( line ) {
    this.line.push( line );
    return;
  }
  this.setLabel = function ( label ) {
    this.label = label;
    return;
  }
  this.calcStep();
  return;
}
/*----------------------------------------------------------------------------*/
function MeasureChartType ( step ) {
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
  this.measure  = new MeasureType( step );
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
  function addLine ( n, line, step ) {
    var data  = [];
    var dash  = [ 0, 0 ];
    var color = '#ccc';
    if ( line.data == undefined ) {
      line.data = [];
    }
    for ( i=0; i<line.data.length; i++ ) {
      data.push({
        x: i * step,
        y: line.data[i],
      });
    }
    if ( n >= colorList.length ) {
      dash  = [ 10, 5 ];
      var counter = Math.floor( n / colorList.length );
      color = colorList[ n - ( counter * colorList.length ) ];
    } else {
      color = colorList[n];
    }
    dataChart.data.datasets.push( new DataChartPreset( color, data, line.label, dash ) );
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
  this.setData   = function ( data ) {
    this.measure = data;
    this.setup();
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
  this.setup     = function () {
    cleanDataset();
    this.measure.init();
    dataChart.options.scales.xAxes[0].ticks.max              = this.measure.max;
    dataChart.options.scales.xAxes[0].ticks.min              = 0;
    dataChart.options.scales.xAxes[0].scaleLabel.labelString = this.measure.label;
    for ( var i=0; i<this.measure.line.length; i++ ) {
      addLine( i, this.measure.line[i], this.measure.step );
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
function measureUpdate ( buffer, scales, lables ) {
  var data      = [];
  var line      = null;
  var lineArray = new MeasureType( 1 );
  for ( var i=0; i<buffer[0].length; i++ ) {
    data = [];
    for ( var j=0; j<buffer.length; j++ ) {
      data.push( buffer[j][i] );
    }
    line = new MeasureLine( scales[i], lables[i] );
    line.init( data );
    lineArray.addLine( line );
  }
  measureChartStruct.setData( lineArray );
  return;
}
/*----------------------------------------------------------------------------*/
function MeasureRecord () {
  var self = this;
  var time = null;
  var acc  = 0;
  var data = [];
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
  this.records = [];
  return;
}
/*----------------------------------------------------------------------------*/
function measureRedraw () {
  let n = document.getElementById( 'measureList' ).value;
  measrement[n];
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
  for ( var i=0; i<measurement.length; i++ ) {
    var opt = document.createElement( 'option' );
    opt.value     = i;
    opt.innerHTML = measurement[i].time.toLocaleString().replace( ',', '' );
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
              measurement = data;
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
  var testData = new MeasureType( 1 );
  var line     = null;
  var dd       = [];
  measureChartStruct = new MeasureChartType( 1 );
  measureChartStruct.init();
/*
  for ( var i=0; i<8; i++ ) {
    dd = [];
    for ( var j=0; j<1200; j++ ) {
      dd.push( ( i + 1 ) * Math.sin( i * ( Math.PI / 3 ) + j * 0.01 ) );
    }
    line = new MeasureLine( 1, i );
    line.init( dd );
    testData.addLine( line );
  }
  measureChartStruct.setData( testData );
*/
  return;
}
