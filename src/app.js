/*
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

// This is an example of using an image with Image and Window


var freq = 2000;
var Vibe = require('ui/vibe');
var ajax = require('ajax');
var distance = 1000000;
var UI = require('ui');
var Vector2 = require('vector2');
var wind = new UI.Window({ fullscreen: true });

var xlat = 43.659698;
var xlong =  -79.396926;

var dist = 13337;


// GEOLOCATION TEST
function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  
  dist = Math.abs(xlat - latitude) + Math.abs(xlong - longitude);
  freq = dist*10000000/9+800;

  //console.log(freq + "FREQQQQQQQQQQQQQQ");
  

  console.log("Dist = " + dist);
}

function errorHandler(err) {
  if(err.code == 1) {
    
  //console.log("Error: Access is denied!");
  }else if( err.code == 2) {
    //console.log("Error: Position is unavailable!");
  }
}
function getLocation(){

   if(navigator.geolocation){
      // timeout at 60000 milliseconds (60 seconds)
      var options = {timeout:60000};
      navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
     // POST TEST
     /*
     ajax(
      {
        method: 'POST',
        type: 'json',
        url: 'twoheartsform.mybluemix.net',
        data: 15,
      },
      function(data){
        console.log('POST success');
      },
      function(error){
        console.log('POST failure');
      }
    );*/

   } else{
      //console.log("Sorry, browser does not support geolocation!");
   }
   
}




// GET TEST
function getMate(){
//   ajax(
//   {
//     url: 'http://twoheartsform.mybluemix.net',
//     type: 'json'
//   },
//   function(data) {
//     console.log('Quote of the day is: ' + data);
//     distance = data;
//   },
//   function(error) {
//     console.log('The ajax request failed: ' + error);
//   }
// );
  
//  console.log("getting mate");
  /*
  ajax(
    {
      url: 'http://www.example.com/?name=value',
      type: 'json',
      method: 'get'

    },
    function(data) {
      distance = data;
      console.log(data);
    },
    function(error) {
      console.log('The ajax request failed: ' + error);
    }
  );
*/
}

if (freq <= 1000) {
  Vibe.vibrate(10000);
}


var imageStrs = ["images/SmallHeart.png" , "images/BigHeart.png" , "images/BiggestHeart.png"];

var biggestHeart = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  image: imageStrs[2],
});



var smallHeart = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  image: imageStrs[0],
});

var bigHeart = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  image: imageStrs[1],
});


// init images array
var images = [smallHeart, bigHeart, biggestHeart];
// create root window

// init cur heart
var heart;

// helper function to replace the heart image
var setHeart = function(imgPos) {
  //console.log('beat');
  if (heart) {
    heart.remove();
  }
  //console.log('setting heart to ' + imgPos);
  heart = images[imgPos];
  wind.add(heart);
};

// initial image position
var curImgPos = 0;
setHeart(curImgPos);
wind.show();





function heartBeat() {
  //console.log("growin");
  setHeart(curImgPos + 1);
  
  setTimeout(function() {
    //console.log("shrinkin");
    setHeart(curImgPos);
  }, freq/2);
}  


//var rect = new UI.Rect({ size: new Vector2(40, 40) });
//wind.add(rect);
//wind.pic('images/Heart.png');

wind.on('click', 'up', function(e) {
  /*
  if (curImgPos < 2) {
    curImgPos++;
    setHeart(curImgPos);
  }
  */
});

wind.on('click', 'select', function(e) {

  
});

wind.on('click', 'down', function(e) {
  /*
  if (curImgPos > 0) {
      curImgPos--;
      setHeart(curImgPos);
  }
  */
});




// THESE BITCHES SET INTERVALS OK?
setInterval(heartBeat, freq);
setInterval(getLocation, 5000);
// setInterval(getMate, 2000);



