{
    clearFilter = function () {
        markers.forEach(e => {
            setColor(e, "yellow")
            setShow(e)
        });
    }
    // stage filters
    $("#stage-operation").click(function (event) {
        clearFilter();
        // setColor(markers[0], "red")
        var stages = new Object
        alldata.forEach(e => {
            stages[e.building] = e.stage;
        });
        $("#redcolor").html("In operation")
        $("#greencolor").html("In operation")

        var count = 0
        markers.forEach(e => {
            if (stages[e.building] == "In operation") {
                count += 1
            }
        });
        var cc = 1
        for (let ii = 0; ii < markers.length; ii++) {
            var e = markers[ii]
            if (stages[e.building] == "In operation") {
                setColor(e, "orange")
                setPosition(e, cc / (count + 1))
                cc += 1
            }
            else {
                setHide(e)
            }
        }
    })
    $("#stage-construction").click(function (event) {
        clearFilter();
        // setColor(markers[0], "red")
        var stages = new Object
        alldata.forEach(e => {
            stages[e.building] = e.stage;
        });
        $("#redcolor").html("Construction")
        $("#greencolor").html("Construction")
        var count = 0
        markers.forEach(e => {
            if (stages[e.building] == "Construction") {
                count += 1
            }
        });
        var cc = 1
        for (let ii = 0; ii < markers.length; ii++) {
            var e = markers[ii]
            if (stages[e.building] == "Construction") {
                setColor(e, "azure")
                setPosition(e, cc / (count + 1))
                cc += 1
            }
            else {
                setHide(e)
            }
        }
    })
    $("#stage-design").click(function (event) {
        clearFilter();
        // setColor(markers[0], "red")
        var stages = new Object
        alldata.forEach(e => {
            stages[e.building] = e.stage;
        });
        $("#redcolor").html("Designing")
        $("#greencolor").html("Designing")
        var count = 0
        markers.forEach(e => {
            if (stages[e.building] == "Design") {
                count += 1
            }
        });
        var cc = 1
        for (let ii = 0; ii < markers.length; ii++) {
            var e = markers[ii]
            if (stages[e.building] == "Design") {
                setColor(e, "green")
                setPosition(e, cc / (count + 1))
                cc += 1
            }
            else {
                setHide(e)
            }
        }
    })

    // energy filters
    $("#energy-total").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] =
                (e.measuredTotalEnergy != "NA") ? e.measuredTotalEnergy :
                    (e.estimatedTotalEnergy != "NA") ? e.estimatedTotalEnergy :
                        (e.designTotalEnergy != "NA") ? e.designTotalEnergy : -100
        });
        $("#redcolor").html("High Energy")
        $("#greencolor").html("Low Energy")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = -100
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value > high) high = value;
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent >= 0 && percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });

    })
    $("#energy-heating").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] =
                (e.measuredHeatingDistrict != "NA" &&
                    e.measuredHeatingElectricity != "NA") ? e.measuredHeatingDistrict + e.measuredHeatingElectricity :
                    (e.estimatedHeatingDistrict != "NA" &&
                        e.estimatedHeatingElectricity != "NA") ? e.estimatedHeatingDistrict + e.estimatedHeatingElectricity :
                        (e.designHeatingDistrict != "NA" &&
                            e.designHeatingElectricity != "NA") ? e.designHeatingDistrict + e.designHeatingElectricity : -100
        });
        $("#redcolor").html("High Energy")
        $("#greencolor").html("Low Energy")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = -100
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value > high) high = value;
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent >= 0 && percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });

    })
    $("#energy-hotwater").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] =
                (e.measuredHotwaterDistrict != "NA" &&
                    e.measuredHotwaterElectricity != "NA") ? e.measuredHotwaterDistrict + e.measuredHotwaterElectricity :
                    (e.estimatedHotwaterDistrict != "NA" &&
                        e.estimatedHotwaterElectricity != "NA") ? e.estimatedHotwaterDistrict + e.estimatedHotwaterElectricity :
                        (e.designHotwaterDistrict != "NA" &&
                            e.designHotwaterElectricity != "NA") ? e.designHotwaterDistrict + e.designHotwaterElectricity : -100
        });
        $("#redcolor").html("High Energy")
        $("#greencolor").html("Low Energy")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = -100
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value > high) high = value;
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent >= 0 && percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });

    })
    $("#energy-appliance").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] =
                (e.measuredPropertyElectricity != "NA") ? e.measuredPropertyElectricity :
                    (e.estimatedPropertyElectricity != "NA") ? e.estimatedPropertyElectricity :
                        (e.designPropertyElectricity != "NA") ? e.designPropertyElectricity : -100
        });
        $("#redcolor").html("High Energy")
        $("#greencolor").html("Low Energy")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = -100
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value > high) high = value;
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent >= 0 && percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });

    })

    // green filters
    $("#green-courtyard").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] =
                (e.greenCourtyard != "NA") ? e.greenCourtyard : -100;

        });
        $("#redcolor").html("Smaller Area")
        $("#greencolor").html("Larger Area")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = energyCost[markers[markers.length - 2].building]
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = 1 - (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent < 0) setPosition(e, 1.05)
            if (percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });

    })
    $("#green-roof").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] =
                (e.greenRoof != "NA") ? e.greenRoof : -100;

        });
        $("#redcolor").html("Smaller Area")
        $("#greencolor").html("Larger Area")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = -100
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value > high) high = value;
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = 1 - (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent < 0) setPosition(e, 1.05)
            if (percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });

    })

    // transportation filters
    $("#transport-fulfill").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] = 0
            energyCost[e.building] += (e.totalNumParking != "NA") ? e.totalNumParking : -1;
            energyCost[e.building] += (e.numCarParkingSpace != "NA") ? e.numCarParkingSpace : -1;
            energyCost[e.building] += (e.numElectricalCharging != "NA") ? e.numElectricalCharging : 0;
        });
        $("#redcolor").html("Less slots")
        $("#greencolor").html("More slots")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = energyCost[markers[markers.length - 2].building]
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = 1 - (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent < 0) setPosition(e, 1.05)
            if (percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });
    })
    $("#transport-bicycle").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] = (e.totalNumParking != "NA") ? e.totalNumParking : -1;
        });
        $("#redcolor").html("Less slots")
        $("#greencolor").html("More slots")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = energyCost[markers[markers.length - 2].building]
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = 1 - (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent < 0) setPosition(e, 1.05)
            if (percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });
    })
    $("#transport-car").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] = (e.numCarParkingSpace != "NA") ? e.numCarParkingSpace : -1;
        });
        $("#redcolor").html("Less slots")
        $("#greencolor").html("More slots")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = energyCost[markers[markers.length - 2].building]
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = 1 - (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent < 0) setPosition(e, 1.05)
            if (percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });
    })
    $("#transport-charge").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] = (e.numElectricalCharging != "NA") ? e.numElectricalCharging : -1;
        });
        $("#redcolor").html("Less slots")
        $("#greencolor").html("More slots")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = energyCost[markers[markers.length - 2].building]
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = 1 - (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent < 0) setPosition(e, 1.05)
            if (percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });
    })

    // waste filters
    $("#waste-total").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] = 0
            energyCost[e.building] += (e.constructionWaste != "NA") ? e.constructionWaste : -10000;
            energyCost[e.building] -= (e.energyRecovery != "NA") ? e.energyRecovery : 10000;
            energyCost[e.building] -= (e.materialRecycling != "NA") ? e.materialRecycling : 10000;
            energyCost[e.building] -= (e.reusedWaste != "NA") ? e.reusedWaste : 10000;
            energyCost[e.building] += (e.mixedWaste != "NA") ? e.mixedWaste : -10000;
            energyCost[e.building] += (e.landsfill != "NA") ? e.landsfill : -10000;
            energyCost[e.building] += (e.notSpecifiedWaste != "NA") ? e.notSpecifiedWaste : -10000;
        });
        $("#redcolor").html("More wastes")
        $("#greencolor").html("Less wastes")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = energyCost[markers[markers.length - 2].building]
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent > 1) setPosition(e, -0.05)
            if (percent >= 0 && percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });
    })
    $("#waste-construction").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] = (e.constructionWaste != "NA") ? e.constructionWaste : -100;
        });
        $("#redcolor").html("More wastes")
        $("#greencolor").html("Less wastes")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = energyCost[markers[markers.length - 2].building]
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent > 1) setPosition(e, -0.05)
            if (percent >= 0 && percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });
    })
    $("#waste-distVWC").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] =
                (e.distanceToVWC != "NA") ? e.distanceToVWC : -100;

        });
        $("#redcolor").html("Further")
        $("#greencolor").html("Nearer")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = -100
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value > high) high = value;
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = 1 - (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent >= 0 && percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });

    })
    $("#waste-recycle").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] =
                (e.distanceToRecyclingRoom != "NA") ? e.distanceToRecyclingRoom : -100;

        });
        $("#redcolor").html("Further")
        $("#greencolor").html("Nearer")
        markers.sort(compare)
        function compare(a, b) {
            return energyCost[a.building] - energyCost[b.building]
        }

        var low = 10000, high = -100
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value > high) high = value;
                if (value < low) low = value;
            }
        });
        markers.forEach(e => {
            var cost = energyCost[e.building]
            var percent = 1 - (cost - low) / (high - low)
            if (percent >= 0 && percent <= 1)
                setPosition(e, 1 - percent)
            if (percent >= 0 && percent < 0.2) {
                setColor(e, "green")
            } else if (percent >= 0.2 && percent < 0.4) {
                setColor(e, "grass")
            } else if (percent >= 0.4 && percent < 0.6) {
                setColor(e, "yellow")
            } else if (percent >= 0.6 && percent < 0.8) {
                setColor(e, "orange")
            } else if (percent >= 0.8 && percent <= 1.0) {
                setColor(e, "red")
            } else {
                setHide(e)
            }
        });

    })

    // best filters
    $("#best-energy").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] =
                (e.measuredTotalEnergy != "NA") ? e.measuredTotalEnergy : -100;
        });
        $("#redcolor").html("Best")
        $("#greencolor").html("Best")

        var low = 10000
        var name
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value < low) {
                    low = value;
                    name = e.building
                }
            }
        });

        markers.forEach(e => {
            if (e.building == name) {
                setPosition(e, 0.5)
                setColor(e, "blue")
            }
            else {
                setHide(e)
            }
        });

    })
    $("#best-green").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] = 0;
            energyCost[e.building] +=
                (e.greenCourtyard != "NA") ? e.greenCourtyard : -1000;
            energyCost[e.building] +=
                (e.greenRoof != "NA") ? e.greenRoof : -1000;
        });
        $("#redcolor").html("Best")
        $("#greencolor").html("Best")

        var high = -100;
        var name
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value > high) {
                    high = value;
                    name = e.building
                }
            }
        });

        markers.forEach(e => {
            if (e.building == name) {
                setPosition(e, 0.5)
                setColor(e, "blue")
            }
            else {
                setHide(e)
            }
        });

    })
    $("#best-transport").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] = 0
            energyCost[e.building] += (e.totalNumParking != "NA") ? e.totalNumParking : -1;
            energyCost[e.building] += (e.numCarParkingSpace != "NA") ? e.numCarParkingSpace : -1;
            energyCost[e.building] += (e.numElectricalCharging != "NA") ? e.numElectricalCharging : 0;
            if (energyCost[e.building] > 0) {
                if (e.numAppartment > 0) energyCost[e.building] /= e.numAppartment;
                else (energyCost[e.building] = -1)
            }
        });
        $("#redcolor").html("Best")
        $("#greencolor").html("Best")

        var high = -100;
        var name
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value > high) {
                    high = value;
                    name = e.building
                }
            }
        });

        markers.forEach(e => {
            if (e.building == name) {
                setPosition(e, 0.5)
                setColor(e, "blue")
            }
            else {
                setHide(e)
            }
        });

    })
    $("#best-waste").click(function (event) {
        clearFilter();
        var energyCost = new Object
        alldata.forEach(e => {
            energyCost[e.building] = 0
            energyCost[e.building] += (e.constructionWaste != "NA") ? e.constructionWaste : -10000;
            energyCost[e.building] -= (e.energyRecovery != "NA") ? e.energyRecovery : 10000;
            energyCost[e.building] -= (e.materialRecycling != "NA") ? e.materialRecycling : 10000;
            energyCost[e.building] -= (e.reusedWaste != "NA") ? e.reusedWaste : 10000;
            energyCost[e.building] += (e.mixedWaste != "NA") ? e.mixedWaste : -10000;
            energyCost[e.building] += (e.landsfill != "NA") ? e.landsfill : -10000;
            energyCost[e.building] += (e.notSpecifiedWaste != "NA") ? e.notSpecifiedWaste : -10000;
        });
        $("#redcolor").html("Best")
        $("#greencolor").html("Best")

        var low = 10000
        var name
        markers.forEach(e => {
            var value = energyCost[e.building]
            if (value >= 0) {
                if (value < low) {
                    low = value;
                    name = e.building
                }
            }
        });

        markers.forEach(e => {
            if (e.building == name) {
                setPosition(e, 0.5)
                setColor(e, "blue")
            }
            else {
                setHide(e)
            }
        });

    })

    // clear filter
    $("#clear-filter").click(function (event) {
        clearFilter();
    })
}