{
    showPhaseModal = function (phaseName) {
        // trigger showing modal
        document.getElementById("modal-large-button").click();

        var title = document.getElementById("modal-phase-title");
        var info = document.getElementById("modal-phase-info");

        title.innerHTML = phaseName;
        // TODO: more detailed info depends on real data
        info.innerHTML = "Information of <b>" + phaseName + "</b>";

        const myChart = Sunburst();
        var width = window.innerWidth * 0.6 * 0.6;
        var height = window.innerHeight * 0.6 * 0.6;
        myChart.data(dataset)
            .width(width)
            .height(height)
            .color(d => d.color)(document.getElementById("modal-phase-chart"))
    }
}

dataset = {
    name: "root",
    children: [
        {
            name: "leafA",
            value: 3,
            color: "rgba(255,0,0,1)"
        },
        {
            name: "nodeB",
            children: [
                {
                    name: "leafBA",
                    value: 5,
                    color: "rgba(255,0,0,0.5)"
                },
                {
                    name: "leafBB",
                    value: 1,
                    color: "rgba(255,0,0,0.5)"
                }
            ],
            color: "rgba(255,0,0,1)"
        }
    ]
}