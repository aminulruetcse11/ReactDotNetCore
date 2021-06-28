using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace COREAPI.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactNo { get; set; }
        public DateTime DOB{ get; set; }
        public string Address{ get; set; }
        public string Email { get; set; }
        public EnumGender Gender { get; set; }
        public int DepartmentID { get; set; }
        public virtual Department Department { get; set; }
    }
}
