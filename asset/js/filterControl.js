{

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function toHex(i){
        return (i/16).toString(16) + (i%16).toString(16);
    }

    $("#showAll").click(function (event) {
        // TODO: sort the polygons using their :content as keys
        // polygons.sort(compareFunction)
        // polygons[0].setOptions({strokeColor: "#FFFFFF"});

        array = shuffle([0, 1, 2, 3]);
        for (let i = 0; i < 4; i++) {
            var newColor = "#" + toHex(256/4*i) + toHex(256/4*(3-i)) + "00";
            // alert(newColor);
            polygons[array[i]].setOptions({ strokeColor: newColor });
            polygons[array[i]].setOptions({ fillColor: newColor });
        }
        event.preventDefault(); // should enable this if there is any strange behavior on click.
    })

    $("#green").click(function (event) {

    })

    $("#tranports").click(function (event) {

    })

    $("#waste").click(function (event) {

    })


}