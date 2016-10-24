app.controller('formBuilderdataView', function($scope,HttpCodes, $rootScope, $cookies, $location, Data,Notification,$routeParams,Excel,$timeout) {
	$scope.serviceId = $routeParams.serviceId;
	$scope.userId = $rootScope.userinfo.user_id;
	$scope.intractionDate = $rootScope.getToday();
	$scope.builderIntractionDataList = [];
	$scope.getFormBulderData = function() {
	
	$scope.unique = function(origArr) {
	    var newArr = [],
	        origLen = origArr.length,
	        found, x, y;
	
	    for (x = 0; x < origLen; x++) {
	        found = undefined;
	        for (y = 0; y < newArr.length; y++) {
	            if (origArr[x] === newArr[y]) {
	                found = true;
	                break;
	            }
	        }
	        if (!found) {
	            newArr.push(origArr[x]);
	        }
	    }
	    return newArr;
	}
	$scope.column = {};
	$scope.columndata = {};
	$scope.tableData = new Array();
		var intractionDate = $scope.intractionDate;
		Data.post('formBulder/getFormBuilderInractionData/'+$scope.serviceId+"/"+$scope.userId,intractionDate).then(function (result) {
			
			console.log(result);
			if(result.status == HttpCodes.OK){
				
				$.each(result.builderIntractionDatas,function(key,value){
					
					$.each(value.formMainModel.formfields,function(keyinner,valueinner){
						$scope.column[valueinner.fieldtitle.replace(" ","_")] = valueinner.fieldtitle;
						if($scope.showAddOptions(valueinner.fieldtype)){
							if(valueinner.fieldtype == "checkbox"){
								var i = 0;
								var hasValue;
								var k = 0;
								$.each(valueinner.fieldoptions,function(keyinnerInner,valueinnerInner){
										if(valueinnerInner.optioncheck){
											valueinner.fieldvalue +=valueinnerInner.optiontitle+" ,";
									
										}
										
									
								});
								if(valueinner.fieldvalue != ""){
									valueinner.fieldvalue = valueinner.fieldvalue.substring(0, valueinner.fieldvalue.length - 1);
								}
							}else if(valueinner.fieldtype == "dropdown" || valueinner.fieldtype == "radio"){
								$.each(valueinner.fieldoptions,function(keyinnerInner,valueinnerInner){
									if(valueinnerInner.optioncheck){
										valueinner.fieldvalue +=valueinnerInner.optiontitle+" ,";
								
									}
									
								
								});
								if(valueinner.fieldvalue != ""){
									valueinner.fieldvalue = valueinner.fieldvalue.substring(0, valueinner.fieldvalue.length - 1);
								}
							}
						}
					});
					
				});
//				$scope.column = $scope.unique($scope.column);
			
				$.each($scope.column,function(keyOuter,valueOuter){
					$scope.columndata[valueOuter] = [];
					$.each(result.builderIntractionDatas,function(key,value){
						var flag = false;
						$.each(value.formMainModel.formfields,function(keyinner,valueinner){
							
							if(valueinner.fieldtitle == valueOuter){
								$scope.columndata[valueOuter].push(valueinner.fieldvalue);
								flag = true;
							}
							
							
						});
						if(!flag){
							$scope.columndata[valueOuter].push("");
						}
					});
				});
				
				
				console.log($scope.columndata);
				
				
				
				$scope.builderIntractionDataList = result.builderIntractionDatas;
				console.log("builderIntractionDatas...",$scope.builderIntractionDataList);
			}else{
				$scope.builderIntractionDataList = result.builderIntractionDatas;
			}
			
		});
	};
	
	$scope.getFormBulderData();
	$scope.showAddOptions = function (fieldtype){
//    	console.log(fieldtype)
        if(fieldtype == "radio" || fieldtype == "dropdown" || fieldtype == "checkbox")
            return true;
        else
            return false;
    };
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
        $scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
        $timeout(function(){
        	var link = document.createElement('a');
        	link.download = "Report_"+$scope.intractionDate+".xlsx";
        	link.href = $scope.exportHref;
        	link.click();
        	
        },100); // trigger download
    }
});
app.directive('jqdatepicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            $(element).datetimepicker({timepicker:false,format:'d/m/Y',formatDate:'d/m/Y',scrollInput:false,
            	onSelectDate:function(dp,input){
//    			    console.log($input.val());
    			    
            		
            		
                    scope.$apply();
    			    
                    console.log(scope);
                   
                    
                    
    			  }
    	})
        }
    };
    
    
});
app.factory('Excel',function($window){
    var uri='data:application/vnd.ms-excel;base64,',
    template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
    format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
	return {
	    tableToExcel:function(tableId,worksheetName){
	        var table=$(tableId),
	            ctx={worksheet:worksheetName,table:table.html()},
	            href=uri+base64(format(template,ctx));
	        return href;
	    }
	};
});