using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanProject.Model
{
    public class Category<T> where T : class
    {
        public T Operation { get; set; }
        public T Construction { get; set; }
        public T Design { get; set; }
    }
}
