// originates from a stack overflow question

var app = angular.module("app", []);

app.controller('MainCtrl', function($scope) {
  function buildRectangle() {
    return {startX: 10,
            startY: 10,
            sizeX: 100,
            sizeY: 100,
            name: 'rect'
           };
    };

  
    // List of rectangles
    $scope.rectangles = [];

    // Create shapes
    for (var i = 0; i < 2; i++) {
        $scope.rectangles.push( buildRectangle() );
    }
});



app.directive('drawing', function(){
  return {
    restrict: 'E',
    scope: { localRectangles: '=rectangleList' },
    template: '<canvas class="drawing" width="500" height="300"></canvas>',
    link: function(scope, element){
    
      var canvasElement = element.children()[0];
      var ctx = canvasElement.getContext('2d');
      
      // Are we drawing?
      var drawing = false;
      
      // the last coordinates before the current move
      var centerX;
      var centerY;

      element.bind('mousedown', function(event){  
        startX = event.offsetX;
        startY = event.offsetY;
        
        // begins new line
        ctx.beginPath();
        
        drawing = true;
      });

      element.bind('mousemove', function(event){
        if(drawing){
          
          // get current mouse position
          currentX = event.offsetX;
          currentY = event.offsetY;
          
          draw(startX, startY, currentX, currentY);
          
          var lastIdx = scope.localRectangles.length - 1;
          scope.localRectangles[lastIdx] = ({startX:startX, startY: startY, sizeX: currentX, sizeY: currentY});
          scope.$apply();
        }
        
      });

      element.bind('mouseup', function(event){
        // stop drawing
        drawing = false;
      });
        
      // canvas reset
      function reset(){
       canvasElement.width = canvasElement.width; 
      }
      
      function draw(centerX, centerY,
                    currentX, currentY, rotate){
    	
        reset();
        
        if(drawing){
    		scope.localRectangles.push({startX:startX, startY: startY, sizeX: currentX, sizeY: currentY});
    		scope.$apply();
    	}
        
        var sizeX = 2 * (currentX - centerX);
        var sizeY = 2 * (currentY - centerY);
        
        ctx.rect(centerX - 0.5 * sizeX,
                 centerY - 0.5 * sizeY,
                 sizeX, sizeY);
        ctx.lineWidth = 3;
        // color
        ctx.strokeStyle = '#fff';
        // draw it
        ctx.stroke();
      }
    }
  };
});