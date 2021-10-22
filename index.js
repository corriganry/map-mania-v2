var gMap
var score = 0;
var hint
var favoritePlaces = [
  {"name":"Chicago", "coordinates":{"lat":41.878113,"lng":-87.629799}},
  {"name":"Tokyo", "coordinates":{"lat":35.689487,"lng":139.691711}},
  {"name":"Estes Park", "coordinates":{"lat":40.376129,"lng":-105.523651}},
  {"name":"Stockholm", "coordinates":{"lat":59.3251172,"lng":18.0710935}},
  {"name":"Rockford", "coordinates":{"lat":42.266800,"lng":-89.088379}}
];

var currentPlaceIndex = 0;
var currentPlace = favoritePlaces[currentPlaceIndex];

function initMap() {
  gMap = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.823375, lng: -40.7671089 },
    zoom: 1,
    
  });

  google.maps.event.addListener(gMap, 'idle', function() {
    checkLocation()
  });

  document.body.addEventListener('click', function() {
    hideImg();
  });
}

function hideImg() {
  document.getElementById('starter').textContent = "";
}

function nextPlace() {
  currentPlaceIndex++;
  currentPlace = favoritePlaces[currentPlaceIndex];
}

function checkLocation() {
    console.log('function checkLocation()');
    var zoomLevel = gMap.getZoom();
    var inBounds = false;
    giveHint();
    if (score != 5) {
      if(gMap.getBounds().contains(currentPlace.coordinates)){
        inBounds = true;
      }

      if (currentPlaceIndex < (favoritePlaces.length)){
        if ((zoomLevel > 7) && (inBounds) && score != 5) {
          console.log("Location Found.");
          placeMarker(currentPlace);
          nextPlace();
          score++;
          hint = "Good job you found it!"
          document.getElementById("hint_show").value = hint;
          document.getElementById('score_show').value = score;
        }
        if (score == 5) {
          hint = "You win!"
          document.getElementById("hint_show").value = hint;
        }
      }
      else {
        hint = "You win!";
      }

      console.log("Is it in bounds or not? " + inBounds);
      console.log('Score = ' + score); 
  }
  else {
    win();
  }
}

function placeMarker(marker) {
  var marker = new google.maps.Marker({position:marker.coordinates, map:gMap});

  if (marker.content) {
    var infoWindow = new google.maps.InfoWindow({"content":marker.content});
    marker.addListener("click", function() {
      infoWindow.open(gMap, marker);
    });
  }
}

function win() {
  for (i = 0; i < favoritePlaces.length; i++) {
    placeMarker(favoritePlaces[i]);
    score = 5;
    hint = "You win!"
    document.getElementById("hint_show").value = hint;
    document.getElementById("score_show").value = score;
  }
}

function giveHint() {
  bounds = gMap.getCenter();
  zoomLevel = gMap.getZoom();
  hint = "";
  if (bounds.lat() > currentPlace.coordinates.lat) {
    hint = hint + "Try moving down"
    document.getElementById("hint_show").value = hint;
  }
  if (bounds.lat() < currentPlace.coordinates.lat) {
    hint = hint + "Try moving up"
    document.getElementById("hint_show").value = hint;
  }
  if(bounds.lng() > currentPlace.coordinates.lng) {
    hint = hint + " and left!"
    document.getElementById("hint_show").value = hint;
  }
  if(bounds.lng() < currentPlace.coordinates.lng) {
    hint = hint + " and right!"
    document.getElementById("hint_show").value = hint;
  }
  if(zoomLevel < 8) {
    hint = hint + " Make sure you zoom in more to get points!"
    document.getElementById("hint_show").value = hint;
  }
  if (Math.abs(bounds.lat()-currentPlace.coordinates.lat) < 3 && Math.abs(bounds.lng()-currentPlace.coordinates.lng) < 3) {
    hint = "You're getting really close!"
    if(zoomLevel < 8) {
      hint = hint + " Make sure you zoom in more to get points!"
    }
    document.getElementById("hint_show").value = hint;
  }
}

function initApplication() {
  console.log('This is my map mania!');
  var hint = "No Hint Yet";
  document.getElementById("hint_show").value = hint;
  document.getElementById("score_show").value = score;
}

