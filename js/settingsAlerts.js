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
        console.log(this.checked);
        checkDO( targets[i] );
      }
    });
  }
}
