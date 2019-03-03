using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanProject.Model
{
    public class Construction
    {
        public double ConstructionWaste { get; set; }
        public double EnergyRecovery { get; set; }
        public double MaterialRecycling { get; set; }
        public double Reuse { get; set; }
        public double Mixed { get; set; }
        public double LandsFill { get; set; }
        public double NotSpecified { get; set; }

    }
}
