var dataReg = [{
    "page": 0,
    "adr": 0,
    "name": "versionController",
    "value": 1,
    "scale": 0,
    "min": 0,
    "max": 0,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 1,
    "name": "versionFirmware",
    "value": 1,
    "scale": 0,
    "min": 0,
    "max": 0,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 2,
    "name": "serialNumber",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 0,
    "units": "",
    "type": "U",
    "len": 6,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 8,
    "name": "displayBrightnesLevel",
    "value": 50,
    "scale": 0,
    "min": 0,
    "max": 100,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 9,
    "name": "displayContarstLevel",
    "value": 30,
    "scale": 0,
    "min": 0,
    "max": 100,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 10,
    "name": "displaySleepDelay",
    "value": 10,
    "scale": 0,
    "min": 2,
    "max": 600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 11,
    "name": "moduleSetup",
    "value": 3,
    "scale": 0,
    "min": 0,
    "max": 3,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 2,
    "bit": [
        {
            "name": "moduleType",
            "mask": 1,
            "min": 0,
            "shift": 0,
            "max": 1
        },
        {
            "name": "alarmAllBlock",
            "mask": 2,
            "min": 0,
            "shift": 1,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 12,
    "name": "oilPressureSetup",
    "value": 50,
    "scale": 0,
    "min": 0,
    "max": 63,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 4,
    "bit": [
        {
            "name": "oilPressureSensorType",
            "mask": 15,
            "min": 0,
            "shift": 0,
            "max": 11
        },
        {
            "name": "oilPressureOpenCircuitAlarmEnb",
            "mask": 16,
            "min": 0,
            "shift": 4,
            "max": 1
        },
        {
            "name": "oilPressureAlarmEnb",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        },
        {
            "name": "oilPressurePreAlarmEnb",
            "mask": 64,
            "min": 0,
            "shift": 6,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 13,
    "name": "oilPressureAlarmLevel",
    "value": 13,
    "scale": -1,
    "min": 0,
    "max": 103,
    "units": "\u0411\u0430\u0440",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 14,
    "name": "oilPressurePreAlarmLevel",
    "value": 5,
    "scale": -1,
    "min": 0,
    "max": 103,
    "units": "\u0411\u0430\u0440",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 15,
    "name": "coolantTempSetup",
    "value": 51,
    "scale": 0,
    "min": 0,
    "max": 63,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 6,
    "bit": [
        {
            "name": "coolantTempSensorType",
            "mask": 15,
            "min": 0,
            "shift": 0,
            "max": 11
        },
        {
            "name": "coolantTempOpenCircuitAlarmEnb",
            "mask": 16,
            "min": 0,
            "shift": 4,
            "max": 1
        },
        {
            "name": "coolantHightTempAlarmEnb",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        },
        {
            "name": "coolantHightTempPreAlarmEnb",
            "mask": 64,
            "min": 0,
            "shift": 6,
            "max": 1
        },
        {
            "name": "coolantTempHeaterEnb",
            "mask": 128,
            "min": 0,
            "shift": 7,
            "max": 1
        },
        {
            "name": "coolantTempCoolerEnb",
            "mask": 256,
            "min": 0,
            "shift": 8,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 16,
    "name": "coolantHightTempAlarmLevel",
    "value": 96,
    "scale": 0,
    "min": 0,
    "max": 250,
    "units": "C",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 17,
    "name": "coolantHightTempPreAlarmLevel",
    "value": 90,
    "scale": 0,
    "min": 0,
    "max": 250,
    "units": "C",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 18,
    "name": "coolantTempHeaterOffLevel",
    "value": 60,
    "scale": 0,
    "min": 0,
    "max": 250,
    "units": "C",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 19,
    "name": "coolantTempHeaterOnLevel",
    "value": 10,
    "scale": 0,
    "min": 0,
    "max": 250,
    "units": "C",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 20,
    "name": "coolantTempCoolerOffLevel",
    "value": 120,
    "scale": 0,
    "min": 0,
    "max": 250,
    "units": "C",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 21,
    "name": "coolantTempCoolerOnLevel",
    "value": 80,
    "scale": 0,
    "min": 0,
    "max": 250,
    "units": "C",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 22,
    "name": "fuelLevelSetup",
    "value": 665,
    "scale": 0,
    "min": 0,
    "max": 1023,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 8,
    "bit": [
        {
            "name": "fuelLevelSensorType",
            "mask": 7,
            "min": 0,
            "shift": 0,
            "max": 5
        },
        {
            "name": "fuelLevelLowAlarmEnb",
            "mask": 8,
            "min": 0,
            "shift": 3,
            "max": 1
        },
        {
            "name": "fuelLevelLowAlarmAction",
            "mask": 16,
            "min": 0,
            "shift": 4,
            "max": 1
        },
        {
            "name": "fuelLevelLowPreAlarmEnb",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        },
        {
            "name": "fuelLevelHightPreAlarmLevelEnb",
            "mask": 64,
            "min": 0,
            "shift": 6,
            "max": 1
        },
        {
            "name": "fuelLevelHightAlarmEnb",
            "mask": 128,
            "min": 0,
            "shift": 7,
            "max": 1
        },
        {
            "name": "fuelLevelHightAlarmAction",
            "mask": 256,
            "min": 0,
            "shift": 8,
            "max": 1
        },
        {
            "name": "fuelPumpEnb",
            "mask": 512,
            "min": 0,
            "shift": 9,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 23,
    "name": "fuelLevelLowAlarmLevel",
    "value": 10,
    "scale": 0,
    "min": 0,
    "max": 95,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 24,
    "name": "fuelLevelLowAlarmDelay",
    "value": 100,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 25,
    "name": "fuelLevelLowPreAlarmLevel",
    "value": 25,
    "scale": 0,
    "min": 1,
    "max": 96,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 26,
    "name": "fuelLevelLowPreAlarmDelay",
    "value": 100,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 27,
    "name": "fuelLevelHightPreAlarmLevel",
    "value": 65,
    "scale": 0,
    "min": 3,
    "max": 98,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 28,
    "name": "fuelLevelHightPreAlarmDelay",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 29,
    "name": "fuelLevelHightAlarmLevel",
    "value": 90,
    "scale": 0,
    "min": 5,
    "max": 100,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 30,
    "name": "fuelLevelHightAlarmDelay",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 31,
    "name": "fuelPumpOnLevel",
    "value": 30,
    "scale": 0,
    "min": 0,
    "max": 100,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 32,
    "name": "fuelPumpOffLevel",
    "value": 70,
    "scale": 0,
    "min": 0,
    "max": 100,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 33,
    "name": "diaSetup",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 1023,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 4,
    "bit": [
        {
            "name": "diaFunction",
            "mask": 31,
            "min": 0,
            "shift": 0,
            "max": 27
        },
        {
            "name": "diaPolarity",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        },
        {
            "name": "diaAction",
            "mask": 192,
            "min": 0,
            "shift": 6,
            "max": 3
        },
        {
            "name": "diaArming",
            "mask": 768,
            "min": 0,
            "shift": 8,
            "max": 4
        }
    ]
},{
    "page": 0,
    "adr": 34,
    "name": "diaDelay",
    "value": 15,
    "scale": 0,
    "min": 0,
    "max": 60,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 35,
    "name": "dibSetup",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 1023,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 4,
    "bit": [
        {
            "name": "dibFunction",
            "mask": 31,
            "min": 0,
            "shift": 0,
            "max": 27
        },
        {
            "name": "dibPolarity",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        },
        {
            "name": "dibAction",
            "mask": 192,
            "min": 0,
            "shift": 6,
            "max": 3
        },
        {
            "name": "dibArming",
            "mask": 768,
            "min": 0,
            "shift": 8,
            "max": 4
        }
    ]
},{
    "page": 0,
    "adr": 36,
    "name": "dibDelay",
    "value": 15,
    "scale": 0,
    "min": 0,
    "max": 60,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 37,
    "name": "dicSetup",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 1023,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 4,
    "bit": [
        {
            "name": "dicFunction",
            "mask": 31,
            "min": 0,
            "shift": 0,
            "max": 27
        },
        {
            "name": "dicPolarity",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        },
        {
            "name": "dicAction",
            "mask": 192,
            "min": 0,
            "shift": 6,
            "max": 3
        },
        {
            "name": "dicArming",
            "mask": 768,
            "min": 0,
            "shift": 8,
            "max": 4
        }
    ]
},{
    "page": 0,
    "adr": 38,
    "name": "dicDelay",
    "value": 15,
    "scale": 0,
    "min": 0,
    "max": 60,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 39,
    "name": "didSetup",
    "value": 64,
    "scale": 0,
    "min": 0,
    "max": 1023,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 4,
    "bit": [
        {
            "name": "didFunction",
            "mask": 31,
            "min": 0,
            "shift": 0,
            "max": 27
        },
        {
            "name": "didPolarity",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        },
        {
            "name": "didAction",
            "mask": 192,
            "min": 0,
            "shift": 6,
            "max": 3
        },
        {
            "name": "didArming",
            "mask": 768,
            "min": 0,
            "shift": 8,
            "max": 4
        }
    ]
},{
    "page": 0,
    "adr": 40,
    "name": "didDelay",
    "value": 15,
    "scale": 0,
    "min": 0,
    "max": 60,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 41,
    "name": "doSetup",
    "value": 21,
    "scale": 0,
    "min": 0,
    "max": 1023,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 6,
    "bit": [
        {
            "name": "doaNOC",
            "mask": 1,
            "min": 0,
            "shift": 0,
            "max": 1
        },
        {
            "name": "dobNOC",
            "mask": 2,
            "min": 0,
            "shift": 1,
            "max": 1
        },
        {
            "name": "docNOC",
            "mask": 4,
            "min": 0,
            "shift": 2,
            "max": 1
        },
        {
            "name": "dodNOC",
            "mask": 8,
            "min": 0,
            "shift": 3,
            "max": 1
        },
        {
            "name": "doeNOC",
            "mask": 16,
            "min": 0,
            "shift": 4,
            "max": 1
        },
        {
            "name": "dofNOC",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 42,
    "name": "doabType",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 1023,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 2,
    "bit": [
        {
            "name": "doaType",
            "mask": 255,
            "min": 0,
            "shift": 0,
            "max": 255
        },
        {
            "name": "dobType",
            "mask": 65280,
            "min": 0,
            "shift": 8,
            "max": 255
        }
    ]
},{
    "page": 0,
    "adr": 43,
    "name": "dodType",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 1023,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 2,
    "bit": [
        {
            "name": "docType",
            "mask": 255,
            "min": 0,
            "shift": 0,
            "max": 255
        },
        {
            "name": "doType",
            "mask": 65280,
            "min": 0,
            "shift": 8,
            "max": 255
        }
    ]
},{
    "page": 0,
    "adr": 44,
    "name": "doefType",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 1023,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 2,
    "bit": [
        {
            "name": "doeType",
            "mask": 255,
            "min": 0,
            "shift": 0,
            "max": 255
        },
        {
            "name": "dofType",
            "mask": 65280,
            "min": 0,
            "shift": 8,
            "max": 255
        }
    ]
},{
    "page": 0,
    "adr": 45,
    "name": "timerMainsTransientDelay",
    "value": 1,
    "scale": -1,
    "min": 1,
    "max": 100,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 46,
    "name": "timerStartDelay",
    "value": 5,
    "scale": 0,
    "min": 1,
    "max": 300,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 47,
    "name": "timerPreheating",
    "value": 5,
    "scale": 0,
    "min": 1,
    "max": 300,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 48,
    "name": "timerCranking",
    "value": 10,
    "scale": 0,
    "min": 1,
    "max": 30,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 49,
    "name": "timerCrankDelay",
    "value": 10,
    "scale": 0,
    "min": 1,
    "max": 30,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 50,
    "name": "timerStartupIdleTime",
    "value": 10,
    "scale": 0,
    "min": 1,
    "max": 300,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 51,
    "name": "timerNominalRPMDelay",
    "value": 10,
    "scale": 0,
    "min": 1,
    "max": 30,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 52,
    "name": "timerSafetyOnDelay",
    "value": 10,
    "scale": 0,
    "min": 1,
    "max": 60,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 53,
    "name": "timerWarming",
    "value": 1,
    "scale": 0,
    "min": 1,
    "max": 300,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 54,
    "name": "timerTransferDelay",
    "value": 6,
    "scale": -1,
    "min": 1,
    "max": 300,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 55,
    "name": "timerBreakerTripPulse",
    "value": 5,
    "scale": -1,
    "min": 1,
    "max": 50,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 56,
    "name": "timerBreakerClosePulse",
    "value": 5,
    "scale": -1,
    "min": 1,
    "max": 50,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 57,
    "name": "timerReturnDelay",
    "value": 30,
    "scale": 0,
    "min": 1,
    "max": 300,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 58,
    "name": "timerCooling",
    "value": 60,
    "scale": 0,
    "min": 1,
    "max": 300,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 59,
    "name": "timerCoolingIdle",
    "value": 20,
    "scale": 0,
    "min": 1,
    "max": 300,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 60,
    "name": "timerSolenoidHold",
    "value": 20,
    "scale": 0,
    "min": 1,
    "max": 60,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 61,
    "name": "timerFailStopDelay",
    "value": 30,
    "scale": 0,
    "min": 1,
    "max": 60,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 62,
    "name": "timerGenTransientDelay",
    "value": 10,
    "scale": -1,
    "min": 1,
    "max": 100,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 63,
    "name": "genSetup",
    "value": 104,
    "scale": 0,
    "min": 0,
    "max": 255,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 4,
    "bit": [
        {
            "name": "genPowerGeneratorControlEnb",
            "mask": 1,
            "min": 0,
            "shift": 0,
            "max": 1
        },
        {
            "name": "genPoles",
            "mask": 30,
            "min": 0,
            "shift": 1,
            "max": 16
        },
        {
            "name": "genAcSys",
            "mask": 224,
            "min": 0,
            "shift": 5,
            "max": 5
        },
        {
            "name": "genLocationCurrentTransformer",
            "mask": 256,
            "min": 0,
            "shift": 8,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 64,
    "name": "genRatedActivePowerLevel",
    "value": 40000,
    "scale": 0,
    "min": 0,
    "max": 10000,
    "units": "\u043a\u0412\u0442",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 65,
    "name": "genRatedReactivePowerLevel",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 10000,
    "units": "\u043a\u0412\u0410\u0420",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 66,
    "name": "genRatedApparentPowerLevel",
    "value": 200,
    "scale": 0,
    "min": 0,
    "max": 10000,
    "units": "\u043a\u0412\u0410",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 67,
    "name": "genRatedFrequencyLevel",
    "value": 500,
    "scale": -1,
    "min": 2,
    "max": 747,
    "units": "\u0413\u0446",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 68,
    "name": "genCurrentPrimaryLevel",
    "value": 600,
    "scale": 0,
    "min": 5,
    "max": 8000,
    "units": "\u0410",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 69,
    "name": "genCurrentFullLoadRatingLevel",
    "value": 500,
    "scale": 0,
    "min": 5,
    "max": 8000,
    "units": "\u0410",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 70,
    "name": "genAlarms",
    "value": 7167,
    "scale": 0,
    "min": 0,
    "max": 65535,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 12,
    "bit": [
        {
            "name": "genUnderVoltageAlarmEnb",
            "mask": 1,
            "min": 0,
            "shift": 0,
            "max": 1
        },
        {
            "name": "genUnderVoltagePreAlarmEnb",
            "mask": 2,
            "min": 0,
            "shift": 1,
            "max": 1
        },
        {
            "name": "genOverVoltagePreAlarmEnb",
            "mask": 4,
            "min": 0,
            "shift": 2,
            "max": 1
        },
        {
            "name": "genUnderFrequencyAlarmEnb",
            "mask": 8,
            "min": 0,
            "shift": 3,
            "max": 1
        },
        {
            "name": "genUnderFrequencyPreAlarmEnb",
            "mask": 16,
            "min": 0,
            "shift": 4,
            "max": 1
        },
        {
            "name": "genOverFrequencyPreAlarmEnb",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        },
        {
            "name": "genOverFrequencyAlarmEnb",
            "mask": 64,
            "min": 0,
            "shift": 6,
            "max": 1
        },
        {
            "name": "genCurrentOverloadProtectionEnb",
            "mask": 128,
            "min": 0,
            "shift": 7,
            "max": 1
        },
        {
            "name": "genCurrentOverPhaseImbalanceEnb",
            "mask": 256,
            "min": 0,
            "shift": 8,
            "max": 1
        },
        {
            "name": "genCurrentOverAlarmAction",
            "mask": 1536,
            "min": 0,
            "shift": 9,
            "max": 3
        },
        {
            "name": "genCurrentOverloadProtectionAction",
            "mask": 2048,
            "min": 0,
            "shift": 11,
            "max": 1
        },
        {
            "name": "genCurrentOverPhaseImbalanceAction",
            "mask": 4096,
            "min": 0,
            "shift": 12,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 71,
    "name": "genUnderVoltageAlarmLevel",
    "value": 318,
    "scale": 0,
    "min": 86,
    "max": 708,
    "units": "\u0412",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 72,
    "name": "genUnderVoltagePreAlarmLevel",
    "value": 339,
    "scale": 0,
    "min": 88,
    "max": 710,
    "units": "\u0412",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 73,
    "name": "genOverVoltagePreAlarmLevel",
    "value": 439,
    "scale": 0,
    "min": 93,
    "max": 715,
    "units": "\u0412",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 74,
    "name": "genOverVoltageAlarmLevel",
    "value": 458,
    "scale": 0,
    "min": 95,
    "max": 717,
    "units": "\u0412",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 75,
    "name": "genUnderFrequencyAlarmLevel",
    "value": 400,
    "scale": -1,
    "min": 0,
    "max": 744,
    "units": "\u0413\u0446",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 76,
    "name": "genUnderFrequencyPreAlarmLevel",
    "value": 420,
    "scale": -1,
    "min": 1,
    "max": 745,
    "units": "\u0413\u0446",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 77,
    "name": "genOverFrequencyPreAlarmLevel",
    "value": 540,
    "scale": -1,
    "min": 4,
    "max": 747,
    "units": "\u0413\u0446",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 78,
    "name": "genOverFrequencyAlarmLevel",
    "value": 550,
    "scale": -1,
    "min": 5,
    "max": 749,
    "units": "\u0413\u0446",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 79,
    "name": "genOverCurrentThermalProtectionLevel",
    "value": 20,
    "scale": 0,
    "min": 0,
    "max": 120,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 80,
    "name": "genOverCurrentCutoffLevel",
    "value": 40,
    "scale": 0,
    "min": 0,
    "max": 120,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 81,
    "name": "genOverCurrentAlarmLevel",
    "value": 100,
    "scale": 0,
    "min": 50,
    "max": 120,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 82,
    "name": "genOverCurrentAlarmDelay",
    "value": 60,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 83,
    "name": "genCurrentOverloadProtectionLevel",
    "value": 100,
    "scale": 0,
    "min": 1,
    "max": 125,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 84,
    "name": "genCurrentOverloadProtectionDelay",
    "value": 5,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 85,
    "name": "genCurrentOverPhaseImbalanceLevel",
    "value": 100,
    "scale": 0,
    "min": 1,
    "max": 125,
    "units": "%",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 86,
    "name": "genCurrentOverPhaseImbalanceDelay",
    "value": 60,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 87,
    "name": "mainsSetup",
    "value": 13,
    "scale": 0,
    "min": 0,
    "max": 31,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 3,
    "bit": [
        {
            "name": "mainsControlEnb",
            "mask": 1,
            "min": 0,
            "shift": 0,
            "max": 1
        },
        {
            "name": "mainsPowerOffImmediatelyEnb",
            "mask": 2,
            "min": 0,
            "shift": 1,
            "max": 1
        },
        {
            "name": "mainAcSys",
            "mask": 28,
            "min": 0,
            "shift": 2,
            "max": 5
        }
    ]
},{
    "page": 0,
    "adr": 88,
    "name": "mainsAlarms",
    "value": 15,
    "scale": 0,
    "min": 0,
    "max": 15,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 4,
    "bit": [
        {
            "name": "mainsUnderVoltageAlarmEnb",
            "mask": 1,
            "min": 0,
            "shift": 0,
            "max": 1
        },
        {
            "name": "mainsOverVoltageAlarmEnb",
            "mask": 2,
            "min": 0,
            "shift": 1,
            "max": 1
        },
        {
            "name": "mainsUnderFrequencyAlarmEnb",
            "mask": 4,
            "min": 0,
            "shift": 2,
            "max": 1
        },
        {
            "name": "mainsOverFrequencyAlarmEnb",
            "mask": 8,
            "min": 0,
            "shift": 3,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 89,
    "name": "mainsUnderVoltageAlarmLevel",
    "value": 318,
    "scale": 0,
    "min": 86,
    "max": 713,
    "units": "\u0412",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 90,
    "name": "mainsOverVoltageAlarmLevel",
    "value": 438,
    "scale": 0,
    "min": 90,
    "max": 717,
    "units": "\u0412",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 91,
    "name": "mainsUnderFrequencyAlarmLevel",
    "value": 450,
    "scale": -1,
    "min": 0,
    "max": 747,
    "units": "\u0413\u0446",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 92,
    "name": "mainsOverFrequencyAlarmLevel",
    "value": 520,
    "scale": -1,
    "min": 2,
    "max": 749,
    "units": "\u0413\u0446",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 93,
    "name": "engineSetup",
    "value": 51,
    "scale": 0,
    "min": 0,
    "max": 63,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 3,
    "bit": [
        {
            "name": "engineStartAttempts",
            "mask": 15,
            "min": 1,
            "shift": 0,
            "max": 9
        },
        {
            "name": "enginePreHeatEnb",
            "mask": 16,
            "min": 0,
            "shift": 4,
            "max": 1
        },
        {
            "name": "enginePostHeatEnb",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 94,
    "name": "enginePreHeatLevel",
    "value": 50,
    "scale": 0,
    "min": 0,
    "max": 100,
    "units": "C",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 95,
    "name": "enginePreHeatDelay",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 96,
    "name": "enginePostHeatLevel",
    "value": 50,
    "scale": 0,
    "min": 0,
    "max": 100,
    "units": "C",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 97,
    "name": "enginePostHeatDelay",
    "value": 0,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 98,
    "name": "crankSetup",
    "value": 10,
    "scale": 0,
    "min": 0,
    "max": 7,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 4,
    "bit": [
        {
            "name": "crankDisconnectOilPressureEnb",
            "mask": 1,
            "min": 0,
            "shift": 0,
            "max": 1
        },
        {
            "name": "crankOilPressureCheckOnStartEnb",
            "mask": 2,
            "min": 0,
            "shift": 1,
            "max": 1
        },
        {
            "name": "crankDisconnectOilPressureEnb",
            "mask": 4,
            "min": 0,
            "shift": 2,
            "max": 1
        },
        {
            "name": "crankDisconnectChargeAlternatorEnb",
            "mask": 8,
            "min": 0,
            "shift": 3,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 99,
    "name": "crankDisconnectgenFreqLevel",
    "value": 210,
    "scale": -1,
    "min": 0,
    "max": 400,
    "units": "\u0413\u0446",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 100,
    "name": "crankDisconnectOilPressureLevel",
    "value": 20,
    "scale": -1,
    "min": 5,
    "max": 40,
    "units": "\u0411\u0430\u0440",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 101,
    "name": "crankDisconnectChargeAlternatorLevel",
    "value": 60,
    "scale": -1,
    "min": 0,
    "max": 400,
    "units": "\u0412",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 102,
    "name": "batteryAlarms",
    "value": 15,
    "scale": 0,
    "min": 0,
    "max": 15,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 4,
    "bit": [
        {
            "name": "batteryUnderVoltageEnb",
            "mask": 1,
            "min": 0,
            "shift": 0,
            "max": 1
        },
        {
            "name": "batteryOverVoltageEnb",
            "mask": 2,
            "min": 0,
            "shift": 1,
            "max": 1
        },
        {
            "name": "batteryChargeShutdownEnb",
            "mask": 4,
            "min": 0,
            "shift": 2,
            "max": 1
        },
        {
            "name": "batteryChargeWarningEnb",
            "mask": 8,
            "min": 0,
            "shift": 3,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 103,
    "name": "batteryUnderVoltageLevel",
    "value": 100,
    "scale": -1,
    "min": 0,
    "max": 397,
    "units": "В",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 104,
    "name": "batteryUnderVoltageDelay",
    "value": 60,
    "scale": 0,
    "min": 0,
    "max": 86400,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 105,
    "name": "batteryOverVoltageLevel",
    "value": 300,
    "scale": -1,
    "min": 2,
    "max": 400,
    "units": "В",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 106,
    "name": "batteryOverVoltageDelay",
    "value": 60,
    "scale": 0,
    "min": 0,
    "max": 86400,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 107,
    "name": "batteryChargeShutdownLevel",
    "value": 40,
    "scale": -1,
    "min": 0,
    "max": 388,
    "units": "В",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 108,
    "name": "batteryChargeShutdownDelay",
    "value": 5,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 109,
    "name": "batteryChargeWarningLevel",
    "value": 60,
    "scale": -1,
    "min": 1,
    "max": 390,
    "units": "В",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 110,
    "name": "batteryChargeWarningDelay",
    "value": 5,
    "scale": 0,
    "min": 0,
    "max": 3600,
    "units": "\u0441\u0435\u043a",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 111,
    "name": "maintenanceAlarms",
    "value": 42,
    "scale": 0,
    "min": 0,
    "max": 63,
    "units": "",
    "type": "U",
    "len": 1,
    "bitMapSize": 6,
    "bit": [
        {
            "name": "maintenanceAlarmOilEnb",
            "mask": 1,
            "min": 0,
            "shift": 0,
            "max": 1
        },
        {
            "name": "maintenanceAlarmOilAction",
            "mask": 2,
            "min": 0,
            "shift": 1,
            "max": 1
        },
        {
            "name": "maintenanceAlarmAirEnb",
            "mask": 4,
            "min": 0,
            "shift": 2,
            "max": 1
        },
        {
            "name": "maintenanceAlarmAirAction",
            "mask": 8,
            "min": 0,
            "shift": 3,
            "max": 1
        },
        {
            "name": "maintenanceAlarmFuelEnb",
            "mask": 16,
            "min": 0,
            "shift": 4,
            "max": 1
        },
        {
            "name": "maintenanceAlarmFuelAction",
            "mask": 32,
            "min": 0,
            "shift": 5,
            "max": 1
        }
    ]
},{
    "page": 0,
    "adr": 112,
    "name": "maintenanceAlarmOilTime",
    "value": 10,
    "scale": 0,
    "min": 10,
    "max": 5000,
    "units": "\u0447",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 113,
    "name": "maintenanceAlarmAirTime",
    "value": 10,
    "scale": 0,
    "min": 10,
    "max": 5000,
    "units": "\u0447",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
},{
    "page": 0,
    "adr": 114,
    "name": "maintenanceAlarmFuelTime",
    "value": 10,
    "scale": 0,
    "min": 10,
    "max": 5000,
    "units": "\u0447",
    "type": "U",
    "len": 1,
    "bitMapSize": 0,
    "bit": []
}];
