angular.module('show.spiiner', []).directive('spiiner',function(){
	return{
		restrict: 'AE',
		template:'<div class="uil-ripple-css" style="transform:scale(1); position: fixed;z-index: 10000000000;right: 40%;" id="spinnerGloabal"><div></div><div></div></div>'
	}
});