function checkDO ( targetText ) {
  var types = document.getElementsByClassName( "doType" );
  var res   = 0;
  for ( i=0; i<types.length; i++ ) {
    if ( types[i].options[types[i].value].text == targetText ) {
      res = 1;
    }
  }
  if ( res == 0 ) {
    let alert = new Alert( "alert-warning", shevronRightIco, "Цифровой выход под данную функцию не сконфигурирован." );
  }
  return res;
}
/*----------------------------------------------------------------------------*/
function analisDOpairs () {
  var res       = 0;
  var warning   = 0;
  var emptySlot = 0;
  var fullSlot  = 0;
  var doList    = document.getElementsByClassName( "doType" );
  for ( var i=0; i<(doList.length / 2); i++ ) {
    if ( res == 0 ) {
      if ( warning == 0 ) {
        if ( ( doList[2*i].value == 0 ) && ( doList[2*i+1].value != 0 ) ) {
          warning   = 1;
          emptySlot = 2 * i;
        }
        if ( ( doList[2*i].value != 0 ) && ( doList[2*i+1].value == 0 ) ) {
          warning = 1;
          emptySlot = 2 * i + 1;
        }
      } else {
        if ( doList[2*i].value != 0 ) {
          res      = 1;
          fullSlot = 2 * i;
        }
        if ( doList[2*i+1].value != 0 ) {
          res      = 1;
          fullSlot = 2 * i + 1;
        }
      }
    } else {
      break;
    }
  }
  if ( res > 0 ) {
    let alert = new Alert( "alert-warning", shevronLeftIco,
                          ( "Рекомендуем перенести функцию выхода " +
                            String.fromCharCode( 65 + fullSlot ) +
                            " на выход " +
                            String.fromCharCode( 65 + emptySlot ) +
                            " в целях экономии электроэнергии АКБ." ) );
  }
  return;
}
/*----------------------------------------------------------------------------*/
function checkTimers () {
  var self     = this;
  this.names   = [ "enginePreHeatDelay",
                   "timerCranking",
                   "timerCrankDelay",
                   "timerStartupIdleTime",
                   "timerNominalRPMDelay",
                   "timerCoolingIdle",
                   "timerSolenoidHold",
                 ];
  this.targets = [ "Включение свечи накаливания",
                   "Стартерное реле",
                   "Стартерное реле",
                   "Работа на холостом ходу",
                   "Работа на холостом ходу",
                   "Работа на холостом ходу",
                   "Стоповый соленоид" ];
  for ( var i=0; i<self.names.length; i++ ) {
    let input  = document.getElementById( "sinput-"   + self.names[i] );
    let slider = document.getElementById( "s-slider-" + self.names[i] );





    input.addEventListener( 'change', ( function() {
      var j = i;
      return function() {
        checkDO( self.targets[j] );
      }
    })());
    slider.noUiSlider.on( 'end', ( function() {
      var j = i;
      return function() {
        checkDO( self.targets[j] );
        console.log( self.targets[j] );
      }
    })());
  }
  return;
}
/*----------------------------------------------------------------------------*/
function doPairsAnalisInit () {
  var doList  = document.getElementsByClassName( "doType" );
  for ( var i=0; i<doList.length; i++ ) {
    doList[i].addEventListener( 'change', function ( ) {
      analisDOpairs();
      return;
    });
  }
  return;
}
/*----------------------------------------------------------------------------*/
function checkSettings () {
  var self     = this;
  this.names   = ["coolantTempHeaterEnb",
                  "coolantTempCoolerEnb",
                  "fuelPumpEnb",
                 ];
  this.targets = ["Охладитель ОЖ",
                  "Подогреватель ОЖ",
                  "Подкачка топлива",
                 ];
  for ( i=0; i<self.names.length; i++ ) {;
    obj = document.getElementById( self.names[i] );
    obj.addEventListener( "change", ( function() {
      var j = i;
      return function() {
        if ( this.checked == true ) {
          checkDO( self.targets[j] );
        }
      }
    })());
  }
  document.getElementById('starterStopSpeedEnb').addEventListener( 'change', function() {
    if ( ( document.getElementById('speedEnb').checked == false ) && (this.checked == true) ) {
      this.checked = false;
      document.getElementById('sinput-starterStopSpeedLevel').disabled = true;
      document.getElementById('s-slider-starterStopSpeedLevel').setAttribute('disabled', false);
      let alert = new Alert("alert-warning",tachometerIco,"Вход датчика скорости оборотов не сконфигурирован.")
    }
    return;
  });
  document.getElementById('starterStopOilPressureEnb').addEventListener( 'change', function() {
    var type = document.getElementById( 'oilPressureSensorType' );
    if ( this.disabled == true ) {
      let alert = new Alert("alert-warning",oilIco,"Вход датчика давления масла не сконфигурирован.")
    }
    if ( this.checked == true ) {
      if ( type.value == 0 ) {
        this.checked = false;
        document.getElementById('sinput-starterStopOilPressureLevel').disabled = true;
        document.getElementById('s-slider-starterStopOilPressureLevel').setAttribute('disabled', false);
        let alert = new Alert("alert-warning",oilIco,"Вход датчика давления масла не сконфигурирован.")
      } else if ( ( type.value == 1 ) || ( type.value == 2 ) ) {
        let alert = new Alert("alert-warning",oilIco,"Дискретный датчик давления масла недостаточно точен для критерия остановки стартера.")
      }
    }
    return;
  });
  return;
}
