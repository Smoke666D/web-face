const usb    = require('./js/usb.js');
const rest   = require('./js/rest.js');
const alerts = require('./js/alerts.js');
/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
function connectUpdate () {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    let alert = new Alert( "alert-warning", triIco, "Загрузка", 0, 1 );
    ethDataUpdate( alert, function () {
      resetSuccessConnection();
    });
  } else if ( connectionType == 'usb' ) {
    let state = usb.controller.getStatus();
    if ( ( state == 1 ) || ( state == 4 ) ) {
      let alert = new Alert( "alert-warning", triIco, "Загрузка", 0, 1 );
      usb.controller.receive( getCurrentPassword(), alert );
    }
  }
  return;
}
function saveConfigsToFile () {
  function SaveAsFile ( text, name, type ) {
  	try {
    	var file = new File( [text], name, { type: type } );
      saveAs( file );
    } catch( e ) {
    	window.open( ( "data:" + m + "," + encodeURIComponent( t ) ), '_blank', '' );
      let alert = new Alert( "alert-warning", triIco, "Ошибка записи конфигурации в файл" );
    }
    return;
  }
	grabInterface();
  let output = JSON.stringify( { dataReg, chartList }, null, '\t' );
  let name   = "config.json";
  if ( electronApp > 0 ) {
    name += ".json";
  }
	SaveAsFile( output, name, "application/json;charset=utf-8" );
  return;
}
function loadConfigsFromFile () {
  if ( window.File && window.FileReader && window.FileList && window.Blob ) {
		var input = document.createElement( "input" );
    input.setAttribute( "type", "file" );
		input.addEventListener( "change", function() {
			file = input.files[0];
			if ( file.type != "application/json" ) {
        let alert = new Alert( "alert-warning", triIco, "Выбран файл с неправильным расширением. Выберете JSON файл." );
			} else {
				let reader = new FileReader();
        reader.readAsText( file );
				reader.onload = function() {
					try {
            let data  = JSON.parse( reader.result );
            if ( data.dataReg.length == dataReg.length )
            {
              dataReg   = data.dataReg;
              for ( var i=0; i<chartList.length; i++ ) {
                chartList[i].setData( data.chartList[i] );
                chartList[i].clean();
                chartList[i].getTypeFromReg( 0 );
                chartList[i].init();
                for ( var j=0; j<chartList[i].size; j++ ) {
                  chartList[i].writeDot( j, data.chartList[i].dots[j] );
                }
              }
              updateInterface();
              let alert = new Alert( "alert-success", okIco, "Конфигурация прочитана из файла" );
            } else {
              let alert = new Alert( "alert-warning", triIco, "Конфигурация не совместима с используемой версией программы" );
            }
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
function connectGrab () {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    let alert = new Alert( "alert-warning", triIco, "Загрузка", 0, 1 );
    dataGrab( alert, function () {
      resetSuccessConnection();
      return;
    });
  } else if ( connectionType == 'usb' ) {
    let state = usb.controller.getStatus();
    if ( ( state == 1 ) || ( state == 4 ) ) {
      let alert = new Alert( "alert-warning", triIco, "Загрузка", 0, 1 );
      usb.controller.send( alert );
    }
  }
  return;
}
function writeTime () {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    writeTimeEth();
  } else if ( connectionType == 'usb' ) {
    usb.controller.sendTime( rtcTime );
  }
  return;
}
function writeFreeData ( adr, value ) {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    writeFreeDataEth( adr, value );
  } else if ( connectionType == 'usb' ) {
    usb.controller.sendFreeData( adr, value );
  }
  return;
}
function updateDashBoard () {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {

  } else if ( connectionType == 'usb' ) {
    usb.controller.readOutput();
  }
  return;
}
function eraseLog () {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    eraseLogEth();
  } else if ( connectionType == 'usb' ) {
    usb.controller.eraseLog();
  }
  logArray = [];
  redrawLogTable();
  return;
}
function eraseMeasurement () {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {

  } else if ( connectionType == 'usb' ) {
    usb.controller.eraseMeasurement();
  }
  measurementLength = 0;
  measureBuffer     = [];
  measureClean();
  /* Clean plot */
  return;
}
function readMeasurement () {
  if ( measurementLength > 0 ) {
    if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {

    } else if ( connectionType == 'usb' ) {
      let alert = new Alert( "alert-warning", triIco, "Загрузка", 0, 1 );
      usb.controller.readMeasurement( measurementLength, alert );
    }
  } else {
    let alert = new Alert( "alert-warning", triIco, "Нет записей измерений" );
  }
  /* Clean plot */
  return;
}
function writePassword ( password ) {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    writePasspordEth( password );
  } else if ( connectionType == 'usb' ) {
    usb.controller.sendPass( password );
  }
  return;
}
function authorization () {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    sendAuthorizationEth();
  } else if ( connectionType == 'usb' ) {
    usb.controller.sendAuthorization( getCurrentPassword() );
  }
  return;
}
function dashLoop () {
    setTimeout( function () {
      usb.controller.loop();
      dashLoop();
    }, 4000 );
}
/*----------------------------------------------------------------------------*/
var typeIpLastLen = 0;
var typeIpDir     = "write";
function ipv4AdrMask () {
  document.getElementById( 'input-ipaddress' ).addEventListener( 'input', function() {
    var str = this.value;
    if ( typeIpLastLen < str.length ) {
      typeIdDir = "write";
    } else {
      typeIdDir = "back";
    }
    typeIpLastLen = str.length;
    if ( typeIdDir == "write" ) {
      var ch = str[str.length - 1];
      if ((ch != '.')&&(ch != '0')&&(ch != '1')&&(ch != '2')&&(ch != '3')&&(ch != '4')&&(ch != '5')&&(ch != '6')&&(ch != '7')&&(ch != '8')&&(ch != '9')) {
        str = str.slice( 0, ( str.length - 1 ) );
        typeIpLastLen = str.length;
      }
      if (str.length > 15) {
        str = str.slice(0,(str.length-1));
        typeIpLastLen = str.length;
      }
    }
    this.value = str;
  });
  return;
}
/*----------------------------------------------------------------------------*/
