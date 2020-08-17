const triIco     = '<i class="fas fa-exclamation-triangle"></i>';
const bellIco    = '<i class="fas fa-bell"></i>';
const okIco      = '<i class="fas fa-check-circle"></i>';
//------------------------------------------------------------------------------
var alerIndex = 0;

function closeAlert ( id ) {
  object = document.getElementById( 'alert' + id );
	object.classList.remove( 'show' );
	object.classList.add( 'fade' );
  alerIndex--;
	return;
}

function Alert ( type, ico, text, progress ) {
  var self      = this;
  var box       = document.getElementById( 'alerts' );
  this.type     = type;
  this.ico      = ico;
  this.text     = text;
  this.index    = 0;
  if ( progress == undefined ) {
    this.progress = 0;
  } else {
    this.progress = progress;
  }
  //-------------------------------------------
  this.make = function () {
    this.index = alerIndex;
    alerIndex++;
    this.alertText  = '<div id="alert';
    this.alertText += this.index;
    this.alertText += '" class="alert ';
    this.alertText += this.type;
    this.alertText += ' alert-message shadow rounded d-flex p-0" role="alert"><div class="alert-icon d-flex justify-content-center align-items-center flex-grow-0 flex-shrink-0 py-3">';
    this.alertText += this.ico;
    this.alertText += '</div><div class="alert-content';
    if ( this.progress == 0 ) {
      this.alertText += ' d-flex align-items-center';
    }
    this.alertText += ' py-2 px-3">';
    this.alertText += '<div id="alert-text">';
    this.alertText += this.text;
    this.alertText += '</div>';
    if ( this.progress > 0 ) {
      this.alertText += '<div class="progress"><div id="alert-progress'
      this.alertText += this.index;
      this.alertText += '"class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" style="width: 0%;"></div></div>';
    }
    this.alertText += '</div>';
    if ( this.progress == 0 ) {
      this.alertText += '<a href="#" class="close d-flex ml-auto justify-content-center align-items-center px-3" onclick="closeAlert(';
      this.alertText += this.index;
      this.alertText += ')"><i class="fas fa-times"></i></a>';
    }

    this.alertText += '</div></div>';
    box.innerHTML   = box.innerHTML + this.alertText;
    this.object     = document.getElementById( 'alert' + this.index );
    this.object.classList.add( 'show' );

    this.pb = document.getElementById( 'alert-progress' + this.index );
    return;
  }
  this.setProgressBar = function ( value ) {
    this.pb.style.width = value + "%";
    if ( value >= 100 ) {
      this.close( 1 );
    }
    return;
  }
  this.close = function ( timeout ) {
    setTimeout ( function () {
      obj = document.getElementById( 'alert' + self.index );
      if ( obj != null ) {
        obj.classList.remove( 'show' );
      	obj.classList.add( 'fade' );
        alerIndex--;
        setTimeout( function () {
          let el = document.getElementById( 'alert' + self.index );
          if ( el != null ) {
            el.remove();
          }
        }, 1 * 1000 );
      }
    }, timeout * 1000 );
  }

  this.make ();
  if ( this.progress == 0 ) {
    this.close( 6 );
  }
  return self;
}
//------------------------------------------------------------------------------
module.exports.Alert = Alert;
module.exports.triIco = triIco;
module.exports.bellIco = bellIco;
module.exports.okIco = okIco;
