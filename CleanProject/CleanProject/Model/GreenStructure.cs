using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanProject.Model
{
    public class GreenStructure : Category<GreenStructureStage>
    {
        public double Co2emissions { get; set; }
        public double Courtyard { get; set; }
        public double Roofs { get; set; }
    }

    public class GreenStructureStage
    {
        public double Gsi { get; set; }
    }
}
