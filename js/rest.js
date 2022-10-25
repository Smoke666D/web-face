const remote      = require( 'electron' ).remote;
var   declareDone = 0;
var   ethBusy     = 0;
var   ethLoopEnb  = 1;
var   diList;
var   doList;
var   stringLineArray = [];
var   progressArray   = [];
var   slidersArray    = [];
var   switcherArray   = [];
var   selectorArray   = [];
var   radioArray      = [];
var   rtcTime;
var   measurement;
var   freeDataArray   = [];
var   freeDataValue   = [];
var   freeDataNames   = [
  "engineWorkTimeData",           /*  0 */
  "engineWorkMinutesData",        /*  1 */
  "engineStartsNumberData",       /*  2 */
	"maintenanceAlarmOilTimeLeft",  /*  3 */
	"maintenanceAlarmAirTimeLeft",  /*  4 */
	"maintenanceAlarmFuelTimeLeft", /*  5 */
  "powerReactiveUsage",           /*  6 */
  "powerActiveUsage",             /*  7 */
  "powerFullUsage",               /*  8 */
  "fuelUsageData",                /*  9 */
  "fuelRateData",                 /* 10 */
	"fuelAverageSizeData",          /* 11 */
	"sdSizeLowData",                /* 12 */
	"sdSizeHightData",              /* 13 */
	"sdFreeLowData",                /* 14 */
	"sdFreeHight",                  /* 15 */
];
var   logArray             = [];
const logMaxSize           = 255;
const userTypeA = 39;
const userTypeB = 40;
const userTypeC = 41;
const userTypeD = 42;
const logUserTypesDictionary = [
  " Пользовательский А",
  " Пользовательский B",
  " Пользовательский C",
  " Пользовательский D",
];
const logTypesDictionary = [
  "Нет",                               /* 00 */
  "Внешная аварийная остановка",       /* 01 */
  "Ошибка пуска двигателя",            /* 02 */
  "Ошибка остановки двигателя",        /* 03 */
  "Низкое давление масла",             /* 04 */
  "Ошибка датчика давления масла",     /* 05 */
  "Высокая температура ОЖ",            /* 06 */
  "Ошибка датчика температуры ОЖ",     /* 07 */
  "Низкий уровень топлива",            /* 08 */
  "Высокий уровень топлива",           /* 09 */
  "Ошибка датчика топлива",            /* 10 */
  "Высокие обороты",                   /* 11 */
  "Низкие обороты",                    /* 12 */
  "Ошибка датчика оборотов",           /* 13 */
  "Ошибка зарядного устройства",       /* 14 */
  "Низкое напряжение АКБ",             /* 15 */
  "Высокое напряжение АКБ",            /* 16 */
  "Низкое напряжение генератора",      /* 17 */
  "Высокое напряжение генератора",     /* 18 */
  "Низкая частота генератора",         /* 19 */
  "Высокая частота генератора",        /* 20 */
  "Перекос фаз",                       /* 21 */
  "Перегрузка по току",                /* 22 */
  "Перегрузка по мощности",            /* 23 */
  "Короткое замыкание",                /* 24 */
  "Низкое напряжение сети",            /* 25 */
  "Высокое напряжение сети",           /* 26 */
  "Низкая частота сети",               /* 27 */
  "Высокая частота сети",              /* 28 */
  "ТО масло",                          /* 29 */
  "ТО воздух",                         /* 30 */
  "ТО топливо",                        /* 31 */
  "Двигатель запущен",                 /* 32 */
  "Двигатель остановлен",              /* 33 */
  "Сеть востановлена",                 /* 34 */
  "Ошибка сети",                       /* 35 */
  "Прерванный старт",                  /* 36 */
  "Прерванная остановка",              /* 37 */
	"Ошибка общего провода датчиков",    /* 38 */
	"Пользователькое событие А",         /* 39 */
  "Пользователькое событие B",         /* 40 */
  "Пользователькое событие C",         /* 41 */
  "Пользователькое событие D",         /* 42 */
  "Ошибка чередования фаз сети",       /* 43 */
  "Ошибка чередования фаз генератора", /* 44 */
  "Утечка топлива"                     /* 45 */
];
const logActionsDictionary = [
  "Нет",                            /* 0 */
  "Предупреждение",                 /* 1 */
  "Аварийная остановка",            /* 2 */
  "Отключение",                     /* 3 */
  "Плановая остановка",             /* 4 */
  "Остановка до устранения ошибки", /* 5 */
  "Запрет следующего старта",       /* 6 */
  "Автостарт",                      /* 7 */
  "Автостоп"                        /* 8 */
]; 
/*----------------------------------------------------------------------------*/
const HTTP_TIMEOUT = 5000;
/*----------------------------------------------------------------------------*/
const  LOG_DAY_MASK    = 0xF8000000;
const  LOG_DAY_SHIFT   = 27;
const  LOG_MONTH_MASK  = 0x07800000;
const  LOG_MONTH_SHIFT = 23;
const  LOG_YEAR_MASK   = 0x007E0000;
const  LOG_YEAR_SHIFT  = 17;
const  LOG_HOUR_MASK   = 0x0001F000;
const  LOG_HOUR_SHIFT  = 12;
const  LOG_MIN_MASK    = 0x00000FC0;
const  LOG_MIN_SHIFT   = 6;
const  LOG_SEC_MASK    = 0x0000003F;
const  LOG_SEC_SHIFT   = 0;
/*----------------------------------------------------------------------------*/
function  GET_LOG_DAY ( d ) {
  return ( new Uint32Array( [( ( d  & LOG_DAY_MASK ) >> LOG_DAY_SHIFT ) & 0x1F ] ) )[0];
}
function  GET_LOG_MONTH ( d ) {
  let out = ( d & LOG_MONTH_MASK ) >> LOG_MONTH_SHIFT;
  out     = ( new Uint32Array( [out] ) )[0];
  return out;
}
function  GET_LOG_YEAR ( d ) {
  let out =  ( d & LOG_YEAR_MASK  ) >> LOG_YEAR_SHIFT;
  out     = ( new Uint32Array( [out] ) )[0];
  return out;
}
function  GET_LOG_HOUR ( d ) {
  let out =  ( d & LOG_HOUR_MASK  ) >> LOG_HOUR_SHIFT;
  out     = ( new Uint32Array( [out] ) )[0];
  return out;
}
function  GET_LOG_MIN ( d ) {
  let out =  ( d & LOG_MIN_MASK   ) >> LOG_MIN_SHIFT;
  out     = ( new Uint32Array( [out] ) )[0];
  return out;
}
function  GET_LOG_SEC ( d ) {
  let out =  ( d & LOG_SEC_MASK   ) >> LOG_SEC_SHIFT;
  out     = ( new Uint32Array( [out] ) )[0];
  return out;
}
function  SET_LOG_DATE ( day, month, year, hour, min, sec ) {
  return ( day   << LOG_DAY_SHIFT   ) |
         ( month << LOG_MONTH_SHIFT ) |
         ( year  << LOG_YEAR_SHIFT  ) |
         ( hour  << LOG_HOUR_SHIFT  ) |
         ( min   << LOG_MIN_SHIFT   ) |
         ( sec   << LOG_SEC_SHIFT   );
}
function compareTime ( lesser, greater ) {
	let res = false;
	if ( GET_LOG_YEAR( greater ) > GET_LOG_YEAR( lesser ) ) {
		res = true;
	} else if ( GET_LOG_YEAR( greater ) == GET_LOG_YEAR( lesser ) ) {
		if ( GET_LOG_MONTH( greater ) > GET_LOG_MONTH( lesser ) ) {
			res = true;
		} else if ( GET_LOG_MONTH( greater ) == GET_LOG_MONTH( lesser ) ) {
			if ( GET_LOG_DAY( greater ) > GET_LOG_DAY( lesser ) ) {
				res = true;
			} else if ( GET_LOG_DAY( greater ) == GET_LOG_DAY( lesser ) ) {
				if ( GET_LOG_HOUR( greater ) > GET_LOG_HOUR( lesser ) ) {
					res = true;
				} else if ( GET_LOG_HOUR( greater ) == GET_LOG_HOUR( lesser ) ) {
					if ( GET_LOG_MIN( greater ) > GET_LOG_MIN( lesser ) ) {
						res = true;
					} else if ( GET_LOG_MIN( greater ) == GET_LOG_MIN( lesser ) ) {
						if ( GET_LOG_SEC( greater ) > GET_LOG_SEC( lesser ) ) {
							res = true;
						}
					}
				}
			}
		}
	}
	return res;
}
/*----------------------------------------------------------------------------*/
function bitVal ( n, reg ) {
  return ( reg.value & reg.bit[n].mask ) >> reg.bit[n].shift;
}
/*----------------------------------------------------------------------------*/
function bitWrite ( n, reg, val ) {
	reg.value = ( reg.value & ( ~reg.bit[n].mask ) ) | ( val << reg.bit[n].shift );
	return;
}
/*----------------------------------------------------------------------------*/
function StrLine ( name ) {
	var self    = this;
	this.name   = name.slice( 0, name.length - 1 );
  this.regNum = []
  this.object = null;

	this.getData = function() {
    for ( var j=0; j<4; j++ ) {
      for ( var i=0; i<dataReg.length; i++ ) {
  			if ( dataReg[i].name == ( self.name + j ) ) {
  				self.regNum.push( i );
  			}
  		}
    }
		return;
	}
	this.init    = function() {
		self.object = document.getElementById( self.name );
		self.getData();
		return;
	}
	this.update  = function() {
		var text   = "";
    var buffer = [];
    self.regNum.forEach( function( n, i ) {
      reg = dataReg[n];
      for ( var i=0; i<reg.len; i++ ) {
  			text += reg.value[i];
  		}
    });
		self.object.value = text;
		return;
	}
	this.grab    = function() {
		var text = this.object.value;
    for ( var n=0; n<self.regNum.length; n++) {
      for ( var i=0; i<dataReg[self.regNum[n]].len; i++ ) {
        if ( i < text.length ) {
  			  dataReg[self.regNum[n]].value[i] = text.charAt( i + n * dataReg[self.regNum[n]].len );
        } else {
          dataReg[self.regNum[n]].value[i] = " ";
        }
      }
    }
		return;
	}
	this.init();
	if ( this.object ) {
		this.update();
	}
	return;
}
/*----------------------------------------------------------------------------*/
function Switch ( name ) {
  var self     = this;
	this.name    = name;
	this.getData = function() {
		for ( var i=0; i<dataReg.length; i++ ) {
			if ( dataReg[i].bitMapSize > 0 ) {
				for ( var j=0; j<dataReg[i].bitMapSize; j++ ) {
					if ( dataReg[i].bit[j].name == this.name ) {
						this.regNum = i;
						this.bitNum = j;
					}
				}
			}
		}
		return;
	}
	this.getVal  = function() {
		return bitVal( this.bitNum, dataReg[this.regNum] );
	}
	this.setVal  = function( input ) {
		bitWrite( this.bitNum, dataReg[this.regNum], input );
		return;
	}
	this.init    = function() {
		this.object = document.getElementById( name );
		this.getData();
		return;
	}
	this.update  = function() {
    if ( this.object ) {
      this.object.checked = this.getVal();
      this.object.dispatchEvent( new Event( 'change' ) );
    }
		return;
	}
	this.grab    = function() {
		if ( this.object.checked > 0 ) {
			this.setVal( 1 );
		} else {
			this.setVal( 0 );
		}
		return;
	}
	this.init();
	return;
}
/*----------------------------------------------------------------------------*/
function Progress ( name ) {
	var self     = this;
	this.name    = name;
	this.getData = function() {
		for ( var i=0; i<dataReg.length; i++ ){
			if ( dataReg[i].name == name ) {
				this.regNum = i;
			}
		}
		return;
	}
	this.init    = function() {
		this.getData();
		this.object = document.getElementById( "progress-" + this.name );
		this.object.style.width = "0%";
		swName = this.name.replace( "TimeLeft", "" ) + "Enb";
		this.resetSw = document.getElementById( "reset-" + this.name );
		this.sw      = new Switch( swName );
		if ( this.sw.object ) {
			this.enable = this.sw.getVal();
			if ( this.checked ) {
				self.object.disabled = false;
				if ( self.resetSw != null )	{
					self.resetSw.disabled = false;
				}
			} else {
				self.object.disabled = true;
				if ( self.resetSw != null )	{
					self.resetSw.disabled = true;
				}
			}
			this.sw.object.addEventListener( 'click', function() {
				if ( this.checked ) {
					self.object.disabled = false;
					if ( self.resetSw != null )	{
					  self.resetSw.disabled = false;
					}
				} else {
					self.object.disabled = true;
					if ( self.resetSw != null )	{
					  self.resetSw.disabled = true;
					}
				}
			});
		} else {
			this.enable = 1;
			if ( this.resetSw != null )	{
			  this.resetSw.disabled = false;
			}
		}
    return;
	}
	this.update  = function() {
		if ( this.object != null ) {
			var val = dataReg[this.regNum].value / dataReg[this.regNum].max * 100;
			this.object.style.width = val.toString() + '%';
		}
    return;
	}
	this.init();
	if ( this.object ) {
		this.update();
	}
  return;
}
/*----------------------------------------------------------------------------*/
function Select ( name ) {
	var self     = this;
	this.name    = name;
	this.getData = function() {
		for ( var i=0; i<dataReg.length; i++ ){
			if ( dataReg[i].bitMapSize > 0 ) {
				for ( var j=0; j<dataReg[i].bitMapSize; j++ ) {
					if ( dataReg[i].bit[j].name == this.name ) {
						this.regNum = i;
						this.bitNum = j;
					}
				}
			}
		}
		return;
	}
	this.getVal  = function() {
		return this.object.value;
	}
	this.init    = function() {
		this.getData();
		this.object = document.getElementById( this.name );
		swName = this.name.replace( "Action", "" ) + "Enb";
		this.sw = new Switch( swName );
		if ( this.sw.object ) {
			this.enable = this.sw.getVal();
			this.sw.object.addEventListener( 'click', function() {
				if ( this.checked ) {
					self.object.disabled = false;
				} else {
					self.object.disabled = true;
				}
			});
		} else {
			this.enable = 1;
		}
		if ( name.endsWith( "SensorType" ) ) {
			this.object.addEventListener( 'change', function() {
				if ( self.object.value > 2 ) {
					self.button.disabled = false;
				} else {
					self.button.disabled = true;
				}
			})
		}
		return;
	}
	this.update  = function() {
		if ( this.object != null ) {
			this.object.value = bitVal( this.bitNum, dataReg[this.regNum] );
      if ( this.sw.object ) {
  			this.enable = this.sw.getVal();
      }
			if ( this.enable == 1 ) {
				this.object.disabled = false;
			} else {
				this.object.disabled = true;
			}
			if ( name.endsWith( "SensorType" ) ) {
				this.button = document.getElementById( this.name.replace( "Type", "" ) + "Setup" );
				if ( this.object.value > 2 ) {
					this.button.disabled = false;
				} else {
					this.button.disabled = true;
				}
			}
		}
		return;
	}
	this.grab    = function() {
		if ( this.object != null ) {
			bitWrite( this.bitNum, dataReg[this.regNum], this.object.value );
		}
		return;
	}
	this.init();
	if ( this.object ) {
		this.update();
	}
	return;
}
/*----------------------------------------------------------------------------*/
function Radio ( name ) {
	this.name    = name;
	this.getData = function() {
		for ( var i=0; i<dataReg.length; i++ ) {
			if ( dataReg[i].bitMapSize > 0 ) {
				for ( var j=0; j<dataReg[i].bitMapSize; j++ ) {
					if ( dataReg[i].bit[j].name == ( this.name ) ) {
						this.regNum = i;
						this.bitNum = j
					}
				}
			}
		}
		return;
	}
	this.init    = function() {
		this.getData();
		this.objectNO = document.getElementById( this.name.replace( "NOC", "" ) + "NO" );
		this.objectNC = document.getElementById( this.name.replace( "NOC", "" ) + "NC" );
		this.sw       = null;
		this.enable   = 1;
		return;
	}
	this.update  = function() {
		if ( ( this.objectNO ) && ( this.objectNC ) ) {
			if ( bitVal( this.bitNum, dataReg[this.regNum] ) == 0 ) {
				this.objectNO.checked = true;
			} else {
				this.objectNC.checked = true;
			}
		}
		return;
	}
	this.grab    = function() {
		if ( ( this.objectNO ) && ( this.objectNC ) ) {
			if ( this.objectNC.checked == true ) {
				bitWrite( this.bitNum, dataReg[this.regNum], 1 );
			} else {
				bitWrite( this.bitNum, dataReg[this.regNum], 0 );
			}
		}
		return;
	}
	this.init();
	if ( ( this.objectNO ) && ( this.objectNC ) ) {
		this.update();
	}
	return;
}
/*----------------------------------------------------------------------------*/
function Slider ( name, preInit ) {
	var self  = this;
	this.name = name;
	/*--------------------------------------------------------------------------*/
	this.getData     = function () {
		for ( var i=0; i<dataReg.length; i++ ) {
			if ( dataReg[i].name == name )
			{
				this.regNum = i;
			}
		}
		return;
	}
  this.enableCheck = function () {
    if ( this.sw.object ) {
      if ( this.sw.object.checked ) {
        self.enable         = 1
        self.input.disabled = false;
        self.slider.removeAttribute( 'disabled' );
      } else {
        self.enable         = 0
        self.input.disabled = true;
        self.slider.setAttribute( 'disabled', false );
      }
    }
    return;
  }
	this.init        = function() {
		this.getData();
		this.slider = document.getElementById( "s-slider-" + this.name );
		this.input  = document.getElementById( "sinput-" + this.name );
		this.label  = document.getElementById( "label-" + this.name );
		var swName = this.name;
		if ( this.name.endsWith( "Level" ) ) {
			swName = swName.substring( 0, ( swName.length - 5 ) );
		}
		if ( this.name.endsWith( "Time" ) ) {
			swName = swName.substring( 0, ( swName.length - 4 ) );
		}
		if ( this.name.endsWith( "Delay" ) ) {
			swName = swName.substring( 0, ( swName.length - 5 ) );
		}
		swName = swName.replace( "On", "" );
		swName = swName.replace( "Off", "" );
		this.sw = new Switch( swName + "Enb" )
		if ( this.sw.object ) {
			self.enable = this.sw.getVal();
			this.sw.object.addEventListener( 'change', function() {
				self.enableCheck();
			});
		} else {
			this.enable = 1;
		}
		return;
	}
	this.calcScale   = function() {
		this.scl = Math.pow( 10, dataReg[this.regNum].scale );
		return;
	}
	this.update      = function() {
		reg = dataReg[this.regNum];
		try {
      for ( var i=0; i<reg.units.length; i++ ) {
        if ( reg.units.charCodeAt( i ).toString( 16 ) == 0 ) {
          reg.units = reg.units.substring( 0, i );
        }
      }
		  this.label.textContent = reg.units;
		  if ( this.enable == 1 ) {
			  this.input.disabled = false;
			  this.slider.removeAttribute( 'disabled' );
		  } else {
			  this.input.disabled = true;
			  this.slider.setAttribute( 'disabled', false );
		  }
		  this.calcScale();
		  this.input.value = reg.value * this.scl;
		  this.input.step  = this.scl;
		  this.input.addEventListener( 'change', function() {
			  self.value = parseFloat( self.value ).toFixed( calcFracLength( self.scl ) );
		  });
		  this.slider.noUiSlider.updateOptions({
			  step: 	this.scl,
			  start: [reg.value * this.scl],
			  range: {
				  'min': (reg.min * this.scl),
				  'max': (reg.max * this.scl)
			  }
		  });
      this.enableCheck();
	  } catch (e) {
		  console.log( "error on: " + this.name );
	  }
		return;
	}
	this.grab        = function() {
		this.calcScale();
		val = parseFloat( this.input.value ) / Math.pow( 10, dataReg[this.regNum].scale )
		dataReg[this.regNum].value = parseFloat( val.toFixed( 0 ) );
		return;
	}
	/*--------------------------------------------------------------------------*/
	this.init();
	if ( ( this.slider ) && ( this.input ) ) {
		this.update();
	}
	/*--------------------------------------------------------------------------*/
	return;
}
/*----------------------------------------------------------------------------*/
function LogRecord ( type, action, time ) {
  var self    = this;
  this.type   = type;
  this.action = action;
  this.time   = time;
}
/*----------------------------------------------------------------------------*/
function sortingLog () {
	let buffer  = [];
	let sorter  = logArray;
	let current = sorter[0];
	let pointer = 0;
	
	while ( buffer.length < logArray.length ) {
		for ( var i=1; i<sorter.length; i++ ) {
			if ( compareTime( current.time, sorter[i].time ) == true ) {
				current = sorter[i];
				pointer = i;
			}
		};
		buffer.push( current );
		let rem = [];
		for ( var i=0; i<sorter.length; i++ ) {
			if ( i != pointer ) {
				rem.push( sorter[i] );
			}
		}
		sorter  = rem;
		current = sorter[0];
		pointer = 0
	}
  logArray = buffer;
  return;
}
/*----------------------------------------------------------------------------*/
function getLogType ( type ) {
  let res = "";
  let adr = 0;
  if ( ( type < userTypeA ) || ( type > userTypeD ) ) {
    res = logTypesDictionary[type];
  } else {
    switch ( type ) {
      case userTypeA:
        adr = 36;
        break;
      case userTypeB:
        adr = 39;
        break;
      case userTypeC:
        adr = 42;
        break;
      case userTypeD:
        adr = 45;
        break;
    }
    for ( var i=0; i<dataReg[adr].len; i++ ) {
      res += dataReg[adr].value[i];
    }
    if ( res == "                " ) {
      switch ( type ) {
        case userTypeA:
          res = logUserTypesDictionary[0];
          break;
        case userTypeB:
          res = logUserTypesDictionary[1];
          break;
        case userTypeC:
          res = logUserTypesDictionary[2];
          break;
        case userTypeD:
          res = logUserTypesDictionary[3];
          break;
      }
    }
  }
  return res;
}
function redrawLogTable () {
  var table = document.getElementById( 'log-body' );
  var j     = 0;
  while ( table.rows[0] ) {
    table.deleteRow(0);
  }
  if ( logArray.length > 0 ) {
    sortingLog();
  }
  for ( var i=0; i<logArray.length; i++ ) {
    if ( logArray[i].time != 0 ) {
      let row = table.insertRow(j);
      cell = row.insertCell(0);
      cell.textContent = j + 1;
      cell = row.insertCell(1);
      cell.textContent = ('0' + GET_LOG_DAY( logArray[i].time   ) ).slice(-2) + '.' +
                         ('0' + GET_LOG_MONTH( logArray[i].time ) ).slice(-2) + '.' +
                         ( GET_LOG_YEAR( logArray[i].time ) + 2000 );
      cell = row.insertCell(2);
      cell.textContent = ('0' + GET_LOG_HOUR( logArray[i].time ) ).slice(-2) + ':' +
                         ('0' + GET_LOG_MIN( logArray[i].time  ) ).slice(-2) + ':' +
                         ('0' + GET_LOG_SEC( logArray[i].time  ) ).slice(-2);
      cell = row.insertCell(3);
      cell.textContent = getLogType( logArray[i].type );
      cell = row.insertCell(4);
      cell.textContent = logActionsDictionary[logArray[i].action];
      if ( logArray[i].action == 1 ) {
        row.className  = "table-warning";
      } else if ( ( logArray[i].action == 2 ) || ( logArray[i].action == 3 ) ) {
        row.className  = "table-danger";
      } else {

      }
      j++;
    }
  }
  return;
}
function loadLogFromFile () {
	if ( window.File && window.FileReader && window.FileList && window.Blob ) {
		var input = document.createElement( "input" );
    input.setAttribute( "type", "file" );
		input.addEventListener( "change", function() {
			file = input.files[0];
			if ( file.type != "text/plain" ) {
        let alert = new Alert( "alert-warning", triIco, "Выбран файл с неправильным расширением. Выберете TXT файл." );
			} else {
				let reader = new FileReader();
        reader.readAsText( file );
				reader.onload = function() {
					let text = reader.result;
					if ( ( !text.startsWith( '[' ) ) && ( !text.endsWith( ']' ) ) ) {
					  text = '[\n' + text + ']\n'; 
					}
					text = text.split( '}\n{' ).join( '},\n{' );
					try {
						logArray = JSON.parse( text );
						redrawLogTable();
					} catch( e ) {
            let alert = new Alert( "alert-warning", triIco, "Неправильный формат файла" );
					}
  			}
			}
		});
		input.click();
	}
	return;
}
function saveLogToFile () {
  function SaveAsFile ( data, file, m ) {
  	try {
    	var blob = new Blob( [data], { type: m } );
      saveAs( blob, file );
    } catch(e) {
    	window.open( "data:" + m + "," + encodeURIComponent( t ), '_blank', '' );
    }
    return;
  }
  var date = new Date();
  var name = ( date.getFullYear() - 2000 ).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) +
             ( date.getMonth() + 1 ).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) +
             ( date.getDate() ).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  var data = JSON.stringify( logArray );
	SaveAsFile( data, ( name + "_log" + ".txt" ), "text/plain;charset=utf-8" );
  return;
}
/*----------------------------------------------------------------------------*/
function cosFiUpdate () {
	slider = document.getElementById( "s-slider-cosFi" );
	input = document.getElementById( "sinput-cosFi" );
	input.disabled = false;
	slider.removeAttribute( 'disabled' );
	input.step = 0.01;
	input.addEventListener( 'change', function() {
		this.value = parseFloat( this.value ).toFixed( 2 );
	});
	slider.noUiSlider.updateOptions({
		step:  0.01,
		start: [0],
		range: { 'min': 0, 'max': 1 },
	})
	return;
}
/*----------------------------------------------------------------------------*/
function dec2hexString( dec ) {
   return (dec+0x100).toString(16).substr(-2).toUpperCase();
}
/*----------------------------------------------------------------------------*/
function updateVersions () {
	var counter = 0;

	function writeVersion ( i, name ) {
		let res = 0;
		if ( dataReg[i].name == name ) {
			let version = "";
			for ( var j=0; j<dataReg[i].len; j++ )
			{
				version += dataReg[i].value[j];
				if ( j != ( dataReg[i].len - 1 ) ) {
					version += ".";
				}
			}
			document.getElementById( name ).textContent = version;
			res = 1;
		}
		return res;
	}

	function writeSerialNumber ( i ) {
		let res = 0;
		if ( dataReg[i].name == "releaseDate" ) {
			let date = "";
			for ( var j=0; j<dataReg[i].len; j++ )
			{
				date += dataReg[i].value[j].toString();
				if ( dataReg[i].value[j] < 10 ) {
					date = '0' + date;
				}
			}
			let number = 0;
			for ( var j=0; j<dataReg[i+1].len; j++ )
			{
				number += dataReg[i+1].value[j];
			}
			if ( number < 9999 ) {
				number = ( "000" + number ).slice( -4 );
			}
			document.getElementById( "serialNumber" ).textContent = date + '.' + number.toString();
			res = 1;
		}
		return res;
	}
	function writeMacAddress ( i ) {
		let res = 0;
		let number = 0;
		if ( dataReg[i].name == "macAddress" ) {
			let adr = "";
			for ( var j=0; j<dataReg[i].len; j++ ) {
				number = dataReg[i].value[j] & 0xFF;
				if ( number < 0x0F ) {
					adr += '0';	
				}
				adr += number.toString( 16 );
				adr += ":";
				number = ( dataReg[i].value[j] >> 8 ) & 0xFF;
				if ( number < 0x0F ) {
					adr += '0';	
				}
				adr += number.toString( 16 );
				if ( j != ( dataReg[i].len - 1 ) ) {
					adr += ":";
				}
			}
			document.getElementById( "macAddress" ).textContent = adr;
			res = 1;
		}
		return res;
	}
	
	for ( var i=0; i<dataReg.length; i++ ) {
		counter += writeVersion( i, "versionController" );
		counter += writeVersion( i, "versionFirmware" );
		counter += writeVersion( i, "versionBootloader" );
		counter += writeMacAddress( i );
		counter += writeSerialNumber( i );
		if ( dataReg[i].name == "uniqueNumber0" ) {
			document.getElementById( "uniqueNumber" ).textContent = "";
			for ( var j=0; j<dataReg[i].len; j++ ) {
				document.getElementById( "uniqueNumber" ).textContent += dec2hexString( ( ( dataReg[i].value[j] ) >> 8 ) & 0xFF ) + ':' + dec2hexString( ( dataReg[i].value[j] ) & 0xFF );
				if ( j < ( dataReg[i].len - 1 ) ) {
					document.getElementById( "uniqueNumber" ).textContent += ':';
				}
			}
      document.getElementById( "uniqueNumber" ).textContent += ":";
      for ( var j=0; j<dataReg[i].len; j++ ) {
				document.getElementById( "uniqueNumber" ).textContent += dec2hexString( ( ( dataReg[i+1].value[j] ) >> 8 ) & 0xFF ) + ':' + dec2hexString( ( dataReg[i+1].value[j] ) & 0xFF );
				if ( j < ( dataReg[i].len - 1 ) ) {
					document.getElementById( "uniqueNumber" ).textContent += ':';
				}
			}
			counter++;
		}
		if ( counter == 6 ) {
			break;
		}
	}
	return;
}
/*----------------------------------------------------------------------------*/
function FreeData ( name ) {
	var self = this;
	this.name     = name;
	this.adr      = 0;
  this.input    = null;
	this.progress = null;
	this.max      = 100;
  this.maxRegN  = 0;
	this.writeBut = null;
	this.resetBut = null;

	this.getData = function() {
    for ( var i=0; i<freeDataNames.length; i++ )
		{
			if ( freeDataNames[i] == self.name ) {
				self.adr = i;
				break;
			}
		}
		return;
	}
  this.init    = function() {
		self.getData();
    self.input    = document.getElementById( "input-"    + self.name );
		self.progress = document.getElementById( "progress-" + self.name );
		self.writeBut = document.getElementById( "write-"    + self.name );
		self.resetBut = document.getElementById( "reset-"    + self.name );
		if ( ( self.progress != null ) && ( self.progress != null ) && (self.name.endsWith( "Left" ) ) ) {
			let str = self.name.slice( 0, self.name.lastIndexOf( "Left" ) );
			for ( var i=0; i<dataReg.length; i++ ) {
				if ( dataReg[i].name.search( str ) != -1 ) {
          self.maxRegN = i;
					break;
				}
			}
		}
		if ( self.writeBut != null ) {
			self.writeBut.addEventListener( 'click', function () {
				self.grab();
				writeFreeData( self.adr, freeDataValue[self.adr] );
				return;
			});
		}
		if ( self.resetBut != null ) {
			self.resetBut.addEventListener( 'click', function () {
				freeDataValue[self.adr] = 0;
				writeFreeData( self.adr, 0 );
				self.update();
				return;
			});
		}
    return;
	}
	this.update  = function() {
		if ( self.input != null ) {
			self.input.value = parseInt(freeDataValue[self.adr]);
		}
		if ( self.progress != null ) {
      self.max = dataReg[self.maxRegN].value;
      let value = Math.ceil( ( freeDataValue[self.adr] / self.max ) * 100 );
      if ( value > 100 ) {
        value = 100;
      }
      self.progress.style.width = value + "%";
		}
		return;
	}
	this.grab    = function() {
		if ( self.input != null ) {
			freeDataValue[self.adr] = parseInt( self.input.value );
		}
		return;
	}
	this.init();
	this.update();
	return;
}
/*----------------------------------------------------------------------------*/
function MeasurementSettings () {
	var self                 = this;
	var enable               = document.getElementById( 'recordEnb' );
	var switches             = document.getElementsByClassName( 'recordEnable' );
	var recordIntervalInput  = document.getElementById( 'sinput-recordInterval' );
	var recordIntervalSlider = document.getElementById( 's-slider-recordInterval' );

	
	this.init = function () {
		enable.addEventListener( 'click', function () {
			 updateRecordSwitches();
			 return;
		});
		for ( var i=0; i<switches.length; i++ ) {
			switches[i].addEventListener( 'click', ( function() {
				return function() {
					self.calcRecords();
				}
			})());
		}
		updateRecordSwitches();
		return;
	}

	function  updateRecordSwitches () {
		for ( var i=0; i<switches.length; i++ ) {
			if ( enable.checked == false ) {
			  switches[i].disabled = true;
			} else {
				switches[i].disabled = false;
			}
		}
		if ( enable.checked == false ) {
			recordIntervalInput.disabled = true;
			recordIntervalSlider.setAttribute( 'disabled', false );
		} else {
			recordIntervalInput.disabled = false;
			recordIntervalSlider.removeAttribute( 'disabled' );
		}
		return;
	}
	return;
}
/*----------------------------------------------------------------------------*/
function CheckSelectValues ( atribut, enableForAll ) {
	var self          = this;
  this.enableForAll = enableForAll;
	var types         = document.getElementsByClassName( atribut );
	var usedFunc      = new Array( types.length ).fill( 0 );
  function disableFunc ( func ) {
		for ( var i=0; i<types.length; i++ ) {
			types[i].options[func].disabled = true;
		}
		return;
	}
	function enableFunc ( func ) {
		for ( var i=0; i<types.length; i++ ) {
			types[i].options[func].disabled = false;
		}
		return;
	}
	function updateList ( ) {
		for ( var i=0; i<types.length; i++ ) {
			usedFunc[i] = parseInt( types[i].value );
		}
		return;
	}
	function enableAll () {
		for ( var i=0; i<types[0].options.length; i++ ) {
			if ( usedFunc.indexOf( i ) == -1 ) {
				enableFunc( i );
			}
		}
		return;
	}
	this.update = function() {
		updateList();
		enableAll();
		for ( var i=0; i<usedFunc.length; i++ ) {
      if ( usedFunc[i] > self.enableForAll ) {
        disableFunc( usedFunc[i] );
      }
		}
		return;
	}
	this.init   = function() {
    for ( var i=0; i<types.length; i++ ) {
      types[i].addEventListener( "change", function() {
        updateList();
        enableAll();
			  if ( this.value > self.enableForAll ) {
			    disableFunc( this.value );
			  }
			  return;
		  });
	  }
		return;
	}
  return;
}
/*----------------------------------------------------------------------------*/
function RTC () {
	var self   = this;
	this.hour  = 0;
	this.min   = 0;
	this.sec   = 0;
	this.year  = 00;
	this.month = 1;
	this.day   = 1;
	this.wday  = 0;

	function makeDateStr () {
		return ( self.year + 2000 ) + "-" + (self.month < 10 ? "0" : "") + self.month + "-" + (self.day < 10 ? "0" : "") + self.day;
	}
	function makeTimeStr () {
		return (self.hour < 10 ? "0" : "") + self.hour + ":" + (self.min < 10 ? "0" : "") + self.min;
	}
	function checkTime () {
		let res = 0;
		if ( ( self.sec < 60 )   && ( self.sec >= 0 ) ) {
			if ( ( self.min < 60 )   && ( self.min >= 0 ) ) {
				if ( ( self.hour < 24 ) && ( self.hour >= 0 ) ) {
					res = 1;
				} else { console.log( "Wrong hour" ); }
			} else { console.log( "Wrong min" ); }
		} else { console.log( "Wrong sec" ); }
		return res;
	}
	function checkDate () {
		let res = 0;
		if ( ( self.month <= 0x0C ) && ( self.month > 0 ) ) {
			if ( ( self.day < 32 ) && ( self.day >= 0 ) ) {
				if ( self.year >= 0 ) {
					if ( ( self.wday > 0 ) && ( self.wday <= 7 ) ) {
						res = 1;
					} else { console.log( "Wrong wday" ); }
				} else { console.log( "Wrong day" ); }
			} else { console.log( "Wrong year" ); }
		}  else { console.log( "Wrong month" ); }
		return res;
	}
	function isDateCorrect () {
		var date = new Date();
		if ( ( self.year  != date.getFullYear() - 2000 ) ||
		     ( self.month != ( date.getMonth() + 1 ) )   ||
				 ( self.day   != date.getDate() )            ||
				 ( self.hour  != date.getHours() )           ||
				 ( self.min   != date.getMinutes() ) ) {
			return 0;
		}
		return 1;
	}
  this.init          = function () {
    var timeInput = document.getElementById("timeInput");
  	var dateInput = document.getElementById("dateInput");
    return;
  }
	this.getSystemTime = function () {
		var date = new Date();
		self.hour  = date.getHours();
		self.min   = date.getMinutes();
		self.sec   = date.getSeconds();
		self.year  = date.getFullYear() - 2000;
		self.month = date.getMonth() + 1;
		self.day   = date.getDate();
		self.wday  = date.getDay();
	}
	this.get = function ( data ) {
		self.hour  = data.hour;
		self.min   = data.min;
		self.sec   = data.sec;
		self.year  = data.year;
		self.month = data.month;
		self.day   = data.day;
		self.wday  = data.wday;
		this.update();
		if ( isDateCorrect() == 0 ) {
			$("#confirmModal").modal()
		}
		return;
	}
	this.readInput = function () {
		let t = timeInput.value;
		let d = dateInput.value;
		self.hour  = parseInt( t.slice( 0, t.lastIndexOf( ":" ) ) );
		self.min   = parseInt( t.slice( ( t.lastIndexOf( ":" ) + 1 ), t.length ) );
		self.sec   = 0;
		self.year  = parseInt( d.slice( 0, 4 ) ) - 2000;
		self.month = parseInt( d.slice( 5, 7 ) );
		self.day   = parseInt( d.slice( 8, 10 ) );
	}
	this.update    = function () {
		console.log(self.hour + " " + self.min + " " + self.sec + " " + self.day + " " + self.month + " " + self.year)
		if ( ( checkTime() == 0 ) || ( checkDate() == 0 ) ) {
			self.getSystemTime();
			self.min++;
		}
		timeInput.value = makeTimeStr();
		dateInput.value = makeDateStr();
	}
  return;
}
function setInputTime () {
	rtcTime.readInput();
	writeTime();
}
function setSysTime () {
	rtcTime.getSystemTime();
	rtcTime.update();
	writeTime();
	return;
}
function writeJSON ( adr, data, message, callback ) {
	var xhr = new XMLHttpRequest();
  if ( electronApp == 0 ) {
    let ipAdr  = document.domain;
  } else {
    let ipAdr  = document.getElementById( "input-ipaddress" ).value;
  }
	xhr.open( 'PUT', "http://" + ipAdr + adr, true );
	xhr.timeout = HTTP_TIMEOUT;
	xhr.setRequestHeader( 'Content-type', 'application/json; charset=utf-8' );
	xhr.send( data );
	xhr.addEventListener( 'load', function( data ) {
    let status = data.currentTarget.status;
		if ( xhr.readyState == 4 && status == "200" ) {
			let alert = new Alert( "alert-success", okIco, message );
      callback();
		}
    else if ( status === 401 ) {
      let alert = new Alert( "alert-warning", triIco, "Неправильный пароль" );
    }
    else {
      let alert = new Alert( "alert-danger", triIco, "Ошибка передачи данных" );
    }
    return;
	});
	xhr.addEventListener( 'error', function( error ) {
	  let alert = new Alert( "alert-danger", triIco, "Ошибка передачи данных" );
	});
	xhr.ontimeout = function() {
		xhr.abort();
		let alert = new Alert( "alert-danger", triIco, "Нет связи с сервером" );
	}
	return;
}
function writeFreeDataEth ( adr, data ) {
  function FreeData ( data ) {
    this.value = parseInt( data );
  }
  buf = new FreeData( data );
	writeJSON( ( '/data/' + adr ), JSON.stringify( buf ), "Данные успешно записаны", function(){} );
	return;
}
function writeTimeEth () {
	writeJSON( '/time/', JSON.stringify( rtcTime ), "Время успешно установленно", function(){} );
	return;
}
function eraseLogEth () {
  writeJSON( '/eraseLog/', JSON.stringify( rtcTime ), "Журнал успешно очищен", function(){} );
  return;
}
function writePasspordEth ( password ) {
  writeJSON( '/password/', JSON.stringify( password ), "Пароль обновлен", function() {});
  return;
}
function sendAuthorizationEth ( callback ) {
  let password = new Auth( getCurrentPassword() );
  writeJSON( '/auth/', JSON.stringify( password ), "Авторизация успешна", callback );
  return;
}
/*----------------------------------------------------------------------------*/
function declareStrings ( configs ) {
	for ( var i=0; i<configs.length; i++ ) {
		if ( configs[i].name.endsWith( "Message0" ) ) {
			stringLineArray.push( new StrLine( configs[i].name ) );
		}
	}
	return stringLineArray;
}
function declareFreeData () {
	freeDataArray   = [];
	freeDataValue   = [];
	for ( var i=0; i<freeDataNames.length; i++ ) {
		freeDataValue.push( 0 );
		let fd = new FreeData( freeDataNames[i] );
		freeDataArray.push( fd );
	}
	return;
}
function declareSliders () {
	for ( var i=0; i<dataReg.length; i++ ) {
		str = dataReg[i].name;
		if ( dataReg[i].name.endsWith( "Level" )    ||
         dataReg[i].name.endsWith( "Quantity" )   ||
         dataReg[i].name.endsWith( "Interval" ) ||
		     dataReg[i].name.endsWith( "Delay" )    ||
				 dataReg[i].name.startsWith( "timer" )  ||
				 dataReg[i].name.endsWith( "Time" ) ) {
			slidersArray.push( new Slider( dataReg[i].name, 1 ) );
		}
	}
	return;
}
function declareSwitches () {
	var l = 0;
	for ( var i=0; i<dataReg.length; i++ ) {
		if ( dataReg[i].bitMapSize > 0 ) {
			for ( var j=0; j<dataReg[i].bitMapSize; j++ ) {
				if ( dataReg[i].bit[j].name.endsWith( "Enb" ) ) {
					switcherArray.push( new Switch( dataReg[i].bit[j].name ) );
					switcherArray[l].update();
					l++;
				}
			}
		}
	}
	return;
}
function declareSelects () {
	for ( var i=0; i<dataReg.length; i++ ) {
		if ( dataReg[i].bitMapSize > 0 ) {
			for ( var j=0; j<dataReg[i].bitMapSize; j++ ) {
				if ( ( dataReg[i].bit[j].max > 1 ) ||
					   ( dataReg[i].bit[j].name.endsWith( "Action" ) )   ||
					   ( dataReg[i].bit[j].name.endsWith( "Type" ) )     ||
					   ( dataReg[i].bit[j].name.endsWith( "Function" ) ) ||
					   ( dataReg[i].bit[j].name.endsWith( "Polarity" ) ) ||
             ( dataReg[i].bit[j].name.endsWith( "Baudrate" ) ) ||
					   ( dataReg[i].bit[j].name.endsWith( "Arming" ) ) ) {
					selectorArray.push( new Select( dataReg[i].bit[j].name ) );
				}
			}
		}
	}
	return;
}
function declareRadio () {
	for ( var i=0; i<dataReg.length; i++ ) {
		if ( dataReg[i].bitMapSize > 0 ) {
			for ( var j=0; j<dataReg[i].bitMapSize; j++ ) {
				if ( dataReg[i].bit[j].name.endsWith( "NOC" ) ) {
					radioArray.push( new Radio( dataReg[i].bit[j].name ) );
				}
			}
		}
	}
	return;
}
function declareInterface () {
  declareSwitches();
  declareSliders();
	declareStrings( dataReg );
	declareSelects();
	declareRadio();
	declareFreeData();
  diList  = new CheckSelectValues( "diFunction", 1 );
  doList  = new CheckSelectValues( "doType",     0 );
  rtcTime = new RTC();
  rtcTime.init();
  if ( electronApp > 0 ) {
    measurement = new MeasurementSettings();
  	measurement.init();
  }
  logArray = [];
  declareDone = 1;
	return;
}
function updateInterface ( callback = null ) {
	rtcTime.update();
  for ( var i=0; i<switcherArray.length; i++ ) {
		switcherArray[i].update();
	}
	for ( var i=0; i<selectorArray.length; i++ ) {
		selectorArray[i].update();
	}
	for ( var i=0; i<stringLineArray.length; i++ ) {
		stringLineArray[i].update();
	}
	for ( var i=0; i<slidersArray.length; i++ ) {
		slidersArray[i].update();
	}
	for ( var i=0; i<radioArray.length; i++ ) {
		radioArray[i].update();
  }
	cosFiUpdate();
	updateVersions();
	for ( var i=0; i<freeDataNames.length; i++ ) {
		freeDataArray[i].update();
	}
  for ( var i=0;i<dataReg.length;i++ ) {
		if ( dataReg[i].name == "engineSetup" ) {
      document.getElementById( 'engineStartAttempts' ).value = bitVal( 0, dataReg[i] );
		}
    if ( dataReg[i].name == "speedToothNumber" ) {
      document.getElementById( 'speedToothNumber' ).value = dataReg[i].value;
    }
    if ( dataReg[i].name == "modbusAdr" ) {
      document.getElementById( 'modbusAdr' ).value = bitVal( 0, dataReg[i] );
    }
	}
  redrawLogTable();
  setDisabledDI( 'a' );
  setDisabledDI( 'b' );
  setDisabledDI( 'c' );
  setDisabledDI( 'd' );
  setDisabledDO( 'a' );
  setDisabledDO( 'b' );
  setDisabledDO( 'c' );
  setDisabledDO( 'd' );
  setDisabledDO( 'e' );
  setDisabledDO( 'f' );
  diList.update();
	doList.update();
  if ( callback != null ) {
    callback();
  }
	return;
}
function grabInterface () {
	for ( var i=0; i<stringLineArray.length; i++ ) {
    try {
      stringLineArray[i].grab();
    } catch (e) {
      console.log("Grabing string error on " + stringLineArray[i].name );
    }
	}
	for ( var i=0; i<slidersArray.length; i++ ) {
		try {
		  slidersArray[i].grab();
		} catch (e) {
			console.log("Grabing slider error on " + slidersArray[i].name );
		}
	}
	for ( var i=0; i<switcherArray.length; i++ ) {
    try {
      switcherArray[i].grab();
    } catch (e) {
      console.log("Grabing slider error on " + switcherArray[i].name );
    }
	}
	for ( var i=0; i<selectorArray.length; i++ ) {
    try {
      selectorArray[i].grab();
    } catch (e) {
      console.log("Grabing selector error on " + selectorArray[i].name );
    }
	}
	for ( var i=0; i<radioArray.length; i++ ) {
    try {
      radioArray[i].grab();
    } catch (e) {
      console.log("Grabing radio error on " + radioArray[i].name );
    }
	}
  for ( var i=0; i<freeDataNames.length; i++ ) {
    try {
      freeDataArray[i].grab();
    } catch (e) {
      console.log("Grabing free data error on " + freeDataArray[i].name );
    }
	}
	for ( var i=0;i<dataReg.length;i++ ) {
		if ( dataReg[i].name == "engineSetup" ) {
		  bitWrite( 0, dataReg[i], document.getElementById( 'engineStartAttempts' ).value );
		}
    if ( dataReg[i].name == "speedToothNumber" ) {
      dataReg[i].value = parseInt( document.getElementById( 'speedToothNumber' ).value );
    }
	}
	return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function ascii_to_hexa ( str ) {
	var arr1 = [];
	for ( var n=0, l=str.length; n<l; n++)
     {
		var hex = Number( str.charCodeAt( n ) ).toString( 16 );
		arr1.push( hex );
	 }
	return arr1.join( '' );
}
function ethOutputUpdate ( callbackFail, callbackEnd ) {
  try {
    const reqs = function( requests, store, failback ) {
			if ( requests instanceof Array && requests.length > 0 ) {
				const xhr = new XMLHttpRequest();
				xhr.addEventListener( 'load', function( data ) {
					const status = data.currentTarget.status;
					const response = data.currentTarget.response;
					if ( status === 200 ) {
						store.push( JSON.parse( response ) );
						requests.shift();
						return reqs( requests, store, failback );
					}
          else if ( status === 401 ) {
            let alert = new Alert( "alert-warning", triIco, "Неправильный пароль" );
          }
          else {
            let alert = new Alert( "alert-danger", triIco, "Ошибка передачи данных" );
          }
				});
				xhr.addEventListener( 'error', function( error ) {
					if ( failback ) {
						failback( 'Something went wrong.' );
						let alert = new Alert( "alert-danger", triIco, "Нет связи с сервером" );
					}
				});
				xhr.ontimeout = function() {
					xhr.abort();
					let alert = new Alert( "alert-danger", triIco, "Нет связи с сервером" );
					callbackFail();
				}
				xhr.open( requests[0].method, requests[0].url );
				xhr.timeout = HTTP_TIMEOUT;
				xhr.send();
				var index  = store.length + 1;
				var length = requests.length + store.length;
			} else {
        for ( var i=0; i<outputReg.length; i++ ) {
          outputReg[i].value = store[i].value;
        }
        callbackEnd();
				return store;
			}
		};
		/* Make GET sequency */
		restSeq = [];
    if ( electronApp == 0 ) {
      ipAdr  = document.domain;
    } else {
      ipAdr  = document.getElementById( "input-ipaddress" ).value;
    }
		extUrl = "";
		if ( ipAdr.length > 0 ) {
			extUrl = "http://" + ipAdr;
		}
    for ( var i=0; i<outputReg.length; i++ ) {
      restSeq.push( { method: 'get', url: ( extUrl + '/output/' + i ) } );
    }
    const results = reqs( restSeq, [], function( error ) {
      console.log( error )
    });
  } catch( e ) {
		let alert = new Alert( "alert-danger", triIco, "Нет связи с сервером" );
		return;
	}
  return;
}
function getEthernetLoopTimeout () {
  return ethernetLoopTimeout;
}
function ethLoop () {
  console.log( getConnectionStatus() );
  if ( getConnectionStatus() > 0 ) {
    if ( ( ethBusy == 0 ) && ( ethLoopEnb > 0 ) ) {
      ethBusy = 1;
      ethOutputUpdate( function () {
        resetSuccessConnection();
      }, function () {
        dashboard.update( function () {
          ethBusy = 0;
        });
      });
    }
  }
  return;
}
function ethDataUpdate ( alertProgress, callback ) {
	document.getElementById( "i-loading" ).classList.add( "loading" );
	try {
		const reqs = function( requests, store, failback ) {
			if ( requests instanceof Array && requests.length > 0 ) {
				const xhr = new XMLHttpRequest();
				xhr.addEventListener( 'load', function( data ) {
					const status = data.currentTarget.status;
					const response = data.currentTarget.response;
					if ( status === 200 ) {
						store.push( JSON.parse( response ) );
						requests.shift();
						return reqs( requests, store, failback );
					}
          else if ( status === 401 ) {
            alertProgress.close( 0 );
            let alert = new Alert( "alert-warning", triIco, "Неправильный пароль" );
          }
          else {
            alertProgress.close( 0 );
            let alert = new Alert( "alert-danger", triIco, "Ошибка передачи данных" );
          }
				});
				xhr.addEventListener( 'error', function( error ) {
					if ( failback ) {
						document.getElementById( "i-loading" ).classList.remove( "loading" );
						failback('Something went wrong.');
						let alert = new Alert( "alert-danger", triIco, "Нет связи с сервером" );
						alertProgress.close( 0 );
					}
				});
				xhr.ontimeout = function() {
					xhr.abort();
					let alert = new Alert( "alert-danger", triIco, "Нет связи с сервером" );
					document.getElementById( "i-loading" ).classList.remove( "loading" );
					alertProgress.close( 0 );
					callback();
				}
				xhr.open( requests[0].method, requests[0].url );
				xhr.timeout = HTTP_TIMEOUT;
				xhr.send();
				var index  = store.length + 1;
				var length = requests.length + store.length;
				alertProgress.setProgressBar( index * 100 / length );
			} else {
				copyDataReg( store[0] );
				loadCharts( store[1] );
        copyLog( store[2] );
				for ( var i=0; i<freeDataValue.length; i++ ) {
					freeDataValue[i] = store[3+i].value;
				}
        updateInterface();
				rtcTime.get( store[store.length - 1] )
				setSuccessConnection();
				let alert = new Alert( "alert-success", okIco, "Данные успешно обновленны", 1 );
				document.getElementById( "i-loading" ).classList.remove( "loading" );
				return store;
			}
		};
		/* Make GET sequency */
		restSeq = [];
    if ( electronApp == 0 ) {
      ipAdr  = document.domain;
    } else {
      ipAdr  = document.getElementById( "input-ipaddress" ).value;
    }
		extUrl = "";
		if ( ipAdr.length > 0 ) {
			extUrl = "http://" + ipAdr;
		}
    sendAuthorizationEth ( function () {
      restSeq.push( { method: 'get', url: ( extUrl + '/configs/' ) } );
  		restSeq.push( { method: 'get', url: ( extUrl + '/charts/'  ) } );
      restSeq.push( { method: 'get', url: ( extUrl + '/log/'     ) } );
  		for ( var i=0; i<freeDataNames.length; i++ ) {
  			restSeq.push( { method: 'get', url: ( extUrl + '/data/' + i ) } );
  		}
  		restSeq.push( { method: 'get', url: ( extUrl + '/time/' ) } );
  		const results = reqs( restSeq, [], function( error ) {
  			console.log( error )
  		});
    });
	} catch( e ) {
		let alert = new Alert( "alert-danger", triIco, "Нет связи с сервером" );
		return 0;
	}
	return 0;
}
/*----------------------------------------------------------------------------*/
function copyLog ( data ) {
  logArray = [];
  for ( var i=0; i<data.length; i++ ) {
    if ( data[i].time != 0 ) {
      logArray.push( data[i] );
    }
  }
  return;
}
/*----------------------------------------------------------------------------*/
function copyDataReg ( data ) {
	for ( var i=0; i<data.length; i++ ) {
		for ( var j=0; j<dataReg.length; j++ ) {
			if ( data[i].adr == dataReg[j].adr ) {
				if ( dataReg[j].type == 'S' ) {
					dataReg[j].value = [];
					for ( var k=0; k<dataReg[j].len; k++ ) {
						dataReg[j].value.push( decodeURI( data[i].value[k] ) );
					}
				} else {
					dataReg[j].value = data[i].value;
				}
				dataReg[j].scale = data[i].scale;
				dataReg[j].units = decodeURI( data[i].units );
			}
		}
	}
	return;
}
/*----------------------------------------------------------------------------*/
function resetSettings () {
	let isReset = confirm( "Сбросить настройки?" );
	if ( isReset == true ) {
	  for ( var i=0; i<dataReg.length; i++ ) {
		  dataReg[i].value = dataReg[i].default;
	  }
	  updateInterface();
    declareChartList();
	  let alert = new Alert( "alert-success", okIco, "Настройки сброшены до заводских" );
	}
	return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function dataGrab ( alertProgress, callback ) {
	grabInterface();
  try {
		const reqs = function ( requests = [], failback ) {
			var store = [];
			if ( requests instanceof Array && requests.length > 0 ) {
	  		var xhr = new XMLHttpRequest();
				xhr.addEventListener( 'load', function( data ) {
					const status = data.currentTarget.status;
					const response = data.currentTarget.response;
					if ( xhr.readyState == 4 && status === 200 ) {
            store.push( status );
            requests.shift();
            return reqs( requests, content, failback );
		  		}
          else if ( status === 401 ) {
            alertProgress.close( 0 );
            let alert = new Alert( "alert-warning", triIco, "Неправильный пароль" );
          }
          else {
            alertProgress.close( 0 );
            let alert = new Alert( "alert-danger", triIco, "Ошибка передачи данных" );
          }
				});
				xhr.addEventListener( 'error', function( error ) {
					if ( failback ) {
						let alert = new Alert( "alert-danger", triIco, "Ошибка передачи данных" );
						alertProgress.close( 0 );
					}
				});
				xhr.ontimeout = function() {
					xhr.abort();
					let alert = new Alert( "alert-danger", triIco, "Нет связи с сервером" );
					alertProgress.close( 0 );
					callback();
				}
	  		xhr.open( requests[0].method, requests[0].url, true );
				xhr.timeout = HTTP_TIMEOUT;
	  		xhr.setRequestHeader( 'Content-type', 'application/json; charset=utf-8' );
	  		xhr.send( requests[0].content );
				var index  = store.length + 1;
				var length = requests.length + store.length;
				alertProgress.setProgressBar( index * 100 / length );
			} else {
				setSuccessConnection();
				let alert = new Alert( "alert-success", triIco, "Данные успешно переданы", 1 );
			}
		};
		//--------------------------------------------------------------------------
		restSeq = []
    if ( electronApp == 0 ) {
      ipAdr  = document.domain;
    } else {
      ipAdr  = document.getElementById( "input-ipaddress" ).value;
    }
		extUrl = "";
		if ( ipAdr.length > 0 ) {
			extUrl = "http://" + ipAdr;
		}
		for ( i=6; i<dataReg.length; i++ ) {
			if ( dataReg[i].rw == "rw" ) {
				restSeq.push( {
					method:  'PUT',
					url:     extUrl + '/configs/' + i,
					content: JSON.stringify( pasteDataReg( dataReg[i] ) )
		})}}
		restSeq.push( {
			method:  'PUT',
			url:     extUrl + '/saveConfigs/',
			content: JSON.stringify( {"save":1} )
		});
		var chartContent = uploadCharts();
		for ( i=0; i<3; i++ ) {
			restSeq.push({
				method:  'PUT',
				url:     extUrl + '/charts/' + i,
				content: JSON.stringify( chartContent[i] )
		})}
		restSeq.push( {
			method:  'PUT',
			url:     extUrl + '/saveCharts/',
			content: JSON.stringify( {"save":1} )
		});
		const results = reqs( restSeq, function( error ) { console.log( error) });
	} catch( e ) {
		let alert = new Alert( "alert-danger", triIco, "Нет связи с сервером" );
	}
	return;
}
/*----------------------------------------------------------------------------*/
function pasteDataReg ( data ) {
	var bitArr = [];
	var value  = 0;
	if ( data.type == 'S' ) {
		value = [];
		for ( var i=0; i<data.len; i++ ) {
			if ( data.value[i] == "" ) {
				value.push( "%20" );
			} else {
				value.push( encodeURI( data.value[i] ) );
			}
		}
	} else {
		value = data.value;
	}
	return {
		value : value,
	};
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
module.exports.RTC            = RTC;
module.exports.LogRecord      = LogRecord;
/* For tests */
module.exports.declareStrings = declareStrings;
