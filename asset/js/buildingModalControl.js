{
    showBuildingModal = function (buildingName) {
        document.getElementById("modal-small-button").click();

        var title = document.getElementById("modal-building-title");
        var info = document.getElementById("modal-building-info");

        var instance
        alldata.forEach(e => {
            if (e.building == buildingName) instance = e;
        });

        // info window title
        title.innerHTML = instance.building

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

        // info window content
        info.innerHTML = "<p><b>" + instance.building +
            "</b> in phase <b>" + instance.phase + "</b> is " + stage + "</p>"
        if (instance.numAppartment != 0 && instance.numAppartment != "NA")
            info.innerHTML +=
                "<p> Number of apartments: <b>" + instance.numAppartment + "</b> </p>"
        if (instance.totalArea != 0 && instance.totalArea != "NA")
            info.innerHTML +=
                "<p> Area of accommodation: <b>" + instance.totalArea + "</b> </p>"
        info.innerHTML +=
            "<p> Construction period: <b>" + instance.yearStart + " - " + instance.yearOccupy + "</b></p>"
        
        info.innerHTML += 
        "<p> Chart on the left suggests recorded data about construction, sorry for the missing values.    Noted that: </p>" +
        "<p> Energy use should be <b>lower</b> than requirement; </p>" +
        "<p> Waste should also be <b>lower</b> than requirement; </p>" +
        "<p> Green structure is the <b>higher</b> the <b>better</b>; </p>" +
        "<p> Transportation also <b>higher</b> means <b>better</b>. <p>"

        // create horizontial bar chart
        var dataset = selectDataset(buildingName)

        if (window.myHorizontalBar) window.myHorizontalBar.destroy();

        var ctx = document.getElementById('modal-canvas').getContext('2d');
        window.myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            // data: horizontalBarChartData,
            data: dataset,
            options: {
                maintainAspectRatio: false,
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                    rectangle: {
                        borderWidth: 1,
                    }
                },
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false
                }
            }
        });


    }

    var color = Chart.helpers.color;
    var horizontalBarChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }, {
            label: 'Dataset 2',
            backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            borderColor: window.chartColors.blue,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }]

    };

    function selectDataset(buildingName) {
        var instance
        alldata.forEach(e => {
            if (e.building == buildingName) instance = e;
        });

        var data = new Object;
        data.labels = [
            "Energy use", "Green stct", "Transports", "Waste", "Indoor Env"
        ]

        data.datasets = []

        var required = new Object
        {
            required.label = "Required level"
            required.backgroundColor = color(window.chartColors.purple).alpha(0.5).rgbString()
            required.borderColor = window.chartColors.purple
            required.borderWidth = 1
            required.data = []
            if (instance.energyRequirementLevel != "NA") {
                required.data.push(instance.energyRequirementLevel)
            }
            else {
                required.data.push(0)
            }
            if (instance.greenRequirementLevel != "NA") {
                required.data.push(instance.greenRequirementLevel * 100)
            }
            else {
                required.data.push(0)
            }
            if (instance.bikeParkingRequirementLevel != "NA") {
                required.data.push(instance.bikeParkingRequirementLevel * 30)
            }
            else {
                required.data.push(0)
            }
            if (instance.wasteRequirementLevel != "NA") {
                required.data.push(instance.wasteRequirementLevel * 3)
            }
            else {
                required.data.push(0)
            }
            {
                var level;
                switch (instance.indoorEnvironmentRequirement) {
                    case "NA":
                        level = 0
                        break;
                    case "Silver":
                        level = 30
                        break;
                    case "Gold":
                        level = 60
                        break
                }
                required.data.push(level)
            }
        }
        data.datasets.push(required)

        var measured = new Object
        {
            measured.label = "Operation"
            measured.backgroundColor = color(window.chartColors.orange).alpha(0.5).rgbString()
            measured.borderColor = window.chartColors.orange
            measured.borderWidth = 1
            measured.data = []
            if (instance.measuredTotalEnergy != "NA") {
                measured.data.push(instance.measuredTotalEnergy)
            }
            else {
                measured.data.push(0)
            }
            if (instance.measuredGreen != "NA") {
                measured.data.push(instance.measuredGreen * 100)
            }
            else {
                measured.data.push(0)
            }
            if (instance.measuredParking != "NA") {
                measured.data.push(instance.measuredParking * 30)
            }
            else {
                measured.data.push(0)
            }
            {
                if (instance.energyRecovery != "NA") {
                    var waste = instance.constructionWaste -
                        instance.energyRecovery - instance.materialRecycling
                        - instance.reusedWaste + instance.mixedWaste
                        + instance.landsfill + instance.notSpecifiedWaste;
                    measured.data.push(waste * 3);
                } else {
                    measured.data.push(0);
                }
            }
            {
                var level;
                switch (instance.indoorEnvironment) {
                    case "NA":
                        level = 0
                        break;
                    case "Silver":
                        level = 30
                        break;
                    case "Gold":
                        level = 60
                        break
                }
                measured.data.push(level)
            }
        }
        data.datasets.push(measured)

        var estimated = new Object
        {
            estimated.label = "Construction"
            estimated.backgroundColor = color(window.chartColors.blue).alpha(0.5).rgbString()
            estimated.borderColor = window.chartColors.blue
            estimated.borderWidth = 1
            estimated.data = []
            if (instance.estimatedTotalEnergy != "NA") {
                estimated.data.push(instance.estimatedTotalEnergy)
            }
            else {
                estimated.data.push(0)
            }
            if (instance.estimatedGreen != "NA") {
                estimated.data.push(instance.estimatedGreen * 100)
            }
            else {
                estimated.data.push(0)
            }
            if (instance.estimatedParking != "NA") {
                estimated.data.push(instance.estimatedParking * 30)
            }
            else {
                estimated.data.push(0)
            }

            estimated.data.push(0);
            estimated.data.push(0);
        }
        data.datasets.push(estimated)

        var design = new Object
        {
            design.label = "Design"
            design.backgroundColor = color(window.chartColors.green).alpha(0.5).rgbString()
            design.borderColor = window.chartColors.green
            design.borderWidth = 1
            design.data = []
            if (instance.designTotalEnergy != "NA") {
                design.data.push(instance.designTotalEnergy)
            }
            else {
                design.data.push(0)
            }
            if (instance.designGreen != "NA") {
                design.data.push(instance.designGreen * 100)
            }
            else {
                design.data.push(0)
            }
            if (instance.designParking != "NA") {
                design.data.push(instance.designParking * 30)
            }
            else {
                design.data.push(0)
            }
            design.data.push(0)
            design.data.push(0)
        }
        data.datasets.push(design)

        return data
    }
}