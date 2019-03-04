{
    showPhaseModal = function (phaseName) {
        // trigger showing modal
        document.getElementById("modal-large-button").click();

        var dataset = selectData(phaseName);

        var title = document.getElementById("modal-phase-title");
        var info = document.getElementById("modal-phase-info");


        var instance
        var numApart = 0, sumArea = 0
        var designer = []
        var sites = []
        alldata.forEach(element => {
            if (element.phase === phaseName) {
                instance = element
                if (element.numAppartment != "NA")
                    numApart += element.numAppartment
                if (element.totalArea != "NA")
                    sumArea += element.totalArea
                if (!designer.includes(element.developer)) {
                    designer.push(element.developer)
                }
                if (!sites.includes(element.building)) {
                    sites.push(element.building)
                }
            }
        });

        title.innerHTML = "Phase : " + phaseName;
        // TODO: more detailed info depends on real data
        var stage;
        var gramma;
        switch (instance.stage) {
            case "In operation":
                stage = "already in operation"
                gramma = ""
                break
            case "Construction":
                stage = "still under construction"
                gramma = "will "
                break
            case "Design":
                stage = "still in design stage"
                gramma = "will "
                break;
        }


        info.innerHTML = ""
        info.innerHTML += "<p>" +
            "<b>" + phaseName + "</b> is constructed from year <b>" + instance.yearStart +
            "</b> and " + gramma + "start occupancy in <b>" + instance.yearOccupy + "</b>, and it is now " +
            stage + ".</p>"

        // info.innerHTML += "<p>" +
        //     "<b>" + phaseName + "</b> has <b>" + designer.length + "</b> developers and "
        //     + "<b>" + sites.length + "</b> of construction sites"

        switch (instance.stage) {
            case "In operation":
                info.innerHTML += "<p>" +
                    "<b>" + phaseName + "</b> has <b>" + designer.length + "</b> developers and "
                    + "<b>" + sites.length + "</b> of construction sites, it provides <b>" + sumArea + "</b> m<sup>2</sup> of living space and "
                    + "<b>" + numApart + "</b> apartments for accommodation. </p>"
                break
            default:
                if (sumArea == 0) {
                    info.innerHTML += "<p>" +
                        "<b>" + phaseName + "</b> has <b>" + designer.length + "</b> developers and "
                        + "<b>" + sites.length + "</b> of construction sites. </p>"
                        + "<p>The area is still under planning in terms of accommodation indices, so the data you see here are mostly <b>estimated</b> values, "
                        + " please wait and see for more information!</p>"
                } else {
                    info.innerHTML += "<p>" +
                        "<b>" + phaseName + "</b> has <b>" + designer.length + "</b> developers and "
                        + "<b>" + sites.length + "</b> of construction sites, it will provide <b>" + sumArea + "</b> m<sup>2</sup> of living space and "
                        + "<b>" + numApart + "</b> apartments when finished. Please wait and see!</p>"
                }

        }


        const myChart = Sunburst();
        var width = window.innerWidth * 0.6 * 0.6;
        var height = window.innerHeight * 0.6 * 0.6;
        myChart.data(dataset)
            .width(width)
            .height(height)
            .color(d => d.color)
            .tooltipContent(d => {
                if (d.value) {
                    if (d.unit) {
                        return d.value + " " + d.unit
                    }
                    else {
                        return d.value
                    }
                } else {
                    if (d.unit) {
                        return "Category: " + d.name + " ( " + d.unit + ")"
                    }
                    else {
                        return "Category: " + d.name;
                    }
                }
            })(document.getElementById("modal-phase-chart"))
    }
}

selectData = function (phaseName) {
    var array = []
    alldata.forEach(element => {
        if (element.phase === phaseName) {
            array.push(element);
        }
    });
    var data = new Object;
    data.name = phaseName;
    data.children = [];

    var energyUse = new Object;
    var co2 = new Object;
    var greenStructure = new Object;
    var transport = new Object;
    var waste = new Object;
    // var material = new Object;
    // var indoorEnv = new Object;
    var COLOR = {
        green1: "rgba(0, 255, 0, 1)",
        green2: "rgba(0, 255, 0, 0.7)",
        green3: "rgba(0, 255, 0, 0.4)",

        red1: "rgba(255,0,0,1)",
        red2: "rgba(255,0,0,0.7)",
        red3: "rgba(255,0,0,0.4)",

        blue1: "rgba(0,0,255,1)",
        blue2: "rgba(0,0,255,0.7)",
        blue3: "rgba(0,0,255,0.4)",

        yellow1: "rgba(255, 255, 0, 1)",
        yellow2: "rgba(255, 255, 0, 0.7)",
        yellow3: "rgba(255, 255, 0, 0.4)",

        azure1: "rgba(0,255,255,1)",
        azure2: "rgba(0,255,255,0.7)",
        azure3: "rgba(0,255,255,0.4)",

        magenta1: "rgba(255,0,255,1)",
        magenta2: "rgba(255,0,255,0.7)",
        magenta3: "rgba(255,0,255,0.4)",

        gray: "rgba(128,128,128,1)"
    }

    var operation = new Object;
    var construction = new Object;
    var design = new Object;

    // operation energy and leaf nodes
    var operationEnergy = 0;
    operation.name = "Energy use in Operation"
    operation.children = []
    array.forEach(element => {
        if (element.measuredTotalEnergy != "NA") {
            operationEnergy += element.measuredTotalEnergy;

            var temp = new Object;
            temp.name = element.building;
            temp.value = element.measuredTotalEnergy;
            temp.color = COLOR.red3
            temp.unit = "kWh/m<sup>2</sup>"
            operation.children.push(temp);
        }
    });
    operation.value = operationEnergy;
    operation.unit = "kWh/m<sup>2</sup>"
    operation.color = COLOR.red2

    // estimated energy and leaf nodes
    var constructionEnergy = 0;
    construction.name = "Energy use in construction"
    construction.children = []
    array.forEach(element => {
        if (element.estimatedTotalEnergy != "NA") {
            constructionEnergy += element.estimatedTotalEnergy;

            var temp = new Object;
            temp.name = element.building;
            temp.value = element.estimatedTotalEnergy;
            temp.color = COLOR.red3
            temp.unit = "kWh/m<sup>2</sup>"
            construction.children.push(temp);
        }
    });
    construction.value = constructionEnergy;
    construction.unit = "kWh/m<sup>2</sup>"
    construction.color = COLOR.red2

    // designed energy and leaf noodes
    var designEnergy = 0;
    design.name = "Energy use in design"
    design.children = []
    array.forEach(element => {
        if (element.designTotalEnergy != "NA") {
            designEnergy += element.designTotalEnergy;

            var temp = new Object;
            temp.name = element.building;
            temp.value = element.designTotalEnergy;
            temp.color = COLOR.red3
            temp.unit = "kWh/m<sup>2</sup>"
            design.children.push(temp);
        }
    });
    design.value = designEnergy;
    design.unit = "kWh/m<sup>2</sup>"
    design.color = COLOR.red2

    energyUse.name = "Energy Use"
    energyUse.color = COLOR.red1
    energyUse.unit = "kWh/m<sup>2</sup>"
    energyUse.children = []
    energyUse.children.push(operation)
    energyUse.children.push(construction)
    energyUse.children.push(design);

    // CO2 emission
    co2.name = "CO2 emission"
    co2.children = []
    var co2emission = 0
    array.forEach(element => {
        if (element.co2 != "NA") {
            co2emission += element.co2;
            var temp = new Object;
            temp.name = element.building;
            temp.value = element.co2;
            temp.color = COLOR.magenta2
            temp.unit = "tonnes"
            co2.children.push(temp);
        }
    });
    co2.value = co2emission;
    co2.unit = "tonnes"
    co2.color = COLOR.magenta1

    // green structure
    var courtyard = new Object
    courtyard.name = "Green Courtyard"
    courtyard.scale = 10
    courtyard.children = []
    var roof = new Object
    roof.name = "Green Roof"
    roof.scale = 10
    roof.children = []

    var courtyardArea = 0;
    var courtyardNum = 0;
    var roofArea = 0;
    var roofNum = 0;
    array.forEach(element => {
        if (element.greenCourtyard != "NA") {
            courtyardArea += element.greenCourtyard / 10;
            courtyardNum += 1;

            var temp = new Object;
            temp.name = element.building;
            temp.value = element.greenCourtyard / 10;
            temp.color = COLOR.green3
            temp.unit = "* 10 M<sup>2</sup>"
            courtyard.children.push(temp)
        }
        if (element.greenRoof != "NA") {
            roofArea += element.greenRoof / 10;
            roofNum += 1;

            var temp = new Object;
            temp.name = element.building;
            temp.value = element.greenRoof / 10;
            temp.color = COLOR.green3
            temp.unit = "* 10 M<sup>2</sup>"
            roof.children.push(temp)
        }
    });
    courtyard.value = courtyardArea;
    courtyard.color = COLOR.green2
    courtyard.unit = "* 10 M<sup>2</sup>"
    roof.value = roofArea;
    roof.color = COLOR.green2
    roof.unit = "* 10 M<sup>2</sup>"

    greenStructure.name = "Green Structure"
    greenStructure.color = COLOR.green1
    greenStructure.unit = "* 10 M<sup>2</sup>"
    greenStructure.children = []
    greenStructure.children.push(courtyard)
    greenStructure.children.push(roof)

    // transport
    var bicycle = new Object;
    bicycle.name = "Bicycle parking slots"
    bicycle.children = []
    bicycle.scale = 2
    var car = new Object;
    car.name = "Car parking place"
    car.children = []
    var charge = new Object;
    charge.name = "Electrical charing points"
    charge.children = []

    var numBicycle = 0, numCar = 0, numCharge = 0;
    array.forEach(element => {
        if (element.totalNumParking != "NA") {
            numBicycle += element.totalNumParking / 2;

            var temp = new Object;
            temp.name = element.building;
            temp.value = element.totalNumParking / 2;
            temp.color = COLOR.blue3
            temp.unit = "* 2 slots"
            bicycle.children.push(temp)
        }
        if (element.numCarParkingSpace != "NA") {
            numCar += element.numCarParkingSpace / 2;

            var temp = new Object
            temp.name = element.building;
            temp.value = element.numCarParkingSpace / 2;
            temp.unit = "* 2 slots"
            temp.color = COLOR.blue3
            car.children.push(temp);
        }

        if (element.numElectricalCharging != "NA") {
            numCharge += element.numElectricalCharging / 2;

            var temp = new Object
            temp.name = element.building;
            temp.value = element.numElectricalCharging / 2;
            temp.color = COLOR.blue3
            temp.unit = "* 2 slots"
            charge.children.push(temp);
        }
    });
    bicycle.value = numBicycle;
    bicycle.color = COLOR.blue2
    bicycle.unit = "* 2 slots"
    car.value = numCar;
    car.color = COLOR.blue2
    car.unit = "* 2 slots"
    charge.value = numCharge;
    charge.color = COLOR.blue2
    charge.unit = "* 2 slots"

    transport.name = "Transportations"
    transport.color = COLOR.blue1
    transport.unit = "* 2 slots"
    transport.children = []
    transport.children.push(bicycle)
    transport.children.push(car)
    transport.children.push(charge)

    // wastes
    var constructWaste = new Object,
        energyRecovery = new Object,
        materialRecycling = new Object,
        reusedWaste = new Object,
        mixedWaste = new Object,
        landsfill = new Object,
        notSpecified = new Object,
        distVWC = new Object,
        distRecycle = new Object

    constructWaste.name = "Construction wastes"
    constructWaste.children = []

    energyRecovery.name = "Energy recovery"
    energyRecovery.children = []

    materialRecycling.name = "Material recycling"
    materialRecycling.children = []

    reusedWaste.name = "Reused wastes"
    reusedWaste.children = []

    mixedWaste.name = "Mixed Wastes"
    mixedWaste.children = []

    landsfill.name = "Landsfill"
    landsfill.children = []

    notSpecified.name = "Not specified wastes"
    notSpecified.children = []

    distVWC.name = "Distance to VWC"
    distVWC.children = []

    distRecycle.name = "Distance to recycle room"
    distRecycle.children = []

    var aa = bb = cc = dd = ee = ff = gg = 0
    var d1 = n1 = d2 = n2 = 0
    array.forEach(e => {
        if (e.constructionWaste != "NA") {
            aa += e.constructWaste;

            var temp = new Object
            temp.name = e.building;
            temp.value = e.constructWaste
            temp.color = COLOR.yellow3
            temp.unit = "kg/M<sup>2</sup>"
            constructWaste.children.push(temp)
        }
        if (e.energyRecovery != "NA") {
            bb += e.energyRecovery;

            var temp = new Object
            temp.name = e.building;
            temp.value = e.energyRecovery;
            temp.color = COLOR.yellow3
            temp.unit = "kg/M<sup>2</sup>"
            energyRecovery.children.push(temp)
        }
        if (e.materialRecycling != "NA") {
            cc += e.materialRecycling;

            var temp = new Object
            temp.name = e.building;
            temp.value = e.materialRecycling
            temp.color = COLOR.yellow3
            temp.unit = "kg/M<sup>2</sup>"
            materialRecycling.children.push(temp)
        }
        if (e.reusedWaste != "NA") {
            dd += e.reusedWaste

            var temp = new Object
            temp.name = e.building;
            temp.value = e.reusedWaste
            temp.color = COLOR.yellow3
            temp.unit = "kg/M<sup>2</sup>"
            reusedWaste.children.push(temp)
        }
        if (e.mixedWaste != "NA") {
            ee += e.mixedWaste

            var temp = new Object
            temp.name = e.building;
            temp.value = e.mixedWaste
            temp.color = COLOR.yellow3
            temp.waste = "kg/M<sup>2</sup>"
            mixedWaste.children.push(temp)
        }
        if (e.landsfill != "NA") {
            ff += e.landsfill

            var temp = new Object
            temp.name = e.building;
            temp.value = e.landsfill
            temp.color = COLOR.yellow3
            temp.unit = "kg/M<sup>2</sup>"
            landsfill.children.push(temp)
        }
        if (e.notSpecifiedWaste != "NA") {
            gg += e.notSpecifiedWaste

            var temp = new Object
            temp.name = e.building;
            temp.value = e.notSpecifiedWaste
            temp.color = COLOR.yellow3
            temp.unit = "kg/M<sup>2</sup>"
            notSpecified.children.push(temp)
        }
        if (e.distanceToVWC != "NA") {
            d1 += e.distanceToVWC;
            n1 += 1;

            var temp = new Object
            temp.name = e.building;
            temp.value = e.distanceToVWC;
            temp.color = COLOR.yellow3
            temp.unit = "M"
            distVWC.children.push(temp)
        }
        if (e.distanceToRecyclingRoom != "NA") {
            d2 += e.distanceToRecyclingRoom;
            n2 += 1;

            var temp = new Object
            temp.name = e.building;
            temp.value = e.distanceToRecyclingRoom;
            temp.color = COLOR.yellow3
            temp.unit = "M"
            distRecycle.children.push(temp)
        }
    });

    constructWaste.value = aa;
    energyRecovery.value = bb
    materialRecycling.value = cc
    reusedWaste.value = dd
    mixedWaste.value = ee
    landsfill.value = ff
    notSpecified.value = gg
    distVWC.value = d1 / n1;
    distRecycle.value = d2 / n2;

    constructWaste.color = COLOR.yellow2;
    constructWaste.unit = "kg/M<sup>2</sup>"
    energyRecovery.color = COLOR.yellow2
    energyRecovery.unit = "kg/M<sup>2</sup>"
    materialRecycling.color = COLOR.yellow2
    materialRecycling.unit = "kg/M<sup>2</sup>"
    reusedWaste.color = COLOR.yellow2
    reusedWaste.unit = "kg/M<sup>2</sup>"
    mixedWaste.color = COLOR.yellow2
    mixedWaste.unit = "kg/M<sup>2</sup>"
    landsfill.color = COLOR.yellow2
    landsfill.unit = "kg/M<sup>2</sup>"
    notSpecified.color = COLOR.yellow2
    notSpecified.unit = "kg/M<sup>2</sup>"
    distVWC.color = COLOR.yellow2
    distVWC.unit = "M"
    distRecycle.color = COLOR.yellow2
    distRecycle.unit = "M"

    waste.name = "Wastes"
    waste.children = []
    waste.color = COLOR.yellow1
    waste.children.push(constructWaste)
    waste.children.push(energyRecovery)
    waste.children.push(materialRecycling)
    waste.children.push(reusedWaste)
    waste.children.push(mixedWaste)
    waste.children.push(landsfill)
    waste.children.push(notSpecified)
    waste.children.push(distVWC)
    waste.children.push(distRecycle)

    data.color = COLOR.gray
    data.children.push(energyUse)
    data.children.push(co2)
    data.children.push(greenStructure)
    data.children.push(transport)
    data.children.push(waste)
    // data.children.push(material)
    // data.children.push(indoorEnv)

    return data
}

// dataset = {
//     name: "root",
//     children: [
//         {
//             name: "leafA",
//             value: 3,
//             color: "rgba(255,0,0,1)"
//         },
//         {
//             name: "nodeB",
//             value: 30,
//             children: [
//                 {
//                     name: "leafBA",
//                     value: 5,
//                     color: "rgba(255,0,0,0.5)"
//                 },
//                 {
//                     name: "leafBB",
//                     value: 1,
//                     color: "rgba(255,0,0,0.5)"
//                 }
//             ],
//             color: "rgba(255,0,0,1)"
//         }
//     ]
// }