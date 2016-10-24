'use strict';

app.controller('CreateCtrl',function ($scope,DragDropHandler,$rootScope, $cookies, $location, FormService) {
	
	
    // preview form mode
    $scope.previewMode = false;

    // new form
    $scope.form = {};
    $scope.form.formid = 1;
    $scope.form.formname = 'My Form';
    $scope.form.formfields = [];
    $scope.massage = "";
    // previewForm - for preview purposes, form will be copied into this
    // otherwise, actual form might get manipulated in preview mode
    $scope.previewForm = {};

    // add new field drop-down:
    $scope.addField = {};
    $scope.addField.types = FormService.fields;
    $scope.addField.new = $scope.addField.types[0].name;
    $scope.addField.lastAddedID = 0;
    $scope.addField.fildName = ""; 
    $scope.isOptionfiledShow = false;
    // accordion settings
    $scope.accordion = {}
    $scope.accordion.oneAtATime = true;
    $scope.fildMasg = "";
    $scope.addField.fieldoptions = new Array();
//    if(!$rootScope.isEmpty($scope.$parent.servicesData.formBuilder.FormData)){
//    	$scope.form = $scope.$parent.servicesData.formBuilder.FormData;
//	}	
    
    /*$scope.moveObject = function(from, to, fromList, toList) {
        console.log("here",from, to, fromList, toList);
    	var item = $scope.form.formfields[from];
        DragDropHandler.addObject(item, $scope.items[toList], to);
        $scope.items[fromList].splice(from, 1);
    }

    $scope.createObject = function(object, to, list) {
    	console.log(from, to, fromList, toList);
    	var newItem = angular.copy(object);
        newItem.id = Math.ceil(Math.random() * 1000);
        DragDropHandler.addObject(newItem, $scope.items[list], to);
    };*/
    
    
    
    // create new field button click
    $scope.addNewField = function(){
    	
        // incr fieldid counter
       
        if($scope.addField.fildName == ""){
        	$scope.fildMasg = "Please enter field Name";
        	return false;
        }
        
//        console.log($scope.addField.types.length);
        $scope.addField.lastAddedID++;
        $scope.addField.lastAddedID++;
        var newField = {
            "fieldid" : $scope.addField.lastAddedID,
            "fieldtitle" : $scope.addField.fildName,
            "fieldtype" : $scope.addField.new,
            "fieldvalue" : "",
            "fieldoptions":$scope.addField.fieldoptions,
            "fieldrequired" : false,
			"fielddisabled" : false
        };

        console.log("newField...",newField);
        
//        return false;
        // put newField into fields array
        $scope.form.formfields.push(newField);
        $scope.addField.fildName = "";
        $scope.fildMasg = "";
        $scope.addField.fieldoptions = new Array();
        $scope.addField.new = $scope.addField.types[0].name;
    }

    $scope.saveFormBuilderDataData = function(data){
    	console.log(data);
    	
    	console.log("formBuilder....",$scope.$parent.servicesData.formBuilder);
//    	return false;
    	if(data.formfields.length != 0){
    		console.log($scope.$parent.servicesData.formBuilder);
    		$scope.$parent.servicesData.formBuilder.formData = data;
    		
    		$scope.$parent.saveValue($scope.$parent.servicesData.formBuilder);
    		$scope.massage = "Data saved";
    	}else{
    		$scope.massage = "Please add fileds";
    		$scope.$parent.saveValue($scope.$parent.servicesData.formBuilder);
    	}
    	
    	
    }	
    
    // deletes particular field on button click
    $scope.deleteField = function (fieldid){
    	console.log($scope.form.formfields,"....",fieldid);
    	 $scope.form.formfields.splice(fieldid-1, 1);
    	 $scope.addField.lastAddedID --;
        return false;
    	for(var i = 0; i < $scope.form.formfields.length; i++){
            if($scope.form.formfields[i].fieldid == fieldid){
                $scope.form.formfields.splice(i, 1);
                break;
            }
        }
    }
    // add new option in new field
    $scope.addOptionnew = function (field){
        if(!field.fieldoptions)
            field.fieldoptions = new Array();

        var lastOptionID = 0;

        if(field.fieldoptions[field.fieldoptions.length-1])
            lastOptionID = field.fieldoptions[field.fieldoptions.length-1].optionid;

        // new option's id
        var optionid = lastOptionID + 1;

        var newOption = {
            "optionid" : optionid,
            "optiontitle" : "Option " + optionid,
            "optionvalue" : optionid,
            "optioncheck":false
        };

        // put new option into fieldoptions array
        field.fieldoptions.push(newOption);
    }
    
    // add new option to the field
    $scope.addOption = function (field){
        if(!field.fieldoptions)
            field.fieldoptions = new Array();

        var lastOptionID = 0;

        if(field.fieldoptions[field.fieldoptions.length-1])
            lastOptionID = field.fieldoptions[field.fieldoptions.length-1].optionid;

        // new option's id
        var optionid = lastOptionID + 1;

        var newOption = {
            "optionid" : optionid,
            "optiontitle" : "Option " + optionid,
            "optionvalue" : optionid,
            "optioncheck":false
        };

        // put new option into fieldoptions array
        field.fieldoptions.push(newOption);
    }

    // delete particular option
    $scope.deleteOption = function (field, option){
        for(var i = 0; i < field.fieldoptions.length; i++){
            if(field.fieldoptions[i].optionid == option.optionid){
                field.fieldoptions.splice(i, 1);
                break;
            }
        }
    }


    // preview form
    $scope.previewOn = function(){
        if($scope.form.formfields == null || $scope.form.formfields.length == 0) {
            var title = 'Error';
            var msg = 'No fields added yet, please add fields to the form before preview.';
            var btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary'}];
            
//            $dialog.messageBox(title, msg, btns).open();
        }
        else {
            $scope.previewMode = !$scope.previewMode;
            $scope.form.submitted = false;
            angular.copy($scope.form, $scope.previewForm);
//            $("#mobileViewModel").modal("show");
        }
    }

    // hide preview form, go back to create mode
    $scope.previewOff = function(){
        $scope.previewMode = !$scope.previewMode;
        $scope.form.submitted = false;
//        $("#MyCustomModelModel").modal("hide");
    }
    
    // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (fieldtype){
//    	console.log(fieldtype)
        if(fieldtype == "radio" || fieldtype == "dropdown" || fieldtype == "checkbox")
            return true;
        else
            return false;
    }
    
    $scope.inputTypeChange = function(){
//    	alert("here");
    	$scope.isOptionfiledShow = $scope.showAddOptions($scope.addField.new);
    	
    };
    // deletes all the fields
    $scope.reset = function (){
        $scope.form.formfields.splice(0, $scope.form.formfields.length);
        $scope.addField.lastAddedID = 0;
    }
    
    $scope.$on('dataIsAvailable', function(event, data) {
		
		console.log("dataIsAvailable...............",data);
		$scope.form  = data;
		$scope.addField.lastAddedID  = data.formfields.length+10;
//		$scope.$apply();
	});
});
app.directive('jqdatepicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            $(element).datetimepicker({timepicker:false,format:'m/d/Y',formatDate:'m/d/Y',scrollInput:false,
            	onSelectDate:function(dp,input){
//    			    console.log($input.val());
    			    
            		
            		
                    scope.$apply();
    			    
                    console.log(scope);
                   
                    
                    
    			  }
    	})
        }
    };
    
    
});
