using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanProject.Model
{
    public class Waste : Category<WasteStage>
    {
        public double distanceToVWC { get; set; }
        public double distanceToRecycling { get; set; }
    }

    public class WasteStage
    {
        public double RecyclingRoomSize { get; set; }
    }
}
