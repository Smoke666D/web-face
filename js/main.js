//******************************************************************************
//******************************************************************************
//******************************************************************************
function hideConteny() {
	document.getElementById("oilPressPage").style.display = "none";
	document.getElementById("coolTempPage").style.display = "none";
	document.getElementById("noDataPage").style.display = "none";
	document.getElementById("fuelLevelPage").style.display = "none";
	document.getElementById("digitalInputAPage").style.display = "none";
	document.getElementById("digitalInputBPage").style.display = "none";
	document.getElementById("digitalInputCPage").style.display = "none";
	document.getElementById("digitalInputDPage").style.display = "none";

	document.getElementById("digitalOutputPage").style.display = "none";
	document.getElementById("timerPage").style.display = "none";
	document.getElementById("generatorOptionPage").style.display = "none";
	document.getElementById("generatorVoltagePage").style.display = "none";
	document.getElementById("generatorFreqPage").style.display = "none";
	document.getElementById("generatorCurrentPage").style.display = "none";
	document.getElementById("networkOptionPage").style.display = "none";
	document.getElementById("networkAlarmPage").style.display = "none";
	document.getElementById("engineOptionPage").style.display = "none";
	document.getElementById("crankshaftPage").style.display = "none";
	document.getElementById("battaryPage").style.display = "none";
	document.getElementById("servicePage").style.display = "none";

	return;
}
function loadContent(id) {
	hideConteny();
	document.getElementById(id).style.display = "block";
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function sliderInit() {
	const s_slider1 = document.getElementById('s-slider1');
	const s_slider2 = document.getElementById('s-slider2');
	const s_slider3 = document.getElementById('s-slider3');
	const s_slider4 = document.getElementById('s-slider4');
	const s_slider5 = document.getElementById('s-slider5');
	const s_slider6 = document.getElementById('s-slider6');
	const s_slider7 = document.getElementById('s-slider7');
	const s_slider8 = document.getElementById('s-slider8');
	const s_slider9 = document.getElementById('s-slider9');
	const s_slider10 = document.getElementById('s-slider10');
	const s_slider11 = document.getElementById('s-slider11');
	const s_slider12 = document.getElementById('s-slider12');
	const s_slider13 = document.getElementById('s-slider13');
	const s_slider14 = document.getElementById('s-slider14');
	const s_slider15 = document.getElementById('s-slider15');
	const s_slider16 = document.getElementById('s-slider16');
	const s_slider17 = document.getElementById('s-slider17');
	const s_slider18 = document.getElementById('s-slider18');
	const s_slider19 = document.getElementById('s-slider19');
	const s_slider20 = document.getElementById('s-slider20');
	const s_slider21 = document.getElementById('s-slider21');
	const s_slider22 = document.getElementById('s-slider22');
	const s_slider23 = document.getElementById('s-slider23');
	const s_slider24 = document.getElementById('s-slider24');
	const s_slider25 = document.getElementById('s-slider25');
	const s_slider26 = document.getElementById('s-slider26');
	const s_slider27 = document.getElementById('s-slider27');
	const s_slider28 = document.getElementById('s-slider28');
	const s_slider29 = document.getElementById('s-slider29');
	const s_slider30 = document.getElementById('s-slider30');
	const s_slider31 = document.getElementById('s-slider31');
	const s_slider32 = document.getElementById('s-slider32');
	const s_slider33 = document.getElementById('s-slider33');
	const s_slider34 = document.getElementById('s-slider34');
	const s_slider35 = document.getElementById('s-slider35');
	const s_slider36 = document.getElementById('s-slider36');
	const s_slider37 = document.getElementById('s-slider37');
	const s_slider38 = document.getElementById('s-slider38');
	const s_slider39 = document.getElementById('s-slider39');
	const s_slider40 = document.getElementById('s-slider40');
	const s_slider41 = document.getElementById('s-slider41');
	const s_slider42 = document.getElementById('s-slider42');
	const s_slider43 = document.getElementById('s-slider43');
	const s_slider44 = document.getElementById('s-slider44');
	const s_slider45 = document.getElementById('s-slider45');
	const s_slider46 = document.getElementById('s-slider46');
	const s_slider47 = document.getElementById('s-slider47');
	const s_slider48 = document.getElementById('s-slider48');
	const s_slider49 = document.getElementById('s-slider49');
	const s_slider50 = document.getElementById('s-slider50');
	const s_slider51 = document.getElementById('s-slider51');
	const s_slider52 = document.getElementById('s-slider52');
	const s_slider53 = document.getElementById('s-slider53');
	const s_slider54 = document.getElementById('s-slider54');
	const s_slider55 = document.getElementById('s-slider55');
	const s_slider56 = document.getElementById('s-slider56');
	const s_slider57 = document.getElementById('s-slider57');
	const s_slider58 = document.getElementById('s-slider58');
	const s_slider59 = document.getElementById('s-slider59');
	const s_slider60 = document.getElementById('s-slider60');
	const s_slider61 = document.getElementById('s-slider61');
	const s_slider62 = document.getElementById('s-slider62');
	const s_slider63 = document.getElementById('s-slider63');
	const s_slider64 = document.getElementById('s-slider64');
	const s_slider65 = document.getElementById('s-slider65');
	const s_slider66 = document.getElementById('s-slider66');
	const s_slider67 = document.getElementById('s-slider67');
	const s_slider68 = document.getElementById('s-slider68');
	const s_slider69 = document.getElementById('s-slider69');
	const s_slider70 = document.getElementById('s-slider70');
	const s_slider71 = document.getElementById('s-slider71');
	const s_slider72 = document.getElementById('s-slider72');
	const s_slider73 = document.getElementById('s-slider73');
	const s_slider74 = document.getElementById('s-slider74');
	const s_slider75 = document.getElementById('s-slider75');
	const s_slider76 = document.getElementById('s-slider76');
	const s_slider77 = document.getElementById('s-slider77');
	const s_slider78 = document.getElementById('s-slider78');
	const s_slider79 = document.getElementById('s-slider79');

	const d_slider1 = document.getElementById('d-slider1');
	const d_slider2 = document.getElementById('d-slider2');

	noUiSlider.create(s_slider1, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider2, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider3, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider4, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider5, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider6, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider7, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider8, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider9, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider10, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider11, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider12, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider13, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider14, {
		start: [20],
		tooltips: true,
	  connect: [true, false],
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(s_slider15, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider16, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider17, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider18, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider19, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider20, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider21, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider22, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider23, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider24, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider25, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider26, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider27, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider28, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider29, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider30, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider31, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider32, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider33, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider34, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider35, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider36, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider37, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider38, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider39, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider40, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider41, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider42, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider43, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider44, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider45, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider46, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider47, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider48, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider49, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider50, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider51, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider52, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider53, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider54, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider55, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider56, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider57, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider58, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider59, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider60, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider61, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider62, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider63, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider64, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider65, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider66, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider67, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider68, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider69, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider70, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider71, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider72, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider73, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider74, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider75, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider76, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider77, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider78, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(s_slider79, {
		start: [20],
		tooltips: true,
		connect: [true, false],
		padding: 0,
		range: {
			'min': 0,
			'max': 100
		}
	});

	noUiSlider.create(d_slider1, {
		start: [20, 80],
		tooltips: true,
	  connect: true,
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});

	noUiSlider.create(d_slider2, {
		start: [20, 80],
		tooltips: true,
	  connect: true,
		padding: 0,
	  range: {
	  	'min': 0,
	    'max': 100
	  }
	});
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
document.addEventListener("DOMContentLoaded", function(event) {
	loadContent("oilPressPage");
	sliderInit();
});
