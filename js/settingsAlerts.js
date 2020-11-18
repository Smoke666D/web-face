function checkDO ( targetText ) {
  var types = document.getElementsByClassName( "doType" );
  var res   = 0;
  for ( i=0; i<types.length; i++ ) {
    if ( types[i].options[types[i].value].text == targetText ) {
      res = 1;
    }
  }
  if ( res == 0 ) {
    let alert = new Alert("alert-warning",shevronRightIco,"Цифровой выход под данную функцию не сконфигурирован.")
  }
  return res;
}
/*----------------------------------------------------------------------------*/
function checkSettings () {
  var self     = this;
  this.names   = ["coolantTempHeaterEnb",
                   "coolantTempCoolerEnb",
                   "fuelPumpEnb",
                   "enginePreHeatEnb"];
  this.targets = ["Охладитель охлаждающей жидкости",
                   "Подогреватель охлаждающей жидкости",
                   "Подкачка топлива",
                   "Включение свечи накаливания"];
  for ( i=0; i<names.length; i++ ) {
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
  });
}
