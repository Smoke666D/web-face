const zeroPad = (num, places) => String(num).padStart(places, '0');
const dashUnitType = {
  "status"   : 0,
  "time"     : 1,
  "direct"   : 2,
  "max"      : 3,
  "discrete" : 4,
  "logic"    : 5,
}
const deviceStatusMask = 0x000F;
const timeMask         = 0xFFF0;
const timeShift        = 8;
const logicDic = {
  "on"  : "ВКЛ",
  "off" : "ВЫКЛ",
};
const discreteDic = {
  "on"  : '✓',
  "off" : '✕',
}
const deviceStatus = {
  "idle"           : 0,
  "readyToStart"   : 1,
  "startDelay"     : 2,
  "prehearting"    : 3,
  "cranking"       : 4,
  "crankDelay"     : 5,
  "controlBlock"   : 6,
  "idleWork"       : 7,
  "warming"        : 8,
  "working"        : 9,
  "cooldown"       : 10,
  "idleCooldown"   : 11,
  "stopProcessing" : 12,
  "error"          : 13,
  "banStart"       : 14,
};
const deviceStatusStr = [
  "Загрузка...",
  "Готов к запуску",
  "Дистанционный пуск",
  "Предпрогрев",
  "Работа стартера",
  "Пауза стартера",
  "Возбуждение",
  "Прогрев Х.Х.",
  "Прогрев",
  "В работе",
  "Охлаждение",
  "Охлаждение Х.Х.",
  "Останов",
  "Аварийный останов",
  "Запрет пуска",
];
const cardNames = [
  "card-mains",
  "card-load",
  "card-gen",
  "card-fuel",
  "card-oil",
  "card-coolant",
  "card-speed",
  "card-battery",
  "card-charger",
];
const dashboardNames = [
  { name : 'value-status',         type : dashUnitType.status,   adr :  0,           shift : 0, },
  { name : 'value-timer',          type : dashUnitType.time,     adr :  0,           shift : 0, },
  { name : 'value-oilPressure',    type : dashUnitType.direct,   adr :  1,           shift : 0, },
  { name : 'value-coolantTemp',    type : dashUnitType.direct,   adr :  2,           shift : 0, },
  { name : 'value-fuelLevel',      type : dashUnitType.direct,   adr :  3,           shift : 0, },
  { name : 'value-speed',          type : dashUnitType.direct,   adr :  4,           shift : 0, },
  { name : 'value-mainsVoltage',   type : dashUnitType.max,      adr : [5, 6, 7],    shift : 0, },
  { name : 'value-mainsFreq',      type : dashUnitType.direct,   adr : 11,           shift : 0, },
  { name : 'value-genVoltage',     type : dashUnitType.max,      adr : [12, 13, 14], shift : 0, },
  { name : 'value-current',        type : dashUnitType.max,      adr : [18, 19, 20], shift : 0, },
  { name : 'value-gebFreq',        type : dashUnitType.direct,   adr : 21,           shift : 0, },
  { name : 'value-battery',        type : dashUnitType.direct,   adr : 26,           shift : 0, },
  { name : 'value-chargerVoltage', type : dashUnitType.direct,   adr : 27,           shift : 0, },
  { name : 'value-chargerStatus',  type : dashUnitType.logic,    adr : 28,           shift : 0, },
  { name : 'value-coolantHeater',  type : dashUnitType.logic,    adr : 28,           shift : 1, },
  { name : 'value-coolantCooler',  type : dashUnitType.logic,    adr : 28,           shift : 2, },
  { name : 'value-fuelPump',       type : dashUnitType.logic,    adr : 28,           shift : 3, },
  { name : 'value-preHeater',      type : dashUnitType.logic,    adr : 28,           shift : 4, },
  { name : 'value-doa',            type : dashUnitType.discrete, adr : 29,           shift : 0, },
  { name : 'value-dob',            type : dashUnitType.discrete, adr : 29,           shift : 1, },
  { name : 'value-doc',            type : dashUnitType.discrete, adr : 29,           shift : 2, },
  { name : 'value-dod',            type : dashUnitType.discrete, adr : 29,           shift : 3, },
  { name : 'value-doe',            type : dashUnitType.discrete, adr : 29,           shift : 4, },
  { name : 'value-dof',            type : dashUnitType.discrete, adr : 29,           shift : 5, },
  { name : 'value-dia',            type : dashUnitType.discrete, adr : 30,           shift : 0, },
  { name : 'value-dib',            type : dashUnitType.discrete, adr : 30,           shift : 1, },
  { name : 'value-dic',            type : dashUnitType.discrete, adr : 30,           shift : 2, },
  { name : 'value-did',            type : dashUnitType.discrete, adr : 30,           shift : 3, },
];
/*----------------------------------------------------------------------------*/
function DashUnit ( ) {
  var name   = "";
  var object = null;
  var type   = 0;
  var data   = [];
  var output = {
    adr   : 0,
    shift : 0,
  };
  /*--------------------------------------------------------------------------*/
  function statusCallBack ( adr ) {
    return deviceStatusStr[outputReg[adr].value & deviceStatusMask];
  }
  function timeCallBack ( adr ) {
    let time = ( outputReg[adr].value & timeMask ) >> timeShift;
    let min  = Math.trunc( time / 60 );
    let sec  = time - min * 60;
    return zeroPad( min, 2 ) + ":" + zeroPad( sec, 2 );
  }
  function directCallBack ( adr ) {
    return outputReg[adr].value * Math.pow( 10, outputReg[adr].scale );
  }
  function maxCallBack ( adr ) {
    var res = outputReg[adr[0]].value;
    for ( var i=1; i<data.length; i++ ) {
      if ( outputReg[adr[i]].value > res ) {
        res = outputReg[adr[i]].value;
      }
    }
    return ( res * Math.pow( 10, outputReg[adr[0]].scale ) );
  }
  function discreteCallBack ( adr, shift ) {
    res = discreteDic.off;
    if ( outputReg[adr].value & ( 1 << shift ) ) {
      res = discreteDic.on;
    }
    return res;
  }
  function logicCallBack ( adr, shift ) {
    let res = logicDic.off;
    if ( outputReg[adr].value & ( 1 << shift ) ) {
      res = logicDic.on;
    }
    return res;
  }
  function getCallBack () {
    var res = 0;
    switch ( type ) {
      case dashUnitType.status:
        res = statusCallBack( output.adr );
        break;
      case dashUnitType.time:
        res = timeCallBack( output.adr );
        break;
      case dashUnitType.direct:
        res = directCallBack( output.adr );
        break;
      case dashUnitType.max:
        res = maxCallBack( output.adr );
        break;
      case dashUnitType.discrete:
        res = discreteCallBack( output.adr, output.shift );
        break;
      case dashUnitType.logic:
        res = logicCallBack( output.adr, output.shift );
        break;
    }
    return res;
  }
  /*--------------------------------------------------------------------------*/
  this.init = function ( dashUnitData ) {
    name         = dashUnitData.name;
    output.adr   = dashUnitData.adr;
    output.shift = dashUnitData.shift;
    object       = document.getElementById( name );
    type         = dashUnitData.type;
    data         = [];
    return;
  }
  this.clean = function () {
    data = [];
    return;
  }
  this.update = function () {
    if ( object ) {
      let val = getCallBack();
      object.innerText = val;
      data.push( val );
    }
    return;
  }
  this.getData = function () {
    return data;
  }
  /*--------------------------------------------------------------------------*/
  return;
}
function DashCard () {
  const warningStr = "bg-warning";
  const dangerStr  = "bg-danger";
  const colorStr   = "text-white";
  const fillStr    = "fill-white"
  var   object     = null;
  var   icon       = null;

  this.init       = function ( name ) {
    object = document.getElementById( name );
    icon   = object.childNodes[1].childNodes[3].childNodes[1];
    return;
  }
  this.setNormal  = function () {
    if ( object ) {
      object.classList.remove( warningStr );
      object.classList.remove( dangerStr );
      object.classList.remove( colorStr );
      icon.classList.remove( fillStr );
    }
  }
  this.setWarning = function () {
    if ( object ) {
      object.classList.add( warningStr );
      object.classList.remove( dangerStr );
      object.classList.add( colorStr );
      icon.classList.add( fillStr );
    }
  }
  this.setDanger  = function () {
    if ( object ) {
      object.classList.remove( warningStr );
      object.classList.add( dangerStr );
      object.classList.add( colorStr );
      icon.classList.add( fillStr );
    }
  }
  return;
}
function Dashbord ( ) {
  var units = [];
  var cards = [];
  this.init = function () {
    units = [];
    cards = [];
    for ( var i=0; i<dashboardNames.length; i++ ) {
      units.push( new DashUnit() );
      units[units.length - 1].init( dashboardNames[i] );
    }
    for ( var i=0; i<cardNames.length; i++ ) {
      cards.push( new DashCard() );
      cards[cards.length - 1].init( cardNames[i] );
    }
    this.update();
    return;
  }
  this.clean  = function () {
    for ( var i=0; i< units.length; i++ ) {
      units[i].clean();
    }
    return;
  }
  this.update = function () {
    for ( var i=0; i< units.length; i++ ) {
      units[i].update();
    }
    return;
  }
  return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
let dashbord = new Dashbord();
/*----------------------------------------------------------------------------*/
module.exports.dashbord = dashbord;
/*----------------------------------------------------------------------------*/
