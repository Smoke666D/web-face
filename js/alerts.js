/*
function showAlert(type,text) {
	document.getElementById('alert-message').classList.remove("alert-danger");
	document.getElementById('alert-message').classList.remove("alert-warning");
	document.getElementById('alert-message').classList.remove("alert-info");
	document.getElementById('alert-message').classList.remove("alert-success");
	document.getElementById('alert-message').classList.remove("alert-secondary");
	document.getElementById('alert-message').classList.remove("alert-primary");
	document.getElementById('alert-message').classList.add(type);
	document.getElementById('alert-text').innerHTML = text;
	document.getElementById('alert-message').classList.add("show");
	return;
}

function closeAlert() {
	document.getElementById('alert-message').classList.remove("show");
	document.getElementById('alert-message').classList.add("fade");
	return;
}
*/
const triIco = '<i class="fas fa-exclamation-triangle"></i>'
//------------------------------------------------------------------------------
var alerIndex = 0;

function closeAlert(id) {
	document.getElementById('id').classList.remove("show");
	document.getElementById('id').classList.add("fade");
	return;
}

function Alert(type,ico,text) {
  var self = this;
  var box = document.getElementById("alerts");
  this.type = type;
  this.ico = ico;
  this.text = text;
  this.index = 0;
  //-------------------------------------------
  this.make = function() {
    this.index = alerIndex;
    alerIndex++;
    this.alertText  = '<div id="alert';
    this.alertText += this.index;
    this.alertText += '" class="alert ';
    this.alertText += this.type;
    this.alertText += ' alert-message d-flex p-0" role="alert"><div class="alert-icon d-flex justify-content-center align-items-center flex-grow-0 flex-shrink-0 py-3">';
    this.alertText += this.ico;
    this.alertText += '</div><div id="alert-text" class="d-flex align-items-center py-2 px-3">';
    this.alertText += this.text;
    this.alertText += '</div><a href="#" class="close d-flex ml-auto justify-content-center align-items-center px-3" onclick="closeAlert('
    this.alertText += 'alert' + this.index;
    this.alertText += ')"><i class="fas fa-times"></i></a></div></div>';
    box.innerHTML = box.innerHTML + this.alertText;
    this.object = document.getElementById('alert'+this.index);
    this.object.classList.add("show");
    return;
  }

  this.make();
  setTimeout(function(){
    obj = document.getElementById('alert'+self.index);
    obj.classList.remove("show");
  	obj.classList.add("fade");
    setTimeout(function(){
        document.getElementById('alert'+self.index).remove();
        alerIndex--;
    }, 1*1000);
  }, 3*1000);
}
//------------------------------------------------------------------------------
