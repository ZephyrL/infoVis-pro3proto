{
    var stockholm = { lat: 59.35300, lng: 18.0950 };
    
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: stockholm,
            zoom: 15
        });

        var labels = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

        var markers = locations.map(function (location, i) {
            var marker = new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });

            marker.addListener("click", function () {
                // some events here
                // window.open("https://www.google.com/")
            })
            return marker;
        });

        var polygon = new google.maps.Polygon({
            paths: coord,
            strokeColor: "#00FF00",
            strokeOpacity: 0.7,
            fillColor: "#00FF00",
            fillOpacity: 0.3
        });

        polygon.addListener("click", function(){
            // some events here
            alert("polygon clicked!");
        });
        polygon.setMap(map);


        var markerClusters = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    }

    var coord = [
        { lat: 59.35300, lng: 18.0950 },
        { lat: 59.35300, lng: 18.0900 },
        { lat: 59.35800, lng: 18.0930 },
        { lat: 59.35600, lng: 18.0990 },
        { lat: 59.35200, lng: 18.0960 },
        { lat: 59.35300, lng: 18.0950 }
    ]

    var locations = [
        { lat: 59.33258, lng: 18.0649 },
        { lat: 59.35300, lng: 18.0950 }
    ];
}