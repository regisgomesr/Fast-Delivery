var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {	
	directionsDisplay = new google.maps.DirectionsRenderer();
	var latlng = new google.maps.LatLng(-22.9099, -43.2095);
	
    var options = {
        zoom: 10,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), options);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("text-path"));
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {

			standardPoint = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(standardPoint);
			
			var geocoder = new google.maps.Geocoder();
			
			geocoder.geocode({
				"location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					$("#txtStartingPoint").val(results[0].formatted_address);
				}
            });
		});
	}
}

initialize();

$("form").submit(function(event) {
	event.preventDefault();
	
	var startingPoint = $("#txtStartingPoint").val();
	var destinationPoint = $("#txtDestinationPoint").val();
	
	var request = {
		origin: startingPoint,
		destination: destinationPoint,
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});
});