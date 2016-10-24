app.controller('seatPlanDataMapController', 
		function($scope,HttpCodes, $rootScope, $cookies, $location, Data,Notification,$routeParams,$log) {
	var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase() +
	"a1b1c1d1e1f1g1h1i1j1k1l1m1n1o1p1q1r1s1t1u1v1w1x1y1z1".toUpperCase() +
	"a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2q2r2s2t2u2v2w2x2y2z2".toUpperCase().split("");
//	var seaTPlanData = {
//		  "seatRows": [
//		    {
//		      "seatColumns": [
//		        {
//		          "showAddButton": false,
//		          "columnStatus": 0,
//		          "columnStatusLable": null,
//		          "columnSeatCateory": null,
//		          "bookByUserId": 0,
//		          "bookingtime": 0,
//		          "columnShow": false,
//		          "columnDisabledd": false,
//		          "columnRemoved": false
//		        },
//		        {
//		          "showAddButton": false,
//		          "columnStatus": 0,
//		          "columnStatusLable": null,
//		          "columnSeatCateory": null,
//		          "bookByUserId": 0,
//		          "bookingtime": 0,
//		          "columnShow": false,
//		          "columnDisabledd": false,
//		          "columnRemoved": false
//		        },
//		        {
//		          "showAddButton": false,
//		          "columnStatus": 0,
//		          "columnStatusLable": null,
//		          "columnSeatCateory": null,
//		          "bookByUserId": 0,
//		          "bookingtime": 0,
//		          "columnShow": false,
//		          "columnDisabledd": false,
//		          "columnRemoved": false
//		        },
//		        {
//		          "showAddButton": false,
//		          "columnStatus": 0,
//		          "columnStatusLable": null,
//		          "columnSeatCateory": null,
//		          "bookByUserId": 0,
//		          "bookingtime": 0,
//		          "columnShow": false,
//		          "columnDisabledd": false,
//		          "columnRemoved": false
//		        },
//		        {
//		          "showAddButton": false,
//		          "columnStatus": 0,
//		          "columnStatusLable": null,
//		          "columnSeatCateory": null,
//		          "bookByUserId": 0,
//		          "bookingtime": 0,
//		          "columnShow": false,
//		          "columnDisabledd": false,
//		          "columnRemoved": false
//		        }
//		      ]
//		    }]};
$scope.seaTPlanData = {};
$scope.numOfRow = 15;
$scope.numOfCol = 6;
$scope.seatCateories = [];
$scope.seaTPlanDataFirstRow = {};
$scope.catergoryValue = "";
$scope.creatView = function() {
	$scope.seaTPlanData["seatRows"] = [];
	$scope.seaTPlanDataFirstRow["seatRows"] = [];
	for(var i=1;i<= $scope.numOfRow;i++){
		var seatRow = {};
		seatRow["seatColumns"] = [];
		var column = {};
		column = {
				"columnShow":false,
				"columnDisabledd":false,
				"columnRemoved":true,
				"columnStatus":0,
				"columnStatusLable":alphabet[i-1]
		};
		seatRow["seatColumns"].push(column);
		for(var j=1;j<=$scope.numOfCol;j++){
			
			column = {
					"columnShow":true,
					"columnDisabledd":false,
					"columnRemoved":false,
					"columnStatus":0,
					"columnStatusLable":alphabet[i-1]
			};
			seatRow["seatColumns"].push(column);
		}
		column = {
				"columnShow":false,
				"columnDisabledd":false,
				"columnRemoved":true,
				"columnStatus":0,
				"columnStatusLable":alphabet[i-1]
		};
		seatRow["seatColumns"].push(column);
		$scope.seaTPlanData["seatRows"].push(seatRow);
	}
	if($scope.seaTPlanData.length != 0){
		columnsData = [];
		columnsData = angular.toJson($scope.seaTPlanData.seatRows[0]);
		columnsData = JSON.parse(columnsData);
		
		$scope.seaTPlanDataFirstRow["seatRows"].push(columnsData);
		

	}
	console.log($scope.seaTPlanData);
	console.log($scope.seaTPlanDataFirstRow);
	
//	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"] = [];
//	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"]=[];
//	if($scope.servicesData.seatPlannerServicesData.formData["numOfCol"] != 0 && $scope.servicesData.seatPlannerServicesData.formData["numOfRow"] !=0){
//		
//		for(var i=1;i<= $scope.servicesData.seatPlannerServicesData.formData["numOfRow"];i++){
//			columnsData = [];
//			column = {};
//			column = {
//					"columnShow":false,
//					"columnDisabledd":false,
//					"columnRemoved":true,
//					"columnStatus":0,
//					"columnStatusLable":alphabet[i-1]
//			};
//			columnsData.push(column);
//			for(var j=1;j<=$scope.servicesData.seatPlannerServicesData.formData["numOfCol"];j++){
//				
//				column = {};
//				column = {
//						"columnShow":true,
//						"columnDisabledd":false,
//						"columnRemoved":false,
//						"columnStatus":0,
//						"columnStatusLable":alphabet[i-1]
//				};
//				
//				columnsData.push(column);
//			}
//			
//			column = {};
//			column = {
//					"columnShow":false,
//					"columnDisabledd":false,
//					"columnRemoved":true,
//					"columnStatus":0,
//					"columnStatusLable":alphabet[i-1]
//			};
//			columnsData.push(column);
//			$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].push(columnsData);
//		}
//		console.log($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"]);
//	}
//	
//	if($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].length != 0){
//		columnsData = [];
//		columnsData = angular.toJson($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"][0]);
//		columnsData = JSON.parse(columnsData);
//		
//		$scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"].push(columnsData);
//		
//
//	}
}
/**
 * Done upto here
 */

$scope.creatView();

$scope.addCategory = function() {
	console.log("category",$scope);
	if(!$rootScope.isEmpty($scope.catergoryValue)){
		$scope.seatCateories.push($scope.catergoryValue);
		$scope.catergoryValue = "";
	}else{
		
	}
	
};


$scope.categoryChange = function(seatRow,seatCateory) {
	
	console.log(seatCateory);
	
	$.each(seatRow,function(key,value){
		value["columnSeatCateory"] = seatCateory;
		console.log(value)
	});
}
$scope.deleteCategory = function(index) {
	$scope.servicesData.seatPlannerServicesData.formData.seatCateories.splice(index,1);
	
}

$scope.addExtraCell =function(seatRow,index){
	var elementIndex = $scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].indexOf(seatRow);
	console.log(elementIndex,"......",index);
	
	
	$.each($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"],function(key,value){
		console.log("key....",value)
		var columnsData = [];
		var column = {};
		if(key == elementIndex){
	
			columnsData = [];
			
			column = {};
			column = {"columnShow":true,"columnDisabledd":false,"columnRemoved":false,"columnStatus":0,"columnStatusLable":value[0].columnStatusLable};
			columnsData.push(column);
			
		}else{
			columnsData = [];
			
			column = {};
			column = {"columnShow":true,"columnDisabledd":false,"columnRemoved":true,"columnStatus":0,"columnStatusLable":value[0].columnStatusLable};
			columnsData.push(column);
		}
//		console.log(columnsData);
//		$scope.seaTPlanData[key].splice(index+1, 0, column);
		if(index == 0){
			$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"][key].splice(index+1, 0, column);
		}else{
			$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"][key].splice(index, 0, column);
		}
		
		
	});
	var column = {
			"columnShow":false,
			"columnDisabledd":false,
			"columnRemoved":true,
			"columnStatus":0,
			"columnStatusLable":""
	};
//	$scope.seaTPlanDataFirstRow[index].splice(index+1, 0, column);
	if(index == 0){
		$scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"][0].splice(index+1, 0, column);
	}else{
		$scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"][0].splice(index, 0, column);
	}
	
	
//	console.log($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"],"\n ",$scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"]);
	
	$scope.refreshView();
//	$scope.seaTPlanData[elementIndex].splice(index+1, 0, columnsData);
}

$scope.addExtraRow = function() {
	var previuosRow = angular.toJson($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"][$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].length-1]);
//	console.log(previuosRow)
	$scope.refreshView();
	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].push(JSON.parse(previuosRow));
	previuosRow = $scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"][$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].length-1];
	$scope.servicesData.seatPlannerServicesData.formData.numOfCol = $scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"][0].length-2;
	$scope.servicesData.seatPlannerServicesData.formData.numOfRow = $scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].length;
	$.each(previuosRow,function(key,value){
		value.columnStatusLable= alphabet[$scope.servicesData.seatPlannerServicesData.formData.numOfRow-1];
	});
	
}

$scope.addExtraRowAfterFirstRow = function() {
	var previuosRow = angular.toJson($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"][0]);
//	console.log(previuosRow)
	
	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].unshift(JSON.parse(previuosRow));
	
	$scope.refreshView();
	
	$scope.servicesData.seatPlannerServicesData.formData.numOfCol = $scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"][0].length-2;
	$scope.servicesData.seatPlannerServicesData.formData.numOfRow = $scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].length;
	$.each($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"],function(key,value){
		$.each(value,function(keyinner,valueinner){
			valueinner.columnStatusLable= alphabet[key];
		});
		
	});
	
}

$scope.refreshView = function() {
	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"] = angular.toJson($scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"]);
	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"] = JSON.parse($scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"]);
	
	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"] = angular.toJson($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"]);
	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"] = JSON.parse($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"]);
	
	$scope.servicesData.seatPlannerServicesData.formData["seatCateories"] = angular.toJson($scope.servicesData.seatPlannerServicesData.formData["seatCateories"]);
	$scope.servicesData.seatPlannerServicesData.formData["seatCateories"] = JSON.parse($scope.servicesData.seatPlannerServicesData.formData["seatCateories"]);
	
	console.log($scope.servicesData.seatPlannerServicesData.formData["seatCateories"]);
	
	$scope.servicesData.seatPlannerServicesData.formData.numOfCol = $scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"][0].length-2;
	$scope.servicesData.seatPlannerServicesData.formData.numOfRow = $scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].length;
} 


$scope.removeColumn = function(index,seatcol,flag){
	console.log(index);
	$.each($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"],function(key,value){
		console.log(key,"....",value);
		$.each(value,function(keyinner,valueinner){
			console.log(key,"....",value);
			if(keyinner == index){
				valueinner.columnRemoved = flag;
			}
		});
	});
	seatcol.columnRemoved = flag;
}
$scope.delteAllColumn = function(index,seatcol,flag){
	console.log(index);
	$.each($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"],function(key,value){
		console.log(key,"....",value);
		$.each(value,function(keyinner,valueinner){
			console.log(key,"....",value);
			if(keyinner == index){
				$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"][key].splice(keyinner,1);
			}
		});
	});
	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"][0].splice(index,1);
	
	$scope.refreshView();
}

$scope.removeRow = function(seatRow,flag) {
	console.log("seatcol......",seatRow);
	for(var i=0;i<seatRow.length;i++){
		if(i==0 || i==seatRow.length-1){
			continue;
		}else{
			seatRow[i].columnRemoved = flag;
		}
		
	}
//	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].reverse();
	$.each($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"],function(key,value){
//		console.log("key....",value);
		$.each(value,function(keyinner,valueinner){
			console.log(valueinner);
		});
	});

	
}
$scope.deleteRow = function(seatRow) {
//	console.log("seatcol......",$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].indexOf(seatRow))
	var indexofSeatRow = $scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].indexOf(seatRow);
	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].splice(indexofSeatRow,1);
//	$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].splice(index,1);
	
	$scope.refreshView();
};




$scope.removeCell = function(seatcol,flag) {
	seatcol.columnRemoved = flag;
}


/**
 * canvas code start here
 * 
 */
$scope.canvasWidth = 400;
$scope.canvasHeight = 300;
	
$scope.showCanvas = function() {
	 console.log($('#layoutcontainerTable').outerHeight());
	 console.log($('#layoutcontainerTable').outerWidth());
	 
	 $scope.canvasWidth = $('#layoutcontainerTable').outerWidth();
	 $scope.canvasHeight = $('#layoutcontainerTable').outerHeight();
	 $("#canvasContainer").show();
	 init2(false);
};	

$scope.deleteBox =function(){
	console.log($scope.mySel);
	console.log(boxes2);
	if($scope.mySel != null)
	boxes2.splice(boxes2.indexOf($scope.mySel),1);
	
	console.log(boxes2);
	init2(false);
}

// holds all our boxes
var boxes2 = []; 

// New, holds the 8 tiny boxes that will be our selection handles
// the selection handles will be in this order:
// 0  1  2
// 3     4
// 5  6  7
var selectionHandles = [];

// Hold canvas information
var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed

var isDrag = false;
var isResizeDrag = false;
var expectResize = -1; // New, will save the # of the selection handle if the mouse is over one.
var mx, my; // mouse coordinates

 // when set to true, the canvas will redraw everything
 // invalidate() just sets this to false right now
 // we want to call invalidate() whenever we make a change
var canvasValid = false;

// The node (if any) being selected.
// If in the future we want to select multiple objects, this will get turned into an array
$scope.mySel = null;

// The selection color and width. Right now we have a red selection with a small width
var mySelColor = '#CC0000';
var mySelWidth = 2;
var mySelBoxColor = 'darkred'; // New for selection boxes
var mySelBoxSize = 6;

// we use a fake canvas to draw individual shapes for selection testing
var ghostcanvas;
var gctx; // fake canvas context

// since we can drag from anywhere in a node
// instead of just its x/y corner, we need to save
// the offset of the mouse when we start dragging.
var offsetx, offsety;

// Padding and border style widths for mouse offsets
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;




// Box object to hold data
function Box2() {
  this.x = 0;
  this.y = 0;
  this.w = 1; // default width and height?
  this.h = 1;
  this.fill = '#444444';
}

// New methods on the Box class
Box2.prototype = {
  // we used to have a solo draw function
  // but now each box is responsible for its own drawing
  // mainDraw() will call this with the normal canvas
  // myDown will call this with the ghost canvas with 'black'
  draw: function(context, optionalColor) {
      if (context === gctx) {
        context.fillStyle = 'black'; // always want black for the ghost canvas
      } else {
        context.fillStyle = this.fill;
      }
      
      // We can skip the drawing of elements that have moved off the screen:
      if (this.x > WIDTH || this.y > HEIGHT) return; 
      if (this.x + this.w < 0 || this.y + this.h < 0) return;
      
      context.fillRect(this.x,this.y,this.w,this.h);
      
    // draw selection
    // this is a stroke along the box and also 8 new selection handles
    if ($scope.mySel === this) {
      context.strokeStyle = mySelColor;
      context.lineWidth = mySelWidth;
      context.strokeRect(this.x,this.y,this.w,this.h);
//      context.strokeStyle = "black";
      context.font="20px Georgia";
      context.textAlign="center"; 
      context.textBaseline = "middle";
      context.fillStyle = "#000000";
      context.fillText("Canvas Rocks",this.x+(this.w/2),this.y+(this.h/2));
      // draw the boxes
      context.strokeStyle = mySelColor;
      var half = mySelBoxSize / 2;
      
      // 0  1  2
      // 3     4
      // 5  6  7
      
      // top left, middle, right
      selectionHandles[0].x = this.x-half;
      selectionHandles[0].y = this.y-half;
      
      selectionHandles[1].x = this.x+this.w/2-half;
      selectionHandles[1].y = this.y-half;
      
      selectionHandles[2].x = this.x+this.w-half;
      selectionHandles[2].y = this.y-half;
      
      //middle left
      selectionHandles[3].x = this.x-half;
      selectionHandles[3].y = this.y+this.h/2-half;
      
      //middle right
      selectionHandles[4].x = this.x+this.w-half;
      selectionHandles[4].y = this.y+this.h/2-half;
      
      //bottom left, middle, right
      selectionHandles[6].x = this.x+this.w/2-half;
      selectionHandles[6].y = this.y+this.h-half;
      
      selectionHandles[5].x = this.x-half;
      selectionHandles[5].y = this.y+this.h-half;
      
      selectionHandles[7].x = this.x+this.w-half;
      selectionHandles[7].y = this.y+this.h-half;

      
      context.fillStyle = mySelBoxColor;
      for (var i = 0; i < 8; i ++) {
        var cur = selectionHandles[i];
        context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
        
      }
    }
    
  } // end draw

}

//Initialize a new Box, add it, and invalidate the canvas
function addRect(x, y, w, h, fill,flag) {
  var rect = new Box2;
  rect.x = x;
  rect.y = y;
  rect.w = w
  rect.h = h;
  rect.fill = fill;
  if(flag)
  boxes2.push(rect);
  invalidate();
}

// initialize our canvas, add a ghost canvas, set draw loop
// then add everything we want to intially exist on the canvas
function init2(flag) {
  canvas = document.getElementById('canvas2');
  HEIGHT = canvas.height;
  WIDTH = canvas.width;
  ctx = canvas.getContext('2d');
  ghostcanvas = document.createElement('canvas');
  ghostcanvas.height = HEIGHT;
  ghostcanvas.width = WIDTH;
  gctx = ghostcanvas.getContext('2d');
  
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.onselectstart = function () { return false; }
  
  // fixes mouse co-ordinate problems when there's a border or padding
  // see getMouse for more detail
  if (document.defaultView && document.defaultView.getComputedStyle) {
    stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)     || 0;
    stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)      || 0;
    styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
    styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)  || 0;
  }
  
  // make mainDraw() fire every INTERVAL milliseconds
  setInterval(mainDraw, INTERVAL);
  
  // set our events. Up and down are for dragging,
  // double click is for making new boxes
  canvas.onmousedown = myDown;
  canvas.onmouseup = myUp;
  canvas.ondblclick = myDblClick;
  canvas.onmousemove = myMove;
  
  // set up the selection handle boxes
  for (var i = 0; i < 8; i ++) {
    var rect = new Box2;
    selectionHandles.push(rect);
  }
  
  // add custom initialization here:
  
  if(flag){
	  // add a large green rectangle
	  addRect(260, 70, 60, 65, 'rgba(0,205,0,0.7)',flag);
	  
	  // add a green-blue rectangle
	  addRect(240, 120, 40, 40, 'rgba(2,165,165,0.7)',flag);  
	  
	  // add a smaller purple rectangle
	  addRect(45, 60, 25, 25, 'rgba(150,150,250,0.7)',flag);
  }else{

	  console.log(boxes2)
//	addRect(x, y, w, h, fill) 
	for (var i = 0; i < boxes2.length; i++) {
		console.log(boxes2[i]);
		addRect(boxes2[i].x, boxes2[i].y, boxes2[i].w, boxes2[i].h, boxes2[i].fill,flag);
	}
  }
 
}


//wipes the canvas context
function clear(c) {
  c.clearRect(0, 0, WIDTH, HEIGHT);
}

// Main draw loop.
// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
function mainDraw() {
  if (canvasValid == false) {
    clear(ctx);
    
    // Add stuff you want drawn in the background all the time here
    
    // draw all boxes
    var l = boxes2.length;
    for (var i = 0; i < l; i++) {
      boxes2[i].draw(ctx); // we used to call drawshape, but now each box draws itself
    }
    
    // Add stuff you want drawn on top all the time here
    
    canvasValid = true;
  }
}

// Happens when the mouse is moving inside the canvas
function myMove(e){
  if (isDrag) {
    getMouse(e);
    
    $scope.mySel.x = mx - offsetx;
    $scope.mySel.y = my - offsety;   
    
    // something is changing position so we better invalidate the canvas!
    invalidate();
  } else if (isResizeDrag) {
    // time ro resize!
    var oldx = $scope.mySel.x;
    var oldy = $scope.mySel.y;
    
    // 0  1  2
    // 3     4
    // 5  6  7
    switch (expectResize) {
      case 0:
        $scope.mySel.x = mx;
        $scope.mySel.y = my;
        $scope.mySel.w += oldx - mx;
        $scope.mySel.h += oldy - my;
        break;
      case 1:
        $scope.mySel.y = my;
        $scope.mySel.h += oldy - my;
        break;
      case 2:
        $scope.mySel.y = my;
        $scope.mySel.w = mx - oldx;
        $scope.mySel.h += oldy - my;
        break;
      case 3:
        $scope.mySel.x = mx;
        $scope.mySel.w += oldx - mx;
        break;
      case 4:
        $scope.mySel.w = mx - oldx;
        break;
      case 5:
        $scope.mySel.x = mx;
        $scope.mySel.w += oldx - mx;
        $scope.mySel.h = my - oldy;
        break;
      case 6:
        $scope.mySel.h = my - oldy;
        break;
      case 7:
        $scope.mySel.w = mx - oldx;
        $scope.mySel.h = my - oldy;
        break;
    }
    
    invalidate();
  }
  
  getMouse(e);
  // if there's a selection see if we grabbed one of the selection handles
  if ($scope.mySel !== null && !isResizeDrag) {
    for (var i = 0; i < 8; i++) {
      // 0  1  2
      // 3     4
      // 5  6  7
      
      var cur = selectionHandles[i];
      
      // we dont need to use the ghost context because
      // selection handles will always be rectangles
      if (mx >= cur.x && mx <= cur.x + mySelBoxSize &&
          my >= cur.y && my <= cur.y + mySelBoxSize) {
        // we found one!
        expectResize = i;
        invalidate();
        
        switch (i) {
          case 0:
            this.style.cursor='nw-resize';
            break;
          case 1:
            this.style.cursor='n-resize';
            break;
          case 2:
            this.style.cursor='ne-resize';
            break;
          case 3:
            this.style.cursor='w-resize';
            break;
          case 4:
            this.style.cursor='e-resize';
            break;
          case 5:
            this.style.cursor='sw-resize';
            break;
          case 6:
            this.style.cursor='s-resize';
            break;
          case 7:
            this.style.cursor='se-resize';
            break;
        }
        return;
      }
      
    }
    // not over a selection box, return to normal
    isResizeDrag = false;
    expectResize = -1;
    this.style.cursor='auto';
  }
  
}

// Happens when the mouse is clicked in the canvas
function myDown(e){
  getMouse(e);
  
  //we are over a selection box
  if (expectResize !== -1) {
    isResizeDrag = true;
    return;
  }
  
  clear(gctx);
  var l = boxes2.length;
  for (var i = l-1; i >= 0; i--) {
    // draw shape onto ghost context
    boxes2[i].draw(gctx, 'black');
    
    // get image data at the mouse x,y pixel
    var imageData = gctx.getImageData(mx, my, 1, 1);
    var index = (mx + my * imageData.width) * 4;
    
    // if the mouse pixel exists, select and break
    if (imageData.data[3] > 0) {
      $scope.mySel = boxes2[i];
      offsetx = mx - $scope.mySel.x;
      offsety = my - $scope.mySel.y;
      $scope.mySel.x = mx - offsetx;
      $scope.mySel.y = my - offsety;
      isDrag = true;
      
      invalidate();
      clear(gctx);
      console.log($scope.mySel);
      console.log(boxes2.indexOf($scope.mySel));
      return;
    }
    
  }
  // havent returned means we have selected nothing
  $scope.mySel = null;
  // clear the ghost canvas for next time
  clear(gctx);
  // invalidate because we might need the selection border to disappear
  invalidate();
}

function myUp(){
  isDrag = false;
  isResizeDrag = false;
  expectResize = -1;
}

// adds a new node
function myDblClick(e) {
  getMouse(e);
  // for this method width and height determine the starting X and Y, too.
  // so I left them as vars in case someone wanted to make them args for something and copy this code
  var width = 50;
  var height = 50;
  addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)',true);
}


function invalidate() {
  canvasValid = false;
}

// Sets mx,my to the mouse position relative to the canvas
// unfortunately this can be tricky, we have to worry about padding and borders
function getMouse(e) {
      var element = canvas, offsetX = 0, offsetY = 0;

      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
      }

      // Add padding and border style widths to offset
      offsetX += stylePaddingLeft;
      offsetY += stylePaddingTop;

      offsetX += styleBorderLeft;
      offsetY += styleBorderTop;

      mx = e.pageX - offsetX;
      my = e.pageY - offsetY
}

// If you dont want to use <body onLoad='init()'>
// You could uncomment this init() reference and place the script reference inside the body tag
//init();
window.init2 = init2;


//init2(true);

});