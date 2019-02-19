{
    var stockholm = { lat: 59.35300, lng: 18.0950 };
    // var stockholm = { lat: 59.355954, lng: 18.086862};

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

        google.maps.event.addListener(map, "zoom_changed", function(){
            // alert("zoom changed");
            var zoomLevel = map.getZoom();
            if(zoomLevel >=14 && zoomLevel <= 15) {
                districtPolygon.setMap(map);
                buildingPolygon1.setMap(null);
                buildingPolygon2.setMap(null);
            }
            if(zoomLevel > 15 && zoomLevel <= 18) {
                districtPolygon.setMap(null);
                buildingPolygon1.setMap(map);
                buildingPolygon2.setMap(map);
            } 

        })

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

        var districtPolygon = new google.maps.Polygon({
            paths: coord,
            strokeColor: "#00FF00",
            strokeOpacity: 0.7,
            fillColor: "#00FF00",
            fillOpacity: 0.3
        });

        districtPolygon.addListener("click", function () {
            // some events here
            // alert("districtPolygon clicked!");
            map.setZoom(16);
        });

        function listener(){
            document.getElementById("modal_button").click();
        };
        districtPolygon.setMap(map);

        var buildingPolygon1 = new google.maps.Polygon({
            paths: buildingCord, 
            strokeColor: "#00FFFF",
            strokeOpacity: 0.7,
            fillColor: "00FFFFF",
            fillOpacity: 0.3
        });

        var buildingPolygon2 = new google.maps.Polygon({
            paths: buildingCord2, 
            strokeColor: "#00FF77",
            strokeOpacity: 0.7,
            fillColor: "00FFF77",
            fillOpacity: 0.3
        })

        
        buildingPolygon1.addListener("click", listener);
        buildingPolygon2.addListener("click", listener);

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

    var buildingCord = [
        { lat: 59.35370, lng: 18.0940 },
        { lat: 59.35370, lng: 18.0900 },
        { lat: 59.35670, lng: 18.0915 },
        { lat: 59.35570, lng: 18.0960 }
    ]

    var buildingCord2 = [
        { lat: 59.35370, lng: 18.0950 },
        { lat: 59.35370, lng: 18.0970 },
        { lat: 59.35570, lng: 18.0970 }
    ]

    var locations = [
        { lat: 59.33258, lng: 18.0649 },
        { lat: 59.35300, lng: 18.0950 }
    ];
}