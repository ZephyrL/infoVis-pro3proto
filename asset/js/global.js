var map;
var polygons;

var coord1 = [
    { lat: 59.35300, lng: 18.0950 },
    { lat: 59.35300, lng: 18.0900 },
    { lat: 59.35800, lng: 18.0930 },
]

var coord2 = [
    { lat: 59.35370, lng: 18.0940 },
    { lat: 59.35370, lng: 18.0900 },
    { lat: 59.35670, lng: 18.0915 },
    { lat: 59.35570, lng: 18.0960 }
]

var coord3 = [
    { lat: 59.35370, lng: 18.0950 },
    { lat: 59.35370, lng: 18.0970 },
    { lat: 59.35570, lng: 18.0970 }
]

var coord4 = [
    { lat: 59.35600, lng: 18.0990 },
    { lat: 59.35200, lng: 18.0960 },
    { lat: 59.35300, lng: 18.0950 }
]

function initMap() {
    var stockholm = { lat: 59.35300, lng: 18.0950 };
    map = new google.maps.Map(document.getElementById('map'), {
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

    polygon1 = new google.maps.Polygon({
        paths: coord1,
        strokeColor: "#00FF00",
        strokeOpacity: 0.7,
        fillColor: "00FF00",
        fillOpacity: 0.3,
        content: "Area1"
    });

    polygon2 = new google.maps.Polygon({
        paths: coord2,
        strokeColor: "#FF0000",
        strokeOpacity: 0.7,
        fillColor: "FF0000",
        fillOpacity: 0.3,
        content: "Area2"
    });

    polygon3 = new google.maps.Polygon({
        paths: coord3,
        strokeColor: "#0000FF",
        strokeOpacity: 0.7,
        fillColor: "#0000FF",
        fillOpacity: 0.3,
        content: "Area3"
    });

    polygon4 = new google.maps.Polygon({
        paths: coord4,
        strokeColor: "#00FFFF",
        strokeOpacity: 0.7,
        fillColor: "#00FFFF",
        fillOpacity: 0.3,
        content: "Area4"
    });

    polygon1.setMap(map);
    polygon2.setMap(map);
    polygon3.setMap(map);
    polygon4.setMap(map);

    polygons = [polygon1, polygon2, polygon3, polygon4]
}

