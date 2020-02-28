var data = [{
    "scale": 1.0,
    "adr": 0,
    "name": "moduleSetup",
    "min": 0.0,
    "max": 3.0,
    "value": 3,
    "bitMapSize": 2,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 1,
            "mask": 1,
            "name": "moduleType",
            "min": 0
        },
        {
            "shift": 1,
            "max": 1,
            "mask": 2,
            "name": "alarmAllBlock",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 1,
    "name": "oilPressureSetup",
    "min": 0.0,
    "max": 63.0,
    "value": 50,
    "bitMapSize": 4,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 11,
            "mask": 15,
            "name": "oilPressureSensorType",
            "min": 0
        },
        {
            "shift": 4,
            "max": 1,
            "mask": 16,
            "name": "oilPressureEnbOpenCircuitAlarm",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "oilPressureAlarmEnb",
            "min": 0
        },
        {
            "shift": 6,
            "max": 1,
            "mask": 64,
            "name": "oilPressurePreAlarmEnb",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 2,
    "name": "oilPressureAlarmLevel",
    "min": 0.0,
    "max": 10.3,
    "value": 1.3,
    "bitMapSize": 0,
    "len": 1,
    "units": "Atm",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 3,
    "name": "oilPressurePreAlarmLevel",
    "min": 0.0,
    "max": 10.3,
    "value": 0.5,
    "bitMapSize": 0,
    "len": 1,
    "units": "Atm",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 4,
    "name": "coolantTempSetup",
    "min": 0.0,
    "max": 63.0,
    "value": 51,
    "bitMapSize": 6,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 11,
            "mask": 15,
            "name": "coolantTempSensorType",
            "min": 0
        },
        {
            "shift": 4,
            "max": 1,
            "mask": 16,
            "name": "coolantTempEnbOpenCircuitAlarm",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "coolantHightTempAlarmEnb",
            "min": 0
        },
        {
            "shift": 6,
            "max": 1,
            "mask": 64,
            "name": "coolantHightTempPreAlarmEnb",
            "min": 0
        },
        {
            "shift": 7,
            "max": 1,
            "mask": 128,
            "name": "coolantTempHeaterEnb",
            "min": 0
        },
        {
            "shift": 8,
            "max": 1,
            "mask": 256,
            "name": "coolantTempCoolerEnb",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 5,
    "name": "coolantHightTempAlarmLevel",
    "min": 0.0,
    "max": 250.0,
    "value": 96.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "C",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 6,
    "name": "coolantHightTempPreAlarmLevel",
    "min": 0.0,
    "max": 250.0,
    "value": 90.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "C",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 7,
    "name": "coolantTempHeaterOffLevel",
    "min": 0.0,
    "max": 250.0,
    "value": 60.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "C",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 8,
    "name": "coolantTempHeaterOnLevel",
    "min": 0.0,
    "max": 250.0,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "C",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 9,
    "name": "coolantTempCoolerOffLevel",
    "min": 0.0,
    "max": 250.0,
    "value": 120.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "C",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 10,
    "name": "coolantTempCoolerOnLevel",
    "min": 0.0,
    "max": 250.0,
    "value": 80.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "C",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 11,
    "name": "fuelLevelSetup",
    "min": 0.0,
    "max": 1023.0,
    "value": 665,
    "bitMapSize": 8,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 5,
            "mask": 7,
            "name": "fuelLevelSensorType",
            "min": 0
        },
        {
            "shift": 3,
            "max": 1,
            "mask": 8,
            "name": "fuelLevelLowAlarmEnb",
            "min": 0
        },
        {
            "shift": 4,
            "max": 1,
            "mask": 16,
            "name": "fuelLevelLowAlarmAction",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "fuelLevelLowPreAlarmEnb",
            "min": 0
        },
        {
            "shift": 6,
            "max": 1,
            "mask": 64,
            "name": "fuelLevelHightPreAlarmLevelEnb",
            "min": 0
        },
        {
            "shift": 7,
            "max": 1,
            "mask": 128,
            "name": "fuelLevelHightAlarmEnb",
            "min": 0
        },
        {
            "shift": 8,
            "max": 1,
            "mask": 256,
            "name": "fuelLevelHightAlarmAction",
            "min": 0
        },
        {
            "shift": 9,
            "max": 1,
            "mask": 512,
            "name": "fuelPumpEnb",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 12,
    "name": "fuelLevelLowAlarmLevel",
    "min": 0.0,
    "max": 95.0,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 13,
    "name": "fuelLevelLowAlarmDelay",
    "min": 0.0,
    "max": 3600.0,
    "value": 100.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 14,
    "name": "fuelLevelLowPreAlarmLevel",
    "min": 1.0,
    "max": 96.0,
    "value": 25.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 15,
    "name": "fuelLevelLowPreAlarmDelay",
    "min": 0.0,
    "max": 3600.0,
    "value": 100.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 16,
    "name": "fuelLevelHightPreAlarmLevel",
    "min": 3.0,
    "max": 98.0,
    "value": 65.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 17,
    "name": "fuelLevelHightPreAlarmDelay",
    "min": 0.0,
    "max": 3600.0,
    "value": 0.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 18,
    "name": "fuelLevelHightAlarmLevel",
    "min": 5.0,
    "max": 100.0,
    "value": 90.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 19,
    "name": "fuelLevelHightAlarmDelay",
    "min": 0.0,
    "max": 3600.0,
    "value": 0.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 20,
    "name": "fuelPumpOnLevel",
    "min": 0.0,
    "max": 100.0,
    "value": 30.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 21,
    "name": "fuelPumpOffLevel",
    "min": 0.0,
    "max": 100.0,
    "value": 70.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 22,
    "name": "diaSetup",
    "min": 0.0,
    "max": 1023.0,
    "value": 0,
    "bitMapSize": 4,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 27,
            "mask": 31,
            "name": "diaFunction",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "diaPolarity",
            "min": 0
        },
        {
            "shift": 6,
            "max": 3,
            "mask": 192,
            "name": "diaAction",
            "min": 0
        },
        {
            "shift": 8,
            "max": 4,
            "mask": 768,
            "name": "diaArming",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 23,
    "name": "diaDelay",
    "min": 0.0,
    "max": 60.0,
    "value": 15.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 24,
    "name": "dibSetup",
    "min": 0.0,
    "max": 1023.0,
    "value": 0,
    "bitMapSize": 4,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 27,
            "mask": 31,
            "name": "dibFunction",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "dibPolarity",
            "min": 0
        },
        {
            "shift": 6,
            "max": 3,
            "mask": 192,
            "name": "dibAction",
            "min": 0
        },
        {
            "shift": 8,
            "max": 4,
            "mask": 768,
            "name": "dibArming",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 25,
    "name": "dibDelay",
    "min": 0.0,
    "max": 60.0,
    "value": 15.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 26,
    "name": "dicSetup",
    "min": 0.0,
    "max": 1023.0,
    "value": 0,
    "bitMapSize": 4,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 27,
            "mask": 31,
            "name": "dicFunction",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "dicPolarity",
            "min": 0
        },
        {
            "shift": 6,
            "max": 3,
            "mask": 192,
            "name": "dicAction",
            "min": 0
        },
        {
            "shift": 8,
            "max": 4,
            "mask": 768,
            "name": "dicArming",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 27,
    "name": "dicDelay",
    "min": 0.0,
    "max": 60.0,
    "value": 15.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 28,
    "name": "didSetup",
    "min": 0.0,
    "max": 1023.0,
    "value": 64,
    "bitMapSize": 4,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 27,
            "mask": 31,
            "name": "didFunction",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "didPolarity",
            "min": 0
        },
        {
            "shift": 6,
            "max": 3,
            "mask": 192,
            "name": "didAction",
            "min": 0
        },
        {
            "shift": 8,
            "max": 4,
            "mask": 768,
            "name": "didArming",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 29,
    "name": "didDelay",
    "min": 0.0,
    "max": 60.0,
    "value": 15.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 30,
    "name": "doSetup",
    "min": 0.0,
    "max": 1023.0,
    "value": 21,
    "bitMapSize": 6,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 1,
            "mask": 1,
            "name": "doaNOC",
            "min": 0
        },
        {
            "shift": 1,
            "max": 1,
            "mask": 2,
            "name": "dobNOC",
            "min": 0
        },
        {
            "shift": 2,
            "max": 1,
            "mask": 4,
            "name": "docNOC",
            "min": 0
        },
        {
            "shift": 3,
            "max": 1,
            "mask": 8,
            "name": "dodNOC",
            "min": 0
        },
        {
            "shift": 4,
            "max": 1,
            "mask": 16,
            "name": "doeNOC",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "dofNOC",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 31,
    "name": "doabType",
    "min": 0.0,
    "max": 1023.0,
    "value": 0,
    "bitMapSize": 2,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 255,
            "mask": 255,
            "name": "doaType",
            "min": 0
        },
        {
            "shift": 8,
            "max": 255,
            "mask": 65280,
            "name": "dobType",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 32,
    "name": "dodType",
    "min": 0.0,
    "max": 1023.0,
    "value": 0,
    "bitMapSize": 2,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 255,
            "mask": 255,
            "name": "docType",
            "min": 0
        },
        {
            "shift": 8,
            "max": 255,
            "mask": 65280,
            "name": "doType",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 33,
    "name": "doefType",
    "min": 0.0,
    "max": 1023.0,
    "value": 0,
    "bitMapSize": 2,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 255,
            "mask": 255,
            "name": "doeType",
            "min": 0
        },
        {
            "shift": 8,
            "max": 255,
            "mask": 65280,
            "name": "dofType",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 34,
    "name": "timerMainsTransientDelay",
    "min": 0.0,
    "max": 30.0,
    "value": 2.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 35,
    "name": "timerStartDelay",
    "min": 0.0,
    "max": 36000.0,
    "value": 5.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 36,
    "name": "timerCranking",
    "min": 3.0,
    "max": 60.0,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 37,
    "name": "timerCrankDelay",
    "min": 3.0,
    "max": 60.0,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 38,
    "name": "timerStartupIdleTime",
    "min": 0.0,
    "max": 60.0,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 39,
    "name": "timerNominalRPMDelay",
    "min": 0.0,
    "max": 60.0,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 40,
    "name": "timerSafetyOnDelay",
    "min": 0.0,
    "max": 60.0,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 41,
    "name": "timerWarming",
    "min": 0.0,
    "max": 3600.0,
    "value": 1.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 42,
    "name": "timerTransferDelay",
    "min": 0.0,
    "max": 600.0,
    "value": 0.7,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 43,
    "name": "timerBreakerTripPulse",
    "min": 0.0,
    "max": 5.0,
    "value": 0.5,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 44,
    "name": "timerBreakerClosePulse",
    "min": 0.0,
    "max": 5.0,
    "value": 0.5,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 45,
    "name": "timerReturnDelay",
    "min": 0.0,
    "max": 18000.0,
    "value": 30.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 46,
    "name": "timerCooling",
    "min": 0.0,
    "max": 3600.0,
    "value": 60.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 47,
    "name": "timerCoolingIdle",
    "min": 0.0,
    "max": 900.0,
    "value": 0.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 48,
    "name": "timerSolenoidHold",
    "min": 0.0,
    "max": 120.0,
    "value": 0.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 49,
    "name": "timerFailStopDelay",
    "min": 10.0,
    "max": 120.0,
    "value": 30.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 50,
    "name": "timerGenTransientDelay",
    "min": 0.0,
    "max": 30.0,
    "value": 0.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 51,
    "name": "genSetup",
    "min": 0.0,
    "max": 255.0,
    "value": 104,
    "bitMapSize": 4,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 1,
            "mask": 1,
            "name": "genPowerGeneratorControlEnb",
            "min": 0
        },
        {
            "shift": 1,
            "max": 16,
            "mask": 30,
            "name": "genPoles",
            "min": 0
        },
        {
            "shift": 5,
            "max": 5,
            "mask": 224,
            "name": "genAcSys",
            "min": 0
        },
        {
            "shift": 8,
            "max": 1,
            "mask": 256,
            "name": "genLocationCurrentTransformer",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 52,
    "name": "genRatedActivePower",
    "min": 0.0,
    "max": 20000.0,
    "value": 40000.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "kW",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 53,
    "name": "genRatedReactivePower",
    "min": 0.0,
    "max": 20000.0,
    "value": 0.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "kVAR",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 54,
    "name": "genRatedApparentPower",
    "min": 0.0,
    "max": 20000.0,
    "value": 200.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "kVA",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 55,
    "name": "genRatedFrequency",
    "min": 0.3,
    "max": 74.7,
    "value": 50.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "Hz",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 56,
    "name": "genCurrentPrimary",
    "min": 5.0,
    "max": 8000.0,
    "value": 600.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "A",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 57,
    "name": "genCurrentFullLoadRating",
    "min": 5.0,
    "max": 8000.0,
    "value": 500.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "A",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 58,
    "name": "genAlarms",
    "min": 0.0,
    "max": 65535.0,
    "value": 7167,
    "bitMapSize": 12,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 1,
            "mask": 1,
            "name": "genUnderVoltageAlarmEnb",
            "min": 0
        },
        {
            "shift": 1,
            "max": 1,
            "mask": 2,
            "name": "genUnderVoltagePreAlarmEnb",
            "min": 0
        },
        {
            "shift": 2,
            "max": 1,
            "mask": 4,
            "name": "genOverVoltagePreAlarmEnb",
            "min": 0
        },
        {
            "shift": 3,
            "max": 1,
            "mask": 8,
            "name": "genUnderFrequencyAlrmEnb",
            "min": 0
        },
        {
            "shift": 4,
            "max": 1,
            "mask": 16,
            "name": "genUnderFrequencyPreAlrmEnb",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "genOverFrequencyPreAlrmEnb",
            "min": 0
        },
        {
            "shift": 6,
            "max": 1,
            "mask": 64,
            "name": "genOverFrequencyAlarmEnb",
            "min": 0
        },
        {
            "shift": 7,
            "max": 1,
            "mask": 128,
            "name": "genCurrentOverloadProtectionEnb",
            "min": 0
        },
        {
            "shift": 8,
            "max": 1,
            "mask": 256,
            "name": "genCurrentOverPhaseImbalanceEnb",
            "min": 0
        },
        {
            "shift": 9,
            "max": 3,
            "mask": 1536,
            "name": "genCurrentOverAlarmAction",
            "min": 0
        },
        {
            "shift": 11,
            "max": 1,
            "mask": 2048,
            "name": "genCurrentOverloadProtectionAction",
            "min": 0
        },
        {
            "shift": 12,
            "max": 1,
            "mask": 4096,
            "name": "genCurrentOverPhaseImbalanceAction",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 59,
    "name": "genUnderVoltageAlarmLevel",
    "min": 86.0,
    "max": 708.0,
    "value": 318.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "V",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 60,
    "name": "genUnderVoltagePreAlarmLevel",
    "min": 88.0,
    "max": 710.0,
    "value": 339.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "V",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 61,
    "name": "genOverVoltagePreAlarmLevel",
    "min": 93.0,
    "max": 715.0,
    "value": 439.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "V",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 62,
    "name": "genOverVoltageAlarmLevel",
    "min": 95.0,
    "max": 717.0,
    "value": 458.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "V",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 63,
    "name": "genUnderFrequencyAlrmLevel",
    "min": 0.0,
    "max": 74.4,
    "value": 40.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "Hz",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 64,
    "name": "genUnderFrequencyPreAlrmLevel",
    "min": 0.1,
    "max": 74.5,
    "value": 42.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "Hz",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 65,
    "name": "genOverFrequencyPreAlrmLevel",
    "min": 0.4,
    "max": 74.8,
    "value": 54.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "Hz",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 66,
    "name": "genOverFrequencyAlrmLevel",
    "min": 0.5,
    "max": 74.9,
    "value": 55.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "Hz",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 67,
    "name": "genOverCurrentThermalProtectionLevel",
    "min": 0.0,
    "max": 120.0,
    "value": 20.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 68,
    "name": "genOverCurrentCutoffLevel",
    "min": 0.0,
    "max": 120.0,
    "value": 40.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 69,
    "name": "genOverCurrentAlarmLevel",
    "min": 50.0,
    "max": 120.0,
    "value": 100.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 70,
    "name": "genOverCurrentAlarmDelay",
    "min": 0.0,
    "max": 3600.0,
    "value": 60.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 71,
    "name": "genCurrentOverloadProtectionLevel",
    "min": 1.0,
    "max": 125.0,
    "value": 100.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 72,
    "name": "genCurrentOverloadProtectionDelay",
    "min": 0.0,
    "max": 3600.0,
    "value": 5.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 73,
    "name": "genCurrentOverPhaseImbalanceLevel",
    "min": 1.0,
    "max": 125.0,
    "value": 100.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "%",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 74,
    "name": "genCurrentOverPhaseImbalanceDelay",
    "min": 0.0,
    "max": 3600.0,
    "value": 60.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 75,
    "name": "mainsSetup",
    "min": 0.0,
    "max": 31.0,
    "value": 13,
    "bitMapSize": 3,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 1,
            "mask": 1,
            "name": "mainsControl",
            "min": 0
        },
        {
            "shift": 1,
            "max": 1,
            "mask": 2,
            "name": "mainsPowerOffImmediately",
            "min": 0
        },
        {
            "shift": 2,
            "max": 5,
            "mask": 28,
            "name": "mainAcSys",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 76,
    "name": "mainsAlarms",
    "min": 0.0,
    "max": 15.0,
    "value": 15,
    "bitMapSize": 4,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 1,
            "mask": 1,
            "name": "mainsUnderVoltageAlarm",
            "min": 0
        },
        {
            "shift": 1,
            "max": 1,
            "mask": 2,
            "name": "mainsOverVoltageAlarm",
            "min": 0
        },
        {
            "shift": 2,
            "max": 1,
            "mask": 4,
            "name": "mainsUnderFrequencyAlarm",
            "min": 0
        },
        {
            "shift": 3,
            "max": 1,
            "mask": 8,
            "name": "mainsOverFrequencyAlarm",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 77,
    "name": "mainsUnderVoltageAlarmLevel",
    "min": 86.0,
    "max": 713.0,
    "value": 318.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "V",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 78,
    "name": "mainsOverVoltageAlarmLevel",
    "min": 90.0,
    "max": 717.0,
    "value": 438.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "V",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 79,
    "name": "mainsUnderFrequencyAlarmLevel",
    "min": 0.0,
    "max": 74.7,
    "value": 45.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "Hz",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 80,
    "name": "mainsOverFrequencyAlarmLevel",
    "min": 0.2,
    "max": 74.9,
    "value": 52.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "Hz",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 81,
    "name": "engineSetup",
    "min": 0.0,
    "max": 63.0,
    "value": 51,
    "bitMapSize": 3,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 9,
            "mask": 15,
            "name": "engineStartAttempts",
            "min": 1
        },
        {
            "shift": 4,
            "max": 1,
            "mask": 16,
            "name": "enginePreHeatEnb",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "enginePostHeatEnb",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 82,
    "name": "enginePreHeatOn",
    "min": 0.0,
    "max": 100.0,
    "value": 50.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "C",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 83,
    "name": "enginePreHeatDuration",
    "min": 0.0,
    "max": 3600.0,
    "value": 0.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 84,
    "name": "enginePostHeatOn",
    "min": 0.0,
    "max": 100.0,
    "value": 50.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "C",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 85,
    "name": "enginePostHeatDuration",
    "min": 0.0,
    "max": 3600.0,
    "value": 0.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 86,
    "name": "crankSetup",
    "min": 0.0,
    "max": 7.0,
    "value": 10,
    "bitMapSize": 4,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 1,
            "mask": 1,
            "name": "crankDisconnectOilPressure",
            "min": 0
        },
        {
            "shift": 1,
            "max": 1,
            "mask": 2,
            "name": "crankOilPressureCheckOnStart",
            "min": 0
        },
        {
            "shift": 2,
            "max": 1,
            "mask": 4,
            "name": "crankDisconnectOilPressureEnb",
            "min": 0
        },
        {
            "shift": 3,
            "max": 1,
            "mask": 8,
            "name": "crankDisconnectChargeAlternatorEnb",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 87,
    "name": "crankDisconnectgenFreqLevel",
    "min": 0.0,
    "max": 40.0,
    "value": 21.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "Hz",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 88,
    "name": "crankDisconnectOilPressureLevel",
    "min": 0.5,
    "max": 4.0,
    "value": 2.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "Bar",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 89,
    "name": "crankDisconnectChargeAlternatorLevel",
    "min": 0.0,
    "max": 40.0,
    "value": 6.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "V",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 90,
    "name": "batteryAlarms",
    "min": 0.0,
    "max": 15.0,
    "value": 15,
    "bitMapSize": 4,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 1,
            "mask": 1,
            "name": "batteryUnderVoltageEnb",
            "min": 0
        },
        {
            "shift": 1,
            "max": 1,
            "mask": 2,
            "name": "batteryOverVoltageEnb",
            "min": 0
        },
        {
            "shift": 2,
            "max": 1,
            "mask": 4,
            "name": "batteryChargeShutdownEnb",
            "min": 0
        },
        {
            "shift": 3,
            "max": 1,
            "mask": 8,
            "name": "batteryChargeWarningEnb",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 91,
    "name": "batteryUnderVoltageLevel",
    "min": 0.0,
    "max": 39.7,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 92,
    "name": "batteryUnderVoltageDelay",
    "min": 0.0,
    "max": 86400.0,
    "value": 60.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 93,
    "name": "batteryOverVoltageLevel",
    "min": 0.3,
    "max": 40.0,
    "value": 30.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 94,
    "name": "batteryOverVoltageDelay",
    "min": 0.0,
    "max": 86400.0,
    "value": 60.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 95,
    "name": "batteryChargeShutdownLevel",
    "min": 0.0,
    "max": 38.9,
    "value": 4.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 96,
    "name": "batteryChargeShutdownDelay",
    "min": 0.0,
    "max": 3600.0,
    "value": 5.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 0.1,
    "adr": 97,
    "name": "batteryChargeWarningLevel",
    "min": 0.1,
    "max": 39.0,
    "value": 6.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 98,
    "name": "batteryChargeWarningDelay",
    "min": 0.0,
    "max": 3600.0,
    "value": 5.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "s",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 99,
    "name": "maintenanceAlarms",
    "min": 0.0,
    "max": 63.0,
    "value": 42,
    "bitMapSize": 6,
    "len": 1,
    "units": "",
    "bit": [
        {
            "shift": 0,
            "max": 1,
            "mask": 1,
            "name": "maintenanceAlarmOilEnb",
            "min": 0
        },
        {
            "shift": 1,
            "max": 1,
            "mask": 2,
            "name": "maintenanceAlarmOilAction",
            "min": 0
        },
        {
            "shift": 2,
            "max": 1,
            "mask": 4,
            "name": "maintenanceAlarmAirEnb",
            "min": 0
        },
        {
            "shift": 3,
            "max": 1,
            "mask": 8,
            "name": "maintenanceAlarmAirAction",
            "min": 0
        },
        {
            "shift": 4,
            "max": 1,
            "mask": 16,
            "name": "maintenanceAlarmFuelEnb",
            "min": 0
        },
        {
            "shift": 5,
            "max": 1,
            "mask": 32,
            "name": "maintenanceAlarmFuelAction",
            "min": 0
        }
    ],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 100,
    "name": "maintenanceAlarmOilEngineRunTime",
    "min": 10.0,
    "max": 5000.0,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "h",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 101,
    "name": "maintenanceAlarmAirEngineRunTime",
    "min": 10.0,
    "max": 5000.0,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "h",
    "bit": [],
    "type": "U",
    "page": 0
},{
    "scale": 1.0,
    "adr": 102,
    "name": "maintenanceAlarmFuelEngineRunTime",
    "min": 10.0,
    "max": 5000.0,
    "value": 10.0,
    "bitMapSize": 0,
    "len": 1,
    "units": "h",
    "bit": [],
    "type": "U",
    "page": 0
}]
