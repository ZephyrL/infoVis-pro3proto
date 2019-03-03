using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanProject.Model
{
    public class Phase
    {
        public string Name { get; set; }
        public string Stage { get; set; }
        public List<Coordinates> Boundary { get; set; }
        public int YearProjectStart { get; set; }
        public int YearOccupancy { get; set; }
        public int Area { get; set; }
        public List<Apartment> Apartments { get; set; }
    }
}