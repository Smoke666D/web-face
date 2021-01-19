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
function MeasureLine ( data, scale, label ) {
  var self      = this;
  this.initDone = false;
  this.data     = data;
  this.label    = label;
  this.min      = 0;
  this.max      = 0;
  this.init     = function () {
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
  this.init = function () {
    if ( this.initDone == false ) {
      if ( this.line.length > 0 ) {
        this.max = this.line[0].data.length * step;
      }
      this.initDone = true;
    }
    return;
  }
  this.addLine = function ( line ) {
    line.init();
    this.line.push( line );
    return;
  }
  this.calcStep();
  return;
}
/*----------------------------------------------------------------------------*/
function MeasureChartType ( measure ) {
  var self    = this;
  var dataset = null;
  var options = null;

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


  this.measure = measure;

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
      enabled: true,
      mode: "x",
      speed: 100,
      threshold: 100
    },
    zoom: {
      enabled: true,
      drag: false,
      mode: "x",
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

    dataset.datasets.push( new DataChartPreset( color, data, line.label, dash ) );
    return;
  }

  this.init = function () {
    dataChart = new Chart( measureChart, {
      type:    'scatter',
      data:    dataset,
      options: options
    });
    return;
  }

  this.resetZoom = function () {
    dataChart.resetZoom();
    return;
  }

  this.setup = function () {
    cleanChart();
    this.measure.init();
    options.scales.xAxes[0].ticks.max              = this.measure.max;
    options.scales.xAxes[0].ticks.min              = 0;
    options.scales.xAxes[0].scaleLabel.labelString = this.measure.label;
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
function measureChartInit () {
  var testData = new MeasureType( 1 );
  var line     = null;
  var dd       = [];
  for ( var i=0; i<8; i++ ) {
    dd = [];
    for ( var j=0; j<1200; j++ ) {
      dd.push( (i+1)*Math.sin( i*(Math.PI/3) + j*0.01 ) );
    }
    line = new MeasureLine( dd, 1, i );
    testData.addLine( line );
  }
  measureChartStruct = new MeasureChartType( testData );
  measureChartStruct.setup();
  measureChartStruct.init();
  return;
}
