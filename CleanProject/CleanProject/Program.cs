using CleanProject.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace CleanProject
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Phase> phases = new List<Phase>();

            Excel.Application xlApp = new Excel.Application();
            Excel.Workbook xlWorkbook = xlApp.Workbooks.Open(@"C:\Personal\KTH\2019\P3\Information Visualization\Projects\Group\CleanProject\CleanProject\RawData\NDS_followup_KTH_students_20190219.xlsx");
            Excel._Worksheet xlWorksheet = xlWorkbook.Sheets[1];
            Excel.Range xlRange = xlWorksheet.UsedRange;

            int rowCount = xlRange.Rows.Count;
            int rowIndex = 8; // data starts from here

            while (rowIndex <= rowCount)
            {
                var phase = new Phase
                {
                    Name = xlRange.GetString(rowIndex, 3),
                    Stage = xlRange.GetString(rowIndex, 4),
                    YearProjectStart = xlRange.GetInteger(rowIndex, 8),
                    YearOccupancy = xlRange.GetInteger(rowIndex, 9),
                    Area = xlRange.GetInteger(rowIndex, 10),
                    Boundary = new List<Coordinates>(),
                    Apartments = new List<Apartment>()                    
                };

                Console.WriteLine($"Loadind data for phase {phase.Name} ... ");

                do
                {
                    phase.Apartments.Add(new Apartment
                    {
                        Name = xlRange.GetString(rowIndex, 1),
                        Developer = xlRange.GetString(rowIndex, 2),
                        TotalApartments = xlRange.GetInteger(rowIndex, 5),
                        Coordinates = new Coordinates
                        {
                            Lng = xlRange.GetValue(rowIndex, 6),
                            Lat = xlRange.GetValue(rowIndex, 7)
                        },
                        Requirement = new Requirement
                        {
                            Bbr = xlRange.GetInteger(rowIndex, 11),
                            Energy = xlRange.GetValue(rowIndex, 12),
                            Gsi = xlRange.GetValue(rowIndex, 40),
                            BicycleParking = xlRange.GetValue(rowIndex, 46),
                            CarParking = xlRange.GetValue(rowIndex, 53),
                            ElectiralChargingPoint = xlRange.GetInteger(rowIndex, 56),
                            ConstructionWaste = xlRange.GetInteger(rowIndex, 59),
                            DistanceToVWC = xlRange.GetInteger(rowIndex, 67),
                            DistanceToRecycling = xlRange.GetValue(rowIndex, 69),
                            IndoorEnvironment = xlRange.GetString(rowIndex, 77)
                        },
                        Energy = new Energy
                        {
                            Operation = new EnergyStage
                            {
                                Total = xlRange.GetValue(rowIndex, 13),
                                DistrictHeating = xlRange.GetValue(rowIndex, 14),
                                ElectricityHeating = xlRange.GetValue(rowIndex, 15),
                                DistrictHotWater = xlRange.GetValue(rowIndex, 16),
                                ElectricityHotWater = xlRange.GetValue(rowIndex, 17),
                                PropertyElectricity = xlRange.GetValue(rowIndex, 18),
                                LocalElectricity = xlRange.GetValue(rowIndex, 19),
                                LocalHeating = xlRange.GetValue(rowIndex, 20),
                                RegionalEnergy = 0.0
                            },
                            Construction = new EnergyStage
                            {
                                Total = xlRange.GetValue(rowIndex, 21),
                                DistrictHeating = xlRange.GetValue(rowIndex, 22),
                                ElectricityHeating = xlRange.GetValue(rowIndex, 23),
                                DistrictHotWater = xlRange.GetValue(rowIndex, 24),
                                ElectricityHotWater = xlRange.GetValue(rowIndex, 25),
                                PropertyElectricity = xlRange.GetValue(rowIndex, 26),
                                LocalElectricity = xlRange.GetValue(rowIndex, 27),
                                LocalHeating = xlRange.GetValue(rowIndex, 28),
                                RegionalEnergy = xlRange.GetValue(rowIndex, 29)
                            },
                            Design = new EnergyStage
                            {
                                Total = xlRange.GetValue(rowIndex, 30),
                                DistrictHeating = xlRange.GetValue(rowIndex, 31),
                                ElectricityHeating = xlRange.GetValue(rowIndex, 32),
                                DistrictHotWater = xlRange.GetValue(rowIndex, 33),
                                ElectricityHotWater = xlRange.GetValue(rowIndex, 34),
                                PropertyElectricity = xlRange.GetValue(rowIndex, 35),
                                LocalElectricity = xlRange.GetValue(rowIndex, 36),
                                LocalHeating = xlRange.GetValue(rowIndex, 37),
                                RegionalEnergy = xlRange.GetValue(rowIndex, 38)
                            }
                        },
                        GreenStructure = new GreenStructure
                        {
                            Co2emissions = xlRange.GetValue(rowIndex, 39),
                            Courtyard = xlRange.GetValue(rowIndex, 44),
                            Roofs = xlRange.GetValue(rowIndex, 45),
                            Operation = new GreenStructureStage
                            {
                                Gsi = xlRange.GetValue(rowIndex, 41)
                            },
                            Construction = new GreenStructureStage
                            {
                                Gsi = xlRange.GetValue(rowIndex, 42)
                            },
                            Design = new GreenStructureStage
                            {
                                Gsi = xlRange.GetValue(rowIndex, 43)
                            }
                        },
                        Transport = new Transport
                        {
                            Operation = new TransportStage
                            {
                                BicycleParking = xlRange.GetValue(rowIndex, 47)

                            },
                            Construction = new TransportStage
                            {
                                BicycleParking = xlRange.GetValue(rowIndex, 48)
                            },
                            Design = new TransportStage
                            {
                                BicycleParking = xlRange.GetValue(rowIndex, 49)
                            },
                            TotalBicycleParking = xlRange.GetValue(rowIndex, 50),
                            BicycleParkingIndoor = xlRange.GetValue(rowIndex, 51),
                            BicycleParkingOutdoor = xlRange.GetValue(rowIndex, 52),
                            CarParkingSpace = xlRange.GetValue(rowIndex, 54),
                            TotalcarParkingSpace = xlRange.GetValue(rowIndex, 55),
                            ElectiralChargingPoint = xlRange.GetValue(rowIndex, 57),
                            TotalElectiralChargingPoint = xlRange.GetValue(rowIndex, 58)
                        },
                        Construction = new Construction
                        {
                            ConstructionWaste = xlRange.GetValue(rowIndex, 60),
                            EnergyRecovery = xlRange.GetValue(rowIndex, 61),
                            MaterialRecycling = xlRange.GetValue(rowIndex, 62),
                            Reuse = xlRange.GetValue(rowIndex, 63),
                            Mixed = xlRange.GetValue(rowIndex, 64),
                            LandsFill = xlRange.GetValue(rowIndex, 65),
                            NotSpecified = xlRange.GetValue(rowIndex, 66)
                        },
                        Waste = new Waste
                        {
                            distanceToVWC = xlRange.GetValue(rowIndex, 68),
                            distanceToRecycling = xlRange.GetValue(rowIndex, 70),
                            Operation = new WasteStage
                            {
                                RecyclingRoomSize = xlRange.GetValue(rowIndex, 71)
                            },
                            Construction = new WasteStage
                            {
                                RecyclingRoomSize = xlRange.GetValue(rowIndex, 72)
                            },
                            Design = new WasteStage
                            {
                                RecyclingRoomSize = xlRange.GetValue(rowIndex, 73)
                            }
                        },
                        Material = new Material
                        {
                            Assessment = xlRange.GetString(rowIndex, 75),
                            Deveations = xlRange.GetValue(rowIndex, 76)
                        },
                        IndoorEnvironment = new IndoorEnvironment
                        {
                            LivingClass = xlRange.GetString(rowIndex, 78)
                        }
                    });

                    Console.WriteLine($"--- Loadind data for apartment at row {rowIndex}");

                    if (rowIndex + 1 <= rowCount && String.Equals(xlRange.GetString(rowIndex+1, 3), phase.Name))
                    {
                        rowIndex++;
                    }
                    else
                    {
                        break;
                    }

                } while (true);

                rowIndex++;
                phases.Add(phase);
            }

            Console.WriteLine("Writing json data to file");

            using (FileStream fs = File.Open(@".\data.json", FileMode.OpenOrCreate))
            using (StreamWriter sw = new StreamWriter(fs))
            using (JsonWriter jw = new JsonTextWriter(sw))
            {
                jw.Formatting = Formatting.Indented;

                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(jw, phases);
            }

            //cleanup
            GC.Collect();
            GC.WaitForPendingFinalizers();

            //close and release
            xlWorkbook.Close();

            //quit and release
            xlApp.Quit();
        }        
    }

    public static class Extensions
    {
        public static double GetValue(this Excel.Range xlRange, int row, int col)
        {
            string value;
            if (String.IsNullOrEmpty(value = xlRange.Cells[row, col].Value2.ToString()))
            {
                return 0.0;
            }
            Double.TryParse(value, out double result);
            return result;
        }

        public static string GetString(this Excel.Range xlRange, int row, int col)
        {
            return xlRange.Cells[row, col].Value2.ToString();
        }

        public static int GetInteger(this Excel.Range xlRange, int row, int col)
        {
            string value;
            if (String.IsNullOrEmpty(value = xlRange.Cells[row, col].Value2.ToString()))
            {
                return 0;
            }
            Int32.TryParse(value, out int result);
            return result;
        }
    }
}
