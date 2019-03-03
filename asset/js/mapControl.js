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
        nameGasklocka = new Popup(
            new google.maps.LatLng(59.356200, 18.090155),
            document.getElementById('Gasklocka')
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

        buildingNames = [nameBrofastet, nameGasklocka, nameNorra1, nameNorra2, nameGasverket, nameVastra];
        buildingNames.forEach(element => {
            element.setMap(map);
        });
        nameSeaport.setMap(map);

        // map zoome change listener
        google.maps.event.addListener(map, "zoom_changed", function () {
            // alert("zoom changed");
            var zoomLevel = map.getZoom();
            if (zoomLevel >= 14 && zoomLevel <= 15) {
                districtPolygon.setMap(map);
                //buildingPolygonBrofastet.setMap(null);
                //buildingPolygonGasklocka.setMap(null);
                //buildingPolygonNorra1.setMap(null);
                //buildingPolygonNorra2.setMap(null);
                //buildingPolygonGasverket.setMap(null);
                //buildingPolygonVastra.setMap(null);
                //buildingPolygonSeaport.setMap(null);
            }
            if (zoomLevel > 15 && zoomLevel <= 18) {
                districtPolygon.setMap(null);
                buildingPolygonBrofastet.setMap(map);
                buildingPolygonGasklocka.setMap(map);
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
            // fillColor: "#FFFFFF",
            // fillOpacity: 0.2,
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
            fillColor: "#FFFFFF",
            fillOpacity: 0.2,
            name: "Brofastet"
        });

        var buildingPolygonGasklocka = new google.maps.Polygon({
            paths: gasklocka,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "#FFFFFF",
            fillOpacity: 0.2,
            name: "Gasklocka"
        });

        var buildingPolygonNorra1 = new google.maps.Polygon({
            paths: norra1,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "#FFFFFF",
            fillOpacity: 0.2,
            name: "Norra 1"
        });

        var buildingPolygonNorra2 = new google.maps.Polygon({
            paths: norra2,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "#FFFFFF",
            fillOpacity: 0.2,
            name: "Norra 2"
        });

        var buildingPolygonGasverket = new google.maps.Polygon({
            paths: gasverket,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "#FFFFFF",
            fillOpacity: 0.2,
            name: "Gasverket"
        });

        var buildingPolygonVastra = new google.maps.Polygon({
            paths: vastra,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.7,
            fillColor: "#FFFFFF",
            fillOpacity: 0.2,
            name: "Vastra"
        });

        var buildingPolygonSeaport = new google.maps.Polygon({
            paths: seaport,
            strokeColor: "#808080",
            strokeOpacity: 0.7,
            fillColor: "#5a5a5a",
            fillOpacity: 0.5,
            name: "Seaport"
        });

        buildingPolygons = [buildingPolygonBrofastet, buildingPolygonGasklocka,
            buildingPolygonNorra1, buildingPolygonNorra2,
            buildingPolygonGasverket, buildingPolygonVastra]

        // TODO: do something when click the polygons, e.g. show a large modal window
        polygonClickListener = function () {
            showPhaseModal(this.name);
        };

        // name of phase should disappear when put mouse on it
        polygonMouseOverListener = function () {
            var name = this.name;
            switch (name) {
                case "Brofastet":
                    nameBrofastet.setMap(null);
                    break;
                case "Gasklocka":
                    nameGasklocka.setMap(null);
                    break;
                case "Gasverket":
                    nameGasverket.setMap(null);
                    break;
                case "Norra 1":
                    nameNorra1.setMap(null);
                    break;
                case "Norra 2":
                    nameNorra2.setMap(null);
                    break;
                case "Vastra":
                    nameVastra.setMap(null);
                    break;
            }
            this.setOptions({fillOpacity: "0"})
        }

        // polygon name reappear on mouse out
        polygonMouseOutListener = function () {
            var name = this.name;
            switch (name) {
                case "Brofastet":
                    nameBrofastet.setMap(map);
                    break;
                case "Gasklocka":
                    nameGasklocka.setMap(map);
                    break;
                case "Gasverket":
                    nameGasverket.setMap(map);
                    break;
                case "Norra 1":
                    nameNorra1.setMap(map);
                    break;
                case "Norra 2":
                    nameNorra2.setMap(map);
                    break;
                case "Vastra":
                    nameVastra.setMap(map);
                    break;
            }
            this.setOptions({fillOpacity: "0.2"})
        }

        buildingPolygons.forEach(element => {
            element.addListener("click", polygonClickListener);
            element.addListener("mouseover", polygonMouseOverListener);
            element.addListener("mouseout", polygonMouseOutListener);
            element.setMap(map);
        });

        buildingPolygonSeaport.setMap(map);

        // the gray area are under planning, if you are gonna show some info about it,
        // I suggest to make another listener for it
        // buildingPolygonSeaport.addListener("click", polygonClickListener);
        markers = []
        building.forEach(function (item) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.lat, item.lng),
                icon: "asset/img/yellow-light.png",
                building: item.building,
                developer: item.developer,
                phase: item.phase,
                map: map
            });
            markers.push(marker);

            var contentString = '<div id="infoWindowContent">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' +
                item.building + '</h1>' +
                '<div id="bodyContent">' +
                '<p><b>' + item.building +
                '</b>, developed by <b>' + item.developer + '</b>, ' +
                'is a part of construction in <b>' + item.phase + '</b> ' +
                'finishing construction on <b>July 2017</b>, ' +  // TODO: use real date of construction
                'and is now in operation.</p>' +
                '<p>Click to see more infomation</p>'
            '</div>' +
                '</div>';


            var infoWindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 300
            })

            marker.addListener('mouseover', function () {
                infoWindow.open(map, marker);
                buildingNames.forEach(element => {
                    element.setMap(null);
                });
            })

            marker.addListener('click', function () {
                // this.setIcon("asset/img/house-green.png");
                // TODO: this is the function to change icon (color), 
                // and what really need to do here is to pop up new window
                // and show detailed information of building
                // trigger popup(this);
                document.getElementById("modal-small-button").click();
            })

            marker.addListener('mouseout', function () {
                infoWindow.close();
                buildingNames.forEach(element => {
                    element.setMap(map);
                });
            })
        })

        // var markerClusters = new MarkerClusterer(map, markers,
        //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });


    }

    // init icons
    window.onload = function () {
        var bar = document.getElementById("colorbar-houses");
        var width = window.innerWidth * 0.4;
        building.forEach(element => {
            var icon = document.createElement("img");
            icon.src = "asset/img/yellow-light.png";
            icon.classList = "colorbar-house";
            icon.style.top = "-5px";
            icon.name = element.building;
            var string = Math.floor(Math.random() * width) + "px"
            icon.style.left = string; // TODO: now its using random index
            bar.appendChild(icon);

            icon.addEventListener("mouseover", function () {
                markers.forEach(element => {
                    if (element.building === icon.name) {
                        google.maps.event.trigger(element, 'mouseover')
                    }
                });
            })
            icon.addEventListener("mouseout", function () {
                markers.forEach(element => {
                    if (element.building === icon.name) {
                        google.maps.event.trigger(element, 'mouseout')
                    }
                });
            })

            icon.addEventListener("click", function () {
                markers.forEach(element => {
                    if (element.building === icon.name) {
                        google.maps.event.trigger(element, 'click')
                    }
                });
            })
        });
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

    var gasklocka = [
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