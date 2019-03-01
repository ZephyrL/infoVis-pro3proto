{
    var stockholm = { lat: 59.356739, lng: 18.091526 };
    // var stockholm = { lat: 59.355954, lng: 18.086862};

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: stockholm,
            zoom: 16,
            mapTypeControl: true,
            mapTypeId: "satellite",
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTIAL_BAR,
                position: google.maps.ControlPosition.RIGHT_TOP,
                mapTypeIds: ["roadmap", "terrain", "hybrid", "satellite",]
            },
            fullscreenControl: false,
            streetViewControl: false,
            tilt: 45,
            heading: 45
        });

                // polygon names
                Popup = createPopupClass();
                nameSeaport = new Popup(
                    new google.maps.LatLng(59.356205, 18.096201),
                    document.getElementById('Seaport')
                );
                nameBrofastet = new Popup(
                    new google.maps.LatLng(59.359973, 18.094811),
                    document.getElementById('Brofastet')
                );
                nameGasklockan = new Popup(
                    new google.maps.LatLng(59.356200, 18.090155),
                    document.getElementById('Gasklockan')
                );
                nameNorra1 = new Popup(
                    new google.maps.LatLng(59.357021, 18.086668),
                    document.getElementById('Norra1')
                );
                nameNorra2 = new Popup(
                    new google.maps.LatLng(59.358722, 18.090021),
                    document.getElementById('Norra2')
                );
                nameGasverket = new Popup(
                    new google.maps.LatLng(59.358393, 18.093309),
                    document.getElementById('Gasverket')
                );
                nameVastra = new Popup(
                    new google.maps.LatLng(59.354373, 18.088567),
                    document.getElementById('Vastra')
                );
        
        
                nameSeaport.setMap(map);
                nameBrofastet.setMap(map);
                nameGasklockan.setMap(map);
                nameNorra1.setMap(map);
                nameNorra2.setMap(map);
                nameGasverket.setMap(map);
                nameVastra.setMap(map);
      
        // map zoome change listener
        google.maps.event.addListener(map, "zoom_changed", function () {
            // alert("zoom changed");
            var zoomLevel = map.getZoom();
            if (zoomLevel >= 14 && zoomLevel <= 15) {
                districtPolygon.setMap(map);
                //buildingPolygonBrofastet.setMap(null);
                //buildingPolygonGasklockan.setMap(null);
                //buildingPolygonNorra1.setMap(null);
                //buildingPolygonNorra2.setMap(null);
                //buildingPolygonGasverket.setMap(null);
                //buildingPolygonVastra.setMap(null);
                //buildingPolygonSeaport.setMap(null);
            }
            if (zoomLevel > 15 && zoomLevel <= 18) {
                districtPolygon.setMap(null);
                buildingPolygonBrofastet.setMap(map);
                buildingPolygonGasklockan.setMap(map);
                buildingPolygonNorra1.setMap(map);
                buildingPolygonNorra2.setMap(map);
                buildingPolygonGasverket.setMap(map);
                buildingPolygonVastra.setMap(map);
                buildingPolygonSeaport.setMap(map);
            }

        });

        var districtPolygon = new google.maps.Polygon({
            paths: coord,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "#FFFFFF",
            fillOpacity: 0.3,
            name: "Stockholm Royal Seaport"
        });

        districtPolygon.addListener("click", function () {
            // some events here
            // alert("districtPolygon clicked!");
            map.setZoom(16);
        });

        var buildingPolygonBrofastet = new google.maps.Polygon({
            paths: brofastet,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "FFFFFF",
            fillOpacity: 0.3,
            name: "Brofastet"
        });

        var buildingPolygonGasklockan = new google.maps.Polygon({
            paths: gasklockan,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "FFFFFF",
            fillOpacity: 0.3,
            name: "Gasklockan"
        });

        var buildingPolygonNorra1 = new google.maps.Polygon({
            paths: norra1,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "FFFFFF",
            fillOpacity: 0.3,
            name: "Norra1"
        });

        var buildingPolygonNorra2 = new google.maps.Polygon({
            paths: norra2,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "FFFFFF",
            fillOpacity: 0.3,
            name: "Norra2"
        });

        var buildingPolygonGasverket = new google.maps.Polygon({
            paths: gasverket,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "FFFFFF",
            fillOpacity: 0.3,
            name: "Gasverket"
        });

        var buildingPolygonVastra = new google.maps.Polygon({
            paths: vastra,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "FFFFFF",
            fillOpacity: 0.3,
            name: "Vastra"
        });

        var buildingPolygonSeaport = new google.maps.Polygon({
            paths: seaport,
            strokeColor: "#808080",
            strokeOpacity: 0.7,
            fillColor: "808080",
            fillOpacity: 0.3,
            name: "Seaport"
        });

        function polygonClickListener() {
            document.getElementById("modal_button").click();
        };

        buildingPolygonBrofastet.addListener("click", polygonClickListener);
        buildingPolygonGasklockan.addListener("click", polygonClickListener);
        buildingPolygonNorra1.addListener("click", polygonClickListener);
        buildingPolygonNorra2.addListener("click", polygonClickListener);
        buildingPolygonGasverket.addListener("click", polygonClickListener);
        buildingPolygonVastra.addListener("click", polygonClickListener);
        // the gray area are under planning, if you are gonna show some info about it,
        // I suggest to make another listener for it
        // buildingPolygonSeaport.addListener("click", polygonClickListener);

        // name of phase should disappear when put mouse on it
        function polygonMouseOverListener() {
            var name = this.name;
            switch (name) {
                case "Brofastet":
                    nameBrofastet.setMap(null);
                    break;
                case "Gasklockan":
                    nameGasklockan.setMap(null);
                    break;
                case "Gasverket":
                    nameGasverket.setMap(null);
                    break;
                case "Norra1":
                    nameNorra1.setMap(null);
                    break;
                case "Norra2":
                    nameNorra2.setMap(null);
                    break;
                case "Vastra":
                    nameVastra.setMap(null);
                    break;
            }
        }

        buildingPolygonBrofastet.addListener("mouseover", polygonMouseOverListener);
        buildingPolygonGasklockan.addListener("mouseover", polygonMouseOverListener);
        buildingPolygonNorra1.addListener("mouseover", polygonMouseOverListener);
        buildingPolygonNorra2.addListener("mouseover", polygonMouseOverListener);
        buildingPolygonGasverket.addListener("mouseover", polygonMouseOverListener);
        buildingPolygonVastra.addListener("mouseover", polygonMouseOverListener);
        // buildingPolygonSeaport.addListener("mouseover", polygonMouseOverListener);

        function polygonMouseOutListener(){
                        var name = this.name;
            switch (name) {
                case "Brofastet":
                    nameBrofastet.setMap(map);
                    break;
                case "Gasklockan":
                    nameGasklockan.setMap(map);
                    break;
                case "Gasverket":
                    nameGasverket.setMap(map);
                    break;
                case "Norra1":
                    nameNorra1.setMap(map);
                    break;
                case "Norra2":
                    nameNorra2.setMap(map);
                    break;
                case "Vastra":
                    nameVastra.setMap(map);
                    break;
            }
        }

        buildingPolygonBrofastet.addListener("mouseout", polygonMouseOutListener);
        buildingPolygonGasklockan.addListener("mouseout", polygonMouseOutListener);
        buildingPolygonNorra1.addListener("mouseout", polygonMouseOutListener);
        buildingPolygonNorra2.addListener("mouseout", polygonMouseOutListener);
        buildingPolygonGasverket.addListener("mouseout", polygonMouseOutListener);
        buildingPolygonVastra.addListener("mouseout", polygonMouseOutListener);
        // buildingPolygonSeaport.addListener("mouseout", polygonMouseOutListener);

        //districtPolygon.setMap(map);
        buildingPolygonBrofastet.setMap(map);
        buildingPolygonGasklockan.setMap(map);
        buildingPolygonGasverket.setMap(map);
        buildingPolygonNorra1.setMap(map);
        buildingPolygonNorra2.setMap(map);
        buildingPolygonSeaport.setMap(map);
        buildingPolygonVastra.setMap(map);




        // var markerClusters = new MarkerClusterer(map, markers,
        //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });


    }

    var coord = [
        { lat: 59.356572, lng: 18.084068 },
        { lat: 59.354457, lng: 18.085994 },
        { lat: 59.352497, lng: 18.084877 },
        { lat: 59.350698, lng: 18.103393 },
        { lat: 59.344750, lng: 18.114451 },
        { lat: 59.339445, lng: 18.115042 },
        { lat: 59.338578, lng: 18.140753 },
        { lat: 59.346077, lng: 18.131349 },
        { lat: 59.352938, lng: 18.117590 },
        { lat: 59.358556, lng: 18.106147 },
        { lat: 59.361316, lng: 18.098653 },
        { lat: 59.360323, lng: 18.092653 },
        { lat: 59.358741, lng: 18.086900 },
        { lat: 59.356572, lng: 18.084068 }
    ]

    var brofastet = [
        { lat: 59.360135, lng: 18.092479 },
        { lat: 59.359115, lng: 18.092927 },
        { lat: 59.359414, lng: 18.095510 },
        { lat: 59.359677, lng: 18.096987 },
        { lat: 59.360747, lng: 18.095988 },
        { lat: 59.360135, lng: 18.092479 },
    ]

    var gasklockan = [
        { lat: 59.356824, lng: 18.089313 },
        { lat: 59.356358, lng: 18.088846 },
        { lat: 59.355275, lng: 18.089726 },
        { lat: 59.355245, lng: 18.091010 },
        { lat: 59.356532, lng: 18.091584 },
        { lat: 59.356824, lng: 18.089313 },
    ]

    var norra1 = [
        { lat: 59.358438, lng: 18.086734 },
        { lat: 59.356720, lng: 18.083837 },
        { lat: 59.356109, lng: 18.085282 },
        { lat: 59.355666, lng: 18.086766 },
        { lat: 59.355751, lng: 18.087545 },
        { lat: 59.356482, lng: 18.088180 },
        { lat: 59.357187, lng: 18.088632 },
        { lat: 59.358438, lng: 18.086734 },
    ]

    var norra2 = [
        { lat: 59.358509, lng: 18.087043 },
        { lat: 59.357835, lng: 18.087968 },
        { lat: 59.358553, lng: 18.089919 },
        { lat: 59.358229, lng: 18.090553 },
        { lat: 59.359007, lng: 18.092900 },
        { lat: 59.359949, lng: 18.091801 },
        { lat: 59.359180, lng: 18.089164 },
        { lat: 59.358509, lng: 18.087043 },
    ]

    var gasverket = [
        { lat: 59.357144, lng: 18.088977 },
        { lat: 59.356713, lng: 18.091904 },
        { lat: 59.357513, lng: 18.093683 },
        { lat: 59.357920, lng: 18.094068 },
        { lat: 59.358257, lng: 18.096089 },
        { lat: 59.358685, lng: 18.097932 },
        { lat: 59.359642, lng: 18.097266 },
        { lat: 59.358960, lng: 18.093022 },
        { lat: 59.358140, lng: 18.090422 },
        { lat: 59.357111, lng: 18.088986 },
        { lat: 59.357144, lng: 18.088977 },
    ]

    var vastra = [
        { lat: 59.356387, lng: 18.088465 },
        { lat: 59.355582, lng: 18.087644 },
        { lat: 59.354921, lng: 18.086943 },
        { lat: 59.354276, lng: 18.086425 },
        { lat: 59.353249, lng: 18.086205 },
        { lat: 59.352948, lng: 18.090122 },
        { lat: 59.353174, lng: 18.090395 },
        { lat: 59.353659, lng: 18.090064 },
        { lat: 59.353758, lng: 18.090861 },
        { lat: 59.355117, lng: 18.089827 },
        { lat: 59.356333, lng: 18.088888 },
        { lat: 59.356387, lng: 18.088465 },
    ]

    var seaport = [
        { lat: 59.352497, lng: 18.084877 },
        { lat: 59.353087, lng: 18.086141 },
        { lat: 59.352901, lng: 18.090640 },
        { lat: 59.355062, lng: 18.091526 },
        { lat: 59.356423, lng: 18.092249 },
        { lat: 59.357258, lng: 18.093683 },
        { lat: 59.357800, lng: 18.094361 },
        { lat: 59.358649, lng: 18.098191 },
        { lat: 59.359808, lng: 18.097346 },
        { lat: 59.360898, lng: 18.096114 },
        { lat: 59.361316, lng: 18.098653 },
        { lat: 59.358556, lng: 18.106147 },
        { lat: 59.352938, lng: 18.117590 },
        { lat: 59.346077, lng: 18.131349 },
        { lat: 59.338578, lng: 18.140753 },
        { lat: 59.339445, lng: 18.115042 },
        { lat: 59.344750, lng: 18.114451 },
        { lat: 59.350698, lng: 18.103393 },
        { lat: 59.352497, lng: 18.084877 },

    ]


    //<script type="text/javascript" src="data.json"></script>
// <script type="text/javascript" src="javascrip.js"></script>


    function place_buildings(map, coord){
        var image = 'https://commons.wikimedia.org/wiki/File:Home_icon_black.png';
        var marker = [];
        for(i = 0 ; i < coord.length; i++) { //Let coord represent the coordinates of buildings.
            if (coord.hasOwnProperty('latitude') || coord.hasOwnProperty('longitude'))
                marker[i] = new google.maps.Marker({
                    position: c,
                    map: map,
                    icon: image,
                    shape: 'default'
                });

            marker.addListener('click', function(){
                //Do some work when icon is clicked, maybe pop-up?
            });

        }
        return marker;
    }
}

/**
 * Returns the Popup class.
 *
 * Unfortunately, the Popup class can only be defined after
 * google.maps.OverlayView is defined, when the Maps API is loaded.
 * This function should be called by initMap.
 */
function createPopupClass() {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content The bubble div.
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    function Popup(position, content) {
        this.position = position;

        content.classList.add('popup-bubble');

        // This zero-height div is positioned at the bottom of the bubble.
        var bubbleAnchor = document.createElement('div');
        bubbleAnchor.classList.add('popup-bubble-anchor');
        bubbleAnchor.appendChild(content);

        // This zero-height div is positioned at the bottom of the tip.
        this.containerDiv = document.createElement('div');
        this.containerDiv.classList.add('popup-container');
        this.containerDiv.appendChild(bubbleAnchor);

        // Optionally stop clicks, etc., from bubbling up to the map.
        google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }
    // ES5 magic to extend google.maps.OverlayView.
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);

    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function () {
        this.getPanes().floatPane.appendChild(this.containerDiv);
    };

    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function () {
        if (this.containerDiv.parentElement) {
            this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
    };

    /** Called each frame when the popup needs to draw itself. */
    Popup.prototype.draw = function () {
        var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

        // Hide the popup when it is far out of view.
        var display =
            Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                'block' :
                'none';

        if (display === 'block') {
            this.containerDiv.style.left = divPosition.x + 'px';
            this.containerDiv.style.top = divPosition.y + 'px';
        }
        if (this.containerDiv.style.display !== display) {
            this.containerDiv.style.display = display;
        }
    };

    return Popup;
}