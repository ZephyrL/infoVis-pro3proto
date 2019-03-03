using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanProject.Model
{
    public class Transport : Category<TransportStage>
    {
        public double TotalBicycleParking { get; set; }
        public double BicycleParkingIndoor { get; set; }
        public double BicycleParkingOutdoor { get; set; }
        public double CarParkingSpace { get; set; }
        public double TotalcarParkingSpace { get; set; }
        public double ElectiralChargingPoint { get; set; }
        public double TotalElectiralChargingPoint { get; set; }
    }

    public class TransportStage
    {
        public double BicycleParking { get; set; }
    }
}