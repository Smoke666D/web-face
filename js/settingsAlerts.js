/*----------------------------------------------------------------------------*/
function checkDOlist ( targetText ) {
  var types = document.getElementsByClassName( "doType" );
  var res   = 0;
  for ( i=0; i<types.length; i++ ) {
    if ( types[i].options[types[i].value].text == targetText ) {
      res = 1;
    }
  }
  return res;
}
/*----------------------------------------------------------------------------*/
function checkDO ( targetText ) {
  if ( checkDOlist() == 0 ) {
    let alert = new Alert( "alert-warning", shevronRightIco, 'Цифровой выход <a class="text-danger">"' + targetText + '"</a> не сконфигурирован.' );
  }
}
/*----------------------------------------------------------------------------*/
function checkElectroDO () {
  var relayPair = ["Включить генератор",
                   "Включить сеть"];
  var impulsSeq = ["Включить генератор импульсно",
                   "Выключить генератор импульсно",
                   "Включить сеть импульсно",
                   "Выключить сеть импульсно"];
  let genRel = checkDOlist( relayPair[0] );
  let netRel = checkDOlist( relayPair[1] );
  if ( ( genRel > 0 ) && ( netRel == 0 ) ) {
    let alert = new Alert( "alert-warning", shevronLeftIco, 'Цифровой выход <a class="text-danger">"' + relayPair[1] + '"</a> не сконфигурирован.' );
  } else if ( ( genRel == 0 ) && ( netRel > 0 ) ) {
    let alert = new Alert( "alert-warning", shevronLeftIco, 'Цифровой выход <a class="text-danger">"' + relayPair[0] + '"</a> не сконфигурирован.' );
  } else if ( ( genRel == 0 ) && ( netRel == 0 ) ) {
    let imp     = [];
    let alarms  = [];
    let checkFl = 0;
    for ( var i=0; i<impulsSeq.length; i++ ) {
      let input = checkDOlist( impulsSeq[i] );
      if ( input > 0 ) {
        checkFl = 1;
      }
      imp.push( input );
    }
    if ( checkFl > 0 ) {
      let string = '';
      let lenStr = 0;
      for ( var i=0; i<imp.length; i++ ) {
        if ( imp[i] == 0 ) {
          lenStr++;
          string += '"' + impulsSeq[i] + '"'
          if ( i != ( imp.length - 1) ) {
            string += ', ';
          }
        }
      }
      if ( lenStr == 0 ) {
        // All OK!
      } else if ( lenStr == 1 ) {
        alarms.push( new Alert( "alert-warning", shevronLeftIco, 'Цифровой выход <a class="text-danger">' + string + '</a> не сконфигурирован.' ) );
      } else {
        alarms.push( new Alert( "alert-warning", shevronLeftIco, 'Цифровые выходы <a class="text-danger">' + string + '</a> не сконфигурированы.' ) );
      }
    } else {
      let alert = new Alert( "alert-warning", shevronLeftIco, 'Управление комутацией не сконфигурировано.' );
    }
  } else {
    // All OK!
  }
  return;
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
function checkSelect () {
  var self = this;
  this.namesSel = ["genCurrentOverAction",
                   "diaAction",
                   "dibAction",
                   "dicAction",
                   "didAction"];
  for ( i=0; i<self.namesSel.length; i++ ) {
    obj = document.getElementById( self.namesSel[i] );
    obj.addEventListener( 'change', ( function() {
      var j = i;
      return function () {
        if ( this.value == 1 ) {
          checkElectroDO();
        }
      }
    })());
  }
}
/*----------------------------------------------------------------------------*/
function checkSettings () {
  var self     = this;
  this.namesSet   = ["coolantTempHeaterEnb",
                     "coolantTempCoolerEnb",
                     "fuelPumpEnb"];
  this.targetsSet = ["Охладитель ОЖ",
                     "Подогреватель ОЖ",
                     "Подкачка топлива"];
  for ( i=0; i<self.namesSet.length; i++ ) {;
    obj = document.getElementById( self.namesSet[i] );
    obj.addEventListener( "change", ( function() {
      var j = i;
      return function() {
        if ( this.checked == true ) {
          checkDO( self.targetsSet[j] );
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
