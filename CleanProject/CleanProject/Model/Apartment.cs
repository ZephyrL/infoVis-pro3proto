using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanProject.Model
{
    public class Apartment
    {
        public string Name { get; set; }
        public string Developer { get; set; }
        public int TotalApartments { get; set; }
        public Coordinates Coordinates { get; set; }
        public Requirement Requirement { get; set; }
        public Energy Energy { get; set; }
        public GreenStructure GreenStructure { get; set; }
        public Transport Transport { get; set; }
        public Construction Construction { get; set; }
        public Waste Waste { get; set; } 
        public Material Material { get; set; }
        public IndoorEnvironment IndoorEnvironment { get; set; }
    }
}