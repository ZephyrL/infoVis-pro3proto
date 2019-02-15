{
    var stockholm = { lat: 59.35300, lng: 18.0950 };

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: stockholm,
            zoom: 15,
            mapTypeControl: true,
            mapTypeId: "satellite",
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTIAL_BAR,
                position: google.maps.ControlPosition.RIGHT_TOP,
                mapTypeIds: ["roadmap", "terrain", "hybrid", "satellite",]
            },
            fullscreenControl: false,
            streetViewControl: false

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

        polygon.addListener("click", function () {
            // some events here
            // alert("polygon clicked!");
            document.getElementById("modal_button").click();
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