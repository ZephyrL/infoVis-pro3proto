using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanProject.Model
{
    public class Energy : Category<EnergyStage>
    { }

    public class EnergyStage
    {
        public double Total { get; set; }
        public double DistrictHeating { get; set; }
        public double ElectricityHeating { get; set; }
        public double DistrictHotWater { get; set; }
        public double ElectricityHotWater { get; set; }
        public double PropertyElectricity { get; set; }
        public double LocalElectricity { get; set; }
        public double LocalHeating { get; set; }
        public double RegionalEnergy { get; set; }

    }
}