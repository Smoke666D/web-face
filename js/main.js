var s_sliders;
var s_sinputs;
var checkboxes;
var selectors;
var memorySize        = 1024;
var measurementLength = 0;

function calcFracLength( x ) {
	return ( x.toString().indexOf( '.' ) >= 0) ? ( x.toString().split( '.' ).pop().length ) : ( 0 );
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
window.addEventListener ( 'load', function() {
	window.scrollTo( 0, 0 );
});
document.addEventListener ( 'touchmove', function( e ) {
	e.preventDefault()
});
var connectionType = 'usb';
var electronApp = 1;

if ( electronApp > 0 ) {
	var dashboard = require('./js/dashboard.js').dashboard;
	dashLoop();
}
/*----------------------------------------------------------------------------*/
function modbusAdrProc () {
	let obj = document.getElementById( 'modbusAdr' );
	console.log( obj.value );
	if ( obj.value > 255 ) {
		obj.value = 255;
	}
	if ( obj.value < 1 ) {
		obj.value = 1;
	}
	return;
}
/*----------------------------------------------------------------------------*/
function connectClick () {
	var btn     = document.getElementById( 'modalConnect-button' );
	var modal   = document.getElementById( 'connectionModal' );
	var body    = document.getElementsByTagName( 'body' )[0];
	var wrapper = document.getElementById( 'wrapper' );

	modal.classList.add( 'show' );
	modal.style.display = 'block';
	body.classList.add( 'modal-open' );
	wrapper.innerHTML = wrapper.innerHTML + '<div id="backdrop" class="modal-backdrop show"></div>';
	return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function navbarToogling() {
	genSw = document.getElementById( 'genPowerGeneratorControlEnb' );
	netSw = document.getElementById( 'mainsControlEnb' );

  function generatorToogle() {
		genPages = document.getElementById( 'genCollapse' );
		if ( genSw.checked == false ) {
  		genPages.classList.add( 'hide' );
			document.getElementById( 'sinput-starterStopGenFreqLevel' ).disabled = true;
			document.getElementById( 's-slider-starterStopGenFreqLevel' ).setAttribute('disabled', false);
		} else {
			genPages.classList.remove( 'hide' );
			document.getElementById( 'sinput-starterStopGenFreqLevel' ).disabled = false;
			document.getElementById( 's-slider-starterStopGenFreqLevel' ).removeAttribute( 'disabled' );
		}
	}

	function networkToogle() {
		netPages = document.getElementById( 'netCollapse' );
		if ( netSw.checked == false ) {
			netPages.classList.add( 'hide' );
		} else {
			netPages.classList.remove( 'hide' );
		}
	}

	genSw.addEventListener( 'change', function() {
		generatorToogle();
	});
	netSw.addEventListener( 'change', function() {
		networkToogle();
	});
	networkToogle();
	generatorToogle();
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function Password ( status, data ) {
	this.status = status;
	this.data   = data;
	return;
}

function Auth ( password ) {
	this.data = password;
	return;
}

function getCurrentPassword () {
	return parseInt( document.getElementById( 'passwordInput' ).value );
}

function passwordProcessig () {
	var enb       = document.getElementById( 'passwordEnb' );
	var passNew   = document.getElementById( 'passwordSetupInput' );
	var passCheck = document.getElementById( 'passwordCheckupInput' );
	var button    = document.getElementById( 'setupPassword' );

	function checkEnb () {
		if ( enb.checked == 0 ) {
      passNew.disabled   = true;
			passCheck.disabled = true;
		} else {
			passNew.disabled   = false;
			passCheck.disabled = false;
		}
		return;
	}
  enb.addEventListener( 'change', function () {
		checkEnb();
		return;
	});
	button.addEventListener( 'click', function () {
		if ( enb.checked > 0 ) {
			if ( passNew.value == passCheck.value ) {
				if ( passNew.value.length == 4 ) {
					let pass = new Password( 1, parseInt( passNew.value ) );
					writePassword( pass );
				} else {
					let alert = new Alert( "alert-warning", triIco, 'Пароль должен состоять из 4 цифр' );
					passNew.value   = '';
					passCheck.value = '';
				}
			} else {
				let alert = new Alert( "alert-warning", triIco, 'Введенные пароли не совпадают' );
				passNew.value   = '';
				passCheck.value = '';
			}
		} else {
			let pass = new Password( 0, 0 );
			writePassword( pass );
		}
	});
	return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function toogleNav() {
	var sb   = document.getElementById( 'sidebar' );
	if ( sb.classList.contains( 'active' ) ) {
		sb.classList.remove( 'active' );
	} else {
		sb.classList.add( 'active' );
	}
	return;
}

function hideContent() {
	var contentPages = document.getElementsByClassName( 'content-data' );
	var navItems     = document.getElementsByClassName( 'navItem' );
	for ( var i=0; i<navItems.length; i++ ) {
		navItems[i].classList.remove( 'checked' );
	}
	for ( var i=0; i<contentPages.length; i++ ) {
		contentPages[i].classList.add( 'hidden' );
	}
	return;
}

function loadContent( id ) {
	hideContent();
	document.getElementById( id ).classList.remove( 'hidden' );
	document.getElementById( 'nav-' + id ).classList.add( 'checked' );
	var sb = document.getElementById( 'sidebar' );
	if ( window.matchMedia( '(max-width: 991.98px)' ).matches ) {
		sb.classList.remove( 'active' );
		sidebarDone = 0;
	}
	document.getElementById( 'content' ).scrollTop = 0;
	return;
}

var sidebarDone = 0;
document.getElementById( 'content' ).addEventListener( 'click', function() {
	var sb = document.getElementById( 'sidebar' );
	if ( !sb.classList.contains( 'active' ) ) {
		sidebarDone = 0;
	}
	if ( ( window.matchMedia( '(max-width: 991.98px)' ).matches ) && ( sb.classList.contains( 'active' ) ) && ( sidebarDone == 1 ) )  {
 		sb.classList.remove( 'active' );
		sidebarDone = 0;
}});
document.getElementById( 'sidebar' ).addEventListener( 'transitionend', function() {
	var sb = document.getElementById( 'sidebar' );
	if ( ( window.matchMedia( '(max-width: 991.98px)' ).matches ) && ( sb.classList.contains( 'active' ) ) ) {
		sidebarDone = 1;
}});

function setConnect( input ) {
  var usbButton = document.getElementById( 'usb-button' );
  var ethButton = document.getElementById( 'eth-button' );
	var ipInput   = document.getElementById( 'input-ipaddress' );
  if ( input == 'eth' ) {
		connectionType = 'eth';
    usbButton.classList.remove( 'btn-success' );
    ethButton.classList.remove( 'btn-secondary' );
    usbButton.classList.add( 'btn-secondary' );
    ethButton.classList.add( 'btn-success' );
		ipInput.disabled = false;
  } else if ( input == 'usb' ) {
		connectionType = 'usb';
    ethButton.classList.remove( 'btn-success' );
    usbButton.classList.remove( 'btn-secondary' );
    ethButton.classList.add( 'btn-secondary' );
    usbButton.classList.add( 'btn-success' );
		ipInput.disabled = true;
  }
	return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function sliderInit() {
	var i=0;
	selectors  = document.getElementsByClassName( 'custom-select' );
	checkboxes = document.getElementsByClassName( 'check-input' );
	s_sinputs  = document.getElementsByClassName( 's-sinput' );
	s_sliders  = document.getElementsByClassName( 's-slider' );

	for ( i=0; i<s_sliders.length; i++ ) {
		s_sinputs[i].disabled = true;
		noUiSlider.create( s_sliders[i], {
			start: [20],
			keyboardSupport: false,
			tooltips: true,
			connect: [true, false],
			padding: 0,
			range: {
				'min': 0,
				'max': 100
			},
		})
		s_sliders[i].noUiSlider.on( 'update', ( function() {
			var j=i;
			return function() {
				s_sinputs[j].value = parseFloat( s_sliders[j].noUiSlider.get() ).toFixed( calcFracLength( s_sinputs[j].step ) );
			}
		})() );
		s_sinputs[i].addEventListener( 'change', ( function() {
			var j = i;
			return function() {
	    	s_sliders[j].noUiSlider.set( [s_sinputs[j].value] );
			}
		})());
		s_sliders[i].setAttribute( 'disabled', false );
	}
	return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function schemTypeProcessing () {
	function serchConfigDef ( name ) {
		var out = 0;
		for ( i=0; i<dataReg.length; i++ ) {
			if ( dataReg[i].name == name ) {
				out = dataReg[i].default;
				break;
			}
		}
		return out;
	}
	var schemType = document.getElementById( 'genAcSys' );
	schemType.addEventListener( 'change', function () {
    let gU1 = document.getElementById( 'sinput-genUnderVoltageAlarmLevel' );
		let gU2 = document.getElementById( 'sinput-genUnderVoltagePreAlarmLevel' );
		let gU3 = document.getElementById( 'sinput-genOverVoltagePreAlarmLevel' );
		let gU4 = document.getElementById( 'sinput-genOverVoltageAlarmLevel' );
		let nU1 = document.getElementById( 'sinput-mainsUnderVoltageAlarmLevel' );
		let nU2 = document.getElementById( 'sinput-mainsOverVoltageAlarmLevel' );
		if ( schemType.value == 2 ) {
			gU1.value = 180;
			gU2.value = 200;
			gU3.value = 240;
			gU4.value = 260;
			nU1.value = 180;
			nU2.value = 260;
		} else {
			gU1.value = serchConfigDef( 'genUnderVoltageAlarmLevel' );
			gU2.value = serchConfigDef( 'genUnderVoltagePreAlarmLevel' );
			gU3.value = serchConfigDef( 'genOverVoltagePreAlarmLevel' );
			gU4.value = serchConfigDef( 'genOverVoltageAlarmLevel' );
			nU1.value = serchConfigDef( 'mainsUnderVoltageAlarmLevel' );
			nU2.value = serchConfigDef( 'mainsOverVoltageAlarmLevel' );
		}
	});
	return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function powerSliderInit( idActive, idReactive, idApparent, idCosFi, regName ) {
	for ( var i=0; i<dataReg.length; i++ ) {
		if ( dataReg[i].name == regName ) {
			reg = dataReg[i];
		}
	}
	sliderActive   = document.getElementById( 's-slider-' + idActive );		// P кВт
	inputActive    = document.getElementById( 'sinput-'   + idActive );			// P кВт
	sliderReactive = document.getElementById( 's-slider-' + idReactive );	// Q кВар
	inputReactive  = document.getElementById( 'sinput-'   + idReactive );		// Q кВар
	sliderApparent = document.getElementById( 's-slider-' + idApparent );	// S кВА
	inputApparent  = document.getElementById( 'sinput-'   + idApparent );		// S кВА
	sliderCosFi    = document.getElementById( 's-slider-' + idCosFi );
	inputCosFi     = document.getElementById( 'sinput-'   + idCosFi );

	inputCosFi.disabled = false;
	sliderCosFi.removeAttribute( 'disabled' );
	inputCosFi.step  = 0.01;
	sliderCosFi.noUiSlider.updateOptions({
		step: 	0.01,
		range: { 'min': 0, 'max': 1 },
	})

	function powerApparentCalc( p, q ) {
		return Math.sqrt( p * p + q * q );
	}

	function powerReaCalc( s, e ) {
		return Math.sqrt( s * s - e * e );
	}

	function coeffPCalc( s, cosfi ) {
		return s * cosfi;
	}

	function coeffCalc( s, p ) {
		return p / s;
	}

	function activeUpdate() {
		powActive   = parseInt( sliderActive.noUiSlider.get() );
		powApparent = parseInt( sliderApparent.noUiSlider.get() );
		if ( powActive <= powApparent ) {
			powReactive = powerReaCalc( powApparent, powActive );
			sliderReactive.noUiSlider.set( powReactive );
			sliderCosFi.noUiSlider.set( powActive / powApparent );
		} else {
			powReactive = 0;
			powActive   = powerReaCalc( powApparent, powReactive );
			sliderActive.noUiSlider.set( powActive );
			sliderReactive.noUiSlider.set( 0 );
			sliderCosFi.noUiSlider.set( powActive / powApparent );
		}
		return;
	}

	function apparentUpdate() {
		powActive   = parseInt( sliderActive.noUiSlider.get() );
		powApparent = parseInt( sliderApparent.noUiSlider.get() );
		if ( powApparent >= powActive ) {
			powReactive = powerReaCalc( powApparent, powActive );
			sliderReactive.noUiSlider.set( powReactive );
			sliderCosFi.noUiSlider.set( powActive / powApparent );
		} else {
			sliderApparent.noUiSlider.set( powActive );
			sliderReactive.noUiSlider.set( 0 );
			sliderCosFi.noUiSlider.set( powActive / powApparent );
		}
		return;
	}

	function reactiveUpdate() {
		powApparent = parseInt( sliderApparent.noUiSlider.get() );
		powReactive = parseInt( sliderReactive.noUiSlider.get() );
		powActive   = powerReaCalc( powApparent, powReactive );
		if ( powActive <= powApparent ) {
			sliderActive.noUiSlider.set( powActive );
			sliderCosFi.noUiSlider.set( powActive / powApparent );
		} else {
			powReactive = powApparent;
			sliderActive.noUiSlider.set( 0 );
			sliderReactive.noUiSlider.set( powReactive );
			sliderCosFi.noUiSlider.set( powActive / powApparent );
		}
		return;
	}

	function cosFiUpdate() {
		powApparent = parseInt( sliderApparent.noUiSlider.get() );
		cosFi       = parseFloat( sliderCosFi.noUiSlider.get() );
		powReactive = powApparent * Math.sin( Math.acos( cosFi ) );
		powActive   = powerReaCalc(powApparent,powReactive);
		if ( powActive <= powApparent ) {
			sliderActive.noUiSlider.set( powActive );
			sliderReactive.noUiSlider.set( powReactive );
		} else {
			powActive = powApparent;
			sliderActive.noUiSlider.set( powActive );
			powReactive = powerReaCalc( powApparent, powActive );
			sliderReactive.noUiSlider.set( powReactive );
			sliderCosFi.noUiSlider.set( powActive / powApparent );
		}
		return;
	}
	activeUpdate();
	reactiveUpdate();

	sliderActive.noUiSlider.on( 'change',function() {
		activeUpdate();
	});
	inputActive.addEventListener( 'change',function() {
		activeUpdate();
	});
	sliderReactive.noUiSlider.on( 'change',function() {
		reactiveUpdate();
	});
	inputReactive.addEventListener( 'change',function() {
		reactiveUpdate();
	});
	sliderApparent.noUiSlider.on( 'change', function() {
		apparentUpdate();
	});
	inputApparent.addEventListener( 'change', function() {
		apparentUpdate();
	})
	sliderCosFi.noUiSlider.on( 'change', function() {
		cosFiUpdate();
	})
	return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function starterStopProcessing() {
	var self = this;
	this.genEnb     = document.getElementById( 'genPowerGeneratorControlEnb' );
	this.oilEnb     = document.getElementById( 'starterStopOilPressureEnb' );
	this.chargerEnb = document.getElementById( 'starterStopChargeAlternatorEnb' );
	this.speedEnb   = document.getElementById( 'starterStopSpeedEnb' );

	this.checkFull = function() {
		if ( ( this.genEnb.checked     == false ) &&
		     ( this.oilEnb.checked     == false ) &&
				 ( this.chargerEnb.checked == false ) &&
				 ( this.speedEnb.checked   == false ) ) {
		  return 0;
	  }
		return 1;
	}

	this.oilEnb.addEventListener( 'change', function() {
		if ( self.checkFull() == 0 ) {
			self.chargerEnb.checked = true;
			document.getElementById('sinput-starterStopChargeAlternatorLevel').disabled = false;
			document.getElementById('s-slider-starterStopChargeAlternatorLevel').removeAttribute( 'disabled' );
			let alert = new Alert( "alert-warning", triIco ,"Стартер должен иметь хотя бы одино условие отключения" )
		}
		return;
	});

	this.chargerEnb.addEventListener( 'change', function() {
		if ( self.checkFull() == 0 ) {

			if ( document.getElementById( 'oilPressureSensorType' ).value > 0 )
			{
			  self.oilEnb.checked = true;
				document.getElementById('sinput-starterStopOilPressureLevel').disabled = false;
				document.getElementById('s-slider-starterStopOilPressureLevel').removeAttribute( 'disabled' );
				let alert = new Alert( "alert-warning", triIco ,"Стартер должен иметь хотя бы одино условие отключения" )
			} else if ( document.getElementById('speedEnb').checked == true ) {
				self.speedEnb.checked = true;
				document.getElementById('sinput-starterStopSpeedLevel').disabled = false;
				document.getElementById('s-slider-starterStopSpeedLevel').removeAttribute( 'disabled' );
				let alert = new Alert( "alert-warning", triIco ,"Стартер должен иметь хотя бы одино условие отключения" )
			} else {
				self.chargerEnb.checked = true;
				document.getElementById('sinput-starterStopChargeAlternatorLevel').disabled = false;
				document.getElementById('s-slider-starterStopChargeAlternatorLevel').removeAttribute( 'disabled' );
				let alert = new Alert( "alert-warning", triIco ,"Другие условия отключения не доступны. Активируйте соответствующие устройство." )
			}
			return;
		}
	});

	this.speedEnb.addEventListener( 'change', function() {
		if ( self.checkFull() == 0 ) {
			self.chargerEnb.checked = true;
			document.getElementById('sinput-starterStopChargeAlternatorLevel').disabled = false;
			document.getElementById('s-slider-starterStopChargeAlternatorLevel').removeAttribute( 'disabled' );
			let alert = new Alert( "alert-warning", triIco ,"Стартер должен иметь хотя бы одино условие отключения" )
		}
		return;
	});

	return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function setDisabledDI( letter ) {
	var funct    = document.getElementById( 'di'          + letter + 'Function' )
	var polarity = document.getElementById( 'di'          + letter + 'Polarity' );
	var action   = document.getElementById( 'di'          + letter + 'Action' );
	var arming   = document.getElementById( 'di'          + letter + 'Arming' );
	var input    = document.getElementById( 'sinput-di'   + letter + 'Delay' );
	var slider   = document.getElementById( 's-slider-di' + letter + 'Delay' );
	var message  = document.getElementById( 'di'          + letter + 'Message' );
	if ( funct.value == 0 ) {
		polarity.disabled = true;
		action.disabled   = true;
		arming.disabled   = true;
		message.disabled  = true;
		input.disabled    = true;
		slider.setAttribute( 'disabled', true);
	} else if ( funct.value == 1 ) {
		polarity.disabled = false;
		action.disabled   = false;
		arming.disabled   = false;
		message.disabled  = false;
		input.disabled    = false;
		slider.removeAttribute( 'disabled' );
	} else {
		polarity.disabled = false;
		action.disabled   = true;
		arming.disabled   = true;
		message.disabled  = true;
		input.disabled    = false;
		slider.removeAttribute( 'disabled' );
	}
	return;
}

function setDisabledDO( letter ) {
	var no   = document.getElementById( 'do' + letter + 'NO' );
	var nc   = document.getElementById( 'do' + letter + 'NC' );
	var type = document.getElementById( 'do' + letter + 'Type' );
	if ( type.value == 0 ) {
		no.disabled = true;
		nc.disabled = true;
	} else {
		no.disabled = false;
		nc.disabled = false;
	}
	return;
}
function diInit( letter ) {
	setDisabledDI( letter );
	document.getElementById( 'di' + letter + 'Function' ).addEventListener( 'change', function() {
		setDisabledDI( letter );
	});
	var message  = document.getElementById( 'di' + letter + 'Message' );
	message.addEventListener( 'focus', function() {
		while( message.value.endsWith( ' ' ) ) {
			message.value = message.value.slice( 0, -1 );
		}
	});
	message.addEventListener( 'blur', function() {
		if ( message.value.length < 16 ) {
			for ( var i=message.value.length; i<16; i++ ) {
				message.value += ' ';
			}
		}
	});
	return;
}
function doInit( letter ) {
	setDisabledDO( letter );
	document.getElementById( 'do' + letter + 'Type' ).addEventListener( 'change', function() {
		setDisabledDO( letter );
	});
	return;
}
/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function ainInit ( master, checkers, slaves, enb, callback ) {
	function setDisabled() {
		if ( document.getElementById( master ).value < 3 ) {
			for ( var i=0; i<checkers.length; i++ ) {
				document.getElementById( checkers[i] ).disabled = true;
				document.getElementById( checkers[i] ).checked  = false;
				for ( var k=0; k<dataReg.length; k++ ) {
				  for ( var j=0; j<dataReg[k].bit.length; j++ )
					{
						if ( dataReg[k].bit[j].name == checkers[i] ) {
							dataReg[k].value = dataReg[k].value & ( ~dataReg[k].bit[j].mask );
						}
					}
				}
			}
			for ( var i=0; i<slaves.length; i++ ) {
				var slave = document.getElementById( slaves[i] );
				if ( slaves[i].search( 'slider' ) != -1 ) {
					slave.setAttribute( 'disabled', false );
				} else {
					slave.disabled = true;
				}
			}
		} else {
			for ( var i=0; i<checkers.length; i++ ) {
				document.getElementById( checkers[i] ).disabled = false;
			}
			for ( var i=0; i<enb.length; i++ ) {
				var element = document.getElementById( enb[i] );
				if ( enb[i].search( 'slider' ) != -1 ) {
					element.removeAttribute( 'disabled' );
				} else {
					element.disabled = false;
				}
			}
		}
		callback();
	}
	setDisabled();
	document.getElementById( master ).addEventListener( 'change', function() {
		setDisabled();
	});
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function slider2InitLimits( id1, id2 ) {
	var self = this;
	this.slider1 = document.getElementById( 's-slider-' + id1 );
	this.slider2 = document.getElementById( 's-slider-' + id2 );
	this.input1  = document.getElementById( 'sinput-'   + id1 );
	this.input2  = document.getElementById( 'sinput-'   + id2 );
	this.slider1.noUiSlider.on( 'change', function() {
		val = parseFloat( self.slider2.noUiSlider.get() )
		if ( parseFloat( self.slider1.noUiSlider.get() ) >= val ) {
			self.slider1.noUiSlider.set( val );
		}
	});
	this.input1.addEventListener( 'change', function() {
		if ( self.input1.value >= self.input2.value ) {
			self.input1.value = self.input2.value;
			self.slider1.noUiSlider.set( input2.value );
		}
	});

	this.slider2.noUiSlider.on( 'change', function() {
		val = parseFloat( self.slider2.noUiSlider.get() );
		min = parseFloat( self.slider1.noUiSlider.get() );
		if ( val <= min ) {
			self.slider2.noUiSlider.set( min );
		}
	});
	this.input2.addEventListener( 'change', function() {
		if ( self.input2.value <= self.input1.value ) {
			self.input2.value = self.input1.value;
			self.slider2.noUiSlider.set( input1.value );
		}
	});
	return;
}

function slider3InitLimits ( id1, id2, id3 ) {
	var self = this;
	this.slider1 = document.getElementById( 's-slider-' + id1 );
	this.slider2 = document.getElementById( 's-slider-' + id2 );
	this.slider3 = document.getElementById( 's-slider-' + id3 );
	this.input1  = document.getElementById( 'sinput-'   + id1 );
	this.input2  = document.getElementById( 'sinput-'   + id2 );
	this.input3  = document.getElementById( 'sinput-'   + id3 );

	this.slider1.noUiSlider.on( 'change', function() {
		val = parseFloat( self.slider2.noUiSlider.get() )
		if ( parseFloat( self.slider1.noUiSlider.get()) >= val ) {
			self.slider1.noUiSlider.set( val );
		}
	});
	this.input1.addEventListener( 'change', function() {
		if ( self.input1.value >= self.input2.value ) {
			self.input1.value = self.input2.value;
			self.slider1.noUiSlider.set( self.input2.value );
		}
	});

	this.slider2.noUiSlider.on( 'change', function() {
		val = parseFloat( self.slider2.noUiSlider.get() );
		min = parseFloat( self.slider1.noUiSlider.get() );
		max = parseFloat( self.slider3.noUiSlider.get() );
		if ( val <= min ) {
			self.slider2.noUiSlider.set( min );
		}
		if ( val >= max ) {
			self.slider2.noUiSlider.set( max );
		}
	});
	this.input2.addEventListener( 'change', function() {
		if ( self.input2.value <= self.input1.value ) {
			self.input2.input2.value = self.input1.value;
			self.slider2.noUiSlider.set( self.input1.value );
		}
		if ( self.input2.value >= self.input3.value ) {
			self.input2.value = self.input3.value;
			self.slider2.noUiSlider.set( input3.value );
		}
	});

	this.slider3.noUiSlider.on( 'change', function() {
		val = parseFloat( self.slider3.noUiSlider.get() );
		min = parseFloat( self.slider2.noUiSlider.get() );
		if ( val <= min ) {
			self.slider3.noUiSlider.set( min );
		}
	});
	this.input3.addEventListener( 'change', function() {
		if ( self.input3.value <= self.input2.value ) {
			self.input3.value = self.input2.value;
			self.slider3.noUiSlider.set( self.input2.value );
		}
	});

	return;
}

function slider4InitLimits ( id1, id2, id3, id4 ) {
	var self = this;
	this.slider1 = document.getElementById( 's-slider-' + id1 );
	this.slider2 = document.getElementById( 's-slider-' + id2 );
	this.slider3 = document.getElementById( 's-slider-' + id3 );
	this.slider4 = document.getElementById( 's-slider-' + id4 );
	this.input1  = document.getElementById( 'sinput-' + id1 );
	this.input2  = document.getElementById( 'sinput-' + id2 );
	this.input3  = document.getElementById( 'sinput-' + id3 );
	this.input4  = document.getElementById( 'sinput-' + id4 );
	this.slider1.noUiSlider.on( 'change', function() {
		val = parseFloat( self.slider2.noUiSlider.get() )
		if ( parseFloat( self.slider1.noUiSlider.get()) >= val ) {
			self.slider1.noUiSlider.set( val );
		}
	});
	this.input1.addEventListener( 'change', function() {
		if ( self.input1.value >= self.input2.value ) {
			self.input1.value = self.input2.value;
			self.slider1.noUiSlider.set( self.input2.value );
		}
	});
	this.slider2.noUiSlider.on( 'change', function() {
		val = parseFloat( self.slider2.noUiSlider.get() );
		min = parseFloat( self.slider1.noUiSlider.get() );
		max = parseFloat( self.slider3.noUiSlider.get() );
		if ( val <= min ) {
			self.slider2.noUiSlider.set( min );
		}
		if ( val >= max ) {
			self.slider2.noUiSlider.set( max );
		}
	});
	this.input2.addEventListener( 'change', function() {
		if ( self.input2.value <= self.input1.value ) {
			self.input2.input2.value = self.input1.value;
			self.slider2.noUiSlider.set( self.input1.value );
		}
		if ( self.input2.value >= self.input3.value ) {
			self.input2.value = self.input3.value;
			self.slider2.noUiSlider.set( self.input3.value );
		}
	});
	this.slider3.noUiSlider.on( 'change', function() {
		val = parseFloat( self.slider3.noUiSlider.get() );
		min = parseFloat( self.slider2.noUiSlider.get() );
		max = parseFloat( self.slider4.noUiSlider.get() );
		if ( val <= min ) {
			self.slider3.noUiSlider.set( min );
		}
		if ( val >= max ) {
			self.slider3.noUiSlider.set( max );
		}
	});
	this.input3.addEventListener( 'change', function() {
		if ( self.input3.value <= self.input2.value ) {
			self.input3.value = self.input2.value;
			self.slider3.noUiSlider.set( self.input2.value );
		}
		if ( self.input3.value >= self.input4.value ) {
			self.input3.value = self.input4.value;
			self.slider3.noUiSlider.set( self.input4.value );
		}
	});
	this.slider4.noUiSlider.on( 'change', function() {
		val = parseFloat( self.slider4.noUiSlider.get() );
		min = parseFloat( self.slider3.noUiSlider.get() );
		if ( val <= min ) {
			self.slider4.noUiSlider.set( min );
		}
	});
	this.input4.addEventListener( 'change', function() {
		if ( self.input4.value <= self.input3.value ) {
			self.input4.value = self.input3.value;
			self.slider4.noUiSlider.set( self.input3.value );
		}
	});
	return;
 }
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
document.addEventListener( "DOMContentLoaded", function( event ) {
  $( function () {
		$( '[data-toggle="tooltip"]' ).tooltip( {
		  delay:     { 'show': 500, 'hide': 0 },
			trigger:   'hover',
			placement: 'auto',
			animation: true,
		})
	})
	if ( electronApp > 0 ) {
		document.getElementById( 'refreshData-button' ).disabled           = true;
		document.getElementById( 'uploadData-button' ).disabled            = true;
		document.getElementById( 'setupPassword' ).disabled                = true;
		document.getElementById( 'write-engineWorkTimeData' ).disabled     = true;
		document.getElementById( 'write-engineStartsNumberData' ).disabled = true;
		document.getElementById( 'write-fuelUsageData' ).disabled          = true;
		document.getElementById( 'write-fuelRateData' ).disabled           = true;
		document.getElementById( 'write-powerFullUsage' ).disabled         = true;
		document.getElementById( 'write-powerActiveUsage' ).disabled       = true;
		document.getElementById( 'write-powerReactiveUsage' ).disabled     = true;
		document.getElementById( 'controllerTimeSetup' ).disabled          = true;
		document.getElementById( 'eraseLog-button' ).disabled              = true;
		document.getElementById( 'saveLog-buton' ).disabled                = true;
		document.getElementById( 'refreshMeasure-button' ).disabled        = true;
		document.getElementById( 'measureSave-button' ).disabled           = true;
		document.getElementById( 'measureErase-button' ).disabled          = true;
		ipv4AdrMask();
	}
	document.getElementById( 'versionSowtware' ).innerHTML = softwareVersion;
	try {
		sliderInit();
	} catch {}
	chartInit();
	declareChartList();
	if ( electronApp > 0 ) {
	  measureChartInit();
	}
	passwordProcessig();
	declareInterface();
	diInit( 'a' );
	diInit( 'b' );
	diInit( 'c' );
	diInit( 'd' );
	doInit( 'a' );
	doInit( 'b' );
	doInit( 'c' );
	doInit( 'd' );
	doInit( 'e' );
	doInit( 'f' );
	doInit( 'g' );
	doInit( 'h' );
	doInit( 'i' );
	doInit( 'j' );
	ainInit( 'oilPressureSensorType',
	        [ 'oilPressureOpenCircuitAlarmEnb',
					  'oilPressureAlarmEnb',
						'oilPressurePreAlarmEnb'
					],
					[ 'sinput-oilPressureAlarmLevel',
					  's-slider-oilPressureAlarmLevel',
						'sinput-oilPressurePreAlarmLevel',
						's-slider-oilPressurePreAlarmLevel'
					],
					[],
					function() {
	  				document.getElementById( 'starterStopOilPressureEnb' ).checked = false;
						document.getElementById( 'sinput-starterStopOilPressureLevel' ).disabled = true;
						document.getElementById( 's-slider-starterStopOilPressureLevel' ).setAttribute( 'disabled', false );
						return;
	});
	ainInit( 'coolantTempSensorType',
	         [ 'coolantTempOpenCircuitAlarmEnb',
					   'coolantHightTempAlarmEnb',
						 'coolantHightTempPreAlarmEnb',
						 'coolantTempHeaterEnb',
						 'coolantTempCoolerEnb'
					 ],
					 [ 'sinput-coolantHightTempAlarmLevel',
					   's-slider-coolantHightTempAlarmLevel',
						 'sinput-coolantHightTempPreAlarmLevel',
						 's-slider-coolantHightTempPreAlarmLevel',
						 'sinput-coolantTempHeaterOnLevel',
						 's-slider-coolantTempHeaterOnLevel',
						 'sinput-coolantTempHeaterOffLevel',
						 's-slider-coolantTempHeaterOffLevel',
						 'sinput-coolantTempCoolerOffLevel',
						 's-slider-coolantTempCoolerOffLevel',
						 'sinput-coolantTempCoolerOnLevel',
						 's-slider-coolantTempCoolerOnLevel'
					 ],
					 [],
					 function() { return; } );
	ainInit( 'fuelLevelSensorType',
	        [ 'fuelLevelOpenCircuitAlarmEnb',
						'fuelLevelLowAlarmEnb',
	  			  'fuelLevelLowPreAlarmEnb',
						'fuelLevelHightAlarmEnb',
						'fuelLevelHightPreAlarmEnb',
						'fuelPumpEnb',
						'fuelLeakAlarmEnb'
					],
					[ 'sinput-fuelLevelLowAlarmLevel',
					  's-slider-fuelLevelLowAlarmLevel',
						'sinput-fuelTankLevel',
						's-slider-fuelTankLevel',
						'sinput-fuelRateIdleLevel',
						's-slider-fuelRateIdleLevel',
						'sinput-fuelRateLevel',
						's-slider-fuelRateLevel',
					  'sinput-fuelLevelLowAlarmDelay',
					  's-slider-fuelLevelLowAlarmDelay',
					  'sinput-fuelLevelLowPreAlarmLevel',
					  's-slider-fuelLevelLowPreAlarmLevel',
						'sinput-fuelLevelLowPreAlarmDelay',
					  's-slider-fuelLevelLowPreAlarmDelay',
					  'sinput-fuelLevelHightAlarmLevel',
					  's-slider-fuelLevelHightAlarmLevel',
					  'sinput-fuelLevelHightAlarmDelay',
					  's-slider-fuelLevelHightAlarmDelay',
					  'sinput-fuelLevelHightPreAlarmLevel',
				    's-slider-fuelLevelHightPreAlarmLevel',
					  'sinput-fuelLevelHightPreAlarmDelay',
					  's-slider-fuelLevelHightPreAlarmDelay',
					  'sinput-fuelPumpOffLevel',
					  's-slider-fuelPumpOffLevel',
					  'sinput-fuelPumpOnLevel',
						's-slider-fuelPumpOnLevel'
					],
					[ 'sinput-fuelTankLevel',
					  's-slider-fuelTankLevel',
					  'sinput-fuelRateIdleLevel',
					  's-slider-fuelRateIdleLevel',
					  'sinput-fuelRateLevel',
					  's-slider-fuelRateLevel',
					],
				  function() {
						return;
	});
	powerSliderInit( 'genRatedActivePowerLevel',
		               'genRatedReactivePowerLevel',
									 'genRatedApparentPowerLevel',
									 'cosFi',
									 'genRatedApparentPower');
	if (electronApp == 0) {
		connectUpdate();
	}
	checkSettings();
	checkTimers();
	checkSelect();
	navbarToogling();
	updateVersions();
	starterStopProcessing();
	if ( electronApp > 0 ) {
		dashboard.init();
	}
	diList.init();
	doList.init();
	const genVoltageLims = new slider4InitLimits( 'genUnderVoltageAlarmLevel',
	                                              'genUnderVoltagePreAlarmLevel',
																								'genOverVoltagePreAlarmLevel',
																								'genOverVoltageAlarmLevel' );
	const genFreqLims = new slider4InitLimits( 'genUnderFrequencyAlarmLevel',
	                                           'genUnderFrequencyPreAlarmLevel',
																						 'genOverFrequencyPreAlarmLevel',
																						 'genOverFrequencyAlarmLevel' );
	const oilVoltageLims = new slider2InitLimits( 'oilPressureAlarmLevel',
																								'oilPressurePreAlarmLevel');
  const coolantLims = new slider3InitLimits( 'coolantHightTempPreAlarmLevel',
																						 'coolantHightTempElectroAlarmLevel',
                                             'coolantHightTempAlarmLevel' );
  const coolantHeaterLims = new slider2InitLimits('coolantTempHeaterOnLevel','coolantTempHeaterOffLevel');
	const coolantCoolerLims = new slider2InitLimits('coolantTempCoolerOnLevel','coolantTempCoolerOffLevel');
	const fuelLims = new slider4InitLimits('fuelLevelLowAlarmLevel',
	                                       'fuelLevelLowPreAlarmLevel',
																				 'fuelLevelHightPreAlarmLevel',
																				 'fuelLevelHightAlarmLevel');
	const fielPumpLims = new slider2InitLimits('fuelPumpOnLevel','fuelPumpOffLevel');
	const speedLims = new slider2InitLimits('speedLowAlarmLevel','speedHightAlarmLevel');
	const mainsVoltageLims = new slider2InitLimits( 'mainsUnderVoltageAlarmLevel',
		                                              'mainsOverVoltageAlarmLevel' );
	const mainsFreqLims = new slider2InitLimits( 'mainsUnderFrequencyAlarmLevel',
		                                           'mainsOverFrequencyAlarmLevel' );
	schemTypeProcessing();
  loadContent( 'devicePage' );
	doPairsAnalisInit();
	return;
});
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
module.exports.electronApp        = electronApp;
module.exports.connectionType     = connectionType;
module.exports.Password           = Password;
