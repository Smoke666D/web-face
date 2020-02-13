//******************************************************************************
//******************************************************************************
//******************************************************************************
function hideConteny() {
	var contentPages = document.getElementsByClassName("content-data");
	for(var i=0;i<contentPages.length;i++){
		contentPages[i].classList.remove("is-shown");
	}
	return;
}

function loadContent(id) {
	hideConteny();
	document.getElementById(id).classList.add("is-shown");
	return;
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
function sliderInit() {
	var i=0;

	s_sinputs = document.getElementsByClassName("s-sinput");
	s_sinputs[0].value = 0;

	var s_sliders = document.getElementsByClassName("s-slider");
	for(i=0; i<s_sliders.length; i++){
		noUiSlider.create(s_sliders[i],{
			start: [20],
			tooltips: true,
			connect: [true, false],
			padding: 0,
			range: {
				'min': 0,
				'max': 100
			}
		})
	}





	for(i=0;i<s_sinputs.length;i++){
		s_sliders[i].noUiSlider.on('update', (function () {
			var j=i;
			return function(){
				s_sinputs[j].value = s_sliders[j].noUiSlider.get();
			}
		})() );

		s_sinputs[i].addEventListener('change', (function () {
			var j=i;
			return function(){
	    	s_sliders[j].noUiSlider.set([s_sinputs[j].value]);
			}
		})());
	}






	var d_sliders = document.getElementsByClassName("d-slider");
	for (var i=0; i<d_sliders.length; i++){
		noUiSlider.create(d_sliders[i],{
			start: [20, 80],
			tooltips: true,
		  connect: true,
			padding: 0,
		  range: {
		  	'min': 0,
		    'max': 100
			}
		})
	}
}
//******************************************************************************
//******************************************************************************
//******************************************************************************
document.addEventListener("DOMContentLoaded", function(event) {
	loadContent("oilPressPage");
	sliderInit();
});
