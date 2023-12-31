const zeroPad = (num, places) => String(num).padStart(places, '0');
const dashUnitType = {
  "status"   : 0,
  "time"     : 1,
  "direct"   : 2,
  "max"      : 3,
  "discrete" : 4,
  "logic"    : 5,
  "free"     : 6,
}
const deviceStatusMask = 0x000F;
const timeMask         = 0xFFF0;
const timeShift        = 4;
const logicDic = {
  "on"  : '►',
  "off" : '⬛',
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
  "Не подключен",        /* 00 */
  "Готов к запуску",     /* 01 */
  "Дистанционный пуск",  /* 02 */
  "Предпрогрев",         /* 03 */
  "Работа стартера",     /* 04 */
  "Пауза стартера",      /* 05 */
  "Возбуждение",         /* 06 */
  "Прогрев Х.Х.",        /* 07 */
  "Прогрев",             /* 08 */
  "В работе",            /* 09 */
  "Охлаждение",          /* 10 */
  "Охлаждение Х.Х.",     /* 11 */
  "Останов",             /* 12 */
  "Аварийный останов",   /* 13 */
  "Запрет пуска",        /* 14 */
];
const errorDic = {
  "errorExternEmegencyStop" : 0,
  "errorStartFail"          : 1,
  "errorStopFail"           : 2,
  "errorOilLowPressure"     : 3,
  "errorOilSensor"          : 4,
  "errorTempHight"          : 5,
  "errorTempSensor"         : 6,
  "errorFuelLowLevel"       : 7,
  "errorFuelHightLevel"     : 8,
  "errorFuelSensor"         : 9,
  "errorSpeedHight"         : 10,
  "errorSpeedLow"           : 11,
  "errorSpeedSensor"        : 12,
  "errorGenLowVoltage"      : 13,
  "errorGenHightVoltage"    : 14,
  "errorGenLowFreq"         : 15,
  "errorGenHightFreq"       : 16,
  "errorGenPhaseSeq"        : 17,
  "errorPhaseImbalance"     : 18,
  "errorOverCurrent"        : 19,
  "errorOverPower"          : 20,
  "errorShortCircuit"       : 21,
  "errorMainsPhaseSeq"      : 22,
  "errorMaintenanceOil"     : 23,
  "errorMaintenanceAir"     : 24,
  "errorMaintenanceFuel"    : 25,
  "errorSensorCommon"       : 26,
  "errorIterruptedStart"    : 27,
  "errorIterruptedStop"     : 28,
  "errorUserA"              : 29,
  "errorUserB"              : 30,
  "errorUserC"              : 31,
  "errorUserD"              : 32,
};
const warningDic = {
  "warningMainsLowVoltage"   : 0,
  "warningMainsHightVoltage" : 1,
  "warningMainsLowFreq"      : 2,
  "warningMainsHightFreq"    : 3,
  "warningGenLowVoltage"     : 4,
  "warningGenHightVoltage"   : 5,
  "warningGenLowFreq"        : 6,
  "warningGenHightFreq"      : 7,
  "warningBatteryLow"        : 8,
  "warningBatteryHight"      : 9,
  "warningOverCurrent"       : 10,
  "warningChargerFail"       : 11,
  "warningFuelLowLevel"      : 12,
  "warningFuelHightLevel"    : 13,
  "warningTempHight"         : 14,
  "warningOilLowPressure"    : 15,
  "warningMaintenanceOil"    : 16,
  "warningMaintenanceAir"    : 17,
  "warningMaintenanceFuel"   : 18,
};
const cardNames = [
  {
    name    : "cars-status",
    error   : [
      errorDic.errorExternEmegencyStop,
      errorDic.errorStartFail,
      errorDic.errorStopFail,
      errorDic.errorMainsPhaseSeq,
      errorDic.errorMaintenanceOil,
      errorDic.errorMaintenanceAir,
      errorDic.errorMaintenanceFuel,
      errorDic.errorSensorCommon,
      errorDic.errorUserA,
      errorDic.errorUserB,
      errorDic.errorUserC,
      errorDic.errorUserD,
    ],
    warning : [],
  },
  {
    name    : "card-mains",
    error   : [],
    warning : [
      warningDic.warningMainsLowVoltage,
      warningDic.warningMainsHightVoltage,
      warningDic.warningMainsLowFreq,
      warningDic.warningMainsHightFreq,
    ] },
  {
    name    : "card-load",
    error   : [
      errorDic.errorPhaseImbalance,
      errorDic.errorOverCurrent,
      errorDic.errorOverPower,
      errorDic.errorShortCircuit,
    ],
    warning : [warningDic.warningOverCurrent]
  },
  {
    name    : "card-gen",
    error   : [
      errorDic.errorGenLowVoltage,
      errorDic.errorGenHightVoltage,
      errorDic.errorGenLowFreq,
      errorDic.errorGenHightFreq,
      errorDic.errorGenPhaseSeq,
    ],
    warning : [
      warningDic.warningGenLowVoltage,
      warningDic.warningGenHightVoltage,
      warningDic.warningGenLowFreq,
      warningDic.warningGenHightFreq,
    ]
  },
  {
    name    : "card-fuel",
    error   : [
      errorDic.errorFuelLowLevel,
      errorDic.errorFuelHightLevel,
      errorDic.errorFuelSensor,
    ],
    warning : [
      warningDic.warningFuelLowLevel,
      warningDic.warningFuelHightLevel,
    ]
  },
  {
    name    : "card-oil",
    error   : [
      errorDic.errorOilLowPressure,
      errorDic.errorOilSensor,
    ],
    warning : [warningDic.warningOilLowPressure]
  },
  {
    name    : "card-coolant",
    error   : [
      errorDic.errorTempHight,
      errorDic.errorTempSensor,
    ],
    warning : [warningDic.warningTempHight]
  },
  {
    name    : "card-speed",
    error   : [
      errorDic.errorSpeedHight,
      errorDic.errorSpeedLow,
      errorDic.errorSpeedSensor,
    ],
    warning : []
  },
  {
    name    : "card-battery",
    error   : [],
    warning : [
      warningDic.warningBatteryLow,
      warningDic.warningBatteryHight,
    ]
  },
  {
    name    : "card-charger",
    error   : [],
    warning : [warningDic.warningChargerFail]
  },
];
const cardState = {
  "normal"  : 0,
  "error"   : 1,
  "warning" : 2,
};
const dashboardNames = [
  { name : 'value-status',             type : dashUnitType.status,   adr :  39,          shift : 0, },
  //{ name : 'value-timer',              type : dashUnitType.time,     adr :  39,          shift : 0, },
  { name : 'value-oilPressure',        type : dashUnitType.direct,   adr :  0,           shift : 0, },
  { name : 'value-coolantTemp',        type : dashUnitType.direct,   adr :  1,           shift : 0, },
  { name : 'value-fuelLevel',          type : dashUnitType.direct,   adr :  2,           shift : 0, },
  { name : 'value-speed',              type : dashUnitType.direct,   adr :  3,           shift : 0, },
  { name : 'value-mainsVoltage',       type : dashUnitType.max,      adr : [4, 5, 6],    shift : 0, },
  { name : 'value-mainsFreq',          type : dashUnitType.direct,   adr : 10,           shift : 0, },
  { name : 'value-genVoltage',         type : dashUnitType.max,      adr : [11, 12, 13], shift : 0, },
  { name : 'value-current',            type : dashUnitType.max,      adr : [17, 18, 19], shift : 0, },
  { name : 'value-gebFreq',            type : dashUnitType.direct,   adr : 20,           shift : 0, },
  { name : 'value-battery',            type : dashUnitType.direct,   adr : 25,           shift : 0, },
  { name : 'value-chargerVoltage',     type : dashUnitType.direct,   adr : 26,           shift : 0, },
  { name : 'value-chargerStatus',      type : dashUnitType.logic,    adr : 27,           shift : 0, },
  { name : 'value-coolantHeater',      type : dashUnitType.logic,    adr : 27,           shift : 1, },
  { name : 'value-coolantCooler',      type : dashUnitType.logic,    adr : 27,           shift : 2, },
  { name : 'value-fuelPump',           type : dashUnitType.logic,    adr : 27,           shift : 3, },
  { name : 'value-preHeater',          type : dashUnitType.logic,    adr : 27,           shift : 4, },
  { name : 'value-engineRunTime',      type : dashUnitType.free,     adr : 28,           shift : 0 },
  { name : 'value-engineRunMin',       type : dashUnitType.free,     adr : 29,           shift : 0 },
  { name : 'value-engineStartsNumber', type : dashUnitType.free,     adr : 30,           shift : 0 },
  { name : 'value-powerReactiveRate',  type : dashUnitType.free,     adr : 31,           shift : 0 },
  { name : 'value-powerActiveRate',    type : dashUnitType.free,     adr : 32,           shift : 0 },
  { name : 'value-powerFullRate',      type : dashUnitType.free,     adr : 33,           shift : 0 },
  { name : 'value-fuelUsage',          type : dashUnitType.free,     adr : 34,           shift : 0 },
  { name : 'value-fuelMomentalRate',   type : dashUnitType.free,     adr : 35,           shift : 0 },
  { name : 'value-fuelAverageRate',    type : dashUnitType.free,     adr : 36,           shift : 0 },
  { name : 'value-doa',                type : dashUnitType.discrete, adr : 37,           shift : 0, },
  { name : 'value-dob',                type : dashUnitType.discrete, adr : 37,           shift : 1, },
  { name : 'value-doc',                type : dashUnitType.discrete, adr : 37,           shift : 2, },
  { name : 'value-dod',                type : dashUnitType.discrete, adr : 37,           shift : 3, },
  { name : 'value-doe',                type : dashUnitType.discrete, adr : 37,           shift : 4, },
  { name : 'value-dof',                type : dashUnitType.discrete, adr : 37,           shift : 5, },
  { name : 'value-dia',                type : dashUnitType.discrete, adr : 38,           shift : 0, },
  { name : 'value-dib',                type : dashUnitType.discrete, adr : 38,           shift : 1, },
  { name : 'value-dic',                type : dashUnitType.discrete, adr : 38,           shift : 2, },
  { name : 'value-did',                type : dashUnitType.discrete, adr : 38,           shift : 3, },
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
  function isTimerStatus ( status ) {
    let out = true;
    if ( ( status == 0  ) ||
         ( status == 1  ) ||
         ( status == 9  ) ||
         ( status == 13 ) ||
         ( status == 14 ) ) {
      out = false;
    }
    return out;
  }
  function statusCallBack ( adr ) {
    let out = "Неизвестный статус";
    let num = outputReg[adr].value & deviceStatusMask;
    if ( num < deviceStatusStr.length ) {
      out = deviceStatusStr[num];
    }
    return out;
  }
  function timeCallBack ( adr ) {
    let out = "00:00";
    if ( isTimerStatus( outputReg[adr].value & deviceStatusMask ) == true ) {
      let time = ( outputReg[adr].value & timeMask ) >> timeShift;
      console.log( outputReg[adr].value >> timeShift );
      let min  = Math.trunc( time / 60 );
      let sec  = time - min * 60;
      out = zeroPad( min, 2 ) + ":" + zeroPad( sec, 2 );
    }
    return out;
  }
  function directCallBack ( adr ) {
    return ( outputReg[adr].value * Math.pow( 10, outputReg[adr].scale )).toFixed( Math.abs( outputReg[adr].scale ) );
  }
  function freeCallBack ( adr ) {
    return outputReg[adr].value;
  }
  function maxCallBack ( adr ) {
    let res = outputReg[adr[0]].value;
    for ( var i=1; i<adr.length; i++ ) {
      if ( outputReg[adr[i]].value > res ) {
        res = outputReg[adr[i]].value;
      }
    }
    return directCallBack( adr[0] );
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
      case dashUnitType.free:
        res = freeCallBack( output.adr );
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
  const workingStr = "bg-success";
  const colorStr   = "text-white";
  const fillStr    = "fill-white"
  var   object     = null;
  var   icon       = null;
  var   errors     = [];
  var   warnings   = [];
  var   state      = cardState.normal;

  function setNormal () {
    if ( object ) {
      object.classList.remove( warningStr );
      object.classList.remove( workingStr );
      object.classList.remove( dangerStr );
      object.classList.remove( colorStr );
      icon.classList.remove( fillStr );
    }
    return;
  }
  function setWarning () {
    if ( object ) {
      object.classList.add( warningStr );
      object.classList.remove( workingStr );
      object.classList.remove( dangerStr );
      object.classList.add( colorStr );
      icon.classList.add( fillStr );
    }
    return;
  }
  function setDanger () {
    if ( object ) {
      object.classList.remove( warningStr );
      object.classList.remove( workingStr );
      object.classList.add( dangerStr );
      object.classList.add( colorStr );
      icon.classList.add( fillStr );
    }
    return;
  }
  function setWorking () {
    if ( object ) {
      object.classList.remove( warningStr );
      object.classList.add( workingStr );
      object.classList.remove( dangerStr );
      object.classList.add( colorStr );
      icon.classList.add( fillStr );
    }
  }
  function checkState ( warningList, errorList ) {
    var res = cardState.normal;
    for ( var i=0; i<warnings.length; i++ ) {
      if ( warningList[warnings[i]] > 0 ) {
        res = cardState.warning;
      }
    }
    for ( var i=0; i<errors.length; i++ ) {
      if ( errorList[errors[i]] > 0 ) {
        res = cardState.error;
      }
    }
    return res;
  }

  this.init   = function ( data ) {
    object   = document.getElementById( data.name );
    icon     = object.childNodes[1].childNodes[3].childNodes[1];
    errors   = data.error;
    warnings = data.warning;
    return;
  }
  this.update = function ( warningList, errorList ) {
    let stateNew = checkState( warningList, errorList );
    if ( ( stateNew == cardState.warning ) && ( state != cardState.warning ) ) {
      setWarning();
      state = cardState.warning;
    }
    if ( ( stateNew == cardState.error ) && ( state != cardState.error ) ) {
      setDanger();
      state = cardState.error;
    }
    if ( ( stateNew == cardState.normal ) && ( state != cardState.normal ) ) {
      setNormal();
      state = cardState.normal;
    }
    return;
  }
  return;
}
function Dashboard ( ) {
  var units = [];
  var cards = [];

  function getErrorList () {
    let out = [];
    for ( var i=0; i<outputReg[41].bitMapSize; i++ ) {
      out.push( outputReg[41].value & outputReg[41].bit[i].mask );
    }
    for ( var i=0; i<outputReg[42].bitMapSize; i++ ) {
      out.push( outputReg[42].value & outputReg[42].bit[i].mask );
    }
    return out;
  }
  function getWarningList () {
    let out = [];
    for ( var i=0; i<outputReg[44].bitMapSize; i++ ) {
      out.push( outputReg[44].value & outputReg[44].bit[i].mask );
    }
    for ( var i=0; i<outputReg[45].bitMapSize; i++ ) {
      out.push( outputReg[45].value & outputReg[45].bit[i].mask );
    }
    return out;
  }

  this.init   = function () {
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
  this.update = function ( callback = null ) {
    let warningList = getWarningList();
    let errorList   = getErrorList();
    for ( var i=0; i<units.length; i++ ) {
      units[i].update();
    }
    for ( var i=0; i<cards.length; i++ ) {
      cards[i].update( warningList, errorList );
    }
    if ( callback != null ) {
      callback();
    }
    return;
  }
  return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
let dashboard = new Dashboard();
/*----------------------------------------------------------------------------*/
module.exports.dashboard = dashboard;
/*----------------------------------------------------------------------------*/
