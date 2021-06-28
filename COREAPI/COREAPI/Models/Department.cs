using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace COREAPI.Models
{
    public class Department
    {
        public Department()
        {
            Employees = new HashSet<Employee>();
        }
        [Key]
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
