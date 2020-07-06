function checkDO( target ) {
  var types = document.getElementsByClassName("doType");
  var res = 0;
  for (i=0;i<types.length;i++) {
    if (types[i].options[types[i].value].text == target ) {
      res = 1;
    }
  }
  if ( res == 0 ) {
    let alert = new Alert("alert-warning",'<i class="fas fa-chevron-right"></i>',"Цифровой выход под данную функцию не сконфигурирован.")
  }
  return res;
}


function checkSettings() {
  const names   = ["coolantTempHeaterEnb",
                   "coolantTempCoolerEnb",
                   "fuelPumpEnb"];
  const targets = ["Управление охладителем охлаждающей жидкости",
                   "Управление подогревателем охлаждающей жидкости",
                   "Подкачка топлива"];
  for (i=0;i<names.length;i++) {
    obj = document.getElementById( names[i] );
    obj.addEventListener("change",function(){
      if ( this.checked == true ) {
        checkDO( targets[i] );
      }
    });
  }

  document.getElementById('starterStopSpeedEnb').addEventListener( 'change', function() {
    if ( ( document.getElementById('speedEnb').checked == false ) && (this.checked == true) ) {
      this.checked = false;
      document.getElementById('sinput-starterStopSpeedLevel').disabled = true;
      document.getElementById('s-slider-starterStopSpeedLevel').setAttribute('disabled', false);
      let alert = new Alert("alert-warning",'<i class="fas fa-tachometer-alt"></i>',"Вход датчика скорости оборотов не сконфигурирован.")
    }
  });

  document.getElementById('starterStopOilPressureEnb').addEventListener( 'change', function() {
    var type = document.getElementById( 'oilPressureSensorType' );
    if ( this.disabled == true ) {
      let alert = new Alert("alert-warning",'<i class="fas fa-oil-can"></i>',"Вход датчика давления масла не сконфигурирован.")
    }
    if ( this.checked == true ) {
      if ( type.value == 0 ) {
        this.checked = false;
        document.getElementById('sinput-starterStopOilPressureLevel').disabled = true;
        document.getElementById('s-slider-starterStopOilPressureLevel').setAttribute('disabled', false);
        let alert = new Alert("alert-warning",'<i class="fas fa-oil-can"></i>',"Вход датчика давления масла не сконфигурирован.")
      } else if ( ( type.value == 1 ) || ( type.value == 2 ) ) {
        let alert = new Alert("alert-warning",'<i class="fas fa-oil-can"></i>',"Дискретный датчик давления масла недостаточно точен для критерия остановки стартера.")
      }
    }
  });

}
