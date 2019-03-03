using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanProject.Model
{
    public class Requirement
    {
        public int Bbr { get; set; }
        public double Energy { get; set; }
        public double Gsi { get; set; }
        public double BicycleParking { get; set; }
        public double CarParking { get; set; }
        public int ElectiralChargingPoint { get; set; }
        public int ConstructionWaste { get; set; }
        public int DistanceToVWC { get; set; }
        public double DistanceToRecycling { get; set; }
        public string IndoorEnvironment { get; set; }

    }
}
